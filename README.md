# [mdast]-highlight.js [![Build Status](https://travis-ci.org/ben-eb/mdast-highlight.js.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/mdast-highlight.js.svg)][npm] [![Dependency Status](https://gemnasium.com/ben-eb/mdast-highlight.js.svg)][deps]

> Highlight code blocks in Markdown files with [highlight.js][highlightjs].

## Install

With [npm](https://npmjs.org/package/mdast-highlight.js) do:

```
npm install mdast-highlight.js --save
```

## Example

mdast-highlight.js is designed to work with [mdast-html][html]:

```js
var mdast = require('mdast');
var html  = require('mdast-html');
var hljs  = require('mdast-highlight.js');

var markdown = '```css\nh1 {\n    color: red;\n}\n```\n';
var result = mdast.use([ html, hljs ]).process(markdown);
console.log(result);

//=> Compiled HTML with highlighted CSS!
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.

## License

MIT © [Ben Briggs](http://beneb.info)

[ci]:          https://travis-ci.org/ben-eb/mdast-highlight.js
[deps]:        https://gemnasium.com/ben-eb/mdast-highlight.js
[npm]:         http://badge.fury.io/js/mdast-highlight.js
[html]:        https://github.com/wooorm/mdast-html
[mdast]:       https://github.com/wooorm/mdast
[highlightjs]: https://github.com/isagalaev/highlight.js
