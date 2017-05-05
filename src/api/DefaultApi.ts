import { Inject } from 'di-typescript';
import { Api } from '../../typings';

@Inject
export class DefaultApi implements Api {

  public welcome(event: Event): Promise<string> {
    return new Promise((resolve) => resolve('welcome'));
  }
}
