import { IEvent } from "../../typings";

import { LambdaHandler } from "alexa-sdk/lib/alexa.js";

export class AlexaEvent implements IEvent {

  constructor(private handler: LambdaHandler, private callback: (arg?: any) => any) { }

  public tell(text: string) {
    return this.handler.emit(":tell", text);
  }

  public intent(): string {
    return this.handler._event.request.intent.name;
  }

  public ask(text: string) {
    return this.handler.emit(":listen", text);
  }
}
