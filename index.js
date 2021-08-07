import lowlight from 'lowlight'
import visit from 'unist-util-visit'

export default function remarkHighlightjs({include, exclude, prefix} = {}) {
  return (ast) => visit(ast, 'code', visitor)

  function visitor(node) {
    let {lang, data} = node

    if (
      !lang ||
      (include && !include.includes(lang)) ||
      (exclude && exclude.includes(lang))
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

    data.hChildren = lowlight.highlight(lang, node.value, {prefix}).value
    data.hProperties.className = [
      'hljs',
      ...(data.hProperties.className || []),
      'language-' + lang
    ]
  }
}
