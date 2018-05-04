import Vue from 'vue'
import { Subject } from 'rxjs'

export interface Handler<T> extends Object{
  received?: () => void
}

declare module "vue/types/vue" {
    interface Vue {
        $emitter<T>(
            emit: (name: string, data: string) => void,
            emitWithDelivery: (name: string, data: string, deliveryRepeatCount: number) => void,
            listen: (name: string, handler: Handler) => Subject
        )
    }
}

export declare function install(V: typeof Vue): void
