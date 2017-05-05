import { Event } from '../../typings';

export class AlexaEvent implements Event {
  constructor(private event: any, private context: any) {
  }

  intent() {
    return this.event.result.action;
  }

  parameters() {
    return this.event.result.parameters;
  }

  contexts() {
    return this.event.result.contexts;
  }

  token() {
    return this.event.originalRequest.data.user.access_token;
  }

  user() {
    return this.event.originalRequest.data.user;
  }

  conversation() {
    return this.event.originalRequest.data.conservation;
  }
}
