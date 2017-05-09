import { ActionsSdkAssistant } from 'actions-on-google'
import { Service } from 'typedi'
import { IEvent } from '../../typings'
import { GoogleActionEvent } from '../event/GoogleActionEvent'
import { GoogleHandler } from './GoogleHandler'

@Service()
export class GoogleActionHandler extends GoogleHandler {

  public static event(event, context, callback): IEvent {
    const args = this.createAssistantArguments(event, callback)

    return new GoogleActionEvent(new ActionsSdkAssistant(args))
  }

  protected createEvent(event: any, context: any, callback: () => any): IEvent {
    return GoogleActionHandler.event(event, context, callback)
  }
}
