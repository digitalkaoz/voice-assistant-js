import {Container as Injector, Service, Token} from 'typedi'
import {IApiMapping, IContainer as IContainer, IFunction, IHandler} from '../typings'
import {DefaultApi} from './api/DefaultApi'

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
    return Injector.get<T>(key)
  }
}

export const Handler = new Token<IHandler>('handler')

export function lambda (mapping: IApiMapping) {
  require('./handler/AutoDetectHandler')
  require('./function/LamdaFunction')

  const lambda = new Container(mapping).get<IFunction>('lambda')

  return lambda.invoke.bind(lambda)
}
