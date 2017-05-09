import { IEvent } from '../../typings'

import { AlexaObject } from 'alexa-sdk'

export class AlexaEvent implements IEvent {

  constructor(private handler: AlexaObject) {
  }

  public tell(text: string) {
    this.handler.emit(':tell', text)
  }

  public intent(): string {
    return this.handler._event.request.intent.name
  }

  public ask(text: string) {
    return this.handler.emit(':listen', text)
  }
}
