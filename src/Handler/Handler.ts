import { Api, ApiMapping } from '../../typings';
import { Container } from '../Container';

export abstract class Handler {
  protected container: Container;

  constructor(map: ApiMapping) {
    this.container = new Container(map);
  }

  private static camelize(intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) {
        return '';
      }

      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  async handle(event, context, callback) {
    const eventWrapper = this.createEvent(event, context, callback);
    const api: Api = this.container.get(eventWrapper.intent());

    return await api[Handler.camelize(eventWrapper.intent())](eventWrapper);
  }

  protected abstract createEvent(event, context, callback);

}
