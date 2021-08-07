/**
 * @typedef {import('mdast').Root} Root
 *
 * @typedef Options
 *   Configuration.
 * @property {string[]} [include]
 *   If this option is defined, this plugin will only highlight languages that
 *   *are* in this list.
 * @property {string[]} [exclude]
 *   If this option is defined, this plugin will only highlight languages that
 *   *are not* in this list.
 * @property {string} [prefix]
 *   If this option is defined, this plugin will use this prefix for classes
 *   instead of `hljs-`.
 */

import {lowlight} from 'lowlight/lib/all.js'
import {visit} from 'unist-util-visit'

/**
 * Plugin to enable, disable, and ignore messages.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function remarkHighlightjs(options = {}) {
  const {include, exclude, prefix} = options

  return (tree) => {
    visit(tree, 'code', (node) => {
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

      const props = /** @type {import('hast').Properties} */ (
        data.hProperties || (data.hProperties = {})
      )

      data.hChildren = lowlight.highlight(lang, node.value, {prefix}).children

      props.className = [
        'hljs',
        ...(Array.isArray(props.className) ? props.className : []),
        'language-' + lang
      ]
    })
  }
}
