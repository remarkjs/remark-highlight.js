'use strict';

import hljs from 'highlight.js';
import visit from 'unist-util-visit';

export default function attacher () {
    function visitor (node) {
        if (!node.lang) {
            return;
        }

        let data = node.data;

        if (!data) {
            node.data = data = {};
        }

        data.htmlContent = hljs.highlightAuto(node.value, [node.lang]).value;
        data.htmlAttributes = data.htmlAttributes || {};
        data.htmlAttributes.class = [
            data.htmlAttributes.class,
            'hljs',
            'language-' + node.lang
        ].filter(Boolean).join(' ');
    }

    return ast => visit(ast, 'code', visitor);
}
