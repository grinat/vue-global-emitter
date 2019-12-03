/* global describe, it */
import { Emitter } from '../dist/vue-global-emitter'

const chai = require('chai')
const expect = chai.expect

describe('Testing emitter without vue', () => {
  it('send event', (end) => {
    const inst = new Emitter()

    inst.listen('test', ({ test } = {}) => {
      // eslint-disable-next-line
      expect(test).to.be.true
      end()
    })

    inst.emit('test', { test: true })
  })
})
