module.exports = {
  apps: [{
    name: 'tkg-bank-8081',
    script: 'server-8081.js',
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
    env: { PORT: 8081 }
  }]
};
