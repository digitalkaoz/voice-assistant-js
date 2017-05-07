///<reference path="node_modules/@types/jest/index.d.ts"/>

export declare interface ApiMapping {
  [key: string]: Api
}

export declare function require(moduleName: string): any;

export declare interface Api {

}

export declare interface Container {
  get: Function;
}

export declare interface Event {
  tell(text: string);
  intent(): string;
  ask(text: string);
}

export declare interface Response {
  build(data: any): Object
}
