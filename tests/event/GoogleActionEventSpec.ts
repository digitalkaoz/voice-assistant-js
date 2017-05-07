import { GoogleActionEvent } from "../../src/event/GoogleActionEvent";

jest.mock("actions-on-google/actions-sdk-assistant.js");

describe("GoogleActionEvent", () => {

  let event: GoogleActionEvent;
  let assistant;

  beforeEach(() => {
    const actionsSdkAssistant = require("actions-on-google/actions-sdk-assistant.js");

    assistant = new actionsSdkAssistant();
    assistant.getIntent = jest.fn();

    event = new GoogleActionEvent(assistant);
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
