import { Container } from './Container';
import { GoogleHomeEvent } from './event/GoogleHomeEvent';
import { Api, ApiMapping, Event, Response } from '../typings';
import { AlexaEvent } from './event/AlexaEvent';
import { GoogleResponse } from './response/GoogleResponse';
import { AlexaResponse } from './response/AlexaResponse';

export class Handler {

  static async googleHome(map: ApiMapping, event, context, callback) {
    await this.dispatch(map, new GoogleHomeEvent(event, context), new GoogleResponse(), callback);
  }

  static async alexa(map: ApiMapping, event, context, callback) {
    await this.dispatch(map, new AlexaEvent(event, context), new AlexaResponse(), callback);
  }

  private static dispatch(map: ApiMapping, event: Event, response: Response, callback: Function): Promise<string> {
    const container = new Container(map);
    const api: Api = container.get(event.intent());

    try {
      return api[this.camelize(event.intent())](event)
        .then((data) => callback(null, response.build(data)))
        .catch((error) => callback(error, response.build({ speech: error.toString() })))
        ;
    } catch (error) {
      callback(error, response.build({ speech: error.toString() }))
    }
  }

  private static camelize(intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) {
        return ''
      };

      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
}
