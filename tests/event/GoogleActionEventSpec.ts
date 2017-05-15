import {GoogleActionEvent} from '../../src/event/GoogleActionEvent'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'

describe('GoogleActionEvent', () => {

  const mockEvent = require('../fixtures/google-action/event.json')

  let event: GoogleActionEvent
  let assistant
  let callback

  beforeEach(() => {
    callback = jest.fn()
    // TODO not really cool to use a factory from somewhere else
    assistant = new GoogleActionHandler().createSdkHandler(mockEvent, {}, callback)

    event = new GoogleActionEvent(assistant)
  })

  it('can tell', () => {
    event.tell('foo')

    expect(callback).toHaveBeenCalledWith(undefined, {
      'expect_user_response': false,
      'final_response': {'speech_response': {'text_to_speech': 'foo'}}
    })
  })

  it('can ask', () => {
    event.ask('foo')

    expect(callback).toHaveBeenCalledWith(undefined, {
      'conversation_token': '{"state":null,"data":{}}',
      'expect_user_response': true,
      'expected_inputs': [{
        'input_prompt': {
          'initial_prompts': [{'text_to_speech': 'foo'}],
          'no_input_prompts': []
        }, 'possible_intents': [{'intent': 'assistant.intent.action.TEXT'}]
      }]
    })
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('default')
  })
})
