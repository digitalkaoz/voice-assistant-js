import {DefaultApi} from '../../src/api/DefaultApi'
import {GoogleActionEvent} from '../../src/event/GoogleActionEvent'
import {GoogleActionHandler} from '../../src/handler/GoogleActionHandler'

describe('GoogleActionHandler', () => {
  const event = require('../fixtures/google-action/event.json')

  test('calls the given Api', () => {
    const callback = jest.fn()

    const handler = new GoogleActionHandler()
    const sdk = handler.createSdkHandler(event, {}, callback)

    handler.handle(new GoogleActionEvent(sdk), new DefaultApi())

    expect(callback).toHaveBeenCalledWith(undefined, {
      expect_user_response: false,
      final_response: {speech_response: {text_to_speech: 'default'}}
    })
  })
})
