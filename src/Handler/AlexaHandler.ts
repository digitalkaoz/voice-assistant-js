import { Handler } from './Handler';
import { AlexaEvent } from '../event/AlexaEvent';
import { Event } from '../../typings';

export class AlexaHandler extends Handler {

  protected createEvent(event, context, callback): Event {
    const alexa = require('alexa-sdk').handler(event, context);

    return new AlexaEvent(alexa, callback);
  }
}
