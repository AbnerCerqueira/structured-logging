import pino from 'pino';
import type { LogContext, LogSeverity, Transport } from '../logger';
import { pinoBaseConfig } from './config';

export class FileTransport implements Transport {
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
    ...pinoBaseConfig,
  });

  log(severity: LogSeverity, message: string, context?: LogContext): void {
    switch (severity) {
      case 'debug': {
        this.pino.debug({ message, ...context });
        return;
      }
      case 'info': {
        this.pino.info({ message, ...context });
        return;
      }
      case 'warn': {
        this.pino.warn({ message, ...context });
        return;
      }
      case 'error': {
        this.pino.error({ message, ...context });
        return;
      }
      default: {
        throw new Error('severity no supported', { cause: severity });
      }
    }
  }
}

export class ConsoleTransport implements Transport {
  private pino = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    ...pinoBaseConfig,
  });

  log(severity: LogSeverity, message: string, context?: LogContext): void {
    switch (severity) {
      case 'debug': {
        this.pino.debug({ message, ...context });
        return;
      }
      case 'info': {
        this.pino.info({ message, ...context });
        return;
      }
      case 'warn': {
        this.pino.warn({ message, ...context });
        return;
      }
      case 'error': {
        this.pino.error({ message, ...context });
        return;
      }
      default: {
        throw new Error('severity no supported', { cause: severity });
      }
    }
  }
}
