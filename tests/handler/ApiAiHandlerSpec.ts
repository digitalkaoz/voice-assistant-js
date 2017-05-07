import { ApiAiHandler } from "../../src/handler/ApiAiHandler";

import mapping from "../fixtures/mapping";

describe("ApiAiHandler", () => {

  const event = require("../fixtures/apiai/event.json");

  it("calls the given IApi", (done) => {

    new ApiAiHandler(mapping).handle(event, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        contextOut: [],
        data: { google: { expect_user_response: false, is_ssml: false, no_input_prompts: [] } },
        speech: "default",
      });
      done();
    }).catch(done.fail);
  });
});
