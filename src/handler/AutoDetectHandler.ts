import {Component} from 'tsdi'
// import {TraceClass} from 'typescript-debug'
import {IEvent} from '../../typings'
import {AlexaHandler} from './AlexaHandler'

import {ApiAiHandler} from './ApiAiHandler'
import {GoogleActionHandler} from './GoogleActionHandler'
import {Handler} from './Handler'

@Component()

// @TraceClass()
export class AutoDetectHandler extends Handler {

  public static event (event: any, context: any, callback: () => any) {
    // TODO better request checks

    if (event.hasOwnProperty('conversation')) {
      return GoogleActionHandler.event(event, context, callback)
    } else if (event.hasOwnProperty('result')) {
      return ApiAiHandler.event(event, context, callback)
    } else if (event.hasOwnProperty('request')) {
      return AlexaHandler.event(event, context, callback)
    }

    throw new Error('event could not be parsed')
  }

  protected createEvent (event: any, context: any, callback: () => any): IEvent {
    return AutoDetectHandler.event(event, context, callback)
  }
}
