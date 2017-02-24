# [remark]-highlight.js [![Build Status](https://travis-ci.org/ben-eb/remark-highlight.js.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/remark-highlight.js.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/remark-highlight.js.svg)][deps]

> Highlight code blocks in Markdown files with [highlight.js][highlightjs].

Note that since 4.x, the code is highlighted with [lowlight](https://github.com/wooorm/lowlight)
which is a virtual DOM implementation of highlight.js.


## Install

With [npm](https://npmjs.org/package/remark-highlight.js) do:

```
npm install remark-highlight.js --save
```


## Example

remark-highlight.js is designed to work with [remark-html][html]:

```js
var remark = require('remark');
var html  = require('remark-html');
var hljs  = require('remark-highlight.js');

var markdown = '```css\nh1 {\n    color: red;\n}\n```\n';
var result = remark().use([ html, hljs ]).processSync(markdown);
console.log(result);

//=> Compiled HTML with highlighted CSS!
```


## API

### remark.use(hljs, [options])

#### options

For a list of languages that you can pass to these options, see the
[highlight.js documentation](http://highlightjs.readthedocs.org/en/latest/css-classes-reference.html#language-names-and-aliases).

##### include

Type: `array`  
Default: `undefined`

If this option is defined, this plugin will only highlight languages that are
*included* in this array.

##### exclude

Type: `array`  
Default: `undefined`

If this option is defined, this plugin will only highlight languages that are
*excluded* from this array.


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Ben Briggs](http://beneb.info)

[ci]:          https://travis-ci.org/ben-eb/remark-highlight.js
[deps]:        https://gemnasium.com/ben-eb/remark-highlight.js
[npm]:         http://badge.fury.io/js/remark-highlight.js
[html]:        https://github.com/wooorm/remark-html
[remark]:      https://github.com/wooorm/remark
[highlightjs]: https://github.com/isagalaev/highlight.js
