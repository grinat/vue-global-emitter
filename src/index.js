import Emitter from './Emitter'

export default {
  install (Vue, opts = {}) {
    Vue.prototype.$emitter = new Emitter(opts)
  }
}
