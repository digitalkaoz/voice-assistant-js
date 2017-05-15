import {ApiAiEvent} from '../../src/event/ApiAiEvent'
import {ApiAiHandler} from '../../src/handler/ApiAiHandler'
import {IEvent} from '../../typings'
import {Example} from '../fixtures/mapping'

describe('ApiAiHandler', () => {

  let event: IEvent

  const handle = () => {
    return new ApiAiHandler().handle(event, new Example())
  }

  beforeEach(() => {
    event = new ApiAiEvent({})
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

})
