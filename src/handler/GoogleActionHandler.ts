import {ActionsSdkAssistant} from 'actions-on-google'
import {Component} from 'tsdi'
import {IEvent} from '../../typings'
import {GoogleActionEvent} from '../event/GoogleActionEvent'
import {GoogleHandler} from './GoogleHandler'

@Component()
export class GoogleActionHandler extends GoogleHandler {

  public static event (event, context, callback): IEvent {
    const args = this.createAssistantArguments(event, callback)

    return new GoogleActionEvent(new ActionsSdkAssistant(args))
  }

  protected createEvent (event: any, context: any, callback: () => any): IEvent {
    return GoogleActionHandler.event(event, context, callback)
  }
}
