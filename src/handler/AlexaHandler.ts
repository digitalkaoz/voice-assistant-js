import { AlexaSdk, IEvent } from '../../typings'
import { AlexaEvent } from '../event/AlexaEvent'
import { Handler } from './Handler'
import { handler } from 'alexa-sdk'
import { Service } from 'typedi'

@Service()
export class AlexaHandler extends Handler {

  public static event(event, context, callback): IEvent {
    return new AlexaEvent(handler(event, context) as AlexaSdk)
  }

  protected createEvent(event, context, callback): IEvent {
    return AlexaHandler.event(event, context, callback)
  }
}
