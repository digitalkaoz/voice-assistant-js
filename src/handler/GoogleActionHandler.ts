import {ActionsSdkAssistant} from 'actions-on-google'
import {Component} from 'tsdi'
import {IHandler} from '../../typings'
import {GoogleHandler} from './GoogleHandler'

@Component()
export class GoogleActionHandler extends GoogleHandler implements IHandler {

  public createSdkHandler (event: any, context: any, callback: () => any): ActionsSdkAssistant {
    const args = this.createAssistantArguments(event, callback)
    return new ActionsSdkAssistant(args)
  }
}
