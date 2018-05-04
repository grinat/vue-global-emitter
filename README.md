# vue-global-emitter

Simple global vue emitter which realising pub/sub without and with pull for Vue.js Used [RxJS](https://github.com/Reactive-Extensions/RxJS) 

### Installation

```
npm install vue vue-global-emitter rxjs --save
```

```
import Vue from 'vue'
import VueGlobalEmitter from 'vue-global-emitter'

Vue.use(VueGlobalEmitter)
```

### Usage
Send event

```
this.$emitter.emit('my-event', {foo: 'bar'})
```

Listen event

```
let subscription = this.$emitter.listen('my-event', data => console.log(data))
```

Send event with delivery

```
let delay = 200
this.$emitter.emitWithDelivery('my-event-for-not-created-component', {foo: 'bar'}, delay)
```

Read

```
this.$emitter.listen('my-event-for-not-created-component', response => {
   // notify about read
   response.received()
})
```

### Recomended use way
```
 export default {
    // create subsribe
    created () {
        this.messageSubs = this.$emitter.listen('im.socket', this.onSocketMessage)
    },
    methods: {
        // handle message
        onSocketMessage (data) {

        }
    },
    destroyed () {
        // dont forget unsubcribe
        this.messageSubs.unsubscribe()
    }
```


