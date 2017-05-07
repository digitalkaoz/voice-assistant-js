import { IEvent } from "../../typings";
import { AlexaEvent } from "../event/AlexaEvent";
import { Handler } from "./Handler";

export class AlexaHandler extends Handler {

  public static event(event, context, callback): IEvent {
    const alexa = require("alexa-sdk").handler(event, context);

    return new AlexaEvent(alexa, callback);
  }

  protected createEvent(event, context, callback): IEvent {
    return AlexaHandler.event(event, context, callback);
  }
}
