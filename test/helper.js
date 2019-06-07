import { JSDOM } from 'jsdom'

const dom = new JSDOM(`
<html>
<body>
<div id="app"></div>
<div id="app2"></div>
</body>
</html>
`)
global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator

// need for rxjs
dom.window.Object = Object
dom.window.Math = Math
