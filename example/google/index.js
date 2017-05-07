const voiceAssistent = require('./node_modules/voice-assistent-js/src/Handler').Handler

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

const handler = function (event, context, callback) {
  console.log(JSON.stringify(event), JSON.stringify(context))
  voiceAssistent.googleHome(mapping, event, context, callback)
}

exports.handler = handler
