//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/utility-classes.css?inline
var e = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}", t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = {}, _ = [], v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, y = Array.isArray;
function b(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function x(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function S(e, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? t.call(arguments, 2) : r), typeof e == "function" && e.defaultProps != null) for (o in e.defaultProps) s[o] === void 0 && (s[o] = e.defaultProps[o]);
	return C(e, s, i, a, null);
}
function C(e, t, i, a, o) {
	var s = {
		type: e,
		props: t,
		key: i,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: o ?? ++r,
		__i: -1,
		__u: 0
	};
	return o == null && n.vnode != null && n.vnode(s), s;
}
function ee(e) {
	return e.children;
}
function te(e, t) {
	this.props = e, this.context = t;
}
function w(e, t) {
	if (t == null) return e.__ ? w(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? w(e) : null;
}
function T(e) {
	if (e.__P && e.__d) {
		var t = e.__v, r = t.__e, i = [], a = [], o = b({}, t);
		o.__v = t.__v + 1, n.vnode && n.vnode(o), se(e.__P, o, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [r] : null, i, r ?? w(t), !!(32 & t.__u), a), o.__v = t.__v, o.__.__k[o.__i] = o, le(i, o, a), t.__e = t.__ = null, o.__e != r && E(o);
	}
}
function E(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), E(e);
}
function D(e) {
	(!e.__d && (e.__d = !0) && i.push(e) && !O.__r++ || a != n.debounceRendering) && ((a = n.debounceRendering) || o)(O);
}
function O() {
	try {
		for (var e, t = 1; i.length;) i.length > t && i.sort(s), e = i.shift(), t = i.length, T(e);
	} finally {
		i.length = O.__r = 0;
	}
}
function ne(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, v, y = r && r.__k || _, b = t.length;
	for (c = re(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || g, p.__i = d, v = se(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && fe(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = k(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function re(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = C(null, o, null, null, null) : y(o) ? o = e.__k[a] = C(ee, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = C(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = ie(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), pe(s, s));
	return r;
}
function k(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = k(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = w(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function ie(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function A(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || v.test(t) ? n : n + "px";
}
function ae(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || A(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || A(e.style, t, n[t]);
	}
	else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(d, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[u] = r[u] : (n[u] = f, e.addEventListener(t, a ? m : p, a)) : e.removeEventListener(t, a ? m : p, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function oe(e) {
	return function(t) {
		if (this.l) {
			var r = this.l[t.type + e];
			if (t[l] == null) t[l] = f++;
			else if (t[l] < r[u]) return;
			return r(n.event ? n.event(t) : t);
		}
	};
}
function se(e, t, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, v, S, C, T, E, D, O, re, k, ie, A = t.type;
	if (t.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = t.__e = r.__e]), (d = n.__b) && d(t);
	n: if (typeof A == "function") {
		f = s.length;
		try {
			if (C = t.props, T = A.prototype && A.prototype.render, E = (d = A.contextType) && i[d.__c], D = d ? E ? E.props.value : d.__ : i, r.__c ? S = (p = t.__c = r.__c).__ = p.__E : (T ? t.__c = p = new A(C, D) : (t.__c = p = new te(C, D), p.constructor = A, p.render = me), E && E.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), T && p.__s == null && (p.__s = p.state), T && A.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = b({}, p.__s)), b(p.__s, A.getDerivedStateFromProps(C, p.__s))), h = p.props, g = p.state, p.__v = t, m) T && A.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), T && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (T && A.getDerivedStateFromProps == null && C !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(C, D), t.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(C, p.__s, D)) {
					t.__v != r.__v && (p.props = C, p.state = p.__s, p.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), _.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = w(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(C, p.__s, D), T && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, g, v);
				});
			}
			if (p.context = D, p.props = C, p.__P = e, p.__e = !1, O = n.__r, re = 0, T) p.state = p.__s, p.__d = !1, O && O(t), d = p.render(p.props, p.state, p.context), _.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, O && O(t), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++re < 25);
			p.state = p.__s, p.getChildContext != null && (i = b(b({}, i), p.getChildContext())), T && !m && p.getSnapshotBeforeUpdate != null && (v = p.getSnapshotBeforeUpdate(h, g)), k = d != null && d.type === ee && d.key == null ? ue(d.props.children) : d, c = ne(e, y(k) ? k : [k], t, r, i, a, o, s, c, l, u), p.base = t.__e, t.__u &= -161, p.__h.length && s.push(p), S && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, t.__v = null, l || o != null) {
				if (e.then) {
					for (t.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), t.__e = c;
				} else if (o != null) for (ie = o.length; ie--;) x(o[ie]);
			} else t.__e = r.__e;
			t.__k ??= r.__k || [], e.then || ce(t), n.__e(e, t, r);
		}
	} else o == null && t.__v == r.__v ? (t.__k = r.__k, t.__e = r.__e) : c = t.__e = de(r.__e, t, r, i, a, o, s, l, u);
	return (d = n.diffed) && d(t), 128 & t.__u ? void 0 : c;
}
function ce(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(ce));
}
function le(e, t, r) {
	for (var i = 0; i < r.length; i++) fe(r[i], r[++i], r[++i]);
	n.__c && n.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			n.__e(e, t.__v);
		}
	});
}
function ue(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : y(e) ? e.map(ue) : e.constructor === void 0 ? b({}, e) : null;
}
function de(e, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, _, v, b = i.props || g, S = r.props, C = r.type;
	if (C == "svg" ? o = "http://www.w3.org/2000/svg" : C == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o ||= "http://www.w3.org/1999/xhtml", s != null) {
		for (d = 0; d < s.length; d++) if ((h = s[d]) && "setAttribute" in h == !!C && (C ? h.localName == C : h.nodeType == 3)) {
			e = h, s[d] = null;
			break;
		}
	}
	if (e == null) {
		if (C == null) return document.createTextNode(S);
		e = document.createElementNS(o, C, S.is && S), l &&= (n.__m && n.__m(r, s), !1), s = null;
	}
	if (C == null) b === S || l && e.data == S || (e.data = S);
	else {
		if (s = C == "textarea" && S.defaultValue != null ? null : s && t.call(e.childNodes), !l && s != null) for (b = {}, d = 0; d < e.attributes.length; d++) b[(h = e.attributes[d]).name] = h.value;
		for (d in b) h = b[d], d == "dangerouslySetInnerHTML" ? p = h : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || ae(e, d, null, h, o);
		for (d in S) h = S[d], d == "children" ? m = h : d == "dangerouslySetInnerHTML" ? f = h : d == "value" ? _ = h : d == "checked" ? v = h : l && typeof h != "function" || b[d] === h || ae(e, d, h, b[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == e.innerHTML) || (e.innerHTML = f.__html), r.__k = [];
		else if (p && (e.innerHTML = ""), ne(r.type == "template" ? e.content : e, y(m) ? m : [m], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) x(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && _ == null ? e.removeAttribute("value") : _ != null && (_ !== e[d] || C == "progress" && !_ || C == "option" && _ != b[d]) && ae(e, d, _, b[d], o), d = "checked", v != null && v != e[d] && ae(e, d, v, b[d], o));
	}
	return e;
}
function fe(e, t, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		n.__e(e, r);
	}
}
function pe(e, t, r) {
	var i, a;
	if (n.unmount && n.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || fe(i, null, t)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			n.__e(e, t);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && pe(i[a], t, r || typeof e.type != "function");
	r || x(e.__e), e.__c = e.__ = e.__e = void 0;
}
function me(e, t, n) {
	return this.constructor(e, n);
}
function he(e, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), n.__ && n.__(e, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], se(r, e = (!a && i || r).__k = S(ee, null, [e]), o || g, g, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? t.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), le(s, e, c), e.props.children = null;
}
function ge(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, D(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + h++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
t = _.slice, n = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, r = 0, te.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = b({}, this.state);
	typeof e == "function" && (e = e(b({}, n), this.props)), e && b(n, e), e != null && this.__v && (t && this._sb.push(t), D(this));
}, te.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), D(this));
}, te.prototype.render = ee, i = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, s = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, O.__r = 0, c = Math.random().toString(8), l = "__d" + c, u = "__a" + c, d = /(PointerCapture)$|Capture$/i, f = 0, p = oe(!1), m = oe(!0), h = 0;
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function _e(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function ve(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				_e(e);
			});
		}
		connectedCallback() {
			if (!(this.isMounted || !this.shadowRoot)) {
				if (t.cssTexts) {
					let e = document.createElement("style");
					e.dataset.unit1Styles = "true", e.textContent = t.cssTexts.join("\n"), this.shadowRoot.appendChild(e);
				}
				t.adoptedStyleSheets && (this.shadowRoot.adoptedStyleSheets = t.adoptedStyleSheets), this.disposeRender = e(this.shadowRoot), this.isMounted = !0;
			}
		}
		disconnectedCallback() {
			this.isMounted && this.shadowRoot && setTimeout(() => {
				this.shadowRoot && (this.disposeRender?.(), this.disposeRender = null, this.isMounted = !1);
			}, 0);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function ye(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/array-utils-4n0oRYSd.js
function be(e) {
	return Array(e).fill(0).map((e, t) => t);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/number-utils-CUPZTwjx.js
function xe(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Se(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? xe(o, Math.min(r, i), Math.max(r, i)) : o;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax/index.js
function Ce(e, t) {
	return (e & 1 << t) > 0;
}
function we(e, t) {
	return e ^ 1 << t;
}
function Te(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, t(e, n)]));
}
//#endregion
//#region src/utils/curve.ts
function Ee(e) {
	return e > .5 ? 1 + (e - .5) / .5 * 1.5 : (e / .5) ** 2;
}
//#endregion
//#region src/utils/get-uri-query-value.ts
function De(e, t) {
	let n = e.includes("?") ? e.slice(e.indexOf("?") + 1) : "";
	return new URLSearchParams(n).get(t);
}
//#endregion
//#region src/audio/tone-player.ts
var Oe = { gAudioContext: void 0 };
function ke(e) {
	let t = e?.audioContext ?? new AudioContext();
	Oe.gAudioContext = t;
	let n = e?.audioOutputNode ?? t.destination, r = t.createGain();
	r.gain.value = .5, r.connect(n);
	let i = /* @__PURE__ */ new Map();
	return {
		async preloadTone(e) {
			if (i.has(e)) return;
			let n = await fetch(e);
			if (!n.ok) {
				console.error("failed to fetch", e), i.set(e, null);
				return;
			}
			let r = De(e, "vol"), a = r ? parseFloat(r) / 100 : 1;
			try {
				let r = await n.arrayBuffer(), o = await t.decodeAudioData(r);
				i.set(e, {
					audioBuffer: o,
					volume: a
				});
			} catch {
				console.error("failed to decode", e), i.set(e, null);
			}
		},
		playTone(e, n, a, o, s) {
			let c = i.get(e);
			if (!c) return;
			let l = t.createBufferSource();
			l.buffer = c.audioBuffer;
			let u = 2 ** ((a * 2 - 1) * .5);
			l.playbackRate.value = u;
			let d = t.createGain(), f = c.volume * Ee(o);
			d.gain.value = f, l.connect(d), d.connect(r), l.start(n);
		},
		setMasterVolume(e) {
			let n = Ee(e);
			r.gain.setTargetAtTime(n, t.currentTime, .005);
		}
	};
}
//#endregion
//#region src/base/piece-sample-urls.ts
function Ae() {
	return import.meta.url.includes("index.js") ? import.meta.url.replace(/\/index\.js.*$/, "") : "";
}
var je = {
	kick: [
		"samples/fso/kick/274775__ianstargem__simple-kick-drum.wav",
		"samples/fso/kick/520987__akustika__fbd-10.wav?vol=90",
		"samples/fso/kick/128625__asbs__asbs-pure-psytrance-kick-000.wav?vol=90",
		"samples/pxa/kick/juniorsoundays-10-kick-g-125-bpm-381215.mp3?vol=180",
		"samples/pxa/kick/viko288-edm-kick-301391.mp3?vol=90",
		"samples/fso/kick/494414__akustika__pd-kick-10.wav?vol=80"
	],
	snare: [
		"samples/pxa/snare/xenomorphillia-dubstep-snare-237920.mp3?vol=150",
		"samples/pxa/snare/11325622-tr909-snare-drum-241413.mp3?vol=90",
		"samples/fso/snare/326585__hardwareshaba__snr_07.wav?vol=110",
		"samples/fso/snare/420923__akustika__j-snare-sd-01.wav?vol=90",
		"samples/fso/snare/422292__akustika__sdr-03.wav?vol=80",
		"samples/fso/snare/422300__akustika__sdr-09.wav?vol=80"
	],
	opHat: [
		"samples/pxa/ho/soundreality-hi-hat-open-acoustic-sample-455284_trimmed.mp3?vol=60",
		"samples/fso/ho/421044__akustika__ho-01.wav?vol=80",
		"samples/fso/ho/421043__akustika__ho-02.wav?vol=110",
		"samples/fso/ho/418728__lynx_5969__synth-open-hi-hat.wav?vol=110",
		"samples/fso/ho/513380__pomeroyjoshua__hh-pd-06.wav?vol=70",
		"samples/fso/ho/422302__akustika__hor-01.wav?vol=80"
	],
	clHat: [
		"samples/pxa/hc/soundreality-hi-hat-closed-acoustic-sample-455286_trimmed.mp3?vol=50",
		"samples/fso/hc/421045__akustika__hc-03.wav?vol=70",
		"samples/fso/hc/634823__collinb1000__closed6.wav?vol=80",
		"samples/fso/hc/91688__zinzan_101__jdrockhihat.wav?vol=110",
		"samples/fso/hc/674294__theendofacycle__hi-hat-closed-hit-01.wav?vol=60",
		"samples/fso/hc/634819__collinb1000__closed2.wav?vol=110"
	],
	clap: [
		"samples/pxa/clap/mrstokes302-clap-drum-mrstokes302-426361.mp3?vol=90",
		"samples/fso/clap/24787__young_daddy__clap-mix2.wav?vol=70",
		"samples/fso/clap/561089__sorinious_genious__clap-1.wav?vol=80",
		"samples/fso/clap/24786__young_daddy__clap-mix.wav",
		"samples/fso/clap/418730__lynx_5969__synth-clap.wav?vol=160",
		"samples/pxa/clap/freesound_community-mega-clap-1-101223.mp3?vol=80"
	]
}, Me = Ae(), j = Te(je, (e, t) => t.map((e) => `${Me}/${e}`));
//#endregion
//#region src/audio/drum-sequencer.ts
function Ne(e, t) {
	let n = ke(e), r = { pieces: t };
	return {
		preloadFirst() {
			for (let e of r.pieces) e.active && e.patternBits > 0 && n.preloadTone(j[e.id][e.variationIndex]);
		},
		patchPiece(e, t) {
			let i = r.pieces.find((t) => t.id === e);
			i && (Object.assign(i, t), n.preloadTone(j[i.id][i.variationIndex]));
		},
		start() {},
		stop() {},
		processStep(e, t) {
			let i = e;
			for (let e of r.pieces) if (e.active && Ce(e.patternBits, i)) {
				let r = j[e.id][e.variationIndex];
				r && n.playTone(r, t, e.pitch, e.volume, e.id);
			}
		},
		async previewPiece(e) {
			let t = r.pieces.find((t) => t.id === e);
			if (t) {
				await n.preloadTone(j[t.id][t.variationIndex]);
				let e = j[t.id][t.variationIndex];
				n.playTone(e, 0, t.pitch, t.volume, t.id);
			}
		},
		setMasterVolume(e) {
			n.setMasterVolume(e);
		}
	};
}
//#endregion
//#region src/base/app-config.ts
var Pe = { isDevelopment: !1 }, M = [
	"kick",
	"snare",
	"opHat",
	"clHat",
	"clap"
], Fe = {
	kick: "KICK",
	snare: "SNARE",
	opHat: "OP-HIHAT",
	clHat: "CL-HIHAT",
	clap: "CLAP"
};
//#endregion
//#region src/base/presets.ts
function Ie(e) {
	let t = e.replaceAll("|", "").split(""), n = 0;
	for (let e = 0; e < t.length; e++) t[e] === "o" && (n |= 1 << e);
	return n;
}
function Le(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, Ie(t)]));
}
var Re = {
	kick: .55,
	snare: .4,
	opHat: .4,
	clHat: .3,
	clap: .4
}, ze = {
	init: { pieceItems: M.map((e) => ({
		id: e,
		variationIndex: 0,
		active: !0,
		pitch: .5,
		volume: Re[e],
		patternBits: Le({
			kick: "",
			snare: "",
			opHat: "",
			clHat: "",
			clap: ""
		})[e]
	})) },
	preset1: { pieceItems: M.map((e) => ({
		id: e,
		variationIndex: 0,
		active: !0,
		pitch: .5,
		volume: Re[e],
		patternBits: Le({
			kick: "|o---|o---|o---|o---|",
			snare: "",
			opHat: "|--o-|--o-|--o-|--o-|",
			clHat: "",
			clap: ""
		})[e]
	})) },
	preset2: { pieceItems: M.map((e) => ({
		id: e,
		variationIndex: 0,
		active: !0,
		pitch: .5,
		volume: Re[e],
		patternBits: Le({
			kick: "|o---|o---|o---|o---|",
			snare: "",
			opHat: "",
			clHat: "|oooo|oooo|oooo|oooo|",
			clap: ""
		})[e]
	})) },
	preset3: { pieceItems: M.map((e) => ({
		id: e,
		variationIndex: 0,
		active: !0,
		pitch: .5,
		volume: Re[e],
		patternBits: Le({
			kick: "|o---|o---|o---|o---|",
			snare: "|----|o---|----|o---|",
			opHat: "|--o-|--o-|--o-|--o-|",
			clHat: "|oo-o|oo-o|oo-o|oo-o|",
			clap: "|----|o---|----|o---|"
		})[e]
	})) }
}, Be = structuredClone(ze.preset3);
Pe.isDevelopment;
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function Ve(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = Ve(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function N() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Ve(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/utils/casing-helper.ts
function He(e) {
	return e.replace(/([A-Z])/g, "-$1").toLowerCase();
}
//#endregion
//#region src/utils/color-mod.ts
function Ue(e) {
	let t = e.replace(/^#/, "");
	if (t.length === 3) return {
		r: parseInt(t[0] + t[0], 16),
		g: parseInt(t[1] + t[1], 16),
		b: parseInt(t[2] + t[2], 16)
	};
	if (t.length === 6) return {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	};
	throw Error(`Invalid color: ${e}`);
}
function We(e) {
	let t = [];
	for (let n of e.trim().split(/\s+/)) {
		if (!n) continue;
		let e = n.match(/^([vhlsa])([+-]?\d+)$/i);
		if (!e) continue;
		let r = e[1].toLowerCase(), i = e[2], a = r !== "a" && (i.startsWith("+") || i.startsWith("-"));
		t.push({
			type: r,
			relative: a,
			amount: parseInt(i, 10)
		});
	}
	return t;
}
function P(e) {
	return Math.max(0, Math.min(1, e));
}
function Ge(e) {
	return e %= 1, e < 0 && (e += 1), e;
}
function Ke(e, t) {
	return t.relative ? Ge(e + Math.max(-360, Math.min(360, t.amount)) / 360) : Ge(Math.max(0, Math.min(360, t.amount)) / 360);
}
function qe(e, t, n) {
	e /= 255, t /= 255, n /= 255;
	let r = Math.max(e, t, n), i = r - Math.min(e, t, n), a = 0, o = r, s = r === 0 ? 0 : i / r;
	if (i !== 0) switch (r) {
		case e:
			a = ((t - n) / i + (t < n ? 6 : 0)) / 6;
			break;
		case t:
			a = ((n - e) / i + 2) / 6;
			break;
		case n: a = ((e - t) / i + 4) / 6;
	}
	return [
		a,
		s,
		o
	];
}
function Je(e, t, n) {
	if (t === 0) {
		let e = Math.round(n * 255);
		return {
			r: e,
			g: e,
			b: e
		};
	}
	let r = Math.floor(e * 6), i = e * 6 - r, a = n * (1 - t), o = n * (1 - i * t), s = n * (1 - (1 - i) * t), c = 0, l = 0, u = 0;
	switch (r % 6) {
		case 0:
			c = n, l = s, u = a;
			break;
		case 1:
			c = o, l = n, u = a;
			break;
		case 2:
			c = a, l = n, u = s;
			break;
		case 3:
			c = a, l = o, u = n;
			break;
		case 4:
			c = s, l = a, u = n;
			break;
		case 5: c = n, l = a, u = o;
	}
	return {
		r: Math.round(c * 255),
		g: Math.round(l * 255),
		b: Math.round(u * 255)
	};
}
function Ye(e, t, n) {
	e /= 255, t /= 255, n /= 255;
	let r = Math.max(e, t, n), i = Math.min(e, t, n), a = r - i, o = 0, s = (r + i) / 2, c = 0;
	if (a !== 0) switch (c = s > .5 ? a / (2 - r - i) : a / (r + i), r) {
		case e:
			o = ((t - n) / a + (t < n ? 6 : 0)) / 6;
			break;
		case t:
			o = ((n - e) / a + 2) / 6;
			break;
		case n: o = ((e - t) / a + 4) / 6;
	}
	return [
		o,
		c,
		s
	];
}
function Xe(e, t, n) {
	if (t === 0) {
		let e = Math.round(n * 255);
		return {
			r: e,
			g: e,
			b: e
		};
	}
	let r = n < .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = (e) => (e < 0 && (e += 1), e > 1 && --e, e < 1 / 6 ? i + (r - i) * 6 * e : e < 1 / 2 ? r : e < 2 / 3 ? i + (r - i) * (2 / 3 - e) * 6 : i);
	return {
		r: Math.round(a(e + 1 / 3) * 255),
		g: Math.round(a(e) * 255),
		b: Math.round(a(e - 1 / 3) * 255)
	};
}
function Ze(e) {
	return e / 100 * 255;
}
function Qe(e) {
	return Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0").toUpperCase();
}
function F(e, t = "") {
	let { r: n, g: r, b: i } = Ue(e), a = 255, o = "hsv";
	for (let e of We(t)) {
		let t = e.amount / 100;
		switch (e.type) {
			case "h":
				if (o === "hsl") {
					let [t, a, o] = Ye(n, r, i);
					t = Ke(t, e), {r: n, g: r, b: i} = Xe(t, a, o);
				} else {
					let [t, a, o] = qe(n, r, i);
					t = Ke(t, e), {r: n, g: r, b: i} = Je(t, a, o);
				}
				break;
			case "v": {
				o = "hsv";
				let [a, s, c] = qe(n, r, i);
				c = e.relative ? P(c + t) : P(t), {r: n, g: r, b: i} = Je(a, s, c);
				break;
			}
			case "l": {
				o = "hsl";
				let [a, s, c] = Ye(n, r, i);
				c = e.relative ? P(c + t) : P(t), {r: n, g: r, b: i} = Xe(a, s, c);
				break;
			}
			case "s":
				if (o === "hsl") {
					let [a, o, s] = Ye(n, r, i);
					o = e.relative ? P(o + t) : P(t), {r: n, g: r, b: i} = Xe(a, o, s);
				} else {
					let [a, o, s] = qe(n, r, i);
					o = e.relative ? P(o + t) : P(t), {r: n, g: r, b: i} = Je(a, o, s);
				}
				break;
			case "a": a = Ze(Math.max(0, Math.min(100, e.amount)));
		}
	}
	return `#${Qe(n)}${Qe(r)}${Qe(i)}${Qe(a)}`;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/index.js
function $e(e, t, n) {
	let r = e.currentTarget, i = n?.coordinate ?? "page", a = e.view ?? window, o = i === "relative" ? r.getBoundingClientRect() : void 0, s = (e) => {
		switch (i) {
			case "relative": return {
				x: e.clientX - (o?.left ?? 0),
				y: e.clientY - (o?.top ?? 0)
			};
			case "page": return {
				x: e.clientX,
				y: e.clientY
			};
			case "screen": return {
				x: e.screenX,
				y: e.screenY
			};
		}
	}, c = s(e), l = (e) => {
		let n = s(e);
		t.onDown?.({
			position: n,
			originalPosition: c
		});
	}, u = (e) => {
		let n = s(e);
		t.onMove?.({
			position: n,
			originalPosition: c
		});
	}, d = () => {
		try {
			r.releasePointerCapture(e.pointerId);
		} catch {}
		a.removeEventListener("pointermove", u), a.removeEventListener("pointerup", f), a.removeEventListener("pointercancel", p);
	}, f = (n) => {
		n.pointerId === e.pointerId && (t.onUp?.({
			position: s(n),
			originalPosition: c
		}), t.onUpOrCancel?.({
			position: s(n),
			originalPosition: c
		}), d());
	}, p = (n) => {
		n.pointerId === e.pointerId && (t.onCancel?.({
			position: s(n),
			originalPosition: c
		}), t.onUpOrCancel?.({
			position: s(n),
			originalPosition: c
		}), d());
	};
	a.addEventListener("pointermove", u), a.addEventListener("pointerup", f), a.addEventListener("pointercancel", p);
	try {
		r.setPointerCapture(e.pointerId);
	} catch {}
	l(e);
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var et = 0;
Array.isArray;
function I(e, t, r, i, a, o) {
	t ||= {};
	var s, c, l = t;
	if ("ref" in l) for (c in l = {}, t) c == "ref" ? s = t[c] : l[c] = t[c];
	var u = {
		type: e,
		props: l,
		key: r,
		ref: s,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --et,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return n.vnode && n.vnode(u), u;
}
//#endregion
//#region src/components/knob-frame.tsx
function tt(e) {
	return /* @__PURE__ */ I("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			$e(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = xe(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
				},
				onUp() {
					s || e.onClick?.();
				}
			});
		},
		style: { cursor: "pointer" },
		children: e.children
	});
}
//#endregion
//#region src/components/index.tsx
var nt = {
	clPanelBg: F("#445060", "v-3 s-5"),
	clHeadPartBg: F("#444850", "s-3 v-6"),
	clBodyPartBg: F("#444850", "s-10 v-10"),
	clKnobBg: F("#445", "h-20 s-8 v+5"),
	clStepButtonBg: F("#565", "v23 s4"),
	clStepButtonBgAlt: F("#655", "v23 s4"),
	clPieceIndicatorBg: F("#666", "v-12"),
	clPieceOperationButtonBg: F("#445", "h-20 s-8 v+5"),
	clPieceActiveButtonBg: F("#445", "h-20 s-8 v+5"),
	clKnobTickBg: F("#fff"),
	clIndicatorActive: F("#8e6", "a90"),
	clIndicatorActiveAlt: F("#fff", "a70"),
	clStepIndicator: F("#333", "a60")
}, rt = Object.fromEntries(Object.entries(nt).map(([e, t]) => [`--${He(e)}`, t])), it = ({ children: e }) => /* @__PURE__ */ I("div", {
	style: rt,
	className: "w-full h-full",
	children: e
}), L = {
	borderCommon: "border border-black/40",
	roundedFew: "rounded-[2px]",
	bgPanel: "bg-(--cl-panel-bg)",
	bgHeadPart: "bg-(--cl-head-part-bg)",
	bgBodyPart: "bg-(--cl-body-part-bg)",
	bgKnob: "bg-(--cl-knob-bg)",
	bgStepButton: "bg-(--cl-step-button-bg)",
	bgStepButtonAlt: "bg-(--cl-step-button-bg-alt)",
	bgPieceIndicator: "bg-(--cl-piece-indicator-bg)",
	bgPieceOperationButton: "bg-(--cl-piece-operation-button-bg)",
	bgPieceActiveButton: "bg-(--cl-piece-active-button-bg)",
	bgKnobTick: "bg-(--cl-knob-tick-bg)",
	bgIndicatorActive: "bg-(--cl-indicator-active)",
	bgIndicatorActiveAlt: "bg-(--cl-indicator-active-alt)",
	bgStepIndicator: "bg-(--cl-step-indicator)"
}, at = ({ active: e, onClick: t }) => /* @__PURE__ */ I("button", {
	className: N("w-8 h-8", "flex-c", "cursor-pointer"),
	onClick: t,
	children: /* @__PURE__ */ I("div", { className: N("w-6 h-6", L.borderCommon, e ? L.bgIndicatorActiveAlt : L.bgPieceActiveButton, L.roundedFew) })
}), ot = ({ value: e, onChange: t }) => {
	let n = Se(e, 0, 1, -135, 135);
	return /* @__PURE__ */ I(tt, {
		value: e,
		min: 0,
		max: 1,
		step: .01,
		onChange: t,
		children: /* @__PURE__ */ I("div", {
			className: N("w-8 h-8", "rounded-full", "relative", L.bgKnob, L.borderCommon),
			children: /* @__PURE__ */ I("div", {
				className: "w-full h-full flex justify-center",
				style: { transform: `rotate(${n}deg)` },
				children: /* @__PURE__ */ I("div", { className: N("w-[2px] h-[10px]", L.bgKnobTick) })
			})
		})
	});
}, st = ({ pieceName: e, onClick: t }) => /* @__PURE__ */ I("button", {
	className: N("w-[75px] h-8", "flex-ha", "overflow-hidden text-ellipsis whitespace-nowrap", "text-white font-bold text-sm"),
	onClick: t,
	children: e
}), ct = ({ label: e }) => /* @__PURE__ */ I("div", {
	className: N("absolute right-0 top-0 mr-[2px]", "text-white text-[8px]"),
	children: e
}), lt = ({ children: e, coverContent: t, onClick: n }) => /* @__PURE__ */ I("button", {
	className: N("w-8 h-8 flex-c text-white text-md", "cursor-pointer", "relative", L.bgPieceOperationButton, L.borderCommon, L.roundedFew),
	onClick: n,
	children: [e, t]
}), ut = ({ active: e }) => /* @__PURE__ */ I("div", { className: N("w-2.5 h-7", L.borderCommon, e ? L.bgIndicatorActive : L.bgPieceIndicator, L.roundedFew) }), dt = ({ isStepActive: e, isStepCurrent: t, altColor: n, onClick: r }) => {
	let i = 0;
	return e && t ? i = .7 : e ? i = .4 : t && (i = .1), /* @__PURE__ */ I("div", {
		className: N("w-5.5 h-8 relative flex-va cursor-pointer", "overflow-hidden", L.roundedFew, n ? L.bgStepButtonAlt : L.bgStepButton, L.borderCommon),
		onClick: r,
		children: [/* @__PURE__ */ I("div", { className: N("w-[11px] h-[3.5px] mt-[4px]", t ? L.bgIndicatorActive : L.bgStepIndicator, "border-[0.5px] border-black/20", "rounded-[1px]") }), /* @__PURE__ */ I("div", {
			className: N("absolute-full", "bg-white/50"),
			style: { opacity: i }
		})]
	});
}, ft = ({ headPart: e, bodyPart: t }) => /* @__PURE__ */ I("div", {
	className: N("flex-h"),
	children: [/* @__PURE__ */ I("div", {
		className: N("p-2.5", L.bgHeadPart),
		children: e
	}), /* @__PURE__ */ I("div", {
		className: N("p-2.5", L.bgBodyPart),
		children: t
	})]
}), pt = ({ children: e }) => /* @__PURE__ */ I("div", {
	className: N("flex-c", "w-[840px] h-[380px]", L.bgPanel),
	children: e
}), R = ({ children: e, text: t, onClick: n }) => /* @__PURE__ */ I("button", {
	className: N("w-18 h-8 flex-c text-white text-[14px]", "cursor-pointer", "relative", L.bgPieceOperationButton, L.borderCommon, L.roundedFew),
	onClick: n,
	children: [t, e]
});
//#endregion
//#region src/store/actions.ts
function mt(e, t) {
	return {
		patchPiece(n, r) {
			t.patchPiece(n, r), e.setPieces((e) => e.map((e) => e.id === n ? {
				...e,
				...r
			} : e));
		},
		start() {
			t.start(), e.setStepPosition(0);
		},
		processStep(n, r) {
			t.processStep(n % 16, r), e.setStepPosition(n % 16);
		},
		stop() {
			t.stop(), e.setStepPosition(-1);
		},
		previewPiece(e) {
			t.previewPiece(e);
		},
		resetPreset() {
			let n = ze.init.pieceItems;
			e.setPieces(n);
			for (let e of n) t.patchPiece(e.id, e);
		},
		applyPreset(n) {
			let r = ze[n].pieceItems;
			e.setPieces((e) => e.map((e, t) => {
				let { variationIndex: n, ...i } = r[t];
				return {
					...e,
					...i
				};
			}));
			for (let e of r) {
				let { variationIndex: n, ...r } = e;
				t.patchPiece(e.id, r);
			}
		},
		randomizePieces() {
			let n = e.state.pieces, r = n.map((e) => Math.floor(Math.random() * j[e.id].length));
			e.setPieces(n.map((e, t) => ({
				...e,
				variationIndex: r[t]
			})));
			for (let e = 0; e < n.length; e++) {
				let i = n[e];
				t.patchPiece(i.id, { variationIndex: r[e] });
			}
		},
		setMasterVolume(n) {
			t.setMasterVolume(n), e.setMasterVolume(n);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/dist/hooks.module.js
var z, B, ht, gt, _t = 0, vt = [], V = n, yt = V.__b, bt = V.__r, xt = V.diffed, St = V.__c, Ct = V.unmount, wt = V.__;
function Tt(e, t) {
	V.__h && V.__h(B, e, _t || t), _t = 0;
	var n = B.__H || (B.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Et(e) {
	return _t = 1, Dt(Rt, e);
}
function Dt(e, t, n) {
	var r = Tt(z++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Rt(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = B, !B.__f)) {
		var i = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var i = !1, o = r.__c.props !== e;
			if (r.__c.__H.__.some(function(e) {
				if (e.__N) {
					i = !0;
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
				}
			}), a) {
				var s = a.call(this, e, t, n);
				return i ? s || o : s;
			}
			return !i || o;
		};
		B.__f = !0;
		var a = B.shouldComponentUpdate, o = B.componentWillUpdate;
		B.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, B.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Ot(e, t) {
	var n = Tt(z++, 3);
	!V.__s && Lt(n.__H, t) && (n.__ = e, n.u = t, B.__H.__h.push(n));
}
function kt(e) {
	return _t = 5, At(function() {
		return { current: e };
	}, []);
}
function At(e, t) {
	var n = Tt(z++, 7);
	return Lt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function jt(e) {
	var t = B.context[e.__c], n = Tt(z++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(B)), t.props.value) : e.__;
}
function Mt() {
	for (var e; e = vt.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Ft), t.__h.some(It), t.__h = [];
		} catch (n) {
			t.__h = [], V.__e(n, e.__v);
		}
	}
}
V.__b = function(e) {
	B = null, yt && yt(e);
}, V.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), wt && wt(e, t);
}, V.__r = function(e) {
	bt && bt(e), z = 0;
	var t = (B = e.__c).__H;
	t && (ht === B ? (t.__h = [], B.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Ft), t.__h.some(It), t.__h = [], z = 0)), ht = B;
}, V.diffed = function(e) {
	xt && xt(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (vt.push(t) !== 1 && gt === V.requestAnimationFrame || ((gt = V.requestAnimationFrame) || Pt)(Mt)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), ht = B = null;
}, V.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Ft), e.__h = e.__h.filter(function(e) {
				return !e.__ || It(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], V.__e(n, e.__v);
		}
	}), St && St(e, t);
}, V.unmount = function(e) {
	Ct && Ct(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Ft(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && V.__e(t, n.__v));
};
var Nt = typeof requestAnimationFrame == "function";
function Pt(e) {
	var t, n = function() {
		clearTimeout(r), Nt && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Nt && (t = requestAnimationFrame(n));
}
function Ft(e) {
	var t = B, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), B = t;
}
function It(e) {
	var t = B;
	e.__c = e.__(), B = t;
}
function Lt(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Rt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region src/store/app-context.tsx
var zt = ge({}), Bt = ({ children: e, store: t, actions: n }) => /* @__PURE__ */ I(zt.Provider, {
	value: {
		store: t,
		actions: n
	},
	children: e
});
function Vt() {
	return jt(zt);
}
//#endregion
//#region src/store/automation-input.ts
function Ht(e, t) {
	function n(e) {
		let [t, n] = e.split("_");
		return [t, n];
	}
	return {
		getParameterSpecs() {
			return [
				{ id: "masterVolume" },
				{ id: "kick_pitch" },
				{ id: "kick_volume" },
				{ id: "snare_pitch" },
				{ id: "snare_volume" },
				{ id: "opHat_pitch" },
				{ id: "opHat_volume" },
				{ id: "clHat_pitch" },
				{ id: "clHat_volume" },
				{ id: "clap_pitch" },
				{ id: "clap_volume" }
			];
		},
		getParameter(t) {
			if (t === "masterVolume") return e.state.masterVolume;
			let [r, i] = n(t);
			return e.state.pieces.find((e) => e.id === r)?.[i] ?? 0;
		},
		setParameter(r, i) {
			r === "masterVolume" && e.setMasterVolume(i);
			let [a, o] = n(r);
			t.patchPiece(a, { [o]: i });
		}
	};
}
//#endregion
//#region src/store/persistence.ts
function Ut(e) {
	return e * 255 >>> 0;
}
function Wt(e) {
	return e / 255;
}
function Gt(e, t) {
	return {
		emitStateBytes() {
			let { pieces: t, masterVolume: n } = e.state;
			return new Uint8Array([Ut(n), ...t.flatMap((e) => [
				M.indexOf(e.id),
				e.variationIndex,
				+!!e.active,
				Ut(e.volume),
				Ut(e.pitch),
				e.patternBits >> 8 & 255,
				e.patternBits & 255
			])]);
		},
		applyStateBytes(n) {
			let r = M.length;
			if (n.length !== 7 * r + 1) return;
			let i = Wt(n[0]), a = be(r).map((e) => {
				let t = 1 + e * 7;
				return {
					id: M[n[t + 0]],
					variationIndex: n[t + 1],
					active: n[t + 2] !== 0,
					volume: Wt(n[t + 3]),
					pitch: Wt(n[t + 4]),
					patternBits: n[t + 5] << 8 | n[t + 6]
				};
			});
			if (a.every((e, t) => e.id === M[t])) {
				e.setPieces(a), e.setMasterVolume(i), t.setMasterVolume(i);
				for (let e of a) t.patchPiece(e.id, e);
			}
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-CzL-_B7V.js
var Kt = Symbol("V"), qt = Symbol("IMMUT_BASE"), Jt = Symbol("IS_RAW"), Yt = Symbol("P"), H = "Array", Xt = [
	Symbol.iterator,
	Symbol.toStringTag,
	Jt
], Zt = {
	Map: "Map",
	Set: "Set",
	Array: H
}, Qt = "[object Object]", $t = "[object Map]", en = "[object Set]", tn = "[object Array]", nn = "[object Function]", rn = {
	[$t]: "Map",
	[en]: "Set",
	[tn]: H,
	[Qt]: "Object"
}, an = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], on = [
	"set",
	"clear",
	"delete"
], sn = [
	"add",
	"clear",
	"delete"
], cn = [
	"splice",
	"sort",
	"unshift",
	"shift"
], ln = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), un = {
	Map: [
		"clear",
		"delete",
		"entries",
		"forEach",
		"get",
		"has",
		"keys",
		"set",
		"values"
	],
	Set: [
		"add",
		"clear",
		"delete",
		"entries",
		"forEach",
		"has",
		"keys",
		"values"
	],
	[H]: ln
}, dn = {
	Map: [
		"clear",
		"set",
		"delete"
	],
	Set: [
		"clear",
		"add",
		"delete"
	],
	[H]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, fn = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[H]: ["forEach", "map"]
};
function pn(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var mn = {
	value: 0,
	prefixSeed: 1
}, hn = {
	value: 0,
	prefixSeed: 1
}, gn = {
	value: 0,
	prefixSeed: 1
}, _n = {
	value: 0,
	prefixSeed: 1
}, vn = {}, yn = {};
function bn() {
	return pn(hn, "MID_");
}
function xn() {
	return pn(mn, "MV_");
}
function Sn() {
	return pn(gn, "SI_");
}
function Cn() {
	return pn(_n, "SR_");
}
var wn = {
	autoFreeze: !1,
	autoRevoke: !0
}, Tn = Object.prototype.toString, En = !!Reflect, Dn = Object.prototype.hasOwnProperty;
function On(e, t) {
	return En ? Reflect.has(e, t) : Dn.call(e, t);
}
function kn(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		G(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), jn(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), An(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function U(e) {
	return Tn.call(e);
}
function W(...e) {
	return e;
}
function An(e) {
	return U(e) === Qt;
}
function jn(e) {
	return U(e) === $t;
}
function Mn(e) {
	return U(e) === en;
}
function Nn(e) {
	return U(e) === nn;
}
function Pn(e) {
	return rn[U(e)];
}
function G(e) {
	let t = U(e);
	return ![
		Qt,
		tn,
		$t,
		en,
		nn
	].includes(t);
}
function Fn(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function In(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Ln(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Rn(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function zn(e) {
	return e && e[Kt] || "";
}
function Bn(e, t) {
	let n = zn(e);
	return n ? n !== t : !1;
}
function Vn(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && An(e) && (n = Object.assign({}, e)), jn(e) && (n = new Map(e)), Mn(e) && (n = new Set(e)), n;
}
function Hn(e, t) {
	return t.immutBase ? e : Vn(e, t.readOnly);
}
function Un(e) {
	let t = e;
	if (!Rn(e)) return e;
	let n = vn[t];
	return n || (n = Sn(), vn[t] = n), n;
}
function Wn(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function K(e, t) {
	let n = e;
	return t && (n = q(e, !0)), n.join("|");
}
function q(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = Un(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Un(i);
	return n[r] = a, n;
}
function Gn(e) {
	return e.map((e) => yn[e] || e);
}
function Kn(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || q(t);
	Wn(i, a) < 0 && (r.push(t), i.push(a));
}
function qn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Wn(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function Jn(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function J(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = jn(r) ? Jn(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function Yn(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = J(e, i);
		if (o) {
			n = s, r = !0;
			break;
		}
	}
	return {
		isGetted: r,
		val: n
	};
}
function Xn(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = jn(r) ? Jn(r, a) : r[a];
	}
}
function Zn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		Xn(e, r, n);
	}
}
function Qn(e, t) {
	let n = K(e), r = "";
	for (let e of t) {
		let t = `${K(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = Gn(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var $n = /* @__PURE__ */ new Map(), Y = /* @__PURE__ */ new Map(), er = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new Map();
function nr(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function rr(e, t, n) {
	let r = [t], i = X(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function ir(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Pn(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Un(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = or(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = rr(y, e, s), f = q(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = K(i.arrKeyPath, !0), n = hr(u, e);
			t = Qn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = hr(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = J(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = J(e, t);
				if (!a) {
					let { val: n } = J(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(q(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(q(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: bn(),
		sourceId: u,
		rootMeta: null,
		parentMeta: i,
		parent: y,
		selfType: l,
		self: t,
		copy: null,
		key: e,
		keyStr: _,
		keyPath: d,
		keyStrPath: f,
		keyStrPathStr: b,
		keyPaths: g,
		keyStrPaths: h,
		arrKeyPath: p,
		arrKeyPaths: m,
		level: v,
		proxyVal: null,
		proxyItems: null,
		modified: !1,
		scopes: [],
		isImmutBase: a,
		isDel: !1,
		isArrOrderChanged: !1,
		newNodeStats: {},
		newNodeMap: /* @__PURE__ */ new Map(),
		newNodes: [],
		ver: r,
		compareVer: o,
		revoke: W,
		hasOnOperate: c,
		execOnOperate: W
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function ar(e) {
	if (!e) return !1;
	let t = lr(e);
	return t ? !t.isImmutBase : !1;
}
function or(e, t) {
	let n = Z(e, t);
	return n ? n.level + 1 : 1;
}
function X(e, t) {
	return t.metaMap.get(e);
}
function Z(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Q(e) || null : null;
}
function sr(e) {
	return e && Q(e) || null;
}
function cr(e) {
	return e && e[Kt] || "";
}
function lr(e) {
	return Q(e) || null;
}
function Q(e) {
	return e[Yt];
}
function ur(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function dr(e) {
	return er.get(e) || Cn();
}
function fr(e, t) {
	return er.set(e, t);
}
function pr(e) {
	return $n.get(e);
}
function mr(e, t, n) {
	let r = $n.get(e);
	r || (r = {}, $n.set(e, r)), r[t] = n;
}
function hr(e, t) {
	let n = pr(e);
	return n && n[t] || [];
}
function gr(e) {
	return Y.get(e) || [];
}
function _r(e, t, n) {
	let r = $n.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (Y.get(e) || []).filter((e, n) => !t.includes(n));
	Y.set(e, i);
}
function vr(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => mr(n, e, r));
	let i = Y.get(n) || [], a = r.map((e) => K(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = K(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => K(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), Y.set(n, i);
}
function yr(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = q(i), s = q(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Kn(n, a, s), vr(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function br(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function xr(e, t) {
	return !An(e) || cr(e) === t;
}
function Sr(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		kn(n, i, a, (e, n, r) => {
			let i = Z(e, t);
			if (i) {
				let { modified: e, copy: t, self: a } = i;
				n[r] = e ? t : a;
			}
		}), s.target = i[a], r.set(n, s.target);
	}), e.scopes.forEach((e) => {
		let { modified: t, copy: r, parentMeta: i, key: a, self: o, revoke: s, proxyVal: c, isDel: l } = e, u = () => {
			n.delete(o), n.delete(c), s();
		};
		if (!r || !i) return u();
		let d = t ? r : o, f = i.copy, p = i.selfType;
		if (p === "Map") return f.set(a, d), u();
		if (p === "Set") return f.delete(c), f.add(d), u();
		if (p === "Array") return br(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function Cr(e, t) {
	let n = gr(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = J(e.proxyVal, t), i = sr(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(K(e)));
		else if (n) for (let e of o) Xn(t, e, n.copy);
		else if (s) for (let e of o) Xn(t, e, s.self);
	}
	i.length && _r(e.sourceId, i, a);
}
function wr(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), Cr(e, a), Sr(e, t), a;
}
function Tr(e) {
	e.rootMeta.scopes.push(e);
}
function Er(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = ir(e, t, n), c = Hn(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => Yt === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = W;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : W;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function Dr(e, t) {
	return e === "Array" || (fn[e] || []).includes(t);
}
function Or(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (G(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Nn(e)) {
			if (r.newNodeStats[c] || e[Jt]) return e;
			let n = X(e, o);
			return n || (n = Er(c, e, t), Tr(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!Dr(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Ar(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Ar(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function kr(e, t) {
	if (!An(e)) return e;
	let n = X(e, t);
	return n ? n.copy : e;
}
function Ar(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return nr(t), a(...e);
	}, e.clear = function(...e) {
		return nr(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return nr(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (nr(t), t.hasOnOperate) {
				let n = e[1];
				t.rootMeta.execOnOperate("set", e[0], {
					mayProxyVal: n,
					value: n,
					parentMeta: t
				});
			}
			return n(...e);
		}, e.get = function(...e) {
			let n = r(...e);
			if (t.hasOnOperate) {
				let r = Z(n, i), a = r ? r.copy || r.self : n;
				t.rootMeta.execOnOperate("get", e[0], {
					mayProxyVal: n,
					value: a,
					parentMeta: t,
					isChanged: !1
				});
			}
			return n;
		};
	}
}
function jr(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && sn.includes(r) || i === "Array" && an.includes(r) || i === "Map" && on.includes(r))) && nr(n);
}
function Mr(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Nr(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = kr(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	jr({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = un[o] || [];
	if (Nn(i) && m.includes(n)) return n === "slice" ? f.slice : (cn.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = Z(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = Z(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = Z(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : qn(e);
		} else g();
		let t = p[r];
		G(t) || c.newNodeMap.delete(Mr(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !G(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(Mr(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Pr(e) {
	if (G(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Pr), Object.freeze(e);
	if (Mn(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = W;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (jn(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = W;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Pr(n);
	}), Object.freeze(e);
}
function Fr(e) {
	if (!e) return e;
	let t = sr(e);
	return t ? t.self : e;
}
var Ir = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], Lr = {};
Ir.forEach((e) => Lr[e] = 1);
var Rr = {
	[H]: 1,
	Set: 1,
	Map: 1
}, $ = /* @__PURE__ */ new Map();
function zr(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[qt] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? wn.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = xn(), p.metaVer = d, tr.set(d, p));
	let m = t.autoRevoke ?? wn.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (un[f] || []).includes(t) ? (S = !0, l = (dn[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
		let C = !1;
		return n({
			immutBase: a,
			parent: h,
			parentType: f,
			parentProxy: _,
			op: e,
			replaceValue: (e) => {
				C = !0, d = e;
			},
			getReplaced: () => ({
				isReplaced: C,
				replacedValue: d
			}),
			isBuiltInFnKey: S,
			isChanged: l,
			isCustom: c,
			key: t,
			keyPath: p,
			keyPaths: y,
			keyStrPaths: b,
			fullKeyPath: p.concat(t),
			arrKeyPath: v,
			arrKeyPaths: x,
			value: s,
			proxyValue: i
		}), {
			replacedValue: d,
			isChanged: l
		};
	}, b = (() => {
		let e = !0, s = {
			get: (e, t) => {
				if (Kt === t) return d;
				let n = e[t];
				if (Xt.includes(t)) {
					if (Nn(n)) {
						if (Symbol.iterator === t && Array.isArray(e)) {
							let t = 0, n = () => ({
								next: () => {
									let n = e.length;
									if (n === 0) return {
										done: !0,
										value: void 0
									};
									let r = t === n, i = r ? void 0 : s.get(e, String(t));
									return t++, {
										done: r,
										value: i
									};
								},
								[Symbol.iterator]: () => n
							});
							return n;
						}
						return n.bind(e);
					}
					return n;
				}
				if (t === "__proto__" || t === "toJSON" && !On(e, t)) return n;
				let l = n, u = X(e, p), f = yr(t, u, Z(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return Rr[h] && Lr[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Or(n, {
					key: t,
					compareVer: c,
					parentMeta: u,
					parentType: h,
					ver: d,
					traps: s,
					parent: e,
					immutBase: a,
					readOnly: o,
					apiCtx: p,
					hasOnOperate: r,
					autoRevoke: m
				}), h === "Array" && Ln(t) || Zt[h] && (l = Nr(e, {
					op: t,
					key: t,
					value: n,
					metaVer: d,
					calledBy: "get",
					parentType: h,
					parentMeta: u,
					apiCtx: p
				})), y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}).replacedValue);
			},
			set: (t, r, i) => {
				if (f) return g("set", r);
				let a = !0, s = X(t, p), c = !1, l = i;
				if (ar(i)) if (c = !0, xr(i, d)) {
					if (kr(i, p) === t[r]) return !0;
					let e = X(i, p);
					yr(r, s, e), Kn(e, s.keyPath.concat(r));
				} else e = !1;
				else if (Bn(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Q(i);
					if (o.sourceId !== n) l = Fr(i);
					else {
						let { isGetted: n, val: i } = Yn(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Q(i);
						ur(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = J(e, t);
							n && ur(o, Q(i), r);
						}), Kn(c, u), Zn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Ln(r)) return l = y("set", r, {
						parentMeta: s,
						value: l
					}).replacedValue, s.copy[r] = l, !0;
					s.__callSet = !0;
				}
				let u = !1;
				if (!n) u = (s.modified ? s.copy : s.self)[r] !== l;
				else {
					let e = y("set", r, {
						parentMeta: s,
						value: l
					});
					l = e.replacedValue, u = e.isChanged;
				}
				return u && Nr(t, {
					parentMeta: s,
					key: r,
					value: l,
					metaVer: d,
					calledBy: "set",
					apiCtx: p,
					isValueDraft: c,
					mayNewNode: a
				}), !0;
			},
			deleteProperty: (e, t) => {
				if (f) return g("del", t);
				let n = X(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), Nr(e, {
					parentMeta: n,
					op: "del",
					key: t,
					value: "",
					metaVer: d,
					calledBy: "deleteProperty",
					apiCtx: p
				}), !0);
			},
			apply: function(e, t, n) {
				return e.apply(t, n);
			}
		};
		return {
			createDraft: (e) => {
				if (G(e)) throw Error("base state can not be primitive");
				if (u) return $.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || dr(e), l = X(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = Er("", n, {
					ver: d,
					traps: s,
					immutBase: a,
					readOnly: o,
					compareVer: c,
					apiCtx: p,
					hasOnOperate: r,
					autoRevoke: m,
					sourceId: i
				});
				return Tr(f), f.execOnOperate = y, $.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return $.delete(t), t;
				let r = X(t, p);
				if (r.isImmutBase && !n) return t;
				let i = wr(r, p);
				return l && e && (i = Pr(i)), tr.delete(d), $.delete(t), fr(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Br(e) {
	if (!Nn(e)) throw Error("produce callback is not a function");
}
var Vr = "Not a Limu root draft";
function Hr(e) {
	let t = $.get(e);
	if (!t) throw cr(e) && lr(e)?.level === 0 ? Error("Draft has been finished!") : Error(Vr);
	return t;
}
function Ur(e, t) {
	return zr(t).createDraft(e);
}
function Wr(e) {
	return Hr(e)(e);
}
function Gr(e, t) {
	if (Fn(e) || In(t)) throw Error("produce callback can not be a promise function or result");
}
function Kr(e, t, n) {
	Br(t);
	let r = Ur(e, n);
	return Gr(t, t(r)), Wr(r);
}
function qr(e, t, n) {
	if (!t || !Nn(t)) {
		let n = e, r = t;
		return Br(e), (e) => Kr(e, n, r);
	}
	return Kr(e, t, n);
}
var Jr = qr;
function Yr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function Xr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function Zr(e, t) {
	let { useEffect: n, useRef: r, useState: i } = t, a = {}, o = e, s = {}, c = s, l = [], u, d = !1;
	function f(e) {
		for (let t of l) t(e);
	}
	for (let t in e) {
		let e = t, n = (t) => {
			let n;
			if (n = typeof t == "function" ? t(o[e]) : t, n !== o[e]) {
				o[e] = n, d ? (u ??= {}, u[e] = n) : f({ [e]: n });
				for (let t in a) {
					let n = a[t];
					if (n.dependentFieldKeys.has(e)) {
						var r;
						(r = n.refreshView) == null || r.call(n);
					}
				}
			}
		}, r = Yr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Jr(t, e));
		}, c[`patch${r}`] = (e) => {
			n((t) => {
				let n = typeof e == "function" ? e(t) : e;
				return {
					...t,
					...n
				};
			});
		}, c[`toggle${r}`] = () => {
			n((e) => !e);
		};
	}
	let p = (e) => {
		for (let t in e) {
			let n = Yr(t), r = e[t], i = c[`set${n}`];
			i?.(r);
		}
	}, m = (t) => {
		let n = {}, r = /* @__PURE__ */ new Set();
		for (let t in e) Object.defineProperty(n, t, { get() {
			return r.has(t) || r.add(t), o[t];
		} });
		let i = {
			dependentFieldKeys: r,
			refreshView: void 0,
			getterObject: n,
			activate() {
				a[t] = i;
			},
			deactivate() {
				a[t] === i && delete a[t];
			}
		};
		return i;
	}, h = () => {
		let [, e] = i(0), t = r(null);
		return t.current ||= m(Math.random().toString(36).substring(2, 15)), n(() => (t.current && (t.current.refreshView = () => e((e) => e + 1), t.current.activate()), () => {
			var e;
			(e = t.current) == null || e.deactivate();
		}), []), t.current.getterObject;
	}, g = (e) => (l.push(e), () => {
		Xr(l, e);
	}), _ = (e) => {
		d = !0;
		try {
			e();
		} finally {
			d = !1, u !== void 0 && (f(u), u = void 0);
		}
	};
	return {
		state: o,
		assign: p,
		useSnapshot: h,
		subscribe: g,
		mutations: s,
		...s,
		batch: _
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/preact/index.js
function Qr(e) {
	return Zr(e, {
		useEffect: Ot,
		useRef: kt,
		useState: Et
	});
}
//#endregion
//#region src/store/store.ts
function $r(e) {
	return Qr({
		pieces: e,
		stepPosition: -1,
		masterVolume: .5
	});
}
//#endregion
//#region src/ui/debug-ui.tsx
var ei = () => {
	let { actions: e } = Vt(), [t, n] = Et(!1);
	return Ot(() => {
		if (t) {
			Oe.gAudioContext?.resume(), e.start();
			let t = 0, n = setInterval(() => {
				e.processStep(t, 0), t += 1;
			}, 110);
			return () => {
				clearInterval(n), e.stop();
			};
		}
	}, [t]), /* @__PURE__ */ I("button", {
		className: N("p-2 cursor-pointer", t ? "bg-green-500" : "bg-gray-400"),
		onClick: () => n(!t),
		children: "play"
	});
}, ti = () => {
	let { store: e } = Vt(), { pieces: t } = e.useSnapshot();
	return /* @__PURE__ */ I("div", { children: t.map((e) => /* @__PURE__ */ I("div", { children: [
		e.id,
		": ",
		j[e.id][e.variationIndex]
	] })) });
}, ni = () => /* @__PURE__ */ I("div", {
	className: "w-full flex-c",
	children: /* @__PURE__ */ I("div", {
		className: "flex-ha gap-8",
		children: [/* @__PURE__ */ I(ei, {}), /* @__PURE__ */ I(ti, {})]
	})
}), ri = ge && ge({
	color: void 0,
	size: void 0,
	class: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
}), ii = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ai = /[A-Z0-9]/g;
function oi(e) {
	let t = {};
	for (let n in e) n.indexOf("-") === -1 && ii.test(n) ? t[n.replace(ai, "-$&").toLowerCase()] = e[n] : t[n] = e[n];
	return t;
}
function si(e) {
	return e && e.map((e, t) => S(e.tag, {
		key: t,
		...oi(e.attr)
	}, si(e.child || [])));
}
function ci(e) {
	return (t) => /* @__PURE__ */ I(li, {
		attr: { ...e.attr },
		...t,
		children: si(e.child || [])
	});
}
function li(e) {
	let t = (t) => {
		let { attr: n, size: r, title: i, class: a, className: o, ...s } = e, c = a || o || "", l = r || t.size || "1em";
		t.class && (c = `${c} ${t.class}`), t.className && (c = `${c} ${t.className}`);
		let u = {
			stroke: t.stroke || "currentColor",
			fill: t.fill || "currentColor",
			strokeWidth: t.strokeWidth || 0,
			class: c,
			...t.attr,
			...n,
			...s,
			height: l,
			width: l
		};
		return u = oi(u), /* @__PURE__ */ I("svg", {
			...u,
			style: oi({
				color: e.color || t.color,
				...t.style,
				...e.style
			}),
			xmlns: "http://www.w3.org/2000/svg",
			children: [i && /* @__PURE__ */ I("title", { children: i }), e.children]
		});
	};
	return ri === void 0 ? t(ri) : /* @__PURE__ */ I(ri.Consumer, { children: (e) => t(e) });
}
ge && ge({
	color: void 0,
	size: void 0,
	class: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
});
//#endregion
//#region ../../../node_modules/.pnpm/@jsr+preact-icons__fa@1.0.13/node_modules/@jsr/preact-icons__fa/mod.js
function ui(e) {
	return ci({
		tag: "svg",
		attr: { viewBox: "0 0 256 512" },
		child: [{
			tag: "path",
			attr: { d: "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" }
		}]
	})(e);
}
function di(e) {
	return ci({
		tag: "svg",
		attr: { viewBox: "0 0 256 512" },
		child: [{
			tag: "path",
			attr: { d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" }
		}]
	})(e);
}
function fi(e) {
	return ci({
		tag: "svg",
		attr: { viewBox: "0 0 512 512" },
		child: [{
			tag: "path",
			attr: { d: "M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z" }
		}]
	})(e);
}
function pi(e) {
	return ci({
		tag: "svg",
		attr: { viewBox: "0 0 448 512" },
		child: [{
			tag: "path",
			attr: { d: "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" }
		}]
	})(e);
}
//#endregion
//#region src/base/icons.ts
var mi = {
	Play: pi,
	ChevronLeft: ui,
	ChevronRight: di,
	Swap: fi
}, hi = ({ piece: e, stepIndicatorContent: t }) => {
	let { actions: n } = Vt(), r = Fe[e.id], i = {
		setVolume(t) {
			n.patchPiece(e.id, { volume: t });
		},
		setPitch(t) {
			n.patchPiece(e.id, { pitch: t });
		},
		toggleActive() {
			n.patchPiece(e.id, { active: !e.active });
		},
		shiftVariationIndex() {
			let t = j[e.id].length, r = (e.variationIndex + 1 + t) % t;
			n.patchPiece(e.id, { variationIndex: r });
		},
		previewPiece() {
			n.previewPiece(e.id);
		}
	};
	return /* @__PURE__ */ I("div", {
		className: "flex-ha gap-3 px-1",
		children: [
			/* @__PURE__ */ I(at, {
				active: e.active,
				onClick: i.toggleActive
			}),
			/* @__PURE__ */ I("div", {
				className: "flex-ha gap-3",
				children: [/* @__PURE__ */ I(ot, {
					value: e.pitch,
					onChange: i.setPitch
				}), /* @__PURE__ */ I(ot, {
					value: e.volume,
					onChange: i.setVolume
				})]
			}),
			/* @__PURE__ */ I(st, {
				pieceName: r,
				onClick: i.previewPiece
			}),
			/* @__PURE__ */ I(lt, {
				coverContent: /* @__PURE__ */ I(ct, { label: (e.variationIndex + 1).toString() }),
				onClick: i.shiftVariationIndex,
				children: /* @__PURE__ */ I(mi.Swap, {})
			}),
			t
		]
	});
}, gi = ({ piece: e, stepPosition: t }) => /* @__PURE__ */ I(ut, { active: e.active && Ce(e.patternBits, t) }), _i = ({ piece: e, stepPosition: t }) => {
	let { actions: n } = Vt(), r = (t) => {
		n.patchPiece(e.id, { patternBits: we(e.patternBits, t) });
	};
	return /* @__PURE__ */ I("div", {
		className: "flex-ha gap-3 px-2",
		children: be(4).map((n) => /* @__PURE__ */ I("div", {
			className: "flex-ha gap-[5px]",
			children: be(4).map((i) => {
				let a = n % 2 == 1, o = n * 4 + i;
				return /* @__PURE__ */ I(dt, {
					altColor: a,
					isStepActive: Ce(e.patternBits, o),
					isStepCurrent: e.active && e.patternBits > 0 && o === t,
					onClick: () => r(o)
				}, i);
			})
		}, n))
	});
}, vi = ({ piece: e, stepPosition: t }) => /* @__PURE__ */ I(ft, {
	headPart: /* @__PURE__ */ I(hi, {
		piece: e,
		stepIndicatorContent: /* @__PURE__ */ I(gi, {
			piece: e,
			stepPosition: t
		})
	}),
	bodyPart: /* @__PURE__ */ I(_i, {
		piece: e,
		stepPosition: t
	})
}), yi = () => {
	let { store: e, actions: t } = Vt(), { pieces: n, stepPosition: r, masterVolume: i } = e.useSnapshot();
	return /* @__PURE__ */ I("div", {
		className: "w-full h-full flex-c bg-(--cl-panel-bg)",
		children: /* @__PURE__ */ I(pt, { children: /* @__PURE__ */ I("div", {
			className: "flex-v gap-2",
			children: [/* @__PURE__ */ I("div", {
				className: "flex-ha justify-between",
				children: [/* @__PURE__ */ I("h3", {
					className: "text-xl font-medium text-white",
					children: "Graphite Drum Sequencer"
				}), /* @__PURE__ */ I("div", {
					className: "flex-ha gap-3",
					children: [/* @__PURE__ */ I("div", {
						className: "flex-ha gap-2",
						children: [
							/* @__PURE__ */ I(R, {
								text: "reset",
								onClick: () => t.resetPreset()
							}),
							/* @__PURE__ */ I(R, {
								text: "pattern1",
								onClick: () => t.applyPreset("preset1")
							}),
							/* @__PURE__ */ I(R, {
								text: "pattern2",
								onClick: () => t.applyPreset("preset2")
							}),
							/* @__PURE__ */ I(R, {
								text: "pattern3",
								onClick: () => t.applyPreset("preset3")
							}),
							/* @__PURE__ */ I(R, {
								text: "rnd tone",
								onClick: () => t.randomizePieces()
							})
						]
					}), /* @__PURE__ */ I(ot, {
						value: i,
						onChange: t.setMasterVolume
					})]
				})]
			}), /* @__PURE__ */ I("div", {
				className: "flex-v gap-2",
				children: n.map((e) => /* @__PURE__ */ I(vi, {
					piece: e,
					stepPosition: r
				}, e.id))
			})]
		}) })
	});
};
//#endregion
//#region src/ui/app.tsx
function bi(e) {
	let t = Ne(e, Be.pieceItems), n = $r(Be.pieceItems), r = mt(n, t);
	t.preloadFirst(), t.setMasterVolume(n.state.masterVolume);
	let i = Gt(n, t), a = Ht(n, r);
	return e?.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "drumMachine",
			viewSize: [840, 380]
		},
		clockHandlers: {
			start: r.start,
			processStep: r.processStep,
			stop: r.stop
		},
		persistence: i,
		automationInput: a
	}), { Render: () => /* @__PURE__ */ I(Bt, {
		store: n,
		actions: r,
		children: /* @__PURE__ */ I(it, { children: [/* @__PURE__ */ I(yi, {}), Pe.isDevelopment && /* @__PURE__ */ I(ni, {})] })
	}) };
}
//#endregion
//#region src/wc-entry/page.css?inline
var xi = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-green-500:oklch(72.3% .219 149.579);--color-gray-400:oklch(70.7% .022 261.325);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-medium:500;--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.top-0{top:0}.right-0{right:0}.mt-\\[4px\\]{margin-top:4px}.mr-\\[2px\\]{margin-right:2px}.flex{display:flex}.h-6{height:calc(var(--spacing) * 6)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-20{height:calc(var(--spacing) * 20)}.h-\\[3\\.5px\\]{height:3.5px}.h-\\[10px\\]{height:10px}.h-\\[380px\\]{height:380px}.h-dvh{height:100dvh}.h-full{height:100%}.w-2\\.5{width:calc(var(--spacing) * 2.5)}.w-5\\.5{width:calc(var(--spacing) * 5.5)}.w-6{width:calc(var(--spacing) * 6)}.w-8{width:calc(var(--spacing) * 8)}.w-18{width:calc(var(--spacing) * 18)}.w-\\[2px\\]{width:2px}.w-\\[11px\\]{width:11px}.w-\\[75px\\]{width:75px}.w-\\[840px\\]{width:840px}.w-dvw{width:100dvw}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer{cursor:pointer}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-8{gap:calc(var(--spacing) * 8)}.gap-\\[5px\\]{gap:5px}.overflow-hidden{overflow:hidden}.rounded-\\[1px\\]{border-radius:1px}.rounded-\\[2px\\]{border-radius:2px}.rounded-full{border-radius:2147483647px}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[0\\.5px\\]{border-style:var(--tw-border-style);border-width:.5px}.border-black\\/20{border-color:#0003}@supports (color:color-mix(in lab, red, red)){.border-black\\/20{border-color:color-mix(in oklab, var(--color-black) 20%, transparent)}}.border-black\\/40{border-color:#0006}@supports (color:color-mix(in lab, red, red)){.border-black\\/40{border-color:color-mix(in oklab, var(--color-black) 40%, transparent)}}.bg-\\(--cl-body-part-bg\\){background-color:var(--cl-body-part-bg)}.bg-\\(--cl-head-part-bg\\){background-color:var(--cl-head-part-bg)}.bg-\\(--cl-indicator-active\\){background-color:var(--cl-indicator-active)}.bg-\\(--cl-indicator-active-alt\\){background-color:var(--cl-indicator-active-alt)}.bg-\\(--cl-knob-bg\\){background-color:var(--cl-knob-bg)}.bg-\\(--cl-knob-tick-bg\\){background-color:var(--cl-knob-tick-bg)}.bg-\\(--cl-panel-bg\\){background-color:var(--cl-panel-bg)}.bg-\\(--cl-piece-active-button-bg\\){background-color:var(--cl-piece-active-button-bg)}.bg-\\(--cl-piece-indicator-bg\\){background-color:var(--cl-piece-indicator-bg)}.bg-\\(--cl-piece-operation-button-bg\\){background-color:var(--cl-piece-operation-button-bg)}.bg-\\(--cl-step-button-bg\\){background-color:var(--cl-step-button-bg)}.bg-\\(--cl-step-button-bg-alt\\){background-color:var(--cl-step-button-bg-alt)}.bg-\\(--cl-step-indicator\\){background-color:var(--cl-step-indicator)}.bg-gray-400{background-color:var(--color-gray-400)}.bg-green-500{background-color:var(--color-green-500)}.bg-white\\/50{background-color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.bg-white\\/50{background-color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.p-2{padding:calc(var(--spacing) * 2)}.p-2\\.5{padding:calc(var(--spacing) * 2.5)}.px-1{padding-inline:var(--spacing)}.px-2{padding-inline:calc(var(--spacing) * 2)}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-\\[8px\\]{font-size:8px}.text-\\[14px\\]{font-size:14px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.text-white{color:var(--color-white)}}:host,:host *,:host :before,:host :after{--tw-border-style:solid}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", Si = "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap", Ci = ye?.("wafer-v01", import.meta.url), wi = bi(Ci), Ti = ve((e) => (he(/* @__PURE__ */ I(wi.Render, {}), e), () => {
	he(null, e);
}), {
	cssTexts: [xi, e],
	stylesheetUrls: [Si]
});
//#endregion
export { Ti as default };
