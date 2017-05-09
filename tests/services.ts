import {Token, Service, Inject} from 'typedi'

export declare interface IFoo {
  foo(): void
}

const FooImpl = new Token<IFoo>()

@Service(FooImpl)
export class Foo implements IFoo {
  foo (): string {
    return 'foo'
  }
}

@Service('bar')
export class Bar {

  @Inject(FooImpl.name)
  public foo: Foo
}
