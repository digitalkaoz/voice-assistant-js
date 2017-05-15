import {DefaultApi} from '../../src/api/DefaultApi'
import {ApiAiEvent} from '../../src/event/ApiAiEvent'
import {ApiAiHandler} from '../../src/handler/ApiAiHandler'

describe('ApiAiHandler', () => {
  const event = require('../fixtures/apiai/event.json')

  it('calls the given Api', () => {
    const callback = jest.fn()

    const handler = new ApiAiHandler()
    const sdk = handler.createSdkHandler(event, {}, callback)

    handler.handle(new ApiAiEvent(sdk), new DefaultApi())

    expect(callback).toHaveBeenCalledWith(undefined, {
      contextOut: [],
      data: {google: {expect_user_response: false, is_ssml: false, no_input_prompts: []}},
      speech: 'default'
    })
  })
})
