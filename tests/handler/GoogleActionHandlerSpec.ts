import { GoogleActionHandler } from "../../src/handler/GoogleActionHandler";

import mapping from "../fixtures/mapping";

describe("GoogleActionHandler", () => {

  const event = require("../fixtures/google-action/event.json");

  it("calls the given IApi", (done) => {
    new GoogleActionHandler(mapping).handle(event, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        expect_user_response: false,
        final_response: { speech_response: { text_to_speech: "default" } },
      });
      done();
    }).catch(done.fail);
  });
});
