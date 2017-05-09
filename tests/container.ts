import 'reflect-metadata'

import {Container} from 'typedi'
import {Foo, Bar} from './services'
require('./services')

console.log(Container.services)

/*@Service()
class Foo {

}

@Service()
class Bar {

  @Inject()
  public foo: Foo
}

console.log(Container.services);
*/
