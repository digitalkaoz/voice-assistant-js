import {ApiAiEvent} from '../../src/event/ApiAiEvent'
import {ApiAiHandler} from '../../src/handler/ApiAiHandler'
import {IEvent} from '../../typings'
import {Example} from '../fixtures/mapping'

describe('ApiAiHandler', () => {

  let event: IEvent
  const api = new Example()

  beforeEach(() => {
    event = new ApiAiEvent({})
  })

  it('delegates to the correct api', () => {
    const spy = jest.spyOn(api, 'ask').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('ask')

    new ApiAiHandler().handle(event, api)

    expect(spy).toHaveBeenCalledWith(event)
  })
})
