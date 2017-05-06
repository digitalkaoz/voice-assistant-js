import { Response } from '../../typings';
import { Inject } from 'di-typescript';

@Inject
export class GoogleResponse implements Response {

  build(data: any): Object {
    return {
      speech: data.text
    };
  }
}
