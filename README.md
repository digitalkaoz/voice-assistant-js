# voice-assistant-js

one client library to rule them all (api-ai, google-action, alexa, ...)

[![Build Status](https://travis-ci.org/digitalkaoz/voice-assistant-js.svg?branch=master)](https://travis-ci.org/digitalkaoz/voice-assistant-js)
[![Coverage Status](https://coveralls.io/repos/github/digitalkaoz/voice-assistant-js/badge.svg?branch=master)](https://coveralls.io/github/digitalkaoz/voice-assistant-js?branch=master)
[![npm](https://img.shields.io/npm/v/voice-assistant-js.svg)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/digitalkaoz/voice-assistant-js/master/LICENSE)

## Installation

```
$ yarn add voice-assistant-js
```

then you should install the client library you want.

* `actions-on-google` and `express` if you want to use **api-ai** or **google-actions**

* `alexa-sdk` if you want to use **alexa**

## Usage

### on aws lamda

> make sure you use at least `node-6.10`

```js
require('reflect-metadata')
const lambda = require('voice-assistant-js').lambda

class IntentClass {
  /**
   * @param {IEvent} event
   */
  say (event) {
    event.tell('say')
  }
  
  /**
   * @param {IEvent} event
   */
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

so if you the lamda is invoked with the *intent* **ask** 
the function `IntentClass.ask` is called...

### on google-cloud-functions

//TODO

## Test

```
$ yarn test
```

## TODOS

- [ ] event construction with DI factory (so we can get rid of the specific handler classes)
- [ ] i18n
- [ ] cards
- [ ] forms
- [ ] dialogs
- [ ] error-handling
- [ ] google-cloud-function