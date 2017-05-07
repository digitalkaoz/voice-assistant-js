import { AlexaHandler } from "./AlexaHandler";
import { ApiAiHandler } from "./ApiAiHandler";
import { GoogleActionHandler } from "./GoogleActionHandler";
import { Handler } from "./Handler";

import { IEvent } from "../../typings";

export class AutoDetectHandler extends Handler {

  public static event(event: any, context: any, callback: () => any) {
    // TODO better request checks

    if (event.hasOwnProperty("conversation")) {
      // google-action
      return GoogleActionHandler.event(event, context, callback);
    } else if (event.hasOwnProperty("result")) {
      // api-ai
      return ApiAiHandler.event(event, callback);
    } else if (event.hasOwnProperty("request")) {
      // alexa
      return AlexaHandler.event(event, context, callback);
    }
  }

  protected createEvent(event: any, context: any, callback: () => any): IEvent {
    return AutoDetectHandler.event(event, context, callback);
  }
}
