import { BaseException, type BaseExceptionParams } from '@/common/exception';

export namespace InfrastructureException {
  export class SomeDependencyException extends BaseException {
    public constructor(params: BaseExceptionParams) {
      const { message, options } = params;
      super({
        message,
        options: {
          ...options,
          type: 'InfrastructureException.SomeDependencyException',
        },
      });
    }
  }
}
