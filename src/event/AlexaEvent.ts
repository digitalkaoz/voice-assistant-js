import { Event } from '../../typings';

import { LambdaHandler } from 'alexa-sdk/lib/alexa.js';

export class AlexaEvent implements Event {

  constructor(private handler: LambdaHandler, private callback: Function) { }

  tell(text: string) {
    return this.handler.emit(':tell', text);
  }

  intent(): string {
    return this.handler._event.request.intent.name
  }

  ask(text: string) {
    return this.handler.emit(':listen', text);
  }
}
