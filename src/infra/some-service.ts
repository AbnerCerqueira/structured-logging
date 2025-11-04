import type { Params, SomeService } from '@/application/some-service';
import { tryCatch } from '@/common/try-catch';
import { ApplicationException } from '../common/exception';
import type { SomeDependency } from './lib/example/some-dependency';

export class SomeServiceImpl implements SomeService {
  public constructor(private someDependency: SomeDependency) {}

  public async execute(params: Params): Promise<void> {
    const { exception } = await tryCatch(this.someDependency.execute());

    if (exception) {
      throw new ApplicationException.ServiceUnavailable({
        options: {
          cause: exception,
          metadata: params,
          origin: {
            component: this.constructor.name,
            operation: this.execute.name,
            file: __dirname,
          },
        },
      });
    }
  }
}
