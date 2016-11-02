import router from 'koa-router';

const api = router();

api.get('/', (ctx) => {
  ctx.body = 'Hello World!';
});

export default api;
