import {ActionsSdkAssistant} from 'actions-on-google'
import {Card} from 'alexa-sdk'
import {IEvent} from '../../typings'

export class GoogleActionEvent implements IEvent {

  constructor (private assistant: ActionsSdkAssistant) { }

  public tell (text) {
    return this.assistant.tell(text)
  }

  public intent (): string {
    return this.assistant.getIntent()
  }

  public ask (text) {
    return this.assistant.ask(text)
  }

  delegate (intent: string) {
    throw new Error('not implemented')
  }

  tellWithCard (text: string, card: Card) {
    throw new Error('not implemented')
  }

  askWithCard (text: string, reprompt: string, card: Card) {
    throw new Error('not implemented')
  }

  tellWithLinkAccountCard (text: string) {
    throw new Error('not implemented')
  }

  askWithLinkAccountCard (text: string) {
    throw new Error('not implemented')
  }

}
