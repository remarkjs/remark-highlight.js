import low from 'lowlight'
import visit from 'unist-util-visit'

export default function attacher({include, exclude} = {}) {
  return ast => visit(ast, 'code', visitor)

  function visitor(node) {
    let {lang, data} = node

    if (
      !lang ||
      (include && include.indexOf(lang) === -1) ||
      (exclude && exclude.indexOf(lang) !== -1)
    ) {
      return
    }

    if (!data) {
      data = {}
      node.data = data
    }

    if (!data.hProperties) {
      data.hProperties = {}
    }

    data.hChildren = low.highlight(lang, node.value).value
    data.hProperties.className = [
      'hljs',
      ...(data.hProperties.className || []),
      'language-' + lang
    ]
  }
}
