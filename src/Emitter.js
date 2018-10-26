/* global rxjs */
import {Subject} from 'rxjs'
import events from './events'

class Emitter {

    constructor(opts = {}) {
        this.options = Object.assign({
            debug: false
        }, opts)
        this.subjects = events.messages
    }

    emit(name, data) {
        let fnName = this._createName(name)
        this.subjects[fnName] || (this.subjects[fnName] = new Subject())
        this.options.debug === true && console.log('Reactivex new subject=' + name + ' list of observers:', this.subjects[fnName])
        this.subjects[fnName].next(data)
    }

    listen(name, handler) {
        let fnName = this._createName(name)
        this.subjects[fnName] || (this.subjects[fnName] = new Subject())
        this.options.debug === true && console.log('Reactivex new subject=' + name + ' list of observers:', this.subjects[fnName])
        return this.subjects[fnName].subscribe(handler)
    }

    emitWithDelivery(name, data, deliveryRepeatCount = 200) {
        let fnName = this._createName(name)
        this.subjects[fnName] || (this.subjects[fnName] = new Subject())
        this.options.debug === true && console.log('Reactivex new delivery subject=' + name + ' list of observers:', this.subjects[fnName])
        data = data || {}
        data._delivery = {
            isReceived: false,
            repeats: 0,
            deliveryRepeatCount: +(deliveryRepeatCount || 200)
        }
        data.received = function () {
            data._delivery.isReceived = true
        }
        this._repeatMessage(this.subjects, {fnName, data})
    }

    _repeatMessage(subjects, {fnName, data}) {
        if (data._delivery.isReceived === false) {
            subjects[fnName].next(data)
            setTimeout(() => {
                this.options.debug === true && console.log('_repeatMessage ', data._delivery.repeats, data._delivery.isReceived)
                data._delivery.repeats++
                this._repeatMessage(subjects, {fnName, data})
            }, data._delivery.deliveryRepeatCount)
        }
    }

    _createName(name) {
        return `${name}`
    }
}

export default Emitter
