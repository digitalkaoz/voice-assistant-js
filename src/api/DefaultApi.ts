import {IApi, IEvent} from '../../typings'

export class DefaultApi implements IApi {

  public default(event: IEvent) {
    event.tell('default')
  }
}
