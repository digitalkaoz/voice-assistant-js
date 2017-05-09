require('reflect-metadata')
const lambda = require('./node_modules/voice-assistant-js/src/Container').lambda

class Pause {
  pauseIntent (event) {
    return new Promise(function (resolve) {
      resolve(event.tell('foo'))
    })
  }
}

const mapping = {
  'PauseIntent': Pause
}

exports.handler = lambda(mapping)
