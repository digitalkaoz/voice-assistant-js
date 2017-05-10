import { IFunction, IHandler } from '../../typings'
import { Inject, Service } from 'typedi'
import { Handler } from '../Container'

@Service('lambda')
export class LamdaFunction implements IFunction {

  constructor(@Inject(type => Handler) private handler: IHandler) {
  }

  public invoke(event, context, callback) {
    if (process.env.DEBUG) {
      console.log(JSON.stringify(event), JSON.stringify(context))
    }

    this.handler.handle(event, context, callback)
  }
}
