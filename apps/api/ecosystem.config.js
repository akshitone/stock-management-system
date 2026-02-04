/* eslint-disable no-undef */
/**
 * PM2 Ecosystem Configuration
 * Production process management for Stock Management System API
 *
 * Usage:
 *   pm2 start ecosystem.config.js --env production
 *   pm2 reload ecosystem.config.js --env production
 *   pm2 stop ecosystem.config.js
 *   pm2 delete ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      name: "sms-api",
      script: "dist/main.js",
      cwd: __dirname,

      // Cluster mode - utilize all CPU cores
      instances: "max",
      exec_mode: "cluster",

      // Auto-restart configuration
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",

      // Environment variables
      env: {
        NODE_ENV: "development",
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 4000,
      },

      // Logging
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,

      // Health monitoring
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,

      // Source maps for better error traces
      source_map_support: true,
    },
  ],
};
