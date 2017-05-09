import { IEvent } from '../../typings'

import { ApiAiAssistent } from 'actions-on-google/api-ai-assistant.js'

export class ApiAiEvent implements IEvent {
  constructor(private assistant: ApiAiAssistent) { }

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
