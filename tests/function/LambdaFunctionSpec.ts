import {lambda} from '../../src/Container'
import {LamdaFunction} from '../../src/function/LamdaFunction'

import mapping from '../fixtures/mapping'

describe('LamdaFunction', () => {

  it('can process alexa requests', () => {
    const event = require('../fixtures/alexa/event.json')
    const context = require('../fixtures/alexa/context.json')

    const callback = jest.fn()
    context.succeed = callback

    lambda(mapping)(event, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {
          ssml: '<speak> foo </speak>',
          type: 'SSML'
        },
        shouldEndSession: true
      },
      sessionAttributes: {},
      version: '1.0'
    })
  })

  it('can process api-api requests', () => {
    const event = require('../fixtures/apiai/event.json')
    const callback = jest.fn()
    const context = {
      succeed: callback
    }

    lambda(mapping)(event, context, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      contextOut: [],
      data: {google: {expect_user_response: false, is_ssml: false, no_input_prompts: []}},
      speech: 'default'
    })
  })

  it('can process google-action requests', () => {
    const event = require('../fixtures/google-action/event.json')
    const callback = jest.fn()
    const context = {
      succeed: callback
    }

    lambda(mapping)(event, context, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      expect_user_response: false,
      final_response: {speech_response: {text_to_speech: 'default'}}
    })
  })

})
