const fs = require('fs')
const path = require('path')
const test = require('tape')
const remark = require('remark')
const html = require('remark-html')
const hljs = require('../dist/index.js')

const base = (file) =>
  String(fs.readFileSync(path.join(__dirname, 'fixtures', file)))

test('remark-highlight.js', (t) => {
  t.is(
    remark().use(hljs).use(html).processSync(base('input.md')).toString(),
    base('output.html'),
    'should highlight css & js'
  )

  t.is(
    remark()
      .use(html)
      .use(hljs)
      .processSync('# Hello!\n\n```\nconsole.log(1)\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code>console.log(1)\n</code></pre>\n',
    'should not auto highlight'
  )

  t.is(
    remark()
      .use(html)
      .use(hljs, {include: ['html']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n',
    'should not highlight when the language is not specified (include)'
  )

  t.is(
    remark()
      .use(html)
      .use(hljs, {exclude: ['css']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n',
    'should not highlight when the language is not specified (exclude)'
  )

  t.ok(
    remark()
      .use(html)
      .use(hljs, {prefix: 'code_'})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString()
      .includes('class="code_selector-tag'),
    'should allow to change prefix'
  )

  const tree = remark()
    .use(() => (tree) => {
      tree.children[0].data = {
        hProperties: {dataFoo: 'bar', className: ['quux']}
      }
    })
    .use(hljs)
    .runSync(remark().parse('```css\n```'))

  t.is(
    tree.children[0].data.hProperties.dataFoo,
    'bar',
    'should not modify existing hProperties and classes (1)'
  )
  t.is(
    tree.children[0].data.hProperties.className.includes('quux'),
    true,
    'should not modify existing hProperties and classes (2)'
  )

  t.is(
    remark()
      .use(html)
      .use(hljs)
      .processSync('# Hello!\n\n```console\n$ webpack\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="hljs language-console"><span class="hljs-meta">$</span><span class="bash"> webpack</span></code></pre>\n',
    'should not throw on console syntax'
  )

  t.end()
})
