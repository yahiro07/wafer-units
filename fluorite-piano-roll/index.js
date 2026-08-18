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
		o.__v = n.__v + 1, t.vnode && t.vnode(o), oe(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? w(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, ce(i, o, a), n.__e = n.__ = null, o.__e != r && T(o);
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
	for (c = O(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || m, p.__i = d, v = oe(e, p, f, i, a, o, s, c, l, u), g = p.__e, p.ref && f.ref != p.ref && (f.ref && de(f.ref, null, p), u.push(p.ref, p.__c || g, p)), _ == null && g != null && (_ = g), 4 & p.__u ? (c = k(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : g && (c = g.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function O(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = re(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = w(s)), fe(s, s));
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
function ne(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (_(e) ? e.some(function(e) {
		ne(e, t);
	}) : t.push(e)), t;
}
function re(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function ie(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function A(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ie(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || ie(e.style, t, n[t]);
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
function ae(e) {
	return function(n) {
		if (this.l) {
			var r = this.l[n.type + e];
			if (n[c] == null) n[c] = d++;
			else if (n[c] < r[l]) return;
			return r(t.event ? t.event(n) : n);
		}
	};
}
function oe(e, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, ne, re, ie, A = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof A == "function") {
		f = s.length;
		try {
			if (T = n.props, E = A.prototype && A.prototype.render, D = (d = A.contextType) && i[d.__c], O = d ? D ? D.props.value : d.__ : i, r.__c ? ee = (p = n.__c = r.__c).__ = p.__E : (E ? n.__c = p = new A(T, O) : (n.__c = p = new C(T, O), p.constructor = A, p.render = pe), D && D.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), E && p.__s == null && (p.__s = p.state), E && A.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = v({}, p.__s)), v(p.__s, A.getDerivedStateFromProps(T, p.__s))), g = p.props, b = p.state, p.__v = n, m) E && A.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), E && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (E && A.getDerivedStateFromProps == null && T !== g && p.componentWillReceiveProps != null && p.componentWillReceiveProps(T, O), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(T, p.__s, O)) {
					n.__v != r.__v && (p.props = T, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), h.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = w(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(T, p.__s, O), E && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(g, b, x);
				});
			}
			if (p.context = O, p.props = T, p.__P = e, p.__e = !1, k = t.__r, ne = 0, E) p.state = p.__s, p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), h.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, k && k(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++ne < 25);
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), re = d != null && d.type === S && d.key == null ? le(d.props.children) : d, c = te(e, _(re) ? re : [re], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (ie = o.length; ie--;) y(o[ie]);
			} else n.__e = r.__e;
			n.__k ??= r.__k || [], e.then || se(n), t.__e(e, n, r);
		}
	} else o == null && n.__v == r.__v ? (n.__k = r.__k, n.__e = r.__e) : c = n.__e = ue(r.__e, n, r, i, a, o, s, l, u);
	return (d = t.diffed) && d(n), 128 & n.__u ? void 0 : c;
}
function se(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(se));
}
function ce(e, n, r) {
	for (var i = 0; i < r.length; i++) de(r[i], r[++i], r[++i]);
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
function le(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : _(e) ? e.map(le) : e.constructor === void 0 ? v({}, e) : null;
}
function ue(n, r, i, a, o, s, c, l, u) {
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || A(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? h = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? v = g : d == "checked" ? b = g : l && typeof g != "function" || x[d] === g || A(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), te(r.type == "template" ? n.content : n, _(h) ? h : [h], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && w(i, 0), l, u), s != null) for (d = s.length; d--;) y(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && v == null ? n.removeAttribute("value") : v != null && (v !== n[d] || C == "progress" && !v || C == "option" && v != x[d]) && A(n, d, v, x[d], o), d = "checked", b != null && b != n[d] && A(n, d, b, x[d], o));
	}
	return n;
}
function de(e, n, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && n == null || (e.__u = e(n));
		} else e.current = n;
	} catch (e) {
		t.__e(e, r);
	}
}
function fe(e, n, r) {
	var i, a;
	if (t.unmount && t.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || de(i, null, n)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			t.__e(e, n);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && fe(i[a], n, r || typeof e.type != "function");
	r || y(e.__e), e.__c = e.__ = e.__e = void 0;
}
function pe(e, t, n) {
	return this.constructor(e, n);
}
function me(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], oe(r, n = (!a && i || r).__k = b(S, null, [n]), o || m, m, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), ce(s, n, c), n.props.children = null;
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
}, D.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = ae(!1), p = ae(!0);
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function he(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function ge(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				he(e);
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
function _e(e, t) {
	return {
		...e,
		class: [e.class, ...t].filter(Boolean).join(" ")
	};
}
var ve;
function ye(e) {
	ve = e.cssFunction;
}
function be(e) {
	return (Array.isArray(e) ? e : [e]).map((e) => {
		if (typeof e == "object" && e) return ve?.(e);
		if (typeof e == "string") return e;
	}).filter((e) => !!e);
}
function xe(e, t, n, r) {
	if ("if" in n && !n.if) return null;
	let { sx: i, ...a } = n, o = a;
	if (typeof t != "function" && i) {
		let e = be(i);
		e.length > 0 && (o = _e(a, e));
	}
	return e(t, o, r);
}
var Se = (() => {
	let e, t = [];
	for (let n = 0; n < 256; n++) {
		e = n;
		for (let t = 0; t < 8; t++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})(), Ce = (e) => {
	let t = -1;
	for (let n = 0; n < e.length; n++) t = t >>> 8 ^ Se[(t ^ e.charCodeAt(n)) & 255];
	return ((t ^ -1) >>> 0).toString(16).padStart(8, "0");
};
function j(e) {
	return `${e}px`;
}
function M(e) {
	return j(e * 4);
}
var we = {
	full: "100%",
	vw: "100vw",
	vh: "100vh",
	dvw: "100dvw",
	dvh: "100dvh"
};
function Te(e) {
	return we[e] ?? (typeof e == "number" ? j(e) : e);
}
var Ee = {
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
	gap: (e) => ({ gap: j(e * 4) }),
	grow: () => ({ flexGrow: 1 }),
	w: (e) => ({ width: Te(e) }),
	h: (e) => ({ height: Te(e) }),
	wh: (e, t) => ({
		width: Te(e),
		height: Te(t)
	}),
	bg: (e) => ({ background: e }),
	bd: (e) => ({ border: e.includes(" ") ? e : `solid 1px ${e}` }),
	p: (e) => ({ padding: M(e) }),
	pt: (e) => ({ paddingTop: M(e) }),
	pb: (e) => ({ paddingBottom: M(e) }),
	pl: (e) => ({ paddingLeft: M(e) }),
	pr: (e) => ({ paddingRight: M(e) }),
	px: (e) => ({
		paddingLeft: M(e),
		paddingRight: M(e)
	}),
	py: (e) => ({
		paddingTop: M(e),
		paddingBottom: M(e)
	}),
	m: (e) => ({ margin: M(e) }),
	ml: (e) => ({ marginLeft: M(e) }),
	mr: (e) => ({ marginRight: M(e) }),
	mt: (e) => ({ marginTop: M(e) }),
	mb: (e) => ({ marginBottom: M(e) }),
	mx: (e) => ({
		marginLeft: M(e),
		marginRight: M(e)
	}),
	my: (e) => ({
		marginTop: M(e),
		marginBottom: M(e)
	}),
	color: (e) => ({ color: e }),
	weight: (e) => ({ fontWeight: e }),
	inlineBlock: () => ({ display: "inline-block" }),
	fontSize: (e) => ({ fontSize: j(e) }),
	rounded: (e) => (e === "full" && (e = "100%"), { borderRadius: typeof e == "number" ? j(e) : e }),
	relative: () => ({ position: "relative" }),
	absolute: () => ({ position: "absolute" }),
	full: () => ({
		width: "100%",
		height: "100%"
	}),
	cursor: (e) => ({ cursor: e }),
	minW: (e) => ({ minWidth: j(e) }),
	invisible: () => ({ visibility: "hidden" }),
	top: (e) => ({ top: j(e) }),
	right: (e) => ({ right: j(e) }),
	bottom: (e) => ({ bottom: j(e) }),
	left: (e) => ({ left: j(e) }),
	opacity: (e) => ({ opacity: e }),
	pointerEvents: (e) => ({ pointerEvents: e }),
	overflow: (e) => ({ overflow: e }),
	overflowXY: (e, t) => ({
		overflowX: e,
		overflowY: t
	}),
	css: (e) => e
}, De = (e) => e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
function Oe(e) {
	let t = "{";
	for (let n in e) t += `${De(n)}${typeof e[n] == "object" ? Oe(e[n]) : `:${e[n]}`};`;
	return t += "}", t;
}
function ke(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, (...e) => t(n(...e))]));
}
function Ae(e) {
	let t = e ? { ...e } : {}, n;
	return n = {
		__isQCursor: !0,
		accumulatedObject: t,
		...ke(Ee, (e) => {
			if (typeof e == "object") for (let n in e) t[n] = e[n];
			return n;
		})
	}, n;
}
function je() {
	let e = new CSSStyleSheet(), t = /* @__PURE__ */ new Set(), n = (n) => {
		let r = Oe("__isQCursor" in n ? n.accumulatedObject : n);
		if (r === "") return "";
		let i = `cs-${Ce(r)}`;
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
	}, r = ke(Ee, (e) => Ae(e));
	return ye({ cssFunction: n }), {
		qu: r,
		css: n,
		cz: (...e) => e.filter((e) => e !== !1 && e !== void 0).map((e) => typeof e == "object" ? n(e) : e).join(" "),
		cssRealm: { sheet: e }
	};
}
//#endregion
//#region src/common/css-realm.ts
var { qu: N, cz: P, css: Me, cssRealm: Ne } = je(), Pe, F, Fe, Ie, Le = 0, Re = [], I = t, ze = I.__b, Be = I.__r, Ve = I.diffed, He = I.__c, Ue = I.unmount, We = I.__;
function Ge(e, t) {
	I.__h && I.__h(F, e, Le || t), Le = 0;
	var n = F.__H || (F.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Ke(e) {
	return Le = 1, qe(rt, e);
}
function qe(e, t, n) {
	var r = Ge(Pe++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : rt(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = F, !F.__f)) {
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
		F.__f = !0;
		var a = F.shouldComponentUpdate, o = F.componentWillUpdate;
		F.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, F.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Je(e, t) {
	var n = Ge(Pe++, 3);
	!I.__s && nt(n.__H, t) && (n.__ = e, n.u = t, F.__H.__h.push(n));
}
function Ye(e) {
	return Le = 5, Xe(function() {
		return { current: e };
	}, []);
}
function Xe(e, t) {
	var n = Ge(Pe++, 7);
	return nt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ze() {
	for (var e; e = Re.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(et), t.__h.some(tt), t.__h = [];
		} catch (n) {
			t.__h = [], I.__e(n, e.__v);
		}
	}
}
I.__b = function(e) {
	F = null, ze && ze(e);
}, I.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), We && We(e, t);
}, I.__r = function(e) {
	Be && Be(e), Pe = 0;
	var t = (F = e.__c).__H;
	t && (Fe === F ? (t.__h = [], F.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(et), t.__h.some(tt), t.__h = [], Pe = 0)), Fe = F;
}, I.diffed = function(e) {
	Ve && Ve(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Re.push(t) !== 1 && Ie === I.requestAnimationFrame || ((Ie = I.requestAnimationFrame) || $e)(Ze)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), Fe = F = null;
}, I.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(et), e.__h = e.__h.filter(function(e) {
				return !e.__ || tt(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], I.__e(n, e.__v);
		}
	}), He && He(e, t);
}, I.unmount = function(e) {
	Ue && Ue(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			et(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && I.__e(t, n.__v));
};
var Qe = typeof requestAnimationFrame == "function";
function $e(e) {
	var t, n = function() {
		clearTimeout(r), Qe && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Qe && (t = requestAnimationFrame(n));
}
function et(e) {
	var t = F, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), F = t;
}
function tt(e) {
	var t = F;
	e.__c = e.__(), F = t;
}
function nt(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function rt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function it(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-VSv4Uyxk.js
var at = Symbol("V"), ot = Symbol("IMMUT_BASE"), st = Symbol("IS_RAW"), ct = Symbol("P"), lt = "Array", ut = [
	Symbol.iterator,
	Symbol.toStringTag,
	st
], dt = {
	Map: "Map",
	Set: "Set",
	Array: lt
}, ft = "[object Object]", pt = "[object Map]", mt = "[object Set]", ht = "[object Array]", gt = "[object Function]", _t = {
	[pt]: "Map",
	[mt]: "Set",
	[ht]: lt,
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
	[lt]: St
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
	[lt]: [
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
	[lt]: ["forEach", "map"]
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
		R(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Gt(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Wt(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function Ut(e) {
	return Rt.call(e);
}
function L(...e) {
	return e;
}
function Wt(e) {
	return Ut(e) === ft;
}
function Gt(e) {
	return Ut(e) === pt;
}
function Kt(e) {
	return Ut(e) === mt;
}
function qt(e) {
	return Ut(e) === gt;
}
function Jt(e) {
	return _t[Ut(e)];
}
function R(e) {
	let t = Ut(e);
	return ![
		ft,
		ht,
		pt,
		mt,
		gt
	].includes(t);
}
function Yt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Xt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Zt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Qt(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function $t(e) {
	return e && e[at] || "";
}
function en(e, t) {
	let n = $t(e);
	return n ? n !== t : !1;
}
function tn(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && Wt(e) && (n = Object.assign({}, e)), Gt(e) && (n = new Map(e)), Kt(e) && (n = new Set(e)), n;
}
function nn(e, t) {
	return t.immutBase ? e : tn(e, t.readOnly);
}
function rn(e) {
	let t = e;
	if (!Qt(e)) return e;
	let n = jt[t];
	return n || (n = Ft(), jt[t] = n), n;
}
function an(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function z(e, t) {
	let n = e;
	return t && (n = B(e, !0)), n.join("|");
}
function B(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = rn(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = rn(i);
	return n[r] = a, n;
}
function on(e) {
	return e.map((e) => Mt[e] || e);
}
function sn(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || B(t);
	an(i, a) < 0 && (r.push(t), i.push(a));
}
function cn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = an(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function ln(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function V(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = Gt(r) ? ln(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function un(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = V(e, i);
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
function dn(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = Gt(r) ? ln(r, a) : r[a];
	}
}
function fn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		dn(e, r, n);
	}
}
function pn(e, t) {
	let n = z(e), r = "";
	for (let e of t) {
		let t = `${z(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = on(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var mn = /* @__PURE__ */ new Map(), hn = /* @__PURE__ */ new Map(), gn = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new Map();
function vn(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function yn(e, t, n) {
	let r = [t], i = H(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function bn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Jt(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = rn(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = Sn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = yn(y, e, s), f = B(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = z(i.arrKeyPath, !0), n = jn(u, e);
			t = pn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = jn(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = V(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = V(e, t);
				if (!a) {
					let { val: n } = V(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(B(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(B(n));
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
		revoke: L,
		hasOnOperate: c,
		execOnOperate: L
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function xn(e) {
	if (!e) return !1;
	let t = Tn(e);
	return t ? !t.isImmutBase : !1;
}
function Sn(e, t) {
	let n = U(e, t);
	return n ? n.level + 1 : 1;
}
function H(e, t) {
	return t.metaMap.get(e);
}
function U(e, t) {
	return e ? t ? t.metaMap.get(e) || null : W(e) || null : null;
}
function Cn(e) {
	return e && W(e) || null;
}
function wn(e) {
	return e && e[at] || "";
}
function Tn(e) {
	return W(e) || null;
}
function W(e) {
	return e[ct];
}
function En(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function Dn(e) {
	return gn.get(e) || It();
}
function On(e, t) {
	return gn.set(e, t);
}
function kn(e) {
	return mn.get(e);
}
function An(e, t, n) {
	let r = mn.get(e);
	r || (r = {}, mn.set(e, r)), r[t] = n;
}
function jn(e, t) {
	let n = kn(e);
	return n && n[t] || [];
}
function Mn(e) {
	return hn.get(e) || [];
}
function Nn(e, t, n) {
	let r = mn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (hn.get(e) || []).filter((e, n) => !t.includes(n));
	hn.set(e, i);
}
function Pn(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => An(n, e, r));
	let i = hn.get(n) || [], a = r.map((e) => z(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = z(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => z(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), hn.set(n, i);
}
function Fn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = B(i), s = B(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		sn(n, a, s), Pn(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function In(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function Ln(e, t) {
	return !Wt(e) || wn(e) === t;
}
function Rn(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Ht(n, i, a, (e, n, r) => {
			let i = U(e, t);
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
		if (p === "Array") return In(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function zn(e, t) {
	let n = Mn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = V(e.proxyVal, t), i = Cn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(z(e)));
		else if (n) for (let e of o) dn(t, e, n.copy);
		else if (s) for (let e of o) dn(t, e, s.self);
	}
	i.length && Nn(e.sourceId, i, a);
}
function Bn(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), zn(e, a), Rn(e, t), a;
}
function Vn(e) {
	e.rootMeta.scopes.push(e);
}
function Hn(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = bn(e, t, n), c = nn(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => ct === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = L;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : L;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function Un(e, t) {
	return e === "Array" || (Tt[e] || []).includes(t);
}
function Wn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (R(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!qt(e)) {
			if (r.newNodeStats[c] || e[st]) return e;
			let n = H(e, o);
			return n || (n = Hn(c, e, t), Vn(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!Un(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Kn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Kn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function Gn(e, t) {
	if (!Wt(e)) return e;
	let n = H(e, t);
	return n ? n.copy : e;
}
function Kn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return vn(t), a(...e);
	}, e.clear = function(...e) {
		return vn(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return vn(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (vn(t), t.hasOnOperate) {
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
				let r = U(n, i), a = r ? r.copy || r.self : n;
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
function qn(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && bt.includes(r) || i === "Array" && vt.includes(r) || i === "Map" && yt.includes(r))) && vn(n);
}
function Jn(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Yn(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = Gn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	qn({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Ct[o] || [];
	if (qt(i) && m.includes(n)) return n === "slice" ? f.slice : (xt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = U(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = U(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = U(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : cn(e);
		} else g();
		let t = p[r];
		R(t) || c.newNodeMap.delete(Jn(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !R(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(Jn(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Xn(e) {
	if (R(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Xn), Object.freeze(e);
	if (Kt(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = L;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (Gt(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = L;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Xn(n);
	}), Object.freeze(e);
}
function Zn(e) {
	if (!e) return e;
	let t = Cn(e);
	return t ? t.self : e;
}
var Qn = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], $n = {};
Qn.forEach((e) => $n[e] = 1);
var er = {
	[lt]: 1,
	Set: 1,
	Map: 1
}, tr = /* @__PURE__ */ new Map();
function nr(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[ot] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Lt.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = Pt(), p.metaVer = d, _n.set(d, p));
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
				if (at === t) return d;
				let n = e[t];
				if (ut.includes(t)) {
					if (qt(n)) {
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
				let l = n, u = H(e, p), f = Fn(t, u, U(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return er[h] && $n[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Wn(n, {
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
				}), h === "Array" && Zt(t) || dt[h] && (l = Yn(e, {
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
				let a = !0, s = H(t, p), c = !1, l = i;
				if (xn(i)) if (c = !0, Ln(i, d)) {
					if (Gn(i, p) === t[r]) return !0;
					let e = H(i, p);
					Fn(r, s, e), sn(e, s.keyPath.concat(r));
				} else e = !1;
				else if (en(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = W(i);
					if (o.sourceId !== n) l = Zn(i);
					else {
						let { isGetted: n, val: i } = un(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = W(i);
						En(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = V(e, t);
							n && En(o, W(i), r);
						}), sn(c, u), fn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Zt(r)) return l = y("set", r, {
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
				return u && Yn(t, {
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
				let n = H(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), Yn(e, {
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
				if (R(e)) throw Error("base state can not be primitive");
				if (u) return tr.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || Dn(e), l = H(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = Hn("", n, {
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
				return Vn(f), f.execOnOperate = y, tr.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return tr.delete(t), t;
				let r = H(t, p);
				if (r.isImmutBase && !n) return t;
				let i = Bn(r, p);
				return l && e && (i = Xn(i)), _n.delete(d), tr.delete(t), On(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function rr(e) {
	if (!qt(e)) throw Error("produce callback is not a function");
}
var ir = "Not a Limu root draft";
function ar(e) {
	let t = tr.get(e);
	if (!t) throw wn(e) && Tn(e)?.level === 0 ? Error("Draft has been finished!") : Error(ir);
	return t;
}
function or(e, t) {
	return nr(t).createDraft(e);
}
function sr(e) {
	return ar(e)(e);
}
function cr(e, t) {
	if (Yt(e) || Xt(t)) throw Error("produce callback can not be a promise function or result");
}
function lr(e, t, n) {
	rr(t);
	let r = or(e, n);
	return cr(t, t(r)), sr(r);
}
function ur(e, t, n) {
	if (!t || !qt(t)) {
		let n = e, r = t;
		return rr(e), (e) => lr(e, n, r);
	}
	return lr(e, t, n);
}
var dr = ur;
function fr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function pr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function mr(e, t) {
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
		}, r = fr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => dr(t, e));
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
			let n = fr(t), r = e[t], i = c[`set${n}`];
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
		pr(l, e);
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
function hr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function gr(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function _r(e, t) {
	this.props = e, this.context = t;
}
(_r.prototype = new C()).isPureReactComponent = !0, _r.prototype.shouldComponentUpdate = function(e, t) {
	return gr(this.props, e) || gr(this.state, t);
};
var vr = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), vr && vr(e);
}, typeof Symbol < "u" && Symbol.for;
var yr = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	yr(e, t, n, r);
};
var br = t.unmount;
function xr(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = hr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return xr(e, t, n);
	})), e;
}
function Sr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return Sr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Cr() {
	this.__u = 0, this.o = null, this.__b = null;
}
function wr(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function Tr() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), br && br(e);
}, (Cr.prototype = new C()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = wr(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = Sr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, Cr.prototype.componentWillUnmount = function() {
	this.o = [];
}, Cr.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = xr(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && b(S, null, e.fallback);
	return i && (i.__u &= -33), [b(S, null, t.__a ? null : e.children), i];
};
var Er = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(Tr.prototype = new C()).__a = function(e) {
	var t = this, n = wr(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), Er(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, Tr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = ne(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, Tr.prototype.componentDidUpdate = Tr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		Er(e, n, t);
	});
};
var Dr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Or = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, kr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ar = /[A-Z0-9]/g, jr = typeof document < "u", Mr = function(e) {
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
var Nr = t.event;
t.event = function(e) {
	return Nr && (e = Nr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Pr = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, Fr = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || jr && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Mr(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : kr.test(a) && (a = s) : s = a = "oninput" : i && Or.test(a) ? a = a.replace(Ar, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = ne(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = ne(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Pr)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = Dr, Fr && Fr(e);
};
var Ir = t.__r;
t.__r = function(e) {
	Ir && Ir(e), e.__c;
};
var Lr = t.diffed;
t.diffed = function(e) {
	Lr && Lr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Rr(e) {
	return mr(e, {
		useEffect: Je,
		useRef: Ye,
		useState: Ke
	});
}
//#endregion
//#region src/root/store.ts
var G = Rr({
	octave: 0,
	duty: 1,
	playPos: null,
	loopBars: 2,
	pageIndex: 0,
	notes: [],
	previewNotePitch: null,
	stateLoadRevision: 0
});
//#endregion
//#region src/utils/helpers.ts
function zr(e) {
	return Array(e).fill(0).map((e, t) => t);
}
function Br(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Vr(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? Br(o, Math.min(r, i), Math.max(r, i)) : o;
}
function Hr(e) {
	return e * 255 >>> 0;
}
function Ur(e) {
	return e / 255;
}
function K(e) {
	return `${e}px`;
}
//#endregion
//#region src/root/persistence.ts
var Wr = {
	emitStateBytes() {
		let e = G.state;
		return new Uint8Array([
			123,
			45,
			e.octave + 10,
			Hr(e.duty),
			Math.floor(e.loopBars * 4),
			e.notes.length >> 8 & 255,
			e.notes.length & 255,
			...e.notes.flatMap((e) => [
				e.id >> 8 & 255,
				e.id & 255,
				e.position,
				e.duration,
				e.pitch
			])
		]);
	},
	applyStateBytes(e) {
		if (e[0] !== 123 || e[1] !== 45) return;
		let t = e[2] - 10, n = Ur(e[3]), r = e[4] / 4, i = e[5] << 8 | e[6], a = [];
		for (let t = 0; t < i; t++) {
			let n = 7 + t * 5, r = e[n + 0] << 8 | e[n + 1], i = e[n + 2], o = e[n + 3], s = e[n + 4];
			a.push({
				id: r,
				position: i,
				duration: o,
				pitch: s
			});
		}
		[
			-2 <= t && t <= 2,
			0 <= n && n <= 1,
			[
				.25,
				.5,
				1,
				2,
				4,
				8,
				16
			].includes(r),
			a.length === i
		].every(Boolean) && (G.assign({
			octave: t,
			duty: n,
			loopBars: r,
			notes: a,
			pageIndex: 0
		}), G.setStateLoadRevision((e) => e + 1));
	}
};
//#endregion
//#region src/root/sequencer.ts
function Gr(e, t) {
	return Br(24 + t * 12 + e, 0, 127);
}
function Kr(e) {
	let t = {
		notes: [],
		octave: 0,
		duty: 1,
		loopBars: 1
	}, n = e?.createNoteOutputPort(), r = /* @__PURE__ */ new Set(), i = null, a = {
		processStep(e, i, a) {
			let o = e % (t.loopBars * 16);
			for (let e of t.notes) if (e.position === o) {
				let o = Vr(t.duty, 0, 1, .2, 1), s = Gr(e.pitch, t.octave);
				n?.noteOn(s, i), n?.noteOff(s, i + e.duration * a * o), r.add(s);
			}
		},
		clearSentNotes() {
			for (let e of r) n?.noteOff(e);
			r.clear();
		}
	};
	return {
		setNotes(e) {
			t.notes = e;
		},
		setOctave(e) {
			t.octave = e;
		},
		setDuty(e) {
			t.duty = e;
		},
		setLoopBars(e) {
			t.loopBars = e;
		},
		start() {},
		processStep(e, t, n) {
			a.processStep(e, t, n);
		},
		stop() {
			a.clearSentNotes();
		},
		previewNoteOn(e) {
			i !== null && (n?.noteOff(i), i = null);
			let r = Gr(e, t.octave);
			n?.noteOn(r), i = r;
		},
		previewNoteOff() {
			i &&= (n?.noteOff(i), null);
		}
	};
}
//#endregion
//#region src/root/drivers.ts
var qr = it("wafer-v01", import.meta.url), q = Kr(qr);
function Jr() {
	let e = G.state;
	qr?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [800, 450]
		},
		clockHandlers: {
			start() {
				q.start();
			},
			stop() {
				q.stop(), G.setPlayPos(null);
			},
			processScheduling(t, n, r, i) {
				let a = n * 16 % Math.max(e.loopBars * 16, 32);
				G.setPlayPos(a);
				let o = Math.floor(a / 32);
				G.state.pageIndex !== o && G.setPageIndex(o);
			},
			processStep(e, t, n) {
				q.processStep(e, t, n);
			}
		},
		persistence: Wr
	});
}
function Yr() {
	return G.subscribe(({ notes: e, previewNotePitch: t, octave: n, duty: r, loopBars: i }) => {
		e !== void 0 && q.setNotes(e), i !== void 0 && q.setLoopBars(i), t !== void 0 && (t === null ? q.previewNoteOff() : q.previewNoteOn(t)), n !== void 0 && q.setOctave(n), r !== void 0 && q.setDuty(r);
	}, !0);
}
//#endregion
//#region ../../../node_modules/.pnpm/@yahiro07+qulex@0.1.7/node_modules/@yahiro07/qulex/dist/jsxRuntime.module-CrL-Xjas.js
var Xr = 0;
Array.isArray;
function Zr(e, n, r, i, a, o) {
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
		__v: --Xr,
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
function J(e, t, n) {
	return xe(Zr, e, t, n);
}
function Y(e, t, n) {
	return xe(Zr, e, t, n);
}
//#endregion
//#region src/components/button.tsx
var Qr = ({ text: e, children: t, active: n, disabled: r, onClick: i }) => /* @__PURE__ */ Y("div", {
	sx: [
		N.flexC().wh(40, 30).bg("#888").weight("bold"),
		N.color("#fff").cursor("pointer"),
		n && N.bg("#48c"),
		r && N.opacity(.4).pointerEvents("none")
	],
	onClick: i,
	children: [e && /* @__PURE__ */ J("div", {
		sx: N.fontSize(9),
		children: e
	}), t]
});
//#endregion
//#region src/utils/color-mod.ts
function $r(e) {
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
function ei(e) {
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
function X(e) {
	return Math.max(0, Math.min(1, e));
}
function ti(e) {
	return e %= 1, e < 0 && (e += 1), e;
}
function ni(e, t) {
	return t.relative ? ti(e + Math.max(-360, Math.min(360, t.amount)) / 360) : ti(Math.max(0, Math.min(360, t.amount)) / 360);
}
function ri(e, t, n) {
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
function ii(e, t, n) {
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
function ai(e, t, n) {
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
function oi(e, t, n) {
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
function si(e) {
	return e / 100 * 255;
}
function ci(e) {
	return Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0").toUpperCase();
}
function li(e, t = "") {
	let { r: n, g: r, b: i } = $r(e), a = 255, o = "hsv";
	for (let e of ei(t)) {
		let t = e.amount / 100;
		switch (e.type) {
			case "h":
				if (o === "hsl") {
					let [t, a, o] = ai(n, r, i);
					t = ni(t, e), {r: n, g: r, b: i} = oi(t, a, o);
				} else {
					let [t, a, o] = ri(n, r, i);
					t = ni(t, e), {r: n, g: r, b: i} = ii(t, a, o);
				}
				break;
			case "v": {
				o = "hsv";
				let [a, s, c] = ri(n, r, i);
				c = e.relative ? X(c + t) : X(t), {r: n, g: r, b: i} = ii(a, s, c);
				break;
			}
			case "l": {
				o = "hsl";
				let [a, s, c] = ai(n, r, i);
				c = e.relative ? X(c + t) : X(t), {r: n, g: r, b: i} = oi(a, s, c);
				break;
			}
			case "s":
				if (o === "hsl") {
					let [a, o, s] = ai(n, r, i);
					o = e.relative ? X(o + t) : X(t), {r: n, g: r, b: i} = oi(a, o, s);
				} else {
					let [a, o, s] = ri(n, r, i);
					o = e.relative ? X(o + t) : X(t), {r: n, g: r, b: i} = ii(a, o, s);
				}
				break;
			case "a": a = si(Math.max(0, Math.min(100, e.amount)));
		}
	}
	return `#${ci(n)}${ci(r)}${ci(i)}${ci(a)}`;
}
//#endregion
//#region src/editor/theme.ts
var Z = {
	panelBody: li("#445", "h220"),
	pianoRollBg: li("#334", "h205"),
	pianoRollBgBlackKey: li("#334", "h205 v-2"),
	gridWeak2: "#0002",
	gridWeak: "#0004",
	gridStrong: "#0006",
	gridStrong2: "#000a",
	noteBg: "#6cc"
}, ui = ({ children: e, className: t }) => /* @__PURE__ */ J("div", {
	sx: [N.bg(Z.panelBody).p(4).color("#fff"), t],
	children: e
}), di = ({ className: e, children: t, disabled: n, onClick: r }) => /* @__PURE__ */ J("button", {
	sx: [
		N.css({ all: "unset" }).mt(3).bg("none").color("white"),
		N.p(2).cursor("pointer"),
		n && N.opacity(.3).pointerEvents("none"),
		e
	],
	onClick: r,
	children: t
}), fi = ({ className: e, spec: t, size: n }) => /* @__PURE__ */ J("i", {
	class: e ? [t, e].join(" ") : t,
	style: n ? { fontSize: `${n}px` } : void 0
});
function pi(e) {
	return (t) => /* @__PURE__ */ J(fi, {
		spec: e,
		...t
	});
}
var mi = {
	CaretLeft: pi("ri-arrow-left-s-line"),
	CaretRight: pi("ri-arrow-right-s-line"),
	Trash: pi("ri-delete-bin-line")
};
//#endregion
//#region src/utils/drag-session.ts
function hi(e, t, n) {
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
//#region src/components/headless/knob-frame.tsx
function gi(e) {
	return /* @__PURE__ */ J("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			hi(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = Br(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
				},
				onUp() {
					s || e.onClick?.();
				}
			});
		},
		style: {
			cursor: "pointer",
			touchAction: "none",
			WebkitTapHighlightColor: "transparent"
		},
		children: e.children
	});
}
//#endregion
//#region src/components/knob.tsx
var _i = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, onClick: a, disabled: o }) => {
	let s = Vr(e, n, r, -135, 135);
	return /* @__PURE__ */ J(gi, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ J("div", {
			sx: N.wh(30, 30).rounded("100%").relative().bg("#888"),
			style: { opacity: o ? .5 : 1 },
			children: /* @__PURE__ */ J("div", {
				sx: N.full().flexVA(),
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ J("div", { sx: N.wh(2, 10).bg("#fff") })
			})
		})
	});
}, vi = ({ className: e, label: t, children: n, labelAlign: r = "center", width: i, contentHeight: a = 40 }) => /* @__PURE__ */ Y("div", {
	class: e,
	sx: N.flexV(),
	style: i ? { width: K(i) } : void 0,
	children: [/* @__PURE__ */ J("div", {
		sx: N.fontSize(11).weight("bold").h(13),
		style: { textAlign: r },
		children: t
	}), /* @__PURE__ */ J("div", {
		sx: N.flexC().h(a),
		children: n
	})]
}), yi = ({ children: e, onShift: t }) => /* @__PURE__ */ J("div", {
	onClick: (e) => {
		let n = e.currentTarget.getBoundingClientRect();
		e.clientX - n.left < n.width / 2 ? t(-1) : t(1);
	},
	children: e
}), bi = ({ options: e, value: t, onChange: n, minWidth: r = 60 }) => {
	let i = e.findIndex((e) => e.value === t), a = e[i], o = i > 0, s = i < e.length - 1;
	return /* @__PURE__ */ J(yi, {
		onShift: (t) => {
			let r = i + t;
			r < 0 || r >= e.length || n(e[r].value);
		},
		children: /* @__PURE__ */ Y("div", {
			sx: [N.flexHA().fJustify("between").minW(r).h(30), N.bg("#888").fontSize(14).cursor("pointer")],
			children: [
				/* @__PURE__ */ J(mi.CaretLeft, {
					size: 14,
					className: P(N.ml(-.25), !o && N.invisible())
				}),
				/* @__PURE__ */ J("div", { children: a?.label }),
				/* @__PURE__ */ J(mi.CaretRight, {
					size: 14,
					className: P(N.mr(-.25), !s && N.invisible())
				})
			]
		})
	});
}, Q = {
	octaveStart: 2,
	octaveCount: 5,
	cellW: 20,
	cellH: 20,
	numKeys: 61
}, xi = [
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
], Si = zr(Q.numKeys).map((e) => {
	let t = (e / 12 >>> 0) + 2;
	return `${xi[e % 12]}${t}`;
}), Ci = ({ nx: e, ny: t, width: n, height: r }) => {
	let { cellW: i, cellH: a } = Q;
	return /* @__PURE__ */ J("div", {
		class: wi.base,
		style: {
			width: K(n),
			height: K(r)
		},
		children: Array.from({ length: e * t }).map((n, r) => {
			let o = r % e, s = Math.floor(r / e), c = o * i, l = s * a, u = (t - s - 1) % 12, d = [
				1,
				3,
				6,
				8,
				10
			].includes(u), f = "default";
			return o % 4 == 3 && (f = "stronger1"), o === 15 && (f = "stronger2"), /* @__PURE__ */ J("div", {
				sx: [
					(u === 0 || u === 5) && "--has-bottom-border",
					d && "--is-black-key",
					`--border-${f}`
				],
				style: {
					left: K(c),
					top: K(l)
				}
			}, `${o}-${s}`);
		})
	});
}, wi = { base: Me({
	border: "solid 0.5px #222",
	">div": {
		position: "absolute",
		width: K(Q.cellW),
		height: K(Q.cellH),
		background: Z.pianoRollBg,
		"&.--is-black-key": { background: Z.pianoRollBgBlackKey },
		"&.--has-bottom-border": { borderBottom: `solid 0.5px ${Z.gridStrong}` },
		borderRight: `solid 0.5px ${Z.gridWeak2}`,
		"&.--border-stronger1": { borderRightColor: Z.gridStrong },
		"&.--border-stronger2": { borderRightColor: Z.gridStrong2 }
	}
}) }, Ti = [
	"whiteL",
	"black",
	"whiteM",
	"black",
	"whiteH",
	"whiteL",
	"black",
	"whiteM",
	"black",
	"whiteM",
	"black",
	"whiteH"
];
function Ei(e, t) {
	let n = Ti[e], r = {
		width: "100%",
		background: "#fff",
		height: t,
		left: 0
	};
	return n === "whiteL" ? (r.height += t / 2, r.bottom = 0) : n === "whiteM" ? (r.height += t, r.top = 0, r.bottom = 0, r.margin = "auto 0") : n === "whiteH" ? (r.height += t / 2, r.top = 0) : n === "black" && (r.zIndex = 1, r.width = "63%", r.background = "linear-gradient(to right, #222, #666)", r.top = 0, r.bottom = 0, r.margin = "auto 0"), (e === 0 || e === 5) && (r.borderBottom = "solid 0.5px #0003"), e === 0 && (r.background = "#e4e4e4"), r;
}
var Di = ({ yi: e }) => {
	let { cellH: t } = Q, n = e % 12, r = n === 0 && Si[e], [i, a] = Ke(!1), o = Ei(n, t), s = (t) => {
		a(!0), G.setPreviewNotePitch(e), hi(t, { onUpOrCancel() {
			a(!1), G.setPreviewNotePitch(null);
		} });
	}, c = Oi;
	return /* @__PURE__ */ J("div", {
		class: c.base,
		children: /* @__PURE__ */ J("div", {
			sx: [c.inner, i && c.innerPressed],
			style: o,
			onPointerDown: s,
			children: r && /* @__PURE__ */ J("div", {
				class: c.label,
				children: r
			})
		})
	});
}, Oi = {
	base: P(N.wh(80, Q.cellH).relative().pointerEvents("none")),
	inner: P(N.absolute(), N.pointerEvents("auto").cursor("pointer")),
	innerPressed: N.bg("#4dd!important"),
	label: P(N.flexHA().h("full").fJustify("end").p(1), N.color("#666").fontSize(12), "font-monospace")
}, ki = () => {
	let { numKeys: e } = Q;
	return /* @__PURE__ */ J("div", { children: zr(e).map((t) => /* @__PURE__ */ J(Di, { yi: e - t - 1 }, t)) });
};
//#endregion
//#region src/editor/piano-roll-editor-view.tsx
function Ai(e, t) {
	if (e < 2) {
		let t = 2 / e;
		return {
			nx: t,
			sectionOffset: 0,
			sectionStride: 32 / t
		};
	}
	return {
		nx: 1,
		sectionOffset: t * 32,
		sectionStride: 32
	};
}
function ji(e, t, n) {
	let r = G.state, { sectionStride: i } = Ai(r.loopBars, r.pageIndex), a = e.getBoundingClientRect(), o = (t - a.left) / a.width * i, s = Math.floor(o), c = (1 - (n - a.top) / a.height) * Q.numKeys;
	return {
		xi: s,
		xiFloat: o,
		yi: Math.floor(c),
		yiFloat: c
	};
}
function Mi(e, t, n, r) {
	let i = Math.floor(n);
	for (let a of e) if (a.pitch === r) {
		let e = a.position - t.offset, r = a.duration, o = e + r;
		if (n - .3 <= o && o <= n + .3) return {
			note: a,
			part: "tail"
		};
		if (e <= i && i < e + r) return {
			note: a,
			part: "body"
		};
	}
}
var Ni = 1, $ = {
	addNote(e, t) {
		let n = {
			id: G.state.notes.length > 0 ? Math.max(...G.state.notes.map((e) => e.id)) + 1 : 0,
			position: e,
			duration: Ni,
			pitch: t
		};
		return G.setNotes((e) => [...e, n]), n;
	},
	setNoteAttrs(e, t) {
		G.setNotes((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	},
	updateNoteXY(e, t, n) {
		return e.position !== t || e.pitch !== n ? ($.setNoteAttrs(e.id, {
			position: t,
			pitch: n
		}), {
			...e,
			position: t,
			pitch: n
		}) : e;
	},
	removeNote(e) {
		G.setNotes((t) => t.filter((t) => t.id !== e));
	},
	startInsertNewNote(e, t) {
		let { xi: n, yi: r } = ji(e.currentTarget, e.clientX, e.clientY), i = t.offset + n, a = $.addNote(i, r);
		$.startMoveNote(e, a);
	},
	startMoveNote(e, t) {
		let n = t, r = e.currentTarget, i = ji(r, e.clientX, e.clientY);
		G.setPreviewNotePitch(t.pitch), hi(e, {
			onMove(e) {
				let a = ji(r, e.position.x, e.position.y), o = a.xi - i.xi, s = a.yi - i.yi, c = t.position + o, l = t.pitch + s;
				G.state.previewNotePitch !== l && G.setPreviewNotePitch(l), n = $.updateNoteXY(n, c, l);
			},
			onUpOrCancel() {
				G.setPreviewNotePitch(null);
			}
		}, { coordinate: "page" });
	},
	startAdjustDuration(e, t) {
		let n = e.currentTarget, r = ji(n, e.clientX, e.clientY), i = t.id, a = t.duration, o = !1;
		hi(e, {
			onMove(e) {
				let s = ji(n, e.position.x, e.position.y).xi - r.xi, c = t.duration + s;
				c !== a && ($.setNoteAttrs(i, { duration: c }), a = c, o = !0);
			},
			onUp() {
				a <= 0 ? $.removeNote(i) : o && (Ni = a);
			}
		}, { coordinate: "page" });
	}
}, Pi = ({ notes: e, sectionRange: t }) => {
	let [n, r] = Ke(null), i = (i) => {
		let { xiFloat: a, yi: o } = ji(i.currentTarget, i.clientX, i.clientY), s = Mi(e, t, a, o);
		s?.part === "body" && n?.part !== "body" || s?.part === "tail" && n?.part !== "tail" ? r(s) : n && !s && r(null);
	}, a = (e) => {
		n?.part === "tail" ? $.startAdjustDuration(e, n.note) : n?.part === "body" ? $.startMoveNote(e, n.note) : $.startInsertNewNote(e, t);
	}, o = "auto";
	return n?.part === "body" ? o = "move" : n?.part === "tail" && (o = "e-resize"), /* @__PURE__ */ J("div", {
		sx: N.absoluteFull(),
		onPointerDown: a,
		onPointerMove: i,
		style: { cursor: o }
	});
}, Fi = ({ note: e, sectionRange: t }) => {
	let { cellW: n, cellH: r } = Q, i = e.position - t.offset, a = e.pitch, o = e.duration;
	return /* @__PURE__ */ J("div", {
		class: Ii.base,
		style: {
			left: K(i * n),
			bottom: K(a * r),
			width: K(n * o - .5),
			height: K(r)
		},
		children: /* @__PURE__ */ J("div", {
			class: Ii.label,
			children: Si[a]
		})
	});
}, Ii = {
	base: P(N.absolute().flexC().cursor("pointer")),
	label: P(N.bg(Z.noteBg).w("full").flexHA(), N.h(Q.cellH - 2).css({ border: "solid 0.5px #0004" }), N.rounded(2).pl(.5), N.color("#0008").fontSize(10), "font-monospace")
}, Li = ({ notes: e, sectionRange: t }) => /* @__PURE__ */ J("div", {
	sx: N.absoluteFull(),
	children: e.filter((e) => t.offset <= e.position && e.position < t.offset + t.duration).map((e) => /* @__PURE__ */ J(Fi, {
		note: e,
		sectionRange: t
	}, e.id))
}), Ri = ({ notes: e, sectionRange: t }) => {
	let { cellW: n, cellH: r, numKeys: i } = Q, a = r * i, o = n * t.duration;
	return /* @__PURE__ */ Y("div", {
		sx: [N.relative().wh(o, a), N.overflow("hidden").css({ touchAction: "none" })],
		children: [/* @__PURE__ */ J(Li, {
			notes: e,
			sectionRange: t
		}), /* @__PURE__ */ J(Pi, {
			notes: e,
			sectionRange: t
		})]
	});
}, zi = () => {
	let e = G.useSnapshot(), { nx: t, sectionOffset: n, sectionStride: r } = Ai(e.loopBars, e.pageIndex), i = Xe(() => ({
		offset: n,
		duration: r
	}), [n, r]);
	return /* @__PURE__ */ J("div", {
		sx: N.absoluteFull().flexH(),
		children: zr(t).map((t) => /* @__PURE__ */ J(Ri, {
			notes: e.notes,
			sectionRange: i
		}, t))
	});
}, Bi = () => {
	let { cellW: e } = Q, { playPos: t } = G.useSnapshot();
	if (t === null) return;
	let n = e * 1.5, r = t % 32;
	return /* @__PURE__ */ J("div", {
		class: Vi.base,
		style: { left: K(r * e - n) }
	});
}, Vi = { base: P(N.absolute().top(0).pointerEvents("none"), N.wh(Q.cellW * 1.5, "full"), N.css({ borderRight: "solid 1px #0ff4" }), N.bg("linear-gradient(to right, #0cc0, #0ff3)")) };
function Hi(e) {
	let t = e[0].pitch, n = e[0].pitch;
	for (let r of e) r.pitch < t && (t = r.pitch), r.pitch > n && (n = r.pitch);
	let r = (t + n) / 2, { cellH: i, numKeys: a } = Q;
	return i * a - (r + .5) * i;
}
function Ui(e) {
	let { stateLoadRevision: t, notes: n } = G.useSnapshot();
	Je(() => {
		let t = e.current;
		t && (t.scrollTop = (n.length > 0 ? Hi(n) : t.scrollHeight / 2) - t.clientHeight / 2);
	}, [t]);
}
var Wi = () => {
	let { cellW: e, cellH: t, numKeys: n } = Q, r = e * 32, i = t * n, a = Ye(null);
	return Ui(a), /* @__PURE__ */ Y("div", {
		ref: a,
		sx: [
			N.flexH().gap(.5).h(340),
			N.overflowXY("hidden", "scroll"),
			N.css({ touchAction: "pan-y" })
		],
		onWheel: (e) => {
			e.stopPropagation(), e.preventDefault();
		},
		children: [/* @__PURE__ */ J(ki, {}), /* @__PURE__ */ Y("div", {
			sx: N.relative().wh(r, i).flexH(),
			children: [
				/* @__PURE__ */ J(Ci, {
					nx: 32,
					ny: n,
					width: r,
					height: i
				}),
				/* @__PURE__ */ J(zi, {}),
				/* @__PURE__ */ J(Bi, {})
			]
		})]
	});
};
//#endregion
//#region src/utils/selector-option.ts
function Gi(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region src/root/page-root.tsx
var Ki = () => /* @__PURE__ */ J(vi, {
	label: "duty",
	children: /* @__PURE__ */ J(_i, {
		value: G.useSnapshot().duty,
		onChange: G.setDuty
	})
}), qi = () => /* @__PURE__ */ J(vi, {
	label: "octave",
	children: /* @__PURE__ */ J(_i, {
		value: G.useSnapshot().octave,
		min: -2,
		max: 2,
		step: 1,
		onChange: G.setOctave
	})
}), Ji = Gi([
	.25,
	.5,
	1,
	2,
	4,
	8,
	16
].map((e) => [e, `${e < 1 ? `1/${1 / e}` : e}`])), Yi = () => /* @__PURE__ */ J(vi, {
	label: "loop bars",
	children: /* @__PURE__ */ J(bi, {
		minWidth: 50,
		value: G.useSnapshot().loopBars,
		options: Ji,
		onChange: G.setLoopBars
	})
}), Xi = () => /* @__PURE__ */ J(Wi, {}), Zi = () => {
	let e = G.useSnapshot(), t = Math.max(1, e.loopBars / 2), n = e.pageIndex > 0, r = e.pageIndex < t - 1, i = (t) => {
		G.setPageIndex(e.pageIndex + t);
	};
	return /* @__PURE__ */ J(vi, {
		label: "",
		children: /* @__PURE__ */ Y("div", {
			sx: N.flexHA().gap(2),
			children: [
				/* @__PURE__ */ J(Qr, {
					disabled: !n,
					onClick: () => i(-1),
					children: /* @__PURE__ */ J(mi.CaretLeft, { size: 20 })
				}),
				/* @__PURE__ */ Y("div", {
					sx: N.w(50).flexC(),
					children: [
						e.pageIndex + 1,
						" / ",
						t
					]
				}),
				/* @__PURE__ */ J(Qr, {
					disabled: !r,
					onClick: () => i(1),
					children: /* @__PURE__ */ J(mi.CaretRight, { size: 20 })
				})
			]
		})
	});
}, Qi = () => /* @__PURE__ */ J(di, {
	disabled: !(G.useSnapshot().notes.length > 0),
	onClick: () => G.setNotes([]),
	children: /* @__PURE__ */ J(mi.Trash, { size: 20 })
}), $i = () => /* @__PURE__ */ J("div", {
	sx: N.w("full").flexV().gap(4),
	children: /* @__PURE__ */ Y("div", {
		sx: N.flexHA().fJustify("between"),
		children: [/* @__PURE__ */ J("div", {
			sx: N.weight("bold").fontSize(24),
			children: "Fluorite Piano Roll"
		}), /* @__PURE__ */ Y("div", {
			sx: N.flexHA().gap(7),
			children: [/* @__PURE__ */ Y("div", {
				sx: N.flexHA().gap(6),
				children: [
					/* @__PURE__ */ J(Qi, {}),
					/* @__PURE__ */ J(qi, {}),
					/* @__PURE__ */ J(Ki, {}),
					/* @__PURE__ */ J(Yi, {})
				]
			}), /* @__PURE__ */ J(Zi, {})]
		})]
	})
}), ea = () => /* @__PURE__ */ J(ui, {
	sx: N.wh(800, 450).flexC(),
	children: /* @__PURE__ */ Y("div", {
		sx: N.flexV().gap(2),
		children: [/* @__PURE__ */ J($i, {}), /* @__PURE__ */ J(Xi, {})]
	})
});
//#endregion
//#region src/root/app.tsx
Jr();
var ta = () => (Je(Yr, []), /* @__PURE__ */ J(ea, {})), na = "*{box-sizing:border-box;margin:0;padding:0}img{-webkit-user-drag:none}.font-monospace{font-family:Roboto Mono,monospace}", ra = ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap", "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"], ia = "https://cdn.jsdelivr.net/npm/remixicon@4.9.1/fonts/remixicon.min.css";
ra.push(ia);
var aa = ge((e) => {
	let t = document.createElement("link");
	return t.rel = "stylesheet", t.href = ia, e.appendChild(t), me(/* @__PURE__ */ J("div", {
		sx: N.bg(Z.panelBody).h("full").flexC(),
		children: /* @__PURE__ */ J(ta, {})
	}), e), () => {
		me(null, e);
	};
}, {
	cssTexts: [na],
	stylesheetUrls: ra,
	adoptedStyleSheets: [Ne.sheet]
});
//#endregion
export { aa as default };
