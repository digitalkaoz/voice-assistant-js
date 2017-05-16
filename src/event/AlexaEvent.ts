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

  public tell (text: string, card?: Card) {
    if (card) {
      this.handler.emit(':tellWithCard', text, card.title, card.content, card.image)
    } else {
      this.handler.emit(':tell', text)
    }
  }

  public ask (text: string, reprompt?: string, card?: Card) {
    if (card) {
      this.handler.emit(':askWithCard', text, reprompt, card.title, card.content, card.image)
    } else {
      this.handler.emit(':ask', text, reprompt || text)
    }
  }

  public tellWithLinkAccountCard (text: string) {
    this.handler.emit(':tellWithLinkAccountCard', text)
  }

  public askWithLinkAccountCard (text: string) {
    this.handler.emit(':askWithLinkAccountCard', text)
  }

  public askFormField (field: string, text: string, reprompt?: string, delegate?: string, card?: Card) {
    if (card) {
      this.handler.emit(':elicitSlotWithCard', field, text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':elicitSlot', field, text, reprompt || text, delegate)
    }
  }

  public confirmFormField (field: string, text: string, reprompt?: string, delegate?: string, card?: Card) {
    if (card) {
      this.handler.emit(':confirmSlotWithCard', field, text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':confirmSlot', field, text, reprompt || text, delegate)
    }
  }

  public submitForm (text: string, invalidCallback: Function, confirmedCallback: Function, reprompt?: string, delegate?: string, card?: Card) {
    const intent = this.handler._event.request.intent

    if (intent.confirmationStatus === 'CONFIRMED') {
      return confirmedCallback(this)
    }

    if (intent.confirmationStatus === 'DENIED') {
      return invalidCallback(this)
    }

    if (card) {
      this.handler.emit(':confirmIntentWithCard', text, reprompt || text, card.title, card.content, delegate, card.image)
    } else {
      this.handler.emit(':confirmIntent', text, reprompt || text, delegate)
    }
  }

  public getParameters (): Object {
    return this.handler._event.request.intent.slots
  }

  /*
   this.emit(':tellWithPermissionCard', speechOutput, permissionArray);
   */
}
