import { TSDI } from 'tsdi'
import { IApiMapping, IFunction } from '../typings'
import { DefaultApi } from './api/DefaultApi'
import { LamdaFunction } from './function/LamdaFunction'

export class Container {

  public static create(mapping: IApiMapping): TSDI {
    const container = new TSDI()
    container.enableComponentScanner()

    this.injectApis(container, mapping)

    return container
  }

  public static injectApis(container: TSDI, mapping: IApiMapping): void {
    container.register(DefaultApi, 'default')

    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        container.register(mapping[key], key)
      }
    }
  }
}

export function lambda(mapping: IApiMapping) {
  const container = Container.create(mapping)
  const lambda = container.get<IFunction>(LamdaFunction)

  return lambda.invoke.bind(lambda)
}
