import Emitter from './Emitter'

const install = (Vue, opts = {}) => {
  Vue.prototype.$emitter = new Emitter(opts)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install })
}

export default {
  install
}

export { Emitter }
