import fs from 'fs'
import path from 'path'
import test from 'tape'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkHighlightjs from '../index.js'

const base = (file) =>
  String(fs.readFileSync(path.join('test', 'fixtures', file)))

test('remark-highlight.js', (t) => {
  t.is(
    remark()
      .use(remarkHighlightjs)
      .use(remarkHtml)
      .processSync(base('input.md'))
      .toString(),
    base('output.html'),
    'should highlight css & js'
  )

  t.is(
    remark()
      .use(remarkHtml)
      .use(remarkHighlightjs)
      .processSync('# Hello!\n\n```\nconsole.log(1)\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code>console.log(1)\n</code></pre>\n',
    'should not auto highlight'
  )

  t.is(
    remark()
      .use(remarkHtml)
      .use(remarkHighlightjs, {include: ['html']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n',
    'should not highlight when the language is not specified (include)'
  )

  t.is(
    remark()
      .use(remarkHtml)
      .use(remarkHighlightjs, {exclude: ['css']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n',
    'should not highlight when the language is not specified (exclude)'
  )

  t.ok(
    remark()
      .use(remarkHtml)
      .use(remarkHighlightjs, {prefix: 'code_'})
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
    .use(remarkHighlightjs)
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
      .use(remarkHtml)
      .use(remarkHighlightjs)
      .processSync('# Hello!\n\n```console\n$ webpack\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="hljs language-console"><span class="hljs-meta">$ </span><span class="bash">webpack</span></code></pre>\n',
    'should not throw on console syntax'
  )

  t.end()
})
