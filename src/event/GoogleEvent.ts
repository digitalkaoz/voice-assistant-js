import {Assistant, Responses} from 'actions-on-google'
import {Card} from 'alexa-sdk'

export abstract class GoogleEvent {

  constructor (/*@Inject({name: 'api-ai'})*/ protected handler: Assistant) { }

  public intent (): string {
    return this.handler.getIntent()
  }

  public tell (text, cards?: Array<Card>) {
    let input = text

    if (cards && cards.length) {
      const card = this.createCard([cards.shift()])
      // TODO google cant tell with carousel

      input = this.handler.buildRichResponse().addSimpleResponse(text).addBasicCard(card)
    }

    this.handler.tell(input)
  }

  public ask (text, reprompt?: string, cards?: Array<Card>) {
    if (cards && cards.length === 1) {
      this.handler.ask(this.handler.buildRichResponse().addSimpleResponse(text).addBasicCard(this.createCard(cards)))
    } else if (cards && cards.length) {
      this.handler.askWithCarousel(this.handler.buildRichResponse().addSimpleResponse(text), this.createCard(cards))
    } else {
      this.handler.ask(text)
    }
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

  askFormField (field: string, text: string, reprompt ?: string, delegate ?: string, cards ?: Array<Card>) {
    throw new Error('not implemented')

    // this.handler.setContext()
    // this.ask(text, reprompt, card)
  }

  confirmFormField (field: string, text: string, reprompt ?: string, delegate ?: string, cards ?: Array<Card>) {
    throw new Error('not implemented')

    // this.ask(text, reprompt, card)
  }

  submitForm (text: string, invalidCallback: Function, confirmedCallback: Function, reprompt ?: string, delegate ?: string, cards ?: Array<Card>) {
    let input = text

    if (cards && cards.length) {
      input = this.handler.buildRichResponse().addSimpleResponse(text).addBasicCard(this.createCard(cards))
    }

    this.handler.askForConfirmation(input)
  }

  private createCard (cards: Array<Card>): Responses.BasicCard | Responses.Carousel {
    if (cards.length === 1) {
      const card = cards.shift()
      return this.handler.buildBasicCard(card.content)
        .setTitle(card.title)
        // .addButton('Read more')
        .setImage(card.image.largeImageUrl, 'image')
    }

    let items = []

    cards.forEach((card) => {
      items.push(this.handler.buildOptionItem(card.title)
        .setTitle(card.title)
        .setDescription(card.content)
        .setImage(card.image.largeImageUrl, 'image')
      )
    })

    return this.handler.buildCarousel().addItems(items)
  }

  /*
askForDeliveryAddress
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
