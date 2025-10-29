/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { ConsoleTransport, FileTransport, type Logger } from './transports';

export class LoggerService {
  private transports: Logger[] = [];

  public error(error: Error, context?: Record<string, any>): void {
    for (const transport of this.transports) {
      transport.error(error, context);
    }
  }

  public addTransport(transport: Logger) {
    this.transports.push(transport);
  }

  public removeTransport(transport: Logger) {
    this.transports = this.transports.filter((t) => t !== transport);
  }
}

export const logger = new LoggerService();
logger.addTransport(new FileTransport());
logger.addTransport(new ConsoleTransport());
