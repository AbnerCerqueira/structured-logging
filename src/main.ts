import { app } from './app';
import { logger } from './infra/lib/logging/logger';

process.env.TZ = 'UTC';

async function main() {
  app.listen({ port: 3000 });
}

main().catch((err) => logger.error(err));
