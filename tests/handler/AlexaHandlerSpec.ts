import {AlexaEvent} from '../../src/event/AlexaEvent'
import {AlexaHandler} from '../../src/handler/AlexaHandler'

import {Example} from '../fixtures/mapping'

describe('AlexaHandler', () => {
  const rawEvent = require('../fixtures/alexa/event.json')
  const context = require('../fixtures/alexa/context.json')

  const handle = (rawEvent, context, callback) => {
    const handler = new AlexaHandler()
    const sdk = handler.createSdkHandler(rawEvent, context, callback)

    return handler.handle(new AlexaEvent(sdk), new Example())
  }

  it('can tell', () => {
    const callback = jest.fn()

    rawEvent.request.intent.name = 'tell'
    context.succeed = callback

    handle(rawEvent, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {
          ssml: '<speak> foo </speak>',
          type: 'SSML'
        },
        shouldEndSession: true
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can ask', () => {
    const callback = jest.fn()

    rawEvent.request.intent.name = 'ask'
    context.succeed = callback

    handle(rawEvent, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {
          ssml: '<speak> foo </speak>',
          type: 'SSML'
        },
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can tell with card', () => {
    const callback = jest.fn()

    rawEvent.request.intent.name = 'tellCard'
    context.succeed = callback

    handle(rawEvent, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          image: {largeImageUrl: 'http://large', smallImageUrl: 'http://small'},
          text: 'content',
          title: 'title',
          type: 'Standard'
        },
        outputSpeech: {ssml: '<speak> speech </speak>', type: 'SSML'},
        shouldEndSession: true
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can ask with card', () => {
    const callback = jest.fn()

    rawEvent.request.intent.name = 'askCard'
    context.succeed = callback

    handle(rawEvent, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          image: {largeImageUrl: 'http://large', smallImageUrl: 'http://small'},
          text: 'content',
          title: 'title',
          type: 'Standard'
        },
        outputSpeech: {ssml: '<speak> speech </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> reprompt </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

})
