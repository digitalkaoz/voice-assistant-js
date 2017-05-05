import { Injector, Module } from 'di-typescript';
import { ApiMapping, Container as IContainer } from '../typings';

export class Container implements IContainer {

  private injector: Injector;

  constructor(mapping: ApiMapping) {

    // let apiClasses : Array<Module> = [];
    let apiClasses: Array<any> = [];

    for (let key in mapping) {
      apiClasses.push({
        provide: key,
        useClass: mapping[key]
      });
    }

    this.injector = new Injector(apiClasses);
  }

  get(key: any): any {
    return this.injector.get(key);
  }
}
