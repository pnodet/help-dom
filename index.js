/* globals document, localStorage, window, navigator, pageYOffset, pageXOffset, getComputedStyle */

const isWebComponent = element =>
	element && element.shadowRoot && element.tagName.includes('-');

/** Select all elements matching given selector. */
export const allElements = (selector, root = document) => {
	if (isWebComponent(root)) {
		root = root.shadowRoot;
	}

	return [...root.querySelectorAll(selector)];
};

/** Append `element` to `target` */
export const appendTo = (element, target) => {
	target.append(element);
};

/** Prepend `element` to `target` */
export const prependTo = (element, target) => {
	target.insertBefore(element, target.firstChild);
};

// Export const attsToString = (attributes) => {
// 	const array = [];
// 	attributes.forEach((k, v) => {
// 		array.push(`${k}="${v}"`);
// 	});
// 	const sep = array.length > 0 ? ' ' : '';
// 	return sep + array.join(' ');
// };

/** Add `cssClass` to `element` if condition is true, remove if false. */
export const classPresentIf = (element, cssClass, condition) => {
	if (!element) return;
	const action = condition ? 'add' : 'remove';
	element.classList[action](cssClass);
};

/** Create the html for a given tag */
export const tag = (name, attributes = {}, content = '') => {
	if (!name) return '';
	const atts = attsToString(attributes);
	return `<${name}${atts}>${content}</${name}>`;
};

/** Create a single DOM element. */
export const createElement = (name, attributes = {}, content = '') => {
	const html = tag(name, attributes, content);

	const elements = createElementsArray(html);
	if (elements.length === 0) return null;
	return elements[0];
};

/** Create an array of DOM elements from given html. */
export const createElementsArray = (html = '') => {
	html = html.trim();
	if (!html) return [];

	const temporary = document.createElement('template');
	temporary.innerHTML = html;
	return [...temporary.content.childNodes];
};

/** Get attributes of an element as an object with key/value. */
export const getAttributes = element => {
	const result = {};
	const atts = element.attributes;
	if (!atts || atts.length === 0) return result;

	for (const a of atts) {
		result[a.name] = a.value;
	}

	return result;
};

/**
 * @link http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 */
export function getBoundingClientRect(element) {
	const xy = element.getBoundingClientRect();
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

/** Get the value of a cookie. */
export const getCookie = name => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

export function getImageSizeByUrl(url) {
	const image = document.createElement('img');
	return new Promise((resolve, reject) => {
		onDOM(image, 'load', () => {
			resolve({width: image.width, height: image.height});
		});
		onDOM(image, 'error', error => {
			reject(error);
		});
		image.src = url;
	});
}

/** Returns the index of a node in a nodeList. */
export const getIndex = (node, nodeList) => {
	const nodesLength = nodes.length;
	const nodes = nodeList || node.parentNode.childNodes;
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
 * Get global, such as window in browser.
 * @param {Window} glb
 */
export function glb() {
	// `this` !== global or window because of build tool. So you can't use `this` to get `global`
	if (store.glb) {
		return store.glb;
	}

	// Resolve global
	let t;
	try {
		t = global;
	} catch {
		t = window;
	}

	store.glb = t;
	return t;
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

/**
 * What is user's navigator language ?
 */
export const getUserLanguage = () =>
	navigator.language || navigator.userLanguage;

/** Insert `element` before `target` */
export const insertBefore = (element, target) => {
	target.parentElement.insertBefore(element, target);
};

/** Insert `element` after `target` */
export const insertAfter = (element, target) => {
	target.parentElement.insertBefore(element, target.nextSibling);
};

/** Select next child */
export const nextChild = (pathItem, root) =>
	pathItem === 'shadowRoot' || pathItem === 'shadow-root'
		? root.shadowRoot
		: root.querySelector(pathItem);

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

/** Select element with a given id */
export const id = (elementId, root = document) => {
	if (isWebComponent(root)) {
		root = root.shadowRoot;
	}

	return root.querySelector(`#${elementId}`);
};

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOM(element, name, handler, ...args) {
	if (element.addEventListener) {
		element.addEventListener(name, handler, ...args);
	} else if (element.attachEvent) {
		element.attachEvent(`on${name}`, handler, ...args);
	}
}

/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function offDOM(element, name, handler, ...args) {
	if (element.removeEventListener) {
		element.removeEventListener(name, handler, ...args);
	} else if (element.detachEvent) {
		element.detachEvent(`on${name}`, handler, ...args);
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
	for (const element of els) {
		for (const name of names) {
			onDOM(element, name, handler, ...args);
		}
	}

	const destroy = () => {
		for (const element of els) {
			for (const name of names) {
				offDOM(element, name, handler);
			}
		}
	};

	return destroy;
}

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
	for (const element of elements) {
		element.remove();
	}
};

/**
 * Serialize all form data into an object
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {FormData} data The FormData object to serialize
 * @return {String}        The serialized form data
 */
export const serialize = data => {
	const object = {};
	for (const [key, value] of data) {
		if (object[key] !== undefined) {
			if (!Array.isArray(object[key])) {
				object[key] = [object[key]];
			}

			object[key].push(value);
		} else {
			object[key] = value;
		}
	}

	return object;
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
export const objectifyForm = form => {
	let field;
	const object = {};

	if (typeof form === 'object' && form.nodeName === 'FORM') {
		const {length} = form.elements;
		for (let i = 0; i < length; i++) {
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
							object[field.name] = field.options[j].value;
						}
					}
				} else if (
					(field.type !== 'checkbox' && field.type !== 'radio') ||
					field.checked
				) {
					object[field.name] = field.value;
				}
			}
		}
	}

	return object;
};

/** Check if given argument is of String type */
const isString = value => typeof value === 'string';

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
export function setCaretPosition(element, start, end) {
	// Get "focus" and make sure we don't have everything -selected-
	element.value = element.value;

	// (el.selectionStart === 0 added for Firefox bug)
	if (element.selectionStart || element.selectionStart === 0) {
		element.focus();
		if (!end || end < start) {
			end = start;
		}

		element.setSelectionRange(start, end);
		return true;
	}

	if (element.createTextRange) {
		const range = element.createTextRange();
		range.move('character', end);
		range.select();
		return true;
	}

	element.focus();
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
export const toClipboardFromElement = element => {
	try {
		element.select();
		const successful = document.execCommand('copy');
		return Boolean(successful);
	} catch {
		return false;
	}
};

/**
 * Copies area value to the clipboard.
 * @param {String} text
 */
export const toClipboard = text => {
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

	textArea.value = text; // Set Value

	document.body.append(textArea);
	const success = toClipboardFromElement(textArea);
	textArea.remove();
	return success;
};

/**
 * Detect the scroll top of the window
 * @link https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
 */
export function getScroll() {
	const B = document.body; // IE 'quirks'
	let D = document.documentElement; // IE with doctype
	D = D.clientHeight ? D : B;

	typeof pageYOffset === undefined
		? {
				top: D.scrollTop,
				left: D.scrollLeft,
		  }
		: {
				top: pageYOffset,
				left: pageXOffset,
		  };
}

/**
 * @param {HTMLElement} el
 * @link refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 */
export const getOffset = element => ({
	x: getBoundingClientRect(element).left + getScroll().left,
	y: getBoundingClientRect(element).top + getScroll().top,
});

/**
 * There is some trap in el.offsetParent, so use this func to fix
 * @param {HTMLElement} el
 */
export function getOffsetParent(element) {
	let {offsetParent} = element;
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
 * Get el current position.
 * like jQuery.position.
 * The position is relative to offsetParent viewport left top.
 * It is for set absolute position, absolute position is relative to offsetParent viewport left top.
 * @param {HTMLElement} el
 */
export function getPosition(element) {
	const offsetParent = getOffsetParent(element);
	const ps = {x: element.offsetLeft, y: element.offsetTop};
	let parent = element;
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
 * Like jQuery.offset(x, y), but it just return cmputed position, don't update style
 * @param {HTMLElement} el
 * @param {{x: number, y: number}} of
 * @returns {{x: number, y: number}}
 */
export function getPositionFromOffset(element, of) {
	const offsetParent = getOffsetParent(element);
	const parentOf = getOffset(offsetParent);
	return {
		x: of.x - parentOf.x,
		y: of.y - parentOf.y,
	};
}

/** Refer [getBoundingClientRect](#getBoundingClientRect) */
export const getViewportPosition = getBoundingClientRect;

export function windowLoaded() {
	return new Promise(resolve => {
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
			// Set null can remove a item
			if (value == null) {
				this.storage.removeItem(name);
			} else {
				this.storage.setItem(
					name,
					JSON.stringify({
						value,
						expired_at: minutes ? Date.now() + minutes * 60 * 1000 : null,
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
				if (!t.expired_at || t.expired_at > Date.now()) {
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
