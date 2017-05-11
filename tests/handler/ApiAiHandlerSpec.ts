import { Container } from '../../src/Container'
import { ApiAiHandler } from '../../src/handler/ApiAiHandler'

import mapping from '../fixtures/mapping'

describe('ApiAiHandler', () => {
  const event = require('../fixtures/apiai/event.json')

  it('calls the given Api', () => {
    const callback = jest.fn()

    new ApiAiHandler(new Container(mapping)).handle(event, {}, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      contextOut: [],
      data: { google: { expect_user_response: false, is_ssml: false, no_input_prompts: [] } },
      speech: 'default'
    })
  })
})
