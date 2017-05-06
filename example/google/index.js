const voiceAssistent = require('./node_modules/voice-assistent-js/src/Handler').Handler

class Pause {
  pauseIntent () {
    return new Promise(function (resolve) {
      resolve('test')
    })
  }
}

const mapping = {
  'PauseIntent': Pause
}

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event), JSON.stringify(context));
  voiceAssistent.googleHome(mapping, event, context, callback)
}
