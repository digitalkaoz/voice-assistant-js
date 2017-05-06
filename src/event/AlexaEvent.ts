import { Event } from '../../typings';

export class AlexaEvent implements Event {
  constructor(private event: any, private context: any) {
  }

  locale() {
    return this.event.request.locale;
  }

  intent() {
    return this.event.request.intent.name;
  }

  parameters() {
    return this.event.request.intent.slots;
  }

  contexts() {
    return this.context;
  }

  token() {
    return this.event.session.user.userId;
  }

  user() {
    return this.event.session.user;
  }

  conversation() {
    return this.event; // TODO
  }
}
