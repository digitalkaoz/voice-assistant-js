import {AlexaObject, Card, Handler} from 'alexa-sdk'
import {Constructable} from 'tsdi'

export declare interface IApiMapping {
  [key: string]: Constructable<IApi>
}

export declare interface IApi {}

export declare interface IEvent {
  intent(): string

  delegate (intent: string)

  tell(text: string, cards?: Array<Card>)

  ask(text: string, reprompt?: string, cards?: Array<Card>)

  // tellWithLinkAccountCard (text: string)
  signin (text: string)

  isSignedIn(): boolean

  askFormField(field: string, text: string, reprompt?: string, delegate?: string, cards?: Array<Card>)

  confirmFormField(field: string, text: string, reprompt?: string, delegate?: string, cards?: Array<Card>)

  submitForm(text: string, invalidCallback: Function, unconfirmedCallback: Function, reprompt?: string, delegate?: string, cards?: Array<Card>)

  getParameter(name: string): any
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
