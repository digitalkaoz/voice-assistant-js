import {GoogleActionEvent} from '../../src/event/GoogleActionEvent'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'
import {IEvent} from '../../typings'
import {Example} from '../fixtures/mapping'

describe('GoogleActionHandler', () => {
  let event: IEvent

  const handle = () => {
    return new GoogleActionHandler().handle(event, new Example())
  }

  beforeEach(() => {
    event = new GoogleActionEvent({})
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
