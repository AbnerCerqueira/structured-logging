import { ApplicationException } from './exception';

type Params = {
  foo: number;
  bar: number;
};

export class DoSomethingService {
  public async execute(params: Params) {
    try {
      throw new Error('Example error');
    } catch (e) {
      const err = e as Error;
      throw new ApplicationException('Unexpected error', {
        cause: err,
        metadata: params,
        component: this.constructor.name,
        operation: 'execute fn',
      });
    }
  }
}
