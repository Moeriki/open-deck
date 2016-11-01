import winston from 'winston';

import config from './config';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.logLevel,
    }),
  ],
});

export default logger;
