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
		static supportsSharableUnitClass = !0;
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				me(e);
			});
		}
		setupUnit(n) {
			if (!(this.isMounted || !this.shadowRoot)) {
				if (t.cssTexts) {
					let e = document.createElement("style");
					e.dataset.unit1Styles = "true", e.textContent = t.cssTexts.join("\n"), this.shadowRoot.appendChild(e);
				}
				t.adoptedStyleSheets && (this.shadowRoot.adoptedStyleSheets = t.adoptedStyleSheets), this.disposeRender = e(n, this.shadowRoot), this.isMounted = !0;
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
//#region src/page.css?inline
var ge = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-orange-400:oklch(75% .183 55.934);--color-orange-500:oklch(70.5% .213 47.604);--color-yellow-300:oklch(90.5% .182 98.111);--color-yellow-400:oklch(85.2% .199 91.936);--color-sky-600:oklch(58.8% .158 241.966);--color-gray-300:oklch(87.2% .01 258.338);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-white:#fff;--spacing:.25rem;--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.flex{display:flex}.h-\\[10px\\]{height:10px}.h-\\[18px\\]{height:18px}.h-\\[36px\\]{height:36px}.h-\\[240px\\]{height:240px}.h-full{height:100%}.w-\\[2px\\]{width:2px}.w-\\[18px\\]{width:18px}.w-\\[36px\\]{width:36px}.w-\\[60px\\]{width:60px}.w-\\[400px\\]{width:400px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.rounded-full{border-radius:2147483647px}.border,.border-\\[1px\\]{border-style:var(--tw-border-style);border-width:1px}.border-gray-600{border-color:var(--color-gray-600)}.border-gray-700{border-color:var(--color-gray-700)}.border-orange-500{border-color:var(--color-orange-500)}.border-yellow-400{border-color:var(--color-yellow-400)}.bg-\\[\\#eee\\]{background-color:#eee}.bg-\\[\\#fff\\]{background-color:#fff}.bg-gray-300{background-color:var(--color-gray-300)}.bg-gray-400{background-color:var(--color-gray-400)}.bg-orange-400{background-color:var(--color-orange-400)}.bg-sky-600{background-color:var(--color-sky-600)}.bg-yellow-300{background-color:var(--color-yellow-300)}.p-2{padding:calc(var(--spacing) * 2)}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-\\[8px\\]{font-size:8px}.text-\\[9px\\]{font-size:9px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-white{color:var(--color-white)}}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}";
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function _e(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = _e(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function ve() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = _e(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/array-utils-4n0oRYSd.js
function ye(e) {
	return Array(e).fill(0).map((e, t) => t);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/number-utils-CUPZTwjx.js
function be(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function xe(e, t, n) {
	return t + (n - t) * e;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/index.js
function Se(e, t, n) {
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
function Ce(e, t) {
	return t && Number.isFinite(t) ? `${e.toFixed(t)}px` : `${e}px`;
}
//#endregion
//#region src/components-mono2/selector-option.ts
function we(e) {
	return e.map((e) => ({
		label: e,
		value: e
	}));
}
function Te(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var Ee = 0;
Array.isArray;
function N(e, t, r, i, a, o) {
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
		__v: --Ee,
		__i: -1,
		__u: 0,
		__source: a,
		__self: o
	};
	if (typeof e == "function" && (s = e.defaultProps)) for (c in s) l[c] === void 0 && (l[c] = s[c]);
	return n.vnode && n.vnode(u), u;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/dist/hooks.module.js
var P, F, De, Oe, ke = 0, Ae = [], I = n, je = I.__b, Me = I.__r, Ne = I.diffed, Pe = I.__c, Fe = I.unmount, Ie = I.__;
function Le(e, t) {
	I.__h && I.__h(F, e, ke || t), ke = 0;
	var n = F.__H || (F.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function Re(e) {
	return ke = 1, ze(Ye, e);
}
function ze(e, t, n) {
	var r = Le(P++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Ye(void 0, t), function(e) {
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
function Be(e, t) {
	var n = Le(P++, 3);
	!I.__s && Je(n.__H, t) && (n.__ = e, n.u = t, F.__H.__h.push(n));
}
function Ve(e) {
	return ke = 5, He(function() {
		return { current: e };
	}, []);
}
function He(e, t) {
	var n = Le(P++, 7);
	return Je(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ue() {
	for (var e; e = Ae.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Ke), t.__h.some(qe), t.__h = [];
		} catch (n) {
			t.__h = [], I.__e(n, e.__v);
		}
	}
}
I.__b = function(e) {
	F = null, je && je(e);
}, I.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Ie && Ie(e, t);
}, I.__r = function(e) {
	Me && Me(e), P = 0;
	var t = (F = e.__c).__H;
	t && (De === F ? (t.__h = [], F.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Ke), t.__h.some(qe), t.__h = [], P = 0)), De = F;
}, I.diffed = function(e) {
	Ne && Ne(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Ae.push(t) !== 1 && Oe === I.requestAnimationFrame || ((Oe = I.requestAnimationFrame) || Ge)(Ue)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), De = F = null;
}, I.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Ke), e.__h = e.__h.filter(function(e) {
				return !e.__ || qe(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], I.__e(n, e.__v);
		}
	}), Pe && Pe(e, t);
}, I.unmount = function(e) {
	Fe && Fe(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Ke(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && I.__e(t, n.__v));
};
var We = typeof requestAnimationFrame == "function";
function Ge(e) {
	var t, n = function() {
		clearTimeout(r), We && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	We && (t = requestAnimationFrame(n));
}
function Ke(e) {
	var t = F, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), F = t;
}
function qe(e) {
	var t = F;
	e.__c = e.__(), F = t;
}
function Je(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Ye(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region src/components-mono2/general-selector.tsx
function L({ options: e, value: t, onChange: n, reverseOptionsOrder: r = !1, className: i, style: a }) {
	return /* @__PURE__ */ N("select", {
		value: t,
		onChange: (t) => {
			let r = typeof e[0].value == "number", i = t.target;
			n(r ? parseFloat(i.value) : i.value);
		},
		className: i,
		style: a,
		children: He(() => r ? [...e].reverse() : e, [e, r]).map((e) => /* @__PURE__ */ N("option", {
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components-mono2/knob-frame.tsx
function Xe(e) {
	return /* @__PURE__ */ N("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			Se(t, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = be(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
function Ze(e) {
	return /* @__PURE__ */ N("div", {
		className: "border-[1px] border-gray-700 w-[36px] h-[36px] rounded-full bg-gray-400",
		children: /* @__PURE__ */ N("div", {
			className: "w-full h-full flex justify-center",
			style: { transform: `rotate(${{ tickAngel() {
				let { value: t, min: n, max: r } = e;
				return xe((t - n) / (r - n), -135, 135);
			} }.tickAngel()}deg)` },
			children: /* @__PURE__ */ N("div", { className: "w-[2px] h-[10px] bg-[#fff]" })
		})
	});
}
function Qe({ value: e, min: t = 0, max: n = 1, step: r = .01, onChange: i }) {
	return /* @__PURE__ */ N(Xe, {
		value: e,
		min: t,
		max: n,
		step: r,
		onChange: i,
		children: /* @__PURE__ */ N(Ze, {
			value: e,
			min: t,
			max: n
		})
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-CzL-_B7V.js
var $e = Symbol("V"), et = Symbol("IMMUT_BASE"), tt = Symbol("IS_RAW"), nt = Symbol("P"), R = "Array", rt = [
	Symbol.iterator,
	Symbol.toStringTag,
	tt
], it = {
	Map: "Map",
	Set: "Set",
	Array: R
}, at = "[object Object]", ot = "[object Map]", st = "[object Set]", ct = "[object Array]", lt = "[object Function]", ut = {
	[ot]: "Map",
	[st]: "Set",
	[ct]: R,
	[at]: "Object"
}, dt = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], ft = [
	"set",
	"clear",
	"delete"
], pt = [
	"add",
	"clear",
	"delete"
], mt = [
	"splice",
	"sort",
	"unshift",
	"shift"
], ht = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), gt = {
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
	[R]: ht
}, _t = {
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
}, vt = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[R]: ["forEach", "map"]
};
function yt(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var bt = {
	value: 0,
	prefixSeed: 1
}, xt = {
	value: 0,
	prefixSeed: 1
}, St = {
	value: 0,
	prefixSeed: 1
}, Ct = {
	value: 0,
	prefixSeed: 1
}, wt = {}, Tt = {};
function Et() {
	return yt(xt, "MID_");
}
function Dt() {
	return yt(bt, "MV_");
}
function Ot() {
	return yt(St, "SI_");
}
function kt() {
	return yt(Ct, "SR_");
}
var At = {
	autoFreeze: !1,
	autoRevoke: !0
}, jt = Object.prototype.toString, Mt = !!Reflect, Nt = Object.prototype.hasOwnProperty;
function Pt(e, t) {
	return Mt ? Reflect.has(e, t) : Nt.call(e, t);
}
function Ft(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		U(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), V(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), It(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function z(e) {
	return jt.call(e);
}
function B(...e) {
	return e;
}
function It(e) {
	return z(e) === at;
}
function V(e) {
	return z(e) === ot;
}
function Lt(e) {
	return z(e) === st;
}
function H(e) {
	return z(e) === lt;
}
function Rt(e) {
	return ut[z(e)];
}
function U(e) {
	let t = z(e);
	return ![
		at,
		ct,
		ot,
		st,
		lt
	].includes(t);
}
function zt(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Bt(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Vt(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Ht(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function Ut(e) {
	return e && e[$e] || "";
}
function Wt(e, t) {
	let n = Ut(e);
	return n ? n !== t : !1;
}
function Gt(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && It(e) && (n = Object.assign({}, e)), V(e) && (n = new Map(e)), Lt(e) && (n = new Set(e)), n;
}
function Kt(e, t) {
	return t.immutBase ? e : Gt(e, t.readOnly);
}
function qt(e) {
	let t = e;
	if (!Ht(e)) return e;
	let n = wt[t];
	return n || (n = Ot(), wt[t] = n), n;
}
function Jt(e, t) {
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
		let t = qt(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = qt(i);
	return n[r] = a, n;
}
function Yt(e) {
	return e.map((e) => Tt[e] || e);
}
function Xt(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || G(t);
	Jt(i, a) < 0 && (r.push(t), i.push(a));
}
function Zt(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Jt(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function Qt(e, t) {
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
		n = V(r) ? Qt(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function $t(e, t) {
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
function en(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = V(r) ? Qt(r, a) : r[a];
	}
}
function tn(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		en(e, r, n);
	}
}
function nn(e, t) {
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
		let e = Yt(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var rn = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map(), an = /* @__PURE__ */ new WeakMap(), on = /* @__PURE__ */ new Map();
function J(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function sn(e, t, n) {
	let r = [t], i = Y(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function cn(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Rt(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = qt(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = un(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = sn(y, e, s), f = G(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = W(i.arrKeyPath, !0), n = yn(u, e);
			t = nn(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = yn(u, n);
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
		id: Et(),
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
function ln(e) {
	if (!e) return !1;
	let t = pn(e);
	return t ? !t.isImmutBase : !1;
}
function un(e, t) {
	let n = X(e, t);
	return n ? n.level + 1 : 1;
}
function Y(e, t) {
	return t.metaMap.get(e);
}
function X(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Z(e) || null : null;
}
function dn(e) {
	return e && Z(e) || null;
}
function fn(e) {
	return e && e[$e] || "";
}
function pn(e) {
	return Z(e) || null;
}
function Z(e) {
	return e[nt];
}
function mn(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function hn(e) {
	return an.get(e) || kt();
}
function gn(e, t) {
	return an.set(e, t);
}
function _n(e) {
	return rn.get(e);
}
function vn(e, t, n) {
	let r = rn.get(e);
	r || (r = {}, rn.set(e, r)), r[t] = n;
}
function yn(e, t) {
	let n = _n(e);
	return n && n[t] || [];
}
function bn(e) {
	return q.get(e) || [];
}
function xn(e, t, n) {
	let r = rn.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (q.get(e) || []).filter((e, n) => !t.includes(n));
	q.set(e, i);
}
function Sn(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => vn(n, e, r));
	let i = q.get(n) || [], a = r.map((e) => W(e, !0)), o = !1;
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
	o || i.push(r), q.set(n, i);
}
function Cn(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = G(i), s = G(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Xt(n, a, s), Sn(n, [c, l]);
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
	return !It(e) || fn(e) === t;
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
		Ft(n, i, a, (e, n, r) => {
			let i = X(e, t);
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
			let { val: r } = K(e.proxyVal, t), i = dn(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(W(e)));
		else if (n) for (let e of o) en(t, e, n.copy);
		else if (s) for (let e of o) en(t, e, s.self);
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
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = cn(e, t, n), c = Kt(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => nt === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = B;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : B;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function jn(e, t) {
	return e === "Array" || (vt[e] || []).includes(t);
}
function Mn(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (U(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!H(e)) {
			if (r.newNodeStats[c] || e[tt]) return e;
			let n = Y(e, o);
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
	if (!It(e)) return e;
	let n = Y(e, t);
	return n ? n.copy : e;
}
function Pn(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return J(t), a(...e);
	}, e.clear = function(...e) {
		return J(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return J(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (J(t), t.hasOnOperate) {
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
				let r = X(n, i), a = r ? r.copy || r.self : n;
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
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && pt.includes(r) || i === "Array" && dt.includes(r) || i === "Map" && ft.includes(r))) && J(n);
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
	let m = gt[o] || [];
	if (H(i) && m.includes(n)) return n === "slice" ? f.slice : (mt.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = X(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = X(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = X(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : Zt(e);
		} else g();
		let t = p[r];
		U(t) || c.newNodeMap.delete(In(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !U(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(In(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Rn(e) {
	if (U(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Rn), Object.freeze(e);
	if (Lt(e)) {
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
	[R]: 1,
	Set: 1,
	Map: 1
}, Q = /* @__PURE__ */ new Map();
function Un(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[et] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? At.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = Dt(), p.metaVer = d, on.set(d, p));
	let m = t.autoRevoke ?? At.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (gt[f] || []).includes(t) ? (S = !0, l = (_t[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if ($e === t) return d;
				let n = e[t];
				if (rt.includes(t)) {
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
				if (t === "__proto__" || t === "toJSON" && !Pt(e, t)) return n;
				let l = n, u = Y(e, p), f = Cn(t, u, X(l, p));
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
				}), h === "Array" && Vt(t) || it[h] && (l = Ln(e, {
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
				let a = !0, s = Y(t, p), c = !1, l = i;
				if (ln(i)) {
					if (c = !0, Tn(i, d)) {
						if (Nn(i, p) === t[r]) return !0;
						let e = Y(i, p);
						Cn(r, s, e), Xt(e, s.keyPath.concat(r));
					} else e = !1;
				} else if (Wt(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Z(i);
					if (o.sourceId !== n) l = zn(i);
					else {
						let { isGetted: n, val: i } = $t(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Z(i);
						mn(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = K(e, t);
							n && mn(o, Z(i), r);
						}), Xt(c, u), tn(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Vt(r)) return l = y("set", r, {
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
				let n = Y(e, p), r = e[t];
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
				if (U(e)) throw Error("base state can not be primitive");
				if (u) return Q.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || hn(e), l = Y(e, p);
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
				return kn(f), f.execOnOperate = y, Q.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return Q.delete(t), t;
				let r = Y(t, p);
				if (r.isImmutBase && !n) return t;
				let i = On(r, p);
				return l && e && (i = Rn(i)), on.delete(d), Q.delete(t), gn(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function Wn(e) {
	if (!H(e)) throw Error("produce callback is not a function");
}
var Gn = "Not a Limu root draft";
function Kn(e) {
	let t = Q.get(e);
	if (!t) throw fn(e) && pn(e)?.level === 0 ? Error("Draft has been finished!") : Error(Gn);
	return t;
}
function qn(e, t) {
	return Un(t).createDraft(e);
}
function Jn(e) {
	return Kn(e)(e);
}
function Yn(e, t) {
	if (zt(e) || Bt(t)) throw Error("produce callback can not be a promise function or result");
}
function Xn(e, t, n) {
	Wn(t);
	let r = qn(e, n);
	return Yn(t, t(r)), Jn(r);
}
function Zn(e, t, n) {
	if (!t || !H(t)) {
		let n = e, r = t;
		return Wn(e), (e) => Xn(e, n, r);
	}
	return Xn(e, t, n);
}
var Qn = Zn;
function $n(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function er(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function tr(e, t) {
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
		}, r = $n(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Qn(t, e));
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
			let n = $n(t), r = e[t], i = c[`set${n}`];
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
		er(l, e);
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
function nr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function rr(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function ir(e, t) {
	this.props = e, this.context = t;
}
(ir.prototype = new w()).isPureReactComponent = !0, ir.prototype.shouldComponentUpdate = function(e, t) {
	return rr(this.props, e) || rr(this.state, t);
};
var ar = n.__b;
n.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), ar && ar(e);
}, typeof Symbol < "u" && Symbol.for;
var or = n.__e;
n.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	or(e, t, n, r);
};
var sr = n.unmount;
function cr(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = nr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return cr(e, t, n);
	})), e;
}
function lr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return lr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function ur() {
	this.__u = 0, this.o = null, this.__b = null;
}
function dr(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function fr() {
	this.i = null, this.l = null;
}
n.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), sr && sr(e);
}, (ur.prototype = new w()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = dr(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = lr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, ur.prototype.componentWillUnmount = function() {
	this.o = [];
}, ur.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = cr(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && x(C, null, e.fallback);
	return i && (i.__u &= -33), [x(C, null, t.__a ? null : e.children), i];
};
var pr = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(fr.prototype = new w()).__a = function(e) {
	var t = this, n = dr(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), pr(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, fr.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = j(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, fr.prototype.componentDidUpdate = fr.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		pr(e, n, t);
	});
};
var mr = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, hr = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, gr = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, _r = /[A-Z0-9]/g, vr = typeof document < "u", yr = function(e) {
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
var br = n.event;
n.event = function(e) {
	return br && (e = br(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var xr = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, Sr = n.vnode;
n.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || vr && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || yr(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : gr.test(a) && (a = s) : s = a = "oninput" : i && hr.test(a) ? a = a.replace(_r, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = j(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", xr)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = mr, Sr && Sr(e);
};
var Cr = n.__r;
n.__r = function(e) {
	Cr && Cr(e), e.__c;
};
var wr = n.diffed;
n.diffed = function(e) {
	wr && wr(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/index.js
function Tr(e) {
	return tr(e, {
		useEffect: Be,
		useRef: Ve,
		useState: Re
	});
}
//#endregion
//#region src/components/labeled-row.tsx
var $ = ({ label: e, children: t }) => /* @__PURE__ */ N("div", {
	className: "flex-ha gap-3",
	children: [/* @__PURE__ */ N("div", {
		className: "",
		children: e
	}), t]
});
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mx-audio/index.js
function Er(e, t) {
	return e / 60 * t * 480;
}
function Dr(e, t, n, r, i) {
	let a = Er(n, i), o = Er(r, i);
	e.processScheduling(t, a, o, i);
}
function Or(e, t = 25, n = 100) {
	let r = { bpm: 120 }, i = n / 1e3, a = null;
	return {
		setBpm(e) {
			r.bpm = e;
		},
		start(n) {
			let o = e.currentTime, s = () => e.currentTime - o, c = 0;
			{
				let e = i;
				Dr(n, o, c, e, r.bpm), c = e;
			}
			a = setInterval(() => {
				let e = s() + i;
				Dr(n, o, c, e, r.bpm), c = e;
			}, t);
		},
		stop() {
			a &&= (clearInterval(a), null);
		}
	};
}
function kr(e, t, n, r) {
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
function Ar(e, t, n, r, i) {
	let a = kr(t, n, r, i), o = 60 / i / 4;
	for (let t of a) e.processStep?.(t.stepIndex, t.time, o);
	e.processScheduling?.(t, n, r, i);
}
function jr(e) {
	console.log("cst 0258");
	let t = Or(e, 25, 100), n = null;
	return {
		setBpm: t.setBpm,
		start(e) {
			e.start?.(), t.start({ processScheduling(t, n, r, i) {
				Ar(e, t, n, r, i);
			} }), n = e;
		},
		stop() {
			t.stop(), n &&= (n.stop?.(), null);
		}
	};
}
//#endregion
//#region src/sequencer.ts
function Mr(e) {
	return [
		"Am",
		"B",
		"C",
		"Dm",
		"Em",
		"F",
		"G"
	].includes(e) ? e : void 0;
}
function Nr(e) {
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
function Pr(e, t) {
	let n = e.endsWith("m"), r = Nr(e), i = (t % 12 - r + 12) % 12;
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
function Fr(e, t, n, r) {
	let i = Pr(t, n) ? [
		0,
		3,
		7
	] : [
		0,
		4,
		7
	], a = Math.floor(e / 3);
	return n + i[e % 3] + (r + a) * 12;
}
function Ir(e) {
	let t = {
		pattern: ye(8).map(() => 0),
		key: "Am",
		chordRootNote: 60,
		octaveShift: 0,
		noteDuty: .9,
		bpm: 120,
		isClockInputActive: !1,
		isInternalTickRunning: !1
	}, n = e.createNoteOutputPort(), r = jr(e.audioContext), i = { processStep(e, r, i) {
		let { pattern: a } = t, o = a[e % a.length], s = Mr(t.key);
		if (s && o !== void 0 && t.chordRootNote !== void 0) {
			let e = Fr(o, s, t.chordRootNote, t.octaveShift), a = r + i * t.noteDuty;
			n.noteOn(e, r), n.noteOff(e, a);
		}
	} };
	return {
		inputNoteOn(e, n) {
			t.chordRootNote = e, t.isClockInputActive || (r.setBpm(t.bpm), r.start({ processStep: i.processStep }), t.isInternalTickRunning = !0);
		},
		inputNoteOff(e, n) {
			t.chordRootNote = void 0, t.isInternalTickRunning &&= (r.stop(), !1);
		},
		clockStart() {
			t.isClockInputActive = !0, t.isInternalTickRunning &&= (r.stop(), !1);
		},
		clockStop() {
			t.isClockInputActive = !1, t.chordRootNote = void 0;
		},
		processStep: i.processStep,
		setBpm(e) {
			t.bpm = e;
		},
		setMetaAttributes(e) {
			e.songKey !== void 0 && (t.key = e.songKey);
		},
		setPattern(e) {
			t.pattern = e;
		},
		setOctaveShift(e) {
			t.octaveShift = e;
		},
		setNoteDuty(e) {
			t.noteDuty = e;
		}
	};
}
var Lr = we([
	"R",
	"RR",
	"RRR",
	"RF",
	"RFR",
	"RFRF",
	"RFRFR",
	"RTF",
	"RTFR",
	"RTFRT",
	"RTFRTF",
	"RTFRTFR"
]), Rr = we([
	"/16",
	"/8",
	"/4",
	"/2",
	"1"
]), zr = we(["up", "upDown"]), Br = we([
	"bottom",
	"bottom1",
	"top1",
	"top"
]), Vr = Te(ye(7).map((e) => [e - 3, `${e - 3}`]));
//#endregion
//#region src/unit.tsx
console.log("rtfr 0223");
var Hr = [
	"R",
	"T",
	"F",
	"R",
	"T",
	"F",
	"R"
], Ur = ({ pattern: e }) => /* @__PURE__ */ N("div", {
	className: "flex-h gap-2",
	children: e.map((e, t) => /* @__PURE__ */ N("div", {
		className: "rounded-full bg-gray-300",
		style: { paddingTop: Ce((6 - e) * 10) },
		children: /* @__PURE__ */ N("div", {
			className: ve("text-[8px] w-[18px] h-[18px] rounded-full flex-c text-white border", e % 3 == 0 && "bg-orange-400 border-orange-500", e % 3 != 0 && "bg-yellow-300 border-yellow-400"),
			children: Hr[e]
		})
	}, t))
});
function Wr(e) {
	let t = [], n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i === "R" ? (t.length === 0 || n++, t.push(n * 3)) : i === "T" ? t.push(n * 3 + 1) : i === "F" && t.push(n * 3 + 2);
	}
	return t;
}
function Gr(e, t, n, r) {
	let i = Wr(e), a = 0, o = 1;
	return ye(r).map((e) => {
		let s = i[a];
		if (a += o, a >= i.length) {
			if (t === "upDown") o = -o, a -= 2;
			else {
				let t = r - e;
				t <= i.length ? n === "bottom" ? a = 0 : n === "bottom1" ? a = 1 : n === "top1" ? a = i.length - t : n === "top" && (a = i.length - t + 1) : a = 0;
			}
		} else a === 0 && (o = 1);
		return s;
	});
}
var Kr = (e) => {
	let t = Ir(e), n = Tr({
		noteRange: "RTF",
		noteDuration: "/8",
		directionMode: "up",
		wrappingMode: "bottom",
		octaveShift: 0,
		noteDuty: 1
	});
	return n.subscribe(({ octaveShift: e, noteDuty: n }) => {
		e !== void 0 && t.setOctaveShift(e), n !== void 0 && t.setNoteDuty(n);
	}), e.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [400, 240],
			preferJustSize: !0
		},
		noteInput: {
			noteOn: t.inputNoteOn,
			noteOff: t.inputNoteOff
		},
		clockHandlers: {
			start: t.clockStart,
			stop: t.clockStop,
			processStep: t.processStep
		},
		persistence: {
			emitState() {
				return { ...n.state };
			},
			applyState(e) {
				n.assign(e);
			}
		},
		hostCallbacks: {
			setBpm: t.setBpm,
			setMetaAttributes: t.setMetaAttributes
		}
	}), { RenderUi() {
		let e = n.useSnapshot(), r = He(() => Gr(e.noteRange, e.directionMode, e.wrappingMode, 8), [
			e.noteRange,
			e.directionMode,
			e.wrappingMode
		]);
		return Be(() => {
			t.setPattern(r);
		}, [r, t]), /* @__PURE__ */ N("div", {
			className: "w-[400px] h-[240px] bg-[#eee] p-2",
			children: [
				/* @__PURE__ */ N("div", { children: "RTFR" }),
				/* @__PURE__ */ N("div", {
					className: "flex-h gap-4",
					children: [/* @__PURE__ */ N($, {
						label: "note range",
						children: /* @__PURE__ */ N(L, {
							options: Lr,
							value: e.noteRange,
							onChange: n.setNoteRange
						})
					}), /* @__PURE__ */ N($, {
						label: "note duration",
						children: /* @__PURE__ */ N(L, {
							options: Rr,
							value: e.noteDuration,
							onChange: n.setNoteDuration
						})
					})]
				}),
				/* @__PURE__ */ N("div", {
					className: "flex-h gap-4",
					children: [/* @__PURE__ */ N($, {
						label: "direction",
						children: /* @__PURE__ */ N(L, {
							options: zr,
							value: e.directionMode,
							onChange: n.setDirectionMode
						})
					}), /* @__PURE__ */ N($, {
						label: "wrapping",
						children: /* @__PURE__ */ N(L, {
							options: Br,
							value: e.wrappingMode,
							onChange: n.setWrappingMode,
							reverseOptionsOrder: !0
						})
					})]
				}),
				/* @__PURE__ */ N("div", {
					className: "flex-h gap-4",
					children: [/* @__PURE__ */ N($, {
						label: "octave",
						children: /* @__PURE__ */ N(L, {
							options: Vr,
							value: e.octaveShift,
							onChange: n.setOctaveShift,
							reverseOptionsOrder: !0
						})
					}), /* @__PURE__ */ N($, {
						label: "duty",
						children: /* @__PURE__ */ N(Qe, {
							value: e.noteDuty,
							onChange: n.setNoteDuty,
							min: .01,
							max: 1,
							step: .01
						})
					})]
				}),
				/* @__PURE__ */ N("div", { children: ["pattern: ", r] }),
				/* @__PURE__ */ N("div", {
					className: "flex-c",
					children: /* @__PURE__ */ N(Ur, { pattern: r })
				})
			]
		});
	} };
}, qr = he((e, t) => {
	let n = e.queryUnitInterface?.("wafer-v01");
	if (!n) throw Error("undefined unit interface");
	return pe(/* @__PURE__ */ N(Kr(n).RenderUi, {}), t), () => {
		pe(null, t);
	};
}, {
	cssTexts: [ge, e],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { qr as default };
