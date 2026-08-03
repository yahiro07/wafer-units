//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/utility-classes.css?inline
var e = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}", t, n, r, i, a, o, s, c, l, u, d, f, p, m, h = {}, g = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, v = Array.isArray;
function y(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function b(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function x(e, n, r) {
	var i, a, o, s = {};
	for (o in n) o == "key" ? i = n[o] : o == "ref" ? a = n[o] : s[o] = n[o];
	if (arguments.length > 2 && (s.children = arguments.length > 3 ? t.call(arguments, 2) : r), typeof e == "function" && e.defaultProps != null) for (o in e.defaultProps) s[o] === void 0 && (s[o] = e.defaultProps[o]);
	return S(e, s, i, a, null);
}
function S(e, t, i, a, o) {
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
		var t = e.__v, r = t.__e, i = [], a = [], o = y({}, t);
		o.__v = t.__v + 1, n.vnode && n.vnode(o), ae(e.__P, o, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [r] : null, i, r ?? T(t), !!(32 & t.__u), a), o.__v = t.__v, o.__.__k[o.__i] = o, se(i, o, a), t.__e = t.__ = null, o.__e != r && D(o);
	}
}
function D(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), D(e);
}
function O(e) {
	(!e.__d && (e.__d = !0) && i.push(e) && !k.__r++ || a != n.debounceRendering) && ((a = n.debounceRendering) || o)(k);
}
function k() {
	try {
		for (var e, t = 1; i.length;) i.length > t && i.sort(s), e = i.shift(), t = i.length, E(e);
	} finally {
		i.length = k.__r = 0;
	}
}
function ee(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, _, v, y = r && r.__k || g, b = t.length;
	for (c = A(n, t, y, c, b), d = 0; d < b; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && y[p.__i] || h, p.__i = d, v = ae(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && ue(f.ref, null, p), u.push(p.ref, p.__c || m, p)), _ == null && m != null && (_ = m), 4 & p.__u ? (c = te(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && v !== void 0 ? c = v : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = _, c;
}
function A(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = S(null, o, null, null, null) : v(o) ? o = e.__k[a] = S(C, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = S(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = ne(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = T(s)), de(s, s));
	return r;
}
function te(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = te(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = T(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function j(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (v(e) ? e.some(function(e) {
		j(e, t);
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
function M(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || _.test(t) ? n : n + "px";
}
function re(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || M(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || M(e.style, t, n[t]);
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
function ie(e) {
	return function(t) {
		if (this.l) {
			var r = this.l[t.type + e];
			if (t[l] == null) t[l] = f++;
			else if (t[l] < r[u]) return;
			return r(n.event ? n.event(t) : t);
		}
	};
}
function ae(e, t, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, _, x, S, E, D, O, k, A, te, j, ne, M = t.type;
	if (t.constructor !== void 0) return null;
	128 & r.__u && (l = !!(32 & r.__u), o = [c = t.__e = r.__e]), (d = n.__b) && d(t);
	n: if (typeof M == "function") {
		f = s.length;
		try {
			if (E = t.props, D = M.prototype && M.prototype.render, O = (d = M.contextType) && i[d.__c], k = d ? O ? O.props.value : d.__ : i, r.__c ? S = (p = t.__c = r.__c).__ = p.__E : (D ? t.__c = p = new M(E, k) : (t.__c = p = new w(E, k), p.constructor = M, p.render = fe), O && O.sub(p), p.state || (p.state = {}), p.__n = i, m = p.__d = !0, p.__h = [], p._sb = []), D && p.__s == null && (p.__s = p.state), D && M.getDerivedStateFromProps != null && (p.__s == p.state && (p.__s = y({}, p.__s)), y(p.__s, M.getDerivedStateFromProps(E, p.__s))), h = p.props, _ = p.state, p.__v = t, m) D && M.getDerivedStateFromProps == null && p.componentWillMount != null && p.componentWillMount(), D && p.componentDidMount != null && p.__h.push(p.componentDidMount);
			else {
				if (D && M.getDerivedStateFromProps == null && E !== h && p.componentWillReceiveProps != null && p.componentWillReceiveProps(E, k), t.__v == r.__v || !p.__e && p.shouldComponentUpdate != null && !1 === p.shouldComponentUpdate(E, p.__s, k)) {
					t.__v != r.__v && (p.props = E, p.state = p.__s, p.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), g.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && s.push(p), c = T(r);
					break n;
				}
				p.componentWillUpdate != null && p.componentWillUpdate(E, p.__s, k), D && p.componentDidUpdate != null && p.__h.push(function() {
					p.componentDidUpdate(h, _, x);
				});
			}
			if (p.context = k, p.props = E, p.__P = e, p.__e = !1, A = n.__r, te = 0, D) p.state = p.__s, p.__d = !1, A && A(t), d = p.render(p.props, p.state, p.context), g.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, A && A(t), d = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++te < 25);
			p.state = p.__s, p.getChildContext != null && (i = y(y({}, i), p.getChildContext())), D && !m && p.getSnapshotBeforeUpdate != null && (x = p.getSnapshotBeforeUpdate(h, _)), j = d != null && d.type === C && d.key == null ? ce(d.props.children) : d, c = ee(e, v(j) ? j : [j], t, r, i, a, o, s, c, l, u), p.base = t.__e, t.__u &= -161, p.__h.length && s.push(p), S && (p.__E = p.__ = null);
		} catch (e) {
			if (s.length = f, t.__v = null, l || o != null) {
				if (e.then) {
					for (t.__u |= l ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling;
					o != null && (o[o.indexOf(c)] = null), t.__e = c;
				} else if (o != null) for (ne = o.length; ne--;) b(o[ne]);
			} else t.__e = r.__e;
			t.__k ??= r.__k || [], e.then || oe(t), n.__e(e, t, r);
		}
	} else o == null && t.__v == r.__v ? (t.__k = r.__k, t.__e = r.__e) : c = t.__e = le(r.__e, t, r, i, a, o, s, l, u);
	return (d = n.diffed) && d(t), 128 & t.__u ? void 0 : c;
}
function oe(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(oe));
}
function se(e, t, r) {
	for (var i = 0; i < r.length; i++) ue(r[i], r[++i], r[++i]);
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
function ce(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : v(e) ? e.map(ce) : e.constructor === void 0 ? y({}, e) : null;
}
function le(e, r, i, a, o, s, c, l, u) {
	var d, f, p, m, g, _, y, x = i.props || h, S = r.props, C = r.type;
	if (C == "svg" ? o = "http://www.w3.org/2000/svg" : C == "math" ? o = "http://www.w3.org/1998/Math/MathML" : o ||= "http://www.w3.org/1999/xhtml", s != null) {
		for (d = 0; d < s.length; d++) if ((g = s[d]) && "setAttribute" in g == !!C && (C ? g.localName == C : g.nodeType == 3)) {
			e = g, s[d] = null;
			break;
		}
	}
	if (e == null) {
		if (C == null) return document.createTextNode(S);
		e = document.createElementNS(o, C, S.is && S), l &&= (n.__m && n.__m(r, s), !1), s = null;
	}
	if (C == null) x === S || l && e.data == S || (e.data = S);
	else {
		if (s = C == "textarea" && S.defaultValue != null ? null : s && t.call(e.childNodes), !l && s != null) for (x = {}, d = 0; d < e.attributes.length; d++) x[(g = e.attributes[d]).name] = g.value;
		for (d in x) g = x[d], d == "dangerouslySetInnerHTML" ? p = g : d == "children" || d in S || d == "value" && "defaultValue" in S || d == "checked" && "defaultChecked" in S || re(e, d, null, g, o);
		for (d in S) g = S[d], d == "children" ? m = g : d == "dangerouslySetInnerHTML" ? f = g : d == "value" ? _ = g : d == "checked" ? y = g : l && typeof g != "function" || x[d] === g || re(e, d, g, x[d], o);
		if (f) l || p && (f.__html == p.__html || f.__html == e.innerHTML) || (e.innerHTML = f.__html), r.__k = [];
		else if (p && (e.innerHTML = ""), ee(r.type == "template" ? e.content : e, v(m) ? m : [m], r, i, a, C == "foreignObject" ? "http://www.w3.org/1999/xhtml" : o, s, c, s ? s[0] : i.__k && T(i, 0), l, u), s != null) for (d = s.length; d--;) b(s[d]);
		l && C != "textarea" || (d = "value", C == "progress" && _ == null ? e.removeAttribute("value") : _ != null && (_ !== e[d] || C == "progress" && !_ || C == "option" && _ != x[d]) && re(e, d, _, x[d], o), d = "checked", y != null && y != e[d] && re(e, d, y, x[d], o));
	}
	return e;
}
function ue(e, t, r) {
	try {
		if (typeof e == "function") {
			var i = typeof e.__u == "function";
			i && e.__u(), i && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		n.__e(e, r);
	}
}
function de(e, t, r) {
	var i, a;
	if (n.unmount && n.unmount(e), (i = e.ref) && (i.current && i.current != e.__e || ue(i, null, t)), (i = e.__c) != null) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (e) {
			n.__e(e, t);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = e.__k) for (a = 0; a < i.length; a++) i[a] && de(i[a], t, r || typeof e.type != "function");
	r || b(e.__e), e.__c = e.__ = e.__e = void 0;
}
function fe(e, t, n) {
	return this.constructor(e, n);
}
function pe(e, r, i) {
	var a, o, s, c;
	r == document && (r = document.documentElement), n.__ && n.__(e, r), o = (a = typeof i == "function") ? null : i && i.__k || r.__k, s = [], c = [], ae(r, e = (!a && i || r).__k = x(C, null, [e]), o || h, h, r.namespaceURI, !a && i ? [i] : o ? null : r.firstChild ? t.call(r.childNodes) : null, s, !a && i ? i : o ? o.__e : r.firstChild, a, c), se(s, e, c), e.props.children = null;
}
t = g.slice, n = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, r = 0, w.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = y({}, this.state);
	typeof e == "function" && (e = e(y({}, n), this.props)), e && y(n, e), e != null && this.__v && (t && this._sb.push(t), O(this));
}, w.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), O(this));
}, w.prototype.render = C, i = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, s = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, k.__r = 0, c = Math.random().toString(8), l = "__d" + c, u = "__a" + c, d = /(PointerCapture)$|Capture$/i, f = 0, p = ie(!1), m = ie(!0);
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
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
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/array-utils-4n0oRYSd.js
function ge(e) {
	return Array(e).fill(0).map((e, t) => t);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/number-utils-CUPZTwjx.js
function _e(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function ve(e, t, n) {
	return t + (n - t) * e;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax/index.js
function ye(e, t) {
	return Object.fromEntries((Array.isArray(t) ? t : Object.keys(t)).map((t) => [t, e[t]]));
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/dist/hooks.module.js
var N, P, be, xe, Se = 0, Ce = [], F = n, we = F.__b, Te = F.__r, Ee = F.diffed, De = F.__c, Oe = F.unmount, ke = F.__;
function Ae(e, t) {
	F.__h && F.__h(P, e, Se || t), Se = 0;
	var n = P.__H || (P.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function je(e) {
	return Se = 1, Me(Ue, e);
}
function Me(e, t, n) {
	var r = Ae(N++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Ue(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = P, !P.__f)) {
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
		P.__f = !0;
		var a = P.shouldComponentUpdate, o = P.componentWillUpdate;
		P.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, P.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Ne(e, t) {
	var n = Ae(N++, 3);
	!F.__s && He(n.__H, t) && (n.__ = e, n.u = t, P.__H.__h.push(n));
}
function Pe(e, t) {
	var n = Ae(N++, 4);
	!F.__s && He(n.__H, t) && (n.__ = e, n.u = t, P.__h.push(n));
}
function Fe(e) {
	return Se = 5, Ie(function() {
		return { current: e };
	}, []);
}
function Ie(e, t) {
	var n = Ae(N++, 7);
	return He(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Le() {
	for (var e; e = Ce.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Be), t.__h.some(Ve), t.__h = [];
		} catch (n) {
			t.__h = [], F.__e(n, e.__v);
		}
	}
}
F.__b = function(e) {
	P = null, we && we(e);
}, F.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), ke && ke(e, t);
}, F.__r = function(e) {
	Te && Te(e), N = 0;
	var t = (P = e.__c).__H;
	t && (be === P ? (t.__h = [], P.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Be), t.__h.some(Ve), t.__h = [], N = 0)), be = P;
}, F.diffed = function(e) {
	Ee && Ee(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Ce.push(t) !== 1 && xe === F.requestAnimationFrame || ((xe = F.requestAnimationFrame) || ze)(Le)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), be = P = null;
}, F.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Be), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ve(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], F.__e(n, e.__v);
		}
	}), De && De(e, t);
}, F.unmount = function(e) {
	Oe && Oe(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Be(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && F.__e(t, n.__v));
};
var Re = typeof requestAnimationFrame == "function";
function ze(e) {
	var t, n = function() {
		clearTimeout(r), Re && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Re && (t = requestAnimationFrame(n));
}
function Be(e) {
	var t = P, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), P = t;
}
function Ve(e) {
	var t = P;
	e.__c = e.__(), P = t;
}
function He(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Ue(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/index.js
function We(e, t, n) {
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
function I(e, t) {
	return t && Number.isFinite(t) ? `${e.toFixed(t)}px` : `${e}px`;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mo/index.js
var Ge = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function Ke(e) {
	return ge(e).map(() => Ge.charAt(Math.random() * 62 >>> 0)).join("");
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var qe = 0;
Array.isArray;
function L(e, t, r, i, a, o) {
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
		__v: --qe,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return n.vnode && n.vnode(u), u;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.module.js
function Je(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Ye(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Xe(e, t) {
	this.props = e, this.context = t;
}
(Xe.prototype = new w()).isPureReactComponent = !0, Xe.prototype.shouldComponentUpdate = function(e, t) {
	return Ye(this.props, e) || Ye(this.state, t);
};
var Ze = n.__b;
n.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ze && Ze(e);
}, typeof Symbol < "u" && Symbol.for;
var Qe = n.__e;
n.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	Qe(e, t, n, r);
};
var $e = n.unmount;
function et(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Je({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return et(e, t, n);
	})), e;
}
function tt(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return tt(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function nt() {
	this.__u = 0, this.o = null, this.__b = null;
}
function rt(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function it() {
	this.i = null, this.l = null;
}
n.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), $e && $e(e);
}, (nt.prototype = new w()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = rt(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = tt(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, nt.prototype.componentWillUnmount = function() {
	this.o = [];
}, nt.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = et(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && x(C, null, e.fallback);
	return i && (i.__u &= -33), [x(C, null, t.__a ? null : e.children), i];
};
var at = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(it.prototype = new w()).__a = function(e) {
	var t = this, n = rt(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), at(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, it.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = j(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, it.prototype.componentDidUpdate = it.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		at(e, n, t);
	});
};
var ot = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, st = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ct = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, lt = /[A-Z0-9]/g, ut = typeof document < "u", dt = function(e) {
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
var ft = n.event;
n.event = function(e) {
	return ft && (e = ft(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var pt = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, mt = n.vnode;
n.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || ut && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || dt(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : ct.test(a) && (a = s) : s = a = "oninput" : i && st.test(a) ? a = a.replace(lt, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", pt)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = ot, mt && mt(e);
};
var ht = n.__r;
n.__r = function(e) {
	ht && ht(e), e.__c;
};
var gt = n.diffed;
n.diffed = function(e) {
	gt && gt(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mo-react/index.js
function _t(e, t) {
	let n = new ResizeObserver((e) => {
		let n = e[0];
		if (n) {
			let { width: e, height: r } = n.contentRect;
			setTimeout(() => t({
				width: e,
				height: r
			}), 1);
		}
	});
	return n.observe(e), () => {
		n.unobserve(e), n.disconnect();
	};
}
function vt(e) {
	let [t, n] = je();
	return Pe(() => {
		let t = e.current;
		if (t) return _t(t, n);
	}, [e]), t;
}
function yt({ children: e, overflow: t = "hidden" }) {
	let n = Fe(null), r = Fe(null), i = vt(n), a = vt(r), o = Ie(() => !i || !a || a.width === 0 || a.height === 0 ? 1 : Math.min(i.width / a.width, i.height / a.height), [i, a]), s = i && a && a.width > 0;
	return /* @__PURE__ */ L("div", {
		ref: n,
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			overflow: t
		},
		children: /* @__PURE__ */ L("div", {
			ref: r,
			style: {
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: `translate(-50%, -50%) scale(${o})`,
				visibility: s ? "visible" : "hidden"
			},
			children: e
		})
	});
}
//#endregion
//#region src/components-mono2/selector-option.ts
function bt(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function xt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = xt(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function St() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = xt(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components-mono2/button.tsx
var Ct = ({ active: e, text: t, children: n, onClick: r, disabled: i, asr: a = 1.6 }) => {
	let o = 36 * a;
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: r,
		disabled: i,
		className: St("flex-c bg-gray-400 text-white border border-gray-600", e && "bg-sky-600"),
		style: {
			width: I(o),
			height: I(36),
			cursor: i ? "default" : "pointer",
			opacity: i ? .5 : 1
		},
		children: [t && /* @__PURE__ */ L("span", { children: t }), n]
	});
};
//#endregion
//#region src/components-mono2/general-selector.tsx
function wt({ options: e, value: t, onChange: n, reverseOptionsOrder: r = !1, className: i, style: a }) {
	return /* @__PURE__ */ L("select", {
		value: t,
		onChange: (t) => {
			let r = typeof e[0].value == "number", i = t.target;
			n(r ? parseFloat(i.value) : i.value);
		},
		className: i,
		style: a,
		children: Ie(() => r ? [...e].reverse() : e, [e, r]).map((e) => /* @__PURE__ */ L("option", {
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components-mono2/knob-frame.tsx
function Tt(e) {
	return /* @__PURE__ */ L("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			We(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = _e(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
//#region src/components-mono2/knob.tsx
function Et(e) {
	return /* @__PURE__ */ L("div", {
		className: "border-[1px] border-gray-700 w-[36px] h-[36px] rounded-full bg-gray-400",
		children: /* @__PURE__ */ L("div", {
			className: "w-full h-full flex justify-center",
			style: { transform: `rotate(${{ tickAngel() {
				let { value: t, min: n, max: r } = e;
				return ve((t - n) / (r - n), -135, 135);
			} }.tickAngel()}deg)` },
			children: /* @__PURE__ */ L("div", { className: "w-[2px] h-[10px] bg-[#fff]" })
		})
	});
}
function Dt({ value: e, min: t = 0, max: n = 1, step: r = .01, onChange: i }) {
	return /* @__PURE__ */ L(Tt, {
		value: e,
		min: t,
		max: n,
		step: r,
		onChange: i,
		children: /* @__PURE__ */ L(Et, {
			value: e,
			min: t,
			max: n
		})
	});
}
//#endregion
//#region src/components/labeled-row.tsx
var Ot = ({ label: e, children: t }) => /* @__PURE__ */ L("div", {
	className: "flex-ha gap-3",
	children: [/* @__PURE__ */ L("div", {
		className: "",
		children: e
	}), t]
}), kt = Symbol("V"), At = Symbol("IMMUT_BASE"), jt = Symbol("IS_RAW"), Mt = Symbol("P"), R = "Array", Nt = [
	Symbol.iterator,
	Symbol.toStringTag,
	jt
], Pt = {
	Map: "Map",
	Set: "Set",
	Array: R
}, Ft = "[object Object]", It = "[object Map]", Lt = "[object Set]", Rt = "[object Array]", zt = "[object Function]", Bt = {
	[It]: "Map",
	[Lt]: "Set",
	[Rt]: R,
	[Ft]: "Object"
}, Vt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], Ht = [
	"set",
	"clear",
	"delete"
], Ut = [
	"add",
	"clear",
	"delete"
], Wt = [
	"splice",
	"sort",
	"unshift",
	"shift"
], Gt = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), Kt = {
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
	[R]: Gt
}, qt = {
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
}, Jt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[R]: ["forEach", "map"]
};
function Yt(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var Xt = {
	value: 0,
	prefixSeed: 1
}, Zt = {
	value: 0,
	prefixSeed: 1
}, Qt = {
	value: 0,
	prefixSeed: 1
}, $t = {
	value: 0,
	prefixSeed: 1
}, en = {}, tn = {};
function nn() {
	return Yt(Zt, "MID_");
}
function rn() {
	return Yt(Xt, "MV_");
}
function an() {
	return Yt(Qt, "SI_");
}
function on() {
	return Yt($t, "SR_");
}
var sn = {
	autoFreeze: !1,
	autoRevoke: !0
}, cn = Object.prototype.toString, ln = !!Reflect, un = Object.prototype.hasOwnProperty;
function dn(e, t) {
	return ln ? Reflect.has(e, t) : un.call(e, t);
}
function fn(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		U(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), V(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), pn(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function z(e) {
	return cn.call(e);
}
function B(...e) {
	return e;
}
function pn(e) {
	return z(e) === Ft;
}
function V(e) {
	return z(e) === It;
}
function mn(e) {
	return z(e) === Lt;
}
function H(e) {
	return z(e) === zt;
}
function hn(e) {
	return Bt[z(e)];
}
function U(e) {
	let t = z(e);
	return ![
		Ft,
		Rt,
		It,
		Lt,
		zt
	].includes(t);
}
function gn(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function _n(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function vn(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function yn(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function bn(e) {
	return e && e[kt] || "";
}
function xn(e, t) {
	let n = bn(e);
	return n ? n !== t : !1;
}
function Sn(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && pn(e) && (n = Object.assign({}, e)), V(e) && (n = new Map(e)), mn(e) && (n = new Set(e)), n;
}
function Cn(e, t) {
	return t.immutBase ? e : Sn(e, t.readOnly);
}
function wn(e) {
	let t = e;
	if (!yn(e)) return e;
	let n = en[t];
	return n || (n = an(), en[t] = n), n;
}
function Tn(e, t) {
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
		let t = wn(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = wn(i);
	return n[r] = a, n;
}
function En(e) {
	return e.map((e) => tn[e] || e);
}
function Dn(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || G(t);
	Tn(i, a) < 0 && (r.push(t), i.push(a));
}
function On(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Tn(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function kn(e, t) {
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
		n = V(r) ? kn(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function An(e, t) {
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
function jn(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = V(r) ? kn(r, a) : r[a];
	}
}
function Mn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		jn(e, r, n);
	}
}
function Nn(e, t) {
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
		let e = En(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var Pn = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new Map(), In = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new Map();
function Rn(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function zn(e, t, n) {
	let r = [t], i = q(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function Bn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = hn(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = wn(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = Hn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = zn(y, e, s), f = G(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = W(i.arrKeyPath, !0), n = Zn(u, e);
			t = Nn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = Zn(u, n);
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
		id: nn(),
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
		revoke: B,
		hasOnOperate: c,
		execOnOperate: B
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function Vn(e) {
	if (!e) return !1;
	let t = Gn(e);
	return t ? !t.isImmutBase : !1;
}
function Hn(e, t) {
	let n = J(e, t);
	return n ? n.level + 1 : 1;
}
function q(e, t) {
	return t.metaMap.get(e);
}
function J(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Y(e) || null : null;
}
function Un(e) {
	return e && Y(e) || null;
}
function Wn(e) {
	return e && e[kt] || "";
}
function Gn(e) {
	return Y(e) || null;
}
function Y(e) {
	return e[Mt];
}
function Kn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function qn(e) {
	return In.get(e) || on();
}
function Jn(e, t) {
	return In.set(e, t);
}
function Yn(e) {
	return Pn.get(e);
}
function Xn(e, t, n) {
	let r = Pn.get(e);
	r || (r = {}, Pn.set(e, r)), r[t] = n;
}
function Zn(e, t) {
	let n = Yn(e);
	return n && n[t] || [];
}
function Qn(e) {
	return Fn.get(e) || [];
}
function $n(e, t, n) {
	let r = Pn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (Fn.get(e) || []).filter((e, n) => !t.includes(n));
	Fn.set(e, i);
}
function er(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => Xn(n, e, r));
	let i = Fn.get(n) || [], a = r.map((e) => W(e, !0)), o = !1;
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
	o || i.push(r), Fn.set(n, i);
}
function tr(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = G(i), s = G(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Dn(n, a, s), er(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function nr(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function rr(e, t) {
	return !pn(e) || Wn(e) === t;
}
function ir(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		fn(n, i, a, (e, n, r) => {
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
		if (p === "Array") return nr(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function ar(e, t) {
	let n = Qn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = K(e.proxyVal, t), i = Un(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(W(e)));
		else if (n) for (let e of o) jn(t, e, n.copy);
		else if (s) for (let e of o) jn(t, e, s.self);
	}
	i.length && $n(e.sourceId, i, a);
}
function or(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), ar(e, a), ir(e, t), a;
}
function sr(e) {
	e.rootMeta.scopes.push(e);
}
function cr(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = Bn(e, t, n), c = Cn(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => Mt === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = B;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : B;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function lr(e, t) {
	return e === "Array" || (Jt[e] || []).includes(t);
}
function ur(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (U(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!H(e)) {
			if (r.newNodeStats[c] || e[jt]) return e;
			let n = q(e, o);
			return n || (n = cr(c, e, t), sr(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!lr(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), fr(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), fr(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function dr(e, t) {
	if (!pn(e)) return e;
	let n = q(e, t);
	return n ? n.copy : e;
}
function fr(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return Rn(t), a(...e);
	}, e.clear = function(...e) {
		return Rn(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return Rn(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (Rn(t), t.hasOnOperate) {
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
function pr(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && Ut.includes(r) || i === "Array" && Vt.includes(r) || i === "Map" && Ht.includes(r))) && Rn(n);
}
function mr(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function hr(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = dr(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	pr({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Kt[o] || [];
	if (H(i) && m.includes(n)) return n === "slice" ? f.slice : (Wt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
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
			t.length === 1 ? e.isDel = !0 : On(e);
		} else g();
		let t = p[r];
		U(t) || c.newNodeMap.delete(mr(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !U(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(mr(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function gr(e) {
	if (U(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(gr), Object.freeze(e);
	if (mn(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = B;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (V(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = B;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		gr(n);
	}), Object.freeze(e);
}
function _r(e) {
	if (!e) return e;
	let t = Un(e);
	return t ? t.self : e;
}
var vr = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], yr = {};
vr.forEach((e) => yr[e] = 1);
var br = {
	[R]: 1,
	Set: 1,
	Map: 1
}, xr = /* @__PURE__ */ new Map();
function Sr(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[At] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? sn.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = rn(), p.metaVer = d, Ln.set(d, p));
	let m = t.autoRevoke ?? sn.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (Kt[f] || []).includes(t) ? (S = !0, l = (qt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (kt === t) return d;
				let n = e[t];
				if (Nt.includes(t)) {
					if (H(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !dn(e, t)) return n;
				let l = n, u = q(e, p), f = tr(t, u, J(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return br[h] && yr[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = ur(n, {
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
				}), h === "Array" && vn(t) || Pt[h] && (l = hr(e, {
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
				if (Vn(i)) if (c = !0, rr(i, d)) {
					if (dr(i, p) === t[r]) return !0;
					let e = q(i, p);
					tr(r, s, e), Dn(e, s.keyPath.concat(r));
				} else e = !1;
				else if (xn(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Y(i);
					if (o.sourceId !== n) l = _r(i);
					else {
						let { isGetted: n, val: i } = An(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Y(i);
						Kn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = K(e, t);
							n && Kn(o, Y(i), r);
						}), Dn(c, u), Mn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && vn(r)) return l = y("set", r, {
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
				return u && hr(t, {
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
				}), hr(e, {
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
				if (u) return xr.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || qn(e), l = q(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = cr("", n, {
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
				return sr(f), f.execOnOperate = y, xr.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return xr.delete(t), t;
				let r = q(t, p);
				if (r.isImmutBase && !n) return t;
				let i = or(r, p);
				return l && e && (i = gr(i)), Ln.delete(d), xr.delete(t), Jn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Cr(e) {
	if (!H(e)) throw Error("produce callback is not a function");
}
var wr = "Not a Limu root draft";
function Tr(e) {
	let t = xr.get(e);
	if (!t) throw Wn(e) && Gn(e)?.level === 0 ? Error("Draft has been finished!") : Error(wr);
	return t;
}
function Er(e, t) {
	return Sr(t).createDraft(e);
}
function Dr(e) {
	return Tr(e)(e);
}
function Or(e, t) {
	if (gn(e) || _n(t)) throw Error("produce callback can not be a promise function or result");
}
function kr(e, t, n) {
	Cr(t);
	let r = Er(e, n);
	return Or(t, t(r)), Dr(r);
}
function Ar(e, t, n) {
	if (!t || !H(t)) {
		let n = e, r = t;
		return Cr(e), (e) => kr(e, n, r);
	}
	return kr(e, t, n);
}
var jr = Ar;
function Mr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function Nr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function Pr(e, t) {
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
		}, r = Mr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => jr(t, e));
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
			let n = Mr(t), r = e[t], i = c[`set${n}`];
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
		Nr(l, e);
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
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Fr(e) {
	return Pr(e, {
		useEffect: Ne,
		useRef: Fe,
		useState: je
	});
}
var X = Fr({
	notes: [
		{
			id: "n0",
			lane: 2,
			relNoteNumber: 0,
			position: 0,
			duration: 2
		},
		{
			id: "n1",
			lane: 1,
			relNoteNumber: 4,
			position: 2,
			duration: 2
		},
		{
			id: "n2",
			lane: 2,
			relNoteNumber: 0,
			position: 4,
			duration: 2
		},
		{
			id: "n3",
			lane: 1,
			relNoteNumber: 4,
			position: 6,
			duration: 2
		}
	],
	draftNote: null,
	noteDuty: 1,
	octaveShift: 0
}), Ir = (e) => [...e].sort((e, t) => e.lane === t.lane ? e.position === t.position ? e.duration - t.duration : e.position - t.position : e.lane - t.lane), Z = {
	minPitch: 0,
	maxPitch: 8,
	pitchDragStepPx: 24,
	clickMoveThresholdPx: 6,
	stepCount: 8,
	cellWidthPx: 30,
	defaultInsertedPitch: 0
}, Q = {
	setNotePitch(e, t) {
		X.mutations.setNotes((n) => n.map((n) => n.id === e ? {
			...n,
			relNoteNumber: _e(t, Z.minPitch, Z.maxPitch)
		} : n));
	},
	removeNote(e) {
		X.mutations.setNotes((t) => t.filter((t) => t.id !== e));
	},
	setDraftNote(e) {
		X.mutations.setDraftNote(() => e);
	},
	commitDraftNote() {
		let { draftNote: e } = X.state;
		e && (X.mutations.setNotes((t) => {
			let n = {
				id: Ke(6),
				lane: e.lane,
				position: e.position,
				duration: e.duration,
				relNoteNumber: e.relNoteNumber
			};
			return Ir([...t, n]);
		}), X.mutations.setDraftNote(() => null));
	},
	clearNotes() {
		X.mutations.setNotes(() => []);
	}
}, Lr = (e) => {
	let { notes: t, draftNote: n } = X.useSnapshot(), r = Ir(t.filter((t) => t.lane === e).concat(n && n.lane === e ? [n] : [])), i = [], a = 0, o = 0;
	for (; a < Z.stepCount;) {
		let e = r[o];
		e && e.position === a ? (i.push({
			stepWidth: e.duration,
			note: e
		}), o++, a += e.duration) : (i.push({
			stepWidth: 1,
			note: void 0
		}), a++);
	}
	return i;
}, Rr = (e, t, n) => {
	let r = e.filter((e) => e.lane === t && e.position > n).sort((e, t) => e.position - t.position)[0], i = r ? r.position : Z.stepCount;
	return Math.max(1, i - n);
};
function zr(e, t) {
	let n = t === "draft" ? "#f8d66d" : t === "note" ? "#aae" : "#fff";
	return {
		width: I(e * Z.cellWidthPx),
		height: I(30),
		border: "solid 1px #ccc",
		background: n,
		paddingLeft: I(4),
		display: "flex",
		alignItems: "center"
	};
}
var Br = bt([
	["8", "8"],
	["7", "7"],
	["6", "6"],
	["5", "5"],
	["4", "4"],
	["3", "3"],
	["2", "2"],
	["1", "1"],
	["0", "0"],
	["x", "x"]
]), Vr = ({ note: e }) => {
	let t = (t) => {
		if (t === "x") {
			Q.removeNote(e.id);
			return;
		}
		Q.setNotePitch(e.id, Number(t));
	};
	return /* @__PURE__ */ L("div", {
		style: {
			...zr(e.duration, e.id.startsWith("draft-") ? "draft" : "note"),
			paddingLeft: I(0)
		},
		children: /* @__PURE__ */ L(wt, {
			options: Br,
			value: String(e.relNoteNumber),
			onChange: t,
			className: "w-full",
			style: { color: e.relNoteNumber % 4 == 0 ? "blue" : "black" }
		})
	});
}, Hr = ({ lane: e, position: t }) => {
	let { notes: n } = X.useSnapshot(), [r, i] = je(!1), a = (r) => {
		let a = r.currentTarget.getBoundingClientRect().left, o = Rr(n, e, t), s = crypto.randomUUID();
		Q.setDraftNote({
			id: `draft-${s}`,
			pointerId: r.pointerId,
			lane: e,
			position: t,
			duration: 1,
			relNoteNumber: Z.defaultInsertedPitch
		}), We(r, {
			onMove({ position: e }) {
				let t = e.x - a, n = _e(Math.floor(t / Z.cellWidthPx) + 1, 1, o);
				X.mutations.setDraftNote((e) => !e || e.pointerId !== r.pointerId ? e : {
					...e,
					duration: n
				});
			},
			onUp() {
				Q.commitDraftNote(), i(!1);
			},
			onCancel() {
				Q.setDraftNote(null), i(!1);
			}
		}), i(!0);
	};
	return /* @__PURE__ */ L("div", {
		style: {
			...zr(1, "empty"),
			cursor: r ? "ew-resize" : "cell",
			touchAction: "none",
			userSelect: "none"
		},
		onPointerDown: a
	});
}, Ur = ({ lane: e }) => {
	let t = Vr, n = Lr(e), r = 0;
	return /* @__PURE__ */ L("div", {
		className: "flex",
		children: n.map((n, i) => {
			let a = n.note ? /* @__PURE__ */ L(t, { note: n.note }, i.toString()) : /* @__PURE__ */ L(Hr, {
				lane: e,
				position: r
			}, i.toString());
			return r += n.stepWidth, a;
		})
	});
}, Wr = bt(ge(7).map((e) => [e - 3, `${e - 3}`])), Gr = () => {
	let e = X.useSnapshot();
	return /* @__PURE__ */ L("div", {
		className: "flex-ha gap-2 justify-between",
		children: [
			/* @__PURE__ */ L(Ot, {
				label: "octave",
				children: /* @__PURE__ */ L(wt, {
					options: Wr,
					value: e.octaveShift,
					onChange: X.setOctaveShift,
					reverseOptionsOrder: !0
				})
			}),
			/* @__PURE__ */ L(Ot, {
				label: "duty",
				children: /* @__PURE__ */ L("div", {
					className: "w-[24px] h-[24px]",
					children: /* @__PURE__ */ L(yt, { children: /* @__PURE__ */ L(Dt, {
						value: e.noteDuty,
						min: 0,
						max: 1,
						step: .01,
						onChange: X.setNoteDuty
					}) })
				})
			}),
			/* @__PURE__ */ L("div", {
				className: "w-[32px] h-[24px]",
				children: /* @__PURE__ */ L(yt, { children: /* @__PURE__ */ L(Ct, {
					text: "x",
					onClick: Q.clearNotes,
					asr: 1.25
				}) })
			})
		]
	});
}, Kr = () => /* @__PURE__ */ L("div", {
	className: "flex-v h-full gap-2 bg-white p-2",
	children: [/* @__PURE__ */ L(Gr, {}), /* @__PURE__ */ L("div", { children: [
		/* @__PURE__ */ L(Ur, { lane: 0 }),
		/* @__PURE__ */ L(Ur, { lane: 1 }),
		/* @__PURE__ */ L(Ur, { lane: 2 })
	] })]
});
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mx-audio/index.js
function qr(e, t) {
	return e / 60 * t * 480;
}
function Jr(e, t, n, r, i) {
	let a = qr(n, i), o = qr(r, i);
	e.processScheduling(t, a, o, i);
}
function Yr(e, t = 25, n = 100) {
	let r = { bpm: 120 }, i = n / 1e3, a = null;
	return {
		setBpm(e) {
			r.bpm = e;
		},
		start(n) {
			let o = e.currentTime, s = () => e.currentTime - o, c = 0;
			{
				let e = i;
				Jr(n, o, c, e, r.bpm), c = e;
			}
			a = setInterval(() => {
				let e = s() + i;
				Jr(n, o, c, e, r.bpm), c = e;
			}, t);
		},
		stop() {
			a &&= (clearInterval(a), null);
		}
	};
}
function Xr(e, t, n, r) {
	let i = Math.floor(t / 120), a = Math.floor(n / 120), o = [], s = 120 / (480 * r / 60);
	t === 0 && o.push({
		stepIndex: 0,
		time: e
	});
	for (let t = i + 1; t <= a; t++) o.push({
		stepIndex: t,
		time: e + t * s
	});
	return o;
}
function Zr(e, t, n, r, i) {
	let a = Xr(t, n, r, i), o = 60 / i / 4;
	for (let t of a) e.processStep?.(t.stepIndex, t.time, o);
	e.processScheduling?.(t, n, r, i);
}
function Qr(e) {
	console.log("cst 0258");
	let t = Yr(e, 25, 100), n = null;
	return {
		setBpm: t.setBpm,
		start(e) {
			e.start?.(), t.start({ processScheduling(t, n, r, i) {
				Zr(e, t, n, r, i);
			} }), n = e;
		},
		stop() {
			t.stop(), n &&= (n.stop?.(), null);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function $r(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/dynamic-note-shift.ts
function ei(e) {
	return {
		C: 0,
		D: 2,
		E: 4,
		F: 5,
		G: 7,
		A: 9,
		B: 11
	}[e.replace("m", "")];
}
function ti(e, t) {
	let n = e.endsWith("m"), r = ei(e), i = (t % 12 - r + 12) % 12;
	return n ? [
		0,
		2,
		5,
		7
	].includes(i) : [
		0,
		2,
		4,
		9,
		11
	].includes(i);
}
function ni(e, t, n, r) {
	let i = ti(t, n) ? [
		0,
		3,
		7,
		10
	] : [
		0,
		4,
		7,
		11
	], a = Math.floor(e / 4);
	return n + i[e % 4] + (r + a) * 12;
}
//#endregion
//#region src/sequencer.ts
var ri = $r("wafer-v01", import.meta.url);
if (!ri) throw Error("undefined unit interface");
function ii() {
	let e = {
		stepNotes: [],
		key: "Am",
		chordRootNote: 60,
		octaveShift: 0,
		noteDuty: .9,
		bpm: 120,
		isClockInputActive: !1,
		isInternalTickRunning: !1
	}, t = Qr(ri.audioContext), n = ri.createNoteOutputPort(), r = { processStep(t, r, i) {
		if (t %= 8, r === void 0 || i === void 0 || e.chordRootNote === void 0) return;
		let a = e.stepNotes.filter((e) => e.position === t);
		for (let t of a) {
			let a = ni(t.relNoteNumber, e.key, e.chordRootNote, e.octaveShift), o = t.duration * i - (1 - e.noteDuty) * i;
			n.noteOn(a, r), n.noteOff(a, r + o);
		}
	} };
	return {
		setStepNotes(t) {
			e.stepNotes = t;
		},
		startClock() {
			e.isClockInputActive = !0;
		},
		processStep: r.processStep,
		endClock() {
			e.isClockInputActive = !1;
		},
		setMetaAttributes(t) {
			let { songKey: n } = t;
			n !== void 0 && (e.key = n);
		},
		inputNoteOn(n, i, a) {
			e.chordRootNote = n, !e.isClockInputActive && (e.isInternalTickRunning ||= (t.setBpm(e.bpm), t.start({ processStep: r.processStep }), !0));
		},
		inputNoteOff(n, r) {
			e.chordRootNote = void 0, !e.isClockInputActive && (e.isInternalTickRunning &&= (t.stop(), !1));
		},
		setAttrs(t) {
			t.octaveShift !== void 0 && (e.octaveShift = t.octaveShift), t.noteDuty !== void 0 && (e.noteDuty = t.noteDuty);
		}
	};
}
var $ = ii();
//#endregion
//#region src/unit.tsx
function ai() {
	function e(e) {
		let t = e.map((e) => ({
			position: e.position,
			relNoteNumber: e.relNoteNumber,
			duration: e.duration
		}));
		$.setStepNotes(t);
	}
	e(X.state.notes), X.subscribe((t) => {
		t.notes && e(t.notes), (t.noteDuty !== void 0 || t.octaveShift !== void 0) && $.setAttrs(ye(t, ["octaveShift", "noteDuty"]));
	}), ri?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [240, 130]
		},
		noteInput: {
			noteOn: $.inputNoteOn,
			noteOff: $.inputNoteOff
		},
		clockHandlers: {
			start: $.startClock,
			stop: $.endClock,
			processStep: $.processStep
		},
		hostCallbacks: { setMetaAttributes: $.setMetaAttributes }
	});
}
var oi = () => (Ne(ai, []), /* @__PURE__ */ L(Kr, {})), si = he((e) => (pe(/* @__PURE__ */ L(oi, {}), e), () => {
	pe(null, e);
}), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-sky-600:oklch(58.8% .158 241.966);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-white:#fff;--spacing:.25rem;--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.flex{display:flex}.h-\\[10px\\]{height:10px}.h-\\[24px\\]{height:24px}.h-\\[36px\\]{height:36px}.h-full{height:100%}.w-\\[2px\\]{width:2px}.w-\\[24px\\]{width:24px}.w-\\[32px\\]{width:32px}.w-\\[36px\\]{width:36px}.w-\\[60px\\]{width:60px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.rounded-full{border-radius:2147483647px}.border,.border-\\[1px\\]{border-style:var(--tw-border-style);border-width:1px}.border-gray-600{border-color:var(--color-gray-600)}.border-gray-700{border-color:var(--color-gray-700)}.bg-\\[\\#fff\\]{background-color:#fff}.bg-gray-400{background-color:var(--color-gray-400)}.bg-sky-600{background-color:var(--color-sky-600)}.bg-white{background-color:var(--color-white)}.p-2{padding:calc(var(--spacing) * 2)}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-\\[9px\\]{font-size:9px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-white{color:var(--color-white)}}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", e],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { si as default };
