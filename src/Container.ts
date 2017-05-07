import { Injector, Module } from "di-typescript";
import { IApiMapping, IContainer as IContainer } from "../typings";
import { DefaultApi } from "./api/DefaultApi";

export class Container implements IContainer {

  private injector: Injector;

  constructor(mapping: IApiMapping) {

    // let apiClasses : Array<Module> = [];
    const apiClasses: any[] = [{
      provide: "default",
      useClass: DefaultApi,
    }];

    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        apiClasses.push({
          provide: key,
          useClass: mapping[key],
        });
      }
    }

    this.injector = new Injector(apiClasses);
  }

  public get(key: any): any {
    return this.injector.get(key);
  }
}
