/* global describe, it, before */
import Vue from 'vue'
import VueGlobalEmitter from '../dist/vue-global-emitter'

const chai = require('chai')
const expect = chai.expect
chai.should()

Vue.use(VueGlobalEmitter)

let vm = null

describe('Testing emitter in vue', () => {
  before(async () => {
    vm = new Vue({
      el: '#app',
      render: (createElement) => createElement('div'),
      mounted () {
        this.fooSubs = this.$emitter.listen('foo', this.onFoo)
        this.deliverySubs = this.$emitter.listen('delivery', this.onDelivery)
      },
      methods: {
        sendEvent (evt) {
          this.lastEvtData = null
          this.$emitter.emit('foo', evt)
          return true
        },
        onFoo (data) {
          this.lastEvtData = data
        },
        sendDeliveryEvent (evt) {
          this.lastEvtData = null
          this.$emitter.emitWithDelivery('delivery', evt)
          return true
        },
        onDelivery (response) {
          setTimeout(() => {
            this.lastEvtData = response
            response.received()
          }, 300)
        },
        unsubscribe () {
          this.fooSubs.unsubscribe()
          this.deliverySubs.unsubscribe()
          return true
        }
      }
    })
  })

  it('send event', () => {
    const res = vm.sendEvent(1)
    // eslint-disable-next-line
    expect(res).to.be.true
  })

  it('listen event', () => {
    vm.sendEvent({ test: true })
    expect(vm.lastEvtData).to.be.a('object')
    expect(vm.lastEvtData).to.have.property('test')
  })

  it('send with delivery', (done) => {
    const res = vm.sendDeliveryEvent({ foo: true })
    // eslint-disable-next-line
    expect(res).to.be.true
    expect(vm.lastEvtData).to.be.a('null')
    setTimeout(() => {
      expect(vm.lastEvtData).to.be.a('null')
    }, 100)
    setTimeout(() => {
      expect(vm.lastEvtData).to.be.a('object')
      expect(vm.lastEvtData).to.have.property('foo')
      done()
    }, 400)
  })

  it('can unsubscribe', () => {
    const res = vm.unsubscribe()
    // eslint-disable-next-line
    expect(res).to.be.true
  })

  it('test group', () => {
    vm = new Vue({
      el: '#app2',
      render: (createElement) => createElement('div'),
      mounted () {
        this.subsGroup = this.$emitter.group(
          this.$emitter.listen('foo', this.onFoo),
          this.$emitter.listen('bar', this.onBar)
        )
      },
      methods: {
        sendEvent (type, evt) {
          this.lastEvtData = null
          this.$emitter.emit(type, evt)
          return true
        },
        onFoo (data) {
          this.lastEvtData = data
        },
        onBar (data) {
          this.lastEvtData = data
        },
        unsubscribe () {
          this.subsGroup.unsubscribe()
          return true
        }
      }
    })

    // sending events
    vm.sendEvent('foo', { foo: 1 })
    expect(vm.lastEvtData).to.have.property('foo')

    vm.sendEvent('bar', { bar: 1 })
    expect(vm.lastEvtData).to.have.property('bar')

    // unsubs all
    const res = vm.unsubscribe()
    // eslint-disable-next-line
    expect(res).to.be.true

    // send events to empty
    // lastEvtData must be reseted and no new data handled
    vm.sendEvent('foo', { foo: 1 })
    expect(vm.lastEvtData).to.be.a('null')
  })
})
