import pino from 'pino';
import { BaseException } from './exception';

export interface Logger {
  error(error: Error, context?: Record<string, any>): void;
}

const serializers = {
  err: (err: Error) => {
    if (err instanceof BaseException) {
      return err.toObject();
    }
    return err;
  },
};

export class FileTransport implements Logger {
  private pino = pino({
    level: 'info',
    transport: {
      target: 'pino-roll',
      options: {
        file: 'logs',
        frequency: 'daily',
        mkdir: true,
        dateFormat: 'yyyy-MM-dd',
      },
    },
    serializers,
  });

  public error(error: Error, context?: Record<string, any>): void {
    this.pino.error({ err: error, ...context });
  }
}

export class ConsoleTransport implements Logger {
  private pino = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    serializers,
  });

  error(error: Error, context?: Record<string, any>): void {
    this.pino.error({ err: error, ...context });
  }
}
