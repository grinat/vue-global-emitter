import { Subject } from './Subject'
import events from './events'

class Emitter {
  constructor (opts = {}) {
    this._options = Object.assign({
      debug: false
    }, opts)
    this._subjects = events.messages
  }

  emit (name, data) {
    let fnName = this._createName(name)
    this._subjects[fnName] || (this._subjects[fnName] = new Subject())
    this._options.debug === true && console.log('new subject=' + name + ' list of observers:', this._subjects[fnName])
    this._subjects[fnName].next(data)
  }

  listen (name, handler) {
    let fnName = this._createName(name)
    this._subjects[fnName] || (this._subjects[fnName] = new Subject())
    this._options.debug === true && console.log('new subject=' + name + ' list of observers:', this._subjects[fnName])
    return this._subjects[fnName].subscribe(handler)
  }

  emitWithDelivery (name, data, deliveryRepeatCount = 200) {
    let fnName = this._createName(name)
    this._subjects[fnName] || (this._subjects[fnName] = new Subject())
    this._options.debug === true && console.log('new delivery subject=' + name + ' list of observers:', this._subjects[fnName])

    // set to data property with delivery info
    data = data || {}
    data._delivery = {
      isReceived: false,
      repeats: 0,
      deliveryRepeatCount: +(deliveryRepeatCount || 200)
    }

    data.received = function () {
      data._delivery.isReceived = true
    }

    this._repeatMessage(this._subjects, { fnName, data })
  }

  _repeatMessage (subjects, { fnName, data }) {
    if (data._delivery.isReceived === false) {
      subjects[fnName].next(data)

      // repeat message
      setTimeout(() => {
        this._options.debug === true && console.log('_repeatMessage ', data._delivery.repeats, data._delivery.isReceived)
        data._delivery.repeats++
        this._repeatMessage(subjects, { fnName, data })
      }, data._delivery.deliveryRepeatCount)
    }
  }

  _createName (name) {
    return `${name}`
  }
}

export default Emitter
