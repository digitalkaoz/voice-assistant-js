class Pause {
  pauseIntent(event) {
    return new Promise(function (resolve) {
      resolve(event.tell('foo'))
    })
  }
}

export default {
  'PauseIntent': Pause
}
