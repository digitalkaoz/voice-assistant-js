import {ActionsSdkAssistant} from 'actions-on-google'
import {Card} from 'alexa-sdk'
import {IEvent} from '../../typings'

export class GoogleActionEvent implements IEvent {

  constructor (private assistant: ActionsSdkAssistant) { }

  public intent (): string {
    return this.assistant.getIntent()
  }

  public tell (text, card?: Card) {
    this.assistant.tell(text)
  }

  public ask (text, reprompt?: string, card?: Card) {
    this.assistant.ask(text)
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

  askFormField (field: string, text: string, reprompt?: string, delegate?: string, card?: Card) {
    throw new Error('not implemented')
  }

  confirmFormField (field: string, text: string, reprompt?: string, delegate?: string, card?: Card) {
    throw new Error('not implemented')
  }

  submitForm (text: string, invalidCallback: Function, unconfirmedCallback: Function, reprompt?: string, delegate?: string, card?: Card) {
    throw new Error('not implemented')
  }

  getParameters (): Object {
    throw new Error('not implemented')
  }

}
