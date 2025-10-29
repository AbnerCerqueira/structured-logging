type ExceptionOptions = {
  cause?: Error;
  metadata?: Record<string, unknown>;
  component?: string;
  operation?: string;
};

export abstract class BaseException extends Error {
  public timestamp: string;
  public metadata: ExceptionOptions['metadata'];
  public component: ExceptionOptions['component'];
  public operation: ExceptionOptions['operation'];

  public constructor(message: string, options: ExceptionOptions) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.timestamp = new Date().toISOString();

    const { cause, metadata = {}, component, operation } = options;

    this.cause = cause;
    this.metadata = metadata;
    this.component = component;
    this.operation = operation;
  }

  public toObject() {
    return {
      type: this.name,
      message: this.message,
      timestamp: this.timestamp,
      component: this.component,
      operation: this.operation,
      metadata: this.metadata,
      cause: this.cause ? this.serializeCause(this.cause as Error) : undefined,
      stack: this.stack,
    };
  }

  private serializeCause(error: Error): Record<string, string> {
    return {
      type: error.name,
      message: error.message,
    };
  }
}

export class ApplicationException extends BaseException {}
