import {ApiAiAssistant} from 'actions-on-google'
import {Component, Factory, Inject, TSDI} from 'tsdi'
import {IHandler} from '../../typings'
import {GoogleHandler} from './GoogleHandler'

@Component()
export class ApiAiHandler extends GoogleHandler implements IHandler {

  // @Factory({name: 'api-ai'})
  public createSdkHandler (event: any, context: any, callback: () => any): ApiAiAssistant {
    const args = this.createAssistantArguments(event, callback)

    return new ApiAiAssistant(args)
  }
}
