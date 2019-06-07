export class Subscriber {
  constructor (handler) {
    this._handler = handler
    this._onUnsubscribeHandler = () => null
  }

  setOnUnsubscribeHandler (onUnsubscribe) {
    this._onUnsubscribeHandler = onUnsubscribe
  }

  handleData (data) {
    this._handler(data)
  }

  unsubscribe () {
    this._handler = () => null
    this._onUnsubscribeHandler()
  }
}
