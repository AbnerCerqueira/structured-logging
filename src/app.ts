import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { BaseException } from './exception';
import { logger } from './logger';
import { DoSomethingService } from './service';

export const app = fastify();

app.register(fastifyCors);

app.setErrorHandler((error, request, reply) => {
  const message =
    error instanceof BaseException ? error.message : 'Internal error';

  const context = {
    http: {
      path: request.url,
      method: request.method,
      request: {
        id: request.id,
        queryParams: request.query,
        pathParams: request.params,
        body: request.body,
      },
    },
  };

  logger.error(error, context);
  reply.status(500).send({ message });
});

app.get('/', async (_, reply) => {
  const doSomethingService = new DoSomethingService();
  await doSomethingService.execute({ foo: 0, bar: 1 });
  return reply.send({ message: 'OK' });
});
