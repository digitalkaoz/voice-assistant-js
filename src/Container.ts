import {Container as Injector, Service, Token} from 'typedi'
import {IApiMapping, IContainer as IContainer, IHandler} from '../typings'
import {DefaultApi} from './api/DefaultApi'

export const Handler = new Token<IHandler>('handler')

@Service()
export class Container implements IContainer {

  constructor (mapping: IApiMapping) {
    this.injectApis(mapping)
  }

  injectApis (mapping: IApiMapping): void {
    Injector.registerService({id: 'default', type: DefaultApi})

    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        Injector.registerService({
          id: key,
          type: mapping[key]
        })
      }
    }
  }

  public get<T> (key: any): T {
    // handle dynamic requires
    switch (key) {
      case 'lambda' : {
        require('./handler/AutoDetectHandler')
        require('./function/LamdaFunction')
        break
      }
    }

    return Injector.get<T>(key)
  }
}
