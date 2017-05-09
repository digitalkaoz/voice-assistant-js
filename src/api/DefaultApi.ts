import { IApi, IEvent } from '../../typings'

export class DefaultApi implements IApi {

  public default(event: IEvent): Promise<string> {
    return new Promise((resolve) => resolve(event.tell('default')))
  }
}
