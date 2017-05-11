import {Container} from '../../src/Container'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'

import mapping from '../fixtures/mapping'

describe('GoogleActionHandler', () => {
  const event = require('../fixtures/google-action/event.json')

  test('calls the given Api', () => {
    const callback = jest.fn()
    const c = new Container(mapping)

    new GoogleActionHandler(c).handle(event, {}, callback)

    expect(callback).toHaveBeenCalledWith(undefined, {
      expect_user_response: false,
      final_response: {speech_response: {text_to_speech: 'default'}}
    })

    c.close()
  })
})
