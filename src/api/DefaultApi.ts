import { Api, Event } from '../../typings';

export class DefaultApi implements Api {

  public default(event: Event): Promise<string> {
    return new Promise((resolve) => resolve(event.tell('default')));
  }
}
