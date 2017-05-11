import {Component, Inject} from 'tsdi'
import {IFunction} from '../../typings'
import {AutoDetectHandler} from '../handler/AutoDetectHandler'

@Component()
export class LamdaFunction implements IFunction {

  constructor (@Inject() private handler: AutoDetectHandler) {}

  public invoke (event, context, callback) {
    if (process.env.DEBUG) {
      console.log(JSON.stringify(event), JSON.stringify(context))
    }

    this.handler.handle(event, context, callback)
  }
}
