import {IApi, IEvent} from '../../typings'
import debug = require('debug')

export abstract class Handler {

  public handle (event: IEvent, api: IApi) {
    api[this.camelize(event.intent())](event)
  }

  private camelize (intent: string): string {
    return intent.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return ''
      }

      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
  }
}
