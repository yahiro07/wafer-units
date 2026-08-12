//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/dist/preact.module.js
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
		o.__v = n.__v + 1, t.vnode && t.vnode(o), ae(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, se(i, o, a), n.__e = n.__ = null, o.__e != r && T(o);
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
	for (c = O(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = ae(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && ue(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = k(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function O(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = ne(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), de(s, s));
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
function ne(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function re(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function j(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || re(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || re(e.style, t, n[t]);
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
function ie(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function ae(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, A, ne, re, j = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof j == "function") {
		f = s.length;
		try {
			if (T = n.props, E = j.prototype && j.prototype.render, D = (d = j.contextType) && i[d.__c], O = d ? D ? D.props.value : d.__ : i, r.__c ? ee = (p = n.__c = r.__c).__ = p.__E : (E ? n.__c = p = new j(T, O) : (n.__c = p = new C(T, O), p.constructor = j, p.render = fe), D && D.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), E && p.__s == null && (p.__s = p.state), E && j.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, j.getDerivedStateFromProps(T, p.__s))), g = p.props, b = p.state, p.__v = n, m) E && j.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), E && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (E && j.getDerivedStateFromProps == null && T !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(T, O), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(T, p.__s, O)) {
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
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), ne = d != null && d.type === S && d.key == null ? ce(d.props.children) : d, c = te(e, _(ne) ? ne : [ne], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (re = o.length; re--;) y(o[re]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || oe(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = le(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function oe(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(oe));
}
function se(e, n, r) {
	for (var i = 0; i < r.length; i++) ue(r[i], r[++i], r[++i]);
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
function ce(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(ce) : e.constructor === void 0 ? v({}, e) : null;
}
function le(n, r, i, a, o, s, c, l, u) {
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || j(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || j(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), te(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && j(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && j(n, d, b, x[d], o));
	}
	return n;
}
function ue(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function de(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || ue(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && de(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function fe(e, t, n) {
	return this.constructor(e, n);
}
function pe(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], ae(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), se(s, n, c), n.props.children = null;
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
}, D.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = ie(!1), p = ie(!0);
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function me(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function he(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				me(e);
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
//#region ../../../node_modules/.pnpm/@yahiro07+qulex@0.1.7/node_modules/@yahiro07/qulex/dist/custom-jsx-adapter-TO6nitiJ.js
function ge(e, t) {
	return {
		...e,
		class: [e.class, ...t].filter(Boolean).join(" ")
	};
}
var _e;
function ve(e) {
	_e = e.cssFunction;
}
function ye(e) {
	return (Array.isArray(e) ? e : [e]).map((e) => {
		if (typeof e == "object" && e) return _e?.(e);
		if (typeof e == "string") return e;
	}).filter((e) => !!e);
}
function be(e, t, n, r) {
	if ("if" in n && !n.if) return null;
	let { sx: i, ...a } = n, o = a;
	if (typeof t != "function" && i) {
		let e = ye(i);
		e.length > 0 && (o = ge(a, e));
	}
	return e(t, o, r);
}
var xe = (() => {
	let e, t = [];
	for (let n = 0; n < 256; n++) {
		e = n;
		for (let t = 0; t < 8; t++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})(), Se = (e) => {
	let t = -1;
	for (let n = 0; n < e.length; n++) t = t >>> 8 ^ xe[(t ^ e.charCodeAt(n)) & 255];
	return ((t ^ -1) >>> 0).toString(16).padStart(8, "0");
};
function M(e) {
	return `${e}px`;
}
function N(e) {
	return M(e * 4);
}
var Ce = {
	full: "100%",
	vw: "100vw",
	vh: "100vh",
	dvw: "100dvw",
	dvh: "100dvh"
};
function we(e) {
	return Ce[e] ?? (typeof e == "number" ? M(e) : e);
}
var Te = {
	flexH: () => ({
		display: "flex",
		flexDirection: "row"
	}),
	flexHA: () => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	}),
	flexC: () => ({
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}),
	flexV: () => ({
		display: "flex",
		flexDirection: "column"
	}),
	flexVA: () => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}),
	flexVC: () => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}),
	flexVL: () => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start"
	}),
	absoluteFull: () => ({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%"
	}),
	fJustify: (e) => ({ justifyContent: {
		start: "flex-start",
		center: "center",
		end: "flex-end",
		between: "space-between",
		around: "space-around",
		evenly: "space-evenly"
	}[e] }),
	fAlign: (e) => ({ alignItems: {
		start: "flex-start",
		center: "center",
		end: "flex-end",
		between: "space-between",
		around: "space-around",
		evenly: "space-evenly"
	}[e] }),
	gap: (e) => ({ gap: M(e * 4) }),
	grow: () => ({ flexGrow: 1 }),
	w: (e) => ({ width: we(e) }),
	h: (e) => ({ height: we(e) }),
	wh: (e, t) => ({
		width: we(e),
		height: we(t)
	}),
	bg: (e) => ({ background: e }),
	bd: (e) => ({ border: e.includes(" ") ? e : `solid 1px ${e}` }),
	p: (e) => ({ padding: N(e) }),
	pt: (e) => ({ paddingTop: N(e) }),
	pb: (e) => ({ paddingBottom: N(e) }),
	pl: (e) => ({ paddingLeft: N(e) }),
	pr: (e) => ({ paddingRight: N(e) }),
	px: (e) => ({
		paddingLeft: N(e),
		paddingRight: N(e)
	}),
	py: (e) => ({
		paddingTop: N(e),
		paddingBottom: N(e)
	}),
	m: (e) => ({ margin: N(e) }),
	ml: (e) => ({ marginLeft: N(e) }),
	mr: (e) => ({ marginRight: N(e) }),
	mt: (e) => ({ marginTop: N(e) }),
	mb: (e) => ({ marginBottom: N(e) }),
	mx: (e) => ({
		marginLeft: N(e),
		marginRight: N(e)
	}),
	my: (e) => ({
		marginTop: N(e),
		marginBottom: N(e)
	}),
	color: (e) => ({ color: e }),
	weight: (e) => ({ fontWeight: e }),
	inlineBlock: () => ({ display: "inline-block" }),
	fontSize: (e) => ({ fontSize: M(e) }),
	rounded: (e) => (e === "full" && (e = "100%"), { borderRadius: typeof e == "number" ? M(e) : e }),
	relative: () => ({ position: "relative" }),
	absolute: () => ({ position: "absolute" }),
	full: () => ({
		width: "100%",
		height: "100%"
	}),
	cursor: (e) => ({ cursor: e }),
	minW: (e) => ({ minWidth: M(e) }),
	invisible: () => ({ visibility: "hidden" }),
	top: (e) => ({ top: M(e) }),
	right: (e) => ({ right: M(e) }),
	bottom: (e) => ({ bottom: M(e) }),
	left: (e) => ({ left: M(e) }),
	opacity: (e) => ({ opacity: e }),
	pointerEvents: (e) => ({ pointerEvents: e }),
	overflow: (e) => ({ overflow: e }),
	overflowXY: (e, t) => ({
		overflowX: e,
		overflowY: t
	}),
	css: (e) => e
}, Ee = (e) => e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
function De(e) {
	let t = "{";
	for (let n in e) t += `${Ee(n)}${typeof e[n] == "object" ? De(e[n]) : `:${e[n]}`};`;
	return t += "}", t;
}
function Oe(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, (...e) => t(n(...e))]));
}
function ke(e) {
	let t = e ? { ...e } : {}, n;
	return n = {
		__isQCursor: !0,
		accumulatedObject: t,
		...Oe(Te, (e) => {
			if (typeof e == "object") for (let n in e) t[n] = e[n];
			return n;
		})
	}, n;
}
function Ae() {
	let e = new CSSStyleSheet(), t = /* @__PURE__ */ new Set(), n = (n) => {
		let r = De("__isQCursor" in n ? n.accumulatedObject : n);
		if (r === "") return "";
		let i = `cs-${Se(r)}`;
		if (!t.has(i)) {
			t.add(i);
			let n = `.${i}${r}`;
			try {
				e.insertRule(n, e.cssRules.length);
			} catch (e) {
				console.error(`Failed to insert rule: ${n}`, e);
			}
		}
		return i;
	}, r = Oe(Te, (e) => ke(e));
	return ve({ cssFunction: n }), {
		qu: r,
		css: n,
		cz: (...e) => e.filter((e) => e !== !1 && e !== void 0).map((e) => typeof e == "object" ? n(e) : e).join(" "),
		cssRealm: { sheet: e }
	};
}
//#endregion
//#region src/common/css-realm.ts
var { qu: P, cz: je, cssRealm: Me } = Ae(), F, I, Ne, Pe, Fe = 0, Ie = [], L = t, Le = L.__b, Re = L.__r, ze = L.diffed, Be = L.__c, Ve = L.unmount, He = L.__;
function Ue(e, t) {
	L.__h && L.__h(I, e, Fe || t), Fe = 0;
	var n = I.__H || (I.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function We(e) {
	return Fe = 1, Ge(tt, e);
}
function Ge(e, t, n) {
	var r = Ue(F++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : tt(void 0, t), function(e) {
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
function Ke(e, t) {
	var n = Ue(F++, 3);
	!L.__s && et(n.__H, t) && (n.__ = e, n.u = t, I.__H.__h.push(n));
}
function qe(e) {
	return Fe = 5, Je(function() {
		return { current: e };
	}, []);
}
function Je(e, t) {
	var n = Ue(F++, 7);
	return et(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ye() {
	for (var e; e = Ie.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Qe), t.__h.some($e), t.__h = [];
		} catch (n) {
			t.__h = [], L.__e(n, e.__v);
		}
	}
}
L.__b = function(e) {
	I = null, Le && Le(e);
}, L.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), He && He(e, t);
}, L.__r = function(e) {
	Re && Re(e), F = 0;
	var t = (I = e.__c).__H;
	t && (Ne === I ? (t.__h = [], I.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Qe), t.__h.some($e), t.__h = [], F = 0)), Ne = I;
}, L.diffed = function(e) {
	ze && ze(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Ie.push(t) !== 1 && Pe === L.requestAnimationFrame || ((Pe = L.requestAnimationFrame) || Ze)(Ye)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), Ne = I = null;
}, L.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Qe), e.__h = e.__h.filter(function(e) {
				return !e.__ || $e(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], L.__e(n, e.__v);
		}
	}), Be && Be(e, t);
}, L.unmount = function(e) {
	Ve && Ve(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Qe(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && L.__e(t, n.__v));
};
var Xe = typeof requestAnimationFrame == "function";
function Ze(e) {
	var t, n = function() {
		clearTimeout(r), Xe && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Xe && (t = requestAnimationFrame(n));
}
function Qe(e) {
	var t = I, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), I = t;
}
function $e(e) {
	var t = I;
	e.__c = e.__(), I = t;
}
function et(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function tt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function nt(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/utils/selector-option.ts
function rt(e) {
	return e.map((e) => ({
		label: e.toString(),
		value: e
	}));
}
//#endregion
//#region src/common/constants.ts
var R = [
	.333,
	.5,
	.666,
	.75,
	1,
	1.5,
	2,
	2.5,
	3
], it = rt([
	.333,
	.5,
	.666,
	.75,
	1,
	1.5,
	2,
	2.5,
	3
]), at = {
	isOn: !0,
	time: 1,
	tone: .5,
	feed: .5,
	mix: .5,
	lfoOn: !0,
	lfoRate: .5,
	lfoDepth: .5,
	safety: !0
}, ot = Symbol("V"), st = Symbol("IMMUT_BASE"), ct = Symbol("IS_RAW"), lt = Symbol("P"), z = "Array", ut = [
	Symbol.iterator,
	Symbol.toStringTag,
	ct
], dt = {
	Map: "Map",
	Set: "Set",
	Array: z
}, ft = "[object Object]", pt = "[object Map]", mt = "[object Set]", ht = "[object Array]", gt = "[object Function]", _t = {
	[pt]: "Map",
	[mt]: "Set",
	[ht]: z,
	[ft]: "Object"
}, vt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], yt = [
	"set",
	"clear",
	"delete"
], bt = [
	"add",
	"clear",
	"delete"
], xt = [
	"splice",
	"sort",
	"unshift",
	"shift"
], St = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), Ct = {
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
	[z]: St
}, wt = {
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
	[z]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, Tt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[z]: ["forEach", "map"]
};
function Et(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var Dt = {
	value: 0,
	prefixSeed: 1
}, Ot = {
	value: 0,
	prefixSeed: 1
}, kt = {
	value: 0,
	prefixSeed: 1
}, At = {
	value: 0,
	prefixSeed: 1
}, jt = {}, Mt = {};
function Nt() {
	return Et(Ot, "MID_");
}
function Pt() {
	return Et(Dt, "MV_");
}
function Ft() {
	return Et(kt, "SI_");
}
function It() {
	return Et(At, "SR_");
}
var Lt = {
	autoFreeze: !1,
	autoRevoke: !0
}, Rt = Object.prototype.toString, zt = !!Reflect, Bt = Object.prototype.hasOwnProperty;
function Vt(e, t) {
	return zt ? Reflect.has(e, t) : Bt.call(e, t);
}
function Ht(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		H(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Wt(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Ut(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function B(e) {
	return Rt.call(e);
}
function V(...e) {
	return e;
}
function Ut(e) {
	return B(e) === ft;
}
function Wt(e) {
	return B(e) === pt;
}
function Gt(e) {
	return B(e) === mt;
}
function Kt(e) {
	return B(e) === gt;
}
function qt(e) {
	return _t[B(e)];
}
function H(e) {
	let t = B(e);
	return ![
		ft,
		ht,
		pt,
		mt,
		gt
	].includes(t);
}
function Jt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Yt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Xt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Zt(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function Qt(e) {
	return e && e[ot] || "";
}
function $t(e, t) {
	let n = Qt(e);
	return n ? n !== t : !1;
}
function en(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && Ut(e) && (n = Object.assign({}, e)), Wt(e) && (n = new Map(e)), Gt(e) && (n = new Set(e)), n;
}
function tn(e, t) {
	return t.immutBase ? e : en(e, t.readOnly);
}
function nn(e) {
	let t = e;
	if (!Zt(e)) return e;
	let n = jt[t];
	return n || (n = Ft(), jt[t] = n), n;
}
function rn(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function U(e, t) {
	let n = e;
	return t && (n = W(e, !0)), n.join("|");
}
function W(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = nn(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = nn(i);
	return n[r] = a, n;
}
function an(e) {
	return e.map((e) => Mt[e] || e);
}
function on(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || W(t);
	rn(i, a) < 0 && (r.push(t), i.push(a));
}
function sn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = rn(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function cn(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function G(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = Wt(r) ? cn(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function ln(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = G(e, i);
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
function un(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = Wt(r) ? cn(r, a) : r[a];
	}
}
function dn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		un(e, r, n);
	}
}
function fn(e, t) {
	let n = U(e), r = "";
	for (let e of t) {
		let t = `${U(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = an(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var pn = /* @__PURE__ */ new Map(), mn = /* @__PURE__ */ new Map(), hn = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new Map();
function _n(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function vn(e, t, n) {
	let r = [t], i = K(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function yn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = qt(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = nn(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = xn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = vn(y, e, s), f = W(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = U(i.arrKeyPath, !0), n = An(u, e);
			t = fn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = An(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = G(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = G(e, t);
				if (!a) {
					let { val: n } = G(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(W(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(W(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: Nt(),
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
function bn(e) {
	if (!e) return !1;
	let t = wn(e);
	return t ? !t.isImmutBase : !1;
}
function xn(e, t) {
	let n = q(e, t);
	return n ? n.level + 1 : 1;
}
function K(e, t) {
	return t.metaMap.get(e);
}
function q(e, t) {
	return e ? t ? t.metaMap.get(e) || null : J(e) || null : null;
}
function Sn(e) {
	return e && J(e) || null;
}
function Cn(e) {
	return e && e[ot] || "";
}
function wn(e) {
	return J(e) || null;
}
function J(e) {
	return e[lt];
}
function Tn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function En(e) {
	return hn.get(e) || It();
}
function Dn(e, t) {
	return hn.set(e, t);
}
function On(e) {
	return pn.get(e);
}
function kn(e, t, n) {
	let r = pn.get(e);
	r || (r = {}, pn.set(e, r)), r[t] = n;
}
function An(e, t) {
	let n = On(e);
	return n && n[t] || [];
}
function jn(e) {
	return mn.get(e) || [];
}
function Mn(e, t, n) {
	let r = pn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (mn.get(e) || []).filter((e, n) => !t.includes(n));
	mn.set(e, i);
}
function Nn(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => kn(n, e, r));
	let i = mn.get(n) || [], a = r.map((e) => U(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = U(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => U(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), mn.set(n, i);
}
function Pn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = W(i), s = W(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		on(n, a, s), Nn(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function Fn(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function In(e, t) {
	return !Ut(e) || Cn(e) === t;
}
function Ln(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Ht(n, i, a, (e, n, r) => {
			let i = q(e, t);
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
		if (p === "Array") return Fn(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function Rn(e, t) {
	let n = jn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = G(e.proxyVal, t), i = Sn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(U(e)));
		else if (n) for (let e of o) un(t, e, n.copy);
		else if (s) for (let e of o) un(t, e, s.self);
	}
	i.length && Mn(e.sourceId, i, a);
}
function zn(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), Rn(e, a), Ln(e, t), a;
}
function Bn(e) {
	e.rootMeta.scopes.push(e);
}
function Vn(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = yn(e, t, n), c = tn(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => lt === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = V;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : V;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function Hn(e, t) {
	return e === "Array" || (Tt[e] || []).includes(t);
}
function Un(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (H(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Kt(e)) {
			if (r.newNodeStats[c] || e[ct]) return e;
			let n = K(e, o);
			return n || (n = Vn(c, e, t), Bn(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!Hn(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Gn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Gn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function Wn(e, t) {
	if (!Ut(e)) return e;
	let n = K(e, t);
	return n ? n.copy : e;
}
function Gn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return _n(t), a(...e);
	}, e.clear = function(...e) {
		return _n(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return _n(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (_n(t), t.hasOnOperate) {
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
				let r = q(n, i), a = r ? r.copy || r.self : n;
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
function Kn(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && bt.includes(r) || i === "Array" && vt.includes(r) || i === "Map" && yt.includes(r))) && _n(n);
}
function qn(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Jn(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = Wn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Kn({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Ct[o] || [];
	if (Kt(i) && m.includes(n)) return n === "slice" ? f.slice : (xt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = q(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = q(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = q(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : sn(e);
		} else g();
		let t = p[r];
		H(t) || c.newNodeMap.delete(qn(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !H(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(qn(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Yn(e) {
	if (H(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Yn), Object.freeze(e);
	if (Gt(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = V;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (Wt(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = V;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Yn(n);
	}), Object.freeze(e);
}
function Xn(e) {
	if (!e) return e;
	let t = Sn(e);
	return t ? t.self : e;
}
var Zn = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], Qn = {};
Zn.forEach((e) => Qn[e] = 1);
var $n = {
	[z]: 1,
	Set: 1,
	Map: 1
}, er = /* @__PURE__ */ new Map();
function tr(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[st] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Lt.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = Pt(), p.metaVer = d, gn.set(d, p));
	let m = t.autoRevoke ?? Lt.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (Ct[f] || []).includes(t) ? (S = !0, l = (wt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (ot === t) return d;
				let n = e[t];
				if (ut.includes(t)) {
					if (Kt(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !Vt(e, t)) return n;
				let l = n, u = K(e, p), f = Pn(t, u, q(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return $n[h] && Qn[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Un(n, {
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
				}), h === "Array" && Xt(t) || dt[h] && (l = Jn(e, {
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
				let a = !0, s = K(t, p), c = !1, l = i;
				if (bn(i)) if (c = !0, In(i, d)) {
					if (Wn(i, p) === t[r]) return !0;
					let e = K(i, p);
					Pn(r, s, e), on(e, s.keyPath.concat(r));
				} else e = !1;
				else if ($t(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = J(i);
					if (o.sourceId !== n) l = Xn(i);
					else {
						let { isGetted: n, val: i } = ln(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = J(i);
						Tn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = G(e, t);
							n && Tn(o, J(i), r);
						}), on(c, u), dn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Xt(r)) return l = y("set", r, {
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
				return u && Jn(t, {
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
				let n = K(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), Jn(e, {
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
				if (H(e)) throw Error("base state can not be primitive");
				if (u) return er.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || En(e), l = K(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = Vn("", n, {
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
				return Bn(f), f.execOnOperate = y, er.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return er.delete(t), t;
				let r = K(t, p);
				if (r.isImmutBase && !n) return t;
				let i = zn(r, p);
				return l && e && (i = Yn(i)), gn.delete(d), er.delete(t), Dn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function nr(e) {
	if (!Kt(e)) throw Error("produce callback is not a function");
}
var rr = "Not a Limu root draft";
function ir(e) {
	let t = er.get(e);
	if (!t) throw Cn(e) && wn(e)?.level === 0 ? Error("Draft has been finished!") : Error(rr);
	return t;
}
function ar(e, t) {
	return tr(t).createDraft(e);
}
function or(e) {
	return ir(e)(e);
}
function sr(e, t) {
	if (Jt(e) || Yt(t)) throw Error("produce callback can not be a promise function or result");
}
function cr(e, t, n) {
	nr(t);
	let r = ar(e, n);
	return sr(t, t(r)), or(r);
}
function lr(e, t, n) {
	if (!t || !Kt(t)) {
		let n = e, r = t;
		return nr(e), (e) => cr(e, n, r);
	}
	return cr(e, t, n);
}
var ur = lr;
function dr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function fr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function pr(e, t) {
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
		}, r = dr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => ur(t, e));
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
			let n = dr(t), r = e[t], i = c[`set${n}`];
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
		fr(l, e);
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
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.module.js
function mr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function hr(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function gr(e, t) {
	this.props = e, this.context = t;
}
(gr.prototype = new C()).isPureReactComponent = !0, gr.prototype.shouldComponentUpdate = function(e, t) {
	return hr(this.props, e) || hr(this.state, t);
};
var _r = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), _r && _r(e);
}, typeof Symbol < "u" && Symbol.for;
var vr = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	vr(e, t, n, r);
};
var yr = t.unmount;
function br(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = mr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return br(e, t, n);
	})), e;
}
function xr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return xr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Sr() {
	this.__u = 0, this.o = null, this.__b = null;
}
function Cr(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function wr() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), yr && yr(e);
}, (Sr.prototype = new C()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = Cr(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = xr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, Sr.prototype.componentWillUnmount = function() {
	this.o = [];
}, Sr.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = br(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && b(S, null, e.fallback);
	return i && (i.__u &= -33), [b(S, null, t.__a ? null : e.children), i];
};
var Tr = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(wr.prototype = new C()).__a = function(e) {
	var t = this, n = Cr(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), Tr(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, wr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = A(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, wr.prototype.componentDidUpdate = wr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		Tr(e, n, t);
	});
};
var Er = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Dr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Or = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, kr = /[A-Z0-9]/g, Ar = typeof document < "u", jr = function(e) {
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
var Mr = t.event;
t.event = function(e) {
	return Mr && (e = Mr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Nr = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, Pr = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || Ar && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || jr(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : Or.test(a) && (a = s) : s = a = "oninput" : i && Dr.test(a) ? a = a.replace(kr, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Nr)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = Er, Pr && Pr(e);
};
var Fr = t.__r;
t.__r = function(e) {
	Fr && Fr(e), e.__c;
};
var Ir = t.diffed;
t.diffed = function(e) {
	Ir && Ir(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Lr(e) {
	return pr(e, {
		useEffect: Ke,
		useRef: qe,
		useState: We
	});
}
//#endregion
//#region src/root/store.ts
var Y = Lr({ parameters: at }), Rr = {
	getParameterSpecs() {
		return [
			{ id: "time" },
			{ id: "feed" },
			{ id: "tone" },
			{ id: "mix" },
			{ id: "lfoRate" },
			{ id: "lfoDepth" },
			{
				id: "safety",
				steps: 2
			}
		];
	},
	getParameter(e) {
		let { parameters: t } = Y.state;
		if (e === "time") {
			let e = R.indexOf(t.time);
			return e >= 0 ? e / (R.length - 1) : void 0;
		}
		return e === "safety" ? +!!t.safety : t[e];
	},
	setParameter(e, t) {
		if (e === "time") {
			let e = Math.round(t * (R.length - 1));
			if (0 <= e && e < R.length) {
				let t = R[e];
				Y.patchParameters({ time: t });
			}
		} else e === "safety" ? Y.patchParameters({ safety: t > .5 }) : Y.patchParameters({ [e]: t });
	}
};
//#endregion
//#region src/root/ping-pong-delay-effect.ts
function zr(e) {
	let t = {
		bpm: 120,
		parameters: {
			isOn: !0,
			time: .5,
			tone: .5,
			lfoOn: !0,
			lfoRate: .5,
			lfoDepth: .5,
			feed: .5,
			mix: .5,
			safety: !0
		}
	}, n = e.createGain(), r = e.createGain(), i = e.createChannelSplitter(2), a = e.createChannelMerger(2), o = e.createDelay(4), s = e.createDelay(4), c = e.createGain(), l = e.createBiquadFilter();
	l.type = "lowpass";
	let u = e.createGain(), d = e.createGain(), f = e.createOscillator();
	f.type = "sine";
	let p = e.createGain(), m = e.createGain();
	n.connect(u), u.connect(r), n.connect(i), i.connect(o, 0), i.connect(s, 1), o.connect(l), s.connect(l), l.connect(c), c.connect(s), c.connect(o), o.connect(a, 0, 0), s.connect(a, 0, 1), a.connect(d), d.connect(r), f.connect(p), f.connect(m), p.connect(o.delayTime), m.connect(s.delayTime), f.start();
	function h() {
		let n = e.currentTime, { parameters: r, bpm: i } = t;
		if (!r.isOn) {
			u.gain.setTargetAtTime(1, n, .01), d.gain.setTargetAtTime(0, n, .01), c.gain.setTargetAtTime(0, n, .01);
			return;
		}
		let a = 60 / i, h = a * r.time;
		if (r.safety) {
			let e = a * r.time, t = Math.min(.95, .5 + e * .25), i = r.feed * t * (1 - r.mix * .05);
			c.gain.setTargetAtTime(i, n, .05);
		} else {
			let e = r.feed * .96;
			c.gain.setTargetAtTime(e, n, .05);
		}
		o.delayTime.setTargetAtTime(h, n, .1), s.delayTime.setTargetAtTime(h + .02, n, .1);
		let g = 200 * (1e4 / 200) ** r.tone;
		if (l.frequency.setTargetAtTime(g, n, .05), u.gain.setTargetAtTime(1 - r.mix, n, .05), d.gain.setTargetAtTime(r.mix, n, .05), r.lfoOn) {
			let e = .05 * (3 / .05) ** r.lfoRate;
			f.frequency.setTargetAtTime(e, n, .1);
			let t = r.lfoDepth * .004;
			p.gain.setTargetAtTime(t, n, .1), m.gain.setTargetAtTime(-t, n, .1);
		} else p.gain.setTargetAtTime(0, n, .1), m.gain.setTargetAtTime(0, n, .1);
	}
	return h(), {
		inputNode: n,
		outputNode: r,
		setParameters(e) {
			t.parameters = e, h();
		},
		setBpm(e) {
			t.bpm = e, h();
		},
		cleanup() {
			f.stop(), f.disconnect(), p.disconnect(), m.disconnect(), o.disconnect(), s.disconnect(), c.disconnect(), l.disconnect(), u.disconnect(), d.disconnect(), n.disconnect(), r.disconnect(), i.disconnect(), a.disconnect();
		}
	};
}
//#endregion
//#region src/root/engine.ts
function Br(e) {
	let t = e?.audioContext ?? new AudioContext(), n = zr(t), r = e?.audioOutputNode ?? t.destination;
	return {
		setup() {
			e?.audioInputNode.connect(n.inputNode), n.outputNode.connect(r);
		},
		teardown() {
			e?.audioInputNode.disconnect(n.inputNode), n.outputNode.disconnect(r), n.cleanup();
		},
		setParameters: n.setParameters,
		setBpm: n.setBpm
	};
}
//#endregion
//#region src/common/parameter-helper.ts
function Vr(e) {
	let t = R.map((t) => Math.abs(t - e)), n = Math.min(...t);
	return t.indexOf(n) ?? 0;
}
//#endregion
//#region src/root/persistence.ts
function Hr(e) {
	return e * 255 >>> 0;
}
function Ur(e) {
	return e / 255;
}
var Wr = {
	emitStateBytes() {
		let { parameters: e } = Y.state, t = Vr(e.time);
		return new Uint8Array([
			+!!e.isOn,
			t,
			Hr(e.feed),
			Hr(e.tone),
			Hr(e.mix),
			+!!e.lfoOn,
			Hr(e.lfoRate),
			Hr(e.lfoDepth),
			+!!e.safety
		]);
	},
	applyStateBytes(e) {
		if (e.length !== 9) return;
		let t = e[0] !== 0, n = R[e[1]], r = Ur(e[2]), i = Ur(e[3]), a = Ur(e[4]), o = e[5] !== 0, s = Ur(e[6]), c = Ur(e[7]), l = e[8] !== 0;
		Y.assign({ parameters: {
			isOn: t,
			time: n,
			feed: r,
			tone: i,
			mix: a,
			lfoOn: o,
			lfoRate: s,
			lfoDepth: c,
			safety: l
		} });
	}
}, Gr = nt("wafer-v01", import.meta.url), Kr = Br(Gr);
function qr() {
	return Y.subscribe(({ parameters: e }) => {
		e && Kr.setParameters(e);
	});
}
function Jr() {
	Kr.setup(), Kr.setParameters(Y.state.parameters), Gr?.completeSetup({
		unitAspects: {
			unitType: "effect",
			viewSize: [320, 210]
		},
		hostCallbacks: { setBpm: Kr.setBpm },
		persistence: Wr,
		automationInput: Rr,
		cleanup: () => Kr.teardown()
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@yahiro07+qulex@0.1.7/node_modules/@yahiro07/qulex/dist/jsxRuntime.module-CrL-Xjas.js
var Yr = 0;
Array.isArray;
function Xr(e, n, r, i, a, o) {
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
		__v: --Yr,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region ../../../node_modules/.pnpm/@yahiro07+qulex@0.1.7/node_modules/@yahiro07/qulex/dist/jsx-runtime.js
function X(e, t, n) {
	return be(Xr, e, t, n);
}
function Z(e, t, n) {
	return be(Xr, e, t, n);
}
//#endregion
//#region src/components/button-with-indicator.tsx
var Zr = ({ active: e, onClick: t }) => /* @__PURE__ */ X("div", {
	sx: [P.wh(36, 36).bg("#999").bd("#555").rounded(8).p(.75), P.flexHA().cursor("pointer")],
	onClick: t,
	children: /* @__PURE__ */ X("div", { sx: [P.wh(10, 10).rounded("full").bd("#444"), P.bg(e ? "#0f0" : "#666")] })
}), Qr = ({ children: e, className: t }) => /* @__PURE__ */ X("div", {
	sx: [
		P.bg("#ffe899").p(4).color("#333").rounded(2),
		P.bd("inset 1px #0004"),
		t
	],
	children: e
});
//#endregion
//#region src/utils/drag-session.ts
function $r(e, t, n) {
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
//#region src/utils/helpers.ts
function ei(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function ti(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? ei(o, Math.min(r, i), Math.max(r, i)) : o;
}
function ni(e) {
	return `${e}px`;
}
//#endregion
//#region src/components/headless/knob-frame.tsx
function ri(e) {
	return /* @__PURE__ */ X("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			$r(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = ei(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
//#region src/components/knob.tsx
var Q = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, onClick: a, disabled: o }) => {
	let s = ti(e, n, r, -135, 135);
	return /* @__PURE__ */ X(ri, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ X("div", {
			sx: P.wh(34, 34).rounded("100%").relative().bg("#777").bd("#444"),
			style: { opacity: o ? .5 : 1 },
			children: /* @__PURE__ */ X("div", {
				sx: P.full().flexVA(),
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ X("div", { sx: P.wh(2, 10).bg("#fff") })
			})
		})
	});
}, $ = ({ className: e, label: t, children: n, labelAlign: r = "center", width: i }) => /* @__PURE__ */ Z("div", {
	sx: [P.flexV(), e],
	style: i ? { width: ni(i) } : void 0,
	children: [/* @__PURE__ */ X("div", {
		sx: P.fontSize(11).weight("bold"),
		style: { textAlign: r },
		children: t
	}), /* @__PURE__ */ X("div", {
		sx: P.flexC().h(40),
		children: n
	})]
}), ii = ({ value: e, onChange: t, options: n }) => {
	let r = n.findIndex((t) => t.value === e), i = n.length;
	return /* @__PURE__ */ X(Q, {
		value: r,
		min: 0,
		max: i - 1,
		step: 1,
		onChange: (e) => {
			t(n[e].value);
		}
	});
}, ai = () => {
	let { parameters: e } = Y.useSnapshot(), t = (t, n) => {
		Y.setParameters({
			...e,
			[t]: n
		});
	};
	return /* @__PURE__ */ Z("div", {
		sx: P.flexVC().gap(5),
		children: [
			/* @__PURE__ */ Z("div", {
				sx: P.flexHA().gap(2),
				children: [
					/* @__PURE__ */ X($, {
						label: "On",
						width: 48,
						children: /* @__PURE__ */ X(Zr, {
							active: e.isOn,
							onClick: () => t("isOn", !e.isOn)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Time",
						width: 48,
						className: je(P.relative()),
						children: [/* @__PURE__ */ X(ii, {
							options: it,
							value: e.time,
							onChange: (e) => t("time", e)
						}), /* @__PURE__ */ X("div", {
							sx: [P.absolute().bottom(-14).left(0).fontSize(12).w(48), P.flexC()],
							children: e.time.toString()
						})]
					}),
					/* @__PURE__ */ X($, {
						label: "Feed",
						width: 48,
						children: /* @__PURE__ */ X(Q, {
							value: e.feed,
							onChange: (e) => t("feed", e)
						})
					}),
					/* @__PURE__ */ X($, {
						label: "Tone",
						width: 48,
						children: /* @__PURE__ */ X(Q, {
							value: e.tone,
							onChange: (e) => t("tone", e)
						})
					}),
					/* @__PURE__ */ X($, {
						label: "Mix",
						width: 48,
						children: /* @__PURE__ */ X(Q, {
							value: e.mix,
							onChange: (e) => t("mix", e)
						})
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				sx: P.flexHA().gap(2),
				children: [
					/* @__PURE__ */ X($, {
						label: "LFO",
						width: 48,
						children: /* @__PURE__ */ X(Zr, {
							active: e.lfoOn,
							onClick: () => t("lfoOn", !e.lfoOn)
						})
					}),
					/* @__PURE__ */ X($, {
						label: "Rate",
						width: 48,
						children: /* @__PURE__ */ X(Q, {
							value: e.lfoRate,
							onChange: (e) => t("lfoRate", e)
						})
					}),
					/* @__PURE__ */ X($, {
						label: "Depth",
						width: 48,
						children: /* @__PURE__ */ X(Q, {
							value: e.lfoDepth,
							onChange: (e) => t("lfoDepth", e)
						})
					})
				]
			}),
			!1
		]
	});
}, oi = () => {
	let { parameters: e } = Y.useSnapshot(), t = (t, n) => {
		Y.setParameters({
			...e,
			[t]: n
		});
	};
	return /* @__PURE__ */ X("div", { children: /* @__PURE__ */ Z("label", {
		sx: P.flexH().gap(1),
		children: [/* @__PURE__ */ X("input", {
			type: "checkbox",
			checked: e.safety,
			onChange: (e) => t("safety", e.currentTarget.checked)
		}), "safety"]
	}) });
}, si = () => /* @__PURE__ */ X("div", {
	sx: P.flexC(),
	children: /* @__PURE__ */ X(Qr, {
		className: je(P.wh(320, 210), P.flexVC()),
		children: /* @__PURE__ */ Z("div", {
			sx: P.flexV().gap(3),
			children: [/* @__PURE__ */ Z("div", {
				sx: P.flexHA().gap(2).fJustify("between"),
				children: [/* @__PURE__ */ X("div", {
					sx: P.fontSize(18).weight("bold"),
					children: "Sunset Delay"
				}), /* @__PURE__ */ X(oi, {})]
			}), /* @__PURE__ */ X(ai, {})]
		})
	})
});
//#endregion
//#region src/root/app.tsx
Jr();
var ci = () => (Ke(qr, []), /* @__PURE__ */ X(si, {})), li = he((e) => (pe(/* @__PURE__ */ X(ci, {}), e), () => {
	pe(null, e);
}), {
	cssTexts: ["*{box-sizing:border-box;margin:0;padding:0}body{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"],
	adoptedStyleSheets: [Me.sheet]
});
//#endregion
export { li as default };
