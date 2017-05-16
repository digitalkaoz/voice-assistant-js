import {ApiAiAssistent} from 'actions-on-google/api-ai-assistant.js'
import {Card} from 'alexa-sdk'
import {Component} from 'tsdi'
import {IEvent} from '../../typings'

@Component()
export class ApiAiEvent implements IEvent {

  constructor (/*@Inject({name: 'api-ai'})*/ private assistant: ApiAiAssistent) { }

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
