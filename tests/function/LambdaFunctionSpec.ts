import { LamdaFunction } from '../../src/function/LamdaFunction'
import { AutoDetectHandler } from '../../src/handler/AutoDetectHandler'

import mapping from '../fixtures/mapping'
import { Container } from '../../src/Container'

const event = require('../fixtures/alexa/event.json')
const context = require('../fixtures/alexa/context.json')

describe('LamdaFunction', () => {
  it('calls the given IApi', () => {
    const lamda = new LamdaFunction(new AutoDetectHandler(new Container(mapping)))
    const callback = jest.fn()
    context.succeed = callback

    lamda.invoke(event, context, callback)

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
})
