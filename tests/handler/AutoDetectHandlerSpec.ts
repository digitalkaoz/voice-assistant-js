import {Container} from '../../src/Container'
import {AutoDetectHandler} from '../../src/handler/AutoDetectHandler'

import mapping from '../fixtures/mapping'

describe('AutoDetectHandler', () => {

  const API_AI_EVENT = require('../fixtures/apiai/event.json')
  const ALEXA_EVENT = require('../fixtures/alexa/event.json')
  const GOOGLE_ACTION_EVENT = require('../fixtures/google-action/event.json')

  let handler: AutoDetectHandler
  let callback: () => void

  beforeEach(() => {
    handler = new AutoDetectHandler(new Container(mapping))
    callback = jest.fn()
  })

  it('detects api-ai request', () => {
    handler.handle(API_AI_EVENT, {}, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      contextOut: [],
      data: {google: {expect_user_response: false, is_ssml: false, no_input_prompts: []}},
      speech: 'default'
    })
  })

  it('detects alexa request', () => {
    const context = {
      succeed: callback
    }

    handler.handle(ALEXA_EVENT, context, callback)

    expect(callback).toHaveBeenCalledWith({
      response: {
        outputSpeech: {ssml: '<speak> foo </speak>', type: 'SSML'},
        shouldEndSession: true
      }, sessionAttributes: {}, version: '1.0'
    })
  })

  it('detects google-action request', () => {
    handler.handle(GOOGLE_ACTION_EVENT, {}, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      expect_user_response: false,
      final_response: {speech_response: {text_to_speech: 'default'}}
    })
  })

})
