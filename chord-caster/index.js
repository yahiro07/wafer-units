//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/utility-classes.css?inline
var e, t, n, r, i, a, o, s, c, l, u, d, f, p, m = {}, h = [], g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, _ = Array.isArray;
function v(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function y(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function b(t, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? e.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
	return x(t, s, i, a, null);
}
function x(e, r, i, a, o) {
	var s = {
		type: e,
		props: r,
		key: i,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: o ?? ++n,
		__i: -1,
		__u: 0
	};
	return o == null && t.vnode != null && t.vnode(s), s;
}
function S(e) {
	return e.children;
}
function C(e, t) {
	this.props = e, this.context = t;
}
function w(e, t) {
	if (t == null) return e.__ ? w(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? w(e) : null;
}
function ee(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = v({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), re(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, ae(i, o, a), n.__e = n.__ = null, o.__e != r && T(o);
	}
}
function T(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), T(e);
}
function E(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !D.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(D);
}
function D() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, ee(e);
	} finally {
		r.length = D.__r = 0;
	}
}
function te(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, g, _, v, y = r && r.__k || h, b = t.length;
	for (c = O(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = re(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && ce(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = k(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function O(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = j(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), le(s, s));
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
function A(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (_(e) ? e.some(function(e) {
		A(e, t);
	}) : t.push(e)), t;
}
function j(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function M(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function N(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || M(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || M(e.style, t, n[t]);
	}
	else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(u, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[l] = r[l] : (n[l] = d, e.addEventListener(t, a ? p : f, a)) : e.removeEventListener(t, a ? p : f, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function ne(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function re(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, A, j, M, N = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof N == "function") {
		f = s.length;
		try {
			if (T = n.props, E = N.prototype && N.prototype.render, D = (d = N.contextType) && i[d.__c], O = d ? D ? D.props.value : d.__ : i, r.__c ? ee = (p = n.__c = r.__c).__ = p.__E : (E ? n.__c = p = new N(T, O) : (n.__c = p = new C(T, O), p.constructor = N, p.render = ue), D && D.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), E && p.__s == null && (p.__s = p.state), E && N.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, N.getDerivedStateFromProps(T, p.__s))), g = p.props, b = p.state, p.__v = n, m) E && N.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), E && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (E && N.getDerivedStateFromProps == null && T !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(T, O), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(T, p.__s, O)) {
					n.__v != r.__v && (p.props = T, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), h.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = w(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(T, p.__s, O), E && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(g, b, x);
				});
			}
			if (p.context = O, p.props = T, p.__P = e, p.__e = !1, k = t.__r, A = 0, E) p.state = p.__s, p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), h.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++A < 25);
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), j = d != null && d.type === S && d.key == null ? oe(d.props.children) : d, c = te(e, _(j) ? j : [j], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (M = o.length; M--;) y(o[M]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || ie(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = se(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function ie(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(ie));
}
function ae(e, n, r) {
	for (var i = 0; i < r.length; i++) ce(r[i], r[++i], r[++i]);
	t.__c && t.__c(n, e), e.some(function(n) {
		try {
			e = n.__h, n.__h = [], e.some(function(e) {
				e.call(n);
			});
		} catch (e) {
			t.__e(e, n.__v);
		}
	});
}
function oe(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(oe) : e.constructor === void 0 ? v({}, e) : null;
}
function se(n, r, i, a, o, s, c, l, u) {
	var d, f, p, h, g, v, b, x = i.props || m, S = r.props, C = r.type;
	if (C == "svg" ? o = "http://www.w3.org/2000/svg" : C == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o ||= "http://www.w3.org/1999/xhtml", s != null) {
		for (d = 0; d < s.length; d++) if ((g = s[d]) && "setAttribute" in g == !!C && (C ? g.localName == C : g.nodeType == 3)) {
			n = g, s[d] = null;
			break;
		}
	}
	if (n == null) {
		if (C == null) return document.createTextNode(S);
		n = document.createElementNS(o, C, S.is && S), l &&= (t.__m && t.__m(r, s), !1), s = null;
	}
	if (C == null) x === S || l && n.data == S || (n.data = S);
	else {
		if (s = C == "textarea" && S.defaultValue != null ? null : s && e.call(n.childNodes), !l && s != null) for (x = {}, d = 0; d < n.attributes.length; d++) x[(g = n.attributes[d]).name] = g.value;
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || N(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || N(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), te(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && N(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && N(n, d, b, x[d], o));
	}
	return n;
}
function ce(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function le(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || ce(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && le(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function ue(e, t, n) {
	return this.constructor(e, n);
}
function de(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], re(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), ae(s, n, c), n.props.children = null;
}
e = h.slice, t = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, n = 0, C.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = v({}, this.state);
	typeof e == "function" && (e = e(v({}, n), this.props)), e && v(n, e), e != null && this.__v && (t && this._sb.push(t), E(this));
}, C.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), E(this));
}, C.prototype.render = S, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, D.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = ne(!1), p = ne(!0);
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function fe(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function pe(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				fe(e);
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
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function me(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/components-mono2/selector-option.ts
function he(e) {
	return e.map((e) => ({
		label: e,
		value: e
	}));
}
function ge(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var _e = 0;
Array.isArray;
function P(e, n, r, i, a, o) {
	n ||= {};
	var s, c, l = n;
	if ("ref" in l) for (c in l = {}, n) c == "ref" ? s = n[c] : l[c] = n[c];
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
		__v: --_e,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/dist/hooks.module.js
var F, I, ve, ye, be = 0, xe = [], L = t, Se = L.__b, Ce = L.__r, we = L.diffed, Te = L.__c, Ee = L.unmount, De = L.__;
function Oe(e, t) {
	L.__h && L.__h(I, e, be || t), be = 0;
	var n = I.__H || (I.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function ke(e) {
	return be = 1, Ae(Be, e);
}
function Ae(e, t, n) {
	var r = Oe(F++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Be(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = I, !I.__f)) {
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
		I.__f = !0;
		var a = I.shouldComponentUpdate, o = I.componentWillUpdate;
		I.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, I.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function je(e, t) {
	var n = Oe(F++, 3);
	!L.__s && ze(n.__H, t) && (n.__ = e, n.u = t, I.__H.__h.push(n));
}
function Me(e) {
	return be = 5, Ne(function() {
		return { current: e };
	}, []);
}
function Ne(e, t) {
	var n = Oe(F++, 7);
	return ze(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Pe() {
	for (var e; e = xe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Le), t.__h.some(Re), t.__h = [];
		} catch (n) {
			t.__h = [], L.__e(n, e.__v);
		}
	}
}
L.__b = function(e) {
	I = null, Se && Se(e);
}, L.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), De && De(e, t);
}, L.__r = function(e) {
	Ce && Ce(e), F = 0;
	var t = (I = e.__c).__H;
	t && (ve === I ? (t.__h = [], I.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Le), t.__h.some(Re), t.__h = [], F = 0)), ve = I;
}, L.diffed = function(e) {
	we && we(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (xe.push(t) !== 1 && ye === L.requestAnimationFrame || ((ye = L.requestAnimationFrame) || Ie)(Pe)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), ve = I = null;
}, L.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Le), e.__h = e.__h.filter(function(e) {
				return !e.__ || Re(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], L.__e(n, e.__v);
		}
	}), Te && Te(e, t);
}, L.unmount = function(e) {
	Ee && Ee(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Le(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && L.__e(t, n.__v));
};
var Fe = typeof requestAnimationFrame == "function";
function Ie(e) {
	var t, n = function() {
		clearTimeout(r), Fe && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Fe && (t = requestAnimationFrame(n));
}
function Le(e) {
	var t = I, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), I = t;
}
function Re(e) {
	var t = I;
	e.__c = e.__(), I = t;
}
function ze(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Be(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region src/components-mono2/general-selector.tsx
function Ve({ options: e, value: t, onChange: n, reverseOptionsOrder: r = !1, className: i, style: a }) {
	return /* @__PURE__ */ P("select", {
		value: t,
		onChange: (t) => {
			let r = typeof e[0].value == "number", i = t.target;
			n(r ? parseFloat(i.value) : i.value);
		},
		className: i,
		style: a,
		children: Ne(() => r ? [...e].reverse() : e, [e, r]).map((e) => /* @__PURE__ */ P("option", {
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-VSv4Uyxk.js
var He = Symbol("V"), Ue = Symbol("IMMUT_BASE"), We = Symbol("IS_RAW"), Ge = Symbol("P"), R = "Array", Ke = [
	Symbol.iterator,
	Symbol.toStringTag,
	We
], qe = {
	Map: "Map",
	Set: "Set",
	Array: R
}, Je = "[object Object]", Ye = "[object Map]", Xe = "[object Set]", Ze = "[object Array]", Qe = "[object Function]", $e = {
	[Ye]: "Map",
	[Xe]: "Set",
	[Ze]: R,
	[Je]: "Object"
}, et = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], tt = [
	"set",
	"clear",
	"delete"
], nt = [
	"add",
	"clear",
	"delete"
], rt = [
	"splice",
	"sort",
	"unshift",
	"shift"
], it = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), at = {
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
	[R]: it
}, ot = {
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
	[R]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, st = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[R]: ["forEach", "map"]
};
function z(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var ct = {
	value: 0,
	prefixSeed: 1
}, lt = {
	value: 0,
	prefixSeed: 1
}, ut = {
	value: 0,
	prefixSeed: 1
}, dt = {
	value: 0,
	prefixSeed: 1
}, ft = {}, pt = {};
function mt() {
	return z(lt, "MID_");
}
function ht() {
	return z(ct, "MV_");
}
function gt() {
	return z(ut, "SI_");
}
function _t() {
	return z(dt, "SR_");
}
var vt = {
	autoFreeze: !1,
	autoRevoke: !0
}, yt = Object.prototype.toString, bt = !!Reflect, xt = Object.prototype.hasOwnProperty;
function St(e, t) {
	return bt ? Reflect.has(e, t) : xt.call(e, t);
}
function Ct(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		W(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), H(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), wt(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function B(e) {
	return yt.call(e);
}
function V(...e) {
	return e;
}
function wt(e) {
	return B(e) === Je;
}
function H(e) {
	return B(e) === Ye;
}
function Tt(e) {
	return B(e) === Xe;
}
function U(e) {
	return B(e) === Qe;
}
function Et(e) {
	return $e[B(e)];
}
function W(e) {
	let t = B(e);
	return ![
		Je,
		Ze,
		Ye,
		Xe,
		Qe
	].includes(t);
}
function Dt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Ot(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function kt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function At(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function jt(e) {
	return e && e[He] || "";
}
function Mt(e, t) {
	let n = jt(e);
	return n ? n !== t : !1;
}
function Nt(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && wt(e) && (n = Object.assign({}, e)), H(e) && (n = new Map(e)), Tt(e) && (n = new Set(e)), n;
}
function Pt(e, t) {
	return t.immutBase ? e : Nt(e, t.readOnly);
}
function Ft(e) {
	let t = e;
	if (!At(e)) return e;
	let n = ft[t];
	return n || (n = gt(), ft[t] = n), n;
}
function It(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function G(e, t) {
	let n = e;
	return t && (n = K(e, !0)), n.join("|");
}
function K(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = Ft(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Ft(i);
	return n[r] = a, n;
}
function Lt(e) {
	return e.map((e) => pt[e] || e);
}
function Rt(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || K(t);
	It(i, a) < 0 && (r.push(t), i.push(a));
}
function zt(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = It(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function Bt(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function q(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = H(r) ? Bt(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function Vt(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = q(e, i);
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
function Ht(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = H(r) ? Bt(r, a) : r[a];
	}
}
function Ut(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		Ht(e, r, n);
	}
}
function Wt(e, t) {
	let n = G(e), r = "";
	for (let e of t) {
		let t = `${G(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = Lt(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var Gt = /* @__PURE__ */ new Map(), J = /* @__PURE__ */ new Map(), Kt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new Map();
function Y(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function Jt(e, t, n) {
	let r = [t], i = X(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function Yt(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Et(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Ft(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = Zt(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = Jt(y, e, s), f = K(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = G(i.arrKeyPath, !0), n = sn(u, e);
			t = Wt(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = sn(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = q(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = q(e, t);
				if (!a) {
					let { val: n } = q(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(K(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(K(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: mt(),
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
		revoke: V,
		hasOnOperate: c,
		execOnOperate: V
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function Xt(e) {
	if (!e) return !1;
	let t = en(e);
	return t ? !t.isImmutBase : !1;
}
function Zt(e, t) {
	let n = Z(e, t);
	return n ? n.level + 1 : 1;
}
function X(e, t) {
	return t.metaMap.get(e);
}
function Z(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Q(e) || null : null;
}
function Qt(e) {
	return e && Q(e) || null;
}
function $t(e) {
	return e && e[He] || "";
}
function en(e) {
	return Q(e) || null;
}
function Q(e) {
	return e[Ge];
}
function tn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function nn(e) {
	return Kt.get(e) || _t();
}
function rn(e, t) {
	return Kt.set(e, t);
}
function an(e) {
	return Gt.get(e);
}
function on(e, t, n) {
	let r = Gt.get(e);
	r || (r = {}, Gt.set(e, r)), r[t] = n;
}
function sn(e, t) {
	let n = an(e);
	return n && n[t] || [];
}
function cn(e) {
	return J.get(e) || [];
}
function ln(e, t, n) {
	let r = Gt.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (J.get(e) || []).filter((e, n) => !t.includes(n));
	J.set(e, i);
}
function un(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => on(n, e, r));
	let i = J.get(n) || [], a = r.map((e) => G(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = G(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => G(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), J.set(n, i);
}
function dn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = K(i), s = K(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Rt(n, a, s), un(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function fn(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function pn(e, t) {
	return !wt(e) || $t(e) === t;
}
function mn(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Ct(n, i, a, (e, n, r) => {
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
		if (p === "Array") return fn(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function hn(e, t) {
	let n = cn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = q(e.proxyVal, t), i = Qt(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(G(e)));
		else if (n) for (let e of o) Ht(t, e, n.copy);
		else if (s) for (let e of o) Ht(t, e, s.self);
	}
	i.length && ln(e.sourceId, i, a);
}
function gn(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), hn(e, a), mn(e, t), a;
}
function _n(e) {
	e.rootMeta.scopes.push(e);
}
function vn(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = Yt(e, t, n), c = Pt(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => Ge === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = V;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : V;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function yn(e, t) {
	return e === "Array" || (st[e] || []).includes(t);
}
function bn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (W(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!U(e)) {
			if (r.newNodeStats[c] || e[We]) return e;
			let n = X(e, o);
			return n || (n = vn(c, e, t), _n(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!yn(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Sn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Sn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function xn(e, t) {
	if (!wt(e)) return e;
	let n = X(e, t);
	return n ? n.copy : e;
}
function Sn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return Y(t), a(...e);
	}, e.clear = function(...e) {
		return Y(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return Y(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (Y(t), t.hasOnOperate) {
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
function Cn(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && nt.includes(r) || i === "Array" && et.includes(r) || i === "Map" && tt.includes(r))) && Y(n);
}
function wn(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Tn(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = xn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Cn({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = at[o] || [];
	if (U(i) && m.includes(n)) return n === "slice" ? f.slice : (rt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
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
			t.length === 1 ? e.isDel = !0 : zt(e);
		} else g();
		let t = p[r];
		W(t) || c.newNodeMap.delete(wn(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !W(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(wn(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function En(e) {
	if (W(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(En), Object.freeze(e);
	if (Tt(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = V;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (H(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = V;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		En(n);
	}), Object.freeze(e);
}
function Dn(e) {
	if (!e) return e;
	let t = Qt(e);
	return t ? t.self : e;
}
var On = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], kn = {};
On.forEach((e) => kn[e] = 1);
var An = {
	[R]: 1,
	Set: 1,
	Map: 1
}, $ = /* @__PURE__ */ new Map();
function jn(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[Ue] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? vt.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = ht(), p.metaVer = d, qt.set(d, p));
	let m = t.autoRevoke ?? vt.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (at[f] || []).includes(t) ? (S = !0, l = (ot[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (He === t) return d;
				let n = e[t];
				if (Ke.includes(t)) {
					if (U(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !St(e, t)) return n;
				let l = n, u = X(e, p), f = dn(t, u, Z(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return An[h] && kn[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = bn(n, {
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
				}), h === "Array" && kt(t) || qe[h] && (l = Tn(e, {
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
				if (Xt(i)) if (c = !0, pn(i, d)) {
					if (xn(i, p) === t[r]) return !0;
					let e = X(i, p);
					dn(r, s, e), Rt(e, s.keyPath.concat(r));
				} else e = !1;
				else if (Mt(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Q(i);
					if (o.sourceId !== n) l = Dn(i);
					else {
						let { isGetted: n, val: i } = Vt(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Q(i);
						tn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = q(e, t);
							n && tn(o, Q(i), r);
						}), Rt(c, u), Ut(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && kt(r)) return l = y("set", r, {
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
				return u && Tn(t, {
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
				}), Tn(e, {
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
				if (W(e)) throw Error("base state can not be primitive");
				if (u) return $.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || nn(e), l = X(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = vn("", n, {
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
				return _n(f), f.execOnOperate = y, $.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return $.delete(t), t;
				let r = X(t, p);
				if (r.isImmutBase && !n) return t;
				let i = gn(r, p);
				return l && e && (i = En(i)), qt.delete(d), $.delete(t), rn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Mn(e) {
	if (!U(e)) throw Error("produce callback is not a function");
}
var Nn = "Not a Limu root draft";
function Pn(e) {
	let t = $.get(e);
	if (!t) throw $t(e) && en(e)?.level === 0 ? Error("Draft has been finished!") : Error(Nn);
	return t;
}
function Fn(e, t) {
	return jn(t).createDraft(e);
}
function In(e) {
	return Pn(e)(e);
}
function Ln(e, t) {
	if (Dt(e) || Ot(t)) throw Error("produce callback can not be a promise function or result");
}
function Rn(e, t, n) {
	Mn(t);
	let r = Fn(e, n);
	return Ln(t, t(r)), In(r);
}
function zn(e, t, n) {
	if (!t || !U(t)) {
		let n = e, r = t;
		return Mn(e), (e) => Rn(e, n, r);
	}
	return Rn(e, t, n);
}
var Bn = zn;
function Vn(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function Hn(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function Un(e, t) {
	let { useEffect: n, useRef: r, useState: i } = t, a = {}, o = e, s = {}, c = s, l = [], u, d = !1, f = 0;
	function p(e) {
		for (let t of l) t(e);
	}
	for (let t in e) {
		let e = t, n = (t) => {
			let n;
			if (n = typeof t == "function" ? t(o[e]) : t, n !== o[e]) {
				o[e] = n, f++, d ? (u ??= {}, u[e] = n) : p({ [e]: n });
				for (let t in a) {
					let n = a[t];
					if (n.dependentFieldKeys.has(e)) {
						var r;
						(r = n.refreshView) == null || r.call(n);
					}
				}
			}
		}, r = Vn(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Bn(t, e));
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
	let m = (e) => {
		for (let t in e) {
			let n = Vn(t), r = e[t], i = c[`set${n}`];
			i?.(r);
		}
	}, h = (t) => {
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
			},
			renderedStateVersion: f
		};
		return i;
	}, g = () => {
		let [, e] = i(0), t = r(null);
		return t.current ||= h(Math.random().toString(36).substring(2, 15)), t.current.renderedStateVersion = f, n(() => {
			let n = t.current;
			if (n && (n.refreshView = () => e((e) => e + 1), n.activate(), n.renderedStateVersion !== f)) {
				var r;
				(r = n.refreshView) == null || r.call(n);
			}
			return () => {
				var e;
				(e = t.current) == null || e.deactivate();
			};
		}, []), t.current.getterObject;
	}, _ = (e, t) => (l.push(e), t && e(o), () => {
		Hn(l, e);
	}), v = (e) => {
		d = !0;
		try {
			e();
		} finally {
			d = !1, u !== void 0 && (p(u), u = void 0);
		}
	};
	return {
		state: o,
		assign: m,
		useSnapshot: g,
		subscribe: _,
		mutations: s,
		...s,
		batch: v
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.module.js
function Wn(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Gn(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Kn(e, t) {
	this.props = e, this.context = t;
}
(Kn.prototype = new C()).isPureReactComponent = !0, Kn.prototype.shouldComponentUpdate = function(e, t) {
	return Gn(this.props, e) || Gn(this.state, t);
};
var qn = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), qn && qn(e);
}, typeof Symbol < "u" && Symbol.for;
var Jn = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	Jn(e, t, n, r);
};
var Yn = t.unmount;
function Xn(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Wn({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return Xn(e, t, n);
	})), e;
}
function Zn(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return Zn(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Qn() {
	this.__u = 0, this.o = null, this.__b = null;
}
function $n(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function er() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Yn && Yn(e);
}, (Qn.prototype = new C()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = $n(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = Zn(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, Qn.prototype.componentWillUnmount = function() {
	this.o = [];
}, Qn.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = Xn(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && b(S, null, e.fallback);
	return i && (i.__u &= -33), [b(S, null, t.__a ? null : e.children), i];
};
var tr = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(er.prototype = new C()).__a = function(e) {
	var t = this, n = $n(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), tr(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, er.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = A(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, er.prototype.componentDidUpdate = er.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		tr(e, n, t);
	});
};
var nr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, rr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ir = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, ar = /[A-Z0-9]/g, or = typeof document < "u", sr = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
C.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(C.prototype, e, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + e];
		},
		set: function(t) {
			Object.defineProperty(this, e, {
				configurable: !0,
				writable: !0,
				value: t
			});
		}
	});
});
var cr = t.event;
t.event = function(e) {
	return cr && (e = cr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var lr = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, ur = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || or && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || sr(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : ir.test(a) && (a = s) : s = a = "oninput" : i && rr.test(a) ? a = a.replace(ar, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", lr)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = nr, ur && ur(e);
};
var dr = t.__r;
t.__r = function(e) {
	dr && dr(e), e.__c;
};
var fr = t.diffed;
t.diffed = function(e) {
	fr && fr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function pr(e) {
	return Un(e, {
		useEffect: je,
		useRef: Me,
		useState: ke
	});
}
//#endregion
//#region src/note-defs.ts
var mr = {
	Am: 57,
	B: 59,
	C: 60,
	Dm: 62,
	Em: 64,
	F: 65,
	G: 67
};
function hr(e, t) {
	return (mr[e] ?? 60) + t;
}
var gr = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
function _r(e, t) {
	let n = (t % 12 + 12) % 12;
	return e.endsWith("m") ? [
		0,
		5,
		7
	].includes(n) : [
		2,
		4,
		9
	].includes(n);
}
function vr(e, t) {
	let n = gr[(hr(e, t) % 12 + 12) % 12];
	return _r(e, t) ? `${n}m` : n;
}
function yr(e) {
	return (e.endsWith("m") ? "minor" : "major") == "major" ? [
		-7,
		-5,
		-3,
		-1,
		0,
		2,
		4,
		5,
		7,
		9
	] : [
		-7,
		-5,
		-4,
		-2,
		0,
		2,
		3,
		5,
		7,
		8
	];
}
//#endregion
//#region src/sequencer.ts
function br(e, t) {
	let n = {
		songKey: e.songKey,
		loopBars: e.loopBars,
		relatives: [...e.relatives]
	}, r = null, i = t.createNoteOutputPort(), a = {
		emitSongKey() {
			t.emitMetaAttributes({ key: n.songKey });
		},
		playNote(e, t) {
			i.noteOn(e, 0), r = e;
		},
		stopCurrentNote(e) {
			r !== null && (i.noteOff(r, 0), r = null);
		}
	};
	return {
		setState(e) {
			Object.assign(n, e), e.songKey && t.emitMetaAttributes({ key: e.songKey });
		},
		clockInput: {
			start() {
				a.emitSongKey();
			},
			stop() {
				a.stopCurrentNote(0);
			},
			processStep(e, t) {
				let i = (e / 16 >>> 0) % n.loopBars >>> (n.loopBars === 8), o = hr(n.songKey, n.relatives[i]);
				o !== r && (a.stopCurrentNote(t), a.playNote(o, t));
			}
		}
	};
}
//#endregion
//#region src/unit.tsx
var xr = he([
	"Am",
	"B",
	"C",
	"Dm",
	"Em",
	"F",
	"G"
]), Sr = ge([[4, "4"], [8, "8"]]);
function Cr(e) {
	return ge(yr(e).map((t) => [t, vr(e, t)]));
}
var wr = (e) => {
	let t = {
		songKey: "Am",
		loopBars: 4,
		relatives: [
			0,
			-5,
			-4,
			-2
		]
	}, n = br(t, e), r = pr(t);
	r.subscribe(n.setState);
	let i = { setRelative(e, t) {
		r.assign({ relatives: r.state.relatives.map((n, r) => r === e ? t : n) });
	} };
	return e.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [300, 150]
		},
		clockHandlers: n.clockInput,
		persistence: {
			emitState() {
				return { ...r.state };
			},
			applyState(e) {
				r.assign(e);
			}
		}
	}), { RenderUi() {
		let { songKey: e, loopBars: t, relatives: n } = r.useSnapshot(), a = Ne(() => Cr(e), [e]);
		return /* @__PURE__ */ P("div", {
			className: "w-[300px] h-[150px] bg-gray-100 flex-c",
			children: /* @__PURE__ */ P("div", {
				className: "flex-v gap-2",
				children: [
					/* @__PURE__ */ P("div", { children: "chord caster" }),
					/* @__PURE__ */ P("div", {
						className: "flex-ha gap-4",
						children: [/* @__PURE__ */ P("div", {
							className: "flex-ha gap-2",
							children: [/* @__PURE__ */ P("div", { children: "key" }), /* @__PURE__ */ P(Ve, {
								options: xr,
								value: e,
								onChange: r.setSongKey,
								reverseOptionsOrder: !0
							})]
						}), /* @__PURE__ */ P("div", {
							className: "flex-ha gap-2",
							children: [/* @__PURE__ */ P("div", { children: "bars" }), /* @__PURE__ */ P(Ve, {
								options: Sr,
								value: t,
								onChange: r.setLoopBars
							})]
						})]
					}),
					/* @__PURE__ */ P("div", {
						className: "flex-ha gap-2",
						children: [/* @__PURE__ */ P("div", { children: "chord" }), n.map((e, t) => /* @__PURE__ */ P(Ve, {
							options: a,
							value: e,
							onChange: (e) => i.setRelative(t, e),
							reverseOptionsOrder: !0
						}, t))]
					})
				]
			})
		});
	} };
}, Tr = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-sky-600:oklch(58.8% .158 241.966);--color-gray-100:oklch(96.7% .003 264.542);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-white:#fff;--spacing:.25rem;--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.flex{display:flex}.h-\\[10px\\]{height:10px}.h-\\[36px\\]{height:36px}.h-\\[150px\\]{height:150px}.h-full{height:100%}.w-\\[2px\\]{width:2px}.w-\\[36px\\]{width:36px}.w-\\[60px\\]{width:60px}.w-\\[300px\\]{width:300px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.rounded-full{border-radius:2147483647px}.border,.border-\\[1px\\]{border-style:var(--tw-border-style);border-width:1px}.border-gray-600{border-color:var(--color-gray-600)}.border-gray-700{border-color:var(--color-gray-700)}.bg-\\[\\#fff\\]{background-color:#fff}.bg-gray-100{background-color:var(--color-gray-100)}.bg-gray-400{background-color:var(--color-gray-400)}.bg-sky-600{background-color:var(--color-sky-600)}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-\\[9px\\]{font-size:9px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-white{color:var(--color-white)}}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", Er = "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";
function Dr() {
	let e = me("wafer-v01", import.meta.url);
	if (!e) throw Error("undefined unit interface");
	let t = wr(e);
	return pe((e) => (de(/* @__PURE__ */ P(t.RenderUi, {}), e), () => {
		de(null, e);
	}), {
		cssTexts: [Tr, ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"],
		stylesheetUrls: [Er]
	});
}
var Or = Dr();
//#endregion
export { Or as default };
