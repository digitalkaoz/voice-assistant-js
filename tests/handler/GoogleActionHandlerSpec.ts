import { GoogleActionHandler } from '../../src/Handler/GoogleActionHandler';

import mapping from '../fixtures/mapping';
const event = require('../fixtures/google-action/event.json');

describe('GoogleActionHandler', () => {

  it('calls the given Api', (done) => {
    new GoogleActionHandler(mapping).handle(event, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        expect_user_response: false,
        final_response: { speech_response: { text_to_speech: 'default' } }
      });
      done();
    }).catch(done.fail);
  });
});
