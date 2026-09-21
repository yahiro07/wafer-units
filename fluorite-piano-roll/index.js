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
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = x(null, o, null, null, null) : _(o) ? o = e.__k[a] = x(S, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = j(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
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
function j(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function ne(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || g.test(t) ? n : n + "px";
}
function M(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ne(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || ne(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(u, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[l] = r[l] : (n[l] = d, e.addEventListener(t, a ? p : f, a)) : e.removeEventListener(t, a ? p : f, a);
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
	var d, f, p, m, g, b, x, ee, T, E, D, O, k, A, j, ne, M = n.type;
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
			p.state = p.__s, p.getChildContext != null && (i = v(v({}, i), p.getChildContext())), E && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(g, b)), j = d != null && d.type === S && d.key == null ? se(d.props.children) : d, c = te(e, _(j) ? j : [j], n, r, i, a, o, s, c, l, u), p.base = n.__e, n.__u &= -161, p.__h.length && s.push(p), ee && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, n.__v = null, l || o != null) {
				if (e.then) {
					for (n.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), n.__e = c;
				} else if (o != null) for (ne = o.length; ne--;) y(o[ne]);
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
//#region ../../../node_modules/.pnpm/wafer-host@0.1.16_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
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
function _e(...e) {
	return e.filter(Boolean).join(" ");
}
function ve(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function ye(e) {
	let t = "{";
	for (let n in e) t += `${ve(n)}${typeof e[n] == "object" ? ye(e[n]) : `:${e[n]}`};`;
	return t += "}", t;
}
function be() {
	let e = new CSSStyleSheet(), t = /* @__PURE__ */ new Set();
	function n(n) {
		let r = ye(n);
		if (r === "") return "";
		let i = `cs-${ge(r)}`;
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
	}
	function r(...e) {
		return e.map((e) => typeof e == "object" && e ? n(e) : e).filter(Boolean).join(" ");
	}
	let i = new Proxy({}, { get(e, t) {
		return (e) => ({ children: n }) => b(t, { class: r(e) }, n);
	} });
	return {
		css: r,
		cz: _e,
		cssRealm: { sheet: e },
		styled: i
	};
}
//#endregion
//#region src/common/css-realm.ts
var { css: xe, styled: Se, cssRealm: Ce } = be(), we, N, Te, Ee, De = 0, Oe = [], P = t, ke = P.__b, Ae = P.__r, je = P.diffed, Me = P.__c, Ne = P.unmount, Pe = P.__;
function Fe(e, t) {
	P.__h && P.__h(N, e, De || t), De = 0;
	var n = N.__H || (N.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Ie(e) {
	return De = 1, Le(qe, e);
}
function Le(e, t, n) {
	var r = Fe(we++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : qe(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = N, !N.__f)) {
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
		N.__f = !0;
		var a = N.shouldComponentUpdate, o = N.componentWillUpdate;
		N.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, N.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Re(e, t) {
	var n = Fe(we++, 3);
	!P.__s && Ke(n.__H, t) && (n.__ = e, n.u = t, N.__H.__h.push(n));
}
function ze(e) {
	return De = 5, Be(function() {
		return { current: e };
	}, []);
}
function Be(e, t) {
	var n = Fe(we++, 7);
	return Ke(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ve() {
	for (var e; e = Oe.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(We), t.__h.some(Ge), t.__h = [];
		} catch (n) {
			t.__h = [], P.__e(n, e.__v);
		}
	}
}
P.__b = function(e) {
	N = null, ke && ke(e);
}, P.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Pe && Pe(e, t);
}, P.__r = function(e) {
	Ae && Ae(e), we = 0;
	var t = (N = e.__c).__H;
	t && (Te === N ? (t.__h = [], N.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(We), t.__h.some(Ge), t.__h = [], we = 0)), Te = N;
}, P.diffed = function(e) {
	je && je(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Oe.push(t) !== 1 && Ee === P.requestAnimationFrame || ((Ee = P.requestAnimationFrame) || Ue)(Ve)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), Te = N = null;
}, P.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(We), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ge(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], P.__e(n, e.__v);
		}
	}), Me && Me(e, t);
}, P.unmount = function(e) {
	Ne && Ne(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			We(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && P.__e(t, n.__v));
};
var He = typeof requestAnimationFrame == "function";
function Ue(e) {
	var t, n = function() {
		clearTimeout(r), He && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	He && (t = requestAnimationFrame(n));
}
function We(e) {
	var t = N, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), N = t;
}
function Ge(e) {
	var t = N;
	e.__c = e.__(), N = t;
}
function Ke(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function qe(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.16_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function Je(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-VSv4Uyxk.js
var Ye = Symbol("V"), Xe = Symbol("IMMUT_BASE"), Ze = Symbol("IS_RAW"), Qe = Symbol("P"), F = "Array", $e = [
	Symbol.iterator,
	Symbol.toStringTag,
	Ze
], et = {
	Map: "Map",
	Set: "Set",
	Array: F
}, tt = "[object Object]", nt = "[object Map]", rt = "[object Set]", it = "[object Array]", at = "[object Function]", ot = {
	[nt]: "Map",
	[rt]: "Set",
	[it]: F,
	[tt]: "Object"
}, st = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], ct = [
	"set",
	"clear",
	"delete"
], lt = [
	"add",
	"clear",
	"delete"
], ut = [
	"splice",
	"sort",
	"unshift",
	"shift"
], dt = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), ft = {
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
	[F]: dt
}, pt = {
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
	[F]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, mt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[F]: ["forEach", "map"]
};
function ht(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var gt = {
	value: 0,
	prefixSeed: 1
}, _t = {
	value: 0,
	prefixSeed: 1
}, vt = {
	value: 0,
	prefixSeed: 1
}, yt = {
	value: 0,
	prefixSeed: 1
}, bt = {}, xt = {};
function St() {
	return ht(_t, "MID_");
}
function Ct() {
	return ht(gt, "MV_");
}
function wt() {
	return ht(vt, "SI_");
}
function Tt() {
	return ht(yt, "SR_");
}
var Et = {
	autoFreeze: !1,
	autoRevoke: !0
}, Dt = Object.prototype.toString, Ot = !!Reflect, kt = Object.prototype.hasOwnProperty;
function At(e, t) {
	return Ot ? Reflect.has(e, t) : kt.call(e, t);
}
function jt(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		R(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Nt(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), Mt(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function I(e) {
	return Dt.call(e);
}
function L(...e) {
	return e;
}
function Mt(e) {
	return I(e) === tt;
}
function Nt(e) {
	return I(e) === nt;
}
function Pt(e) {
	return I(e) === rt;
}
function Ft(e) {
	return I(e) === at;
}
function It(e) {
	return ot[I(e)];
}
function R(e) {
	let t = I(e);
	return ![
		tt,
		it,
		nt,
		rt,
		at
	].includes(t);
}
function Lt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Rt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function zt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Bt(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function Vt(e) {
	return e && e[Ye] || "";
}
function Ht(e, t) {
	let n = Vt(e);
	return n ? n !== t : !1;
}
function Ut(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && Mt(e) && (n = Object.assign({}, e)), Nt(e) && (n = new Map(e)), Pt(e) && (n = new Set(e)), n;
}
function Wt(e, t) {
	return t.immutBase ? e : Ut(e, t.readOnly);
}
function Gt(e) {
	let t = e;
	if (!Bt(e)) return e;
	let n = bt[t];
	return n || (n = wt(), bt[t] = n), n;
}
function Kt(e, t) {
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
		let t = Gt(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Gt(i);
	return n[r] = a, n;
}
function qt(e) {
	return e.map((e) => xt[e] || e);
}
function Jt(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || B(t);
	Kt(i, a) < 0 && (r.push(t), i.push(a));
}
function Yt(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Kt(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function Xt(e, t) {
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
		n = Nt(r) ? Xt(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function Zt(e, t) {
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
function Qt(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = Nt(r) ? Xt(r, a) : r[a];
	}
}
function $t(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		Qt(e, r, n);
	}
}
function en(e, t) {
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
		let e = qt(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var tn = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new Map();
function on(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function sn(e, t, n) {
	let r = [t], i = H(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function cn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = It(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Gt(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = un(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = sn(y, e, s), f = B(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = z(i.arrKeyPath, !0), n = yn(u, e);
			t = en(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = yn(u, n);
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
		id: St(),
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
function ln(e) {
	if (!e) return !1;
	let t = pn(e);
	return t ? !t.isImmutBase : !1;
}
function un(e, t) {
	let n = U(e, t);
	return n ? n.level + 1 : 1;
}
function H(e, t) {
	return t.metaMap.get(e);
}
function U(e, t) {
	return e ? t ? t.metaMap.get(e) || null : W(e) || null : null;
}
function dn(e) {
	return e && W(e) || null;
}
function fn(e) {
	return e && e[Ye] || "";
}
function pn(e) {
	return W(e) || null;
}
function W(e) {
	return e[Qe];
}
function mn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function hn(e) {
	return rn.get(e) || Tt();
}
function gn(e, t) {
	return rn.set(e, t);
}
function _n(e) {
	return tn.get(e);
}
function vn(e, t, n) {
	let r = tn.get(e);
	r || (r = {}, tn.set(e, r)), r[t] = n;
}
function yn(e, t) {
	let n = _n(e);
	return n && n[t] || [];
}
function bn(e) {
	return nn.get(e) || [];
}
function xn(e, t, n) {
	let r = tn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (nn.get(e) || []).filter((e, n) => !t.includes(n));
	nn.set(e, i);
}
function Sn(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => vn(n, e, r));
	let i = nn.get(n) || [], a = r.map((e) => z(e, !0)), o = !1;
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
	o || i.push(r), nn.set(n, i);
}
function Cn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = B(i), s = B(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Jt(n, a, s), Sn(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function wn(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function Tn(e, t) {
	return !Mt(e) || fn(e) === t;
}
function En(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		jt(n, i, a, (e, n, r) => {
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
		if (p === "Array") return wn(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function Dn(e, t) {
	let n = bn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = V(e.proxyVal, t), i = dn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(z(e)));
		else if (n) for (let e of o) Qt(t, e, n.copy);
		else if (s) for (let e of o) Qt(t, e, s.self);
	}
	i.length && xn(e.sourceId, i, a);
}
function On(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), Dn(e, a), En(e, t), a;
}
function kn(e) {
	e.rootMeta.scopes.push(e);
}
function An(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = cn(e, t, n), c = Wt(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => Qe === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = L;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : L;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function jn(e, t) {
	return e === "Array" || (mt[e] || []).includes(t);
}
function Mn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (R(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Ft(e)) {
			if (r.newNodeStats[c] || e[Ze]) return e;
			let n = H(e, o);
			return n || (n = An(c, e, t), kn(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!jn(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Pn(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Pn(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function Nn(e, t) {
	if (!Mt(e)) return e;
	let n = H(e, t);
	return n ? n.copy : e;
}
function Pn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return on(t), a(...e);
	}, e.clear = function(...e) {
		return on(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return on(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (on(t), t.hasOnOperate) {
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
function Fn(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && lt.includes(r) || i === "Array" && st.includes(r) || i === "Map" && ct.includes(r))) && on(n);
}
function In(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function Ln(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = Nn(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Fn({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = ft[o] || [];
	if (Ft(i) && m.includes(n)) return n === "slice" ? f.slice : (ut.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
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
			t.length === 1 ? e.isDel = !0 : Yt(e);
		} else g();
		let t = p[r];
		R(t) || c.newNodeMap.delete(In(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !R(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(In(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Rn(e) {
	if (R(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Rn), Object.freeze(e);
	if (Pt(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = L;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (Nt(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = L;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Rn(n);
	}), Object.freeze(e);
}
function zn(e) {
	if (!e) return e;
	let t = dn(e);
	return t ? t.self : e;
}
var Bn = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], Vn = {};
Bn.forEach((e) => Vn[e] = 1);
var Hn = {
	[F]: 1,
	Set: 1,
	Map: 1
}, Un = /* @__PURE__ */ new Map();
function Wn(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[Xe] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Et.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = Ct(), p.metaVer = d, an.set(d, p));
	let m = t.autoRevoke ?? Et.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (ft[f] || []).includes(t) ? (S = !0, l = (pt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (Ye === t) return d;
				let n = e[t];
				if ($e.includes(t)) {
					if (Ft(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !At(e, t)) return n;
				let l = n, u = H(e, p), f = Cn(t, u, U(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return Hn[h] && Vn[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = Mn(n, {
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
				}), h === "Array" && zt(t) || et[h] && (l = Ln(e, {
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
				if (ln(i)) {
					if (c = !0, Tn(i, d)) {
						if (Nn(i, p) === t[r]) return !0;
						let e = H(i, p);
						Cn(r, s, e), Jt(e, s.keyPath.concat(r));
					} else e = !1;
				} else if (Ht(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = W(i);
					if (o.sourceId !== n) l = zn(i);
					else {
						let { isGetted: n, val: i } = Zt(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = W(i);
						mn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = V(e, t);
							n && mn(o, W(i), r);
						}), Jt(c, u), $t(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && zt(r)) return l = y("set", r, {
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
				return u && Ln(t, {
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
				}), Ln(e, {
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
				if (u) return Un.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || hn(e), l = H(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = An("", n, {
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
				return kn(f), f.execOnOperate = y, Un.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return Un.delete(t), t;
				let r = H(t, p);
				if (r.isImmutBase && !n) return t;
				let i = On(r, p);
				return l && e && (i = Rn(i)), an.delete(d), Un.delete(t), gn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Gn(e) {
	if (!Ft(e)) throw Error("produce callback is not a function");
}
var Kn = "Not a Limu root draft";
function qn(e) {
	let t = Un.get(e);
	if (!t) throw fn(e) && pn(e)?.level === 0 ? Error("Draft has been finished!") : Error(Kn);
	return t;
}
function Jn(e, t) {
	return Wn(t).createDraft(e);
}
function Yn(e) {
	return qn(e)(e);
}
function Xn(e, t) {
	if (Lt(e) || Rt(t)) throw Error("produce callback can not be a promise function or result");
}
function Zn(e, t, n) {
	Gn(t);
	let r = Jn(e, n);
	return Xn(t, t(r)), Yn(r);
}
function Qn(e, t, n) {
	if (!t || !Ft(t)) {
		let n = e, r = t;
		return Gn(e), (e) => Zn(e, n, r);
	}
	return Zn(e, t, n);
}
var $n = Qn;
function er(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function tr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function nr(e, t) {
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
		}, r = er(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => $n(t, e));
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
			let n = er(t), r = e[t], i = c[`set${n}`];
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
		tr(l, e);
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
function rr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function ir(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function ar(e, t) {
	this.props = e, this.context = t;
}
(ar.prototype = new C()).isPureReactComponent = !0, ar.prototype.shouldComponentUpdate = function(e, t) {
	return ir(this.props, e) || ir(this.state, t);
};
var or = t.__b;
t.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), or && or(e);
}, typeof Symbol < "u" && Symbol.for;
var sr = t.__e;
t.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	sr(e, t, n, r);
};
var cr = t.unmount;
function lr(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = rr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return lr(e, t, n);
	})), e;
}
function ur(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return ur(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function dr() {
	this.__u = 0, this.o = null, this.__b = null;
}
function fr(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function pr() {
	this.i = null, this.l = null;
}
t.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), cr && cr(e);
}, (dr.prototype = new C()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = fr(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = ur(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, dr.prototype.componentWillUnmount = function() {
	this.o = [];
}, dr.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = lr(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && b(S, null, e.fallback);
	return i && (i.__u &= -33), [b(S, null, t.__a ? null : e.children), i];
};
var mr = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(pr.prototype = new C()).__a = function(e) {
	var t = this, n = fr(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), mr(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, pr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = A(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, pr.prototype.componentDidUpdate = pr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		mr(e, n, t);
	});
};
var hr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, gr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, _r = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, vr = /[A-Z0-9]/g, yr = typeof document < "u", br = function(e) {
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
var xr = t.event;
t.event = function(e) {
	return xr && (e = xr(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Sr = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, Cr = t.vnode;
t.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || yr && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || br(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : _r.test(a) && (a = s) : s = a = "oninput" : i && gr.test(a) ? a = a.replace(vr, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = A(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Sr)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = hr, Cr && Cr(e);
};
var wr = t.__r;
t.__r = function(e) {
	wr && wr(e), e.__c;
};
var Tr = t.diffed;
t.diffed = function(e) {
	Tr && Tr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.14_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Er(e) {
	return nr(e, {
		useEffect: Re,
		useRef: ze,
		useState: Ie
	});
}
//#endregion
//#region src/root/store.ts
var G = Er({
	octave: 0,
	duty: 1,
	playPos: null,
	loopBars: 2,
	pageIndex: 0,
	notes: [],
	previewNotePitch: null,
	stateLoadRevision: 0,
	viewActive: !1
});
//#endregion
//#region src/utils/helpers.ts
function Dr(e) {
	return Array(e).fill(0).map((e, t) => t);
}
function Or(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function kr(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? Or(o, Math.min(r, i), Math.max(r, i)) : o;
}
function Ar(e) {
	return e * 255 >>> 0;
}
function jr(e) {
	return e / 255;
}
function Mr(e) {
	return `${e}px`;
}
//#endregion
//#region src/root/persistence.ts
var Nr = {
	emitStateBytes() {
		let e = G.state;
		return new Uint8Array([
			123,
			45,
			e.octave + 10,
			Ar(e.duty),
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
		let t = e[2] - 10, n = jr(e[3]), r = e[4] / 4, i = e[5] << 8 | e[6], a = [];
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
function Pr(e, t) {
	return Or(24 + t * 12 + e, 0, 127);
}
function Fr(e) {
	let t = {
		notes: [],
		octave: 0,
		duty: 1,
		loopBars: 1
	}, n = e?.createNoteOutputPort(), r = /* @__PURE__ */ new Set(), i = null, a = {
		processStep(e, i, a) {
			let o = e % (t.loopBars * 16);
			for (let e of t.notes) if (e.position === o) {
				let o = kr(t.duty, 0, 1, .2, 1), s = Pr(e.pitch, t.octave);
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
			let r = Pr(e, t.octave);
			n?.noteOn(r), i = r;
		},
		previewNoteOff() {
			i &&= (n?.noteOff(i), null);
		}
	};
}
//#endregion
//#region src/root/drivers.ts
var Ir = Je("wafer-v01", import.meta.url), K = Fr(Ir);
function Lr() {
	let e = G.state;
	Ir ? Ir.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [800, 450]
		},
		clockHandlers: {
			start() {
				K.start();
			},
			stop() {
				K.stop(), G.setPlayPos(null);
			},
			processScheduling(t, n, r, i) {
				let a = n * 16 % Math.max(e.loopBars * 16, 32);
				G.setPlayPos(a);
				let o = Math.floor(a / 32);
				G.state.pageIndex !== o && G.setPageIndex(o);
			},
			processStep(e, t, n) {
				K.processStep(e, t, n);
			}
		},
		unitCallbacks: { setViewActive: G.setViewActive },
		persistence: Nr
	}) : G.setViewActive(!0);
}
function Rr() {
	return G.subscribe(({ notes: e, previewNotePitch: t, octave: n, duty: r, loopBars: i }) => {
		e !== void 0 && K.setNotes(e), i !== void 0 && K.setLoopBars(i), t !== void 0 && (t === null ? K.previewNoteOff() : K.previewNoteOn(t)), n !== void 0 && K.setOctave(n), r !== void 0 && K.setDuty(r);
	}, !0);
}
//#endregion
//#region src/utils/cz.ts
function q(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var zr = 0;
Array.isArray;
function J(e, n, r, i, a, o) {
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
		__v: --zr,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return t.vnode && t.vnode(u), u;
}
//#endregion
//#region src/components/button.tsx
var Br = ({ text: e, children: t, active: n, disabled: r, onClick: i }) => /* @__PURE__ */ J("div", {
	class: q("flex-c w-40px h-30px bg-#888 font-bold text-white cursor-pointer", n && "bg-#48c", r && "opacity-40 pointer-events-none"),
	onClick: i,
	children: [e && /* @__PURE__ */ J("div", {
		class: "text-9px",
		children: e
	}), t]
}), Vr = ({ children: e, className: t }) => /* @__PURE__ */ J("div", {
	class: q("bg-clPanelBody p-4 text-white", t),
	children: e
}), Hr = ({ className: e, children: t, disabled: n, onClick: r }) => /* @__PURE__ */ J("button", {
	class: q("[all:unset] mt-3 bg-transparent text-white p-2 cursor-pointer", n && "opacity-30 pointer-events-none", e),
	onClick: r,
	children: t
}), Ur = ({ className: e, spec: t, size: n }) => /* @__PURE__ */ J("i", {
	class: e ? [t, e].join(" ") : t,
	style: n ? { fontSize: `${n}px` } : void 0
});
function Wr(e) {
	return (t) => /* @__PURE__ */ J(Ur, {
		spec: e,
		...t
	});
}
var Gr = {
	CaretLeft: Wr("ri-arrow-left-s-line"),
	CaretRight: Wr("ri-arrow-right-s-line"),
	Trash: Wr("ri-delete-bin-line")
};
//#endregion
//#region src/utils/drag-session.ts
function Kr(e, t, n) {
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
function qr(e) {
	return /* @__PURE__ */ J("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			Kr(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = Or(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
var Jr = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, onClick: a, disabled: o }) => {
	let s = kr(e, n, r, -135, 135);
	return /* @__PURE__ */ J(qr, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ J("div", {
			class: "w-30px h-30px rounded-full relative bg-#888",
			style: { opacity: o ? .5 : 1 },
			children: /* @__PURE__ */ J("div", {
				class: "w-full h-full flex-va",
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ J("div", { class: "w-2px h-10px bg-white" })
			})
		})
	});
}, Yr = ({ className: e, label: t, children: n, labelAlign: r = "center", width: i, contentHeight: a = 40 }) => /* @__PURE__ */ J("div", {
	class: q("flex-v", e),
	style: i ? { width: i } : void 0,
	children: [/* @__PURE__ */ J("div", {
		class: "text-11px font-bold h-13px",
		style: { textAlign: r },
		children: t
	}), /* @__PURE__ */ J("div", {
		class: "flex-c",
		style: { height: a },
		children: n
	})]
}), Xr = ({ children: e, onShift: t }) => /* @__PURE__ */ J("div", {
	onClick: (e) => {
		let n = e.currentTarget.getBoundingClientRect();
		e.clientX - n.left < n.width / 2 ? t(-1) : t(1);
	},
	children: e
}), Zr = ({ options: e, value: t, onChange: n, minWidth: r = 60 }) => {
	let i = e.findIndex((e) => e.value === t), a = e[i], o = i > 0, s = i < e.length - 1;
	return /* @__PURE__ */ J(Xr, {
		onShift: (t) => {
			let r = i + t;
			r < 0 || r >= e.length || n(e[r].value);
		},
		children: /* @__PURE__ */ J("div", {
			class: "flex-ha justify-between h-30px bg-#888 text-14px cursor-pointer",
			style: { minWidth: r },
			children: [
				/* @__PURE__ */ J(Gr.CaretLeft, {
					size: 14,
					className: q("-ml-px", !o && "invisible")
				}),
				/* @__PURE__ */ J("div", { children: a?.label }),
				/* @__PURE__ */ J(Gr.CaretRight, {
					size: 14,
					className: q("-mr-px", !s && "invisible")
				})
			]
		})
	});
};
//#endregion
//#region src/utils/color-mod.ts
function Qr(e) {
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
function $r(e) {
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
function Y(e) {
	return Math.max(0, Math.min(1, e));
}
function ei(e) {
	return e %= 1, e < 0 && (e += 1), e;
}
function ti(e, t) {
	return t.relative ? ei(e + Math.max(-360, Math.min(360, t.amount)) / 360) : ei(Math.max(0, Math.min(360, t.amount)) / 360);
}
function ni(e, t, n) {
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
function ri(e, t, n) {
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
function ii(e, t, n) {
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
function ai(e, t, n) {
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
function oi(e) {
	return e / 100 * 255;
}
function si(e) {
	return Math.round(Math.max(0, Math.min(255, e))).toString(16).padStart(2, "0").toUpperCase();
}
function ci(e, t = "") {
	let { r: n, g: r, b: i } = Qr(e), a = 255, o = "hsv";
	for (let e of $r(t)) {
		let t = e.amount / 100;
		switch (e.type) {
			case "h":
				if (o === "hsl") {
					let [t, a, o] = ii(n, r, i);
					t = ti(t, e), {r: n, g: r, b: i} = ai(t, a, o);
				} else {
					let [t, a, o] = ni(n, r, i);
					t = ti(t, e), {r: n, g: r, b: i} = ri(t, a, o);
				}
				break;
			case "v": {
				o = "hsv";
				let [a, s, c] = ni(n, r, i);
				c = e.relative ? Y(c + t) : Y(t), {r: n, g: r, b: i} = ri(a, s, c);
				break;
			}
			case "l": {
				o = "hsl";
				let [a, s, c] = ii(n, r, i);
				c = e.relative ? Y(c + t) : Y(t), {r: n, g: r, b: i} = ai(a, s, c);
				break;
			}
			case "s":
				if (o === "hsl") {
					let [a, o, s] = ii(n, r, i);
					o = e.relative ? Y(o + t) : Y(t), {r: n, g: r, b: i} = ai(a, o, s);
				} else {
					let [a, o, s] = ni(n, r, i);
					o = e.relative ? Y(o + t) : Y(t), {r: n, g: r, b: i} = ri(a, o, s);
				}
				break;
			case "a": a = oi(Math.max(0, Math.min(100, e.amount)));
		}
	}
	return `#${si(n)}${si(r)}${si(i)}${si(a)}`;
}
//#endregion
//#region src/common/ui-theme.ts
var X = {
	clPanelBody: ci("#445", "h220"),
	clPianoRollBg: ci("#334", "h205"),
	clPianoRollBgBlackKey: ci("#334", "h205 v-2"),
	clGridWeak2: "#0002",
	clGridWeak: "#0004",
	clGridStrong: "#0006",
	clGridStrong2: "#000a",
	clNoteBg: "#6cc"
}, Z = {
	octaveStart: 2,
	octaveCount: 5,
	cellW: 20,
	cellH: 20,
	numKeys: 61
}, li = [
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
], ui = Dr(Z.numKeys).map((e) => {
	let t = (e / 12 >>> 0) + 2;
	return `${li[e % 12]}${t}`;
}), di = ({ nx: e, ny: t, width: n, height: r }) => {
	let { cellW: i, cellH: a } = Z;
	return /* @__PURE__ */ J("div", {
		class: fi.base,
		style: {
			width: n,
			height: r
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
				class: q((u === 0 || u === 5) && "--has-bottom-border", d && "--is-black-key", `--border-${f}`),
				style: {
					left: c,
					top: l
				}
			}, `${o}-${s}`);
		})
	});
}, fi = { base: xe({
	border: "solid 0.5px #222",
	">div": {
		position: "absolute",
		width: Mr(Z.cellW),
		height: Mr(Z.cellH),
		background: X.clPianoRollBg,
		"&.--is-black-key": { background: X.clPianoRollBgBlackKey },
		"&.--has-bottom-border": { borderBottom: `solid 0.5px ${X.clGridStrong}` },
		borderRight: `solid 0.5px ${X.clGridWeak2}`,
		"&.--border-stronger1": { borderRightColor: X.clGridStrong },
		"&.--border-stronger2": { borderRightColor: X.clGridStrong2 }
	}
}) }, pi = [
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
function mi(e, t) {
	let n = pi[e], r = {
		width: "100%",
		background: "#fff",
		height: t,
		left: 0
	};
	return n === "whiteL" ? (r.height += t / 2, r.bottom = 0) : n === "whiteM" ? (r.height += t, r.top = 0, r.bottom = 0, r.margin = "auto 0") : n === "whiteH" ? (r.height += t / 2, r.top = 0) : n === "black" && (r.zIndex = 1, r.width = "63%", r.background = "linear-gradient(to right, #222, #666)", r.top = 0, r.bottom = 0, r.margin = "auto 0"), (e === 0 || e === 5) && (r.borderBottom = "solid 0.5px #0003"), e === 0 && (r.background = "#e4e4e4"), r;
}
var hi = ({ yi: e }) => {
	let { cellH: t } = Z, n = e % 12, r = n === 0 && ui[e], [i, a] = Ie(!1), o = mi(n, t), s = (t) => {
		a(!0), G.setPreviewNotePitch(e), Kr(t, { onUpOrCancel() {
			a(!1), G.setPreviewNotePitch(null);
		} });
	}, c = gi;
	return /* @__PURE__ */ J("div", {
		class: c.base,
		style: { height: t },
		children: /* @__PURE__ */ J("div", {
			class: q(c.inner, i && c.innerPressed),
			style: o,
			onPointerDown: s,
			children: r && /* @__PURE__ */ J("div", {
				class: c.label,
				children: r
			})
		})
	});
}, gi = {
	base: q("w-80px relative pointer-events-none"),
	inner: q("absolute pointer-events-auto cursor-pointer"),
	innerPressed: "bg-#4dd!",
	label: q("flex-ha h-full justify-end p-1", "text-#666 text-12px", "font-monospace")
}, _i = () => {
	let { numKeys: e } = Z;
	return /* @__PURE__ */ J("div", { children: Dr(e).map((t) => /* @__PURE__ */ J(hi, { yi: e - t - 1 }, t)) });
};
//#endregion
//#region src/editor/piano-roll-editor-view.tsx
function vi(e, t) {
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
function Q(e, t, n) {
	let r = G.state, { sectionStride: i } = vi(r.loopBars, r.pageIndex), a = e.getBoundingClientRect(), o = (t - a.left) / a.width * i, s = Math.floor(o), c = (1 - (n - a.top) / a.height) * Z.numKeys;
	return {
		xi: s,
		xiFloat: o,
		yi: Math.floor(c),
		yiFloat: c
	};
}
function yi(e, t, n, r) {
	let i = Math.floor(n);
	for (let n of e) if (n.pitch === r) {
		let e = n.position - t.offset, r = n.duration, a = e + r;
		if (n.duration >= 2 && i === a - 1) return {
			note: n,
			part: "tail"
		};
		if (e <= i && i < e + r) return {
			note: n,
			part: "body"
		};
	}
}
function bi() {
	let e = Date.now();
	return { check() {
		return Date.now() - e <= 100;
	} };
}
var $ = {
	addNote(e, t) {
		let n = {
			id: G.state.notes.length > 0 ? Math.max(...G.state.notes.map((e) => e.id)) + 1 : 0,
			position: e,
			duration: 1,
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
	updateNoteXYD(e, t, n) {
		return e.duration !== t || e.pitch !== n ? ($.setNoteAttrs(e.id, {
			duration: t,
			pitch: n
		}), {
			...e,
			duration: t,
			pitch: n
		}) : e;
	},
	removeNote(e) {
		G.setNotes((t) => t.filter((t) => t.id !== e));
	},
	startInsertNewNote(e, t) {
		let { xi: n, yi: r } = Q(e.currentTarget, e.clientX, e.clientY), i = t.offset + n, a = $.addNote(i, r);
		$.startAdjustDuration(e, a, !0);
	},
	startMoveNote(e, t) {
		let n = t, r = e.currentTarget, i = Q(r, e.clientX, e.clientY);
		G.setPreviewNotePitch(t.pitch);
		let a = bi();
		Kr(e, {
			onMove(e) {
				let a = Q(r, e.position.x, e.position.y), o = a.xi - i.xi, s = a.yi - i.yi, c = t.position + o, l = t.pitch + s;
				G.state.previewNotePitch !== l && G.setPreviewNotePitch(l), n = $.updateNoteXY(n, c, l);
			},
			onUpOrCancel() {
				a.check() && n === t && $.removeNote(n.id), G.setPreviewNotePitch(null);
			}
		}, { coordinate: "page" });
	},
	startAdjustDuration(e, t, n) {
		let r = t, i = e.currentTarget, a = Q(i, e.clientX, e.clientY);
		G.setPreviewNotePitch(t.pitch);
		let o = bi();
		Kr(e, {
			onMove(e) {
				let n = Q(i, e.position.x, e.position.y), o = n.xi - a.xi, s = n.yi - a.yi, c = t.duration + o, l = t.pitch + s;
				l !== G.state.previewNotePitch && G.setPreviewNotePitch(l), r = $.updateNoteXYD(r, c, l);
			},
			onUp() {
				let e = !n && o.check() && r === t;
				(r.duration <= 0 || e) && $.removeNote(r.id), G.setPreviewNotePitch(null);
			}
		}, { coordinate: "page" });
	}
}, xi = ({ notes: e, sectionRange: t }) => {
	let [n, r] = Ie("auto");
	return /* @__PURE__ */ J("div", {
		class: "absolute-full",
		onPointerDown: (n) => {
			let { xiFloat: i, yi: a } = Q(n.currentTarget, n.clientX, n.clientY), o = yi(e, t, i, a);
			o?.part === "tail" ? ($.startAdjustDuration(n, o.note, !1), r("e-resize")) : o?.part === "body" ? ($.startMoveNote(n, o.note), r("move")) : ($.startInsertNewNote(n, t), r("pointer"));
		},
		onPointerUp: () => {
			r("auto");
		},
		style: { cursor: n }
	});
}, Si = ({ note: e, sectionRange: t }) => {
	let { cellW: n, cellH: r } = Z, i = e.position - t.offset, a = e.pitch, o = e.duration;
	return /* @__PURE__ */ J("div", {
		class: Ci.base,
		style: {
			left: i * n,
			bottom: a * r,
			width: n * o - .5,
			height: r
		},
		children: /* @__PURE__ */ J("div", {
			class: Ci.label,
			style: { height: Z.cellH - 2 },
			children: ui[a]
		})
	});
}, Ci = {
	base: "absolute flex-c cursor-pointer",
	label: "bg-clNoteBg w-full flex-ha rounded-2px pl-0.5 text-#0008 text-10px font-monospace bd-#0004"
}, wi = ({ notes: e, sectionRange: t }) => /* @__PURE__ */ J("div", {
	class: "absolute-full",
	children: e.filter((e) => t.offset <= e.position && e.position < t.offset + t.duration).map((e) => /* @__PURE__ */ J(Si, {
		note: e,
		sectionRange: t
	}, e.id))
}), Ti = ({ notes: e, sectionRange: t }) => {
	let { cellW: n, cellH: r, numKeys: i } = Z, a = r * i;
	return /* @__PURE__ */ J("div", {
		class: "relative overflow-hidden touch-none",
		style: {
			width: n * t.duration,
			height: a
		},
		children: [/* @__PURE__ */ J(wi, {
			notes: e,
			sectionRange: t
		}), /* @__PURE__ */ J(xi, {
			notes: e,
			sectionRange: t
		})]
	});
}, Ei = () => {
	let e = G.useSnapshot(), { nx: t, sectionOffset: n, sectionStride: r } = vi(e.loopBars, e.pageIndex), i = Be(() => ({
		offset: n,
		duration: r
	}), [n, r]);
	return /* @__PURE__ */ J("div", {
		class: "absolute-full flex-h",
		children: Dr(t).map((t) => /* @__PURE__ */ J(Ti, {
			notes: e.notes,
			sectionRange: i
		}, t))
	});
}, Di = () => {
	let { cellW: e } = Z, { playPos: t } = G.useSnapshot();
	if (t === null) return;
	let n = e * 1.5, r = t % 32;
	return /* @__PURE__ */ J("div", {
		class: Oi.base,
		style: {
			left: r * e - n,
			width: n
		}
	});
}, Oi = { base: "absolute top-0 pointer-events-none h-full border-r border-solid border-#0ff4 bg-[linear-gradient(to_right,#0cc0,#0ff3)]" };
function ki(e) {
	let t = e[0].pitch, n = e[0].pitch;
	for (let r of e) r.pitch < t && (t = r.pitch), r.pitch > n && (n = r.pitch);
	let r = (t + n) / 2, { cellH: i, numKeys: a } = Z;
	return i * a - (r + .5) * i;
}
function Ai(e) {
	let { stateLoadRevision: t, notes: n } = G.useSnapshot();
	Re(() => {
		let t = e.current;
		t && (t.scrollTop = (n.length > 0 ? ki(n) : t.scrollHeight / 2) - t.clientHeight / 2);
	}, [t]);
}
var ji = () => {
	let { cellW: e, cellH: t, numKeys: n } = Z, r = e * 32, i = t * n, a = ze(null);
	return Ai(a), /* @__PURE__ */ J("div", {
		ref: a,
		class: "flex-h gap-0.5 h-340px overflow-x-hidden overflow-y-scroll touch-pan-y",
		onWheel: (e) => {
			e.stopPropagation(), e.preventDefault();
		},
		children: [/* @__PURE__ */ J(_i, {}), /* @__PURE__ */ J("div", {
			class: "relative flex-h",
			style: {
				width: r,
				height: i
			},
			children: [
				/* @__PURE__ */ J(di, {
					nx: 32,
					ny: n,
					width: r,
					height: i
				}),
				/* @__PURE__ */ J(Ei, {}),
				/* @__PURE__ */ J(Di, {})
			]
		})]
	});
};
//#endregion
//#region src/utils/selector-option.ts
function Mi(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region src/root/page-root.tsx
var Ni = () => /* @__PURE__ */ J(Yr, {
	label: "duty",
	children: /* @__PURE__ */ J(Jr, {
		value: G.useSnapshot().duty,
		onChange: G.setDuty
	})
}), Pi = () => /* @__PURE__ */ J(Yr, {
	label: "octave",
	children: /* @__PURE__ */ J(Jr, {
		value: G.useSnapshot().octave,
		min: -2,
		max: 2,
		step: 1,
		onChange: G.setOctave
	})
}), Fi = Mi([
	.25,
	.5,
	1,
	2,
	4,
	8,
	16
].map((e) => [e, `${e < 1 ? `1/${1 / e}` : e}`])), Ii = () => /* @__PURE__ */ J(Yr, {
	label: "loop bars",
	children: /* @__PURE__ */ J(Zr, {
		minWidth: 50,
		value: G.useSnapshot().loopBars,
		options: Fi,
		onChange: G.setLoopBars
	})
}), Li = () => /* @__PURE__ */ J(ji, {}), Ri = () => {
	let e = G.useSnapshot(), t = Math.max(1, e.loopBars / 2), n = e.pageIndex > 0, r = e.pageIndex < t - 1, i = (t) => {
		G.setPageIndex(e.pageIndex + t);
	};
	return /* @__PURE__ */ J(Yr, {
		label: "",
		children: /* @__PURE__ */ J("div", {
			class: "flex-ha gap-2",
			children: [
				/* @__PURE__ */ J(Br, {
					disabled: !n,
					onClick: () => i(-1),
					children: /* @__PURE__ */ J(Gr.CaretLeft, { size: 20 })
				}),
				/* @__PURE__ */ J("div", {
					class: "w-50px flex-c",
					children: [
						e.pageIndex + 1,
						" / ",
						t
					]
				}),
				/* @__PURE__ */ J(Br, {
					disabled: !r,
					onClick: () => i(1),
					children: /* @__PURE__ */ J(Gr.CaretRight, { size: 20 })
				})
			]
		})
	});
}, zi = () => /* @__PURE__ */ J(Hr, {
	disabled: !(G.useSnapshot().notes.length > 0),
	onClick: () => G.setNotes([]),
	children: /* @__PURE__ */ J(Gr.Trash, { size: 20 })
}), Bi = () => /* @__PURE__ */ J("div", {
	class: "w-full flex-v gap-4",
	children: /* @__PURE__ */ J("div", {
		class: "flex-ha justify-between",
		children: [/* @__PURE__ */ J("div", {
			class: "font-bold text-24px",
			children: "Fluorite Piano Roll"
		}), /* @__PURE__ */ J("div", {
			class: "flex-ha gap-7",
			children: [/* @__PURE__ */ J("div", {
				class: "flex-ha gap-6",
				children: [
					/* @__PURE__ */ J(zi, {}),
					/* @__PURE__ */ J(Pi, {}),
					/* @__PURE__ */ J(Ni, {}),
					/* @__PURE__ */ J(Ii, {})
				]
			}), /* @__PURE__ */ J(Ri, {})]
		})]
	})
}), Vi = () => /* @__PURE__ */ J(Vr, {
	className: "w-800px h-450px flex-c",
	children: /* @__PURE__ */ J("div", {
		class: "flex-v gap-2",
		children: [/* @__PURE__ */ J(Bi, {}), /* @__PURE__ */ J(Li, {})]
	})
});
//#endregion
//#region src/root/app.tsx
Lr();
var Hi = () => {
	let { viewActive: e } = G.useSnapshot();
	return Re(Rr, []), e ? /* @__PURE__ */ J(Vi, {}) : null;
}, Ui = "*{box-sizing:border-box;margin:0;padding:0}img{-webkit-user-drag:none}.font-monospace{font-family:Roboto Mono,monospace}", Wi = "/* layer: properties */\n@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-bg-opacity:100%;--un-border-opacity:100%;--un-text-opacity:100%;}}\n@property --un-text-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%;}\n@property --un-border-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%;}\n@property --un-bg-opacity{syntax:\"<percentage>\";inherits:false;initial-value:100%;}\n@property --un-inset-ring-color{syntax:\"*\";inherits:false;}\n@property --un-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000;}\n@property --un-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000;}\n@property --un-inset-shadow-color{syntax:\"*\";inherits:false;}\n@property --un-ring-color{syntax:\"*\";inherits:false;}\n@property --un-ring-inset{syntax:\"*\";inherits:false;}\n@property --un-ring-offset-color{syntax:\"*\";inherits:false;}\n@property --un-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000;}\n@property --un-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0px;}\n@property --un-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000;}\n@property --un-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000;}\n@property --un-shadow-color{syntax:\"*\";inherits:false;}\n@property --un-pan-x{syntax:\"*\";inherits:false;}\n@property --un-pan-y{syntax:\"*\";inherits:false;}\n@property --un-pinch-zoom{syntax:\"*\";inherits:false;}\n/* layer: theme */\n:root, :host { --spacing: 0.25rem; --fontWeight-bold: 700; --colors-clPanelBody: #444A55FF; --colors-clNoteBg: #6cc; --colors-white: #fff; --font-sans: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"; --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace; --default-font-family: var(--font-sans); --default-monoFont-family: var(--font-mono); }\n/* layer: base */\n *, ::after, ::before, ::backdrop, ::file-selector-button { box-sizing: border-box;  margin: 0;  padding: 0;  border: 0 solid;  }  html, :host { line-height: 1.5;  -webkit-text-size-adjust: 100%;  tab-size: 4;  font-family: var( --default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' );  font-feature-settings: var(--default-font-featureSettings, normal);  font-variation-settings: var(--default-font-variationSettings, normal);  -webkit-tap-highlight-color: transparent;  }  hr { height: 0;  color: inherit;  border-top-width: 1px;  }  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }  b, strong { font-weight: bolder; }  code, kbd, samp, pre { font-family: var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace );  font-feature-settings: var(--default-monoFont-featureSettings, normal);  font-variation-settings: var(--default-monoFont-variationSettings, normal);  font-size: 1em;  }  small { font-size: 80%; }  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } sub { bottom: -0.25em; } sup { top: -0.5em; }  table { text-indent: 0;  border-color: inherit;  border-collapse: collapse;  }  :-moz-focusring { outline: auto; }  progress { vertical-align: baseline; }  summary { display: list-item; }  ol, ul, menu { list-style: none; }  img, svg, video, canvas, audio, iframe, embed, object { display: block;  vertical-align: middle;  }  img, video { max-width: 100%; height: auto; }  button, input, select, optgroup, textarea, ::file-selector-button { font: inherit;  font-feature-settings: inherit;  font-variation-settings: inherit;  letter-spacing: inherit;  color: inherit;  border-radius: 0;  background-color: transparent;  opacity: 1;  }  :where(select:is([multiple], [size])) optgroup { font-weight: bolder; }  :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }  ::file-selector-button { margin-inline-end: 4px; }  ::placeholder { opacity: 1; }  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px)  { ::placeholder { color: color-mix(in oklab, currentcolor 50%, transparent); } }  textarea { resize: vertical; }  ::-webkit-search-decoration { -webkit-appearance: none; }  ::-webkit-date-and-time-value { min-height: 1lh;  text-align: inherit;  }  ::-webkit-datetime-edit { display: inline-flex; }  ::-webkit-datetime-edit-fields-wrapper { padding: 0; } ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field { padding-block: 0; }  ::-webkit-calendar-picker-indicator { line-height: 1; }  :-moz-ui-invalid { box-shadow: none; }  button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button { appearance: button; }  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }  [hidden]:where(:not([hidden~='until-found'])) { display: none !important; }\n/* layer: shortcuts */\n.bd-\\#0004{border-width:1px;border-color:color-mix(in oklab, #0004 var(--un-border-opacity), transparent);--un-border-style:solid;border-style:solid;}\n.flex-c{display:flex;align-items:center;justify-content:center;}\n.flex-h{display:flex;}\n.flex-ha{display:flex;align-items:center;}\n.flex-v{display:flex;flex-direction:column;}\n.flex-va{display:flex;flex-direction:column;align-items:center;}\n.absolute-full{inset:calc(var(--spacing) * 0);position:absolute;}\n/* layer: default */\n.text-10px{font-size:10px;}\n.text-11px{font-size:11px;}\n.text-12px{font-size:12px;}\n.text-14px{font-size:14px;}\n.text-24px{font-size:24px;}\n.text-9px{font-size:9px;}\n.text-\\#0008{color:color-mix(in oklab, #0008 var(--un-text-opacity), transparent);}\n.text-\\#666{color:color-mix(in oklab, #666 var(--un-text-opacity), transparent);}\n.text-white{color:color-mix(in srgb, var(--colors-white) var(--un-text-opacity), transparent);}\n.font-bold{--un-font-weight:var(--fontWeight-bold);font-weight:var(--fontWeight-bold);}\n.m\\[2\\]\\!{margin:2 !important;}\n.-ml-px{margin-left:-1px;}\n.-mr-px{margin-right:-1px;}\n.mt-3{margin-top:calc(var(--spacing) * 3);}\n.p-1{padding:calc(var(--spacing) * 1);}\n.p-2{padding:calc(var(--spacing) * 2);}\n.p-4{padding:calc(var(--spacing) * 4);}\n.px{padding-inline:calc(var(--spacing) * 4);}\n.pl-0\\.5{padding-left:calc(var(--spacing) * 0.5);}\n.b,\n.border{border-width:1px;}\n.border-r{border-right-width:1px;}\n.border-\\#0ff4{border-color:color-mix(in oklab, #0ff4 var(--un-border-opacity), transparent);}\n.rounded-2px{border-radius:2px;}\n.rounded-full{border-radius:calc(infinity * 1px);}\n.border-solid{--un-border-style:solid;border-style:solid;}\n.bg-\\[linear-gradient\\(to_right\\,\\#0cc0\\,\\#0ff3\\)\\]{background-image:linear-gradient(to right,#0cc0,#0ff3);}\n.bg-\\#48c{background-color:color-mix(in oklab, #48c var(--un-bg-opacity), transparent);}\n.bg-\\#4dd\\!{background-color:color-mix(in oklab, #4dd var(--un-bg-opacity), transparent) !important;}\n.bg-\\#888{background-color:color-mix(in oklab, #888 var(--un-bg-opacity), transparent);}\n.bg-clNoteBg{background-color:color-mix(in srgb, var(--colors-clNoteBg) var(--un-bg-opacity), transparent);}\n.bg-clPanelBody{background-color:color-mix(in srgb, var(--colors-clPanelBody) var(--un-bg-opacity), transparent);}\n.bg-transparent{background-color:transparent;}\n.bg-white{background-color:color-mix(in srgb, var(--colors-white) var(--un-bg-opacity), transparent);}\n.opacity-30{opacity:30%;}\n.opacity-40{opacity:40%;}\n.gap-0\\.5{gap:calc(var(--spacing) * 0.5);}\n.gap-2{gap:calc(var(--spacing) * 2);}\n.gap-4{gap:calc(var(--spacing) * 4);}\n.gap-6{gap:calc(var(--spacing) * 6);}\n.gap-7{gap:calc(var(--spacing) * 7);}\n.h-10px{height:10px;}\n.h-13px{height:13px;}\n.h-30px{height:30px;}\n.h-340px{height:340px;}\n.h-450px{height:450px;}\n.h-full{height:100%;}\n.h\\[-360\\~\\+360\\]{height:-360~+360;}\n.h\\[0\\~360\\]{height:0~360;}\n.h120{height:calc(var(--spacing) * 120);}\n.h205{height:calc(var(--spacing) * 205);}\n.h220{height:calc(var(--spacing) * 220);}\n.w-2px{width:2px;}\n.w-30px{width:30px;}\n.w-40px{width:40px;}\n.w-50px{width:50px;}\n.w-800px{width:800px;}\n.w-80px{width:80px;}\n.w-full{width:100%;}\n.invisible{visibility:hidden;}\n.cursor-pointer{cursor:pointer;}\n.pointer-events-auto{pointer-events:auto;}\n.pointer-events-none{pointer-events:none;}\n.shadow,\n.shadowRoot\\){--un-shadow:0 1px 3px 0 var(--un-shadow-color, rgb(0 0 0 / 0.1)),0 1px 2px -1px var(--un-shadow-color, rgb(0 0 0 / 0.1));box-shadow:var(--un-inset-shadow), var(--un-inset-ring-shadow), var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}\n.transform{transform:var(--un-rotate-x) var(--un-rotate-y) var(--un-rotate-z) var(--un-skew-x) var(--un-skew-y);}\n.\\[all\\:unset\\]{all:unset;}\n.top-0{top:calc(var(--spacing) * 0);}\n.justify-end{justify-content:flex-end;}\n.justify-between{justify-content:space-between;}\n.absolute{position:absolute;}\n.relative{position:relative;}\n.overflow-hidden{overflow:hidden;}\n.overflow-x-hidden{overflow-x:hidden;}\n.overflow-y-scroll{overflow-y:scroll;}\n.h-dvh{height:100dvh;}\n.touch-pan-y{--un-pan-y:pan-y;touch-action:var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom);}\n.touch-none{touch-action:none;}\n@supports (color: color-mix(in lab, red, red)){\n.text-white{color:color-mix(in oklab, var(--colors-white) var(--un-text-opacity), transparent);}\n.bg-clNoteBg{background-color:color-mix(in oklab, var(--colors-clNoteBg) var(--un-bg-opacity), transparent);}\n.bg-clPanelBody{background-color:color-mix(in oklab, var(--colors-clPanelBody) var(--un-bg-opacity), transparent);}\n.bg-white{background-color:color-mix(in oklab, var(--colors-white) var(--un-bg-opacity), transparent);}\n}", Gi = ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap", "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"], Ki = "https://cdn.jsdelivr.net/npm/remixicon@4.9.1/fonts/remixicon.min.css";
Gi.push(Ki);
var qi = me((e) => {
	let t = document.createElement("link");
	return t.rel = "stylesheet", t.href = Ki, e.appendChild(t), fe(/* @__PURE__ */ J("div", {
		class: "bg-clPanelBody h-full flex-c",
		children: /* @__PURE__ */ J(Hi, {})
	}), e), () => {
		fe(null, e);
	};
}, {
	cssTexts: [Ui, Wi],
	stylesheetUrls: Gi,
	adoptedStyleSheets: [Ce.sheet]
});
//#endregion
export { qi as default };
