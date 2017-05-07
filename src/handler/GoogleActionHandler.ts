import { IEvent } from "../../typings";
import { GoogleActionEvent } from "../event/GoogleActionEvent";
import { Handler } from "./Handler";

export class GoogleActionHandler extends Handler {

  public static event(event, context, callback): IEvent {
    const ActionsSdkAssistant = require("actions-on-google").ActionsSdkAssistant;
    const req = require("express/lib/request");
    const res = require("express/lib/response");
    const app = require("express");

    req.body = event;

    // some ugly fixes as we are not in a real express app
    req.res = res;
    req.headers = {};
    res.app = app();
    res.setHeader = () => null;
    res.end = callback;
    res.req = req;

    return new GoogleActionEvent(new ActionsSdkAssistant({ request: req, response: res }));
  }

  protected createEvent(event: any, context: any, callback: () => any): IEvent {
    return GoogleActionHandler.event(event, context, callback);
  }
}
