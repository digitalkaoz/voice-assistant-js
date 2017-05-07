import { Event } from '../../typings';

import { ActionsSdkAssistant } from 'actions-on-google/actions-sdk-assistant.js';

export class GoogleActionEvent implements Event {
  constructor(private assistant: ActionsSdkAssistant) { }

  tell(text) {
    return this.assistant.tell(text);
  }

  intent(): string {
    return this.assistant.getIntent();
  }

  ask(text) {
    return this.assistant.ask(text);
  }
}
