import {Assistant, Responses} from 'actions-on-google'
import {Card} from 'alexa-sdk'

export abstract class GoogleEvent {

  constructor (/*@Inject({name: 'api-ai'})*/ protected handler: Assistant) { }

  public intent (): string {
    return this.handler.getIntent()
  }

  public tell (text, card?: Card) {
    let input = text
    if (card) {
      input = this.createCard(card, text)
    }

    this.handler.tell(input)
  }

  public ask (text, reprompt?: string, card?: Card) {
    let input = text
    if (card) {
      input = this.createCard(card, text)
    }

    this.handler.ask(input)
  }

  getParameter (name: string): any {
    return this.handler.getArgument(name)
  }

  public delegate (intent: string) {
    throw new Error('not implemented')
  }

  public tellWithLinkAccountCard (text: string) {
    throw new Error('not implemented')
  }

  public askWithLinkAccountCard (text: string) {
    throw new Error('not implemented')
  }

  askFormField (field: string, text: string, reprompt ?: string, delegate ?: string, card ?: Card) {
    const dialog = this.handler.getDialogState()

    this.handler.ask()
    throw new Error('not implemented')
  }

  confirmFormField (field: string, text: string, reprompt ?: string, delegate ?: string, card ?: Card) {
    throw new Error('not implemented')
  }

  submitForm (text: string, invalidCallback: Function, unconfirmedCallback: Function, reprompt ?: string, delegate ?: string, card ?: Card) {
    throw new Error('not implemented')
  }

  private createCard (card: Card, text) {
    return new Responses.RichResponse()
      .addSimpleResponse(text)
      .addBasicCard(this.handler.buildBasicCard(card.content)
        .setTitle(card.title)
        // .addButton('Read more')
        .setImage(card.image.largeImageUrl, 'image')
      )
  }

  /*
askForDeliveryAddress
askWithCarousel
askWithList

getDateTime
getDeliveryAddress
getInputType
getRawInput
getSelectedOption
getSignInStatus
getSurfaceCapabilities
getTransactionDecision
getTransactionRequirementsResult
getUser
getUserConfirmation

*/

}
