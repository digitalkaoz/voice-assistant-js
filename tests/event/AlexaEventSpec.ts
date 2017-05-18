import {Card, handler} from 'alexa-sdk'
import {AlexaEvent} from '../../src/event/AlexaEvent'
import {AlexaSdk} from '../../typings'

describe('AlexaEvent', () => {

  const mockEvent = require('../fixtures/alexa/event.json')
  let context = require('../fixtures/alexa/context.json')

  const defaultCard: Card = {
    image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large'},
    type: 'Standard',
    title: 'cardTitle',
    content: 'cardContent'
  }

  const defaultCardResponse = {
    image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large'},
    type: 'Standard',
    title: 'cardTitle',
    text: 'cardContent'
  }

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
        reprompt: {outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'}},
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
    event.ask('foo', 'fooBar', defaultCard)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: defaultCardResponse,
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> fooBar </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can tell with card', () => {
    event.tell('foo', defaultCard)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: defaultCardResponse,
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

  it('can ask for form field values', () => {
    event.askFormField('address', 'where do you want to go', null, 'transportation')

    expect(callback).toHaveBeenCalledWith({
      response: {
        directives: [{slotToElicit: 'address', type: 'Dialog.ElicitSlot', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can ask for form field values with cards', () => {
    event.askFormField('address', 'where do you want to go', null, 'transportation', defaultCard)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: defaultCardResponse,
        directives: [{slotToElicit: 'address', type: 'Dialog.ElicitSlot', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can confirm form field values', () => {
    event.confirmFormField('address', 'where do you want to go', null, 'transportation')

    expect(callback).toHaveBeenCalledWith({
      response: {
        directives: [{slotToConfirm: 'address', type: 'Dialog.ConfirmSlot', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can confirm form field values with cards', () => {
    event.confirmFormField('address', 'where do you want to go', null, 'transportation', defaultCard)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: defaultCardResponse,
        directives: [{slotToConfirm: 'address', type: 'Dialog.ConfirmSlot', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> where do you want to go </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can submit forms', () => {
    const invalidCB = jest.fn()
    const confirmedCB = jest.fn()

    event.submitForm('submit form?', invalidCB, confirmedCB, null, 'transportation')

    expect(callback).toHaveBeenCalledWith({
      response: {
        directives: [{type: 'Dialog.ConfirmIntent', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> submit form? </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> submit form? </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can submit forms with cards', () => {
    const invalidCB = jest.fn()
    const confirmedCB = jest.fn()

    event.submitForm('submit form?', invalidCB, confirmedCB, null, 'transportation', defaultCard)

    expect(callback).toHaveBeenCalledWith({
      response: {
        card: defaultCardResponse,
        directives: [{type: 'Dialog.ConfirmIntent', updatedIntent: 'transportation'}],
        outputSpeech: {ssml: '<speak> submit form? </speak>', type: 'SSML'},
        reprompt: {outputSpeech: {ssml: '<speak> submit form? </speak>', type: 'SSML'}},
        shouldEndSession: false
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('calls confirmedCallback on submitForm when form is already confirmed', () => {
    const invalidCB = jest.fn()
    const confirmedCB = jest.fn()
    callback = jest.fn()
    context.succeed = callback
    mockEvent.request.intent.confirmationStatus = 'CONFIRMED'

    event = new AlexaEvent(handler(mockEvent, context, callback) as AlexaSdk)

    event.submitForm('submit form?', invalidCB, confirmedCB, null, 'transportation', defaultCard)

    expect(confirmedCB).toHaveBeenCalledWith(event)
  })

  it('calls invalidCallback on submitForm when form is invalid', () => {
    const invalidCB = jest.fn()
    const confirmedCB = jest.fn()
    callback = jest.fn()
    context.succeed = callback
    mockEvent.request.intent.confirmationStatus = 'DENIED'

    event = new AlexaEvent(handler(mockEvent, context, callback) as AlexaSdk)

    event.submitForm('submit form?', invalidCB, confirmedCB, null, 'transportation', defaultCard)

    expect(invalidCB).toHaveBeenCalledWith(event)
  })

  it('can return parameters', () => {
    expect(event.getParameters()).toEqual({
      Room: {
        name: 'Room',
        value: 'Kitchen'
      }
    })
  })

})
