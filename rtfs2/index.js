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
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || M(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || M(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(d, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[u] = r[u] : (n[u] = f, e.addEventListener(t, a ? m : p, a)) : e.removeEventListener(t, a ? m : p, a);
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
//#region ../../../node_modules/.pnpm/wafer-host@0.1.11_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
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
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Ge = 0;
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
		__v: --Ge,
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
function Ke(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function qe(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Je(e, t) {
	this.props = e, this.context = t;
}
(Je.prototype = new w()).isPureReactComponent = !0, Je.prototype.shouldComponentUpdate = function(e, t) {
	return qe(this.props, e) || qe(this.state, t);
};
var Ye = n.__b;
n.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Ye && Ye(e);
}, typeof Symbol < "u" && Symbol.for;
var Xe = n.__e;
n.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	Xe(e, t, n, r);
};
var Ze = n.unmount;
function Qe(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Ke({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return Qe(e, t, n);
	})), e;
}
function $e(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return $e(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function et() {
	this.__u = 0, this.o = null, this.__b = null;
}
function tt(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function nt() {
	this.i = null, this.l = null;
}
n.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Ze && Ze(e);
}, (et.prototype = new w()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = tt(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = $e(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, et.prototype.componentWillUnmount = function() {
	this.o = [];
}, et.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = Qe(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && x(C, null, e.fallback);
	return i && (i.__u &= -33), [x(C, null, t.__a ? null : e.children), i];
};
var rt = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(nt.prototype = new w()).__a = function(e) {
	var t = this, n = tt(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), rt(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, nt.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = j(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, nt.prototype.componentDidUpdate = nt.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		rt(e, n, t);
	});
};
var it = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, at = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ot = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, st = /[A-Z0-9]/g, ct = typeof document < "u", lt = function(e) {
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
var ut = n.event;
n.event = function(e) {
	return ut && (e = ut(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var dt = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, ft = n.vnode;
n.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || ct && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || lt(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : ot.test(a) && (a = s) : s = a = "oninput" : i && at.test(a) ? a = a.replace(st, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", dt)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = it, ft && ft(e);
};
var pt = n.__r;
n.__r = function(e) {
	pt && pt(e), e.__c;
};
var mt = n.diffed;
n.diffed = function(e) {
	mt && mt(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mo-react/index.js
function ht(e, t) {
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
function gt(e) {
	let [t, n] = je();
	return Pe(() => {
		let t = e.current;
		if (t) return ht(t, n);
	}, [e]), t;
}
function _t({ children: e, destWidth: t, destHeight: n }) {
	let r = Fe(null), i = gt(r), a = Ie(() => !i || i.width === 0 || i.height === 0 ? 1 : Math.min(t / i.width, n / i.height), [
		t,
		n,
		i
	]), o = i && i.width > 0;
	return /* @__PURE__ */ L("div", {
		style: {
			position: "relative",
			width: I(t),
			height: I(n),
			overflow: "hidden"
		},
		children: /* @__PURE__ */ L("div", {
			ref: r,
			style: {
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: `translate(-50%, -50%) scale(${a})`,
				visibility: o ? "visible" : "hidden"
			},
			children: e
		})
	});
}
//#endregion
//#region src/components-mono2/selector-option.ts
function vt(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function yt(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = yt(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function bt() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = yt(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components-mono2/button.tsx
var xt = ({ active: e, text: t, children: n, onClick: r, disabled: i, asr: a = 1.6 }) => {
	let o = 36 * a;
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: r,
		disabled: i,
		className: bt("flex-c bg-gray-400 text-white border border-gray-600", e && "bg-sky-600"),
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
function St({ options: e, value: t, onChange: n, reverseOptionsOrder: r = !1, className: i, style: a }) {
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
function Ct(e) {
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
		style: {
			cursor: "pointer",
			touchAction: "none",
			WebkitTapHighlightColor: "transparent"
		},
		children: e.children
	});
}
//#endregion
//#region src/components-mono2/knob.tsx
function wt(e) {
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
function Tt({ value: e, min: t = 0, max: n = 1, step: r = .01, onChange: i }) {
	return /* @__PURE__ */ L(Ct, {
		value: e,
		min: t,
		max: n,
		step: r,
		onChange: i,
		children: /* @__PURE__ */ L(wt, {
			value: e,
			min: t,
			max: n
		})
	});
}
//#endregion
//#region src/components/labeled-row.tsx
var Et = ({ label: e, children: t }) => /* @__PURE__ */ L("div", {
	className: "flex-ha gap-3",
	children: [/* @__PURE__ */ L("div", {
		className: "",
		children: e
	}), t]
}), Dt = ({ nx: e, ny: t, width: n, height: r, bgAlterStrideX: i }) => {
	let a = n / e, o = r / t, s = i ?? 0;
	return /* @__PURE__ */ L("div", {
		style: {
			position: "absolute",
			left: I(0),
			top: I(0),
			width: I(n),
			height: I(r),
			border: "solid 0.5px #d4d4d4"
		},
		children: Array.from({ length: e * t }).map((t, n) => {
			let r = n % e, i = Math.floor(n / e), c = r * a, l = i * o, u = r % (s * 2) < s;
			return /* @__PURE__ */ L("div", { style: {
				position: "absolute",
				left: I(c),
				top: I(l),
				width: I(a),
				height: I(o),
				border: "solid 0.5px #d4d4d4",
				backgroundColor: u ? "#fff" : "#f0f0f0"
			} }, `${r}-${i}`);
		})
	});
}, Ot = Symbol("V"), kt = Symbol("IMMUT_BASE"), At = Symbol("IS_RAW"), jt = Symbol("P"), R = "Array", Mt = [
	Symbol.iterator,
	Symbol.toStringTag,
	At
], Nt = {
	Map: "Map",
	Set: "Set",
	Array: R
}, Pt = "[object Object]", Ft = "[object Map]", It = "[object Set]", Lt = "[object Array]", Rt = "[object Function]", zt = {
	[Ft]: "Map",
	[It]: "Set",
	[Lt]: R,
	[Pt]: "Object"
}, Bt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], Vt = [
	"set",
	"clear",
	"delete"
], Ht = [
	"add",
	"clear",
	"delete"
], Ut = [
	"splice",
	"sort",
	"unshift",
	"shift"
], Wt = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), Gt = {
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
	[R]: Wt
}, Kt = {
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
}, qt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[R]: ["forEach", "map"]
};
function Jt(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var Yt = {
	value: 0,
	prefixSeed: 1
}, Xt = {
	value: 0,
	prefixSeed: 1
}, Zt = {
	value: 0,
	prefixSeed: 1
}, Qt = {
	value: 0,
	prefixSeed: 1
}, $t = {}, en = {};
function tn() {
	return Jt(Xt, "MID_");
}
function nn() {
	return Jt(Yt, "MV_");
}
function rn() {
	return Jt(Zt, "SI_");
}
function an() {
	return Jt(Qt, "SR_");
}
var on = {
	autoFreeze: !1,
	autoRevoke: !0
}, sn = Object.prototype.toString, cn = !!Reflect, ln = Object.prototype.hasOwnProperty;
function un(e, t) {
	return cn ? Reflect.has(e, t) : ln.call(e, t);
}
function dn(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		U(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), V(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), fn(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function z(e) {
	return sn.call(e);
}
function B(...e) {
	return e;
}
function fn(e) {
	return z(e) === Pt;
}
function V(e) {
	return z(e) === Ft;
}
function pn(e) {
	return z(e) === It;
}
function H(e) {
	return z(e) === Rt;
}
function mn(e) {
	return zt[z(e)];
}
function U(e) {
	let t = z(e);
	return ![
		Pt,
		Lt,
		Ft,
		It,
		Rt
	].includes(t);
}
function hn(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function gn(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function _n(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function vn(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function yn(e) {
	return e && e[Ot] || "";
}
function bn(e, t) {
	let n = yn(e);
	return n ? n !== t : !1;
}
function xn(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && fn(e) && (n = Object.assign({}, e)), V(e) && (n = new Map(e)), pn(e) && (n = new Set(e)), n;
}
function Sn(e, t) {
	return t.immutBase ? e : xn(e, t.readOnly);
}
function Cn(e) {
	let t = e;
	if (!vn(e)) return e;
	let n = $t[t];
	return n || (n = rn(), $t[t] = n), n;
}
function wn(e, t) {
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
		let t = Cn(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Cn(i);
	return n[r] = a, n;
}
function Tn(e) {
	return e.map((e) => en[e] || e);
}
function En(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || G(t);
	wn(i, a) < 0 && (r.push(t), i.push(a));
}
function Dn(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = wn(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function On(e, t) {
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
		n = V(r) ? On(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function kn(e, t) {
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
function An(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = V(r) ? On(r, a) : r[a];
	}
}
function jn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		An(e, r, n);
	}
}
function Mn(e, t) {
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
		let e = Tn(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var Nn = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), Fn = /* @__PURE__ */ new WeakMap(), In = /* @__PURE__ */ new Map();
function Ln(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function Rn(e, t, n) {
	let r = [t], i = q(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function zn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = mn(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Cn(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = Vn(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = Rn(y, e, s), f = G(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = W(i.arrKeyPath, !0), n = Xn(u, e);
			t = Mn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = Xn(u, n);
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
		id: tn(),
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
function Bn(e) {
	if (!e) return !1;
	let t = Wn(e);
	return t ? !t.isImmutBase : !1;
}
function Vn(e, t) {
	let n = J(e, t);
	return n ? n.level + 1 : 1;
}
function q(e, t) {
	return t.metaMap.get(e);
}
function J(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Y(e) || null : null;
}
function Hn(e) {
	return e && Y(e) || null;
}
function Un(e) {
	return e && e[Ot] || "";
}
function Wn(e) {
	return Y(e) || null;
}
function Y(e) {
	return e[jt];
}
function Gn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function Kn(e) {
	return Fn.get(e) || an();
}
function qn(e, t) {
	return Fn.set(e, t);
}
function Jn(e) {
	return Nn.get(e);
}
function Yn(e, t, n) {
	let r = Nn.get(e);
	r || (r = {}, Nn.set(e, r)), r[t] = n;
}
function Xn(e, t) {
	let n = Jn(e);
	return n && n[t] || [];
}
function Zn(e) {
	return Pn.get(e) || [];
}
function Qn(e, t, n) {
	let r = Nn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (Pn.get(e) || []).filter((e, n) => !t.includes(n));
	Pn.set(e, i);
}
function $n(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => Yn(n, e, r));
	let i = Pn.get(n) || [], a = r.map((e) => W(e, !0)), o = !1;
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
	o || i.push(r), Pn.set(n, i);
}
function er(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = G(i), s = G(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		En(n, a, s), $n(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function tr(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function nr(e, t) {
	return !fn(e) || Un(e) === t;
}
function rr(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		dn(n, i, a, (e, n, r) => {
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
		if (p === "Array") return tr(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function ir(e, t) {
	let n = Zn(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = K(e.proxyVal, t), i = Hn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(W(e)));
		else if (n) for (let e of o) An(t, e, n.copy);
		else if (s) for (let e of o) An(t, e, s.self);
	}
	i.length && Qn(e.sourceId, i, a);
}
function ar(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), ir(e, a), rr(e, t), a;
}
function or(e) {
	e.rootMeta.scopes.push(e);
}
function sr(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = zn(e, t, n), c = Sn(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => jt === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = B;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : B;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function cr(e, t) {
	return e === "Array" || (qt[e] || []).includes(t);
}
function lr(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (U(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!H(e)) {
			if (r.newNodeStats[c] || e[At]) return e;
			let n = q(e, o);
			return n || (n = sr(c, e, t), or(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!cr(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), dr(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), dr(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function ur(e, t) {
	if (!fn(e)) return e;
	let n = q(e, t);
	return n ? n.copy : e;
}
function dr(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return Ln(t), a(...e);
	}, e.clear = function(...e) {
		return Ln(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return Ln(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (Ln(t), t.hasOnOperate) {
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
function fr(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && Ht.includes(r) || i === "Array" && Bt.includes(r) || i === "Map" && Vt.includes(r))) && Ln(n);
}
function pr(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function mr(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = ur(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	fr({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Gt[o] || [];
	if (H(i) && m.includes(n)) return n === "slice" ? f.slice : (Ut.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
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
			t.length === 1 ? e.isDel = !0 : Dn(e);
		} else g();
		let t = p[r];
		U(t) || c.newNodeMap.delete(pr(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !U(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(pr(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function hr(e) {
	if (U(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(hr), Object.freeze(e);
	if (pn(e)) {
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
		hr(n);
	}), Object.freeze(e);
}
function gr(e) {
	if (!e) return e;
	let t = Hn(e);
	return t ? t.self : e;
}
var _r = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], vr = {};
_r.forEach((e) => vr[e] = 1);
var yr = {
	[R]: 1,
	Set: 1,
	Map: 1
}, br = /* @__PURE__ */ new Map();
function xr(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[kt] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? on.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = nn(), p.metaVer = d, In.set(d, p));
	let m = t.autoRevoke ?? on.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (Gt[f] || []).includes(t) ? (S = !0, l = (Kt[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (Ot === t) return d;
				let n = e[t];
				if (Mt.includes(t)) {
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
				if (t === "__proto__" || t === "toJSON" && !un(e, t)) return n;
				let l = n, u = q(e, p), f = er(t, u, J(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return yr[h] && vr[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = lr(n, {
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
				}), h === "Array" && _n(t) || Nt[h] && (l = mr(e, {
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
				if (Bn(i)) {
					if (c = !0, nr(i, d)) {
						if (ur(i, p) === t[r]) return !0;
						let e = q(i, p);
						er(r, s, e), En(e, s.keyPath.concat(r));
					} else e = !1;
				} else if (bn(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Y(i);
					if (o.sourceId !== n) l = gr(i);
					else {
						let { isGetted: n, val: i } = kn(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Y(i);
						Gn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = K(e, t);
							n && Gn(o, Y(i), r);
						}), En(c, u), jn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && _n(r)) return l = y("set", r, {
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
				return u && mr(t, {
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
				}), mr(e, {
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
				if (u) return br.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || Kn(e), l = q(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = sr("", n, {
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
				return or(f), f.execOnOperate = y, br.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return br.delete(t), t;
				let r = q(t, p);
				if (r.isImmutBase && !n) return t;
				let i = ar(r, p);
				return l && e && (i = hr(i)), In.delete(d), br.delete(t), qn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Sr(e) {
	if (!H(e)) throw Error("produce callback is not a function");
}
var Cr = "Not a Limu root draft";
function wr(e) {
	let t = br.get(e);
	if (!t) throw Un(e) && Wn(e)?.level === 0 ? Error("Draft has been finished!") : Error(Cr);
	return t;
}
function Tr(e, t) {
	return xr(t).createDraft(e);
}
function Er(e) {
	return wr(e)(e);
}
function Dr(e, t) {
	if (hn(e) || gn(t)) throw Error("produce callback can not be a promise function or result");
}
function Or(e, t, n) {
	Sr(t);
	let r = Tr(e, n);
	return Dr(t, t(r)), Er(r);
}
function kr(e, t, n) {
	if (!t || !H(t)) {
		let n = e, r = t;
		return Sr(e), (e) => Or(e, n, r);
	}
	return Or(e, t, n);
}
var Ar = kr;
function jr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function Mr(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function Nr(e, t) {
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
		}, r = jr(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Ar(t, e));
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
			let n = jr(t), r = e[t], i = c[`set${n}`];
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
		Mr(l, e);
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
function Pr(e) {
	return Nr(e, {
		useEffect: Ne,
		useRef: Fe,
		useState: je
	});
}
var X = Pr({
	notes: [
		{
			relativeNoteNumber: 0,
			stepPosition: 0,
			stepDuration: 2
		},
		{
			relativeNoteNumber: 1,
			stepPosition: 2,
			stepDuration: 2
		},
		{
			relativeNoteNumber: 2,
			stepPosition: 4,
			stepDuration: 2
		},
		{
			relativeNoteNumber: 3,
			stepPosition: 6,
			stepDuration: 2
		}
	],
	noteDuty: 1,
	octaveShift: 0
}), Z = {
	editorWidth: 320,
	editorHeight: 160,
	stepCount: 16,
	noteRowCount: 9,
	previewVelocity: 100
}, Fr = {
	noteFill: "#9fe581",
	noteBorder: "#478915",
	draftFill: "#4682b473",
	draftBorder: "#4682b4",
	keyBorder: "#cccccc",
	labelText: "#666666"
}, Ir = Z.editorWidth / Z.stepCount, Q = Z.editorHeight / Z.noteRowCount, Lr = (e, t, n) => Math.min(Math.max(e, t), n), Rr = (e) => {
	let t = e.getBoundingClientRect(), n = e.clientWidth, r = e.clientHeight;
	return {
		left: t.left,
		top: t.top,
		scaleX: t.width > 0 ? n / t.width : 1,
		scaleY: t.height > 0 ? r / t.height : 1,
		cellW: n / Z.stepCount,
		cellH: r / Z.noteRowCount,
		actualWidth: n,
		actualHeight: r
	};
}, zr = (e, t) => {
	let n = Lr((e - t.left) * t.scaleX, 0, t.actualWidth - 1);
	return Lr(Math.floor(n / t.cellW), 0, Z.stepCount - 1);
}, Br = (e, t) => {
	let n = Lr((e - t.top) * t.scaleY, 0, t.actualHeight - 1), r = Math.floor(n / t.cellH);
	return Lr(Z.noteRowCount - 1 - r, 0, Z.noteRowCount - 1);
}, Vr = (e) => {
	let t = (Z.noteRowCount - 1 - e.relativeNoteNumber) * Q;
	return {
		x: e.stepPosition * Ir,
		y: t,
		width: e.stepDuration * Ir,
		height: Q
	};
}, Hr = (e) => [...e].sort((e, t) => e.stepPosition === t.stepPosition ? e.relativeNoteNumber === t.relativeNoteNumber ? e.stepDuration - t.stepDuration : t.relativeNoteNumber - e.relativeNoteNumber : e.stepPosition - t.stepPosition), Ur = (e, t) => e.stepPosition < t.stepPosition + t.stepDuration && t.stepPosition < e.stepPosition + e.stepDuration;
function Wr() {
	let { notes: e } = X.useSnapshot(), [t, n] = je(null), r = { replaceNotes(e) {
		X.mutations.setNotes(e);
	} }, i = (t) => {
		let n = e.filter((e) => !(e.relativeNoteNumber === t.relativeNoteNumber && Ur(e, t)));
		r.replaceNotes(Hr([...n, t]));
	}, a = (t) => {
		r.replaceNotes(e.filter((e) => e.relativeNoteNumber !== t.relativeNoteNumber || e.stepPosition !== t.stepPosition || e.stepDuration !== t.stepDuration));
	}, o = (e, t, r) => {
		n((n) => {
			if (!n || n.pointerId !== e) return n;
			let i = zr(t, r);
			return {
				...n,
				stepDuration: Lr(i - n.startStep + 1, 1, Z.stepCount - n.startStep)
			};
		});
	};
	return {
		handlePointerDown: (e) => {
			let t = Rr(e.currentTarget), r = zr(e.clientX, t), a = Br(e.clientY, t);
			n({
				pointerId: e.pointerId,
				startStep: r,
				relativeNoteNumber: a,
				stepDuration: 1
			}), e.currentTarget.setPointerCapture(e.pointerId), We(e, {
				onMove({ position: n }) {
					o(e.pointerId, n.x, t);
				},
				onUp({ position: r }) {
					o(e.pointerId, r.x, t), n((t) => !t || t.pointerId !== e.pointerId ? t : (i({
						relativeNoteNumber: t.relativeNoteNumber,
						stepPosition: t.startStep,
						stepDuration: t.stepDuration
					}), null));
				},
				onCancel() {
					n(null);
				}
			});
		},
		handleKeysColumnPointerDown: (e, t) => {
			e.preventDefault(), e.stopPropagation(), We(e, {
				onUp() {},
				onCancel() {}
			});
		},
		draftNote: t,
		notes: e,
		deleteNote: a
	};
}
function Gr(e) {
	return [
		"R",
		"3",
		"5",
		"7"
	][e % 4];
}
var Kr = () => {
	let { handlePointerDown: e, handleKeysColumnPointerDown: t, draftNote: n, notes: r, deleteNote: i } = Wr();
	return /* @__PURE__ */ L("div", {
		className: "flex-v bg-white gap-2",
		children: /* @__PURE__ */ L("div", {
			className: "flex-h gap-2",
			children: [/* @__PURE__ */ L("div", {
				style: {
					width: I(30),
					height: I(Z.editorHeight),
					fontSize: "8px"
				},
				children: ge(9).map((e) => {
					let n = 8 - e;
					return /* @__PURE__ */ L("div", {
						className: "flex-c text-[11px]",
						style: {
							height: I(Q),
							border: `solid 0.5px ${Fr.keyBorder}`
						},
						onPointerDown: (n) => t(n, e),
						children: Gr(n)
					}, e);
				})
			}), /* @__PURE__ */ L("div", {
				style: {
					width: I(Z.editorWidth),
					height: I(Z.editorHeight),
					position: "relative",
					touchAction: "none",
					userSelect: "none"
				},
				onPointerDown: e,
				children: [
					/* @__PURE__ */ L(Dt, {
						width: Z.editorWidth,
						height: Z.editorHeight,
						nx: Z.stepCount,
						ny: Z.noteRowCount,
						bgAlterStrideX: 4
					}),
					r.map((e) => {
						let t = Vr(e);
						return /* @__PURE__ */ L("div", {
							style: {
								position: "absolute",
								left: I(t.x),
								top: I(t.y),
								width: I(t.width),
								height: I(t.height),
								boxSizing: "border-box",
								backgroundColor: Fr.noteFill,
								border: `solid 1px ${Fr.noteBorder}`,
								borderRadius: "2px",
								cursor: "pointer"
							},
							onPointerDown: (e) => {
								e.stopPropagation();
							},
							onClick: () => {
								i(e);
							}
						}, `${e.stepPosition}-${e.stepDuration}-${e.relativeNoteNumber}`);
					}),
					n ? /* @__PURE__ */ L("div", { style: {
						position: "absolute",
						left: I(n.startStep * Ir),
						top: I((Z.noteRowCount - 1 - n.relativeNoteNumber) * Q),
						width: I(n.stepDuration * Ir),
						height: I(Q),
						boxSizing: "border-box",
						backgroundColor: Fr.draftFill,
						border: `1px solid ${Fr.draftBorder}`,
						pointerEvents: "none",
						borderRadius: "2px"
					} }) : null
				]
			})]
		})
	});
}, qr = vt(ge(7).map((e) => [e - 3, `${e - 3}`])), Jr = () => {
	let e = X.useSnapshot();
	return /* @__PURE__ */ L("div", {
		className: "flex-ha gap-2 justify-between",
		children: [
			/* @__PURE__ */ L("div", { children: "RTFS2" }),
			/* @__PURE__ */ L("div", {
				className: "flex-ha gap-4",
				children: [/* @__PURE__ */ L(Et, {
					label: "octave",
					children: /* @__PURE__ */ L(St, {
						options: qr,
						value: e.octaveShift,
						onChange: X.setOctaveShift,
						reverseOptionsOrder: !0
					})
				}), /* @__PURE__ */ L(Et, {
					label: "duty",
					children: /* @__PURE__ */ L(_t, {
						destWidth: 24,
						destHeight: 24,
						children: /* @__PURE__ */ L(Tt, {
							value: e.noteDuty,
							min: 0,
							max: 1,
							step: .01,
							onChange: X.setNoteDuty
						})
					})
				})]
			}),
			/* @__PURE__ */ L(_t, {
				destWidth: 32,
				destHeight: 24,
				children: /* @__PURE__ */ L(xt, {
					text: "x",
					onClick: () => {
						X.setNotes([]);
					},
					asr: 1.25
				})
			})
		]
	});
}, Yr = () => /* @__PURE__ */ L("div", {
	className: "bg-white w-[392px] h-[240px] flex-v gap-3 p-4",
	children: [/* @__PURE__ */ L(Jr, {}), /* @__PURE__ */ L(Kr, {})]
});
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mx-audio/index.js
function Xr(e, t) {
	return e / 60 * t * 480;
}
function Zr(e, t, n, r, i) {
	let a = Xr(n, i), o = Xr(r, i);
	e.processScheduling(t, a, o, i);
}
function Qr(e, t = 25, n = 100) {
	let r = { bpm: 120 }, i = n / 1e3, a = null;
	return {
		setBpm(e) {
			r.bpm = e;
		},
		start(n) {
			let o = e.currentTime, s = () => e.currentTime - o, c = 0;
			{
				let e = i;
				Zr(n, o, c, e, r.bpm), c = e;
			}
			a = setInterval(() => {
				let e = s() + i;
				Zr(n, o, c, e, r.bpm), c = e;
			}, t);
		},
		stop() {
			a &&= (clearInterval(a), null);
		}
	};
}
function $r(e, t, n, r) {
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
function ei(e, t, n, r, i) {
	let a = $r(t, n, r, i), o = 60 / i / 4;
	for (let t of a) e.processStep?.(t.stepIndex, t.time, o);
	e.processScheduling?.(t, n, r, i);
}
function ti(e) {
	console.log("cst 0258");
	let t = Qr(e, 25, 100), n = null;
	return {
		setBpm: t.setBpm,
		start(e) {
			e.start?.(), t.start({ processScheduling(t, n, r, i) {
				ei(e, t, n, r, i);
			} }), n = e;
		},
		stop() {
			t.stop(), n &&= (n.stop?.(), null);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.11_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function ni(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/dynamic-note-shift.ts
function ri(e) {
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
function ii(e, t) {
	let n = e.endsWith("m"), r = ri(e), i = (t % 12 - r + 12) % 12;
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
function ai(e, t, n, r) {
	let i = ii(t, n) ? [
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
var oi = ni("wafer-v01", import.meta.url);
if (!oi) throw Error("undefined unit interface");
function si() {
	let e = {
		stepNotes: [],
		key: "Am",
		chordRootNote: 60,
		octaveShift: 0,
		noteDuty: .9,
		bpm: 120,
		isClockInputActive: !1,
		isInternalTickRunning: !1
	}, t = ti(oi.audioContext), n = oi.createNoteOutputPort(), r = { processStep(t, r, i) {
		if (t %= 16, r === void 0 || i === void 0 || e.chordRootNote === void 0) return;
		let a = e.stepNotes.filter((e) => e.position === t);
		for (let t of a) {
			let a = ai(t.relNoteNumber, e.key, e.chordRootNote, e.octaveShift), o = i * t.duration, s = i * .2, c = ve(e.noteDuty, s, o);
			n.noteOn(a, r), n.noteOff(a, r + c);
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
		inputNoteOn(n, i) {
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
var $ = si();
//#endregion
//#region src/unit.tsx
function ci() {
	function e(e) {
		let t = e.map((e) => ({
			position: e.stepPosition,
			relNoteNumber: e.relativeNoteNumber,
			duration: e.stepDuration
		}));
		$.setStepNotes(t);
	}
	e(X.state.notes), X.subscribe((t) => {
		t.notes && e(t.notes), (t.noteDuty !== void 0 || t.octaveShift !== void 0) && $.setAttrs(ye(t, ["octaveShift", "noteDuty"]));
	}), oi?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [392, 240],
			preferJustSize: !0
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
var li = () => (Ne(ci, []), /* @__PURE__ */ L(Yr, {})), ui = he((e) => (pe(/* @__PURE__ */ L(li, {}), e), () => {
	pe(null, e);
}), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-sky-600:oklch(58.8% .158 241.966);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-white:#fff;--spacing:.25rem;--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.flex{display:flex}.h-\\[10px\\]{height:10px}.h-\\[36px\\]{height:36px}.h-\\[240px\\]{height:240px}.h-full{height:100%}.w-\\[2px\\]{width:2px}.w-\\[36px\\]{width:36px}.w-\\[60px\\]{width:60px}.w-\\[392px\\]{width:392px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.rounded-full{border-radius:2147483647px}.border,.border-\\[1px\\]{border-style:var(--tw-border-style);border-width:1px}.border-gray-600{border-color:var(--color-gray-600)}.border-gray-700{border-color:var(--color-gray-700)}.bg-\\[\\#fff\\]{background-color:#fff}.bg-gray-400{background-color:var(--color-gray-400)}.bg-sky-600{background-color:var(--color-sky-600)}.bg-white{background-color:var(--color-white)}.p-4{padding:calc(var(--spacing) * 4)}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-\\[9px\\]{font-size:9px}.text-\\[11px\\]{font-size:11px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-white{color:var(--color-white)}}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", e],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { ui as default };
