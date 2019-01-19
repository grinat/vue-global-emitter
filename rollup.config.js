const buble = require('rollup-plugin-buble')

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-global-emitter.js',
        format: 'umd',
        name: 'VueGlobalEmitter'
    },
    plugins: [buble()],
    external: ['rxjs']
}
