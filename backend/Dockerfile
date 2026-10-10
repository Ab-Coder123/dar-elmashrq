# Multi-stage production Dockerfile for Dar ElMashrq Backend
FROM node:24-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

# Copy root workspace configs
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* turbo.json ./
COPY packages/ ./packages/
COPY backend/ ./backend/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Build backend TypeScript
RUN pnpm --filter @dar-elmashrq/backend build

# -------------------------------------------------------------
# Runner stage (production image)
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 backenduser

# Install pnpm for running migrations/scripts if needed
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

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

CMD ["node", "backend/dist/server.js"]
