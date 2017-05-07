import { IEvent } from "../../typings";
import { ApiAiEvent } from "../event/ApiAiEvent";
import { Handler } from "./Handler";

export class ApiAiHandler extends Handler {

  public static event(event, callback): IEvent {
    const apiAiAssistent = require("actions-on-google").ApiAiAssistant;
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

    return new ApiAiEvent(new apiAiAssistent({ request: req, response: res }));
  }

  protected createEvent(event, context, callback): IEvent {
    return ApiAiHandler.event(event, callback);
  }
}
