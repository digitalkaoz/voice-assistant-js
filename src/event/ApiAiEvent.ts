import {ApiAiAssistent} from 'actions-on-google/api-ai-assistant.js'
import {Card} from 'alexa-sdk'
import {Component, Inject} from 'tsdi'
import {IEvent} from '../../typings'

@Component()
export class ApiAiEvent implements IEvent {

  constructor (@Inject({name: 'api-ai'}) private assistant: ApiAiAssistent) { }

  public intent (): string {
    return this.assistant.getIntent()
  }

  public tell (text) {
    this.assistant.tell(text)
  }

  public ask (text) {
    this.assistant.ask(text)
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
