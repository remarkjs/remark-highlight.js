# remark-highlight.js

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

Highlight code blocks in Markdown files with [**remark**][remark] and
[**lowlight**][lowlight].

This package integrates with [remark-html][].
It may be better to work with [rehype][], which is specifically made for HTML,
and to use [rehype-highlight][] instead of this package.

## Installation

[npm][]:

```bash
npm install remark-highlight.js
```

## Example

Say we have the following markdown file, `example.md`:

```markdown
~~~css
h1 {
  color: red;
}
~~~
```

And our script, `example.js`, looks as follows:

```javascript
const vfile = require('to-vfile')
const report = require('vfile-reporter')
const unified = require('unified')
const markdown = require('remark-parse')
const html = require('remark-html')
const highlight = require('remark-highlight.js')

unified()
  .use(markdown)
  .use(highlight)
  .use(html)
  .process(vfile.readSync('example.md'), (err, file) => {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
example.md: no issues found
<pre><code class="hljs language-css"><span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">color</span>: red;
}</code></pre>
```

## API

### `remark.use(highlight[, options])`

Highlight code blocks in markdown.

For a list of languages that you can pass to these options, see the
[highlight.js documentation][list-of-languages].

#### `options.include`

If this option is defined (`Array`), this plugin will only highlight languages
that *are* in this list.

#### `options.exclude`

If this option is defined (`Array`), this plugin will only highlight languages
that *are not* in this list.

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Ben Briggs][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-highlight.js.svg

[build]: https://travis-ci.org/remarkjs/remark-highlight.js

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-highlight.js.svg

[coverage]: https://codecov.io/github/remarkjs/remark-highlight.js

[downloads-badge]: https://img.shields.io/npm/dm/remark-highlight.js.svg

[downloads]: https://www.npmjs.com/package/remark-highlight.js

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[license]: license

[author]: http://beneb.info

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[remark]: https://github.com/remarkjs/remark

[remark-html]: https://github.com/remarkjs/remark-html

[lowlight]: https://github.com/wooorm/lowlight

[rehype]: https://github.com/rehypejs/rehype

[rehype-highlight]: https://github.com/rehypejs/rehype-highlight

[list-of-languages]: https://github.com/highlightjs/highlight.js/blob/master/docs/css-classes-reference.rst#language-names-and-aliases
