import {Inject, TSDI} from 'tsdi'
import {IApi, IEvent, IHandler} from '../../typings'
import debug = require('debug')

export abstract class Handler implements IHandler {

  // TODO dont inject TSDI directly, why does Container not work? circular-reference handling?
  /*
   Uncaught exception: TypeError: Cannot read property 'rtti' of undefined
   TypeError: Cannot read property 'rtti' of undefined
   at Container.TSDI.getOrCreate (node_modules/tsdi/lib/decorators.ts:195:17)
   at node_modules/tsdi/lib/decorators.ts:180:28
   */
  constructor (@Inject() private container: TSDI) {}

  private static camelize (intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return ''
      }

      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
  }

  public handle (event, context, callback?: (error?: Error, data?: any) => any) {
    const eventWrapper = this.createEvent(event, context, callback)

    const api = this.container.get<IApi>(eventWrapper.intent())

    debug('handler: class=%o function=%s', api, eventWrapper.intent())

    api[Handler.camelize(eventWrapper.intent())](eventWrapper)
  }

  protected abstract createEvent (event, context, callback: () => any): IEvent
}
