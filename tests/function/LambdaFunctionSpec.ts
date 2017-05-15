import {Container, lambda} from '../../src/Container'
import {LamdaFunction} from '../../src/function/LamdaFunction'

import mapping from '../fixtures/mapping'

const event = require('../fixtures/alexa/event.json')
const context = require('../fixtures/alexa/context.json')

describe('LamdaFunction', () => {
  it('calls the given IApi', () => {
    const lamda = new LamdaFunction(Container.create(mapping))
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

  it('works with the shorthand function', () => {
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
})
