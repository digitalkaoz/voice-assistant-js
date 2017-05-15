import {LambdaHandler} from 'alexa-sdk/lib/alexa.js'
import {AlexaEvent} from '../../src/event/AlexaEvent'

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

    expect(spy).toHaveBeenCalledWith(':ask', 'foo')
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('tell')
  })

  it('can ask with card', () => {
    const spy = jest.spyOn(handler, 'emit').mockReturnThis()

    event.askWithCard('foo', 'fooBar', {
      type: 'Standard',
      title: 'cardTitle',
      content: 'cardContent',
      image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large'}
    })

    expect(spy).toHaveBeenCalledWith(':askWithCard',
      'foo',
      'fooBar',
      'cardTitle',
      'cardContent', {
        'largeImageUrl': 'http://large',
        'smallImageUrl': 'http://small'
      })
  })

})
