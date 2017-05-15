import {handler} from 'alexa-sdk'
import {AlexaEvent} from '../../src/event/AlexaEvent'
import {AlexaSdk} from '../../typings'

describe('AlexaEvent', () => {

  const mockEvent = require('../fixtures/alexa/event.json')
  let context = require('../fixtures/alexa/context.json')

  let event: AlexaEvent
  let callback: () => any

  beforeEach(() => {
    callback = jest.fn()

    context.succeed = callback

    event = new AlexaEvent(handler(mockEvent, context, callback) as AlexaSdk)
  })

  it('can tell', () => {
    event.tell('foo')

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
    event.ask('foo')

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

  it('returns the intent', () => {
    expect(event.intent()).toBe('tell')
  })

  it('can delegate', () => {
    event.delegate('askCard')

    expect(callback).toHaveBeenCalledWith({
      response: {
        directives: [{type: 'Dialog.Delegate', updatedIntent: 'askCard'}],
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can ask with card', () => {
    event.askWithCard('foo', 'fooBar', {
      type: 'Standard',
      title: 'cardTitle',
      content: 'cardContent',
      image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large'}
    })

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          image: {largeImageUrl: 'http://large', smallImageUrl: 'http://small'},
          text: 'cardContent',
          title: 'cardTitle',
          type: 'Standard'
        },
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> fooBar </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can tell with card', () => {
    event.tellWithCard('foo', {
      type: 'Standard',
      title: 'cardTitle',
      content: 'cardContent',
      image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large'}
    })

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          image: {largeImageUrl: 'http://large', smallImageUrl: 'http://small'},
          text: 'cardContent',
          title: 'cardTitle',
          type: 'Standard'
        },
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        shouldEndSession: true
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can tell with link account card', () => {
    event.tellWithLinkAccountCard('foo')

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          type: 'LinkAccount'
        },
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        shouldEndSession: true
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can ask with link account card', () => {
    event.askWithLinkAccountCard('foo')

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: {
          type: 'LinkAccount'
        },
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

})
