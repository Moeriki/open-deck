import Koa from 'koa';
import compress from 'koa-compress';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import ratelimit from 'koa-ratelimit';
import responseTime from 'koa-response-time';
import redis from 'redis';

import api from './api/index';
import config from './config';

export default function () {
  const app = new Koa();

  if (config.env !== 'test') {
    app.use(logger());
  }

  app.use(helmet());

  app.use(responseTime());

  app.use(compress());

  app.use(convert(ratelimit({
    max: config.web.rateLimit.max,
    duration: config.web.rateLimit.duration,
    db: redis.createClient(),
  })));

  app
    .use(api.routes())
    .use(api.allowedMethods());

  app.listen(config.web.port);

  return app;
}
