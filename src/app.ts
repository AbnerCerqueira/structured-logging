import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import { BaseException } from './common/exception';
import { useCase } from './infra/!ioc/use-case';
import { logger } from './infra/lib/logging/logger';

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
  await useCase.execute();
  return reply.send({ message: 'OK' });
});
