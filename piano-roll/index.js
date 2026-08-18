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
	return Dt = 1, Lt(Zt, e);
}
function Lt(e, t, n) {
	var r = Ft(V++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Zt(void 0, t), function(e) {
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
function W(e, t) {
	var n = Ft(V++, 3);
	!U.__s && Xt(n.__H, t) && (n.__ = e, n.u = t, H.__H.__h.push(n));
}
function Rt(e, t) {
	var n = Ft(V++, 4);
	!U.__s && Xt(n.__H, t) && (n.__ = e, n.u = t, H.__h.push(n));
}
function zt(e) {
	return Dt = 5, G(function() {
		return { current: e };
	}, []);
}
function Bt(e, t, n) {
	Dt = 6, Rt(function() {
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
function G(e, t) {
	var n = Ft(V++, 7);
	return Xt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function Vt(e, t) {
	return Dt = 8, G(function() {
		return e;
	}, t);
}
function Ht(e) {
	var t = H.context[e.__c], n = Ft(V++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(H)), t.props.value) : e.__;
}
function Ut(e, t) {
	U.useDebugValue && U.useDebugValue(t ? t(e) : e);
}
function Wt() {
	var e = Ft(V++, 11);
	if (!e.__) {
		for (var t = H.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function Gt() {
	for (var e; e = Ot.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(Jt), t.__h.some(Yt), t.__h = [];
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
	})) : (t.__h.some(Jt), t.__h.some(Yt), t.__h = [], V = 0)), Tt = H;
}, U.diffed = function(e) {
	jt && jt(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (Ot.push(t) !== 1 && Et === U.requestAnimationFrame || ((Et = U.requestAnimationFrame) || qt)(Gt)), t.__H.__.some(function(e) {
		e.u &&= (e.__H = e.u, void 0);
	})), Tt = H = null;
}, U.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(Jt), e.__h = e.__h.filter(function(e) {
				return !e.__ || Yt(e);
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
			Jt(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && U.__e(t, n.__v));
};
var Kt = typeof requestAnimationFrame == "function";
function qt(e) {
	var t, n = function() {
		clearTimeout(r), Kt && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	Kt && (t = requestAnimationFrame(n));
}
function Jt(e) {
	var t = H, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), H = t;
}
function Yt(e) {
	var t = H;
	e.__c = e.__(), H = t;
}
function Xt(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Zt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.mjs
function Qt(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function $t(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function en(e, t) {
	var n = t(), r = It({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return Rt(function() {
		i.__ = n, i.u = t, tn(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), W(function() {
		return tn(i) && a({ t: i }), e(function() {
			tn(i) && a({ t: i });
		});
	}, [e]), n;
}
function tn(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function nn(e) {
	e();
}
function rn(e) {
	return e;
}
function an() {
	return [!1, nn];
}
var on = Rt;
function sn(e, t) {
	this.props = e, this.context = t;
}
function cn(e, t) {
	function n(e) {
		var n = this.props.ref;
		return n != e.ref && n && (typeof n == "function" ? n(null) : n.current = null), t ? !t(this.props, e) || n != e.ref : $t(this.props, e);
	}
	function r(t) {
		return this.shouldComponentUpdate = n, L(e, t);
	}
	return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.__f = r.prototype.isReactComponent = !0, r.type = e, r;
}
(sn.prototype = new z()).isPureReactComponent = !0, sn.prototype.shouldComponentUpdate = function(e, t) {
	return $t(this.props, e) || $t(this.state, t);
};
var ln = P.__b;
P.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), ln && ln(e);
};
var un = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function dn(e) {
	function t(t) {
		var n = Qt({}, t);
		return delete n.ref, e(n, t.ref || null);
	}
	return t.$$typeof = un, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var fn = function(e, t) {
	return e == null ? null : B(B(e).map(t));
}, pn = {
	map: fn,
	forEach: fn,
	count: function(e) {
		return e ? B(e).length : 0;
	},
	only: function(e) {
		var t = B(e);
		if (t.length !== 1) throw "Children.only";
		return t[0];
	},
	toArray: B
}, mn = P.__e;
P.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	mn(e, t, n, r);
};
var hn = P.unmount;
function gn(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Qt({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return gn(e, t, n);
	})), e;
}
function _n(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return _n(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function vn() {
	this.__u = 0, this.o = null, this.__b = null;
}
function yn(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function bn(e) {
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
function xn() {
	this.i = null, this.l = null;
}
P.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), hn && hn(e);
}, (vn.prototype = new z()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = yn(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = _n(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, vn.prototype.componentWillUnmount = function() {
	this.o = [];
}, vn.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = gn(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && L(R, null, e.fallback);
	return i && (i.__u &= -33), [L(R, null, t.__a ? null : e.children), i];
};
var Sn = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
function Cn(e) {
	return this.getChildContext = function() {
		return e.context;
	}, e.children;
}
function wn(e) {
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
	xt(L(Cn, { context: t.context }, e.__v), t.v);
}
function Tn(e, t) {
	var n = L(wn, {
		__v: e,
		h: t
	});
	return n.containerInfo = t, n;
}
(xn.prototype = new z()).__a = function(e) {
	var t = this, n = yn(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), Sn(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, xn.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = B(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, xn.prototype.componentDidUpdate = xn.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		Sn(e, n, t);
	});
};
var En = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Dn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, On = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, kn = /[A-Z0-9]/g, An = typeof document < "u", jn = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Mn(e, t, n) {
	return t.__k ?? (t.textContent = ""), xt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Nn(e, t, n) {
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
var Pn = P.event;
P.event = function(e) {
	return Pn && (e = Pn(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var Fn, In = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, Ln = P.vnode;
P.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || An && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || jn(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : On.test(a) && (a = s) : s = a = "oninput" : i && Dn.test(a) ? a = a.replace(kn, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", In)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = En, Ln && Ln(e);
};
var Rn = P.__r;
P.__r = function(e) {
	Rn && Rn(e), Fn = e.__c;
};
var zn = P.diffed;
P.diffed = function(e) {
	zn && zn(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), Fn = null;
};
var Bn = { ReactCurrentDispatcher: { current: {
	readContext: function(e) {
		return Fn.__n[e.__c].props.value;
	},
	useCallback: Vt,
	useContext: Ht,
	useDebugValue: Ut,
	useDeferredValue: rn,
	useEffect: W,
	useId: Wt,
	useImperativeHandle: Bt,
	useInsertionEffect: on,
	useLayoutEffect: Rt,
	useMemo: G,
	useReducer: Lt,
	useRef: zt,
	useState: It,
	useSyncExternalStore: en,
	useTransition: an
} } };
function Vn(e) {
	return L.bind(null, e);
}
function Hn(e) {
	return !!e && e.$$typeof === En;
}
function Un(e) {
	return Hn(e) && e.type === R;
}
function Wn(e) {
	return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function Gn(e) {
	return Hn(e) ? Ct.apply(null, arguments) : e;
}
function Kn(e) {
	return !!e.__k && (xt(null, e), !0);
}
function qn(e) {
	return e && (e.base || e.nodeType === 1 && e) || null;
}
var K = {
	useState: It,
	useId: Wt,
	useReducer: Lt,
	useEffect: W,
	useLayoutEffect: Rt,
	useInsertionEffect: on,
	useTransition: an,
	useDeferredValue: rn,
	useSyncExternalStore: en,
	startTransition: nn,
	useRef: zt,
	useImperativeHandle: Bt,
	useMemo: G,
	useCallback: Vt,
	useContext: Ht,
	useDebugValue: Ut,
	version: "18.3.1",
	Children: pn,
	render: Mn,
	hydrate: Nn,
	unmountComponentAtNode: Kn,
	createPortal: Tn,
	createElement: L,
	createContext: wt,
	createFactory: Vn,
	cloneElement: Gn,
	createRef: et,
	Fragment: R,
	isValidElement: Hn,
	isElement: Hn,
	isFragment: Un,
	isMemo: Wn,
	findDOMNode: qn,
	Component: z,
	PureComponent: sn,
	memo: cn,
	forwardRef: dn,
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
	Suspense: vn,
	SuspenseList: xn,
	lazy: bn,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Bn
}, Jn = /* @__PURE__ */ e(((e) => {
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
})), Yn = /* @__PURE__ */ e(((e, t) => {
	t.exports = Jn();
})), Xn = /* @__PURE__ */ e(((e, t) => {
	var n = Yn(), r = {
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
function Zn(e, t, n) {
	var r = "";
	return n.split(" ").forEach(function(n) {
		e[n] === void 0 ? n && (r += n + " ") : t.push(e[n] + ";");
	}), r;
}
var Qn = function(e, t, n) {
	var r = e.key + "-" + t.name;
	n === !1 && e.registered[r] === void 0 && (e.registered[r] = t.styles);
}, $n = function(e, t, n) {
	Qn(e, t, n);
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
function er(e) {
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
var tr = {
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
}, nr = /[A-Z]|^ms/g, rr = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ir = function(e) {
	return e.charCodeAt(1) === 45;
}, ar = function(e) {
	return e != null && typeof e != "boolean";
}, or = /* #__PURE__ */ Te(function(e) {
	return ir(e) ? e : e.replace(nr, "-$&").toLowerCase();
}), sr = function(e, t) {
	switch (e) {
		case "animation":
		case "animationName": if (typeof t == "string") return t.replace(rr, function(e, t, n) {
			return q = {
				name: t,
				styles: n,
				next: q
			}, t;
		});
	}
	return tr[e] !== 1 && !ir(e) && typeof t == "number" && t !== 0 ? t + "px" : t;
};
function cr(e, t, n) {
	if (n == null) return "";
	var r = n;
	if (r.__emotion_styles !== void 0) return r;
	switch (typeof n) {
		case "boolean": return "";
		case "object":
			var i = n;
			if (i.anim === 1) return q = {
				name: i.name,
				styles: i.styles,
				next: q
			}, i.name;
			var a = n;
			if (a.styles !== void 0) {
				var o = a.next;
				if (o !== void 0) for (; o !== void 0;) q = {
					name: o.name,
					styles: o.styles,
					next: q
				}, o = o.next;
				return a.styles + ";";
			}
			return lr(e, t, n);
		case "function": if (e !== void 0) {
			var s = q, c = n(e);
			return q = s, cr(e, t, c);
		}
	}
	var l = n;
	if (t == null) return l;
	var u = t[l];
	return u === void 0 ? l : u;
}
function lr(e, t, n) {
	var r = "";
	if (Array.isArray(n)) for (var i = 0; i < n.length; i++) r += cr(e, t, n[i]) + ";";
	else for (var a in n) {
		var o = n[a];
		if (typeof o != "object") {
			var s = o;
			t != null && t[s] !== void 0 ? r += a + "{" + t[s] + "}" : ar(s) && (r += or(a) + ":" + sr(a, s) + ";");
		} else if (Array.isArray(o) && typeof o[0] == "string" && (t == null || t[o[0]] === void 0)) for (var c = 0; c < o.length; c++) ar(o[c]) && (r += or(a) + ":" + sr(a, o[c]) + ";");
		else {
			var l = cr(e, t, o);
			switch (a) {
				case "animation":
				case "animationName":
					r += or(a) + ":" + l + ";";
					break;
				default: r += a + "{" + l + "}";
			}
		}
	}
	return r;
}
var ur = /label:\s*([^\s;{]+)\s*(;|$)/g, q;
function dr(e, t, n) {
	if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
	var r = !0, i = "";
	q = void 0;
	var a = e[0];
	a == null || a.raw === void 0 ? (r = !1, i += cr(n, t, a)) : i += a[0];
	for (var o = 1; o < e.length; o++) i += cr(n, t, e[o]), r && (i += a[o]);
	ur.lastIndex = 0;
	for (var s = "", c; (c = ur.exec(i)) !== null;) s += "-" + c[1];
	return {
		name: er(i) + s,
		styles: i,
		next: q
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.2.0_react@19.2.8/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.browser.esm.js
var fr = on || function(e) {
	return e();
}, pr = /* #__PURE__ */ wt(typeof HTMLElement < "u" ? /* #__PURE__ */ Pe({ key: "css" }) : null), mr = pr.Provider, hr = function(e) {
	return /*#__PURE__*/ dn(function(t, n) {
		return e(t, Ht(pr), n);
	});
}, gr = /* #__PURE__ */ wt({}), _r = {}.hasOwnProperty, vr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", yr = function(e, t) {
	var n = {};
	for (var r in t) _r.call(t, r) && (n[r] = t[r]);
	return n[vr] = e, n;
}, br = function(e) {
	var t = e.cache, n = e.serialized, r = e.isStringTag;
	return Qn(t, n, r), fr(function() {
		return $n(t, n, r);
	}), null;
}, xr = /* @__PURE__ */ hr(function(e, t, n) {
	var r = e.css;
	typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
	var i = e[vr], a = [r], o = "";
	typeof e.className == "string" ? o = Zn(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
	var s = dr(a, void 0, Ht(gr));
	o += t.key + "-" + s.name;
	var c = {};
	for (var l in e) _r.call(e, l) && l !== "css" && l !== vr && (c[l] = e[l]);
	return c.className = o, n && (c.ref = n), /*#__PURE__*/ L(R, null, /*#__PURE__*/ L(br, {
		cache: t,
		serialized: s,
		isStringTag: typeof i == "string"
	}), /*#__PURE__*/ L(i, c));
});
Xn();
var Sr = function(e, t) {
	var n = arguments;
	if (t == null || !_r.call(t, "css")) return L.apply(void 0, n);
	var r = n.length, i = Array(r);
	i[0] = xr, i[1] = yr(e, t);
	for (var a = 2; a < r; a++) i[a] = n[a];
	return L.apply(null, i);
};
(function(e) {
	var t;
	t ||= e.JSX ||= {};
})(Sr ||= {});
function Cr() {
	return dr([...arguments]);
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/utility-classes.css?inline
var wr = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}";
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function Tr(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function Er(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				Tr(e);
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
function Dr(e) {
	return Array(e).fill(0).map((e, t) => t);
}
function Or(e, t = "asc") {
	return (n, r) => {
		let i = e(n), a = e(r);
		return i < a ? t === "asc" ? -1 : 1 : i > a ? t === "asc" ? 1 : -1 : 0;
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/number-utils-CUPZTwjx.js
function kr(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Ar(e, t) {
	return Math.max(e, t);
}
function jr(e, t, n) {
	return t + (n - t) * e;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax/index.js
function Mr(e, t) {
	return Object.fromEntries((Array.isArray(t) ? t : Object.keys(t)).map((t) => [t, e[t]]));
}
//#endregion
//#region ../../../node_modules/.pnpm/snap-store@0.1.12_preact@10.29.8_react@19.2.8/node_modules/snap-store/dist/store-impl-CzL-_B7V.js
var Nr = Symbol("V"), Pr = Symbol("IMMUT_BASE"), Fr = Symbol("IS_RAW"), Ir = Symbol("P"), Lr = "Array", Rr = [
	Symbol.iterator,
	Symbol.toStringTag,
	Fr
], zr = {
	Map: "Map",
	Set: "Set",
	Array: Lr
}, Br = "[object Object]", Vr = "[object Map]", Hr = "[object Set]", Ur = "[object Array]", Wr = "[object Function]", Gr = {
	[Vr]: "Map",
	[Hr]: "Set",
	[Ur]: Lr,
	[Br]: "Object"
}, Kr = [
	"push",
	"pop",
	"shift",
	"splice",
	"unshift",
	"reverse",
	"copyWithin",
	"delete",
	"fill"
], qr = [
	"set",
	"clear",
	"delete"
], Jr = [
	"add",
	"clear",
	"delete"
], Yr = [
	"splice",
	"sort",
	"unshift",
	"shift"
], Xr = "concat.copyWithin.entries.every.fill.filter.find.findIndex.flat.flatMap.forEach.includes.indexOf.join.keys.lastIndexOf.map.pop.push.reduce.reduceRight.reverse.shift.unshift.slice.some.sort.splice.values.valueOf".split("."), Zr = {
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
	[Lr]: Xr
}, Qr = {
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
	[Lr]: [
		"pop",
		"push",
		"shift",
		"unshift",
		"splice",
		"sort",
		"copyWithin"
	]
}, $r = {
	Map: ["forEach", "get"],
	Set: ["forEach"],
	[Lr]: ["forEach", "map"]
};
function ei(e, t = "") {
	e.value >= 2 ** 53 - 1 ? (e.value = 1, e.prefixSeed += 1) : e.value += 1;
	let { value: n, prefixSeed: r } = e;
	return `${t}${r}_${n}`;
}
var ti = {
	value: 0,
	prefixSeed: 1
}, ni = {
	value: 0,
	prefixSeed: 1
}, ri = {
	value: 0,
	prefixSeed: 1
}, ii = {
	value: 0,
	prefixSeed: 1
}, ai = {}, oi = {};
function si() {
	return ei(ni, "MID_");
}
function ci() {
	return ei(ti, "MV_");
}
function li() {
	return ei(ri, "SI_");
}
function ui() {
	return ei(ii, "SR_");
}
var di = {
	autoFreeze: !1,
	autoRevoke: !0
}, fi = Object.prototype.toString, pi = !!Reflect, mi = Object.prototype.hasOwnProperty;
function hi(e, t) {
	return pi ? Reflect.has(e, t) : mi.call(e, t);
}
function gi(e, t, n, r) {
	let i = [], a = (e, t, n) => {
		wi(e) || i.includes(e) || (i.push(e), r(e, t, n), Array.isArray(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), bi(e) && e.forEach((t, n) => {
			a(t, e, n);
		}), yi(e) && Object.keys(e).forEach((t) => {
			a(e[t], e, t);
		}));
	};
	a(e, t, n);
}
function _i(e) {
	return fi.call(e);
}
function vi(...e) {
	return e;
}
function yi(e) {
	return _i(e) === Br;
}
function bi(e) {
	return _i(e) === Vr;
}
function xi(e) {
	return _i(e) === Hr;
}
function Si(e) {
	return _i(e) === Wr;
}
function Ci(e) {
	return Gr[_i(e)];
}
function wi(e) {
	let t = _i(e);
	return ![
		Br,
		Ur,
		Vr,
		Hr,
		Wr
	].includes(t);
}
function Ti(e) {
	return e.constructor.name === "AsyncFunction" || typeof e.then == "function";
}
function Ei(e) {
	return typeof Promise < "u" && e instanceof Promise;
}
function Di(e) {
	var t = typeof e;
	return t === "number" || t === "string" && /^[0-9]*$/.test(e);
}
function Oi(e) {
	return typeof e == "symbol";
}
Array.prototype, Map.prototype, Set.prototype, Function.prototype;
function ki(e) {
	return e && e[Nr] || "";
}
function Ai(e, t) {
	let n = ki(e);
	return n ? n !== t : !1;
}
function ji(e, t) {
	if (t) return e;
	if (Array.isArray(e)) return e.slice();
	let n = e;
	return e && yi(e) && (n = Object.assign({}, e)), bi(e) && (n = new Map(e)), xi(e) && (n = new Set(e)), n;
}
function Mi(e, t) {
	return t.immutBase ? e : ji(e, t.readOnly);
}
function Ni(e) {
	let t = e;
	if (!Oi(e)) return e;
	let n = ai[t];
	return n || (n = li(), ai[t] = n), n;
}
function Pi(e, t) {
	let n = e.map((e) => e.join("|")), r = t.join("|");
	return n.indexOf(r);
}
function Fi(e, t) {
	let n = e;
	return t && (n = Ii(e, !0)), n.join("|");
}
function Ii(e, t) {
	let n = [];
	if (t) return e.forEach((e) => {
		let t = Ni(e);
		n.push(t);
	}), n;
	n = e.slice();
	let r = e.length - 1, i = e[r], a = Ni(i);
	return n[r] = a, n;
}
function Li(e) {
	return e.map((e) => oi[e] || e);
}
function Ri(e, t, n) {
	let { keyPaths: r, keyStrPaths: i } = e, a = n || Ii(t);
	Pi(i, a) < 0 && (r.push(t), i.push(a));
}
function zi(e) {
	let { keyPaths: t, keyStrPaths: n, keyStrPath: r } = e, i = Pi(n, r);
	n.splice(i, 1), t.splice(i, 1), e.keyPath = t[0], e.keyStrPath = n[0];
}
function Bi(e, t) {
	let n = e.get(t);
	if (n !== void 0) return n;
	let r = e.get(Number(t) || t);
	if (r !== void 0) return r;
}
function Vi(e, t) {
	let n, r = e, i = t.length - 1, a = !0;
	for (let e = 0; e <= i; e++) {
		let o = t[e];
		if (!r && e < i) {
			a = !1;
			break;
		}
		n = bi(r) ? Bi(r, o) : r[o], r = n;
	}
	return {
		val: n,
		isGetted: a
	};
}
function Hi(e, t) {
	let n, r = !1, i = t.length - 1;
	for (let a = 0; a <= i; a++) {
		let i = t[a], { isGetted: o, val: s } = Vi(e, i);
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
function Ui(e, t, n) {
	let r = e, i = t.length - 1;
	for (let e = 0; e <= i && r; e++) {
		let a = t[e];
		if (e === i) {
			r[a] = n;
			break;
		}
		r = bi(r) ? Bi(r, a) : r[a];
	}
}
function Wi(e, t, n) {
	let r = t.length - 1;
	for (let i = 0; i <= r; i++) {
		let r = t[i];
		Ui(e, r, n);
	}
}
function Gi(e, t) {
	let n = Fi(e), r = "";
	for (let e of t) {
		let t = `${Fi(e, !0)}|`;
		if (n.startsWith(t)) {
			r = n.substring(t.length);
			break;
		}
	}
	let i = [];
	if (r) {
		let e = Li(r.split("|"));
		t.forEach((t) => {
			i.push(t.concat(e));
		});
	}
	return i;
}
var Ki = /* @__PURE__ */ new Map(), qi = /* @__PURE__ */ new Map(), Ji = /* @__PURE__ */ new WeakMap(), Yi = /* @__PURE__ */ new Map();
function Xi(e) {
	e.rootMeta.modified = !0;
	let t = (e) => {
		e && !e.modified && (e.modified = !0, t(e.parentMeta));
	};
	t(e);
}
function Zi(e, t, n) {
	let r = [t], i = J(e, n);
	if (i && i.level > 0) {
		let { keyPath: e } = i;
		return [...e, t];
	}
	return r;
}
function Qi(e, t, n) {
	let { ver: r, parentMeta: i = null, immutBase: a, compareVer: o, apiCtx: s, hasOnOperate: c } = n, l = Ci(t), u = n.sourceId, d = [], f = [], p = [], m = [], h = [], g = [], _ = Ni(e), v = 0, y = null;
	if (i) {
		u = i.sourceId, y = i.copy, v = ea(y, s), p = i.selfType === "Array" ? i.keyPath.concat(e) : i.arrKeyPath, d = Zi(y, e, s), f = Ii(d);
		let t = [];
		if (i.arrKeyPath.length) {
			let e = Fi(i.arrKeyPath, !0), n = da(u, e);
			t = Gi(d, n);
		}
		if (!t.length) {
			let { keyStrPathStr: e } = i, n = e ? `${e}|${_}` : _;
			t = da(u, n);
		}
		if (t.length > 1) {
			let { copy: e } = i.rootMeta, { val: n } = Vi(e, d), r = [], a = !1, o = [];
			t.forEach((t, i) => {
				let { val: s } = Vi(e, t);
				if (!a) {
					let { val: n } = Vi(e, t.slice(0, t.length - 1));
					Array.isArray(n) && (a = !0);
				}
				s === n ? (g.push(t), h.push(Ii(t)), o.push(t)) : r.push(i);
			}), a && (m = o), r.forEach((e) => t.splice(e, 1));
		} else i.keyPaths.length > 0 ? i.keyPaths.forEach((t) => {
			let n = t.concat(e);
			g.push(n), h.push(Ii(n));
		}) : (g = [d], h = [f]);
	}
	!p.length && m.length && (p = m[0]), p.length && !m.length && m.push(p);
	let b = i ? `${i.keyStrPathStr}|${_}` : _, x = {
		id: si(),
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
		revoke: vi,
		hasOnOperate: c,
		execOnOperate: vi
	};
	return x.rootMeta = v === 0 ? x : i.rootMeta, x;
}
function $i(e) {
	if (!e) return !1;
	let t = ia(e);
	return t ? !t.isImmutBase : !1;
}
function ea(e, t) {
	let n = ta(e, t);
	return n ? n.level + 1 : 1;
}
function J(e, t) {
	return t.metaMap.get(e);
}
function ta(e, t) {
	return e ? t ? t.metaMap.get(e) || null : aa(e) || null : null;
}
function na(e) {
	return e && aa(e) || null;
}
function ra(e) {
	return e && e[Nr] || "";
}
function ia(e) {
	return aa(e) || null;
}
function aa(e) {
	return e[Ir];
}
function oa(e, t, n) {
	t.copy = e.copy, t.self = e.self, t.parentMeta[n] = e.self;
}
function sa(e) {
	return Ji.get(e) || ui();
}
function ca(e, t) {
	return Ji.set(e, t);
}
function la(e) {
	return Ki.get(e);
}
function ua(e, t, n) {
	let r = Ki.get(e);
	r || (r = {}, Ki.set(e, r)), r[t] = n;
}
function da(e, t) {
	let n = la(e);
	return n && n[t] || [];
}
function fa(e) {
	return qi.get(e) || [];
}
function pa(e, t, n) {
	let r = Ki.get(e);
	r && n.forEach((e) => Reflect.deleteProperty(r, e));
	let i = (qi.get(e) || []).filter((e, n) => !t.includes(n));
	qi.set(e, i);
}
function ma(e, t) {
	let { sourceId: n, keyPaths: r } = e;
	t.forEach((e) => ua(n, e, r));
	let i = qi.get(n) || [], a = r.map((e) => Fi(e, !0)), o = !1;
	out: for (let e of i) for (let t of e) {
		let n = Fi(t, !0);
		if (a.includes(n)) {
			let t = e.map((e) => Fi(e, !0));
			r.forEach((n, r) => {
				t.includes(a[r]) || e.push(n);
			}), o = !0;
			break out;
		}
	}
	o || i.push(r), qi.set(n, i);
}
function ha(e, t, n) {
	let r = null;
	if (!(n && n.parentMeta !== t)) return r;
	let i = n.keyPath, a = t.keyPath.concat(e), o = Ii(i), s = Ii(a), c = o.join("|"), l = s.join("|");
	if (c !== l) {
		Ri(n, a, s), ma(n, [c, l]);
		let i = n.modified, o = e, u = n, d = t;
		do
			d.copy[o] = u.copy, d.modified = i, o = d.key, u = d, d = d.parentMeta;
		while (d);
		r = n.proxyVal;
	}
	return r;
}
function ga(e, t, n) {
	let { copy: r, isArrOrderChanged: i } = e, { targetNode: a, key: o } = n;
	if (i) {
		let e = r.findIndex((e) => e === t.copy || e === t.proxyVal);
		e >= 0 && (r[e] = a);
		return;
	}
	r[o] = a;
}
function _a(e, t) {
	return !yi(e) || ra(e) === t;
}
function va(e, t) {
	let { metaMap: n } = t, r = /* @__PURE__ */ new Map();
	t.newNodeMap.forEach((e) => {
		let { node: n, parent: i, key: a } = e, o = r.get(n);
		if (o) {
			i[a] = o;
			return;
		}
		let s = e;
		gi(n, i, a, (e, n, r) => {
			let i = ta(e, t);
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
		if (p === "Array") return ga(i, e, {
			targetNode: d,
			key: a
		}), u();
		if (l !== !0) return f[a] = d, u();
	}), e.scopes.length = 0;
}
function ya(e, t) {
	let n = fa(e.sourceId), r = -1, i = [], a = [];
	for (let o of n) {
		r += 1;
		let n = null, s = null, c = [];
		for (let t of o) {
			let { val: r } = Vi(e.proxyVal, t), i = na(r);
			i && (i.modified && !n && (n = i), s = i, c.push(i.self));
		}
		if (c[0] !== c[1]) i.push(r), o.forEach((e) => a.push(Fi(e)));
		else if (n) for (let e of o) Ui(t, e, n.copy);
		else if (s) for (let e of o) Ui(t, e, s.self);
	}
	i.length && pa(e.sourceId, i, a);
}
function ba(e, t) {
	let { self: n, copy: r, modified: i } = e, a = n;
	return r && i && (a = e.copy), ya(e, a), va(e, t), a;
}
function xa(e) {
	e.rootMeta.scopes.push(e);
}
function Sa(e, t, n) {
	let { traps: r, immutBase: i, apiCtx: a, autoRevoke: o } = n, s = Qi(e, t, n), c = Mi(t, n);
	s.copy = c;
	let l = Object.assign(Object.assign({}, r), { get: (e, t) => Ir === t ? s : r.get(e, t) });
	if (i) s.proxyVal = new Proxy(c, l), s.revoke = vi;
	else {
		let e = Proxy.revocable(c, l);
		s.proxyVal = e.proxy, s.revoke = o ? e.revoke : vi;
	}
	return a.metaMap.set(c, s), a.metaMap.set(s.proxyVal, s), a.metaMap.set(s.self, s), s;
}
function Ca(e, t) {
	return e === "Array" || ($r[e] || []).includes(t);
}
function wa(e, t) {
	let { key: n, parentMeta: r, parent: i, parentType: a, apiCtx: o } = t, s = (e, n) => {
		let c = n || "";
		if (wi(e) || !e) return e;
		if (!r) throw Error("[[ createMeta ]]: meta should not be null");
		if (!Si(e)) {
			if (r.newNodeStats[c] || e[Fr]) return e;
			let n = J(e, o);
			return n || (n = Sa(c, e, t), xa(n), r.selfType === "Map" ? i.set(c, n.copy) : i[c] = n.copy), n.proxyVal;
		}
		if (!Ca(a, c) || r.proxyItems) return e;
		let l = [];
		if (a === "Set") {
			let e = /* @__PURE__ */ new Set();
			i.forEach((t) => e.add(s(t))), Ea(e, r, {
				dataType: "Set",
				apiCtx: o
			}), l = e, r.copy = l;
		} else if (a === "Map") {
			let e = /* @__PURE__ */ new Map();
			i.forEach((t, n) => e.set(n, s(t, n))), Ea(e, r, {
				dataType: "Map",
				apiCtx: o
			}), l = e, r.copy = l;
		} else a === "Array" && c !== "sort" && (r.copy = r.copy || i.slice(), l = r.proxyVal);
		return r.proxyItems = l, e;
	};
	return s(e, n);
}
function Ta(e, t) {
	if (!yi(e)) return e;
	let n = J(e, t);
	return n ? n.copy : e;
}
function Ea(e, t, n) {
	let { dataType: r, apiCtx: i } = n, a = e.delete.bind(e), o = e.clear.bind(e);
	if (e.delete = function(...e) {
		return Xi(t), a(...e);
	}, e.clear = function(...e) {
		return Xi(t), o(...e);
	}, r === "Set") {
		let n = e.add.bind(e);
		e.add = function(...e) {
			return Xi(t), n(...e);
		};
	}
	if (r === "Map") {
		let n = e.set.bind(e), r = e.get.bind(e);
		e.set = function(...e) {
			if (Xi(t), t.hasOnOperate) {
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
				let r = ta(n, i), a = r ? r.copy || r.self : n;
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
function Da(e) {
	let { calledBy: t, parentMeta: n, op: r, parentType: i } = e;
	(["deleteProperty", "set"].includes(t) || t === "get" && (i === "Set" && Jr.includes(r) || i === "Array" && Kr.includes(r) || i === "Map" && qr.includes(r))) && Xi(n);
}
function Oa(e, t) {
	let n = e.keyPath.slice();
	return n.push(t), n.join("|");
}
function ka(e, t) {
	let { op: n, key: r, value: i, calledBy: a, parentType: o, parentMeta: s, apiCtx: c, isValueDraft: l, mayNewNode: u } = t, d = Ta(i, c);
	if (!s) {
		e[r] = d;
		return;
	}
	let { self: f, copy: p } = s;
	Da({
		calledBy: a,
		parentMeta: s,
		op: n,
		key: r,
		parentType: o
	});
	let m = Zr[o] || [];
	if (Si(i) && m.includes(n)) return n === "slice" ? f.slice : (Yr.includes(n) && (s.isArrOrderChanged = !0), p ? o === "Set" || o === "Map" ? p[n].bind(p) : p[n] : f[n].bind(f));
	if (!p) return d;
	let h = p[r], g = () => {
		let e = ta(h, c);
		e && (e.isDel = !0);
	}, _ = () => {
		let e = ta(i, c);
		e && e.isDel && (e.isDel = !1, e.key = r, e.keyPath = s.keyPath.concat([r]), e.level = s.level + 1, e.parent = s.copy, e.parentMeta = s);
	};
	if (n === "del") {
		let e = ta(i, c);
		if (e) {
			let { keyPaths: t } = e;
			t.length === 1 ? e.isDel = !0 : zi(e);
		} else g();
		let t = p[r];
		wi(t) || c.newNodeMap.delete(Oa(s, r)), delete p[r];
		return;
	}
	n === "set" && u && !l && !wi(d) && (s.newNodeStats[r] = !0, c.newNodeMap.set(Oa(s, r), {
		parent: p,
		node: d,
		key: r,
		target: null
	})), p[r] = d, g(), _();
}
function Aa(e) {
	if (wi(e)) return e;
	if (Array.isArray(e) && e.length > 0) return e.forEach(Aa), Object.freeze(e);
	if (xi(e)) {
		let t = e;
		t.add = () => t, t.delete = () => !1, t.clear = vi;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	if (bi(e)) {
		let t = e;
		t.set = () => t, t.delete = () => !1, t.clear = vi;
		for (let e of t.values()) Object.freeze(e);
		return Object.freeze(e);
	}
	return Object.getOwnPropertyNames(e).forEach((t) => {
		let n = e[t];
		Aa(n);
	}), Object.freeze(e);
}
function ja(e) {
	if (!e) return e;
	let t = na(e);
	return t ? t.self : e;
}
var Ma = [
	"length",
	"constructor",
	"asymmetricMatch",
	"nodeType",
	"size"
], Na = {};
Ma.forEach((e) => Na[e] = 1);
var Pa = {
	[Lr]: 1,
	Set: 1,
	Map: 1
}, Fa = /* @__PURE__ */ new Map();
function Ia(e) {
	let t = e || {}, n = t.onOperate, r = !!n, i = t.customKeys || [], a = t[Pr] ?? !1, o = t.readOnly ?? !1, s = t.disableWarn, c = t.compareVer ?? !1, l = t.autoFreeze ?? di.autoFreeze, u = t.disableProxy ?? !1, d = "", f = !1, p = {
		metaMap: /* @__PURE__ */ new Map(),
		newNodeMap: /* @__PURE__ */ new Map(),
		metaVer: d
	};
	u || (d = ci(), p.metaVer = d, Yi.set(d, p));
	let m = t.autoRevoke ?? di.autoRevoke, h = t.silenceSetTrapErr ?? !0, g = (e, t) => (console.warn(`${e} failed, cuase draft root has been finised! key:`, t), h), _ = (e, t) => (console.warn(`${e} failed, cuase the value is an expired limu proxy data! key:`, t), h), v = () => (s || console.warn("can not mutate state at readOnly mode!"), !0), y = (e, t, r) => {
		let { mayProxyVal: i, parentMeta: o, value: s, isCustom: c = !1 } = r, l = !1, u = e !== "get", d = u ? s : i;
		if (!n) return {
			isChanged: l,
			replacedValue: d
		};
		let { selfType: f = "", keyPath: p = [], copy: m, self: h, modified: g, proxyVal: _, arrKeyPath: v = [], keyPaths: y = [], keyStrPaths: b = [], arrKeyPaths: x = [] } = o || {}, S = !1;
		r.isChanged === void 0 ? (Zr[f] || []).includes(t) ? (S = !0, l = (Qr[f] || []).includes(t)) : u && (l = !o || (g ? m : h)[t] !== s) : l = r.isChanged;
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
				if (Nr === t) return d;
				let n = e[t];
				if (Rr.includes(t)) {
					if (Si(n)) {
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
				if (t === "__proto__" || t === "toJSON" && !hi(e, t)) return n;
				let l = n, u = J(e, p), f = ha(t, u, ta(l, p));
				if (f) return f;
				if (i.includes(t)) return y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n,
					isChanged: !1,
					isCustom: !0
				}).replacedValue;
				let h = u?.selfType;
				return Pa[h] && Na[t] ? ((t === "length" || t === "size") && y("get", t, {
					parentMeta: u,
					mayProxyVal: l,
					value: n
				}), u.copy[t]) : (l = wa(n, {
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
				}), h === "Array" && Di(t) || zr[h] && (l = ka(e, {
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
				let a = !0, s = J(t, p), c = !1, l = i;
				if ($i(i)) if (c = !0, _a(i, d)) {
					if (Ta(i, p) === t[r]) return !0;
					let e = J(i, p);
					ha(r, s, e), Ri(e, s.keyPath.concat(r));
				} else e = !1;
				else if (Ai(i, d)) {
					let { proxyVal: e, self: t, sourceId: n } = s.rootMeta, o = aa(i);
					if (o.sourceId !== n) l = ja(i);
					else {
						let { isGetted: n, val: i } = Hi(e, o.keyPaths);
						if (!n) return _("set", r);
						let c = aa(i);
						oa(o, c, r);
						let u = s.keyPath.concat(r);
						c.keyPaths.forEach((t) => {
							let { isGetted: n, val: i } = Vi(e, t);
							n && oa(o, aa(i), r);
						}), Ri(c, u), Wi(t, c.keyPaths, c.self), a = c.keyPaths.length === 1, p.metaMap.set(c.copy, c), l = i;
					}
				}
				if (o) return y("set", r, {
					parentMeta: s,
					isChanged: !1,
					value: l
				}), v();
				if (s && s.selfType === "Array") {
					if (s.copy && s.__callSet && Di(r)) return l = y("set", r, {
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
				return u && ka(t, {
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
				let n = J(e, p), r = e[t];
				return o ? (y("del", t, {
					parentMeta: n,
					isChanged: !1,
					value: r
				}), v()) : (y("del", t, {
					parentMeta: n,
					isChanged: !0,
					value: r
				}), ka(e, {
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
				if (wi(e)) throw Error("base state can not be primitive");
				if (u) return Fa.set(e, b.finishDraft), e;
				let n = e, i = t.sourceId || sa(e), l = J(e, p);
				if (l) {
					if (a && l.isImmutBase) return l.proxyVal;
					n = l.self;
				}
				let f = Sa("", n, {
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
				return xa(f), f.execOnOperate = y, Fa.set(f.proxyVal, b.finishDraft), f.proxyVal;
			},
			finishDraft: (t, n) => {
				if (u) return Fa.delete(t), t;
				let r = J(t, p);
				if (r.isImmutBase && !n) return t;
				let i = ba(r, p);
				return l && e && (i = Aa(i)), Yi.delete(d), Fa.delete(t), ca(i, r.sourceId), f = !0, i;
			}
		};
	})();
	return b;
}
function La(e) {
	if (!Si(e)) throw Error("produce callback is not a function");
}
var Ra = "Not a Limu root draft";
function za(e) {
	let t = Fa.get(e);
	if (!t) throw ra(e) && ia(e)?.level === 0 ? Error("Draft has been finished!") : Error(Ra);
	return t;
}
function Ba(e, t) {
	return Ia(t).createDraft(e);
}
function Va(e) {
	return za(e)(e);
}
function Ha(e, t) {
	if (Ti(e) || Ei(t)) throw Error("produce callback can not be a promise function or result");
}
function Ua(e, t, n) {
	La(t);
	let r = Ba(e, n);
	return Ha(t, t(r)), Va(r);
}
function Wa(e, t, n) {
	if (!t || !Si(t)) {
		let n = e, r = t;
		return La(e), (e) => Ua(e, n, r);
	}
	return Ua(e, t, n);
}
var Ga = Wa;
function Ka(e) {
	return e.charAt(0).toUpperCase() + e.slice(1);
}
function qa(e, t) {
	let n = e.indexOf(t);
	n !== -1 && e.splice(n, 1);
}
function Ja(e, t) {
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
		}, r = Ka(e);
		c[`set${r}`] = n, c[`produce${r}`] = (e) => {
			n((t) => Ga(t, e));
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
			let n = Ka(t), r = e[t], i = c[`set${n}`];
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
		qa(l, e);
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
function Ya(e) {
	return Ja(e, {
		useEffect: W,
		useRef: zt,
		useState: It
	});
}
var Y = Ya({
	notes: [],
	noteDuty: 1,
	octaveShift: 0,
	loopBars: 1,
	currentPageIndex: 0,
	draftNote: null
});
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/compat/dist/compat.module.js
function Xa(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Za(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Qa(e, t) {
	this.props = e, this.context = t;
}
(Qa.prototype = new z()).isPureReactComponent = !0, Qa.prototype.shouldComponentUpdate = function(e, t) {
	return Za(this.props, e) || Za(this.state, t);
};
var $a = P.__b;
P.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), $a && $a(e);
}, typeof Symbol < "u" && Symbol.for;
var eo = P.__e;
P.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	eo(e, t, n, r);
};
var to = P.unmount;
function no(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Xa({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return no(e, t, n);
	})), e;
}
function ro(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return ro(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function io() {
	this.__u = 0, this.o = null, this.__b = null;
}
function ao(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function oo() {
	this.i = null, this.l = null;
}
P.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), to && to(e);
}, (io.prototype = new z()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ??= [], r.o.push(n);
	var i = ao(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = ro(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, io.prototype.componentWillUnmount = function() {
	this.o = [];
}, io.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = no(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && L(R, null, e.fallback);
	return i && (i.__u &= -33), [L(R, null, t.__a ? null : e.children), i];
};
var so = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
(oo.prototype = new z()).__a = function(e) {
	var t = this, n = ao(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), so(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, oo.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = B(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, oo.prototype.componentDidUpdate = oo.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		so(e, n, t);
	});
};
var co = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, lo = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, uo = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, fo = /[A-Z0-9]/g, po = typeof document < "u", mo = function(e) {
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
var ho = P.event;
P.event = function(e) {
	return ho && (e = ho(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var go = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, _o = P.vnode;
P.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || po && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || mo(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : uo.test(a) && (a = s) : s = a = "oninput" : i && lo.test(a) ? a = a.replace(fo, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = B(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", go)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = co, _o && _o(e);
};
var vo = P.__r;
P.__r = function(e) {
	vo && vo(e), e.__c;
};
var yo = P.diffed;
P.diffed = function(e) {
	yo && yo(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value);
};
//#endregion
//#region ../../../node_modules/.pnpm/preact@10.29.8/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var bo = 0;
Array.isArray;
function xo(e, t, n, r, i, a) {
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
		__v: --bo,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return P.vnode && P.vnode(l), l;
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@19.2.18_react@19.2.8/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
var X = function(e, t, n) {
	return _r.call(t, "css") ? xo(xr, yr(e, t), n) : xo(e, t, n);
}, Z = function(e, t, n) {
	return _r.call(t, "css") ? xo(xr, yr(e, t), n) : xo(e, t, n);
}, So = () => {
	let { currentPageIndex: e, loopBars: t } = Y.useSnapshot(), n = Ar(t / 2, 1);
	return W(() => {
		e >= n && Y.setCurrentPageIndex(0);
	}, [e, n]), /* @__PURE__ */ Z("div", {
		className: "text-xs text-center",
		children: [
			e + 1,
			" / ",
			n
		]
	});
};
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/ax-ui/index.js
function Co(e, t, n) {
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
function wo(e, t) {
	return t && Number.isFinite(t) ? `${e.toFixed(t)}px` : `${e}px`;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofur@0.1.1_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/mofur/dist/mo-react/index.js
function To(e, t) {
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
function Eo(e) {
	let [t, n] = It();
	return Rt(() => {
		let t = e.current;
		if (t) return To(t, n);
	}, [e]), t;
}
function Do({ children: e, destWidth: t, destHeight: n }) {
	let r = zt(null), i = Eo(r), a = G(() => !i || i.width === 0 || i.height === 0 ? 1 : Math.min(t / i.width, n / i.height), [
		t,
		n,
		i
	]), o = i && i.width > 0;
	return /* @__PURE__ */ xo("div", {
		style: {
			position: "relative",
			width: wo(t),
			height: wo(n),
			overflow: "hidden"
		},
		children: /* @__PURE__ */ xo("div", {
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
function Oo(e) {
	return e.map(([e, t]) => ({
		label: t,
		value: e
	}));
}
//#endregion
//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function ko(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = ko(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function Ao() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ko(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components-mono2/button.tsx
var jo = ({ active: e, text: t, children: n, onClick: r, disabled: i, asr: a = 1.6 }) => {
	let o = 36 * a;
	return /* @__PURE__ */ Z("button", {
		type: "button",
		onClick: r,
		disabled: i,
		className: Ao("flex-c bg-gray-400 text-white border border-gray-600", e && "bg-sky-600"),
		style: {
			width: wo(o),
			height: wo(36),
			cursor: i ? "default" : "pointer",
			opacity: i ? .5 : 1
		},
		children: [t && /* @__PURE__ */ X("span", { children: t }), n]
	});
};
//#endregion
//#region src/components-mono2/general-selector.tsx
function Mo({ options: e, value: t, onChange: n, reverseOptionsOrder: r = !1, className: i, style: a }) {
	return /* @__PURE__ */ X("select", {
		value: t,
		onChange: (t) => {
			let r = typeof e[0].value == "number", i = t.target;
			n(r ? parseFloat(i.value) : i.value);
		},
		className: i,
		style: a,
		children: G(() => r ? [...e].reverse() : e, [e, r]).map((e) => /* @__PURE__ */ X("option", {
			value: e.value,
			children: e.label
		}, e.value))
	});
}
//#endregion
//#region src/components-mono2/knob-frame.tsx
function No(e) {
	return /* @__PURE__ */ X("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value, s = !1, c = 0;
			Co(t.nativeEvent, {
				onMove(t) {
					if (e.dragDisabled) return;
					let l = -(t.position.y - t.originalPosition.y) / (a / (r - n)), u = o + l;
					i > 0 && (u = Math.round(u / i) * i), u = kr(u, n, r), e.onChange(u), c += Math.abs(t.position.y - t.originalPosition.y), c > 4 && (s = !0);
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
function Po(e) {
	return /* @__PURE__ */ X("div", {
		className: "border-[1px] border-gray-700 w-[36px] h-[36px] rounded-full bg-gray-400",
		children: /* @__PURE__ */ X("div", {
			className: "w-full h-full flex justify-center",
			style: { transform: `rotate(${{ tickAngel() {
				let { value: t, min: n, max: r } = e;
				return jr((t - n) / (r - n), -135, 135);
			} }.tickAngel()}deg)` },
			children: /* @__PURE__ */ X("div", { className: "w-[2px] h-[10px] bg-[#fff]" })
		})
	});
}
function Fo({ value: e, min: t = 0, max: n = 1, step: r = .01, onChange: i }) {
	return /* @__PURE__ */ X(No, {
		value: e,
		min: t,
		max: n,
		step: r,
		onChange: i,
		children: /* @__PURE__ */ X(Po, {
			value: e,
			min: t,
			max: n
		})
	});
}
//#endregion
//#region src/components/labeled-row.tsx
var Io = ({ label: e, children: t }) => /* @__PURE__ */ Z("div", {
	className: "flex-ha gap-2",
	children: [/* @__PURE__ */ X("div", {
		className: "",
		children: e
	}), t]
}), Lo = Oo(Dr(7).map((e) => [e - 3, `${e - 3}`])), Ro = Oo([
	.5,
	1,
	2,
	4,
	8,
	16
].map((e) => [e, `${e === .5 ? "1/2" : e}`])), zo = () => {
	let e = Y.useSnapshot();
	return /* @__PURE__ */ Z("div", {
		className: "flex-ha gap-2 justify-between",
		children: [
			/* @__PURE__ */ X("div", { children: "piano-roll" }),
			/* @__PURE__ */ Z("div", {
				className: "flex-ha gap-4 text-sm",
				children: [
					/* @__PURE__ */ X(Io, {
						label: "octave",
						children: /* @__PURE__ */ X(Mo, {
							options: Lo,
							value: e.octaveShift,
							onChange: Y.setOctaveShift,
							reverseOptionsOrder: !0
						})
					}),
					/* @__PURE__ */ X(Io, {
						label: "duty",
						children: /* @__PURE__ */ X(Do, {
							destWidth: 20,
							destHeight: 20,
							children: /* @__PURE__ */ X(Fo, {
								value: e.noteDuty,
								min: 0,
								max: 1,
								step: .01,
								onChange: Y.setNoteDuty
							})
						})
					}),
					/* @__PURE__ */ X(Io, {
						label: "bars",
						children: /* @__PURE__ */ X(Mo, {
							options: Ro,
							value: e.loopBars,
							onChange: Y.setLoopBars
						})
					})
				]
			}),
			/* @__PURE__ */ X(Do, {
				destWidth: 24,
				destHeight: 20,
				children: /* @__PURE__ */ X(jo, {
					text: "x",
					onClick: () => {
						Y.setNotes([]), Y.setCurrentPageIndex(0);
					},
					asr: 1.25
				})
			})
		]
	});
}, Bo = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
}, Vo = K.createContext && /*#__PURE__*/ K.createContext(Bo), Ho = [
	"attr",
	"size",
	"title"
];
function Uo(e, t) {
	if (e == null) return {};
	var n, r, i = Wo(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Wo(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Go() {
	return Go = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Go.apply(null, arguments);
}
function Ko(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function qo(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ko(Object(n), !0).forEach(function(t) {
			Jo(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ko(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Jo(e, t, n) {
	return (t = Yo(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Yo(e) {
	var t = Xo(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Xo(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Zo(e) {
	return e && e.map((e, t) => /*#__PURE__*/ K.createElement(e.tag, qo({ key: t }, e.attr), Zo(e.child)));
}
function Qo(e) {
	return (t) => /*#__PURE__*/ K.createElement($o, Go({ attr: qo({}, e.attr) }, t), Zo(e.child));
}
function $o(e) {
	var t = (t) => {
		var n = e.attr, r = e.size, i = e.title, a = Uo(e, Ho), o = r || t.size || "1em", s;
		return t.className && (s = t.className), e.className && (s = (s ? s + " " : "") + e.className), /*#__PURE__*/ K.createElement("svg", Go({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, t.attr, n, a, {
			className: s,
			style: qo(qo({ color: e.color || t.color }, t.style), e.style),
			height: o,
			width: o,
			xmlns: "http://www.w3.org/2000/svg"
		}), i && /*#__PURE__*/ K.createElement("title", null, i), e.children);
	};
	return Vo === void 0 ? t(Bo) : /*#__PURE__*/ K.createElement(Vo.Consumer, null, (e) => t(e));
}
//#endregion
//#region ../../../node_modules/.pnpm/react-icons@5.7.0_react@19.2.8/node_modules/react-icons/bs/index.mjs
function es(e) {
	return Qo({
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
function ts(e) {
	return Qo({
		tag: "svg",
		attr: { viewBox: "0 0 256 512" },
		child: [{
			tag: "path",
			attr: { d: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" },
			child: []
		}]
	})(e);
}
function ns(e) {
	return Qo({
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
//#region src/components/icons.tsx
var rs = {
	Play: es,
	ChevronLeft: ns,
	ChevronRight: ts
}, is = ({ direction: e, onClick: t, disabled: n }) => /* @__PURE__ */ X("button", {
	css: as,
	onClick: t,
	disabled: n,
	children: X(e === "left" ? rs.ChevronLeft : rs.ChevronRight, {})
}), as = Cr({
	width: "25px",
	height: "40px",
	background: "#4ce",
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
}), os = ({ cellW: e, cellH: t, nx: n }) => /* @__PURE__ */ Z("div", {
	className: "relative",
	css: G(() => ss(e, t), [e, t]),
	children: [
		Dr(7).map((e) => /* @__PURE__ */ X("div", {
			className: "grid-row",
			children: Dr(n).map((t) => /* @__PURE__ */ X("div", {
				className: "grid-cell",
				children: /* @__PURE__ */ X("div", { children: t % 1 == 0 && (e === 3 || e === 6) && "・" })
			}))
		})),
		/* @__PURE__ */ X("div", {
			className: "overlay-v",
			children: /* @__PURE__ */ X("div", { className: "overlay-v-top" })
		}),
		/* @__PURE__ */ X("div", {
			className: "overlay-h",
			children: /* @__PURE__ */ X("div", {
				className: "overlay-h-bar",
				children: Dr(2).map(() => /* @__PURE__ */ X("div", { className: "overlay-h-split" }))
			})
		})
	]
});
function ss(e, t) {
	return Cr`
    & > .grid-row {
      display: flex;
      background: #fff;
    }

    & > .grid-row > .grid-cell {
      display: flex;
      align-items: center;
      width: ${wo(e)};
      height: ${wo(t)};
      border: 0.5px solid #8881;
      color: #8884;
      font-size: ${wo(12)};
      >div{
        margin-left: -2px;
      }
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
      border: solid 0.5px #ccc8;
    }
  `;
}
//#endregion
//#region src/app/piano-roll-editor-view.tsx
var Q = {
	cellW: 10,
	cellH: 16,
	nx: 32,
	numOctaves: 4
}, $ = {
	shiftPage(e) {
		let t = Math.max(1, Y.state.loopBars / 2);
		Y.setCurrentPageIndex((n) => (n + e + t) % t);
	},
	setDraftNote(e) {
		Y.setDraftNote(e);
	},
	patchDraftNote(e) {
		Y.setDraftNote((t) => t ? {
			...t,
			...e
		} : null);
	},
	addNote(e) {
		Y.setNotes((t) => [...t, e]);
	},
	patchNote(e, t) {
		Y.produceNotes((n) => {
			let r = n.find((t) => t.id === e);
			r && Object.assign(r, t);
		});
	},
	removeNote(e) {
		Y.setNotes((t) => t.filter((t) => t.id !== e));
	}
}, cs = () => {
	let { cellW: e, cellH: t, nx: n } = Q;
	return /* @__PURE__ */ X("div", {
		className: "flex-v",
		children: Dr(Q.numOctaves).map((r) => /* @__PURE__ */ X(os, {
			cellW: e * 4,
			cellH: t,
			nx: n / 4
		}, r))
	});
}, ls = ({ note: e, stepOffset: t, isDraft: n }) => {
	let { cellW: r, cellH: i, numOctaves: a } = Q, o = (e.stepPosition - t) * r, s = (7 * a - e.relativeNoteNumber - 1) * i, c = e.stepDuration * r, l = i, u;
	return n && (u = "orange"), e.stepDuration <= 0 && (u = "red"), /* @__PURE__ */ X("div", {
		className: "absolute bg-cyan-500/60",
		style: {
			left: o,
			top: s + 1,
			width: c - 1,
			height: l - 1,
			background: u
		}
	});
}, us = ({ notes: e, stepOffset: t, draftNote: n }) => /* @__PURE__ */ Z("div", { children: [e.filter((e) => t <= e.stepPosition && e.stepPosition <= t + 32).map((e, n) => /* @__PURE__ */ X(ls, {
	note: e,
	stepOffset: t
}, n)), n && /* @__PURE__ */ X(ls, {
	note: n,
	stepOffset: t,
	isDraft: !0
})] });
function ds() {
	let e = Q.numOctaves * 7, t = e * Q.cellH, n = new Map(Dr(e).map((e) => [e, t - e * Q.cellH - Q.cellH / 2]));
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
var fs = ds();
function ps(e) {
	let t = fs[0];
	for (let n of fs) Math.abs(n.y - e) < Math.abs(t.y - e) && (t = n);
	return t.relNote;
}
function ms(e, t, n) {
	return Math.floor(t / Q.cellW) + n - e + 1;
}
function hs(e, t, n) {
	return {
		stepPosition: Math.floor(e / Q.cellW) + n,
		relativeNoteNumber: 7 * Q.numOctaves - 1 - Math.floor(t / Q.cellH)
	};
}
function gs(e, t, n, r) {
	let i = fs.filter((e) => Math.abs(e.relNote - t) < .75);
	i.sort(Or((e) => Math.abs(e.y - n)));
	for (let t of i) {
		let n = r.find((n) => n.stepPosition <= e && e < n.stepPosition + n.stepDuration && n.relativeNoteNumber === t.relNote);
		if (n) return n;
	}
}
function _s(e, t, n) {
	let r = e.target.getBoundingClientRect(), i = r.width / (Q.cellW * Q.nx), a = Y.state.currentPageIndex * 32;
	$.setDraftNote(t), Co(e.nativeEvent, {
		onMove(e) {
			let n = (e.position.x - r.left) / i, o = ps((e.position.y - r.top) / i), s = ms(t.stepPosition, n, a);
			$.patchDraftNote({
				relativeNoteNumber: o,
				stepDuration: s
			});
		},
		onUp() {
			let e = Y.state.draftNote;
			e && (n && e.stepDuration > 0 ? $.addNote(e) : (e.relativeNoteNumber !== t.relativeNoteNumber || e.stepDuration !== t.stepDuration) && (e.stepDuration <= 0 ? $.removeNote(t.id) : $.patchNote(t.id, {
				relativeNoteNumber: e.relativeNoteNumber,
				stepDuration: e.stepDuration
			})), $.setDraftNote(null));
		},
		onCancel() {
			$.setDraftNote(null);
		}
	}, { coordinate: "page" });
}
var vs = (e) => {
	let t = e.target.getBoundingClientRect(), n = t.width / (Q.cellW * Q.nx), r = (e.clientX - t.left) / n, i = (e.clientY - t.top) / n, { stepPosition: a, relativeNoteNumber: o } = hs(r, i, Y.state.currentPageIndex * 32), s = gs(a, o, i, Y.state.notes);
	s ? _s(e, s, !1) : _s(e, {
		id: Math.max(0, ...Y.state.notes.map((e) => e.id)) + 1,
		stepPosition: a,
		relativeNoteNumber: o,
		stepDuration: 1
	}, !0);
}, ys = () => /* @__PURE__ */ X("div", {
	className: "absolute-full",
	style: {
		width: Q.cellW * Q.nx,
		height: Q.cellH * 7 * Q.numOctaves
	},
	onPointerDown: vs
}), bs = () => {
	let { notes: e, currentPageIndex: t, draftNote: n } = Y.useSnapshot(), r = zt(null);
	return W(() => {
		let e = r.current;
		e.scrollTop = e.scrollHeight / 2 - e.clientHeight / 2 + 0;
	}, []), /* @__PURE__ */ Z("div", {
		ref: r,
		css: {
			height: "160px",
			overflowX: "hidden",
			overflowY: "scroll",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X(cs, {}),
			/* @__PURE__ */ X(us, {
				notes: e,
				stepOffset: t * 32,
				draftNote: n
			}),
			/* @__PURE__ */ X(ys, {})
		]
	});
}, xs = () => {
	let { loopBars: e } = Y.useSnapshot(), t = Math.max(1, e / 2) > 1;
	return /* @__PURE__ */ Z("div", {
		className: "flex-ha gap-2",
		children: [
			/* @__PURE__ */ X(is, {
				direction: "left",
				disabled: !t,
				onClick: () => $.shiftPage(-1)
			}),
			/* @__PURE__ */ X(bs, {}),
			/* @__PURE__ */ X(is, {
				direction: "right",
				disabled: !t,
				onClick: () => $.shiftPage(1)
			})
		]
	});
};
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.9_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function Ss(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/logic/resolve-note-pitch.tsx
var Cs = /* @__PURE__ */ new Map([
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
function ws(e, t) {
	let n = e / 7 >>> 0, r = e - n * 7, i = Cs.get(r) ?? 0;
	return 60 + (n - 2) * 12 + i + t * 12;
}
//#endregion
//#region src/logic/unit-interface-debug-dummy.ts
function Ts() {
	let e = new AudioContext(), t = e.createGain();
	return {
		audioContext: e,
		audioOutputNode: e.destination,
		audioInputNode: t,
		emitMetaAttributes() {},
		completeSetup() {},
		createNoteOutputPort() {}
	};
}
//#endregion
//#region src/logic/sequencer.ts
var Es = Ss("wafer-v01", import.meta.url) ?? Ts();
if (!Es) throw Error("undefined unit interface");
function Ds() {
	let e = {
		stepNotes: [],
		octaveShift: 0,
		noteDuty: .9,
		loopBars: 2
	}, t = Es.createNoteOutputPort();
	return {
		setStepNotes(t) {
			e.stepNotes = t;
		},
		processStep: { processStep(n, r, i) {
			let a = e.loopBars * 16;
			if (n %= a, r === void 0 || i === void 0) return;
			let o = e.stepNotes.filter((e) => e.position === n && e.duration > 0);
			for (let n of o) {
				let a = ws(n.relNoteNumber, e.octaveShift), o = i * n.duration, s = i * .2, c = jr(e.noteDuty, s, o);
				t.noteOn(a, r), t.noteOff(a, r + c);
			}
		} }.processStep,
		allNotesOff() {},
		inputNoteOn(e, n, r) {
			t.noteOn(e, n, r);
		},
		inputNoteOff(e, n) {
			t.noteOff(e, n);
		},
		setAttrs(t) {
			t.octaveShift !== void 0 && (e.octaveShift = t.octaveShift), t.noteDuty !== void 0 && (e.noteDuty = t.noteDuty), t.loopBars !== void 0 && (e.loopBars = t.loopBars);
		},
		setPreviewNote(e) {}
	};
}
var Os = Ds();
//#endregion
//#region src/app/app.tsx
function ks() {
	function e(e) {
		let t = e.map((e) => ({
			position: e.stepPosition,
			relNoteNumber: e.relativeNoteNumber,
			duration: e.stepDuration
		}));
		Os.setStepNotes(t);
	}
	e(Y.state.notes), Os.setAttrs({
		octaveShift: Y.state.octaveShift,
		noteDuty: Y.state.noteDuty,
		loopBars: Y.state.loopBars
	});
	let t = Y.subscribe((t) => {
		t.notes && e(t.notes), (t.noteDuty !== void 0 || t.octaveShift !== void 0 || t.loopBars !== void 0) && Os.setAttrs(Mr(t, [
			"octaveShift",
			"noteDuty",
			"loopBars"
		]));
	});
	return Es?.completeSetup({
		unitAspects: {
			unitType: "sequencer",
			viewSize: [420, 240]
		},
		noteInput: {
			noteOn: Os.inputNoteOn,
			noteOff: Os.inputNoteOff
		},
		clockHandlers: {
			start() {},
			stop() {
				Os.allNotesOff();
			},
			processStep(e, t, n) {
				Os.processStep(e, t, n);
			}
		},
		persistence: {
			emitState() {
				return Mr(Y.state, {
					notes: 1,
					noteDuty: 1,
					octaveShift: 1,
					loopBars: 1
				});
			},
			applyState(e) {
				Y.assign(e);
			}
		}
	}), t;
}
var As = () => (W(ks, []), /* @__PURE__ */ X("div", {
	className: "bg-white flex-c",
	children: /* @__PURE__ */ X("div", {
		className: "w-[420px] h-[240px] border border-cyan-600 bg-blue-100/20 flex-c",
		children: /* @__PURE__ */ Z("div", {
			className: "flex-v gap-2",
			children: [
				/* @__PURE__ */ X(zo, {}),
				/* @__PURE__ */ X(xs, {}),
				/* @__PURE__ */ X(So, {})
			]
		})
	})
})), js = Er((e) => (xt(/* @__PURE__ */ X(mr, {
	value: Pe({
		key: "cs",
		container: e
	}),
	children: /* @__PURE__ */ X(As, {})
}), e), () => {
	xt(null, e);
}), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-cyan-100:oklch(95.6% .045 203.388);--color-cyan-500:oklch(71.5% .143 215.221);--color-cyan-600:oklch(60.9% .126 221.723);--color-sky-600:oklch(58.8% .158 241.966);--color-blue-100:oklch(93.2% .032 255.585);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.left-0{left:0}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.flex{display:flex}.hidden{display:none}.h-\\[10px\\]{height:10px}.h-\\[36px\\]{height:36px}.h-\\[240px\\]{height:240px}.h-dvh{height:100dvh}.h-full{height:100%}.w-\\[2px\\]{width:2px}.w-\\[36px\\]{width:36px}.w-\\[60px\\]{width:60px}.w-\\[400px\\]{width:400px}.w-\\[420px\\]{width:420px}.w-dvw{width:100dvw}.w-full{width:100%}.flex-grow{flex-grow:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.rounded-full{border-radius:2147483647px}.border,.border-\\[1px\\]{border-style:var(--tw-border-style);border-width:1px}.border-cyan-600{border-color:var(--color-cyan-600)}.border-gray-600{border-color:var(--color-gray-600)}.border-gray-700{border-color:var(--color-gray-700)}.bg-\\[\\#fff\\]{background-color:#fff}.bg-blue-100\\/20{background-color:#dbeafe33}@supports (color:color-mix(in lab, red, red)){.bg-blue-100\\/20{background-color:color-mix(in oklab, var(--color-blue-100) 20%, transparent)}}.bg-cyan-100\\/20{background-color:#cefafe33}@supports (color:color-mix(in lab, red, red)){.bg-cyan-100\\/20{background-color:color-mix(in oklab, var(--color-cyan-100) 20%, transparent)}}.bg-cyan-500\\/60{background-color:#00b7d799}@supports (color:color-mix(in lab, red, red)){.bg-cyan-500\\/60{background-color:color-mix(in oklab, var(--color-cyan-500) 60%, transparent)}}.bg-gray-400{background-color:var(--color-gray-400)}.bg-sky-600{background-color:var(--color-sky-600)}.bg-white{background-color:var(--color-white)}.text-center{text-align:center}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[9px\\]{font-size:9px}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-white{color:var(--color-white)}}:host,:host *,:host :before,:host :after{--tw-border-style:solid}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}img{-webkit-user-drag:none}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", wr],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { js as default };
