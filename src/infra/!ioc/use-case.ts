import { SomeUseCase } from '@/application/some-use-case';
import { SomeDependencyImpl } from '../lib/example/some-dependency';
import { SomeServiceImpl } from '../some-service';

const someService = new SomeServiceImpl(new SomeDependencyImpl());

export const useCase = new SomeUseCase(someService);
