const monitoring = {
  health: {
    endpoint: '/health',
    checks: ['database', 'api', 'memory', 'disk']
  },
  metrics: {
    performance: true,
    errors: true,
    transactions: true
  },
  alerts: {
    email: 'admin@tkghd.com',
    webhook: 'https://hooks.slack.com/...'
  }
};
module.exports = monitoring;
