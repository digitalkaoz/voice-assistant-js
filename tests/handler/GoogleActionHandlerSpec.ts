import {GoogleActionEvent} from '../../src/event/GoogleActionEvent'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'
import {IEvent} from '../../typings'
import {Example} from '../fixtures/mapping'

describe('GoogleActionHandler', () => {

  let event: IEvent
  const api = new Example()

  beforeEach(() => {
    event = new GoogleActionEvent({})
  })

  it('delegates to the correct api', () => {
    const spy = jest.spyOn(api, 'ask').mockReturnThis()
    jest.spyOn(event, 'intent').mockReturnValue('ask')

    new GoogleActionHandler().handle(event, api)

    expect(spy).toHaveBeenCalledWith(event)
  })
})
