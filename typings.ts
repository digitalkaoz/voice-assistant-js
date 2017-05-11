import {AlexaObject, Handler} from 'alexa-sdk'
import {Constructable} from 'tsdi'

export declare interface IApiMapping {
  [key: string]: Constructable<IApi>
}

export declare function require(moduleName: string): any

export declare interface IApi {}

export declare interface IContainer {
  get: (key: any) => any
}

export declare interface IEvent {
  tell(text: string)
  intent(): string
  ask(text: string)
}

export declare interface IHandler {
  // createEvent(event: any, context: any, callback: () => any): IEvent;
  handle(event: any, context: any, callback: () => any)
}

export declare interface HandlerConstructor {
  new (handler?: any): IHandler
  clone(): IHandler
}

export declare const ApiHandler: HandlerConstructor

// TODO add specific interfaces for different event and context objects

export declare interface IFunction {
  invoke(event: any, context: any, callback: (data: any) => any)
}

export declare interface AlexaSdk extends AlexaObject, Handler {}
