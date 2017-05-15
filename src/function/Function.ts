import {Inject, TSDI} from 'tsdi'
import {IEvent, IHandler} from '../../typings'
import {AlexaEvent} from '../event/AlexaEvent'
import {ApiAiEvent} from '../event/ApiAiEvent'
import {GoogleActionEvent} from '../event/GoogleActionEvent'
import {AlexaHandler} from '../handler/AlexaHandler'
import {ApiAiHandler} from '../handler/ApiAiHandler'
import {GoogleActionHandler} from '../handler/GoogleActionHandler'
export abstract class Function {

  constructor (@Inject() protected container: TSDI) {}

  protected handler (event: any): IHandler {
    // TODO better request checks

    if (event.hasOwnProperty('conversation')) {
      return this.container.get<IHandler>(GoogleActionHandler)
    } else if (event.hasOwnProperty('result')) {
      return this.container.get<IHandler>(ApiAiHandler)
    } else if (event.hasOwnProperty('request')) {
      return this.container.get<IHandler>(AlexaHandler)
    }

    throw new Error('event could not be parsed')
  }

  // TODO put the sdks into DI
  protected event (event: any, sdk: any): IEvent {
    // TODO better request checks

    if (event.hasOwnProperty('conversation')) {
      return new GoogleActionEvent(sdk)
    } else if (event.hasOwnProperty('result')) {
      return new ApiAiEvent(sdk)
      // return this.container.get<IEvent>(ApiAiEvent)
    } else if (event.hasOwnProperty('request')) {
      return new AlexaEvent(sdk)
    }

    throw new Error('event could not be parsed')
  }

}
