import { Subscriber } from "./Subscriber"

let subjectSubscriberId = 0
class SubjectSubscriber {
  constructor (subscriber) {
    this.id = subjectSubscriberId++
    this.subscriber = subscriber
  }
}

export class Subject {
  constructor () {
    this._subscribers = []
  }

  subscribe (handler) {
    const subscriber = new Subscriber(handler)
    const subjSubs = new SubjectSubscriber(subscriber)

    const id = subjSubs.id
    this._subscribers.push(subjSubs)

    subscriber.setOnUnsubscribeHandler(() => this._removeSubscriber(id))

    return subscriber
  }

  _removeSubscriber (id) {
    const index = this._subscribers.findIndex(s => s.id === id)
    this._subscribers[index] = null
    this._subscribers.splice(index, 1)
  }

  next (data) {
    this._subscribers.forEach(({ subscriber }) => {
      subscriber.handleData(data)
    })
  }
}
