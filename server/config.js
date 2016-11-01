const DEFAULT_ENV = 'development';
const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_WEB_HOST = '0.0.0.0';
const DEFAULT_WEB_PORT = 3000;

export default {
  env: process.env.NODE_ENV || DEFAULT_ENV,
  logLevel: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  web: {
    host: process.env.WEB_HOST || DEFAULT_WEB_HOST,
    port: process.env.WEB_PORT || DEFAULT_WEB_PORT,
    rateLimit: {
      max: 2500,
      duration: '1h',
    },
  },
};
