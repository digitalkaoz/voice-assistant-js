import { AutoDetectHandler } from "../../src/handler/AutoDetectHandler";

import mapping from "../fixtures/mapping";

describe("AutoDetectHandler", () => {

  const API_AI_EVENT = require("../fixtures/apiai/event.json");
  const ALEXA_EVENT = require("../fixtures/alexa/event.json");
  const GOOGLE_ACTION_EVENT = require("../fixtures/google-action/event.json");

  it("detects api-ai request", (done) => {
    new AutoDetectHandler(mapping).handle(API_AI_EVENT, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        contextOut: [],
        data: { google: { expect_user_response: false, is_ssml: false, no_input_prompts: [] } },
        speech: "default",
      });
      done();
    }).catch(done.fail);
  });

  it("detects alexa request", () => {
    const callback = jest.fn();

    const context = {
      succeed: callback,
    };

    new AutoDetectHandler(mapping).handle(ALEXA_EVENT, context, callback);

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: { ssml: "<speak> foo </speak>", type: "SSML" },
        shouldEndSession: true,
      }, sessionAttributes: {}, version: "1.0",
    });
  });

  it("detects google-action request", (done) => {
    new AutoDetectHandler(mapping).handle(GOOGLE_ACTION_EVENT, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        expect_user_response: false,
        final_response: { speech_response: { text_to_speech: "default" } },
      });
      done();
    }).catch(done.fail);
  });

});
