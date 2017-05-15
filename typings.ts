import {AlexaObject, Card, Handler} from 'alexa-sdk'
import {Constructable} from 'tsdi'

export declare interface IApiMapping {
  [key: string]: Constructable<IApi>
}

export declare function require (moduleName: string): any

export declare interface IApi {}

export declare interface IContainer {
  get: (key: any) => any
}

export declare interface IEvent {
  tell(text: string)
  intent(): string
  ask(text: string)
  delegate (intent: string)
  tellWithCard (text: string, card: Card)
  askWithCard (text: string, reprompt: string, card: Card)
  tellWithLinkAccountCard (text: string)
  askWithLinkAccountCard (text: string)
}

export declare interface IHandler {
  // createEvent(event: any, context: any, callback: () => any): IEvent;
  handle(event: IEvent, api: IApi)
  createSdkHandler(event: any, context: any, callback: () => any)
}

// TODO add specific interfaces for different event and context objects

export declare interface IFunction {
  invoke(event: any, context: any, callback: (data: any) => any)
}

export declare interface AlexaSdk extends AlexaObject, Handler {}
