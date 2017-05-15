import {handler} from 'alexa-sdk'
import {Component} from 'tsdi'
import {AlexaSdk, IHandler} from '../../typings'
import {Handler} from './Handler'

@Component()
export class AlexaHandler extends Handler implements IHandler {

  // @Factory()
  public createSdkHandler (event: any, context: any, callback: () => any): AlexaSdk {
    return handler(event, context) as AlexaSdk
  }

}
