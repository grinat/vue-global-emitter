import Vue from 'vue'

interface Subscriber {
  unsubscribe: () => void
}

interface EmitterOptions {
  debug?: Boolean
}

interface SubscriberGroup {
  unsubscribe: () => void
}

interface Emitter {
  emit: (name: string, data: any) => void,
  emitWithDelivery: (name: string, data: any, deliveryRepeatCount?: number) => void,
  listen: (name: string, handler: Function) => Subscriber,
  group: (...subscribers: Subscriber[]) => SubscriberGroup
}

declare module "vue/types/vue" {
  interface VueConstructor {
    $emitter: Emitter
  }
}

export declare function install(V: typeof Vue, options?: EmitterOptions): void

declare const _default: {
  install: typeof install
}
export default _default

