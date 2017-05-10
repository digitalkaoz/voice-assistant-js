export class Pause {
  public pauseIntent(event) {
    event.tell('foo')
  }
}

export default {
  PauseIntent: Pause
}
