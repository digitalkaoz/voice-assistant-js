const voiceAssistent = require('./node_modules/voice-assistent-js/src/Handler').Handler

class Pause {
  pauseIntent () {
    return new Promise(function (resolve) {
      resolve({
        text: 'this is some test',
        card: {
          title: 'card title',
          content: 'card description'
        }
      })
    })
  }
}

const mapping = {
  'PauseIntent': Pause
}

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event), JSON.stringify(context));

  voiceAssistent.alexa(mapping, event, context, callback)
}
