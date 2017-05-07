import { AlexaHandler } from '../../src/Handler/AlexaHandler';

import mapping from '../fixtures/mapping';
const event = require('../fixtures/alexa/event.json');
const context = require('../fixtures/alexa/context.json');

describe('AlexaHandler', () => {

  it('calls the given Api', () => {
    const callback = jest.fn();

    context.succeed = callback;
    new AlexaHandler(mapping).handle(event, context, callback);

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {
          ssml: '<speak> foo </speak>',
          type: 'SSML'
        }, shouldEndSession: true
      }, sessionAttributes: {}, version: '1.0'
    });
  });
});
