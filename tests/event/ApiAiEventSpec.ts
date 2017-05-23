import {Card} from 'alexa-sdk'
import {ApiAiEvent} from '../../src/event/ApiAiEvent'
import {ApiAiHandler} from '../../src/handler/ApiAiHandler'

describe('ApiAiEvent', () => {

  const mockEvent = require('../fixtures/apiai/event.json')

  let event: ApiAiEvent
  let assistant
  let callback

  const defaultCard: Card = {
    image: {smallImageUrl: 'http://small', largeImageUrl: 'http://large.com/foo.jpg'},
    type: 'Standard',
    title: 'cardTitle',
    content: 'cardContent'
  }

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

  it('can tell with card', () => {
    event.tell('foo', defaultCard)

    expect(callback).toHaveBeenCalledWith(undefined, {
      'contextOut': [],
      'data': {
        'google': {
          'expect_user_response': false,
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
      },
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

  it('can ask with card', () => {
    event.ask('foo', null, defaultCard)

    expect(callback).toHaveBeenCalledWith(undefined, {
      'contextOut': [{
        'lifespan': 100,
        'name': '_actions_on_google_',
        'parameters': {}
      }],
      'data': {
        'google': {
          'expect_user_response': true,
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
      },
      'speech': 'foo'
    })
  })

  it('returns the intent', () => {
    expect(event.intent()).toBe('default')
  })

  it('can signin', () => {
    event.signin('foo')

    expect(callback).toHaveBeenCalledWith(undefined, {
      'contextOut': [{
        'lifespan': 100,
        'name': '_actions_on_google_',
        'parameters': {}
      }],
      'data': {
        'google': {
          'expect_user_response': true,
          'is_ssml': false,
          'no_input_prompts': [],
          'system_intent': {'data': {}, 'intent': 'actions.intent.SIGN_IN'}
        }
      },
      'speech': 'PLACEHOLDER_FOR_SIGN_IN'
    })
  })

  it('can check for signin status', () => {
    expect(event.isSignedIn()).toBeFalsy()

    mockEvent.originalRequest.data.inputs = [{
      'arguments': [
        {
          'name': 'SIGN_IN',
          'extension': {'status': 'OK'}
        }
      ]
    }]
    assistant = new ApiAiHandler().createSdkHandler(mockEvent, {}, callback)
    event = new ApiAiEvent(assistant)

    expect(event.isSignedIn()).toBeTruthy()
  })

  it('can return the user', () => {
    expect(event.getUser()).toEqual({
      'accessToken': 'TOKEN',
      'access_token': 'TOKEN',
      'profile': {'displayName': 'Sam', 'familyName': 'Johnson', 'givenName': 'Sam'},
      'userId': 'USERID',
      'userName': {'displayName': 'Sam', 'familyName': 'Johnson', 'givenName': 'Sam'},
      'user_id': 'USERID'
    })
  })

})
