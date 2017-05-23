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

  public signin (text: string) {
    // const input = this.handler.buildInputPrompt(false, text)

    this.handler.askForSignIn(/*text*/)
  }

  public isSignedIn (): boolean {
    return 'OK' === this.handler.getSignInStatus()
  }

  public getUser (): any {
    return this.handler.getUser()
  }

  askFormField (field: string, text: string, reprompt ?: string, delegate ?: string, card ?: Card) {
    throw new Error('not implemented')

    // this.handler.setContext()
    // this.ask(text, reprompt, card)
  }

  confirmFormField (field: string, text: string, reprompt ?: string, delegate ?: string, card ?: Card) {
    throw new Error('not implemented')

    // this.ask(text, reprompt, card)
  }

  submitForm (text: string, invalidCallback: Function, confirmedCallback: Function, reprompt ?: string, delegate ?: string, card ?: Card) {
    let input = text

    if (card) {
      input = this.createCard(card, text)
    }

    this.handler.askForConfirmation(input)
  }

  private createCard (card: Card, text) {
    return this.handler.buildRichResponse()
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
