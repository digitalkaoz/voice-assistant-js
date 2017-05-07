import { AlexaEvent } from '../../src/event/AlexaEvent';

const mockEvent = require('../fixtures/alexa/event.json');

describe('AlexaEvent', () => {

  let event: AlexaEvent;
  let handler;
  let callback: Function;

  beforeEach(() => {
    callback = jest.fn();

    handler = require('alexa-sdk/lib/alexa.js').LambdaHandler(mockEvent, {}, callback);

    event = new AlexaEvent(handler, callback);
  });

  it('can tell', () => {
    const spy = jest.spyOn(handler, 'emit').mockReturnThis();

    event.tell('foo');

    expect(spy).toHaveBeenCalledWith(':tell', 'foo');
  });

  it('can ask', () => {
    const spy = jest.spyOn(handler, 'emit').mockReturnThis();

    event.ask('foo');

    expect(spy).toHaveBeenCalledWith(':listen', 'foo');
  });

  it('returns the intent', () => {
    expect(event.intent()).toBe('PauseIntent');
  });

});
