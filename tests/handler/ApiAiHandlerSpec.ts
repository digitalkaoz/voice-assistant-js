import { ApiAiHandler } from '../../src/Handler/ApiAiHandler';

import mapping from '../fixtures/mapping';
const event = require('../fixtures/apiai/event.json');

describe('ApiAiHandler', () => {

  it('calls the given Api', (done) => {
    new ApiAiHandler(mapping).handle(event, {}, (data) => {
      expect(JSON.parse(data.toString())).toEqual({
        contextOut: [],
        data: { google: { expect_user_response: false, is_ssml: false, no_input_prompts: [] } },
        speech: 'default'
      });
      done();
    }).catch(done.fail);
  });
});
