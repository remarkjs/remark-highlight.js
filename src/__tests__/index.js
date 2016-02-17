import test from 'ava';
import hljs from '../';
import remark from 'remark';
import html from 'remark-html';
import {readFileSync as read} from 'fs';
import {join} from 'path';

let base = file => read(join(__dirname, 'fixtures', file), 'utf-8');

test('should highlight css & js', t => {
    let result = remark.use([ html, hljs ]).process(base('input.md'));
    t.same(result, base('output.html'));
});

test('should not modify existing htmlAttributes and classes', t => {
    let ast = remark.parse('```lang\n```', {position: false});
    ast = remark()
        .use(() => tree => {
            tree.children[0].data = {
                htmlAttributes: {
                    'data-foo': 'bar',
                    class: 'quux'
                }
            };
        })
        .use(hljs)
        .run(ast);

    t.same(ast.children[0].data.htmlAttributes['data-foo'], 'bar');
    t.same(ast.children[0].data.htmlAttributes.class.indexOf('quux') >= 0, true);
});
