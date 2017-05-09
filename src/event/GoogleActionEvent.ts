import { IEvent } from '../../typings'

import { ActionsSdkAssistant } from 'actions-on-google/actions-sdk-assistant.js'

export class GoogleActionEvent implements IEvent {
  constructor(private assistant: ActionsSdkAssistant) { }

  public tell(text) {
    return this.assistant.tell(text)
  }

  public intent(): string {
    return this.assistant.getIntent()
  }

  public ask(text) {
    return this.assistant.ask(text)
  }
}
