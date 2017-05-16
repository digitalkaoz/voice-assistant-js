import {AlexaObject, Card, Handler} from 'alexa-sdk'
import {Constructable} from 'tsdi'

export declare interface IApiMapping {
  [key: string]: Constructable<IApi>
}

export declare interface IApi {}

export declare interface IEvent {
  intent(): string
  delegate (intent: string)
  tell(text: string, card?: Card)
  ask(text: string, reprompt?: string, card?: Card)
  tellWithLinkAccountCard (text: string)
  askWithLinkAccountCard (text: string)
  askFormField(field: string, text: string, reprompt?: string, delegate?: string, card?: Card)
  confirmFormField(field: string, text: string, reprompt?: string, delegate?: string, card?: Card)
  submitForm(text: string, invalidCallback: Function, unconfirmedCallback: Function, reprompt?: string, delegate?: string, card?: Card)
  getParameters(): Object
}

export declare interface IHandler {
  handle(event: IEvent, api: IApi)
  createSdkHandler(event: any, context: any, callback: () => any)
}

// TODO add specific interfaces for different event and context objects

export declare interface IFunction {
  invoke(event: any, context: any, callback: (data: any) => any)
}

export declare interface AlexaSdk extends AlexaObject, Handler {}
