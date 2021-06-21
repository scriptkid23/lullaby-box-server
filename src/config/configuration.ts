export default () => ({
  port: parseInt(process.env.PORT, 10) || 80,
  host: process.env.HOST || '0.0.0.0',
});
