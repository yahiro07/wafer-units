//#region \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+sheet@1.4.0/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function t(e) {
	if (e.sheet) return e.sheet;
	/* istanbul ignore next */
	for (var t = 0; t < document.styleSheets.length; t++) if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function n(e) {
	var t = document.createElement("style");
	return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var r = /*#__PURE__*/ function() {
	function e(e) {
		var t = this;
		this._insertTag = function(e) {
			var n = t.tags.length === 0 ? t.insertionPoint ? t.insertionPoint.nextSibling : t.prepend ? t.container.firstChild : t.before : t.tags[t.tags.length - 1].nextSibling;
			t.container.insertBefore(e, n), t.tags.push(e);
		}, this.isSpeedy = e.speedy === void 0 || e.speedy, this.tags = [], this.ctr = 0, this.nonce = e.nonce, this.key = e.key, this.container = e.container, this.prepend = e.prepend, this.insertionPoint = e.insertionPoint, this.before = null;
	}
	var r = e.prototype;
	return r.hydrate = function(e) {
		e.forEach(this._insertTag);
	}, r.insert = function(e) {
		this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(n(this));
		var r = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var i = t(r);
			try {
				i.insertRule(e, i.cssRules.length);
			} catch {}
		} else r.appendChild(document.createTextNode(e));
		this.ctr++;
	}, r.flush = function() {
		this.tags.forEach(function(e) {
			return e.parentNode?.removeChild(e);
		}), this.tags = [], this.ctr = 0;
	}, e;
}(), i = "-ms-", a = "-moz-", o = "-webkit-", s = "comm", c = "rule", l = "decl", u = "@import", d = "@keyframes", f = "@layer", p = Math.abs, m = String.fromCharCode, h = Object.assign;
function g(e, t) {
	return x(e, 0) ^ 45 ? (((t << 2 ^ x(e, 0)) << 2 ^ x(e, 1)) << 2 ^ x(e, 2)) << 2 ^ x(e, 3) : 0;
}
function _(e) {
	return e.trim();
}
function v(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function y(e, t, n) {
	return e.replace(t, n);
}
function b(e, t) {
	return e.indexOf(t);
}
function x(e, t) {
	return e.charCodeAt(t) | 0;
}
function S(e, t, n) {
	return e.slice(t, n);
}
function C(e) {
	return e.length;
}
function w(e) {
	return e.length;
}
function T(e, t) {
	return t.push(e), e;
}
function E(e, t) {
	return e.map(t).join("");
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Tokenizer.js
var D = 1, O = 1, k = 0, A = 0, j = 0, ee = "";
function te(e, t, n, r, i, a, o) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: D,
		column: O,
		length: o,
		return: ""
	};
}
function ne(e, t) {
	return h(te("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function re() {
	return j;
}
function ie() {
	return j = A > 0 ? x(ee, --A) : 0, O--, j === 10 && (O = 1, D--), j;
}
function M() {
	return j = A < k ? x(ee, A++) : 0, O++, j === 10 && (O = 1, D++), j;
}
function N() {
	return x(ee, A);
}
function ae() {
	return A;
}
function oe(e, t) {
	return S(ee, e, t);
}
function se(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function ce(e) {
	return D = O = 1, k = C(ee = e), A = 0, [];
}
function le(e) {
	return ee = "", e;
}
function ue(e) {
	return _(oe(A - 1, pe(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function de(e) {
	for (; (j = N()) && j < 33;) M();
	return se(e) > 2 || se(j) > 3 ? "" : " ";
}
function fe(e, t) {
	for (; --t && M() && !(j < 48 || j > 102 || j > 57 && j < 65 || j > 70 && j < 97););
	return oe(e, ae() + (t < 6 && N() == 32 && M() == 32));
}
function pe(e) {
	for (; M();) switch (j) {
		case e: return A;
		case 34:
		case 39:
			e !== 34 && e !== 39 && pe(j);
			break;
		case 40:
			e === 41 && pe(e);
			break;
		case 92:
			M();
			break;
	}
	return A;
}
function me(e, t) {
	for (; M() && e + j !== 57 && (e + j !== 84 || N() !== 47););
	return "/*" + oe(t, A - 1) + "*" + m(e === 47 ? e : M());
}
function he(e) {
	for (; !se(N());) M();
	return oe(e, A);
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Parser.js
function ge(e) {
	return le(_e("", null, null, null, [""], e = ce(e), 0, [0], e));
}
function _e(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, h = 0, g = 1, _ = 1, v = 1, S = 0, w = "", E = i, D = a, O = r, k = w; _;) switch (h = S, S = M()) {
		case 40: if (h != 108 && x(k, d - 1) == 58) {
			b(k += y(ue(S), "&", "&\f"), "&\f") != -1 && (v = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			k += ue(S);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			k += de(h);
			break;
		case 92:
			k += fe(ae() - 1, 7);
			continue;
		case 47:
			switch (N()) {
				case 42:
				case 47:
					T(ye(me(M(), ae()), t, n), c);
					break;
				default: k += "/";
			}
			break;
		case 123 * g: s[l++] = C(k) * v;
		case 125 * g:
		case 59:
		case 0:
			switch (S) {
				case 0:
				case 125: _ = 0;
				case 59 + u:
					v == -1 && (k = y(k, /\f/g, "")), p > 0 && C(k) - d && T(p > 32 ? be(k + ";", r, n, d - 1) : be(y(k, " ", "") + ";", r, n, d - 2), c);
					break;
				case 59: k += ";";
				default: if (T(O = ve(k, t, n, l, u, i, s, w, E = [], D = [], d), a), S === 123) if (u === 0) _e(k, t, O, O, E, a, d, s, D);
				else switch (f === 99 && x(k, 3) === 110 ? 100 : f) {
					case 100:
					case 108:
					case 109:
					case 115:
						_e(e, O, O, r && T(ve(e, O, O, 0, 0, i, s, w, i, E = [], d), D), i, D, d, s, r ? E : D);
						break;
					default: _e(k, O, O, O, [""], D, 0, s, D);
				}
			}
			l = u = p = 0, g = v = 1, w = k = "", d = o;
			break;
		case 58: d = 1 + C(k), p = h;
		default:
			if (g < 1) {
				if (S == 123) --g;
				else if (S == 125 && g++ == 0 && ie() == 125) continue;
			}
			switch (k += m(S), S * g) {
				case 38:
					v = u > 0 ? 1 : (k += "\f", -1);
					break;
				case 44:
					s[l++] = (C(k) - 1) * v, v = 1;
					break;
				case 64:
					N() === 45 && (k += ue(M())), f = N(), u = d = C(w = k += he(ae())), S++;
					break;
				case 45: h === 45 && C(k) == 2 && (g = 0);
			}
	}
	return a;
}
function ve(e, t, n, r, i, a, o, s, l, u, d) {
	for (var f = i - 1, m = i === 0 ? a : [""], h = w(m), g = 0, v = 0, b = 0; g < r; ++g) for (var x = 0, C = S(e, f + 1, f = p(v = o[g])), T = e; x < h; ++x) (T = _(v > 0 ? m[x] + " " + C : y(C, /&\f/g, m[x]))) && (l[b++] = T);
	return te(e, t, n, i === 0 ? c : s, l, u, d);
}
function ye(e, t, n) {
	return te(e, t, n, s, m(re()), S(e, 2, -2), 0);
}
function be(e, t, n, r) {
	return te(e, t, n, l, S(e, 0, r), S(e, r + 1, -1), r);
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Serializer.js
function xe(e, t) {
	for (var n = "", r = w(e), i = 0; i < r; i++) n += t(e[i], i, e, t) || "";
	return n;
}
function Se(e, t, n, r) {
	switch (e.type) {
		case f: if (e.children.length) break;
		case u:
		case l: return e.return = e.return || e.value;
		case s: return "";
		case d: return e.return = e.value + "{" + xe(e.children, r) + "}";
		case c: e.value = e.props.join(",");
	}
	return C(n = xe(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Middleware.js
function Ce(e) {
	var t = w(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function we(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+memoize@0.9.0/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function Te(e) {
	var t = Object.create(null);
	return function(n) {
		return t[n] === void 0 && (t[n] = e(n)), t[n];
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+cache@11.14.0/node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js
var Ee = function(e, t, n) {
	for (var r = 0, i = 0; r = i, i = N(), r === 38 && i === 12 && (t[n] = 1), !se(i);) M();
	return oe(e, A);
}, De = function(e, t) {
	var n = -1, r = 44;
	do
		switch (se(r)) {
			case 0:
				r === 38 && N() === 12 && (t[n] = 1), e[n] += Ee(A - 1, t, n);
				break;
			case 2:
				e[n] += ue(r);
				break;
			case 4: if (r === 44) {
				e[++n] = N() === 58 ? "&\f" : "", t[n] = e[n].length;
				break;
			}
			default: e[n] += m(r);
		}
	while (r = M());
	return e;
}, Oe = function(e, t) {
	return le(De(ce(e), t));
}, ke = /* #__PURE__ */ new WeakMap(), Ae = function(e) {
	if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
		for (var t = e.value, n = e.parent, r = e.column === n.column && e.line === n.line; n.type !== "rule";) if (n = n.parent, !n) return;
		if (!(e.props.length === 1 && t.charCodeAt(0) !== 58 && !ke.get(n)) && !r) {
			ke.set(e, !0);
			for (var i = [], a = Oe(t, i), o = n.props, s = 0, c = 0; s < a.length; s++) for (var l = 0; l < o.length; l++, c++) e.props[c] = i[s] ? a[s].replace(/&\f/g, o[l]) : o[l] + " " + a[s];
		}
	}
}, je = function(e) {
	if (e.type === "decl") {
		var t = e.value;
		t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 && (e.return = "", e.value = "");
	}
};
function Me(e, t) {
	switch (g(e, t)) {
		case 5103: return o + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return o + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return o + e + a + e + i + e + e;
		case 6828:
		case 4268: return o + e + i + e + e;
		case 6165: return o + e + i + "flex-" + e + e;
		case 5187: return o + e + y(e, /(\w+).+(:[^]+)/, o + "box-$1$2" + i + "flex-$1$2") + e;
		case 5443: return o + e + i + "flex-item-" + y(e, /flex-|-self/, "") + e;
		case 4675: return o + e + i + "flex-line-pack" + y(e, /align-content|flex-|-self/, "") + e;
		case 5548: return o + e + i + y(e, "shrink", "negative") + e;
		case 5292: return o + e + i + y(e, "basis", "preferred-size") + e;
		case 6060: return o + "box-" + y(e, "-grow", "") + o + e + i + y(e, "grow", "positive") + e;
		case 4554: return o + y(e, /([^-])(transform)/g, "$1" + o + "$2") + e;
		case 6187: return y(y(y(e, /(zoom-|grab)/, o + "$1"), /(image-set)/, o + "$1"), e, "") + e;
		case 5495:
		case 3959: return y(e, /(image-set\([^]*)/, o + "$1$`$1");
		case 4968: return y(y(e, /(.+:)(flex-)?(.*)/, o + "box-pack:$3" + i + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + o + e + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return y(e, /(.+)-inline(.+)/, o + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (C(e) - 1 - t > 6) switch (x(e, t + 1)) {
				case 109: if (x(e, t + 4) !== 45) break;
				case 102: return y(e, /(.+:)(.+)-([^]+)/, "$1" + o + "$2-$3$1" + a + (x(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~b(e, "stretch") ? Me(y(e, "stretch", "fill-available"), t) + e : e;
			}
			break;
		case 4949: if (x(e, t + 1) !== 115) break;
		case 6444:
			switch (x(e, C(e) - 3 - (~b(e, "!important") && 10))) {
				case 107: return y(e, ":", ":" + o) + e;
				case 101: return y(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + o + (x(e, 14) === 45 ? "inline-" : "") + "box$3$1" + o + "$2$3$1" + i + "$2box$3") + e;
			}
			break;
		case 5936:
			switch (x(e, t + 11)) {
				case 114: return o + e + i + y(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
				case 108: return o + e + i + y(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
				case 45: return o + e + i + y(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
			}
			return o + e + i + e + e;
	}
	return e;
}
var Ne = [function(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case l:
			e.return = Me(e.value, e.length);
			break;
		case d: return xe([ne(e, { value: y(e.value, "@", "@" + o) })], r);
		case c: if (e.length) return E(e.props, function(t) {
			switch (v(t, /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write": return xe([ne(e, { props: [y(t, /:(read-\w+)/, ":" + a + "$1")] })], r);
				case "::placeholder": return xe([
					ne(e, { props: [y(t, /:(plac\w+)/, ":" + o + "input-$1")] }),
					ne(e, { props: [y(t, /:(plac\w+)/, ":" + a + "$1")] }),
					ne(e, { props: [y(t, /:(plac\w+)/, i + "input-$1")] })
				], r);
			}
			return "";
		});
	}
}], Pe = function(e) {
	var t = e.key;
	if (t === "css") {
		var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(n, function(e) {
			e.getAttribute("data-emotion").indexOf(" ") !== -1 && (document.head.appendChild(e), e.setAttribute("data-s", ""));
		});
	}
	var i = e.stylisPlugins || Ne, a = {}, o, s = [];
	o = e.container || document.head, Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + t + " \"]"), function(e) {
		for (var t = e.getAttribute("data-emotion").split(" "), n = 1; n < t.length; n++) a[t[n]] = !0;
		s.push(e);
	});
	var c, l = [Ae, je], u, d = [Se, we(function(e) {
		u.insert(e);
	})], f = Ce(l.concat(i, d)), p = function(e) {
		return xe(ge(e), f);
	};
	c = function(e, t, n, r) {
		u = n, p(e ? e + "{" + t.styles + "}" : t.styles), r && (m.inserted[t.name] = !0);
	};
	var m = {
		key: t,
		sheet: new r({
			key: t,
			container: o,
			nonce: e.nonce,
			speedy: e.speedy,
			prepend: e.prepend,
			insertionPoint: e.insertionPoint
		}),
		nonce: e.nonce,
		inserted: a,
		registered: {},
		insert: c
	};
	return m.sheet.hydrate(s), m;
}, Fe, P, Ie, F, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je = {}, Ye = [], Xe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ze = Array.isArray;
function I(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Qe(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function L(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? Fe.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return $e(e, o, r, i, null);
}
function $e(e, t, n, r, i) {
	var a = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: i ?? ++Ie,
		__i: -1,
		__u: 0
	};
	return i == null && P.vnode != null && P.vnode(a), a;
}
function et() {
	return { current: null };
}
function R(e) {
	return e.children;
}
function z(e, t) {
	this.props = e, this.context = t;
}
function tt(e, t) {
	if (t == null) return e.__ ? tt(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? tt(e) : null;
}
function nt(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = I({}, t);
		a.__v = t.__v + 1, P.vnode && P.vnode(a), pt(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? tt(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, ht(r, a, i), t.__e = t.__ = null, a.__e != n && rt(a);
	}
}
function rt(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), rt(e);
}
function it(e) {
	(!e.__d && (e.__d = !0) && F.push(e) && !at.__r++ || Le != P.debounceRendering) && ((Le = P.debounceRendering) || Re)(at);
}
function at() {
	try {
		for (var e, t = 1; F.length;) F.length > t && F.sort(ze), e = F.shift(), t = F.length, nt(e);
	} finally {
		F.length = at.__r = 0;
	}
}
function ot(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || Ye, v = t.length;
	for (c = st(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || Je, p.__i = d, g = pt(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && vt(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = ct(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function st(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = $e(null, o, null, null, null) : Ze(o) ? o = e.__k[a] = $e(R, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = $e(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = lt(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = tt(s)), yt(s, s));
	return r;
}
function ct(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = ct(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = tt(e)), t = n.insertBefore(e.__e, t || null));
	do
		t &&= t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function B(e, t) {
	return t ||= [], e == null || typeof e == "boolean" || (Ze(e) ? e.some(function(e) {
		B(e, t);
	}) : t.push(e)), t;
}
function lt(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function ut(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || Xe.test(t) ? n : n + "px";
}
function dt(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") if (typeof n == "string") e.style.cssText = n;
	else {
		if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || ut(e.style, t, "");
		if (n) for (t in n) r && n[t] == r[t] || ut(e.style, t, n[t]);
	}
	else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(Ue, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l ||= {}, e.l[t + a] = n, n ? r ? n[He] = r[He] : (n[He] = We, e.addEventListener(t, a ? Ke : Ge, a)) : e.removeEventListener(t, a ? Ke : Ge, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function ft(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[Ve] == null) t[Ve] = We++;
			else if (t[Ve] < n[He]) return;
			return n(P.event ? P.event(t) : t);
		}
	};
}
function pt(e, t, n, r, i, a, o, s, c, l) {
	var u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = P.__b) && u(t);
	n: if (typeof E == "function") {
		d = o.length;
		try {
			if (v = t.props, y = E.prototype && E.prototype.render, b = (u = E.contextType) && r[u.__c], x = u ? b ? b.props.value : u.__ : r, n.__c ? _ = (f = t.__c = n.__c).__ = f.__E : (y ? t.__c = f = new E(v, x) : (t.__c = f = new z(v, x), f.constructor = E, f.render = bt), b && b.sub(f), f.state || (f.state = {}), f.__n = r, p = f.__d = !0, f.__h = [], f._sb = []), y && f.__s == null && (f.__s = f.state), y && E.getDerivedStateFromProps != null && (f.__s == f.state && (f.__s = I({}, f.__s)), I(f.__s, E.getDerivedStateFromProps(v, f.__s))), m = f.props, h = f.state, f.__v = t, p) y && E.getDerivedStateFromProps == null && f.componentWillMount != null && f.componentWillMount(), y && f.componentDidMount != null && f.__h.push(f.componentDidMount);
			else {
				if (y && E.getDerivedStateFromProps == null && v !== m && f.componentWillReceiveProps != null && f.componentWillReceiveProps(v, x), t.__v == n.__v || !f.__e && f.shouldComponentUpdate != null && !1 === f.shouldComponentUpdate(v, f.__s, x)) {
					t.__v != n.__v && (f.props = v, f.state = f.__s, f.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), Ye.push.apply(f.__h, f._sb), f._sb = [], f.__h.length && o.push(f), s = tt(n);
					break n;
				}
				f.componentWillUpdate != null && f.componentWillUpdate(v, f.__s, x), y && f.componentDidUpdate != null && f.__h.push(function() {
					f.componentDidUpdate(m, h, g);
				});
			}
			if (f.context = x, f.props = v, f.__P = e, f.__e = !1, S = P.__r, C = 0, y) f.state = f.__s, f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), Ye.push.apply(f.__h, f._sb), f._sb = [];
			else do
				f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), f.state = f.__s;
			while (f.__d && ++C < 25);
			f.state = f.__s, f.getChildContext != null && (r = I(I({}, r), f.getChildContext())), y && !p && f.getSnapshotBeforeUpdate != null && (g = f.getSnapshotBeforeUpdate(m, h)), w = u != null && u.type === R && u.key == null ? gt(u.props.children) : u, s = ot(e, Ze(w) ? w : [w], t, n, r, i, a, o, s, c, l), f.base = t.__e, t.__u &= -161, f.__h.length && o.push(f), _ && (f.__E = f.__ = null);
		} catch (e) {
			if (o.length = d, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (T = a.length; T--;) Qe(a[T]);
			} else t.__e = n.__e;
			t.__k ??= n.__k || [], e.then || mt(t), P.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = _t(n.__e, t, n, r, i, a, o, c, l);
	return (u = P.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function mt(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(mt));
}
function ht(e, t, n) {
	for (var r = 0; r < n.length; r++) vt(n[r], n[++r], n[++r]);
	P.__c && P.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			P.__e(e, t.__v);
		}
	});
}
function gt(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : Ze(e) ? e.map(gt) : e.constructor === void 0 ? I({}, e) : null;
}
function _t(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h, g = n.props || Je, _ = t.props, v = t.type;
	if (v == "svg" ? i = "http://www.w3.org/2000/svg" : v == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i ||= "http://www.w3.org/1999/xhtml", a != null) {
		for (l = 0; l < a.length; l++) if ((p = a[l]) && "setAttribute" in p == !!v && (v ? p.localName == v : p.nodeType == 3)) {
			e = p, a[l] = null;
			break;
		}
	}
	if (e == null) {
		if (v == null) return document.createTextNode(_);
		e = document.createElementNS(i, v, _.is && _), s &&= (P.__m && P.__m(t, a), !1), a = null;
	}
	if (v == null) g === _ || s && e.data == _ || (e.data = _);
	else {
		if (a = v == "textarea" && _.defaultValue != null ? null : a && Fe.call(e.childNodes), !s && a != null) for (g = {}, l = 0; l < e.attributes.length; l++) g[(p = e.attributes[l]).name] = p.value;
		for (l in g) p = g[l], l == "dangerouslySetInnerHTML" ? d = p : l == "children" || l in _ || l == "value" && "defaultValue" in _ || l == "checked" && "defaultChecked" in _ || dt(e, l, null, p, i);
		for (l in _) p = _[l], l == "children" ? f = p : l == "dangerouslySetInnerHTML" ? u = p : l == "value" ? m = p : l == "checked" ? h = p : s && typeof p != "function" || g[l] === p || dt(e, l, p, g[l], i);
		if (u) s || d && (u.__html == d.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
		else if (d && (e.innerHTML = ""), ot(t.type == "template" ? e.content : e, Ze(f) ? f : [f], t, n, r, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && tt(n, 0), s, c), a != null) for (l = a.length; l--;) Qe(a[l]);
		s && v != "textarea" || (l = "value", v == "progress" && m == null ? e.removeAttribute("value") : m != null && (m !== e[l] || v == "progress" && !m || v == "option" && m != g[l]) && dt(e, l, m, g[l], i), l = "checked", h != null && h != e[l] && dt(e, l, h, g[l], i));
	}
	return e;
}
function vt(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		P.__e(e, n);
	}
}
function yt(e, t, n) {
	var r, i;
	if (P.unmount && P.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || vt(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			P.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && yt(r[i], t, n || typeof e.type != "function");
	n || Qe(e.__e), e.__c = e.__ = e.__e = void 0;
}
function bt(e, t, n) {
	return this.constructor(e, n);
}
function xt(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), P.__ && P.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], pt(t, e = (!r && n || t).__k = L(R, null, [e]), i || Je, Je, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? Fe.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), ht(a, e, o), e.props.children = null;
}
function St(e, t) {
	xt(e, t, St);
}
function Ct(e, t, n) {
	var r, i, a, o, s = I({}, e.props);
	for (a in e.type && e.type.defaultProps && (o = e.type.defaultProps), t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : s[a] = t[a] === void 0 && o != null ? o[a] : t[a];
	return arguments.length > 2 && (s.children = arguments.length > 3 ? Fe.call(arguments, 2) : n), $e(e.type, s, r || e.key, i || e.ref, null);
}
function wt(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, it(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + qe++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
Fe = Ye.slice, P = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, Ie = 0, z.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = I({}, this.state);
	typeof e == "function" && (e = e(I({}, n), this.props)), e && I(n, e), e != null && this.__v && (t && this._sb.push(t), it(this));
}, z.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), it(this));
}, z.prototype.render = R, F = [], Re = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ze = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, at.__r = 0, Be = Math.random().toString(8), Ve = "__d" + Be, He = "__a" + Be, Ue = /(PointerCapture)$|Capture$/i, We = 0, Ge = ft(!1), Ke = ft(!0), qe = 0;
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/hooks/dist/hooks.module.js
var V, H, Tt, Et, Dt = 0, Ot = [], U = P, kt = U.__b, At = U.__r, jt = U.diffed, Mt = U.__c, Nt = U.unmount, Pt = U.__;
function Ft(e, t) {
	U.__h && U.__h(H, e, Dt || t), Dt = 0;
	var n = H.__H || (H.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function It(e) {
	return Dt = 1, Lt($t, e);
}
function Lt(e, t, n) {
	var r = Ft(V++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : $t(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = H, !H.__f)) {
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
		H.__f = !0;
		var a = H.shouldComponentUpdate, o = H.componentWillUpdate;
		H.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, H.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function Rt(e, t) {
	var n = Ft(V++, 3);
	!U.__s && Qt(n.__H, t) && (n.__ = e, n.u = t, H.__H.__h.push(n));
}
function zt(e, t) {
	var n = Ft(V++, 4);
	!U.__s && Qt(n.__H, t) && (n.__ = e, n.u = t, H.__h.push(n));
}
function Bt(e) {
	return Dt = 5, Ht(function() {
		return { current: e };
	}, []);
}
function Vt(e, t, n) {
	Dt = 6, zt(function() {
		if (typeof e == "function") {
			var n = e(t());
			return function() {
				e(null), n && typeof n == "function" && n();
			};
		}
		if (e) return e.current = t(), function() {
			return e.current = null;
		};
	}, n == null ? n : n.concat(e));
}
function Ht(e, t) {
	var n = Ft(V++, 7);
	return Qt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Ut(e, t) {
	return Dt = 8, Ht(function() {
		return e;
	}, t);
}
function Wt(e) {
	var t = H.context[e.__c], n = Ft(V++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(H)), t.props.value) : e.__;
}
function Gt(e, t) {
	U.useDebugValue && U.useDebugValue(t ? t(e) : e);
}
function Kt() {
	var e = Ft(V++, 11);
	if (!e.__) {
		for (var t = H.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function qt() {
	for (var e; e = Ot.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Xt), t.__h.some(Zt), t.__h = [];
		} catch (n) {
			t.__h = [], U.__e(n, e.__v);
		}
	}
}
U.__b = function(e) {
	H = null, kt && kt(e);
}, U.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Pt && Pt(e, t);
}, U.__r = function(e) {
	At && At(e), V = 0;
	var t = (H = e.__c).__H;
	t && (Tt === H ? (t.__h = [], H.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(Xt), t.__h.some(Zt), t.__h = [], V = 0)), Tt = H;
}, U.diffed = function(e) {
	jt && jt(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Ot.push(t) !== 1 && Et === U.requestAnimationFrame || ((Et = U.requestAnimationFrame) || Yt)(qt)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), Tt = H = null;
}, U.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Xt), e.__h = e.__h.filter(function(e) {
				return !e.__ || Zt(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h &&= [];
			}), t = [], U.__e(n, e.__v);
		}
	}), Mt && Mt(e, t);
}, U.unmount = function(e) {
	Nt && Nt(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			Xt(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && U.__e(t, n.__v));
};
var Jt = typeof requestAnimationFrame == "function";
function Yt(e) {
	var t, n = function() {
		clearTimeout(r), Jt && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Jt && (t = requestAnimationFrame(n));
}
function Xt(e) {
	var t = H, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), H = t;
}
function Zt(e) {
	var t = H;
	e.__c = e.__(), H = t;
}
function Qt(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function $t(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.mjs
function en(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function tn(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function nn(e, t) {
	var n = t(), r = It({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return zt(function() {
		i.__ = n, i.u = t, rn(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), Rt(function() {
		return rn(i) && a({ t: i }), e(function() {
			rn(i) && a({ t: i });
		});
	}, [e]), n;
}
function rn(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function an(e) {
	e();
}
function on(e) {
	return e;
}
function sn() {
	return [!1, an];
}
var cn = zt;
function ln(e, t) {
	this.props = e, this.context = t;
}
function un(e, t) {
	function n(e) {
		var n = this.props.ref;
		return n != e.ref && n && (typeof n == "function" ? n(null) : n.current = null), t ? !t(this.props, e) || n != e.ref : tn(this.props, e);
	}
	function r(t) {
		return this.shouldComponentUpdate = n, L(e, t);
	}
	return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.__f = r.prototype.isReactComponent = !0, r.type = e, r;
}
(ln.prototype = new z()).isPureReactComponent = !0, ln.prototype.shouldComponentUpdate = function(e, t) {
	return tn(this.props, e) || tn(this.state, t);
};
var dn = P.__b;
P.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), dn && dn(e);
};
var fn = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function pn(e) {
	function t(t) {
		var n = en({}, t);
		return delete n.ref, e(n, t.ref || null);
	}
	return t.$$typeof = fn, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var mn = function(e, t) {
	return e == null ? null : B(B(e).map(t));
}, hn = {
	map: mn,
	forEach: mn,
	count: function(e) {
		return e ? B(e).length : 0;
	},
	only: function(e) {
		var t = B(e);
		if (t.length !== 1) throw "Children.only";
		return t[0];
	},
	toArray: B
}, gn = P.__e;
P.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	gn(e, t, n, r);
};
var _n = P.unmount;
function vn(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = en({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return vn(e, t, n);
	})), e;
}
function yn(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return yn(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function bn() {
	this.__u = 0, this.o = null, this.__b = null;
}
function xn(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function Sn(e) {
	var t, n, r, i = null;
	function a(a) {
		if (t || (t = e()).then(function(e) {
			e && (i = e.default || e), r = !0;
		}, function(e) {
			n = e, r = !0;
		}), n) throw n;
		if (!r) throw t;
		return i ? L(i, a) : null;
	}
	return a.displayName = "Lazy", a.__f = !0, a;
}
function Cn() {
	this.i = null, this.l = null;
}
P.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), _n && _n(e);
}, (bn.prototype = new z()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = xn(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = yn(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, bn.prototype.componentWillUnmount = function() {
	this.o = [];
}, bn.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = vn(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && L(R, null, e.fallback);
	return i && (i.__u &= -33), [L(R, null, t.__a ? null : e.children), i];
};
var wn = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
function Tn(e) {
	return this.getChildContext = function() {
		return e.context;
	}, e.children;
}
function En(e) {
	var t = this, n = e.h;
	if (t.componentWillUnmount = function() {
		xt(null, t.v), t.v = null, t.h = null;
	}, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
		for (var r = t.__v; r !== null && !r.__m && r.__ !== null;) r = r.__;
		t.h = n, t.v = {
			nodeType: 1,
			parentNode: n,
			childNodes: [],
			__k: { __m: r.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: n.namespaceURI,
			insertBefore: function(e, n) {
				this.childNodes.push(e), t.h.insertBefore(e, n);
			},
			removeChild: function(e) {
				this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.h.removeChild(e);
			}
		};
	}
	xt(L(Tn, { context: t.context }, e.__v), t.v);
}
function Dn(e, t) {
	var n = L(En, {
		__v: e,
		h: t
	});
	return n.containerInfo = t, n;
}
(Cn.prototype = new z()).__a = function(e) {
	var t = this, n = xn(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), wn(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, Cn.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = B(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, Cn.prototype.componentDidUpdate = Cn.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		wn(e, n, t);
	});
};
var On = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, kn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, An = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, jn = /[A-Z0-9]/g, Mn = typeof document < "u", Nn = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Pn(e, t, n) {
	return t.__k ?? (t.textContent = ""), xt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Fn(e, t, n) {
	return St(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
z.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(z.prototype, e, {
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
var In = P.event;
P.event = function(e) {
	return In && (e = In(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Ln, Rn = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, zn = P.vnode;
P.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || Mn && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || Nn(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : An.test(a) && (a = s) : s = a = "oninput" : i && kn.test(a) ? a = a.replace(jn, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Rn)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = On, zn && zn(e);
};
var Bn = P.__r;
P.__r = function(e) {
	Bn && Bn(e), Ln = e.__c;
};
var Vn = P.diffed;
P.diffed = function(e) {
	Vn && Vn(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), Ln = null;
};
var Hn = { ReactCurrentDispatcher: { current: {
	readContext: function(e) {
		return Ln.__n[e.__c].props.value;
	},
	useCallback: Ut,
	useContext: Wt,
	useDebugValue: Gt,
	useDeferredValue: on,
	useEffect: Rt,
	useId: Kt,
	useImperativeHandle: Vt,
	useInsertionEffect: cn,
	useLayoutEffect: zt,
	useMemo: Ht,
	useReducer: Lt,
	useRef: Bt,
	useState: It,
	useSyncExternalStore: nn,
	useTransition: sn
} } };
function Un(e) {
	return L.bind(null, e);
}
function Wn(e) {
	return !!e && e.$$typeof === On;
}
function Gn(e) {
	return Wn(e) && e.type === R;
}
function Kn(e) {
	return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function qn(e) {
	return Wn(e) ? Ct.apply(null, arguments) : e;
}
function Jn(e) {
	return !!e.__k && (xt(null, e), !0);
}
function Yn(e) {
	return e && (e.base || e.nodeType === 1 && e) || null;
}
var Xn = {
	useState: It,
	useId: Kt,
	useReducer: Lt,
	useEffect: Rt,
	useLayoutEffect: zt,
	useInsertionEffect: cn,
	useTransition: sn,
	useDeferredValue: on,
	useSyncExternalStore: nn,
	startTransition: an,
	useRef: Bt,
	useImperativeHandle: Vt,
	useMemo: Ht,
	useCallback: Ut,
	useContext: Wt,
	useDebugValue: Gt,
	version: "18.3.1",
	Children: hn,
	render: Pn,
	hydrate: Fn,
	unmountComponentAtNode: Jn,
	createPortal: Dn,
	createElement: L,
	createContext: wt,
	createFactory: Un,
	cloneElement: qn,
	createRef: et,
	Fragment: R,
	isValidElement: Wn,
	isElement: Wn,
	isFragment: Gn,
	isMemo: Kn,
	findDOMNode: Yn,
	Component: z,
	PureComponent: ln,
	memo: un,
	forwardRef: pn,
	flushSync: function(e, t) {
		var n, r = P.debounceRendering;
		P.debounceRendering = function(e) {
			n = e;
		};
		try {
			var i = e(t);
			return n && n(), i;
		} finally {
			P.debounceRendering = r;
		}
	},
	unstable_batchedUpdates: function(e, t) {
		return e(t);
	},
	StrictMode: R,
	Suspense: bn,
	SuspenseList: Cn,
	lazy: Sn,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Hn
}, Zn = /* @__PURE__ */ e(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), Qn = /* @__PURE__ */ e(((e, t) => {
	t.exports = Zn();
})), $n = /* @__PURE__ */ e(((e, t) => {
	var n = Qn(), r = {
		childContextTypes: !0,
		contextType: !0,
		contextTypes: !0,
		defaultProps: !0,
		displayName: !0,
		getDefaultProps: !0,
		getDerivedStateFromError: !0,
		getDerivedStateFromProps: !0,
		mixins: !0,
		propTypes: !0,
		type: !0
	}, i = {
		name: !0,
		length: !0,
		prototype: !0,
		caller: !0,
		callee: !0,
		arguments: !0,
		arity: !0
	}, a = {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	}, o = {
		$$typeof: !0,
		compare: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0,
		type: !0
	}, s = {};
	s[n.ForwardRef] = a, s[n.Memo] = o;
	function c(e) {
		return n.isMemo(e) ? o : s[e.$$typeof] || r;
	}
	var l = Object.defineProperty, u = Object.getOwnPropertyNames, d = Object.getOwnPropertySymbols, f = Object.getOwnPropertyDescriptor, p = Object.getPrototypeOf, m = Object.prototype;
	function h(e, t, n) {
		if (typeof t != "string") {
			if (m) {
				var r = p(t);
				r && r !== m && h(e, r, n);
			}
			var a = u(t);
			d && (a = a.concat(d(t)));
			for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) {
				var _ = a[g];
				if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) {
					var v = f(t, _);
					try {
						l(e, _, v);
					} catch {}
				}
			}
		}
		return e;
	}
	t.exports = h;
}));
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+utils@1.4.2/node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function er(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var tr = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, nr = function(e, t, n) {
	tr(e, t, n);
	var r = e.key + "-" + t.name;
	if (e.inserted[t.name] === void 0) {
		var i = t;
		do
			e.insert(t === i ? "." + r : "", i, e.sheet, !0), i = i.next;
		while (i !== void 0);
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+hash@0.9.2/node_modules/@emotion/hash/dist/emotion-hash.esm.js
function rr(e) {
	for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4) n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= n >>> 24, t = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	switch (i) {
		case 3: t ^= (e.charCodeAt(r + 2) & 255) << 16;
		case 2: t ^= (e.charCodeAt(r + 1) & 255) << 8;
		case 1: t ^= e.charCodeAt(r) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
	}
	return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+unitless@0.10.0/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var ir = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
}, ar = /[A-Z]|^ms/g, or = /_EMO_([^_]+?)_([^]*?)_EMO_/g, sr = function(e) {
	return e.charCodeAt(1) === 45;
}, cr = function(e) {
	return e != null && typeof e != "boolean";
}, lr = /* #__PURE__ */ Te(function(e) {
	return sr(e) ? e : e.replace(ar, "-$&").toLowerCase();
}), ur = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(or, function(e, t, n) {
			return W = {
				name: t,
				styles: n,
				next: W
			}, t;
		});
	}
	return ir[e] !== 1 && !sr(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function dr(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return W = {
				name: i.name,
				styles: i.styles,
				next: W
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) W = {
					name: o.name,
					styles: o.styles,
					next: W
				}, o = o.next;
				return a.styles + ";";
			}
			return fr(e, t, n);
		case "function": if (e !== void 0) {
			var s = W, c = n(e);
			return W = s, dr(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function fr(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += dr(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : cr(s) && (r += lr(a) + ":" + ur(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) cr(o[c]) && (r += lr(a) + ":" + ur(a, o[c]) + ";");
		else {
			var l = dr(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += lr(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var pr = /label:\s*([^\s;{]+)\s*(;|$)/g, W;
function mr(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	W = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += dr(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += dr(n, t, e[o]), r && (i += a[o]);
	pr.lastIndex = 0;
	for (var s = "", c; (c = pr.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: rr(i) + s,
		styles: i,
		next: W
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.2.0_react@19.2.8/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var hr = cn || function(e) {
	return e();
}, gr = /* #__PURE__ */ wt(typeof HTMLElement < "u" ? /* #__PURE__ */ Pe({ key: "css" }) : null), _r = gr.Provider, vr = function(e) {
	return /*#__PURE__*/ pn(function(t, n) {
		return e(t, Wt(gr), n);
	});
}, yr = /* #__PURE__ */ wt({}), br = {}.hasOwnProperty, xr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", Sr = function(e, t) {
	var n = {};
	for (var r in t) br.call(t, r) && (n[r] = t[r]);
	return n[xr] = e, n;
}, Cr = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return tr(t, n, r), hr(function() {
		return nr(t, n, r);
	}), null;
}, wr = /* @__PURE__ */ vr(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[xr], a = [r], o = "";
	typeof e.className == "string" ? o = er(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = mr(a, void 0, Wt(yr));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) br.call(e, l) && l !== "css" && l !== xr && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ L(R, null, /*#__PURE__*/ L(Cr, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ L(i, c));
});
$n();
var Tr = function(e, t) {
	var n = arguments;
	if (t == null || !br.call(t, "css")) return L.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = wr, i[1] = Sr(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return L.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(Tr ||= {});
function Er() {
	return mr([...arguments]);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/utility-classes.css?inline
var Dr = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}";
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function Or(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function kr(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				Or(e);
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
function Ar(e) {
	return Array(e).fill(0).map((e, t) => t);
}
function jr(e, t = "asc") {
	return (n, r) => {
		let i = e(n), a = e(r);
		return i < a ? t === "asc" ? -1 : 1 : i > a ? t === "asc" ? 1 : -1 : 0;
	};
}
function Mr(e) {
	return Array.from(new Set(e));
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/number-utils-CUPZTwjx.js
function Nr(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Pr(e, t) {
	return Math.max(e, t);
}
function Fr(e, t) {
	return Math.min(e, t);
}
function Ir(e, t, n) {
	return t + (n - t) * e;
}
function Lr(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? Nr(o, Math.min(r, i), Math.max(r, i)) : o;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax/index.js
function Rr(e) {
	return e.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function zr(e, t) {
	return Object.fromEntries((Array.isArray(t) ? t : Object.keys(t)).map((t) => [t, e[t]]));
}
//#endregion
//#region src/app/serializer.ts
function Br(e) {
	return new Uint8Array([
		171,
		205,
		1,
		e.inputNotes.length >> 8 & 255,
		e.inputNotes.length & 255,
		...e.inputNotes.flatMap((e) => [
			e.id >> 8 & 255,
			e.id & 255,
			e.pitch,
			e.position,
			e.duration
		]),
		Math.round(e.noteDuty * 255),
		e.octaveShift + 100,
		e.loopBars * 4 >>> 0,
		e.patternBars * 4 >>> 0,
		[
			"slice",
			"shift",
			"polyphonicShift"
		].indexOf(e.patternMode),
		+!!e.ghostEnabled,
		+!!e.realized,
		["major", "minor"].indexOf(e.keysMode)
	]);
}
function Vr(e) {
	if (e[0] !== 171 || e[1] !== 205 || e[2] !== 1) return;
	let t = e[3] << 8 | e[4], n = 5 + t * 5 + 8;
	if (e.length !== n) return;
	let r = [];
	for (let n = 0; n < t; n++) {
		let t = e[5 + n * 5] << 8 | e[6 + n * 5], i = e[7 + n * 5], a = e[8 + n * 5], o = e[9 + n * 5];
		r.push({
			id: t,
			pitch: i,
			position: a,
			duration: o
		});
	}
	let i = e.slice(5 + t * 5);
	if (i.length !== 8) return;
	let a = i[0] / 255, o = i[1] - 100, s = i[2] / 4, c = i[3] / 4, l = [
		"slice",
		"shift",
		"polyphonicShift"
	][i[4]], u = i[5] > 0, d = i[6] > 0, f = ["major", "minor"][i[7]];
	if (!(!l || !f)) return {
		inputNotes: r,
		noteDuty: a,
		octaveShift: o,
		loopBars: s,
		patternBars: c,
		patternMode: l,
		ghostEnabled: u,
		realized: d,
		keysMode: f
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function Hr(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = Hr(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function G() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Hr(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/index.js
function Ur(e, t, n) {
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
function Wr(e, t) {
	return t && Number.isFinite(t) ? `${e.toFixed(t)}px` : `${e}px`;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.module.js
function Gr(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Kr(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function qr(e, t) {
	this.props = e, this.context = t;
}
(qr.prototype = new z()).isPureReactComponent = !0, qr.prototype.shouldComponentUpdate = function(e, t) {
	return Kr(this.props, e) || Kr(this.state, t);
};
var Jr = P.__b;
P.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Jr && Jr(e);
}, typeof Symbol < "u" && Symbol.for;
var Yr = P.__e;
P.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	Yr(e, t, n, r);
};
var Xr = P.unmount;
function Zr(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Gr({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return Zr(e, t, n);
	})), e;
}
function Qr(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return Qr(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function $r() {
	this.__u = 0, this.o = null, this.__b = null;
}
function ei(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function ti() {
	this.i = null, this.l = null;
}
P.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Xr && Xr(e);
}, ($r.prototype = new z()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = ei(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = Qr(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, $r.prototype.componentWillUnmount = function() {
	this.o = [];
}, $r.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = Zr(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && L(R, null, e.fallback);
	return i && (i.__u &= -33), [L(R, null, t.__a ? null : e.children), i];
};
var ni = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(ti.prototype = new z()).__a = function(e) {
	var t = this, n = ei(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), ni(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, ti.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = B(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, ti.prototype.componentDidUpdate = ti.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		ni(e, n, t);
	});
};
var ri = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, ii = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, ai = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, oi = /[A-Z0-9]/g, si = typeof document < "u", ci = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
z.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(z.prototype, e, {
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
var li = P.event;
P.event = function(e) {
	return li && (e = li(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var ui = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, di = P.vnode;
P.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || si && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || ci(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : ai.test(a) && (a = s) : s = a = "oninput" : i && ii.test(a) ? a = a.replace(oi, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", ui)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = ri, di && di(e);
};
var fi = P.__r;
P.__r = function(e) {
	fi && fi(e), e.__c;
};
var pi = P.diffed;
P.diffed = function(e) {
	pi && pi(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var mi = 0;
Array.isArray;
function hi(e, t, n, r, i, a) {
	t ||= {};
	var o, s, c = t;
	if ("ref" in c) for (s in c = {}, t) s == "ref" ? o = t[s] : c[s] = t[s];
	var l = {
		type: e,
		props: c,
		key: n,
		ref: o,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --mi,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return P.vnode && P.vnode(l), l;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mo-react/index.js
function gi(e) {
	return /* @__PURE__ */ hi("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			Ur(t.nativeEvent, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = o + -(t.position.y - t.originalPosition.y) / (a / (r - n));
					i > 0 && (l = Math.round(l / i) * i), l = Nr(l, n, r), e.onChange(l), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
//#region ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@19.2.18_react@19.2.8/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
var _i = R, K = function(e, t, n) {
	return br.call(t, "css") ? hi(wr, Sr(e, t), n) : hi(e, t, n);
}, q = function(e, t, n) {
	return br.call(t, "css") ? hi(wr, Sr(e, t), n) : hi(e, t, n);
}, vi = ({ children: e, onShift: t }) => /* @__PURE__ */ K("div", {
	onClick: (e) => {
		let n = e.currentTarget.getBoundingClientRect();
		e.clientX - n.left < n.width / 2 ? t(-1) : t(1);
	},
	children: e
}), yi = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
}, bi = Xn.createContext && /*#__PURE__*/ Xn.createContext(yi), xi = [
	"attr",
	"size",
	"title"
];
function Si(e, t) {
	if (e == null) return {};
	var n, r, i = Ci(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Ci(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function wi() {
	return wi = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wi.apply(null, arguments);
}
function Ti(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ei(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ti(Object(n), !0).forEach(function(t) {
			Di(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ti(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Di(e, t, n) {
	return (t = Oi(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Oi(e) {
	var t = ki(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ki(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ai(e) {
	return e && e.map((e, t) => /*#__PURE__*/ Xn.createElement(e.tag, Ei({ key: t }, e.attr), Ai(e.child)));
}
function ji(e) {
	return (t) => /*#__PURE__*/ Xn.createElement(Mi, wi({ attr: Ei({}, e.attr) }, t), Ai(e.child));
}
function Mi(e) {
	var t = (t) => {
		var n = e.attr, r = e.size, i = e.title, a = Si(e, xi), o = r || t.size || "1em", s;
		return t.className && (s = t.className), e.className && (s = (s ? s + " " : "") + e.className), /*#__PURE__*/ Xn.createElement("svg", wi({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, t.attr, n, a, {
			className: s,
			style: Ei(Ei({ color: e.color || t.color }, t.style), e.style),
			height: o,
			width: o,
			xmlns: "http://www.w3.org/2000/svg"
		}), i && /*#__PURE__*/ Xn.createElement("title", null, i), e.children);
	};
	return bi === void 0 ? t(yi) : /*#__PURE__*/ Xn.createElement(bi.Consumer, null, (e) => t(e));
}
//#endregion
//#region ../../../node_modules/.pnpm/react-icons@5.7.0_react@19.2.8/node_modules/react-icons/bs/index.mjs
function Ni(e) {
	return ji({
		tag: "svg",
		attr: {
			fill: "currentColor",
			viewBox: "0 0 16 16"
		},
		child: [{
			tag: "path",
			attr: { d: "m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" },
			child: []
		}]
	})(e);
}
//#endregion
//#region ../../../node_modules/.pnpm/react-icons@5.7.0_react@19.2.8/node_modules/react-icons/fa/index.mjs
function Pi(e) {
	return ji({
		tag: "svg",
		attr: { viewBox: "0 0 256 512" },
		child: [{
			tag: "path",
			attr: { d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" },
			child: []
		}]
	})(e);
}
function Fi(e) {
	return ji({
		tag: "svg",
		attr: { viewBox: "0 0 256 512" },
		child: [{
			tag: "path",
			attr: { d: "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" },
			child: []
		}]
	})(e);
}
//#endregion
//#region ../../../node_modules/.pnpm/react-icons@5.7.0_react@19.2.8/node_modules/react-icons/md/index.mjs
function Ii(e) {
	return ji({
		tag: "svg",
		attr: { viewBox: "0 0 24 24" },
		child: [{
			tag: "path",
			attr: { d: "m10 17 5-5-5-5z" },
			child: []
		}, {
			tag: "path",
			attr: {
				fill: "none",
				d: "M0 24V0h24v24z"
			},
			child: []
		}]
	})(e);
}
function Li(e) {
	return ji({
		tag: "svg",
		attr: { viewBox: "0 0 24 24" },
		child: [{
			tag: "path",
			attr: { d: "m14 7-5 5 5 5z" },
			child: []
		}, {
			tag: "path",
			attr: {
				fill: "none",
				d: "M24 0v24H0V0z"
			},
			child: []
		}]
	})(e);
}
//#endregion
//#region src/components/icons.tsx
var Ri = {
	Play: Ni,
	ChevronLeft: Fi,
	ChevronRight: Pi,
	ArrowLeft: Li,
	ArrowRight: Ii
}, zi = {
	clPanelBg: "#eee",
	clKnobBg: "#bbb",
	clKnobTickBg: "#fff",
	clButtonActiveBg: "#77aadd",
	clForeground: "#457"
}, J = Object.fromEntries(Object.keys(zi).map((e) => [e, `var(--${Rr(e)})`])), Bi = Object.fromEntries(Object.entries(zi).map(([e, t]) => [`--${Rr(e)}`, t])), Vi = ({ children: e }) => /* @__PURE__ */ K("div", {
	style: Bi,
	css: { color: J.clForeground },
	children: e
}), Hi = { borderCommon: "border border-black/15" }, Ui = ({ value: e, onChange: t, min: n = 0, max: r = 1, step: i = .01, onClick: a, disabled: o }) => {
	let s = Lr(e, n, r, -135, 135);
	return /* @__PURE__ */ K(gi, {
		value: e,
		min: n,
		max: r,
		step: i,
		onChange: t,
		onClick: a,
		dragDisabled: o,
		children: /* @__PURE__ */ K("div", {
			className: G("w-7 h-7 rounded-full relative", Hi.borderCommon),
			style: {
				background: J.clKnobBg,
				opacity: o ? .5 : 1
			},
			children: /* @__PURE__ */ K("div", {
				className: "w-full h-full flex justify-center",
				style: { transform: `rotate(${s}deg)` },
				children: /* @__PURE__ */ K("div", {
					className: G("w-[2px] h-[10px]"),
					style: { background: J.clKnobTickBg }
				})
			})
		})
	});
}, Wi = ({ title: e }) => /* @__PURE__ */ K("div", {
	className: "text-xl font-bold",
	children: e
}), Gi = ({ children: e, className: t }) => /* @__PURE__ */ K("div", {
	className: G("flex-c", t),
	style: { background: J.clPanelBg },
	children: e
}), Ki = ({ label: e, children: t, yOffset: n = 0 }) => /* @__PURE__ */ q("div", {
	className: "relative",
	children: [t, /* @__PURE__ */ K("div", {
		className: G("absolute left-0 flex-c text-[11px] font-bold", "whitespace-nowrap"),
		style: { top: Wr(n - 16) },
		children: e
	})]
}), qi = ({ className: e, active: t, disabled: n, text: r, children: i, onClick: a }) => /* @__PURE__ */ q("button", {
	className: G("flex-c justify-between", "w-15 h-7", Hi.borderCommon, "text-white text-[14px] font-medium", "cursor-pointer", e),
	onClick: a,
	disabled: n,
	style: {
		backgroundColor: t ? J.clButtonActiveBg : J.clKnobBg,
		cursor: n ? "default" : "pointer",
		opacity: n ? .5 : 1
	},
	children: [r && /* @__PURE__ */ K("span", { children: r }), i]
}), Ji = ({ className: e, options: t, value: n, onChange: r }) => {
	let i = t.findIndex((e) => e.value === n), a = t[i], o = i > 0, s = i < t.length - 1;
	return /* @__PURE__ */ K(vi, {
		onShift: (e) => {
			let n = i + e;
			n < 0 || n >= t.length || r(t[n].value);
		},
		children: /* @__PURE__ */ q("div", {
			className: G(e, "flex-ha justify-between", "min-w-13 h-7", Hi.borderCommon, "text-white text-[14px] font-medium", "cursor-pointer"),
			style: { background: J.clKnobBg },
			children: [
				/* @__PURE__ */ K(Ri.ArrowLeft, {
					size: 20,
					className: G("ml-[-6px]", !o && "invisible")
				}),
				/* @__PURE__ */ K("div", { children: a?.label }),
				/* @__PURE__ */ K(Ri.ArrowRight, {
					size: 20,
					className: G("mr-[-6px]", !s && "invisible")
				})
			]
		})
	});
};
//#endregion
//#region src/logic/ghost-engine.ts
function Yi(e) {
	return 2 ** Math.ceil(Math.log2(e));
}
function Xi(e, t) {
	if (e.length === 0) return [];
	let n = e[e.length - 1], r = Pr(Yi(Fr(n.position + n.duration, t)), 4), i = t / r, a = [];
	for (let t = 0; t < i; t++) {
		let n = t * r;
		for (let t of e) a.push({
			...t,
			id: 0,
			position: n + t.position
		});
	}
	return a;
}
function Zi(e, t, n) {
	let r = [], i = Math.ceil(n / t);
	for (let n = 0; n < i; n++) {
		let i = n * t;
		for (let t of e) r.push({
			...t,
			id: 0,
			position: i + t.position
		});
	}
	return r;
}
function Qi(e, t, n) {
	let r = e.position % n;
	return t.filter((t) => t.position >= r && t.position + t.duration <= r + e.duration).map((t) => ({
		id: 0,
		position: e.position + t.position - r,
		duration: t.duration,
		pitch: e.pitch,
		noteType: "ghostTails"
	}));
}
function $i(e, t, n) {
	let r = e.position % n;
	return t.filter((t) => t.position >= r && t.position + t.duration <= r + e.duration).map((n) => ({
		id: 0,
		position: e.position + n.position - r,
		duration: n.duration,
		pitch: e.pitch + (n.pitch - t[0].pitch),
		noteType: "ghostTails"
	}));
}
function ea(e, t, n, r) {
	let i = [];
	for (let t of e) i.push({
		...t,
		noteType: "ghostHead"
	});
	let a = Xi(e, n);
	for (let e of a) i.some((t) => t.position === e.position) || i.push({
		...e,
		noteType: "ghostTails"
	});
	let o = {
		slice: Qi,
		shift: $i
	}[r], s = Zi(a, n, 32);
	for (let e of t) {
		let t = o(e, s, n);
		i.push(...t);
	}
	return ra(i);
}
function ta(e, t, n) {
	let r = Mr(e.filter((e) => e.position < n && t < e.position + e.duration).map((e) => e.pitch));
	return r.sort((e, t) => e - t), r;
}
function na(e, t, n) {
	return n[Lr(t.indexOf(e), 0, t.length, 0, n.length, !0)];
}
function ra(e) {
	return e.map((e, t) => ({
		...e,
		id: t
	}));
}
function ia(e, t, n, r) {
	let i = r / n >>> 0, a = [];
	for (let t of e) a.push({
		...t,
		noteType: "ghostHead"
	});
	let o = ta(e, 0, n), s = Xi(e, n);
	for (let e of s) a.some((t) => t.position === e.position) || a.push({
		...e,
		noteType: "ghostTails"
	});
	for (let e = 1; e <= i; e++) {
		let r = e * n, i = ta(t, r, r + n);
		if (i.length !== 0) for (let e = 0; e < s.length; e++) {
			let t = s[e], n = r + t.position, c = na(t.pitch, o, i);
			a.push({
				id: 0,
				pitch: c,
				position: n,
				duration: t.duration,
				noteType: "ghostTails"
			});
		}
	}
	return ra(a);
}
function aa(e, t) {
	let { loopBars: n, patternBars: r, patternMode: i } = t, a = r * 16, o = n * 16, s = e.filter((e) => e.position + e.duration <= a);
	s.sort(jr((e) => e.position));
	let c = e.filter((e) => e.position + e.duration > a);
	if (i === "slice" || i === "shift") return ea(s, c, a, i);
	if (i === "polyphonicShift") return ia(s, c, a, o);
	throw Error("never reaches here");
}
//#endregion
//#region src/logic/keys-name-helper.ts
var oa = [
	"C/Am",
	"C#/Am#",
	"D/Bm",
	"D#/Cm",
	"E/C#m",
	"F/Dm",
	"F#/D#m",
	"G/Em",
	"G#/Fm",
	"A/F#m",
	"A#/Gm",
	"B/G#m"
];
function sa(e) {
	return oa[(e.keyTranspose + 24) % 12];
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function ca(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/logic/resolve-note-pitch.tsx
var la = /* @__PURE__ */ new Map([
	[0, 0],
	[.5, 1],
	[1, 2],
	[1.5, 3],
	[2, 4],
	[3, 5],
	[3.5, 6],
	[4, 7],
	[4.5, 8],
	[5, 9],
	[5.5, 10],
	[6, 11]
]);
function ua(e, t, n) {
	let r = e / 7 >>> 0, i = e - r * 7, a = la.get(i) ?? 0;
	return Nr(60 + (r - 2) * 12 + a + t * 12 + n, 0, 127);
}
//#endregion
//#region src/logic/unit-interface-debug-dummy.ts
function da() {
	let e = new AudioContext(), t = e.createGain();
	return {
		audioContext: e,
		audioOutputNode: e.destination,
		audioInputNode: t,
		emitMetaAttributes() {},
		completeSetup() {},
		createNoteOutputPort() {
			return {};
		}
	};
}
//#endregion
//#region src/logic/sequencer.ts
var fa = ca("wafer-v01", import.meta.url) ?? da();
if (!fa) throw Error("undefined unit interface");
function pa() {
	let e = {
		stepNotes: [],
		octaveShift: 0,
		noteDuty: 1,
		loopBars: 2
	}, t = 0, n = fa.createNoteOutputPort();
	return {
		setStepNotes(t) {
			e.stepNotes = t;
		},
		processStep: { processStep(r, i, a) {
			let o = e.loopBars * 16;
			if (r %= o, i === void 0 || a === void 0) return;
			let s = e.stepNotes.filter((e) => e.position === r && e.duration > 0);
			for (let r of s) {
				let o = ua(r.pitch, e.octaveShift, t), s = a * r.duration, c = s * (r.duration === 1 ? .2 : .4), l = e.noteDuty, u = Ir(l, c, s);
				n.noteOn(o, i), n.noteOff(o, i + u);
			}
		} }.processStep,
		allNotesOff() {},
		inputNoteOn(e, t, r) {
			n.noteOn(e, t, r);
		},
		inputNoteOff(e, t) {
			n.noteOff(e, t);
		},
		setAttrs(t) {
			t.octaveShift !== void 0 && (e.octaveShift = t.octaveShift), t.noteDuty !== void 0 && (e.noteDuty = t.noteDuty), t.loopBars !== void 0 && (e.loopBars = t.loopBars);
		},
		setKeyTranspose(e) {
			t = e;
		},
		setPreviewNote(e) {}
	};
}
var Y = pa(), ma = Symbol("V"), ha = Symbol("IMMUT_BASE"), ga = Symbol("IS_RAW"), _a = Symbol("P"), va = "Array", ya = [
	Symbol.iterator,
	Symbol.toStringTag,
	ga
], ba = {
	Map: "Map",
	Set: "Set",
	Array: va
}, xa = "[object Object]", Sa = "[object Map]", Ca = "[object Set]", wa = "[object Array]", Ta = "[object Function]", Ea = {
	[Sa]: "Map",
	[Ca]: "Set",
	[wa]: va,
	[xa]: "Object"
}, Da = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], Oa = [
	"set",
	"clear",
	"delete"
], ka = [
	"add",
	"clear",
	"delete"
], Aa = [
	"splice",
	"sort",
	"unshift",
	"shift"
], ja = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), Ma = {
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
	[va]: ja
}, Na = {
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
	[va]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, Pa = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[va]: ["forEach", "map"]
};
function Fa(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var Ia = {
	value: 0,
	prefixSeed: 1
}, La = {
	value: 0,
	prefixSeed: 1
}, Ra = {
	value: 0,
	prefixSeed: 1
}, za = {
	value: 0,
	prefixSeed: 1
}, Ba = {}, Va = {};
function Ha() {
	return Fa(La, "MID_");
}
function Ua() {
	return Fa(Ia, "MV_");
}
function Wa() {
	return Fa(Ra, "SI_");
}
function Ga() {
	return Fa(za, "SR_");
}
var Ka = {
	autoFreeze: !1,
	autoRevoke: !0
}, qa = Object.prototype.toString, Ja = !!Reflect, Ya = Object.prototype.hasOwnProperty;
function Xa(e, t) {
	return Ja ? Reflect.has(e, t) : Ya.call(e, t);
}
function Za(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		ao(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), to(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), eo(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function Qa(e) {
	return qa.call(e);
}
function $a(...e) {
	return e;
}
function eo(e) {
	return Qa(e) === xa;
}
function to(e) {
	return Qa(e) === Sa;
}
function no(e) {
	return Qa(e) === Ca;
}
function ro(e) {
	return Qa(e) === Ta;
}
function io(e) {
	return Ea[Qa(e)];
}
function ao(e) {
	let t = Qa(e);
	return ![
		xa,
		wa,
		Sa,
		Ca,
		Ta
	].includes(t);
}
function oo(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function so(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function co(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function lo(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function uo(e) {
	return e && e[ma] || "";
}
function fo(e, t) {
	let n = uo(e);
	return n ? n !== t : !1;
}
function po(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && eo(e) && (n = Object.assign({}, e)), to(e) && (n = new Map(e)), no(e) && (n = new Set(e)), n;
}
function mo(e, t) {
	return t.immutBase ? e : po(e, t.readOnly);
}
function ho(e) {
	let t = e;
	if (!lo(e)) return e;
	let n = Ba[t];
	return n || (n = Wa(), Ba[t] = n), n;
}
function go(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function _o(e, t) {
	let n = e;
	return t && (n = vo(e, !0)), n.join("|");
}
function vo(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = ho(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = ho(i);
	return n[r] = a, n;
}
function yo(e) {
	return e.map((e) => Va[e] || e);
}
function bo(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || vo(t);
	go(i, a) < 0 && (r.push(t), i.push(a));
}
function xo(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = go(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function So(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function Co(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = to(r) ? So(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function wo(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = Co(e, i);
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
function To(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = to(r) ? So(r, a) : r[a];
	}
}
function Eo(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		To(e, r, n);
	}
}
function Do(e, t) {
	let n = _o(e), r = "";
	for (let e of t) {
		let t = `${_o(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = yo(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var Oo = /* @__PURE__ */ new Map(), ko = /* @__PURE__ */ new Map(), Ao = /* @__PURE__ */ new WeakMap(), jo = /* @__PURE__ */ new Map();
function Mo(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function No(e, t, n) {
	let r = [t], i = X(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function Po(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = io(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = ho(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = Io(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = No(y, e, s), f = vo(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = _o(i.arrKeyPath, !0), n = qo(u, e);
			t = Do(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = qo(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = Co(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = Co(e, t);
				if (!a) {
					let { val: n } = Co(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(vo(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(vo(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: Ha(),
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
		revoke: $a,
		hasOnOperate: c,
		execOnOperate: $a
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function Fo(e) {
	if (!e) return !1;
	let t = Bo(e);
	return t ? !t.isImmutBase : !1;
}
function Io(e, t) {
	let n = Lo(e, t);
	return n ? n.level + 1 : 1;
}
function X(e, t) {
	return t.metaMap.get(e);
}
function Lo(e, t) {
	return e ? t ? t.metaMap.get(e) || null : Vo(e) || null : null;
}
function Ro(e) {
	return e && Vo(e) || null;
}
function zo(e) {
	return e && e[ma] || "";
}
function Bo(e) {
	return Vo(e) || null;
}
function Vo(e) {
	return e[_a];
}
function Ho(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function Uo(e) {
	return Ao.get(e) || Ga();
}
function Wo(e, t) {
	return Ao.set(e, t);
}
function Go(e) {
	return Oo.get(e);
}
function Ko(e, t, n) {
	let r = Oo.get(e);
	r || (r = {}, Oo.set(e, r)), r[t] = n;
}
function qo(e, t) {
	let n = Go(e);
	return n && n[t] || [];
}
function Jo(e) {
	return ko.get(e) || [];
}
function Yo(e, t, n) {
	let r = Oo.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (ko.get(e) || []).filter((e, n) => !t.includes(n));
	ko.set(e, i);
}
function Xo(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => Ko(n, e, r));
	let i = ko.get(n) || [], a = r.map((e) => _o(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = _o(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => _o(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), ko.set(n, i);
}
function Zo(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = vo(i), s = vo(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		bo(n, a, s), Xo(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function Qo(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function $o(e, t) {
	return !eo(e) || zo(e) === t;
}
function es(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		Za(n, i, a, (e, n, r) => {
			let i = Lo(e, t);
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
		if (p === "Array") return Qo(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function ts(e, t) {
	let n = Jo(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = Co(e.proxyVal, t), i = Ro(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(_o(e)));
		else if (n) for (let e of o) To(t, e, n.copy);
		else if (s) for (let e of o) To(t, e, s.self);
	}
	i.length && Yo(e.sourceId, i, a);
}
function ns(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), ts(e, a), es(e, t), a;
}
function rs(e) {
	e.rootMeta.scopes.push(e);
}
function is(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = Po(e, t, n), c = mo(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => _a === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = $a;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : $a;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function as(e, t) {
	return e === "Array" || (Pa[e] || []).includes(t);
}
function os(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (ao(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!ro(e)) {
			if (r.newNodeStats[c] || e[ga]) return e;
			let n = X(e, o);
			return n || (n = is(c, e, t), rs(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!as(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), cs(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), cs(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function ss(e, t) {
	if (!eo(e)) return e;
	let n = X(e, t);
	return n ? n.copy : e;
}
function cs(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return Mo(t), a(...e);
	}, e.clear = function(...e) {
		return Mo(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return Mo(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (Mo(t), t.hasOnOperate) {
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
				let r = Lo(n, i), a = r ? r.copy || r.self : n;
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
function ls(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && ka.includes(r) || i === "Array" && Da.includes(r) || i === "Map" && Oa.includes(r))) && Mo(n);
}
function us(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function ds(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = ss(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	ls({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Ma[o] || [];
	if (ro(i) && m.includes(n)) return n === "slice" ? f.slice : (Aa.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = Lo(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = Lo(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = Lo(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : xo(e);
		} else g();
		let t = p[r];
		ao(t) || c.newNodeMap.delete(us(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !ao(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(us(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function fs(e) {
	if (ao(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(fs), Object.freeze(e);
	if (no(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = $a;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (to(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = $a;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		fs(n);
	}), Object.freeze(e);
}
function ps(e) {
	if (!e) return e;
	let t = Ro(e);
	return t ? t.self : e;
}
var ms = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], hs = {};
ms.forEach((e) => hs[e] = 1);
var gs = {
	[va]: 1,
	Set: 1,
	Map: 1
}, _s = /* @__PURE__ */ new Map();
function vs(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[ha] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? Ka.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = Ua(), p.metaVer = d, jo.set(d, p));
	let m = t.autoRevoke ?? Ka.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (Ma[f] || []).includes(t) ? (S = !0, l = (Na[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (ma === t) return d;
				let n = e[t];
				if (ya.includes(t)) {
					if (ro(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !Xa(e, t)) return n;
				let l = n, u = X(e, p), f = Zo(t, u, Lo(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return gs[h] && hs[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = os(n, {
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
				}), h === "Array" && co(t) || ba[h] && (l = ds(e, {
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
				if (Fo(i)) if (c = !0, $o(i, d)) {
					if (ss(i, p) === t[r]) return !0;
					let e = X(i, p);
					Zo(r, s, e), bo(e, s.keyPath.concat(r));
				} else e = !1;
				else if (fo(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = Vo(i);
					if (o.sourceId !== n) l = ps(i);
					else {
						let { isGetted: n, val: i } = wo(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = Vo(i);
						Ho(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = Co(e, t);
							n && Ho(o, Vo(i), r);
						}), bo(c, u), Eo(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && co(r)) return l = y("set", r, {
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
				return u && ds(t, {
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
				}), ds(e, {
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
				if (ao(e)) throw Error("base state can not be primitive");
				if (u) return _s.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || Uo(e), l = X(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = is("", n, {
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
				return rs(f), f.execOnOperate = y, _s.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return _s.delete(t), t;
				let r = X(t, p);
				if (r.isImmutBase && !n) return t;
				let i = ns(r, p);
				return l && e && (i = fs(i)), jo.delete(d), _s.delete(t), Wo(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function ys(e) {
	if (!ro(e)) throw Error("produce callback is not a function");
}
var bs = "Not a Limu root draft";
function xs(e) {
	let t = _s.get(e);
	if (!t) throw zo(e) && Bo(e)?.level === 0 ? Error("Draft has been finished!") : Error(bs);
	return t;
}
function Ss(e, t) {
	return vs(t).createDraft(e);
}
function Cs(e) {
	return xs(e)(e);
}
function ws(e, t) {
	if (oo(e) || so(t)) throw Error("produce callback can not be a promise function or result");
}
function Ts(e, t, n) {
	ys(t);
	let r = Ss(e, n);
	return ws(t, t(r)), Cs(r);
}
function Es(e, t, n) {
	if (!t || !ro(t)) {
		let n = e, r = t;
		return ys(e), (e) => Ts(e, n, r);
	}
	return Ts(e, t, n);
}
var Ds = Es;
function Os(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function ks(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function As(e, t) {
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
		}, r = Os(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Ds(t, e));
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
			let n = Os(t), r = e[t], i = c[`set${n}`];
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
		ks(l, e);
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
function js(e) {
	return As(e, {
		useEffect: Rt,
		useRef: Bt,
		useState: It
	});
}
//#endregion
//#region src/store/store.ts
function Ms() {
	return [];
}
var Z = js({
	inputNotes: Ms(),
	noteDuty: 1,
	octaveShift: 0,
	loopBars: 2,
	patternBars: 1,
	patternMode: "shift",
	ghostEnabled: !0,
	realized: !1,
	keysMode: "minor",
	currentPageIndex: 0,
	draftNote: null,
	mappedNotes: [],
	backupInputNotes: null,
	currentKeysName: "C/Am"
});
//#endregion
//#region src/components/selector-option.ts
function Ns(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region src/app/controls-section.tsx
var Ps = Ns([
	["slice", "slice"],
	["shift", "shift"],
	["polyphonicShift", "poly-shift"]
]), Fs = Ns([
	[.25, "1/4"],
	[.5, "1/2"],
	[1, "1"]
]), Is = Ns([
	.5,
	1,
	2,
	4,
	8,
	16
].map((e) => [e, `${e === .5 ? "1/2" : e}`]));
function Ls() {
	let { currentKeysName: e } = Z.useSnapshot();
	return Ht(() => {
		let [t, n] = e.split("/");
		return Ns([["minor", n], ["major", t]]);
	}, [e]);
}
var Rs = {
	clearNotes() {
		Z.assign({
			inputNotes: [],
			currentPageIndex: 0,
			realized: !1
		});
	},
	realizeNotes() {
		let e = Z.state;
		Z.assign({
			backupInputNotes: e.inputNotes,
			inputNotes: e.mappedNotes.map((e) => ({
				...e,
				noteType: void 0
			})),
			ghostEnabled: !1,
			realized: !0
		});
	},
	undoRealize() {
		let e = Z.state;
		e.backupInputNotes && Z.assign({
			inputNotes: e.backupInputNotes,
			backupInputNotes: null,
			ghostEnabled: !0,
			realized: !1
		});
	}
}, zs = () => {
	let e = Z.useSnapshot(), t = Ls();
	return /* @__PURE__ */ q("div", {
		className: "flex-v gap-3",
		children: [/* @__PURE__ */ q("div", {
			className: "flex-ha justify-between px-9",
			children: [/* @__PURE__ */ K("div", {
				className: "mt-[-14px]",
				children: /* @__PURE__ */ K(Wi, { title: "PARTEX" })
			}), /* @__PURE__ */ q("div", {
				className: "flex-ha gap-5",
				children: [
					/* @__PURE__ */ K(Ki, {
						label: "pt-mode",
						children: /* @__PURE__ */ K(Ji, {
							className: "w-24",
							options: Ps,
							value: e.patternMode,
							onChange: Z.setPatternMode
						})
					}),
					/* @__PURE__ */ K(Ki, {
						label: "pt-bars",
						children: /* @__PURE__ */ K(Ji, {
							options: Fs,
							value: e.patternBars,
							onChange: Z.setPatternBars
						})
					}),
					/* @__PURE__ */ K(Ki, {
						label: "bars",
						children: /* @__PURE__ */ K(Ji, {
							options: Is,
							value: e.loopBars,
							onChange: Z.setLoopBars
						})
					})
				]
			})]
		}), /* @__PURE__ */ q("div", {
			className: "flex-ha justify-between px-9",
			children: [/* @__PURE__ */ q("div", {
				className: "flex-ha gap-8",
				children: [
					/* @__PURE__ */ K("div", {
						className: "flex-ha gap-4",
						children: /* @__PURE__ */ K(Ki, {
							label: "key",
							children: /* @__PURE__ */ K(Ji, {
								options: t,
								value: e.keysMode,
								onChange: Z.setKeysMode
							})
						})
					}),
					/* @__PURE__ */ q("div", {
						className: "flex-ha gap-7",
						children: [/* @__PURE__ */ K(Ki, {
							label: "octave",
							children: /* @__PURE__ */ K(Ui, {
								value: e.octaveShift,
								onChange: Z.setOctaveShift,
								min: -3,
								max: 3,
								step: 1
							})
						}), /* @__PURE__ */ K(Ki, {
							label: "duty",
							children: /* @__PURE__ */ K(Ui, {
								value: e.noteDuty,
								onChange: Z.setNoteDuty
							})
						})]
					}),
					/* @__PURE__ */ q("div", {
						className: "font-medium text-md ml-[40px]",
						style: { color: J.clForeground },
						children: [
							e.currentPageIndex + 1,
							" / ",
							Math.max(1, e.loopBars / 2)
						]
					})
				]
			}), /* @__PURE__ */ q("div", {
				className: "flex-ha gap-4",
				children: [
					!e.realized && /* @__PURE__ */ q(_i, { children: [/* @__PURE__ */ K(qi, {
						active: e.ghostEnabled,
						onClick: Z.toggleGhostEnabled,
						children: "ghost"
					}), /* @__PURE__ */ K(qi, {
						onClick: Rs.realizeNotes,
						disabled: !e.ghostEnabled,
						children: "realize"
					})] }),
					e.realized && e.backupInputNotes && /* @__PURE__ */ K(qi, {
						onClick: Rs.undoRealize,
						children: "restore"
					}),
					/* @__PURE__ */ K(qi, {
						text: "x",
						className: "w-9!",
						onClick: Rs.clearNotes
					})
				]
			})]
		})]
	});
}, Bs = ({ direction: e, onClick: t, disabled: n }) => /* @__PURE__ */ K("button", {
	css: Vs,
	onClick: t,
	disabled: n,
	children: K(e === "left" ? Ri.ChevronLeft : Ri.ChevronRight, {})
}), Vs = Er({
	width: "28px",
	height: "44px",
	background: "var(--cl-button-active-bg)",
	color: "white",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	"&:hover": { opacity: .8 },
	"&:disabled": {
		background: "#cccc",
		cursor: "default",
		pointerEvents: "none"
	}
}), Hs = ({ cellW: e, cellH: t, nx: n, isComplementalMinorKey: r }) => /* @__PURE__ */ q("div", {
	className: "relative",
	css: Ht(() => Us(e, t), [e, t]),
	children: [Ar(7).map((e) => {
		let t = 6 - e, [i, a] = r ? [5, 2] : [0, 4], o = t === i;
		return /* @__PURE__ */ K("div", {
			className: G("grid-row", o && "--tonic", t === a && "--dominant"),
			children: Ar(n).map((e) => /* @__PURE__ */ K("div", {
				className: "grid-cell",
				children: /* @__PURE__ */ K("div", { children: e % 1 == 0 && o && "・" })
			}))
		});
	}), /* @__PURE__ */ K("div", {
		className: "overlay-h",
		children: /* @__PURE__ */ K("div", {
			className: "overlay-h-bar",
			children: Ar(2).map(() => /* @__PURE__ */ K("div", { className: "overlay-h-split" }))
		})
	})]
});
function Us(e, t) {
	return Er`
    & > .grid-row {
      display: flex;
      background: #fff;

      &.--tonic {
        background: #fd94;
      }
      &.--dominant {
        background: #fd92;
      }
    }

    & > .grid-row > .grid-cell {
      display: flex;
      align-items: center;
      width: ${Wr(e)};
      height: ${Wr(t)};
      border: 0.5px solid #8881;
      color: #8884;
      font-size: ${Wr(17)};
      padding-left: ${Wr(0)};
    }

    & > .overlay-v,
    & > .overlay-h {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    & > .overlay-v {
      display: flex;
      flex-direction: column;
    }

    & > .overlay-v > .overlay-v-top {
      height: 57.14%;
      border-bottom: 1px solid #ccc;
    }

    & > .overlay-h {
      display: flex;
    }

    & > .overlay-h > .overlay-h-bar {
      display: flex;
      flex-grow: 1;
      border: solid 0.5px #ccc;
      border-right: none;
      border-bottom: none;
    }

    & > .overlay-h > .overlay-h-bar > .overlay-h-split {
      flex-grow: 1;
      border: solid 0.5px #ccc4;
    }
  `;
}
//#endregion
//#region src/app/piano-roll-editor-view.tsx
var Q = {
	cellW: 16,
	cellH: 20,
	nx: 32,
	numOctaves: 3,
	scrollPartHeight: 240
}, $ = {
	shiftPage(e) {
		let t = Math.max(1, Z.state.loopBars / 2);
		Z.setCurrentPageIndex((n) => (n + e + t) % t);
	},
	setDraftNote(e) {
		Z.setDraftNote(e);
	},
	patchDraftNote(e) {
		Z.setDraftNote((t) => t ? {
			...t,
			...e
		} : null);
	},
	addNote(e) {
		Z.setInputNotes((t) => [...t, e]);
	},
	patchNote(e, t) {
		Z.produceInputNotes((n) => {
			let r = n.find((t) => t.id === e);
			r && Object.assign(r, t);
		});
	},
	removeNote(e) {
		Z.setInputNotes((t) => t.filter((t) => t.id !== e));
	}
}, Ws = () => {
	let { cellW: e, cellH: t, nx: n } = Q, { keysMode: r } = Z.useSnapshot();
	return /* @__PURE__ */ K("div", {
		className: "flex-v",
		children: Ar(Q.numOctaves).map((i) => /* @__PURE__ */ K(Hs, {
			cellW: e * 4,
			cellH: t,
			nx: n / 4,
			isComplementalMinorKey: r === "minor"
		}, i))
	});
}, Gs = ({ note: e, stepOffset: t, isDraft: n, patternBars: r, ghostEnabled: i }) => {
	let { cellW: a, cellH: o, numOctaves: s } = Q, c = (e.position - t) * a, l = (7 * s - e.pitch - 1) * o, u = e.duration * a, d = o, f = e.duration <= 0, p = i && e.noteType === "ghostHead", m = i && e.noteType === "ghostTails", h = e.position + e.duration <= r * 16, g = !e.noteType && h, _ = !i && !e.noteType && !h, v = i && !e.noteType && !h;
	return /* @__PURE__ */ K("div", {
		className: G(n && "--draft", f && "--deleting", p && "--ghost-head", m && "--ghost-tails", g && "--input-head", _ && "--input-tails", v && "--input-tails-in-ghost-mode"),
		style: {
			left: c,
			top: l + 1,
			width: u - 1,
			height: d - 1
		},
		css: qs
	});
}, Ks = {
	main: "#0bd8",
	alt: "#cf68"
}, qs = Er({
	position: "absolute",
	"&.--input-head": { background: Ks.main },
	"&.--input-tails": { background: Ks.main },
	"&.--input-tails-in-ghost-mode": { background: Ks.alt },
	"&.--draft": { background: "#f80a" },
	"&.--deleting": { background: "#f008" },
	"&.--ghost-head": {},
	"&.--ghost-tails": {
		background: "#fff4",
		border: `solid 1px ${Ks.main}`
	}
}), Js = ({ notes: e, stepOffset: t, draftNote: n, patternBars: r, ghostEnabled: i }) => /* @__PURE__ */ q("div", { children: [e.filter((e) => t <= e.position && e.position <= t + 32).map((e, n) => /* @__PURE__ */ K(Gs, {
	note: e,
	stepOffset: t,
	patternBars: r,
	ghostEnabled: i
}, n)), n && /* @__PURE__ */ K(Gs, {
	note: n,
	stepOffset: t,
	isDraft: !0,
	patternBars: r,
	ghostEnabled: i
})] });
function Ys() {
	let e = Q.numOctaves * 7, t = e * Q.cellH, n = new Map(Ar(e).map((e) => [e, t - e * Q.cellH - Q.cellH / 2]));
	function r(e) {
		let t = n.get(e), r = n.get(e + 1);
		t !== void 0 && r !== void 0 && n.set((e + (e + 1)) / 2, (t + r) / 2);
	}
	for (let e = 0; e < Q.numOctaves; e++) {
		let t = e * 7;
		[
			0,
			1,
			3,
			4,
			5
		].forEach((e) => {
			r(t + e);
		});
	}
	return [...n.entries()].map(([e, t]) => ({
		relNote: e,
		y: t
	}));
}
var Xs = Ys();
function Zs(e) {
	let t = Xs[0];
	for (let n of Xs) Math.abs(n.y - e) < Math.abs(t.y - e) && (t = n);
	return t.relNote;
}
function Qs(e, t, n) {
	return Math.floor(t / Q.cellW) + n - e + 1;
}
function $s(e, t, n) {
	return {
		stepPosition: Math.floor(e / Q.cellW) + n,
		relativeNoteNumber: 7 * Q.numOctaves - 1 - Math.floor(t / Q.cellH)
	};
}
function ec(e, t, n, r) {
	let i = Xs.filter((e) => Math.abs(e.relNote - t) < .75);
	i.sort(jr((e) => Math.abs(e.y - n)));
	for (let t of i) {
		let n = r.find((n) => n.position <= e && e < n.position + n.duration && n.pitch === t.relNote);
		if (n) return n;
	}
}
function tc(e, t, n) {
	let r = e.target.getBoundingClientRect(), i = r.width / (Q.cellW * Q.nx), a = Z.state.currentPageIndex * 32;
	$.setDraftNote(t), Ur(e.nativeEvent, {
		onMove(e) {
			let n = (e.position.x - r.left) / i, o = Zs((e.position.y - r.top) / i), s = Qs(t.position, n, a);
			$.patchDraftNote({
				pitch: o,
				duration: s
			});
		},
		onUp() {
			let e = Z.state.draftNote;
			e && (n && e.duration > 0 ? $.addNote(e) : (e.pitch !== t.pitch || e.duration !== t.duration) && (e.duration <= 0 ? $.removeNote(t.id) : $.patchNote(t.id, {
				pitch: e.pitch,
				duration: e.duration
			})), $.setDraftNote(null));
		},
		onCancel() {
			$.setDraftNote(null);
		}
	}, { coordinate: "page" });
}
var nc = (e) => {
	let t = e.target.getBoundingClientRect(), n = t.width / (Q.cellW * Q.nx), r = (e.clientX - t.left) / n, i = (e.clientY - t.top) / n, { stepPosition: a, relativeNoteNumber: o } = $s(r, i, Z.state.currentPageIndex * 32), s = ec(a, o, i, Z.state.inputNotes);
	s ? tc(e, s, !1) : tc(e, {
		id: Math.max(0, ...Z.state.inputNotes.map((e) => e.id)) + 1,
		position: a,
		pitch: o,
		duration: 1
	}, !0);
}, rc = () => /* @__PURE__ */ K("div", {
	className: "absolute-full",
	style: {
		width: Q.cellW * Q.nx,
		height: Q.cellH * 7 * Q.numOctaves
	},
	onPointerDown: nc
}), ic = "ontouchstart" in document, ac = () => {
	let { inputNotes: e, currentPageIndex: t, draftNote: n, mappedNotes: r, patternBars: i, ghostEnabled: a } = Z.useSnapshot(), o = Bt(null);
	return Rt(() => {
		let e = o.current;
		e.scrollTop = e.scrollHeight / 2 - e.clientHeight / 2;
	}, []), /* @__PURE__ */ K("div", {
		ref: o,
		className: G("bg-white overflow-x-hidden overflow-y-scroll", "border border-gray-300"),
		style: { height: Wr(Q.scrollPartHeight) },
		onWheel: (e) => e.preventDefault(),
		children: /* @__PURE__ */ q("div", {
			className: "flex-h",
			children: [/* @__PURE__ */ q("div", {
				className: "relative grow touch-none",
				children: [
					/* @__PURE__ */ K(Ws, {}),
					/* @__PURE__ */ K(Js, {
						notes: e,
						stepOffset: t * 32,
						draftNote: n,
						patternBars: i,
						ghostEnabled: a
					}),
					a && /* @__PURE__ */ K(Js, {
						notes: r,
						stepOffset: t * 32,
						draftNote: null,
						patternBars: i,
						ghostEnabled: a
					}),
					/* @__PURE__ */ K(rc, {})
				]
			}), ic && /* @__PURE__ */ K("div", { className: "w-[24px] bg-[#eee]" })]
		})
	});
}, oc = () => {
	let { loopBars: e } = Z.useSnapshot(), t = Math.max(1, e / 2) > 1;
	return /* @__PURE__ */ q("div", {
		className: "flex-ha gap-1.5",
		children: [
			/* @__PURE__ */ K(Bs, {
				direction: "left",
				disabled: !t,
				onClick: () => $.shiftPage(-1)
			}),
			/* @__PURE__ */ K(ac, {}),
			/* @__PURE__ */ K(Bs, {
				direction: "right",
				disabled: !t,
				onClick: () => $.shiftPage(1)
			})
		]
	});
};
//#endregion
//#region src/app/app.tsx
function sc() {
	Y.setAttrs({
		octaveShift: Z.state.octaveShift,
		noteDuty: Z.state.noteDuty,
		loopBars: Z.state.loopBars
	});
	let e = Z.subscribe((e) => {
		e.mappedNotes && Y.setStepNotes(e.mappedNotes), (e.noteDuty !== void 0 || e.octaveShift !== void 0 || e.loopBars !== void 0) && Y.setAttrs(zr(e, [
			"octaveShift",
			"noteDuty",
			"loopBars"
		]));
	});
	return fa?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [620, 380]
		},
		noteInput: {
			noteOn: Y.inputNoteOn,
			noteOff: Y.inputNoteOff
		},
		clockHandlers: {
			start() {},
			stop() {
				Y.allNotesOff();
			},
			processStep(e, t, n) {
				Y.processStep(e, t, n);
			}
		},
		hostCallbacks: { setKey(e) {
			Y.setKeyTranspose(e.keyTranspose);
			let t = sa(e);
			Z.setCurrentKeysName(t);
		} },
		persistence: {
			emitStateBytes() {
				return Br(zr(Z.state, {
					inputNotes: 1,
					noteDuty: 1,
					octaveShift: 1,
					loopBars: 1,
					patternBars: 1,
					patternMode: 1,
					ghostEnabled: 1,
					realized: 1,
					keysMode: 1
				}));
			},
			applyStateBytes(e) {
				let t = Vr(e);
				if (!t) return;
				let { inputNotes: n, loopBars: r, patternBars: i, ghostEnabled: a, patternMode: o } = t, s = a ? aa(n, {
					loopBars: r,
					patternBars: i,
					patternMode: o
				}) : n;
				Y.setStepNotes(s), Z.assign(t);
			}
		}
	}), e;
}
function cc() {
	let { inputNotes: e, loopBars: t, patternBars: n, ghostEnabled: r, patternMode: i } = Z.useSnapshot();
	Rt(() => {
		let a = r ? aa(e, {
			loopBars: t,
			patternBars: n,
			patternMode: i
		}) : e;
		Z.setMappedNotes(a);
	}, [
		e,
		t,
		n,
		r,
		i
	]);
}
function lc() {
	return /* @__PURE__ */ K("div", {
		className: G("h-full flex-c bg-(--cl-panel-bg)"),
		children: /* @__PURE__ */ K(Gi, {
			className: "w-[620px] h-[380px]",
			children: /* @__PURE__ */ q("div", {
				className: "flex-v gap-2 pt-3",
				children: [/* @__PURE__ */ K(zs, {}), /* @__PURE__ */ K("div", {
					className: "pt-1",
					children: /* @__PURE__ */ K(oc, {})
				})]
			})
		})
	});
}
var uc = () => (Rt(sc, []), cc(), /* @__PURE__ */ K(Vi, { children: /* @__PURE__ */ K(lc, {}) })), dc = kr((e) => (xt(/* @__PURE__ */ K(_r, {
	value: Pe({
		key: "cs",
		container: e
	}),
	children: /* @__PURE__ */ K(uc, {})
}), e), () => {
	xt(null, e);
}), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-cyan-100:oklch(95.6% .045 203.388);--color-cyan-600:oklch(60.9% .126 221.723);--color-gray-300:oklch(87.2% .01 258.338);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-medium:500;--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.invisible{visibility:hidden}.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.mt-\\[-14px\\]{margin-top:-14px}.mr-\\[-6px\\]{margin-right:-6px}.ml-\\[-6px\\]{margin-left:-6px}.ml-\\[40px\\]{margin-left:40px}.flex{display:flex}.hidden{display:none}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-\\[10px\\]{height:10px}.h-\\[380px\\]{height:380px}.h-\\[500px\\]{height:500px}.h-dvh{height:100dvh}.h-full{height:100%}.w-7{width:calc(var(--spacing) * 7)}.w-9\\!{width:calc(var(--spacing) * 9)!important}.w-15{width:calc(var(--spacing) * 15)}.w-24{width:calc(var(--spacing) * 24)}.w-\\[2px\\]{width:2px}.w-\\[24px\\]{width:24px}.w-\\[75px\\]{width:75px}.w-\\[620px\\]{width:620px}.w-\\[800px\\]{width:800px}.w-dvw{width:100dvw}.w-full{width:100%}.min-w-13{min-width:calc(var(--spacing) * 13)}.flex-grow,.grow{flex-grow:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.cursor-pointer{cursor:pointer}.touch-none{touch-action:none}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-5{gap:calc(var(--spacing) * 5)}.gap-7{gap:calc(var(--spacing) * 7)}.gap-8{gap:calc(var(--spacing) * 8)}.overflow-hidden{overflow:hidden}.overflow-x-hidden{overflow-x:hidden}.overflow-y-scroll{overflow-y:scroll}.rounded-full{border-radius:2147483647px}.border{border-style:var(--tw-border-style);border-width:1px}.border-black\\/15{border-color:#00000026}@supports (color:color-mix(in lab, red, red)){.border-black\\/15{border-color:color-mix(in oklab, var(--color-black) 15%, transparent)}}.border-cyan-600{border-color:var(--color-cyan-600)}.border-gray-300{border-color:var(--color-gray-300)}.bg-\\(--cl-panel-bg\\){background-color:var(--cl-panel-bg)}.bg-\\[\\#eee\\]{background-color:#eee}.bg-cyan-100\\/20{background-color:#cefafe33}@supports (color:color-mix(in lab, red, red)){.bg-cyan-100\\/20{background-color:color-mix(in oklab, var(--color-cyan-100) 20%, transparent)}}.bg-white{background-color:var(--color-white)}.px-9{padding-inline:calc(var(--spacing) * 9)}.pt-1{padding-top:var(--spacing)}.pt-3{padding-top:calc(var(--spacing) * 3)}.text-center{text-align:center}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[11px\\]{font-size:11px}.text-\\[14px\\]{font-size:14px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.text-white{color:var(--color-white)}}:host,:host *,:host :before,:host :after{--tw-border-style:solid}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", Dr],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { dc as default };
