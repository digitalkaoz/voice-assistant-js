import { Container } from './Container';
import { GoogleHomeEvent } from './event/GoogleHomeEvent';
import { Api, Event, ApiMapping } from '../typings';
import { AlexaEvent } from './event/AlexaEvent';

export class Handler {

  static async googleHome(map: ApiMapping, event, context, callback) {
    try {
      await this.dispatch(map, new GoogleHomeEvent(event, context))
        .then((text) => callback(null, { speech: text }))
        .catch((error) => callback(error, { speech: error.toString() }))
        ;
    } catch (error) {
      callback(error, { speech: error.toString() })
    }
  }

  static async alexa(map: ApiMapping, event, context, callback) {
    try {
      await this.dispatch(map, new AlexaEvent(event, context))
        // TODO
        // .then((text) => callback(null, {speech: text}))
        // .catch((error) => callback(error, {speech: error.toString()}))
        ;
    } catch (error) {
      callback(error, { speech: error.toString() })
    }
  }

  private static dispatch(map: ApiMapping, event: Event): Promise<string> {
    const container = new Container(map);
    const api: Api = container.get(event.intent());

    return api[event.intent()](event);
  }
}
