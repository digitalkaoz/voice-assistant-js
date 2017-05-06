import { Response } from '../../typings';
import { Inject } from 'di-typescript';

@Inject
export class AlexaResponse implements Response {
  private defaultResponse: any = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: null
      },
      //shouldEndSession: true,
      card: {
        type: 'Simple',
        title: null,
        content: null
      }
    }
    //sessionAttributes: {}
  };

  build(data?: any): any {
    let response = this.defaultResponse;
    response.response.outputSpeech.ssml = `<speak>${data.text}</speak>`;

    if (!data.hasOwnProperty('card')) {
      delete response.response['card'];
    } else {
      response.response.card.title = data.card.title;
      response.response.card.content = data.card.content;
    }

    return response;
  }
}
