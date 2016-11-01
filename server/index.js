import app from './app';
import config from './config';
import logger from './logger';

app();

logger.info(`application listening at ${config.web.host}:${config.web.port}`);
