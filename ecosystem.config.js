module.exports = {
  apps: [{
    name: 'tkg-bank-immortal',
    script: './backend/server-immortal.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      REAL_API: 'true',
      SYSTEM_ID: 'TK_GLOBAL_BANK_PROD'
    },
    error_file: './backend/logs/error.log',
    out_file: './backend/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
