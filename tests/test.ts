import 'reflect-metadata'
import {lambda} from '../src/Container'
import mapping from './fixtures/mapping'

console.log('alexa' + '\n')
lambda(mapping)(require('../tests/fixtures/alexa/event.json'), {
  succeed: console.log
}, console.log)

console.log('\n' + 'api-ai' + '\n')
lambda(mapping)(require('../tests/fixtures/apiai/event.json'), {
}, console.log)

console.log('\n' + 'google-action' + '\n')
lambda(mapping)(require('../tests/fixtures/google-action/event.json'), {
}, console.log)
