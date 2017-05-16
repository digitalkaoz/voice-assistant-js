import {IApi, IEvent} from '../../typings'
export class Example implements IApi {
  public tell (event: IEvent) {
    event.tell('foo')
  }

  public ask (event: IEvent) {
    event.ask('foo')
  }

  public tellCard (event: IEvent) {
    event.tell('speech', {
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
    event.ask('speech', 'reprompt', {
      type: 'Simple',
      title: 'title',
      content: 'content',
      image: {
        smallImageUrl: 'http://small',
        largeImageUrl: 'http://large'
      }
    })
  }

  public tellLinkAccountCard (event: IEvent) {
    event.tellWithLinkAccountCard('speech')
  }

  public askLinkAccountCard (event: IEvent) {
    event.askWithLinkAccountCard('speech')
  }

  public delegate (event: IEvent) {
    event.delegate('askCard')
  }

}

export default {
  tell: Example,
  ask: Example,
  tellCard: Example,
  askCard: Example
}
