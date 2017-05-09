import { Container } from '../../src/Container'
import { AlexaHandler } from '../../src/handler/AlexaHandler'

import mapping from '../fixtures/mapping'

describe('AlexaHandler', () => {

  const event = require('../fixtures/alexa/event.json')
  const context = require('../fixtures/alexa/context.json')

  it('calls the given Api', async () => {
    const callback = jest.fn()

    context.succeed = callback
    await new AlexaHandler(new Container(mapping)).handle(event, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {
          ssml: '<speak> foo </speak>',
          type: 'SSML'
        }, shouldEndSession: true
      }, sessionAttributes: {}, version: '1.0'
    })
  })
})
