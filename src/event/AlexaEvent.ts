import {Card} from 'alexa-sdk'
import {AlexaSdk, IEvent} from '../../typings'

export class AlexaEvent implements IEvent {

  constructor (private handler: AlexaSdk) {}

  public intent (): string {
    return this.handler._event.request.intent.name
  }

  public tell (text: string) {
    this.handler.emit(':tell', text)
  }

  public ask (text: string) {
    this.handler.emit(':ask', text)
  }

  public delegate (intent: string) {
    this.handler.emit(':delegate', intent)
  }

  public tellWithCard (text: string, card: Card) {
    this.handler.emit(':tellWithCard', text, card.title, card.content, card.image)
  }

  public askWithCard (text: string, reprompt: string, card: Card) {
    this.handler.emit(':askWithCard', text, reprompt, card.title, card.content, card.image)
  }

  public tellWithLinkAccountCard (text: string) {
    this.handler.emit(':tellWithLinkAccountCard', text)
  }

  public askWithLinkAccountCard (text: string) {
    this.handler.emit(':askWithLinkAccountCard', text)
  }

  /*
   this.emit(':tellWithPermissionCard', speechOutput, permissionArray);
   this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech, updatedIntent);
   this.emit(':elicitSlotWithCard', slotToElicit, speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj);
   this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech, updatedIntent);
   this.emit(':confirmSlotWithCard', slotToConfirm, speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj);
   this.emit(':confirmIntent', speechOutput, repromptSpeech, updatedIntent);
   this.emit(':confirmIntentWithCard', speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj);
   */
}
