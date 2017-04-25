# 5.0.0

* (Breaking) Drops support for Node 0.12.
* Updated for remark 7.x (thanks to @wooorm).
* Removes unused highlight.js dependency.

# 4.0.1

* remark-highlight.js will now not throw on unrecognised languages, such
  as console.

# 4.0.0

* Switched from highlight.js to lowlight (virtual implementation of hljs).
* Upgraded to remark-html 5.x.

# 3.1.1

* Upgraded to remark 5.x, this module will work the same using either version.

# 3.1.0

* Added `include` and `exclude` options so that it is easy to pair this module
  with another highlighter (such as remark-midas).

# 3.0.0

* Updated for remark 4.x.

# 2.0.0

* Update babel.
* Update highlight.js
* Renamed from mdast-highlight.js without any API changes.

# 1.2.0

* The module will now add classes to a node's existing class attribute, instead
  of overriding (thanks to @eush77).

# 1.1.0

* Adds the `hljs` class to the code element (thanks to @eush77). (GH-1)

# 1.0.0

* Initial release.
