import { IApi, IApiMapping, IEvent, IHandler } from "../../typings";
import { Container } from "../Container";

export abstract class Handler implements IHandler {

  private static camelize(intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return "";
      }

      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  protected container: Container;

  constructor(map: IApiMapping) {
    this.container = new Container(map);
  }

  public async handle(event, context, callback: (arg?: any) => any): Promise<any> {
    const eventWrapper = this.createEvent(event, context, callback);
    const api: IApi = this.container.get(eventWrapper.intent());

    return await api[Handler.camelize(eventWrapper.intent())](eventWrapper);
  }

  protected abstract createEvent(event, context, callback: () => any): IEvent;
}
