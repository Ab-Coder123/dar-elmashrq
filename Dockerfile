# Multi-stage production Dockerfile for Dar ElMashrq Backend (from root context)
FROM node:24-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

# Copy monorepo configuration files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* turbo.json ./
COPY packages/ ./packages/
COPY backend/ ./backend/

# Install dependencies across workspace
RUN pnpm install --frozen-lockfile

# Build backend
RUN pnpm --filter @dar-elmashrq/backend build

# -------------------------------------------------------------
# Runner stage
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Create dedicated non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 backenduser

RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/migrations ./backend/migrations
COPY --from=builder /app/backend/scripts ./backend/scripts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/node_modules ./backend/node_modules

USER backenduser

EXPOSE 4000

CMD ["node", "backend/dist/server.js"]
