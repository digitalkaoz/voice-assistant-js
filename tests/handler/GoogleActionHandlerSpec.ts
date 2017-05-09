import { Container } from '../../src/Container'
import { GoogleActionHandler } from '../../src/handler/GoogleActionHandler'

import mapping from '../fixtures/mapping'

describe('GoogleActionHandler', () => {

  const event = require('../fixtures/google-action/event.json')

  it('calls the given IApi', async () => {
    const callback = jest.fn()
    await new GoogleActionHandler(new Container(mapping)).handle(event, {}, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      expect_user_response: false,
      final_response: { speech_response: { text_to_speech: 'default' } }
    })
  })
})
