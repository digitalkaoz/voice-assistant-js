import {ApiAiEvent} from '../../src/event/ApiAiEvent'
import {ApiAiHandler} from '../../src/handler/ApiAiHandler'

describe('ApiAiEvent', () => {

  const mockEvent = require('../fixtures/apiai/event.json')

  let event: ApiAiEvent
  let assistant
  let callback

  beforeEach(() => {
    callback = jest.fn()
    // TODO not really cool to use a factory from somewhere else
    assistant = new ApiAiHandler().createSdkHandler(mockEvent, {}, callback)

    event = new ApiAiEvent(assistant)
  })

  it('can tell', () => {
    event.tell('foo')

    expect(callback).toHaveBeenCalledWith(undefined, {
      'contextOut': [],
      'data': {'google': {'expect_user_response': false, 'is_ssml': false, 'no_input_prompts': []}},
      'speech': 'foo'
    })
  })

  it('can ask', () => {
    event.ask('foo')

    expect(callback).toHaveBeenCalledWith(undefined, {
      'contextOut': [{
        'lifespan': 100,
        'name': '_actions_on_google_',
        'parameters': {}
      }],
      'data': {'google': {'expect_user_response': true, 'is_ssml': false, 'no_input_prompts': []}},
      'speech': 'foo'
    })
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('default')
  })
})
