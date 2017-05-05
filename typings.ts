export declare interface ApiMapping {
  [key: string]: Api
}

export declare interface Api {

}

export declare interface Container {
  get: Function;
}

export declare interface Event {
  // constructor(rawEvent: Object);
  intent(): string;
  parameters(): string;
  contexts(): string;
  token(): string;
  user(): string;
  conversation(): string;
}
