import { ApiAiEvent } from "../../src/event/ApiAiEvent";

// TODO do we really want to mock?
jest.mock("actions-on-google/api-ai-assistant.js");

describe("ApiAiEvent", () => {

  let event: ApiAiEvent;
  let assistant;

  beforeEach(() => {
    const apiAiAssistant = require("actions-on-google/api-ai-assistant.js");

    assistant = new apiAiAssistant();
    assistant.getIntent = jest.fn();

    event = new ApiAiEvent(assistant);
  });

  it("can tell", () => {
    const spy = jest.spyOn(assistant, "tell");

    event.tell("foo");

    expect(spy).toHaveBeenCalledWith("foo");
  });

  it("can ask", () => {
    const spy = jest.spyOn(assistant, "ask");

    event.ask("foo");

    expect(spy).toHaveBeenCalledWith("foo");
  });

  it("returns the intent", () => {
    assistant.getIntent.mockReturnValue("foo");

    expect(event.intent()).toBe("foo");
  });
});
