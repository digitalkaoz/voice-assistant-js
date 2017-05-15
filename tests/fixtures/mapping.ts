import {IApi, IEvent} from '../../typings'
export class Example implements IApi {
  public tell (event: IEvent) {
    event.tell('foo')
  }

  public ask (event: IEvent) {
    event.ask('foo')
  }

  public tellCard (event: IEvent) {
    event.tellWithCard('speech', {
      type: 'Simple',
      title: 'title',
      content: 'content',
      image: {
        smallImageUrl: 'http://small',
        largeImageUrl: 'http://large'
      }
    })
  }

  public askCard (event: IEvent) {
    event.askWithCard('speech', 'reprompt', {
      type: 'Simple',
      title: 'title',
      content: 'content',
      image: {
        smallImageUrl: 'http://small',
        largeImageUrl: 'http://large'
      }
    })
  }
}

export default {
  tell: Example,
  ask: Example,
  tellCard: Example,
  askCard: Example
}
