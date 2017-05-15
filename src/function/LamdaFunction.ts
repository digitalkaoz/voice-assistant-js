import {Component} from 'tsdi'
import {IApi, IFunction} from '../../typings'
import {Function} from './Function'

@Component()
export class LamdaFunction extends Function implements IFunction {

  public invoke (rawEvent, context, callback) {
    if (process.env.DEBUG) {
      console.log(JSON.stringify(rawEvent), JSON.stringify(context))
    }

    const handler = this.handler(rawEvent)
    // TODO the sdks should go into container so we can use Injections on Events aga
    const sdk = handler.createSdkHandler(rawEvent, context, callback)
    const event = this.event(rawEvent, sdk)
    const api = this.container.get<IApi>(event.intent())

    handler.handle(event, api)
  }
}
