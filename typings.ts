import "@types/jest/index";

export declare interface IApiMapping {
  [key: string]: IApi;
}

export declare function require(moduleName: string): any;

export declare interface IApi {}

export declare interface IContainer {
  get: (key: any) => any;
}

export declare interface IEvent {
  tell(text: string);
  intent(): string;
  ask(text: string);
}

export declare interface IHandler {
  // createEvent(event: any, context: any, callback: () => any): IEvent;
}
