import low from 'lowlight';
import visit from 'unist-util-visit';

export default function attacher ({include, exclude} = {}) {
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

        try {
            data.hChildren = low.highlight(lang, node.value).value;
        } catch (err) {
            data.hChildren = low.highlightAuto(node.value).value;
        }

        data.hProperties = data.hProperties || {};
        data.hProperties.className = [
            'hljs',
            ...data.hProperties.className || [],
            `language-${lang}`,
        ].join(' ')
    }

    return ast => visit(ast, 'code', visitor);
}
