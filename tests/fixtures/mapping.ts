class Pause {
  public pauseIntent(event) {
    return new Promise((resolve) => {
      resolve(event.tell("foo"));
    });
  }
}

export default {
  PauseIntent: Pause,
};
