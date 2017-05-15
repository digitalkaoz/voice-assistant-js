import {AlexaEvent} from '../../src/event/AlexaEvent'
import {AlexaHandler} from '../../src/handler/AlexaHandler'
import {AlexaSdk, IEvent} from '../../typings'

import {Example} from '../fixtures/mapping'

describe('AlexaHandler', () => {

  let event: IEvent

  const handle = () => {
    return new AlexaHandler().handle(event, new Example())
  }

  beforeEach(() => {
    event = new AlexaEvent({} as AlexaSdk)
  })

  it('can tell', () => {
    const spy = jest.spyOn(event, 'tell').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('tell')

    handle()

    expect(spy).toHaveBeenCalledWith('foo')
  })

  it('can ask', () => {
    const spy = jest.spyOn(event, 'ask').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('ask')

    handle()

    expect(spy).toHaveBeenCalledWith('foo')
  })

  it('can delegate', () => {
    const spy = jest.spyOn(event, 'delegate').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('delegate')

    handle()

    expect(spy).toHaveBeenCalledWith('askCard')
  })

  it('can tell with card', () => {
    const spy = jest.spyOn(event, 'tellWithCard').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('tellCard')

    handle()

    expect(spy).toHaveBeenCalledWith('speech', {
      'content': 'content',
      'image': {'largeImageUrl': 'http://large', 'smallImageUrl': 'http://small'},
      'title': 'title',
      'type': 'Simple'
    })
  })

  it('can ask with card', () => {
    const spy = jest.spyOn(event, 'askWithCard').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('askCard')

    handle()

    expect(spy).toHaveBeenCalledWith('speech', 'reprompt', {
      'content': 'content',
      'image': {'largeImageUrl': 'http://large', 'smallImageUrl': 'http://small'},
      'title': 'title',
      'type': 'Simple'
    })
  })

  it('can tell with link account card', () => {
    const spy = jest.spyOn(event, 'tellWithLinkAccountCard').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('tellLinkAccountCard')

    handle()

    expect(spy).toHaveBeenCalledWith('speech')
  })

  it('can ask with link account card', () => {
    const spy = jest.spyOn(event, 'askWithLinkAccountCard').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('askLinkAccountCard')

    handle()

    expect(spy).toHaveBeenCalledWith('speech')
  })

})
