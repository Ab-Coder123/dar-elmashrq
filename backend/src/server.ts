import { createApp } from './app'
import { env } from './config/env'

const app = createApp()

const server = app.listen(env.PORT, () => {
  console.log(`
🚀 Dar ElMashrq Backend Server Started Successfully
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Environment : ${env.NODE_ENV}
🔌 Port        : ${env.PORT}
🔗 Health Check: http://localhost:${env.PORT}/health
🌐 API Base    : http://localhost:${env.PORT}${env.API_PREFIX}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
})

const gracefulShutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`)
  server.close(() => {
    console.log('✅ HTTP server closed. Process terminated.')
    process.exit(0)
  })

  // Force close if graceful shutdown takes longer than 5 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown due to timeout.')
    process.exit(1)
  }, 5000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason)
  process.exit(1)
})
