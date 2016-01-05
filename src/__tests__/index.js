'use strict';

import test from 'tape';
import hljs from '../';
import remark from 'remark';
import html from 'remark-html';
import {readFileSync as read} from 'fs';
import {join} from 'path';

let base = file => read(join(__dirname, 'fixtures', file), 'utf-8');

test('should highlight css & js', t => {
    t.plan(1);

    let result = remark.use([ html, hljs ]).process(base('input.md'));
    t.equal(result, base('output.html'));
});

test('should not modify existing htmlAttributes and classes', t => {
    t.plan(2);

    let ast = remark.parse('```lang\n```', { position: false });
    ast = remark()
        .use(() => ast => {
            ast.children[0].data = {
                htmlAttributes: {
                    'data-foo': 'bar',
                    class: 'quux'
                }
            };
        })
        .use(hljs)
        .run(ast);

    t.equal(ast.children[0].data.htmlAttributes['data-foo'], 'bar');
    t.true(ast.children[0].data.htmlAttributes.class.indexOf('quux') >= 0);
});
