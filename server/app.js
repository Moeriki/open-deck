import Koa from 'koa';
import compress from 'koa-compress';
import convert from 'koa-convert';
import logger from 'koa-logger';
import ratelimit from 'koa-ratelimit';
import responseTime from 'koa-response-time';
import redis from 'redis';

import config from './config';
import api from './router';

export default function () {
  const app = new Koa();

  if (config.env !== 'test') {
    app.use(logger());
  }

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
