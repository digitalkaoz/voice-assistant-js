import { TSDI } from 'tsdi'
import { IApiMapping, IFunction } from '../typings'
import { DefaultApi } from './api/DefaultApi'
import { LamdaFunction } from './function/LamdaFunction'

export class Container extends TSDI {

  constructor(mapping: IApiMapping) {
    super()

    this.enableComponentScanner()

    this.injectApis(mapping)
  }

  private injectApis(mapping: IApiMapping): void {
    this.register(DefaultApi, 'default')

    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        this.register(mapping[key], key)
      }
    }
  }
}

export function lambda(mapping: IApiMapping) {
  const lambda = new Container(mapping).get<IFunction>(LamdaFunction)

  return lambda.invoke.bind(lambda)
}
