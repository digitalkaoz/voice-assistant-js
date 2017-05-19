import {Card} from 'alexa-sdk'
import {GoogleActionEvent} from '../../src/event/GoogleActionEvent'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'

describe('GoogleActionEvent', () => {

  const mockEvent = require('../fixtures/google-action/event.json')

  const defaultCard: Card = {
    image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large.com/foo.jpg'},
    type: 'Standard',
    title: 'cardTitle',
    content: 'cardContent'
  }

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

  it('can tell with card', () => {
    event.tell('foo', defaultCard)

    expect(callback).toHaveBeenCalledWith(undefined, {
      'expect_user_response': false,
      'final_response': {
        'rich_response': {
          'items': [{'simple_response': {'text_to_speech': 'foo'}}, {
            'basic_card': {
              'buttons': [],
              'formatted_text': 'cardContent',
              'image': {'accessibility_text': 'image', 'url': 'http://large.com/foo.jpg'},
              'subtitle': undefined,
              'title': 'cardTitle'
            }
          }], 'link_out_suggestion': undefined, 'suggestions': []
        }
      }
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

  it('can ask with card', () => {
    event.ask('foo', null, defaultCard)

    expect(callback).toHaveBeenCalledWith(undefined, {
      'conversation_token': '{"state":null,"data":{}}',
      'expect_user_response': true,
      'expected_inputs': [{
        'input_prompt': {
          'rich_initial_prompt': {
            'items': [{'simple_response': {'text_to_speech': 'foo'}}, {
              'basic_card': {
                'buttons': [],
                'formatted_text': 'cardContent',
                'image': {'accessibility_text': 'image', 'url': 'http://large.com/foo.jpg'},
                'subtitle': undefined,
                'title': 'cardTitle'
              }
            }], 'link_out_suggestion': undefined, 'suggestions': []
          }
        }, 'possible_intents': [{'intent': 'assistant.intent.action.TEXT'}]
      }]
    })
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('default')
  })

  it('returns a parameter', () => {
    expect(event.getParameter('destination')).toEqual({
      'location_value': {
        'formatted_address': '1000 Broadway, San Francisco, CA 95133',
        'latlng': {'latitude': 37.620565, 'longitude': -122.384964}
      }, 'name': 'destination', 'raw_text': 'SFO'
    })
  })

})
