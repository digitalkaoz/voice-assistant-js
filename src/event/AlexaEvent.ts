import {Card} from 'alexa-sdk'
import {AlexaSdk, IEvent} from '../../typings'

export class AlexaEvent implements IEvent {

  constructor (private handler: AlexaSdk) {}

  public intent (): string {
    return this.handler._event.request.intent.name
  }

  public delegate (intent: string) {
    this.handler.emit(':delegate', intent)
  }

  public tell (text: string, cards?: Array<Card>) {
    if (cards && cards.length) {
      const card = cards.shift()
      this.handler.emit(':tellWithCard', text, card.title, card.content, card.image)
    } else {
      this.handler.emit(':tell', text)
    }
  }

  public ask (text: string, reprompt?: string, cards?: Array<Card>) {
    if (cards && cards.length) {
      const card = cards.shift()
      this.handler.emit(':askWithCard', text, reprompt, card.title, card.content, card.image)
    } else {
      this.handler.emit(':ask', text, reprompt || text)
    }
  }

  public signin (text: string) {
    this.handler.emit(':askWithLinkAccountCard', text)
  }

  public isSignedIn (): boolean {
    return !!this.handler._event.session.user
  }

  public getUser (): any {
    return this.handler._event.session.user
  }

  public askFormField (field: string, text: string, reprompt?: string, delegate?: string, cards?: Array<Card>) {
    if (cards && cards.length) {
      const card = cards.shift()
      this.handler.emit(':elicitSlotWithCard', field, text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':elicitSlot', field, text, reprompt || text, delegate)
    }
  }

  public confirmFormField (field: string, text: string, reprompt?: string, delegate?: string, cards?: Array<Card>) {
    if (cards && cards.length) {
      const card = cards.shift()
      this.handler.emit(':confirmSlotWithCard', field, text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':confirmSlot', field, text, reprompt || text, delegate)
    }
  }

  public submitForm (text: string, invalidCallback: Function, confirmedCallback: Function, reprompt?: string, delegate?: string, cards?: Array<Card>) {
    const intent = this.handler._event.request.intent

    if (intent.confirmationStatus === 'CONFIRMED') {
      return confirmedCallback(this)
    }

    if (intent.confirmationStatus === 'DENIED') {
      return invalidCallback(this)
    }

    if (cards && cards.length) {
      const card = cards.shift()
      this.handler.emit(':confirmIntentWithCard', text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':confirmIntent', text, reprompt || text, delegate)
    }
  }

  public getParameter (name: string): any {
    return this.handler._event.request.intent.slots[name]['value'] || null
  }

  /*
    this.handler.emit(':tellWithPermissionCard', speechOutput, permissionArray);
    this.handler.emit(':tellWithLinkAccountCard', text)
   */
}
