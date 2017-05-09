import { IEvent } from '../../typings'
import { AlexaEvent } from '../event/AlexaEvent'
import { Handler } from './Handler'
import { handler } from 'alexa-sdk'
import { Service } from 'typedi'

@Service()
export class AlexaHandler extends Handler {

  public static event(event, context): IEvent {
    return new AlexaEvent(handler(event, context))
  }

  protected createEvent(event, context): IEvent {
    return AlexaHandler.event(event, context)
  }
}
