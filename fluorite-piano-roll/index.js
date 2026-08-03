//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/dist/preact.module.js
var e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h = {}, g = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v = Array.isArray;
function y(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function b(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function x(t, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? e.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
	return S(t, s, i, a, null);
}
function S(e, r, i, a, o) {
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
function C(e) {
	return e.children;
}
function w(e, t) {
	this.props = e, this.context = t;
}
function T(e, t) {
	if (t == null) return e.__ ? T(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? T(e) : null;
}
function E(e) {
	if (e.__P && e.__d) {
		var n = e.__v, r = n.__e, i = [], a = [], o = y({}, n);
		o.__v = n.__v + 1, t.vnode && t.vnode(o), oe(e.__P, o, n, e.__n, e.__P.namespaceURI, 32 & n.__u ? [r] : null, i, r ?? T(n), !!(32 & n.__u), a), o.__v = n.__v, o.__.__k[o.__i] = o, ce(i, o, a), n.__e = n.__ = null, o.__e != r && D(o);
	}
}
function D(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), D(e);
}
function O(e) {
	(!e.__d && (e.__d = !0) && r.push(e) && !k.__r++ || i != t.debounceRendering) && ((i = t.debounceRendering) || a)(k);
}
function k() {
	try {
		for (var e, t = 1; r.length;) r.length > t && r.sort(o), e = r.shift(), t = r.length, E(e);
	} finally {
		r.length = k.__r = 0;
	}
}
function ee(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, _, v, y = r && r.__k || g, b = t.length;
	for (c = te(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || h, p.__i = d, v = oe(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && de(f.ref, null, p), u.push(p.ref, p.__c || m, p)), _ == null && m != null && (_ = m), 4 & p.__u ? (c = ne(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function te(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = S(null, o, null, null, null) : v(o) ? o = e.__k[a] = S(C, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = S(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = re(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = T(s)), fe(s, s));
	return r;
}
function ne(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = ne(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = T(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function A(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (v(e) ? e.some(function(e) {
		A(e, t);
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
function j(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || _.test(t) ? n : n + "px";
}
function ie(e, t, n, r, i) {
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
	var d, f, p, m, h, _, x, S, E, D, O, k, te, ne, A, re, j = n.type;
	if (n.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = n.__e = r.__e]), (d = t.__b) && d(n);
	n: if (typeof j == "function") {
		f = s.length;
		try {
			if (E = n.props, D = j.prototype && j.prototype.render, O = (d = j.contextType) && i[d.__c], k = d ? O ? O.props.value : d.__ : i, r.__c ? S = (p = n.__c = r.__c).__ = p.__E : (D ? n.__c = p = new j(E, k) : (n.__c = p = new w(E, k), p.constructor = j, p.render = pe), O && O.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), D && p.__s == null && (p.__s = p.state), D && j.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = y({}, p.__s)), y(p.__s, j.getDerivedStateFromProps(E, p.__s))), h = p.props, _ = p.state, p.__v = n, m) D && j.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), D && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (D && j.getDerivedStateFromProps == null && E !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(E, k), n.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(E, p.__s, k)) {
					n.__v != r.__v && (p.props = E, p.state = p.__s, p.__d = !1), n.__e = r.__e, n.__k = r.__k, n.__k.some(function(e) {
						e && (e.__ = n);
					}), g.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = T(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(E, p.__s, k), D && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, _, x);
				});
			}
			if (p.context = k, p.props = E, p.__P = e, p.__e = !1, te = t.__r, ne = 0, D) p.state = p.__s, p.__d = !1, te && te(n), d = p.render(p.props, p.state, p.context), g.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, te && te(n), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++ne < 25);
			p.state = p.__s, p.getChildContext != null && (i = y(y({}, i), p.getChildContext())), D && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(h, _)), A = d != null && d.type === C && d.key == null ? le(d.props.children) : d, c = ee(e, v(A) ? A : [A], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), S && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (re = o.length; re--;) b(o[re]);
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
	return typeof e != "object" || !e || e.__b > 0 ? e : v(e) ? e.map(le) : e.constructor === void 0 ? y({}, e) : null;
}
function ue(n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, _, y, x = i.props || h, S = r.props, C = r.type;
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
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || ie(n, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? m = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? _ = g : d == "checked" ? y = g : l && typeof g != "function" || x[d] === g || ie(n, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == n.innerHTML) || (n.innerHTML = f.__html), r.__k = [];
		else if (p && (n.innerHTML = ""), ee(r.type == "template" ? n.content : n, v(m) ? m : [m], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && T(i, 0), l, u), s != null) for (d = s.length; d--;) b(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && _ == null ? n.removeAttribute("value") : _ != null && (_ !== n[d] || C == "progress" && !_ || C == "option" && _ != x[d]) && ie(n, d, _, x[d], o), d = "checked", y != null && y != n[d] && ie(n, d, y, x[d], o));
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
	r || b(e.__e), e.__c = e.__ = e.__e = void 0;
}
function pe(e, t, n) {
	return this.constructor(e, n);
}
function me(n, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), t.__ && t.__(n, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], oe(r, n = (!a && i || r).__k = x(C, null, [n]), o || h, h, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? e.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), ce(s, n, c), n.props.children = null;
}
function he(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, O(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + m++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
e = g.slice, t = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, n = 0, w.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = y({}, this.state);
	typeof e == "function" && (e = e(y({}, n), this.props)), e && y(n, e), e != null && this.__v && (t && this._sb.push(t), O(this));
}, w.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), O(this));
}, w.prototype.render = C, r = [], a = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, k.__r = 0, s = Math.random().toString(8), c = "__d" + s, l = "__a" + s, u = /(PointerCapture)$|Capture$/i, d = 0, f = ae(!1), p = ae(!0), m = 0;
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function ge(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function _e(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				ge(e);
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
var ve = (() => {
	let e, t = [];
	for (let n = 0; n < 256; n++) {
		e = n;
		for (let t = 0; t < 8; t++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})(), ye = (e) => {
	let t = -1;
	for (let n = 0; n < e.length; n++) t = t >>> 8 ^ ve[(t ^ e.charCodeAt(n)) & 255];
	return ((t ^ -1) >>> 0).toString(16).padStart(8, "0");
};
function M(e) {
	return `${e}px`;
}
function N(e) {
	return M(e * 4);
}
var be = {
	full: "100%",
	vw: "100vw",
	vh: "100vh",
	dvw: "100dvw",
	dvh: "100dvh"
};
function xe(e) {
	return be[e] ?? (typeof e == "number" ? M(e) : e);
}
var Se = {
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
	w: (e) => ({ width: xe(e) }),
	h: (e) => ({ height: xe(e) }),
	wh: (e, t) => ({
		width: xe(e),
		height: xe(t)
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
	css: (e) => e,
	cursor: (e) => ({ cursor: e }),
	minW: (e) => ({ minWidth: M(e) }),
	invisible: () => ({ visibility: "hidden" }),
	addClass: (e) => e,
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
	})
}, Ce = (e) => e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
function we(e) {
	let t = "";
	for (let n in e) t += `${Ce(n)}:${e[n]};`;
	return t;
}
function Te(...e) {
	return e.filter(Boolean).join(" ");
}
function Ee(e, t) {
	return Object.fromEntries(Object.entries(e).map(([e, n]) => [e, (...e) => t(n(...e))]));
}
function De(e, t) {
	let n = t ? { ...t } : {}, r = [], i, a = () => {
		if (i !== void 0) return i;
		let t = e(n);
		return r.length > 0 && (t += ` ${r.join(" ")}`), i = t, t;
	}, o;
	return o = {
		get it() {
			return a();
		},
		...Ee(Se, (e) => {
			if (typeof e == "string") r.push(e);
			else if (typeof e == "object") if (e.__isQCursor) Object.assign(n, e.getStylesObject());
			else for (let t in e) n[t] = e[t];
			return i = void 0, o;
		})
	}, o;
}
function Oe() {
	let e = new CSSStyleSheet(), t = /* @__PURE__ */ new Set(), n = (n) => {
		let r = we(n);
		if (r === "") return "";
		let i = `cs-${ye(r)}`;
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
		qu: Ee(Se, (e) => De(n, e)),
		cz: Te,
		cssRealm: { sheet: e }
	};
}
//#endregion
//#region src/common/css-realm.ts
var { qu: P, cz: F, cssRealm: ke } = Oe(), Ae, I, je, Me, Ne = 0, Pe = [], L = t, Fe = L.__b, Ie = L.__r, Le = L.diffed, Re = L.__c, ze = L.unmount, Be = L.__;
function Ve(e, t) {
	L.__h && L.__h(I, e, Ne || t), Ne = 0;
	var n = I.__H || (I.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function He(e) {
	return Ne = 1, Ue($e, e);
}
function Ue(e, t, n) {
	var r = Ve(Ae++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : $e(void 0, t), function(e) {
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
function We(e, t) {
	var n = Ve(Ae++, 3);
	!L.__s && Qe(n.__H, t) && (n.__ = e, n.u = t, I.__H.__h.push(n));
}
function Ge(e) {
	return Ne = 5, Ke(function() {
		return { current: e };
	}, []);
}
function Ke(e, t) {
	var n = Ve(Ae++, 7);
	return Qe(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function qe() {
	for (var e; e = Pe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Xe), t.__h.some(Ze), t.__h = [];
		} catch (n) {
			t.__h = [], L.__e(n, e.__v);
		}
	}
}
L.__b = function(e) {
	I = null, Fe && Fe(e);
}, L.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Be && Be(e, t);
}, L.__r = function(e) {
	Ie && Ie(e), Ae = 0;
	var t = (I = e.__c).__H;
	t && (je === I ? (t.__h = [], I.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Xe), t.__h.some(Ze), t.__h = [], Ae = 0)), je = I;
}, L.diffed = function(e) {
	Le && Le(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Pe.push(t) !== 1 && Me === L.requestAnimationFrame || ((Me = L.requestAnimationFrame) || Ye)(qe)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), je = I = null;
}, L.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Xe), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ze(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], L.__e(n, e.__v);
		}
	}), Re && Re(e, t);
}, L.unmount = function(e) {
	ze && ze(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Xe(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && L.__e(t, n.__v));
};
var Je = typeof requestAnimationFrame == "function";
function Ye(e) {
	var t, n = function() {
		clearTimeout(r), Je && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Je && (t = requestAnimationFrame(n));
}
function Xe(e) {
	var t = I, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), I = t;
}
function Ze(e) {
	var t = I;
	e.__c = e.__(), I = t;
}
function Qe(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function $e(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function et(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-CzL-_B7V.js
var tt = Symbol("V"), nt = Symbol("IMMUT_BASE"), rt = Symbol("IS_RAW"), it = Symbol("P"), R = "Array", at = [
	Symbol.iterator,
	Symbol.toStringTag,
	rt
], ot = {
	Map: "Map",
	Set: "Set",
	Array: R
}, st = "[object Object]", ct = "[object Map]", lt = "[object Set]", ut = "[object Array]", dt = "[object Function]", ft = {
	[ct]: "Map",
	[lt]: "Set",
	[ut]: R,
	[st]: "Object"
}, pt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], mt = [
	"set",
	"clear",
	"delete"
], ht = [
	"add",
	"clear",
	"delete"
], gt = [
	"splice",
	"sort",
	"unshift",
	"shift"
], _t = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), vt = {
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
	[R]: _t
}, yt = {
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
}, bt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[R]: ["forEach", "map"]
};
function xt(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var St = {
	value: 0,
	prefixSeed: 1
}, Ct = {
	value: 0,
	prefixSeed: 1
}, wt = {
	value: 0,
	prefixSeed: 1
}, Tt = {
	value: 0,
	prefixSeed: 1
}, Et = {}, Dt = {};
function Ot() {
	return xt(Ct, "MID_");
}
function kt() {
	return xt(St, "MV_");
}
function At() {
	return xt(wt, "SI_");
}
function jt() {
	return xt(Tt, "SR_");
}
var Mt = {
	autoFreeze: !1,
	autoRevoke: !0
}, Nt = Object.prototype.toString, Pt = !!Reflect, Ft = Object.prototype.hasOwnProperty;
function It(e, t) {
	return Pt ? Reflect.has(e, t) : Ft.call(e, t);
}
function Lt(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		z(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Vt(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Bt(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function Rt(e) {
	return Nt.call(e);
}
function zt(...e) {
	return e;
}
function Bt(e) {
	return Rt(e) === st;
}
function Vt(e) {
	return Rt(e) === ct;
}
function Ht(e) {
	return Rt(e) === lt;
}
function Ut(e) {
	return Rt(e) === dt;
}
function Wt(e) {
	return ft[Rt(e)];
}
function z(e) {
	let t = Rt(e);
	return ![
		st,
		ut,
		ct,
		lt,
		dt
	].includes(t);
}
function Gt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Kt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function qt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Jt(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function Yt(e) {
	return e && e[tt] || "";
}
function Xt(e, t) {
	let n = Yt(e);
	return n ? n !== t : !1;
}
function Zt(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && Bt(e) && (n = Object.assign({}, e)), Vt(e) && (n = new Map(e)), Ht(e) && (n = new Set(e)), n;
}
function Qt(e, t) {
	return t.immutBase ? e : Zt(e, t.readOnly);
}
function $t(e) {
	let t = e;
	if (!Jt(e)) return e;
	let n = Et[t];
	return n || (n = At(), Et[t] = n), n;
}
function en(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function B(e, t) {
	let n = e;
	return t && (n = V(e, !0)), n.join("|");
}
function V(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = $t(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = $t(i);
	return n[r] = a, n;
}
function tn(e) {
	return e.map((e) => Dt[e] || e);
}
function nn(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || V(t);
	en(i, a) < 0 && (r.push(t), i.push(a));
}
function rn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = en(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function an(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function H(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = Vt(r) ? an(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function on(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = H(e, i);
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
function sn(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = Vt(r) ? an(r, a) : r[a];
	}
}
function cn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		sn(e, r, n);
	}
}
function ln(e, t) {
	let n = B(e), r = "";
	for (let e of t) {
		let t = `${B(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = tn(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var un = /* @__PURE__ */ new Map(), dn = /* @__PURE__ */ new Map(), fn = /* @__PURE__ */ new WeakMap(), pn = /* @__PURE__ */ new Map();
function mn(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function hn(e, t, n) {
	let r = [t], i = U(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function gn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Wt(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = $t(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = vn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = hn(y, e, s), f = V(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = B(i.arrKeyPath, !0), n = Dn(u, e);
			t = ln(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = Dn(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = H(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = H(e, t);
				if (!a) {
					let { val: n } = H(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(V(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(V(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: Ot(),
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
		revoke: zt,
		hasOnOperate: c,
		execOnOperate: zt
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function _n(e) {
	if (!e) return !1;
	let t = xn(e);
	return t ? !t.isImmutBase : !1;
}
function vn(e, t) {
	let n = W(e, t);
	return n ? n.level + 1 : 1;
}
function U(e, t) {
	return t.metaMap.get(e);
}
function W(e, t) {
	return e ? t ? t.metaMap.get(e) || null : G(e) || null : null;
}
function yn(e) {
	return e && G(e) || null;
}
function bn(e) {
	return e && e[tt] || "";
}
function xn(e) {
	return G(e) || null;
}
function G(e) {
	return e[it];
}
function Sn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function Cn(e) {
	return fn.get(e) || jt();
}
function wn(e, t) {
	return fn.set(e, t);
}
function Tn(e) {
	return un.get(e);
}
function En(e, t, n) {
	let r = un.get(e);
	r || (r = {}, un.set(e, r)), r[t] = n;
}
function Dn(e, t) {
	let n = Tn(e);
	return n && n[t] || [];
}
function On(e) {
	return dn.get(e) || [];
}
function kn(e, t, n) {
	let r = un.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (dn.get(e) || []).filter((e, n) => !t.includes(n));
	dn.set(e, i);
}
function An(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => En(n, e, r));
	let i = dn.get(n) || [], a = r.map((e) => B(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = B(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => B(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), dn.set(n, i);
}
function jn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = V(i), s = V(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		nn(n, a, s), An(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function Mn(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function Nn(e, t) {
	return !Bt(e) || bn(e) === t;
}
function Pn(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Lt(n, i, a, (e, n, r) => {
			let i = W(e, t);
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
		if (p === "Array") return Mn(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function Fn(e, t) {
	let n = On(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = H(e.proxyVal, t), i = yn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(B(e)));
		else if (n) for (let e of o) sn(t, e, n.copy);
		else if (s) for (let e of o) sn(t, e, s.self);
	}
	i.length && kn(e.sourceId, i, a);
}
function In(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), Fn(e, a), Pn(e, t), a;
}
function Ln(e) {
	e.rootMeta.scopes.push(e);
}
function Rn(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = gn(e, t, n), c = Qt(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => it === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = zt;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : zt;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function zn(e, t) {
	return e === "Array" || (bt[e] || []).includes(t);
}
function Bn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (z(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Ut(e)) {
			if (r.newNodeStats[c] || e[rt]) return e;
			let n = U(e, o);
			return n || (n = Rn(c, e, t), Ln(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!zn(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Hn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Hn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function Vn(e, t) {
	if (!Bt(e)) return e;
	let n = U(e, t);
	return n ? n.copy : e;
}
function Hn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return mn(t), a(...e);
	}, e.clear = function(...e) {
		return mn(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return mn(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (mn(t), t.hasOnOperate) {
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
				let r = W(n, i), a = r ? r.copy || r.self : n;
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
function Un(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && ht.includes(r) || i === "Array" && pt.includes(r) || i === "Map" && mt.includes(r))) && mn(n);
}
function Wn(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Gn(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = Vn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Un({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = vt[o] || [];
	if (Ut(i) && m.includes(n)) return n === "slice" ? f.slice : (gt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = W(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = W(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = W(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : rn(e);
		} else g();
		let t = p[r];
		z(t) || c.newNodeMap.delete(Wn(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !z(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(Wn(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Kn(e) {
	if (z(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Kn), Object.freeze(e);
	if (Ht(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = zt;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (Vt(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = zt;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Kn(n);
	}), Object.freeze(e);
}
function qn(e) {
	if (!e) return e;
	let t = yn(e);
	return t ? t.self : e;
}
var Jn = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], Yn = {};
Jn.forEach((e) => Yn[e] = 1);
var Xn = {
	[R]: 1,
	Set: 1,
	Map: 1
}, Zn = /* @__PURE__ */ new Map();
function Qn(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[nt] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Mt.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = kt(), p.metaVer = d, pn.set(d, p));
	let m = t.autoRevoke ?? Mt.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (vt[f] || []).includes(t) ? (S = !0, l = (yt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (tt === t) return d;
				let n = e[t];
				if (at.includes(t)) {
					if (Ut(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !It(e, t)) return n;
				let l = n, u = U(e, p), f = jn(t, u, W(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return Xn[h] && Yn[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Bn(n, {
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
				}), h === "Array" && qt(t) || ot[h] && (l = Gn(e, {
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
				let a = !0, s = U(t, p), c = !1, l = i;
				if (_n(i)) if (c = !0, Nn(i, d)) {
					if (Vn(i, p) === t[r]) return !0;
					let e = U(i, p);
					jn(r, s, e), nn(e, s.keyPath.concat(r));
				} else e = !1;
				else if (Xt(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = G(i);
					if (o.sourceId !== n) l = qn(i);
					else {
						let { isGetted: n, val: i } = on(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = G(i);
						Sn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = H(e, t);
							n && Sn(o, G(i), r);
						}), nn(c, u), cn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && qt(r)) return l = y("set", r, {
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
				return u && Gn(t, {
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
				let n = U(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), Gn(e, {
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
				if (z(e)) throw Error("base state can not be primitive");
				if (u) return Zn.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || Cn(e), l = U(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = Rn("", n, {
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
				return Ln(f), f.execOnOperate = y, Zn.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return Zn.delete(t), t;
				let r = U(t, p);
				if (r.isImmutBase && !n) return t;
				let i = In(r, p);
				return l && e && (i = Kn(i)), pn.delete(d), Zn.delete(t), wn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function $n(e) {
	if (!Ut(e)) throw Error("produce callback is not a function");
}
var er = "Not a Limu root draft";
function tr(e) {
	let t = Zn.get(e);
	if (!t) throw bn(e) && xn(e)?.level === 0 ? Error("Draft has been finished!") : Error(er);
	return t;
}
function nr(e, t) {
	return Qn(t).createDraft(e);
}
function rr(e) {
	return tr(e)(e);
}
function ir(e, t) {
	if (Gt(e) || Kt(t)) throw Error("produce callback can not be a promise function or result");
}
function ar(e, t, n) {
	$n(t);
	let r = nr(e, n);
	return ir(t, t(r)), rr(r);
}
function or(e, t, n) {
	if (!t || !Ut(t)) {
		let n = e, r = t;
		return $n(e), (e) => ar(e, n, r);
	}
	return ar(e, t, n);
}
var sr = or;
function cr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function lr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function ur(e, t) {
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
		}, r = cr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => sr(t, e));
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
			let n = cr(t), r = e[t], i = c[`set${n}`];
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
		lr(l, e);
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
function dr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function fr(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function pr(e, t) {
	this.props = e, this.context = t;
}
(pr.prototype = new w()).isPureReactComponent = !0, pr.prototype.shouldComponentUpdate = function(e, t) {
	return fr(this.props, e) || fr(this.state, t);
};
var mr = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), mr && mr(e);
}, typeof Symbol < "u" && Symbol.for;
var hr = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	hr(e, t, n, r);
};
var gr = t.unmount;
function _r(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = dr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return _r(e, t, n);
	})), e;
}
function vr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return vr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function yr() {
	this.__u = 0, this.o = null, this.__b = null;
}
function br(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function xr() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), gr && gr(e);
}, (yr.prototype = new w()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = br(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = vr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, yr.prototype.componentWillUnmount = function() {
	this.o = [];
}, yr.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = _r(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && x(C, null, e.fallback);
	return i && (i.__u &= -33), [x(C, null, t.__a ? null : e.children), i];
};
var Sr = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(xr.prototype = new w()).__a = function(e) {
	var t = this, n = br(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), Sr(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, xr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = A(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, xr.prototype.componentDidUpdate = xr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		Sr(e, n, t);
	});
};
var Cr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, wr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Tr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Er = /[A-Z0-9]/g, Dr = typeof document < "u", Or = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
w.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(w.prototype, e, {
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
var kr = t.event;
t.event = function(e) {
	return kr && (e = kr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Ar = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, jr = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || Dr && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Or(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : Tr.test(a) && (a = s) : s = a = "oninput" : i && wr.test(a) ? a = a.replace(Er, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Ar)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = Cr, jr && jr(e);
};
var Mr = t.__r;
t.__r = function(e) {
	Mr && Mr(e), e.__c;
};
var Nr = t.diffed;
t.diffed = function(e) {
	Nr && Nr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Pr(e) {
	return ur(e, {
		useEffect: We,
		useRef: Ge,
		useState: He
	});
}
//#endregion
//#region src/root/store.ts
var K = Pr({
	octave: 0,
	duty: 1,
	playPos: null,
	loopBars: 1,
	pageIndex: 0,
	notes: [],
	previewNotePitch: null
});
//#endregion
//#region src/utils/helpers.ts
function Fr(e) {
	return Array(e).fill(0).map((e, t) => t);
}
function Ir(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Lr(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? Ir(o, Math.min(r, i), Math.max(r, i)) : o;
}
function Rr(e) {
	return e * 255 >>> 0;
}
function zr(e) {
	return e / 255;
}
function q(e) {
	return `${e}px`;
}
//#endregion
//#region src/root/persistence.ts
var Br = {
	emitStateBytes() {
		let e = K.state;
		return new Uint8Array([
			123,
			45,
			e.octave + 10,
			Rr(e.duty),
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
		let t = e[2] - 10, n = zr(e[3]), r = e[4] / 4, i = e[5] << 8 | e[6], a = [];
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
		].every(Boolean) && K.assign({
			octave: t,
			duty: n,
			loopBars: r,
			notes: a,
			pageIndex: 0
		});
	}
};
//#endregion
//#region src/root/sequencer.ts
function Vr(e, t) {
	return Ir(24 + t * 12 + e, 0, 127);
}
function Hr(e) {
	let t = {
		notes: [],
		octave: 0,
		duty: 1,
		loopBars: 1
	}, n = e?.createNoteOutputPort(), r = /* @__PURE__ */ new Set(), i = null, a = {
		processStep(e, i, a) {
			let o = e % (t.loopBars * 16);
			for (let e of t.notes) if (e.position === o) {
				let o = Lr(t.duty, 0, 1, .2, 1), s = Vr(e.pitch, t.octave);
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
			let r = Vr(e, t.octave);
			n?.noteOn(r), i = r;
		},
		previewNoteOff() {
			i &&= (n?.noteOff(i), null);
		}
	};
}
//#endregion
//#region src/root/drivers.ts
var Ur = et("wafer-v01", import.meta.url), J = Hr(Ur);
function Wr() {
	let e = K.state;
	J.setOctave(e.octave), J.setDuty(e.duty), J.setLoopBars(e.loopBars), J.setNotes(e.notes), Ur?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [800, 450]
		},
		clockHandlers: {
			start() {
				J.start();
			},
			stop() {
				J.stop(), K.setPlayPos(null);
			},
			processScheduling(t, n, r, i) {
				let a = n * 16 % Math.max(e.loopBars * 16, 32);
				K.setPlayPos(a);
				let o = Math.floor(a / 32);
				K.state.pageIndex !== o && K.setPageIndex(o);
			},
			processStep(e, t, n) {
				J.processStep(e, t, n);
			}
		},
		persistence: Br
	});
}
function Gr() {
	return K.subscribe(({ notes: e, previewNotePitch: t, octave: n, duty: r, loopBars: i }) => {
		e !== void 0 && J.setNotes(e), i !== void 0 && J.setLoopBars(i), t !== void 0 && (t === null ? J.previewNoteOff() : J.previewNoteOn(t)), n !== void 0 && J.setOctave(n), r !== void 0 && J.setDuty(r);
	});
}
var Kr = he && he({
	color: void 0,
	size: void 0,
	class: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
}), qr = 0;
Array.isArray;
function Y(e, n, r, i, a, o) {
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
		__v: --qr,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region ../../../node_modules/.pnpm/@jsr+preact-icons__common@1.1.0/node_modules/@jsr/preact-icons__common/lib/iconBase.tsx
var Jr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Yr = /[A-Z0-9]/g;
function Xr(e) {
	let t = {};
	for (let n in e) n.indexOf("-") === -1 && Jr.test(n) ? t[n.replace(Yr, "-$&").toLowerCase()] = e[n] : t[n] = e[n];
	return t;
}
function Zr(e) {
	return e && e.map((e, t) => x(e.tag, {
		key: t,
		...Xr(e.attr)
	}, Zr(e.child || [])));
}
function Qr(e) {
	return (t) => /* @__PURE__ */ Y($r, {
		attr: { ...e.attr },
		...t,
		children: Zr(e.child || [])
	});
}
function $r(e) {
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
		return u = Xr(u), /* @__PURE__ */ Y("svg", {
			...u,
			style: Xr({
				color: e.color || t.color,
				...t.style,
				...e.style
			}),
			xmlns: "http://www.w3.org/2000/svg",
			children: [i && /* @__PURE__ */ Y("title", { children: i }), e.children]
		});
	};
	return Kr === void 0 ? t(Kr) : /* @__PURE__ */ Y(Kr.Consumer, { children: (e) => t(e) });
}
he && he({
	color: void 0,
	size: void 0,
	class: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
});
//#endregion
//#region ../../../node_modules/.pnpm/@jsr+preact-icons__fa@1.0.13/node_modules/@jsr/preact-icons__fa/mod.js
function ei(e) {
	return Qr({
		tag: "svg",
		attr: { viewBox: "0 0 192 512" },
		child: [{
			tag: "path",
			attr: { d: "M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z" }
		}]
	})(e);
}
function ti(e) {
	return Qr({
		tag: "svg",
		attr: { viewBox: "0 0 192 512" },
		child: [{
			tag: "path",
			attr: { d: "M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" }
		}]
	})(e);
}
function ni(e) {
	return Qr({
		tag: "svg",
		attr: { viewBox: "0 0 448 512" },
		child: [{
			tag: "path",
			attr: { d: "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" }
		}]
	})(e);
}
//#endregion
//#region src/common/icons.ts
var ri = {
	CaretLeft: ei,
	CaretRight: ti,
	Trash: ni
}, ii = ({ text: e, children: t, active: n, disabled: r, onClick: i }) => /* @__PURE__ */ Y("div", {
	class: F(P.flexC().wh(40, 30).bg("#888").weight("bold").it, P.color("#fff").cursor("pointer").it, n && P.bg("#48c").it, r && P.opacity(.4).pointerEvents("none").it),
	onClick: i,
	children: [e && /* @__PURE__ */ Y("div", {
		class: P.fontSize(9).it,
		children: e
	}), t]
});
//#endregion
//#region src/utils/color-mod.ts
function ai(e) {
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
function oi(e) {
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
function si(e) {
	return e %= 1, e < 0 && (e += 1), e;
}
function ci(e, t) {
	return t.relative ? si(e + Math.max(-360, Math.min(360, t.amount)) / 360) : si(Math.max(0, Math.min(360, t.amount)) / 360);
}
function li(e, t, n) {
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
function ui(e, t, n) {
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
function di(e, t, n) {
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
function fi(e, t, n) {
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
function pi(e) {
	return e / 100 * 255;
}
function mi(e) {
	return Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0").toUpperCase();
}
function hi(e, t = "") {
	let { r: n, g: r, b: i } = ai(e), a = 255, o = "hsv";
	for (let e of oi(t)) {
		let t = e.amount / 100;
		switch (e.type) {
			case "h":
				if (o === "hsl") {
					let [t, a, o] = di(n, r, i);
					t = ci(t, e), {r: n, g: r, b: i} = fi(t, a, o);
				} else {
					let [t, a, o] = li(n, r, i);
					t = ci(t, e), {r: n, g: r, b: i} = ui(t, a, o);
				}
				break;
			case "v": {
				o = "hsv";
				let [a, s, c] = li(n, r, i);
				c = e.relative ? X(c + t) : X(t), {r: n, g: r, b: i} = ui(a, s, c);
				break;
			}
			case "l": {
				o = "hsl";
				let [a, s, c] = di(n, r, i);
				c = e.relative ? X(c + t) : X(t), {r: n, g: r, b: i} = fi(a, s, c);
				break;
			}
			case "s":
				if (o === "hsl") {
					let [a, o, s] = di(n, r, i);
					o = e.relative ? X(o + t) : X(t), {r: n, g: r, b: i} = fi(a, o, s);
				} else {
					let [a, o, s] = li(n, r, i);
					o = e.relative ? X(o + t) : X(t), {r: n, g: r, b: i} = ui(a, o, s);
				}
				break;
			case "a": a = pi(Math.max(0, Math.min(100, e.amount)));
		}
	}
	return `#${mi(n)}${mi(r)}${mi(i)}${mi(a)}`;
}
//#endregion
//#region src/editor/theme.ts
var Z = {
	panelBody: hi("#445", "h220"),
	pianoRollBg: hi("#334", "h205"),
	pianoRollBgBlackKey: hi("#334", "h205 v-2"),
	gridWeak2: "#0002",
	gridWeak: "#0004",
	gridStrong: "#0006",
	gridStrong2: "#000a",
	noteBg: "#6cc"
}, gi = ({ children: e, className: t }) => /* @__PURE__ */ Y("div", {
	class: F(P.bg(Z.panelBody).p(4).color("#fff").it, t),
	children: e
}), _i = ({ className: e, children: t, disabled: n, onClick: r }) => /* @__PURE__ */ Y("button", {
	class: F(P.css({ all: "unset" }).mt(3).bg("none").color("white").it, P.p(2).cursor("pointer").it, n && P.opacity(.3).pointerEvents("none").it, e),
	onClick: r,
	children: t
});
//#endregion
//#region src/utils/drag-session.ts
function vi(e, t, n) {
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
function yi(e) {
	return /* @__PURE__ */ Y("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			vi(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = Ir(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
var bi = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, onClick: a, disabled: o }) => {
	let s = Lr(e, n, r, -135, 135);
	return /* @__PURE__ */ Y(yi, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ Y("div", {
			class: P.wh(30, 30).rounded("100%").relative().bg("#888").it,
			style: { opacity: o ? .5 : 1 },
			children: /* @__PURE__ */ Y("div", {
				class: P.full().flexVA().it,
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ Y("div", { class: P.wh(2, 10).bg("#fff").it })
			})
		})
	});
}, xi = ({ className: e, label: t, children: n, labelAlign: r = "center", width: i, contentHeight: a = 40 }) => /* @__PURE__ */ Y("div", {
	class: P.flexV().addClass(e).it,
	style: i ? { width: q(i) } : void 0,
	children: [/* @__PURE__ */ Y("div", {
		class: P.fontSize(11).weight("bold").h(13).it,
		style: { textAlign: r },
		children: t
	}), /* @__PURE__ */ Y("div", {
		class: P.flexC().h(a).it,
		children: n
	})]
}), Si = ({ children: e, onShift: t }) => /* @__PURE__ */ Y("div", {
	onClick: (e) => {
		let n = e.currentTarget.getBoundingClientRect();
		e.clientX - n.left < n.width / 2 ? t(-1) : t(1);
	},
	children: e
}), Ci = ({ options: e, value: t, onChange: n, minWidth: r = 60 }) => {
	let i = e.findIndex((e) => e.value === t), a = e[i], o = i > 0, s = i < e.length - 1;
	return /* @__PURE__ */ Y(Si, {
		onShift: (t) => {
			let r = i + t;
			r < 0 || r >= e.length || n(e[r].value);
		},
		children: /* @__PURE__ */ Y("div", {
			class: F(P.flexHA().fJustify("between").minW(r).h(30).it, P.bg("#888").fontSize(14).cursor("pointer").it),
			children: [
				/* @__PURE__ */ Y(ri.CaretLeft, {
					size: 13,
					class: F(P.ml(-.75).it, !o && P.invisible().it)
				}),
				/* @__PURE__ */ Y("div", { children: a?.label }),
				/* @__PURE__ */ Y(ri.CaretRight, {
					size: 13,
					class: F(P.mr(-.75).it, !s && P.invisible().it)
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
}, wi = [
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
], Ti = Fr(Q.numKeys).map((e) => {
	let t = (e / 12 >>> 0) + 2;
	return `${wi[e % 12]}${t}`;
}), Ei = ({ nx: e, ny: t, width: n, height: r }) => {
	let { cellW: i, cellH: a } = Q;
	return /* @__PURE__ */ Y("div", {
		style: {
			width: q(n),
			height: q(r),
			border: "solid 0.5px #222"
		},
		children: Array.from({ length: e * t }).map((n, r) => {
			let o = r % e, s = Math.floor(r / e), c = o * i, l = s * a, u = (t - s - 1) % 12, d = Z.pianoRollBg, f = Z.gridWeak2;
			[
				1,
				3,
				6,
				8,
				10
			].includes(u) && (d = Z.pianoRollBgBlackKey), o % 4 == 3 && (f = Z.gridStrong), o === 15 && (f = Z.gridStrong2);
			let p = u === 0 || u === 5;
			return /* @__PURE__ */ Y("div", { style: {
				position: "absolute",
				left: q(c),
				top: q(l),
				width: q(i),
				height: q(a),
				borderRight: `solid 0.5px ${f}`,
				borderBottom: p ? `solid 0.5px ${Z.gridStrong}` : "none",
				backgroundColor: d
			} }, `${o}-${s}`);
		})
	});
}, Di = [
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
function Oi(e, t) {
	let n = Di[e], r = {
		width: "100%",
		background: "#fff",
		height: t,
		left: 0
	};
	return n === "whiteL" ? (r.height += t / 2, r.bottom = 0) : n === "whiteM" ? (r.height += t, r.top = 0, r.bottom = 0, r.margin = "auto 0") : n === "whiteH" ? (r.height += t / 2, r.top = 0) : n === "black" && (r.zIndex = 1, r.width = "63%", r.background = "linear-gradient(to right, #222, #666)", r.top = 0, r.bottom = 0, r.margin = "auto 0"), (e === 0 || e === 5) && (r.borderBottom = "solid 0.5px #0003"), e === 0 && (r.background = "#e4e4e4"), r;
}
var ki = ({ yi: e }) => {
	let { cellH: t } = Q, n = e % 12, r = n === 0 && Ti[e], [i, a] = He(!1), o = Oi(n, t);
	return /* @__PURE__ */ Y("div", {
		class: F(P.wh(80, t).css({ pointerEvents: "none" }).relative().it),
		children: /* @__PURE__ */ Y("div", {
			class: F(P.absolute().it, P.pointerEvents("auto").cursor("pointer").it, i && P.bg("#4dd!important").it),
			style: o,
			onPointerDown: (t) => {
				a(!0), K.setPreviewNotePitch(e), vi(t, { onUpOrCancel() {
					a(!1), K.setPreviewNotePitch(null);
				} });
			},
			children: r && /* @__PURE__ */ Y("div", {
				class: F(P.flexHA().h("full").fJustify("end").p(1).it, P.color("#666").fontSize(12).it, "font-monospace"),
				children: r
			})
		})
	});
}, Ai = () => {
	let { numKeys: e } = Q;
	return /* @__PURE__ */ Y("div", { children: Fr(e).map((t) => /* @__PURE__ */ Y(ki, { yi: e - t - 1 }, t)) });
};
//#endregion
//#region src/editor/piano-roll-editor-view.tsx
function ji(e, t) {
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
function Mi(e, t, n) {
	let r = K.state, { sectionStride: i } = ji(r.loopBars, r.pageIndex), a = e.getBoundingClientRect(), o = (t - a.left) / a.width * i, s = Math.floor(o), c = (1 - (n - a.top) / a.height) * Q.numKeys;
	return {
		xi: s,
		xiFloat: o,
		yi: Math.floor(c),
		yiFloat: c
	};
}
function Ni(e, t, n, r) {
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
var Pi = 1, $ = {
	addNote(e, t) {
		let n = {
			id: K.state.notes.length > 0 ? Math.max(...K.state.notes.map((e) => e.id)) + 1 : 0,
			position: e,
			duration: Pi,
			pitch: t
		};
		return K.setNotes((e) => [...e, n]), n;
	},
	setNoteAttrs(e, t) {
		K.setNotes((n) => n.map((n) => n.id === e ? {
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
		K.setNotes((t) => t.filter((t) => t.id !== e));
	},
	startInsertNewNote(e, t) {
		let { xi: n, yi: r } = Mi(e.currentTarget, e.clientX, e.clientY), i = t.offset + n, a = $.addNote(i, r);
		$.startMoveNote(e, a);
	},
	startMoveNote(e, t) {
		let n = t, r = e.currentTarget, i = Mi(r, e.clientX, e.clientY);
		K.setPreviewNotePitch(t.pitch), vi(e, {
			onMove(e) {
				let a = Mi(r, e.position.x, e.position.y), o = a.xi - i.xi, s = a.yi - i.yi, c = t.position + o, l = t.pitch + s;
				K.state.previewNotePitch !== l && K.setPreviewNotePitch(l), n = $.updateNoteXY(n, c, l);
			},
			onUpOrCancel() {
				K.setPreviewNotePitch(null);
			}
		}, { coordinate: "page" });
	},
	startAdjustDuration(e, t) {
		let n = e.currentTarget, r = Mi(n, e.clientX, e.clientY), i = t.id, a = t.duration, o = !1;
		vi(e, {
			onMove(e) {
				let s = Mi(n, e.position.x, e.position.y).xi - r.xi, c = t.duration + s;
				c !== a && ($.setNoteAttrs(i, { duration: c }), a = c, o = !0);
			},
			onUp() {
				a <= 0 ? $.removeNote(i) : o && (Pi = a);
			}
		}, { coordinate: "page" });
	}
}, Fi = ({ notes: e, sectionRange: t }) => {
	let [n, r] = He(null), i = (i) => {
		let { xiFloat: a, yi: o } = Mi(i.currentTarget, i.clientX, i.clientY), s = Ni(e, t, a, o);
		s?.part === "body" && n?.part !== "body" || s?.part === "tail" && n?.part !== "tail" ? r(s) : n && !s && r(null);
	}, a = (e) => {
		n?.part === "tail" ? $.startAdjustDuration(e, n.note) : n?.part === "body" ? $.startMoveNote(e, n.note) : $.startInsertNewNote(e, t);
	}, o = "auto";
	return n?.part === "body" ? o = "move" : n?.part === "tail" && (o = "e-resize"), /* @__PURE__ */ Y("div", {
		class: P.absoluteFull().it,
		onPointerDown: a,
		onPointerMove: i,
		style: { cursor: o }
	});
}, Ii = ({ note: e, sectionRange: t }) => {
	let { cellW: n, cellH: r } = Q, i = r - 2, a = e.position - t.offset, o = e.pitch, s = e.duration;
	return /* @__PURE__ */ Y("div", { children: /* @__PURE__ */ Y("div", {
		class: P.absolute().flexC().cursor("pointer").it,
		style: {
			left: q(a * n),
			bottom: q(o * r),
			width: q(n * s - .5),
			height: q(r)
		},
		children: /* @__PURE__ */ Y("div", {
			class: F(P.bg(Z.noteBg).w("full").flexHA().it, P.h(i).css({ border: "solid 0.5px #0004" }).it, P.rounded(2).pl(.5).it, P.color("#0008").fontSize(10).it, "font-monospace"),
			children: Ti[o]
		})
	}) }, e.id);
}, Li = ({ notes: e, sectionRange: t }) => /* @__PURE__ */ Y("div", {
	class: P.absoluteFull().it,
	children: e.filter((e) => t.offset <= e.position && e.position < t.offset + t.duration).map((e) => /* @__PURE__ */ Y(Ii, {
		note: e,
		sectionRange: t
	}, e.id))
}), Ri = ({ notes: e, sectionRange: t }) => {
	let { cellW: n, cellH: r, numKeys: i } = Q, a = r * i, o = n * t.duration;
	return /* @__PURE__ */ Y("div", {
		class: F(P.relative().wh(o, a).it, P.overflow("hidden").it),
		children: [/* @__PURE__ */ Y(Li, {
			notes: e,
			sectionRange: t
		}), /* @__PURE__ */ Y(Fi, {
			notes: e,
			sectionRange: t
		})]
	});
}, zi = () => {
	let e = K.useSnapshot(), { nx: t, sectionOffset: n, sectionStride: r } = ji(e.loopBars, e.pageIndex), i = Ke(() => ({
		offset: n,
		duration: r
	}), [n, r]);
	return /* @__PURE__ */ Y("div", {
		class: P.absoluteFull().flexH().it,
		children: Fr(t).map((t) => /* @__PURE__ */ Y(Ri, {
			notes: e.notes,
			sectionRange: i
		}, t))
	});
}, Bi = () => {
	let { cellW: e } = Q, { playPos: t } = K.useSnapshot();
	if (t === null) return;
	let n = e * 1.5, r = t % 32;
	return /* @__PURE__ */ Y("div", {
		class: F(P.absolute().top(0).wh(n, "full").pointerEvents("none").it, P.css({ borderRight: "solid 1px #0ff4" }).it, P.bg("linear-gradient(to right, #0cc0, #0ff3)").it),
		style: { left: q(r * e - n) }
	});
}, Vi = () => {
	let { cellW: e, cellH: t, numKeys: n } = Q, r = e * 32, i = t * n, a = Ge(null);
	return We(() => {
		let e = a.current;
		e && (e.scrollTop = e.scrollHeight / 2 - e.clientHeight / 2);
	}, []), /* @__PURE__ */ Y("div", {
		ref: a,
		class: F(P.flexH().gap(.5).h(340).it, P.overflowXY("hidden", "scroll").it),
		children: [/* @__PURE__ */ Y(Ai, {}), /* @__PURE__ */ Y("div", {
			class: P.relative().wh(r, i).flexH().it,
			children: [
				/* @__PURE__ */ Y(Ei, {
					nx: 32,
					ny: n,
					width: r,
					height: i
				}),
				/* @__PURE__ */ Y(zi, {}),
				/* @__PURE__ */ Y(Bi, {})
			]
		})]
	});
};
//#endregion
//#region src/utils/selector-option.ts
function Hi(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region src/root/page-root.tsx
var Ui = () => /* @__PURE__ */ Y(xi, {
	label: "duty",
	children: /* @__PURE__ */ Y(bi, {
		value: K.useSnapshot().duty,
		onChange: K.setDuty
	})
}), Wi = () => /* @__PURE__ */ Y(xi, {
	label: "octave",
	children: /* @__PURE__ */ Y(bi, {
		value: K.useSnapshot().octave,
		min: -2,
		max: 2,
		step: 1,
		onChange: K.setOctave
	})
}), Gi = Hi([
	.25,
	.5,
	1,
	2,
	4,
	8,
	16
].map((e) => [e, `${e < 1 ? `1/${1 / e}` : e}`])), Ki = () => /* @__PURE__ */ Y(xi, {
	label: "loop bars",
	children: /* @__PURE__ */ Y(Ci, {
		minWidth: 50,
		value: K.useSnapshot().loopBars,
		options: Gi,
		onChange: K.setLoopBars
	})
}), qi = () => /* @__PURE__ */ Y(Vi, {}), Ji = () => {
	let e = K.useSnapshot(), t = Math.max(1, e.loopBars / 2), n = e.pageIndex > 0, r = e.pageIndex < t - 1, i = (t) => {
		K.setPageIndex(e.pageIndex + t);
	};
	return /* @__PURE__ */ Y(xi, {
		label: "",
		children: /* @__PURE__ */ Y("div", {
			class: P.flexHA().gap(2).it,
			children: [
				/* @__PURE__ */ Y(ii, {
					disabled: !n,
					onClick: () => i(-1),
					children: /* @__PURE__ */ Y(ri.CaretLeft, {})
				}),
				/* @__PURE__ */ Y("div", {
					class: P.w(50).flexC().it,
					children: [
						e.pageIndex + 1,
						" / ",
						t
					]
				}),
				/* @__PURE__ */ Y(ii, {
					disabled: !r,
					onClick: () => i(1),
					children: /* @__PURE__ */ Y(ri.CaretRight, {})
				})
			]
		})
	});
}, Yi = () => /* @__PURE__ */ Y(_i, {
	disabled: !(K.useSnapshot().notes.length > 0),
	onClick: () => K.setNotes([]),
	children: /* @__PURE__ */ Y(ri.Trash, {})
}), Xi = () => /* @__PURE__ */ Y("div", {
	class: P.w("full").flexV().gap(4).it,
	children: /* @__PURE__ */ Y("div", {
		class: P.flexHA().fJustify("between").it,
		children: [/* @__PURE__ */ Y("div", {
			class: P.weight("bold").fontSize(24).it,
			children: "Fluorite Piano Roll"
		}), /* @__PURE__ */ Y("div", {
			class: P.flexHA().gap(7).it,
			children: [/* @__PURE__ */ Y("div", {
				class: P.flexHA().gap(6).it,
				children: [
					/* @__PURE__ */ Y(Yi, {}),
					/* @__PURE__ */ Y(Wi, {}),
					/* @__PURE__ */ Y(Ui, {}),
					/* @__PURE__ */ Y(Ki, {})
				]
			}), /* @__PURE__ */ Y(Ji, {})]
		})]
	})
}), Zi = () => /* @__PURE__ */ Y(gi, {
	className: F(P.wh(800, 450).flexC().it),
	children: /* @__PURE__ */ Y("div", {
		class: P.flexV().gap(2).it,
		children: [/* @__PURE__ */ Y(Xi, {}), /* @__PURE__ */ Y(qi, {})]
	})
});
//#endregion
//#region src/root/app.tsx
Wr();
var Qi = () => (We(Gr, []), /* @__PURE__ */ Y(Zi, {})), $i = _e((e) => (me(/* @__PURE__ */ Y("div", {
	class: P.bg(Z.panelBody).flexC().it,
	children: /* @__PURE__ */ Y(Qi, {})
}), e), () => {
	me(null, e);
}), {
	cssTexts: ["*{box-sizing:border-box;margin:0;padding:0}body{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}.font-monospace{font-family:Roboto Mono,monospace}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap", "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"],
	adoptedStyleSheets: [ke.sheet]
});
//#endregion
export { $i as default };
