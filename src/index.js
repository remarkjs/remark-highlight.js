import hljs from 'highlight.js';
import visit from 'unist-util-visit';

export default function attacher (remark, {include, exclude} = {}) {
    function visitor (node) {
        const {lang} = node;
        if (
            !lang ||
            include && !~include.indexOf(lang) ||
            exclude && ~exclude.indexOf(lang)
        ) {
            return;
        }

        let {data} = node;

        if (!data) {
            node.data = data = {};
        }

        data.htmlContent = hljs.highlightAuto(node.value, [lang]).value;
        data.htmlAttributes = data.htmlAttributes || {};
        data.htmlAttributes.class = [
            'hljs',
            data.htmlAttributes.class,
        ].filter(Boolean).join(' ');
    }

    return ast => visit(ast, 'code', visitor);
}
