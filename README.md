# voice-assistant-js

one client library to rule them all (api-ai, google-action, alexa, ...)

## Installation

```
$ yarn install
```

## Usage

### on aws lamda
```js
require('reflect-metadata')
const lambda = require('voice-assistant-js').lambda

class IntentClass {
  say (event) {
    return new Promise(function (resolve) {
      resolve(event.tell('say'))
    })
  }
  
  ask (event) {
    return new Promise(function (resolve) {
      resolve(event.tell('ask'))
    })
  }
}

const mapping = {
  say: IntentClass,
  ask: IntentClass
}

exports.handler = lambda(mapping)
```

### on google-cloud-functions

//TODO

## Test

```
$ yarn test
```
