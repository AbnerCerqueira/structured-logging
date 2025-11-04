export type Params = {
  foo: number;
  bar: number;
};

/**
 * @throws { ApplicationException.ServiceUnavailable }
 */
export interface SomeService {
  execute(params: Params): Promise<void>;
}
