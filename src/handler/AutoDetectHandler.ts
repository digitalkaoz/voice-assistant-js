import { Service } from 'typedi'
import { IEvent } from '../../typings'
import { Handler as IHandler } from '../Container'
import { Handler } from './Handler'

@Service(IHandler.name)
export class AutoDetectHandler extends Handler {

  public static event(event: any, context: any, callback: () => any) {
    // TODO better request checks

    if (event.hasOwnProperty('conversation')) {
      // google-action
      return require('./GoogleActionHandler').GoogleActionHandler.event(event, context, callback)
    } else if (event.hasOwnProperty('result')) {
      // api-ai
      return require('./ApiAiHandler').ApiAiHandler.event(event, context, callback)
    } else if (event.hasOwnProperty('request')) {
      // alexa
      return require('./AlexaHandler').AlexaHandler.event(event, context, callback)
    }
  }

  protected createEvent(event: any, context: any, callback: () => any): IEvent {
    return AutoDetectHandler.event(event, context, callback)
  }
}
