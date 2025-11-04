import { InfrastructureException } from './exception';

/**
 * @throws { InfrastructureException.SomeDependencyException }
 */
export interface SomeDependency {
  execute(): Promise<void>;
}

export class SomeDependencyImpl implements SomeDependency {
  public async execute(): Promise<void> {
    throw new InfrastructureException.SomeDependencyException({
      message: 'Specific message describing infra error',
      options: {
        origin: {
          component: this.constructor.name,
          operation: this.execute.name,
          file: __dirname,
        },
        cause: new ForcedError('example error', new Error('root error')),
      },
    });
  }
}

class ForcedError extends Error {
  public constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = this.constructor.name;
  }
}
