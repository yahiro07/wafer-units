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
		o.__v = n.__v + 1, t.vnode && t.vnode(o), ie(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, oe(i, o, a), n.__e = n.__ = null, o.__e != r && T(o);
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
	for (c = O(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = ie(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && le(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = k(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function O(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = ne(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), ue(s, s));
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
function j(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function M(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || j(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || j(e.style, t, n[t]);
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
function re(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function ie(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, A, ne, j, M = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof M == "function") {
		f = s.length;
		try {
			if (T = n.props, E = M.prototype && M.prototype.render, D = (d = M.contextType) && i[d.__c], O = d ? D ? D.props.value : d.__ : i, r.__c ? ee = (p = n.__c = r.__c).__ = p.__E : (E ? n.__c = p = new M(T, O) : (n.__c = p = new C(T, O), p.constructor = M, p.render = de), D && D.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), E && p.__s == null && (p.__s = p.state), E && M.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, M.getDerivedStateFromProps(T, p.__s))), g = p.props, b = p.state, p.__v = n, m) E && M.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), E && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (E && M.getDerivedStateFromProps == null && T !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(T, O), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(T, p.__s, O)) {
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
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), ne = d != null && d.type === S && d.key == null ? se(d.props.children) : d, c = te(e, _(ne) ? ne : [ne], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (j = o.length; j--;) y(o[j]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || ae(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = ce(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function ae(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(ae));
}
function oe(e, n, r) {
	for (var i = 0; i < r.length; i++) le(r[i], r[++i], r[++i]);
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
function se(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(se) : e.constructor === void 0 ? v({}, e) : null;
}
function ce(n, r, i, a, o, s, c, l, u) {
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || M(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || M(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), te(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && M(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && M(n, d, b, x[d], o));
	}
	return n;
}
function le(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function ue(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || le(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && ue(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function de(e, t, n) {
	return this.constructor(e, n);
}
function fe(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], ie(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), oe(s, n, c), n.props.children = null;
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
}, D.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = re(!1), p = re(!0);
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function pe(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function me(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				pe(e);
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
var he = (() => {
	let e, t = [];
	for (let n = 0; n < 256; n++) {
		e = n;
		for (let t = 0; t < 8; t++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})(), ge = (e) => {
	let t = -1;
	for (let n = 0; n < e.length; n++) t = t >>> 8 ^ he[(t ^ e.charCodeAt(n)) & 255];
	return ((t ^ -1) >>> 0).toString(16).padStart(8, "0");
};
function N(e) {
	return `${e}px`;
}
function P(e) {
	return N(e * 4);
}
var _e = {
	full: "100%",
	vw: "100vw",
	vh: "100vh",
	dvw: "100dvw",
	dvh: "100dvh"
};
function ve(e) {
	return _e[e] ?? (typeof e == "number" ? N(e) : e);
}
var ye = {
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
	gap: (e) => ({ gap: N(e * 4) }),
	grow: () => ({ flexGrow: 1 }),
	w: (e) => ({ width: ve(e) }),
	h: (e) => ({ height: ve(e) }),
	wh: (e, t) => ({
		width: ve(e),
		height: ve(t)
	}),
	bg: (e) => ({ background: e }),
	bd: (e) => ({ border: e.includes(" ") ? e : `solid 1px ${e}` }),
	p: (e) => ({ padding: P(e) }),
	pt: (e) => ({ paddingTop: P(e) }),
	pb: (e) => ({ paddingBottom: P(e) }),
	pl: (e) => ({ paddingLeft: P(e) }),
	pr: (e) => ({ paddingRight: P(e) }),
	px: (e) => ({
		paddingLeft: P(e),
		paddingRight: P(e)
	}),
	py: (e) => ({
		paddingTop: P(e),
		paddingBottom: P(e)
	}),
	m: (e) => ({ margin: P(e) }),
	ml: (e) => ({ marginLeft: P(e) }),
	mr: (e) => ({ marginRight: P(e) }),
	mt: (e) => ({ marginTop: P(e) }),
	mb: (e) => ({ marginBottom: P(e) }),
	mx: (e) => ({
		marginLeft: P(e),
		marginRight: P(e)
	}),
	my: (e) => ({
		marginTop: P(e),
		marginBottom: P(e)
	}),
	color: (e) => ({ color: e }),
	weight: (e) => ({ fontWeight: e }),
	inlineBlock: () => ({ display: "inline-block" }),
	fontSize: (e) => ({ fontSize: N(e) }),
	rounded: (e) => (e === "full" && (e = "100%"), { borderRadius: typeof e == "number" ? N(e) : e }),
	relative: () => ({ position: "relative" }),
	absolute: () => ({ position: "absolute" }),
	full: () => ({
		width: "100%",
		height: "100%"
	}),
	css: (e) => e,
	cursor: (e) => ({ cursor: e }),
	minW: (e) => ({ minWidth: N(e) }),
	invisible: () => ({ visibility: "hidden" }),
	addClass: (e) => e,
	top: (e) => ({ top: N(e) }),
	right: (e) => ({ right: N(e) }),
	bottom: (e) => ({ bottom: N(e) }),
	left: (e) => ({ left: N(e) }),
	opacity: (e) => ({ opacity: e }),
	pointerEvents: (e) => ({ pointerEvents: e }),
	overflow: (e) => ({ overflow: e }),
	overflowXY: (e, t) => ({
		overflowX: e,
		overflowY: t
	})
}, be = (e) => e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
function xe(e) {
	let t = "";
	for (let n in e) t += `${be(n)}:${e[n]};`;
	return t;
}
function Se(...e) {
	return e.filter(Boolean).join(" ");
}
function Ce(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, (...e) => t(n(...e))]));
}
function we(e, t) {
	let n = t ? { ...t } : {}, r = [], i, a = () => {
		if (i !== void 0) return i;
		let t = e(n);
		return r.length > 0 && (t += ` ${r.join(" ")}`), i = t, t;
	}, o;
	return o = {
		get it() {
			return a();
		},
		...Ce(ye, (e) => {
			if (typeof e == "string") r.push(e);
			else if (typeof e == "object") if (e.__isQCursor) Object.assign(n, e.getStylesObject());
			else for (let t in e) n[t] = e[t];
			return i = void 0, o;
		})
	}, o;
}
function Te() {
	let e = new CSSStyleSheet(), t = /* @__PURE__ */ new Set(), n = (n) => {
		let r = xe(n);
		if (r === "") return "";
		let i = `cs-${ge(r)}`;
		if (!t.has(i)) {
			t.add(i);
			let n = `.${i}{${r}}`;
			try {
				e.insertRule(n, e.cssRules.length);
			} catch (e) {
				console.error(`Failed to insert rule: ${n}`, e);
			}
		}
		return i;
	};
	return {
		qu: Ce(ye, (e) => we(n, e)),
		cz: Se,
		cssRealm: { sheet: e }
	};
}
//#endregion
//#region src/common/css-realm.ts
var { qu: F, cz: Ee, cssRealm: De } = Te(), Oe, I, ke, Ae, je = 0, Me = [], L = t, Ne = L.__b, Pe = L.__r, Fe = L.diffed, Ie = L.__c, Le = L.unmount, Re = L.__;
function ze(e, t) {
	L.__h && L.__h(I, e, je || t), je = 0;
	var n = I.__H || (I.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Be(e) {
	return je = 1, Ve(Ze, e);
}
function Ve(e, t, n) {
	var r = ze(Oe++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Ze(void 0, t), function(e) {
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
function He(e, t) {
	var n = ze(Oe++, 3);
	!L.__s && Xe(n.__H, t) && (n.__ = e, n.u = t, I.__H.__h.push(n));
}
function Ue(e) {
	return je = 5, We(function() {
		return { current: e };
	}, []);
}
function We(e, t) {
	var n = ze(Oe++, 7);
	return Xe(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ge() {
	for (var e; e = Me.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Je), t.__h.some(Ye), t.__h = [];
		} catch (n) {
			t.__h = [], L.__e(n, e.__v);
		}
	}
}
L.__b = function(e) {
	I = null, Ne && Ne(e);
}, L.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Re && Re(e, t);
}, L.__r = function(e) {
	Pe && Pe(e), Oe = 0;
	var t = (I = e.__c).__H;
	t && (ke === I ? (t.__h = [], I.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Je), t.__h.some(Ye), t.__h = [], Oe = 0)), ke = I;
}, L.diffed = function(e) {
	Fe && Fe(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Me.push(t) !== 1 && Ae === L.requestAnimationFrame || ((Ae = L.requestAnimationFrame) || qe)(Ge)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), ke = I = null;
}, L.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Je), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ye(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], L.__e(n, e.__v);
		}
	}), Ie && Ie(e, t);
}, L.unmount = function(e) {
	Le && Le(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Je(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && L.__e(t, n.__v));
};
var Ke = typeof requestAnimationFrame == "function";
function qe(e) {
	var t, n = function() {
		clearTimeout(r), Ke && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Ke && (t = requestAnimationFrame(n));
}
function Je(e) {
	var t = I, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), I = t;
}
function Ye(e) {
	var t = I;
	e.__c = e.__(), I = t;
}
function Xe(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Ze(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function Qe(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/utils/selector-option.ts
function $e(e) {
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
], et = $e([
	.333,
	.5,
	.666,
	.75,
	1,
	1.5,
	2,
	2.5,
	3
]), tt = {
	isOn: !0,
	time: 1,
	tone: .5,
	feed: .5,
	mix: .5,
	lfoOn: !0,
	lfoRate: .5,
	lfoDepth: .5,
	safety: !0
}, nt = Symbol("V"), rt = Symbol("IMMUT_BASE"), it = Symbol("IS_RAW"), at = Symbol("P"), z = "Array", ot = [
	Symbol.iterator,
	Symbol.toStringTag,
	it
], st = {
	Map: "Map",
	Set: "Set",
	Array: z
}, ct = "[object Object]", lt = "[object Map]", ut = "[object Set]", dt = "[object Array]", ft = "[object Function]", pt = {
	[lt]: "Map",
	[ut]: "Set",
	[dt]: z,
	[ct]: "Object"
}, mt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], ht = [
	"set",
	"clear",
	"delete"
], gt = [
	"add",
	"clear",
	"delete"
], _t = [
	"splice",
	"sort",
	"unshift",
	"shift"
], vt = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), yt = {
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
	[z]: vt
}, bt = {
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
}, xt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[z]: ["forEach", "map"]
};
function St(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var Ct = {
	value: 0,
	prefixSeed: 1
}, wt = {
	value: 0,
	prefixSeed: 1
}, Tt = {
	value: 0,
	prefixSeed: 1
}, Et = {
	value: 0,
	prefixSeed: 1
}, Dt = {}, Ot = {};
function kt() {
	return St(wt, "MID_");
}
function At() {
	return St(Ct, "MV_");
}
function jt() {
	return St(Tt, "SI_");
}
function Mt() {
	return St(Et, "SR_");
}
var Nt = {
	autoFreeze: !1,
	autoRevoke: !0
}, Pt = Object.prototype.toString, Ft = !!Reflect, It = Object.prototype.hasOwnProperty;
function Lt(e, t) {
	return Ft ? Reflect.has(e, t) : It.call(e, t);
}
function Rt(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		U(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), H(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), zt(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function B(e) {
	return Pt.call(e);
}
function V(...e) {
	return e;
}
function zt(e) {
	return B(e) === ct;
}
function H(e) {
	return B(e) === lt;
}
function Bt(e) {
	return B(e) === ut;
}
function Vt(e) {
	return B(e) === ft;
}
function Ht(e) {
	return pt[B(e)];
}
function U(e) {
	let t = B(e);
	return ![
		ct,
		dt,
		lt,
		ut,
		ft
	].includes(t);
}
function Ut(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Wt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Gt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Kt(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function qt(e) {
	return e && e[nt] || "";
}
function Jt(e, t) {
	let n = qt(e);
	return n ? n !== t : !1;
}
function Yt(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && zt(e) && (n = Object.assign({}, e)), H(e) && (n = new Map(e)), Bt(e) && (n = new Set(e)), n;
}
function Xt(e, t) {
	return t.immutBase ? e : Yt(e, t.readOnly);
}
function Zt(e) {
	let t = e;
	if (!Kt(e)) return e;
	let n = Dt[t];
	return n || (n = jt(), Dt[t] = n), n;
}
function Qt(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function W(e, t) {
	let n = e;
	return t && (n = G(e, !0)), n.join("|");
}
function G(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = Zt(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Zt(i);
	return n[r] = a, n;
}
function $t(e) {
	return e.map((e) => Ot[e] || e);
}
function en(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || G(t);
	Qt(i, a) < 0 && (r.push(t), i.push(a));
}
function tn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Qt(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function nn(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function K(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = H(r) ? nn(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function rn(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = K(e, i);
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
function an(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = H(r) ? nn(r, a) : r[a];
	}
}
function on(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		an(e, r, n);
	}
}
function sn(e, t) {
	let n = W(e), r = "";
	for (let e of t) {
		let t = `${W(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = $t(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var cn = /* @__PURE__ */ new Map(), ln = /* @__PURE__ */ new Map(), un = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new Map();
function fn(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function pn(e, t, n) {
	let r = [t], i = q(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function mn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Ht(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Zt(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = gn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = pn(y, e, s), f = G(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = W(i.arrKeyPath, !0), n = Tn(u, e);
			t = sn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = Tn(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = K(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = K(e, t);
				if (!a) {
					let { val: n } = K(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(G(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(G(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: kt(),
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
function hn(e) {
	if (!e) return !1;
	let t = yn(e);
	return t ? !t.isImmutBase : !1;
}
function gn(e, t) {
	let n = J(e, t);
	return n ? n.level + 1 : 1;
}
function q(e, t) {
	return t.metaMap.get(e);
}
function J(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Y(e) || null : null;
}
function _n(e) {
	return e && Y(e) || null;
}
function vn(e) {
	return e && e[nt] || "";
}
function yn(e) {
	return Y(e) || null;
}
function Y(e) {
	return e[at];
}
function bn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function xn(e) {
	return un.get(e) || Mt();
}
function Sn(e, t) {
	return un.set(e, t);
}
function Cn(e) {
	return cn.get(e);
}
function wn(e, t, n) {
	let r = cn.get(e);
	r || (r = {}, cn.set(e, r)), r[t] = n;
}
function Tn(e, t) {
	let n = Cn(e);
	return n && n[t] || [];
}
function En(e) {
	return ln.get(e) || [];
}
function Dn(e, t, n) {
	let r = cn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (ln.get(e) || []).filter((e, n) => !t.includes(n));
	ln.set(e, i);
}
function On(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => wn(n, e, r));
	let i = ln.get(n) || [], a = r.map((e) => W(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = W(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => W(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), ln.set(n, i);
}
function kn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = G(i), s = G(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		en(n, a, s), On(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function An(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function jn(e, t) {
	return !zt(e) || vn(e) === t;
}
function Mn(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Rt(n, i, a, (e, n, r) => {
			let i = J(e, t);
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
		if (p === "Array") return An(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function Nn(e, t) {
	let n = En(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = K(e.proxyVal, t), i = _n(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(W(e)));
		else if (n) for (let e of o) an(t, e, n.copy);
		else if (s) for (let e of o) an(t, e, s.self);
	}
	i.length && Dn(e.sourceId, i, a);
}
function Pn(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), Nn(e, a), Mn(e, t), a;
}
function Fn(e) {
	e.rootMeta.scopes.push(e);
}
function In(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = mn(e, t, n), c = Xt(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => at === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = V;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : V;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function Ln(e, t) {
	return e === "Array" || (xt[e] || []).includes(t);
}
function Rn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (U(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Vt(e)) {
			if (r.newNodeStats[c] || e[it]) return e;
			let n = q(e, o);
			return n || (n = In(c, e, t), Fn(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!Ln(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Bn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Bn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function zn(e, t) {
	if (!zt(e)) return e;
	let n = q(e, t);
	return n ? n.copy : e;
}
function Bn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return fn(t), a(...e);
	}, e.clear = function(...e) {
		return fn(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return fn(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (fn(t), t.hasOnOperate) {
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
				let r = J(n, i), a = r ? r.copy || r.self : n;
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
function Vn(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && gt.includes(r) || i === "Array" && mt.includes(r) || i === "Map" && ht.includes(r))) && fn(n);
}
function Hn(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Un(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = zn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Vn({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = yt[o] || [];
	if (Vt(i) && m.includes(n)) return n === "slice" ? f.slice : (_t.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = J(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = J(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = J(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : tn(e);
		} else g();
		let t = p[r];
		U(t) || c.newNodeMap.delete(Hn(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !U(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(Hn(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Wn(e) {
	if (U(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Wn), Object.freeze(e);
	if (Bt(e)) {
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
		Wn(n);
	}), Object.freeze(e);
}
function Gn(e) {
	if (!e) return e;
	let t = _n(e);
	return t ? t.self : e;
}
var Kn = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], qn = {};
Kn.forEach((e) => qn[e] = 1);
var Jn = {
	[z]: 1,
	Set: 1,
	Map: 1
}, Yn = /* @__PURE__ */ new Map();
function Xn(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[rt] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Nt.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = At(), p.metaVer = d, dn.set(d, p));
	let m = t.autoRevoke ?? Nt.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (yt[f] || []).includes(t) ? (S = !0, l = (bt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (nt === t) return d;
				let n = e[t];
				if (ot.includes(t)) {
					if (Vt(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !Lt(e, t)) return n;
				let l = n, u = q(e, p), f = kn(t, u, J(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return Jn[h] && qn[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Rn(n, {
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
				}), h === "Array" && Gt(t) || st[h] && (l = Un(e, {
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
				let a = !0, s = q(t, p), c = !1, l = i;
				if (hn(i)) if (c = !0, jn(i, d)) {
					if (zn(i, p) === t[r]) return !0;
					let e = q(i, p);
					kn(r, s, e), en(e, s.keyPath.concat(r));
				} else e = !1;
				else if (Jt(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Y(i);
					if (o.sourceId !== n) l = Gn(i);
					else {
						let { isGetted: n, val: i } = rn(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Y(i);
						bn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = K(e, t);
							n && bn(o, Y(i), r);
						}), en(c, u), on(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Gt(r)) return l = y("set", r, {
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
				return u && Un(t, {
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
				let n = q(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), Un(e, {
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
				if (U(e)) throw Error("base state can not be primitive");
				if (u) return Yn.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || xn(e), l = q(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = In("", n, {
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
				return Fn(f), f.execOnOperate = y, Yn.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return Yn.delete(t), t;
				let r = q(t, p);
				if (r.isImmutBase && !n) return t;
				let i = Pn(r, p);
				return l && e && (i = Wn(i)), dn.delete(d), Yn.delete(t), Sn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Zn(e) {
	if (!Vt(e)) throw Error("produce callback is not a function");
}
var Qn = "Not a Limu root draft";
function $n(e) {
	let t = Yn.get(e);
	if (!t) throw vn(e) && yn(e)?.level === 0 ? Error("Draft has been finished!") : Error(Qn);
	return t;
}
function er(e, t) {
	return Xn(t).createDraft(e);
}
function tr(e) {
	return $n(e)(e);
}
function nr(e, t) {
	if (Ut(e) || Wt(t)) throw Error("produce callback can not be a promise function or result");
}
function rr(e, t, n) {
	Zn(t);
	let r = er(e, n);
	return nr(t, t(r)), tr(r);
}
function ir(e, t, n) {
	if (!t || !Vt(t)) {
		let n = e, r = t;
		return Zn(e), (e) => rr(e, n, r);
	}
	return rr(e, t, n);
}
var ar = ir;
function or(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function sr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function cr(e, t) {
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
		}, r = or(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => ar(t, e));
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
			let n = or(t), r = e[t], i = c[`set${n}`];
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
		sr(l, e);
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
function lr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function ur(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function dr(e, t) {
	this.props = e, this.context = t;
}
(dr.prototype = new C()).isPureReactComponent = !0, dr.prototype.shouldComponentUpdate = function(e, t) {
	return ur(this.props, e) || ur(this.state, t);
};
var fr = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), fr && fr(e);
}, typeof Symbol < "u" && Symbol.for;
var pr = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	pr(e, t, n, r);
};
var mr = t.unmount;
function hr(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = lr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return hr(e, t, n);
	})), e;
}
function gr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return gr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function _r() {
	this.__u = 0, this.o = null, this.__b = null;
}
function vr(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function yr() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), mr && mr(e);
}, (_r.prototype = new C()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = vr(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = gr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, _r.prototype.componentWillUnmount = function() {
	this.o = [];
}, _r.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = hr(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && b(S, null, e.fallback);
	return i && (i.__u &= -33), [b(S, null, t.__a ? null : e.children), i];
};
var br = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(yr.prototype = new C()).__a = function(e) {
	var t = this, n = vr(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), br(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, yr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = A(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, yr.prototype.componentDidUpdate = yr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		br(e, n, t);
	});
};
var xr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Sr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Cr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, wr = /[A-Z0-9]/g, Tr = typeof document < "u", Er = function(e) {
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
var Dr = t.event;
t.event = function(e) {
	return Dr && (e = Dr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Or = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, kr = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || Tr && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Er(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : Cr.test(a) && (a = s) : s = a = "oninput" : i && Sr.test(a) ? a = a.replace(wr, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Or)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = xr, kr && kr(e);
};
var Ar = t.__r;
t.__r = function(e) {
	Ar && Ar(e), e.__c;
};
var jr = t.diffed;
t.diffed = function(e) {
	jr && jr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Mr(e) {
	return cr(e, {
		useEffect: He,
		useRef: Ue,
		useState: Be
	});
}
//#endregion
//#region src/root/store.ts
var X = Mr({ parameters: tt }), Nr = {
	getParameterSpecs() {
		return [
			{ id: "time" },
			{ id: "feed" },
			{ id: "tone" },
			{ id: "mix" },
			{ id: "lfoRate" },
			{ id: "lfoDepth" },
			{ id: "safety" }
		];
	},
	getParameter(e) {
		let { parameters: t } = X.state;
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
				X.patchParameters({ time: t });
			}
		} else e === "safety" ? X.patchParameters({ safety: t > .5 }) : X.patchParameters({ [e]: t });
	}
};
//#endregion
//#region src/root/ping-pong-delay-effect.ts
function Pr(e) {
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
function Fr(e) {
	let t = e?.audioContext ?? new AudioContext(), n = Pr(t), r = e?.audioOutputNode ?? t.destination;
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
function Ir(e) {
	let t = R.map((t) => Math.abs(t - e)), n = Math.min(...t);
	return t.indexOf(n) ?? 0;
}
//#endregion
//#region src/root/persistence.ts
function Lr(e) {
	return e * 255 >>> 0;
}
function Rr(e) {
	return e / 255;
}
var zr = {
	emitStateBytes() {
		let { parameters: e } = X.state, t = Ir(e.time);
		return new Uint8Array([
			+!!e.isOn,
			t,
			Lr(e.feed),
			Lr(e.tone),
			Lr(e.mix),
			+!!e.lfoOn,
			Lr(e.lfoRate),
			Lr(e.lfoDepth),
			+!!e.safety
		]);
	},
	applyStateBytes(e) {
		if (e.length !== 9) return;
		let t = e[0] !== 0, n = R[e[1]], r = Rr(e[2]), i = Rr(e[3]), a = Rr(e[4]), o = e[5] !== 0, s = Rr(e[6]), c = Rr(e[7]), l = e[8] !== 0;
		X.assign({ parameters: {
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
}, Br = Qe("wafer-v01", import.meta.url), Vr = Fr(Br);
function Hr() {
	return X.subscribe(({ parameters: e }) => {
		e && Vr.setParameters(e);
	});
}
function Ur() {
	Vr.setup(), Vr.setParameters(X.state.parameters), Br?.completeSetup({
		unitAspects: {
			unitType: "effect",
			viewSize: [320, 210]
		},
		hostCallbacks: { setBpm: Vr.setBpm },
		persistence: zr,
		automationInput: Nr,
		cleanup: () => Vr.teardown()
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Wr = 0;
Array.isArray;
function Z(e, n, r, i, a, o) {
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
		__v: --Wr,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region src/components/button-with-indicator.tsx
var Gr = ({ active: e, onClick: t }) => /* @__PURE__ */ Z("div", {
	class: Ee(F.wh(36, 36).bg("#999").bd("#555").rounded(8).p(.75).cursor("pointer").it, F.flexHA().it),
	onClick: t,
	children: /* @__PURE__ */ Z("div", { class: Ee(F.wh(10, 10).rounded("full").bd("#444").it, F.bg(e ? "#0f0" : "#666").it) })
}), Kr = ({ children: e, className: t }) => /* @__PURE__ */ Z("div", {
	class: Ee(F.bg("#ffe899").p(4).color("#333").rounded(2).it, F.bd("inset 1px #0004").it, t),
	children: e
});
//#endregion
//#region src/utils/drag-session.ts
function qr(e, t, n) {
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
function Jr(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Yr(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? Jr(o, Math.min(r, i), Math.max(r, i)) : o;
}
function Xr(e) {
	return `${e}px`;
}
//#endregion
//#region src/components/headless/knob-frame.tsx
function Zr(e) {
	return /* @__PURE__ */ Z("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			qr(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = Jr(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
	let s = Yr(e, n, r, -135, 135);
	return /* @__PURE__ */ Z(Zr, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ Z("div", {
			class: F.wh(34, 34).rounded("100%").relative().bg("#777").bd("#444").it,
			style: { opacity: o ? .5 : 1 },
			children: /* @__PURE__ */ Z("div", {
				class: F.full().flexVA().it,
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ Z("div", { class: F.wh(2, 10).bg("#fff").it })
			})
		})
	});
}, $ = ({ className: e, label: t, children: n, labelAlign: r = "center", width: i }) => /* @__PURE__ */ Z("div", {
	class: F.flexV().addClass(e).it,
	style: i ? { width: Xr(i) } : void 0,
	children: [/* @__PURE__ */ Z("div", {
		class: F.fontSize(11).weight("bold").it,
		style: { textAlign: r },
		children: t
	}), /* @__PURE__ */ Z("div", {
		class: F.flexC().h(40).it,
		children: n
	})]
}), Qr = ({ value: e, onChange: t, options: n }) => {
	let r = n.findIndex((t) => t.value === e), i = n.length;
	return /* @__PURE__ */ Z(Q, {
		value: r,
		min: 0,
		max: i - 1,
		step: 1,
		onChange: (e) => {
			t(n[e].value);
		}
	});
}, $r = () => {
	let { parameters: e } = X.useSnapshot(), t = (t, n) => {
		X.setParameters({
			...e,
			[t]: n
		});
	};
	return /* @__PURE__ */ Z("div", {
		class: F.flexVC().gap(5).it,
		children: [
			/* @__PURE__ */ Z("div", {
				class: F.flexHA().gap(2).it,
				children: [
					/* @__PURE__ */ Z($, {
						label: "On",
						width: 48,
						children: /* @__PURE__ */ Z(Gr, {
							active: e.isOn,
							onClick: () => t("isOn", !e.isOn)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Time",
						width: 48,
						className: F.relative().it,
						children: [/* @__PURE__ */ Z(Qr, {
							options: et,
							value: e.time,
							onChange: (e) => t("time", e)
						}), /* @__PURE__ */ Z("div", {
							class: Ee(F.absolute().bottom(-14).left(0).fontSize(12).w(48).it, F.flexC().it),
							children: e.time.toString()
						})]
					}),
					/* @__PURE__ */ Z($, {
						label: "Feed",
						width: 48,
						children: /* @__PURE__ */ Z(Q, {
							value: e.feed,
							onChange: (e) => t("feed", e)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Tone",
						width: 48,
						children: /* @__PURE__ */ Z(Q, {
							value: e.tone,
							onChange: (e) => t("tone", e)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Mix",
						width: 48,
						children: /* @__PURE__ */ Z(Q, {
							value: e.mix,
							onChange: (e) => t("mix", e)
						})
					})
				]
			}),
			/* @__PURE__ */ Z("div", {
				class: F.flexHA().gap(2).it,
				children: [
					/* @__PURE__ */ Z($, {
						label: "LFO",
						width: 48,
						children: /* @__PURE__ */ Z(Gr, {
							active: e.lfoOn,
							onClick: () => t("lfoOn", !e.lfoOn)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Rate",
						width: 48,
						children: /* @__PURE__ */ Z(Q, {
							value: e.lfoRate,
							onChange: (e) => t("lfoRate", e)
						})
					}),
					/* @__PURE__ */ Z($, {
						label: "Depth",
						width: 48,
						children: /* @__PURE__ */ Z(Q, {
							value: e.lfoDepth,
							onChange: (e) => t("lfoDepth", e)
						})
					})
				]
			}),
			!1
		]
	});
}, ei = () => {
	let { parameters: e } = X.useSnapshot(), t = (t, n) => {
		X.setParameters({
			...e,
			[t]: n
		});
	};
	return /* @__PURE__ */ Z("div", { children: /* @__PURE__ */ Z("label", {
		class: F.flexH().gap(1).it,
		children: [/* @__PURE__ */ Z("input", {
			type: "checkbox",
			checked: e.safety,
			onChange: (e) => t("safety", e.currentTarget.checked)
		}), "safety"]
	}) });
}, ti = () => /* @__PURE__ */ Z("div", {
	class: F.flexC().it,
	children: /* @__PURE__ */ Z(Kr, {
		className: Ee(F.wh(320, 210).it, F.flexVC().it),
		children: /* @__PURE__ */ Z("div", {
			class: F.flexV().gap(3).it,
			children: [/* @__PURE__ */ Z("div", {
				class: F.flexHA().gap(2).fJustify("between").it,
				children: [/* @__PURE__ */ Z("div", {
					class: F.fontSize(18).weight("bold").it,
					children: "Sunset Delay"
				}), /* @__PURE__ */ Z(ei, {})]
			}), /* @__PURE__ */ Z($r, {})]
		})
	})
});
//#endregion
//#region src/root/app.tsx
Ur();
var ni = () => (He(Hr, []), /* @__PURE__ */ Z(ti, {})), ri = me((e) => (fe(/* @__PURE__ */ Z(ni, {}), e), () => {
	fe(null, e);
}), {
	cssTexts: ["*{box-sizing:border-box;margin:0;padding:0}body{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"],
	adoptedStyleSheets: [De.sheet]
});
//#endregion
export { ri as default };
