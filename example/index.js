const voiceAssistent = require('voice-assistant-js').AutoDetectHandler

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

  voiceAssistent.handle(mapping, event, context, callback)
}

exports.handler = handler
