import { IApi, IApiMapping, IEvent, IHandler } from '../../typings'
import { Container } from '../Container'
import { Inject } from 'typedi'

@Inject()
export abstract class Handler implements IHandler {

  constructor(private container: Container) { }

  private static camelize(intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return ''
      }

      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
  }

  public handle(event, context, callback?: (error?: Error, data?: any) => any) {
    const eventWrapper = this.createEvent(event, context, callback)
    const api = this.container.get<IApi>(eventWrapper.intent())

    api[Handler.camelize(eventWrapper.intent())](eventWrapper)
  }

  protected abstract createEvent(event, context, callback: () => any): IEvent
}
