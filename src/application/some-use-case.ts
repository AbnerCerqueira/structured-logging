import type { SomeService } from './some-service';

export class SomeUseCase {
  public constructor(private doSomethingService: SomeService) {}

  public async execute() {
    await this.doSomethingService.execute({ foo: 1, bar: 2 });
  }
}
