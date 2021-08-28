# help-dom
> Small js package I use to help me deal with the dom

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![GitHub workflow status](https://img.shields.io/github/workflow/status/pnxdxt/help-dom/CI)](https://github.com/pnxdxt/help-dom)
[![npm bundle size](https://img.shields.io/bundlephobia/min/help-dom)](https://bundlephobia.com/package/help-dom)
[![npm downloads](https://img.shields.io/npm/dt/help-dom)](https://www.npmjs.com/package/help-dom)

## Install
```
$ npm install help-dom
```
## Import

This package is pure [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). It cannot be `require()`'d from CommonJS.

Use `import foo from 'foo'` instead of `const foo = require('foo')` to import the package.

```js
// Load entire build
import * as helpDom from 'help-dom';

// Load by method
import {main} from 'help-dom';
```
If the package is used in an async context, you could use [`await import(…)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) from CommonJS instead of `require(…)`.

**You also need to make sure you're on the latest minor version of Node.js. At minimum Node.js 12.20, 14.14, or 16.0.**

Read more here: [sindresorhus/esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)


## Usage

```js

main([1,2,3], (element) => typeof element === 'string');
//=> false

main(['1', '2', '3'], (element) => typeof element === 'string');
//=> true
```


`allElements` :

`appendTo` :

`attsToString` :

`classPresentIf` :

`createElement` :

`createElementsArray` :

`getAttributes` :

`getBoundingClientRect` :

`getCookie` :

`getImageSizeByUrl` :

`getIndex` :

`getLocalStorage2` :

`getOffset` :

`getOffsetParent` :

`getParentByData` :

`getParentById` :

`getPosition` :

`getPositionFromOffset` :

`getScroll` :

`getSessionStorage2` :

`getUserLanguage` :

`getViewportPosition` :

`glb` :

`id` :

`insertAfter` :

`insertBefore` :

`isWebComponent` :

`makeStorageHelper` :

`nextChild` :

`objectifyForm` :

`offDOM` :

`onDOM` :

`onDOMMany` :

`prependTo` :

`removeElements` :

`serialize` :

`setCaretPosition` :

`setContent` :

`store` :

`tag` :

`toClipboard` :

`toClipboardFromElement` :

`windowLoaded` :

## License

MIT © [Paul Nodet](https://pnodet.com)
