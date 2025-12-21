import tracer from 'dd-trace';
tracer.init({
  service: 'tkghd-financial-system',
  env: 'production',
  version: '3.0.0',
  logInjection: true,
  runtimeMetrics: true
});
export default tracer;
