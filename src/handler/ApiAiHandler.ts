import { IEvent } from '../../typings'
import { ApiAiEvent } from '../event/ApiAiEvent'
import { GoogleHandler } from './GoogleHandler'
import { ApiAiAssistant } from 'actions-on-google'
import { Service } from 'typedi'

@Service()
export class ApiAiHandler extends GoogleHandler {

  public static event(event, context, callback): IEvent {
    const args = this.createAssistantArguments(event, callback)

    return new ApiAiEvent(new ApiAiAssistant(args))
  }

  protected createEvent(event, context, callback): IEvent {
    return ApiAiHandler.event(event, context, callback)
  }
}
