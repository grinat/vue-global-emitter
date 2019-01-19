import Vue from 'vue'
import {Subject} from 'rxjs'

export interface Handler<T> extends Object {
  received?: () => void
}

declare module "vue/types/vue" {
  interface Vue {
    $emitter<T>(
      emit: (name: string, data: any) => void,
      emitWithDelivery: (name: string, data: any, deliveryRepeatCount?: number) => void,
      listen: (name: string, Handler) => Subject<any>
    )
  }
}

export declare function install(V: typeof Vue): void
