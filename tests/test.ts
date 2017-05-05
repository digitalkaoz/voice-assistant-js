import { Handler } from '../src/Handler';

const mockEvent = require('./google_request.json');
const mapping = require('./mappings.ts');

Handler.googleHome(mapping.default, mockEvent, {}, (error, result) => {
  console.log(error, result);
})
  //   .then(console.log)
  //    .catch(console.error)
  ;
