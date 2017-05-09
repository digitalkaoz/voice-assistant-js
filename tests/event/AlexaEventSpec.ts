import { AlexaEvent } from '../../src/event/AlexaEvent'
import { LambdaHandler } from 'alexa-sdk/lib/alexa.js'

describe('AlexaEvent', () => {

  let event: AlexaEvent
  let handler
  let callback: () => any

  beforeEach(() => {
    const mockEvent = require('../fixtures/alexa/event.json')
    callback = jest.fn()

    handler = new LambdaHandler(mockEvent, {}, callback)

    event = new AlexaEvent(handler)
  })

  it('can tell', () => {
    const spy = jest.spyOn(handler, 'emit').mockReturnThis()

    event.tell('foo')

    expect(spy).toHaveBeenCalledWith(':tell', 'foo')
  })

  it('can ask', () => {
    const spy = jest.spyOn(handler, 'emit').mockReturnThis()

    event.ask('foo')

    expect(spy).toHaveBeenCalledWith(':listen', 'foo')
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('PauseIntent')
  })

})
