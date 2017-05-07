import { Event } from '../../typings';

import { ApiAiAssistent } from 'actions-on-google/api-ai-assistant.js';

export class ApiAiEvent implements Event {
  constructor(private assistant: ApiAiAssistent) { }

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
