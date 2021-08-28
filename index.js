/**
 * @param {Element} el
 * @returns {boolean} is Web Component ?
 */
export const isWebComponent = (el) =>
	el && el.shadowRoot && el.tagName.includes('-');

/**
 * What is user's navigator language ?
 */
export const getUserLanguage = () =>
	navigator.language || navigator.userLanguage;

/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} insertBefore
 */
export function insertBefore(el, target) {
	target.parentElement.insertBefore(el, target);
}

/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} insertAfter
 */
export function insertAfter(el, target) {
	target.parentElement.insertBefore(el, target.nextSibling);
}

/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} prependTo
 */
export function prependTo(el, target) {
	target.insertBefore(el, target.firstChild);
}

/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} appendTo
 */
export function appendTo(el, target) {
	target.appendChild(el);
}

/** Select next child */
export const nextChild = (pathItem, root) => {
	const isShadowRoot = pathItem === 'shadowRoot' || pathItem === 'shadow-root';
	return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
};

/** Get parent by Id */
export const getParentById = (node, id) => {
	while (node) {
		if (node.id === id) return node;
		node = node.parentNode;
	}
};

/** Get parent by data */
export const getParentByData = (node, key, value) => {
	while (node) {
		if (node.dataset[key] === value) return node;
		node = node.parentNode;
	}
};

/** Select all elements matching given selector */
export const allElements = (selector, root = document) => {
	if (isWebComponent(root)) {
		root = root.shadowRoot;
	}
	return Array.from(root.querySelectorAll(selector));
};

/** Select element with a given id */
export const id = (elementId, root = document) => {
	if (isWebComponent(root)) {
		root = root.shadowRoot;
	}
	return root.getElementById(elementId);
};

/**
 * Returns the index of a node in a nodeList.
 * @link https://code.area17.com/a17/a17-helpers/wikis/getIndex
 * @param {Node} node
 * @param {NodeList} nodeList
 */
export const getIndex = (node, nodeList) => {
	const nodesLength = nodes.length;
	let nodes = nodeList || node.parentNode.childNodes;
	let n = 0;

	for (let i = 0; i < nodesLength; i++) {
		if (nodes[i] === node) {
			return n;
		}
		if (nodes[i].nodeType === 1) {
			n++;
		}
	}
	return -1;
};

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOM(el, name, handler, ...args) {
	if (el.addEventListener) {
		el.addEventListener(name, handler, ...args);
	} else if (el.attachEvent) {
		el.attachEvent(`on${name}`, handler, ...args);
	}
}

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function offDOM(el, name, handler, ...args) {
	if (el.removeEventListener) {
		el.removeEventListener(name, handler, ...args);
	} else if (el.detachEvent) {
		el.detachEvent(`on${name}`, handler, ...args);
	}
}

/**
 * @param {...HTMLElement | Window | Document} els
 * @param {...String} names
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOMMany(els, names, handler, ...args) {
	for (const el of els) {
		for (const name of names) {
			onDOM(el, name, handler, ...args);
		}
	}
	const destroy = () => {
		for (const el of els) {
			for (const name of names) {
				offDOM(el, name, handler);
			}
		}
	};
	return destroy;
}

/**
 * @param {String} url
 */
export function getImageSizeByUrl(url) {
	const image = document.createElement('img');
	return new Promise((resolve, reject) => {
		onDOM(image, 'load', () => {
			resolve({width: image.width, height: image.height});
		});
		onDOM(image, 'error', (e) => {
			reject(e);
		});
		image.src = url;
	});
}

/**
 * Get attributes of an element as an object with key/value
 * @param {Node} el
 */
export const getAttributes = (el) => {
	const result = {};
	const atts = el.attributes;
	if (!atts || atts.length === 0) return result;

	for (let i = 0; i < atts.length; i++) {
		const a = atts[i];
		result[a.name] = a.value;
	}
	return result;
};

/** Create an array of DOM elements from given html */
export const createElementsArray = (html = '') => {
	html = html.trim();
	if (!html) return [];

	const temp = document.createElement('template');
	temp.innerHTML = html;
	return Array.from(temp.content.childNodes);
};

/** Create a single DOM element */
export const createElement = (name, attributes = {}, content = '') => {
	const html = tag(name, attributes, content);

	const elements = createElementsArray(html);
	if (elements.length === 0) return null;
	return elements[0];
};

export const attsToString = (attributes) => {
	const array = [];
	forEachEntry(attributes, (k, v) => {
		array.push(`${k}="${v}"`);
	});
	const sep = array.length > 0 ? ' ' : '';
	return sep + array.join(' ');
};

/** Create the html for a given tag */
export const tag = (name, attributes = {}, content = '') => {
	if (!name) return '';
	const atts = attsToString(attributes);
	return `<${name}${atts}>${content}</${name}>`;
};

/**
 * Set the content of an element
 * @param {DomElement} element The DOM element to change its content
 * @param {String or DomElement} content The new content. Can be a string or another DOM element
 */
export const setContent = (element, ...content) => {
	element.innerHTML = '';
	element.append(...content);
};

/** Remove elements matching given selector */
export const removeElements = (selector, root = document) => {
	const elements = all(selector, root);
	elements.forEach((el) => {
		el.parentNode.removeChild(el);
	});
};

/** Add/remove a given class if condition is true/false */
export const classPresentIf = (el, cssClass, condition) => {
	if (!el) return;
	const func = condition ? 'add' : 'remove';
	el.classList[func](cssClass);
};

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
export const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length == 2) return parts.pop().split(';').shift();
};

/**
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
export const serialize = (data) => {
	const obj = {};
	for (const [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
};

/**
 * Generates a JS Object out of a form.
 * @link https://code.area17.com/a17/a17-helpers/wikis/objectifyForm
 * @param  {Node} form  A form node
 * @return {String}     The serialized form data
 *
 * @example
 *
 * const form = document.getElementsById('form');
 * const form_data = objectifyForm(form);
 * //=> Object {name: 'Mike', description: 'Interface Engineer', role: 'FE', staff: 'staff'}
 */
export const objectifyForm = (form) => {
	let field;
	const obj = {};

	if (typeof form === 'object' && form.nodeName === 'FORM') {
		const len = form.elements.length;
		for (let i = 0; i < len; i++) {
			field = form.elements[i];
			if (
				field.name &&
				!field.disabled &&
				field.type !== 'file' &&
				field.type !== 'reset' &&
				field.type !== 'submit' &&
				field.type !== 'button'
			) {
				if (field.type === 'select-multiple') {
					for (let j = form.elements[i].options.length - 1; j >= 0; j--) {
						if (field.options[j].selected) {
							obj[field.name] = field.options[j].value;
						}
					}
				} else if (
					(field.type !== 'checkbox' && field.type !== 'radio') ||
					field.checked
				) {
					obj[field.name] = field.value;
				}
			}
		}
	}
	return obj;
};

const isType = (v, type) =>
	Object.prototype.toString.call(v) === `[object ${type}]`;

/** Check if given argument is of String type */
const isString = (s) => isType(s, 'String');

const LOCATIONS = new Set([
	'beforebegin',
	'afterbegin',
	'beforeend',
	'afterend',
]);

/**
 * Add html or elements to given target element
 * @param target The element to add to
 * @param tobeAdded Can be html string, a DOM element, or an array of DOM elements
 * @param location String. Where to add in the target. Ons of:
 * beforebegin, afterbegin, beforeend, afterend. The default if ommited is beforeend
 *@returns {boolean} true if added, false if not
 */
export const add = (target, tobeAdded, location = 'beforeend') => {
	location = location.toLowerCase();
	if (!LOCATIONS.has(location)) return false;

	if (isString(tobeAdded)) {
		target.insertAdjacentHTML(location, tobeAdded);
	} else {
		addElements(target, tobeAdded, location);
	}
	return true;
};

/**
 * Set cursor position in html textbox
 * @link http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
 */
export function setCaretPosition(el, start, end) {
	// get "focus" and make sure we don't have everything -selected-
	el.value = el.value;

	// (el.selectionStart === 0 added for Firefox bug)
	if (el.selectionStart || el.selectionStart === 0) {
		el.focus();
		if (!end || end < start) {
			end = start;
		}
		el.setSelectionRange(start, end);
		return true;
	}

	if (el.createTextRange) {
		const range = el.createTextRange();
		range.move('character', end);
		range.select();
		return true;
	}

	el.focus();
	return false;
}

/**
 * Encode favicon
//FIXME: const document = require("global/document");
const docHead = document.getElementsByTagName("head")[0];
const favicon = (mime, base64data) => {
  const newLink = document.createElement("link");

  newLink.rel = "shortcut icon";
  newLink.href = "data:image/" + mime + ";base64," + base64data;
  docHead.appendChild(newLink);
};

favicon.ico = (base64data) => favicon("x-icon", base64data);
favicon.png = (base64data) => favicon("png", base64data);

export { favicon };
*/

/**
 * Copies input or text area value to clipboard.
 * Element is here a dom tree element (document.getElementById)
 * @param {Node} element
 */
export const toClipboardFromElement = (element) => {
	try {
		element.select();
		const successful = document.execCommand('copy');
		return !!successful;
	} catch (err) {
		return false;
	}
};

/**
 * Copies area value to the clipboard.
 * @param {String} text
 */
export const toClipboard = (text) => {
	if (typeof window === 'undefined') return false;

	const textArea = document.createElement('textarea');
	textArea.style.position = 'fixed';
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = '0';
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';

	textArea.value = text; // set Value

	document.body.appendChild(textArea);
	const success = toClipboardFromElement(textArea);
	document.body.removeChild(textArea);
	return success;
};

/**
 * Detect the scroll top of the window
 * @link https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
 */
export function getScroll() {
	if (typeof pageYOffset !== 'undefined') {
		// most browsers except IE before #9
		return {
			top: pageYOffset,
			left: pageXOffset,
		};
	}
	const B = document.body; // IE 'quirks'
	let D = document.documentElement; // IE with doctype
	D = D.clientHeight ? D : B;
	return {
		top: D.scrollTop,
		left: D.scrollLeft,
	};
}

/**
 * @param {HTMLElement} el
 * @link refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 */
export function getOffset(el) {
	const rect = getBoundingClientRect(el);
	const scroll = getScroll();

	return {
		x: rect.left + scroll.left,
		y: rect.top + scroll.top,
	};
}

/**
 * there is some trap in el.offsetParent, so use this func to fix
 * @param {HTMLElement} el
 */
export function getOffsetParent(el) {
	let {offsetParent} = el;
	if (
		!offsetParent ||
		(offsetParent === document.body &&
			getComputedStyle(document.body).position === 'static')
	) {
		offsetParent = document.body.parentElement;
	}
	return offsetParent;
}

/**
 * get el current position.
 * like jQuery.position.
 * The position is relative to offsetParent viewport left top.
 * It is for set absolute position, absolute position is relative to offsetParent viewport left top.
 * @param {HTMLElement} el
 */
export function getPosition(el) {
	const offsetParent = getOffsetParent(el);
	const ps = {x: el.offsetLeft, y: el.offsetTop};
	let parent = el;
	while (true) {
		parent = parent.parentElement;
		if (parent === offsetParent || !parent) {
			break;
		}
		ps.x -= parent.scrollLeft;
		ps.y -= parent.scrollTop;
	}
	return ps;
}

/**
 * like jQuery.offset(x, y), but it just return cmputed position, don't update style
 * @param {HTMLElement} el
 * @param {{x: number, y: number}} of
 * @returns {{x: number, y: number}}
 */
export function getPositionFromOffset(el, of) {
	const offsetParent = getOffsetParent(el);
	const parentOf = getOffset(offsetParent);
	return {
		x: of.x - parentOf.x,
		y: of.y - parentOf.y,
	};
}

/**
 * @link http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 * @param {HTMLElement} el
 */
export function getBoundingClientRect(el) {
	const xy = el.getBoundingClientRect();
	const top = xy.top - document.documentElement.clientTop;
	const {bottom} = xy;
	const left = xy.left - document.documentElement.clientLeft;
	const {right} = xy;
	const width = xy.width || right - left;
	const height = xy.height || bottom - top;
	const x = left;
	const y = top;
	return {top, right, bottom, left, width, height, x, y};
}

/** refer [getBoundingClientRect](#getBoundingClientRect) */
export const getViewportPosition = getBoundingClientRect;

/**
 * @typedef {{
 *   glb: Window;
 *   uniqueId: { [id: string]: true };
 *   localStorage2?: ReturnType<typeof makeStorageHelper>;
 *   sessionStorage2?: ReturnType<typeof makeStorageHelper>;
 * }} Store
 */

/**
 * @param {Store} store
 */
export const store = {uniqueId: {}};
/**
 * get global, such as window in browser.
 * @param {Window} glb
 */
export function glb() {
	// `this` !== global or window because of build tool. So you can't use `this` to get `global`
	if (store.glb) {
		return store.glb;
	}
	// resolve global
	let t;
	try {
		t = global;
	} catch (e) {
		t = window;
	}
	store.glb = t;
	return t;
}

export function windowLoaded() {
	return new Promise((resolve, reject) => {
		if (document && document.readyState === 'complete') {
			resolve();
		} else {
			glb().addEventListener('load', function once() {
				resolve();
				glb().removeEventListener('load', once);
			});
		}
	});
}

export function makeStorageHelper(storage) {
	return {
		storage,
		/**
		 * @param {String} name
		 * @param {*} value
		 * @param {number} minutes
		 */
		set(name, value, minutes) {
			// set null can remove a item
			if (value == null) {
				this.storage.removeItem(name);
			} else {
				this.storage.setItem(
					name,
					JSON.stringify({
						value,
						expired_at: minutes
							? new Date().getTime() + minutes * 60 * 1000
							: null,
					}),
				);
			}
		},
		/**
		 * @param {String} name
		 */
		get(name) {
			let t = this.storage.getItem(name);
			if (t) {
				t = JSON.parse(t);
				if (!t.expired_at || t.expired_at > new Date().getTime()) {
					return t.value;
				}
				this.storage.removeItem(name);
			}
			return null;
		},
		clear() {
			this.storage.clear();
		},
	};
}

export function getLocalStorage2() {
	if (!store.localStorage2) {
		store.localStorage2 = makeStorageHelper(localStorage);
	}
	return store.localStorage2;
}

export function getSessionStorage2() {
	if (!store.sessionStorage2) {
		store.sessionStorage2 = makeStorageHelper(glb().sessionStorage);
	}
	return store.sessionStorage2;
}
