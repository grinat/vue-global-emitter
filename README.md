# vue-global-emitter

Simple global vue emitter which realising pub/sub without and with pull for Vue.js

### Examples
[Open](https://grinat.github.io/vue-global-emitter/examples/) (see in /examples)

### Installation

```
npm install vue-global-emitter --save
```

```js
import Vue from 'vue'
import VueGlobalEmitter from 'vue-global-emitter'

Vue.use(VueGlobalEmitter)
```

### Usage
Send event

```js
this.$emitter.emit('my-event', {foo: 'bar'})
```

Listen event

```js
this.$emitter.listen('my-event', data => console.log(data))
```

Send event with delivery

```js
let delay = 200
this.$emitter.emitWithDelivery('my-event-for-not-created-component', {foo: 'bar'}, delay)
```

Read

```js
this.$emitter.listen('my-event-for-not-created-component', response => {
   // notify about read
   response.received()
})
```
Mass subscribe/unsubscribe
```js
 export default {
    created () {
      // create subsribe
      this.subsGroup = this.$emitter.group(
        this.$emitter.listen('im.socket', this.onSocketMessage),
        this.$emitter.listen('foo', this.onFoo)
      )
    },
    methods: {
      ...
    },
    destroyed () {
      // unsubsribe all
      this.subsGroup.unsubscribe()
    }
 }
```

### Recommended use way
```js
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
 }
```

### Development
build:
```
npm i
npm run build
```

test:
```
npm run test
```
