import 'reflect-metadata'
import {Container} from '../src/Container'
import {IFunction} from '../typings'
import mapping from './fixtures/mapping'

const c = new Container(mapping)
const lambda = c.get<IFunction>('lambda')

console.log('alexa' + '\n')
lambda.invoke(require('../tests/fixtures/alexa/event.json'), {
  succeed: console.log
}, console.log)

console.log('\n' + 'api-ai' + '\n')
lambda.invoke(require('../tests/fixtures/apiai/event.json'), {
  succeed: console.log
}, console.log)

console.log('\n' + 'google-action' + '\n')
lambda.invoke(require('../tests/fixtures/google-action/event.json'), {
  succeed: console.log
}, console.log)
