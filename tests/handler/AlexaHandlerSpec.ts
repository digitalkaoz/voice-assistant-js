import {AlexaEvent} from '../../src/event/AlexaEvent'
import {AlexaHandler} from '../../src/handler/AlexaHandler'
import {AlexaSdk, IEvent} from '../../typings'

import {Example} from '../fixtures/mapping'

describe('AlexaHandler', () => {

  let event: IEvent
  const api = new Example()

  beforeEach(() => {
    event = new AlexaEvent({} as AlexaSdk)
  })

  it('delegates to the correct api', () => {
    const spy = jest.spyOn(api, 'ask').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('ask')

    new AlexaHandler().handle(event, api)

    expect(spy).toHaveBeenCalledWith(event)
  })
})
