# voice-assistant-js

one client library to rule them all (api-ai, google-action, alexa, ...)

## Installation

```
$ yarn install voice-assistant-js
```

then you should install the client library you want.

`actions-on-google` if you want to use **api-ai** or **google-actions**
`alexa-sdk` if you want to use **alexa**

## Usage

### on aws lamda

> make sure you use at least `node-6.10`

```js
require('reflect-metadata')
const lambda = require('voice-assistant-js').lambda

class IntentClass {
  say (event) {
    event.tell('say')
  }
  
  ask (event) {
    event.ask('ask')
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

## TODOS

* implement cards
* implement forms
* implement dialogs
* reliable error-handling
* google-cloud-function