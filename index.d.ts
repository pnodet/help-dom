/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} insertBefore
 */
export function insertBefore(element: Element, target: Element): void;
/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} insertAfter
 */
export function insertAfter(element: Element, target: Element): void;
/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} prependTo
 */
export function prependTo(element: Element, target: Element): void;
/**
 * @param {Element} el
 * @param {Element} target
 * @returns {Void} appendTo
 */
export function appendTo(element: Element, target: Element): void;
/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOM(
	element: HTMLElement | Window | Document,
	name: string,
	handler: any,
	...args: any[]
): void;
/**
 * @param {HTMLElement | Window | Document} el
 * @param {String} name
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function offDOM(
	element: HTMLElement | Window | Document,
	name: string,
	handler: any,
	...args: any[]
): void;
/**
 * @param {...HTMLElement | Window | Document} els
 * @param {...String} names
 * @param {EventHandler} handler
 * @param {...*} args
 * @returns {Void}
 */
export function onDOMMany(
	els: Array<HTMLElement | Window | Document>,
	names: string[],
	handler: any,
	...args: any[]
): void;
/**
 * @param {String} url
 */
export function getImageSizeByUrl(url: string): Promise<any>;
/**
 * Set cursor position in html textbox
 * @link http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
 */
export function setCaretPosition(element: any, start: any, end: any): boolean;
/**
 * Detect the scroll top of the window
 * @link https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
 */
export function getScroll(): {
	top: number;
	left: number;
};
/**
 * @param {HTMLElement} el
 * @link refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 */
export function getOffset(element: HTMLElement): {
	x: number;
	y: number;
};
/**
 * There is some trap in el.offsetParent, so use this func to fix
 * @param {HTMLElement} el
 */
export function getOffsetParent(element: HTMLElement): Element;
/**
 * Get el current position.
 * like jQuery.position.
 * The position is relative to offsetParent viewport left top.
 * It is for set absolute position, absolute position is relative to offsetParent viewport left top.
 * @param {HTMLElement} el
 */
export function getPosition(element: HTMLElement): {
	x: number;
	y: number;
};
/**
 * Like jQuery.offset(x, y), but it just return cmputed position, don't update style
 * @param {HTMLElement} el
 * @param {{x: number, y: number}} of
 * @returns {{x: number, y: number}}
 */
export function getPositionFromOffset(
	element: HTMLElement,
	of: {
		x: number;
		y: number;
	},
): {
	x: number;
	y: number;
};
/**
 * @link http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 * @param {HTMLElement} el
 */
export function getBoundingClientRect(element: HTMLElement): {
	top: number;
	right: number;
	bottom: number;
	left: number;
	width: number;
	height: number;
	x: number;
	y: number;
};
/**
 * Get global, such as window in browser.
 * @param {Window} glb
 */
export function glb(): any;
export function windowLoaded(): Promise<any>;
export function makeStorageHelper(storage: any): {
	storage: any;
	/**
	 * @param {String} name
	 * @param {*} value
	 * @param {number} minutes
	 */
	set(name: string, value: any, minutes: number): void;
	/**
	 * @param {String} name
	 */
	get(name: string): any;
	clear(): void;
};
export function getLocalStorage2(): any;
export function getSessionStorage2(): any;
export function isWebComponent(element: Element): boolean;
export function getUserLanguage(): any;
export function nextChild(pathItem: any, root: any): any;
export function getParentById(node: any, id: any): any;
export function getParentByData(node: any, key: any, value: any): any;
export function allElements(selector: any, root?: Document): any[];
export function id(elementId: any, root?: Document): HTMLElement;
export function getIndex(node: Node, nodeList: NodeList): number;
export function getAttributes(element: Node): Record<string, unknown>;
export function createElementsArray(html?: string): ChildNode[];
export function createElement(
	name: any,
	attributes?: Record<string, unknown>,
	content?: string,
): ChildNode;
export function attsToString(attributes: any): string;
export function tag(
	name: any,
	attributes?: Record<string, unknown>,
	content?: string,
): string;
export function setContent(element: any, ...content: any[]): void;
export function removeElements(selector: any, root?: Document): void;
export function classPresentIf(
	element: any,
	cssClass: any,
	condition: any,
): void;
export function getCookie(name: string): string;
export function serialize(data: FormData): string;
export function objectifyForm(form: Node): string;
export function add(target: any, tobeAdded: any, location?: string): boolean;
export function toClipboardFromElement(element: Node): boolean;
export function toClipboard(text: string): boolean;
/**
 * @link http://www.51xuediannao.com/javascript/getBoundingClientRect.html
 * @param {HTMLElement} el
 */
export function getViewportPosition(element: HTMLElement): {
	top: number;
	right: number;
	bottom: number;
	left: number;
	width: number;
	height: number;
	x: number;
	y: number;
};
export namespace store {
	const uniqueId: Record<string, unknown>;
}
export type Store = {
	glb: Window;
	uniqueId: Record<string, true>;
	localStorage2?: ReturnType<typeof makeStorageHelper>;
	sessionStorage2?: ReturnType<typeof makeStorageHelper>;
};
