export class Pause {
  public pauseIntent(event): Promise<string> {
    return new Promise((resolve) => {
      resolve(event.tell('foo'))
    })
  }
}

export default {
  PauseIntent: Pause
}
