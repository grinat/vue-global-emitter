export class SubscribersGroup {
  constructor (subscribers = []) {
    this._subscribers = subscribers
  }

  unsubscribe () {
    this._subscribers.forEach(subscriber => {
      subscriber.unsubscribe()
    })
    this._subscribers = []
  }
}
