module.exports = {
  apps: [{
    name: 'tkghd-immortal',
    script: 'server-ultimate.js',
    instances: 3,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: { NODE_ENV: 'production', PORT: 8080 }
  }]
};
