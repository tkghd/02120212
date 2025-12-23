module.exports = {
  apps: [{
    name: 'tkg-bank-v30',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    env: {
      NODE_ENV: 'production',
      PORT: 8081
    }
  }]
};
