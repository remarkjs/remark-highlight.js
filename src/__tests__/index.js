import {readFileSync as read} from 'fs'
import {join} from 'path'
import test from 'ava'
import remark from 'remark'
import html from 'remark-html'
import hljs from '..'

const base = file => String(read(join(__dirname, 'fixtures', file)))

test('should highlight css & js', t => {
  t.is(
    remark()
      .use(hljs)
      .use(html)
      .processSync(base('input.md'))
      .toString(),
    base('output.html')
  )
})

test('should not auto highlight', t => {
  t.is(
    remark()
      .use(html)
      .use(hljs)
      .processSync('# Hello!\n\n```\nconsole.log(1)\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code>console.log(1)\n</code></pre>\n'
  )
})

test('should not highlight when the language is not specified (include)', t => {
  t.is(
    remark()
      .use(html)
      .use(hljs, {include: ['html']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n'
  )
})

test('should not highlight when the language is not specified (exclude)', t => {
  t.deepEqual(
    remark()
      .use(html)
      .use(hljs, {exclude: ['css']})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="language-css">h1{}\n</code></pre>\n'
  )
})

test('should allow to change prefix', t => {
  t.truthy(
    remark()
      .use(html)
      .use(hljs, {prefix: 'code_'})
      .processSync('# Hello!\n\n```css\nh1{}\n```')
      .toString()
      .includes('class="code_selector-tag')
  )
})

test('should not modify existing hProperties and classes', t => {
  const tree = remark()
    .use(() => tree => {
      tree.children[0].data = {
        hProperties: {dataFoo: 'bar', className: ['quux']}
      }
    })
    .use(hljs)
    .runSync(remark().parse('```css\n```'))

  t.deepEqual(tree.children[0].data.hProperties.dataFoo, 'bar')
  t.deepEqual(
    tree.children[0].data.hProperties.className.indexOf('quux') >= 0,
    true
  )
})

test('should not throw on console syntax', t => {
  t.deepEqual(
    remark()
      .use(html)
      .use(hljs)
      .processSync('# Hello!\n\n```console\n$ webpack\n```')
      .toString(),
    '<h1>Hello!</h1>\n<pre><code class="hljs language-console"><span class="hljs-meta">$</span><span class="bash"> webpack</span></code></pre>\n'
  )
})
