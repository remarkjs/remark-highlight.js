"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attacher;

var _lowlight = _interopRequireDefault(require("lowlight"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attacher({
  include,
  exclude,
  prefix
} = {}) {
  return ast => (0, _unistUtilVisit.default)(ast, 'code', visitor);

  function visitor(node) {
    let {
      lang,
      data
    } = node;

    if (!lang || include && !include.includes(lang) || exclude && exclude.includes(lang)) {
      return;
    }

    if (!data) {
      data = {};
      node.data = data;
    }

    if (!data.hProperties) {
      data.hProperties = {};
    }

    data.hChildren = _lowlight.default.highlight(lang, node.value, {
      prefix
    }).value;
    data.hProperties.className = ['hljs', ...(data.hProperties.className || []), 'language-' + lang];
  }
}

module.exports = exports.default;