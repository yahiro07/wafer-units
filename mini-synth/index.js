//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/dist/solid.js
var e = {
	context: void 0,
	registry: void 0,
	effects: void 0,
	done: !1,
	getContextId() {
		return t(this.context.count);
	},
	getNextContextId() {
		return t(this.context.count++);
	}
};
function t(t) {
	let n = String(t), r = n.length - 1;
	return e.context.id + (r ? String.fromCharCode(96 + r) : "") + n;
}
function n(t) {
	e.context = t;
}
var r = (e, t) => e === t, i = Symbol("solid-proxy"), a = typeof Proxy == "function", o = Symbol("solid-track"), s = { equals: r }, c = null, l = me, u = 1, d = 2, f = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, p = null, m = null, h = null, g = null, _ = null, v = 0;
function y(e, t) {
	let n = h, r = p, i = e.length === 0, a = t === void 0 ? r : t, o = i ? f : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => C(() => O(o)));
	p = o, h = null;
	try {
		return E(s, !0);
	} finally {
		h = n, p = r;
	}
}
function b(e, t) {
	t = t ? Object.assign({}, s, t) : s;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [le.bind(n), (e) => (typeof e == "function" && (e = m && m.running && m.sources.has(n) ? e(n.tValue) : e(n.value)), ue(n, e))];
}
function x(e, t, n) {
	w(fe(e, t, !1, u));
}
function ee(e, t, n) {
	l = he;
	let r = fe(e, t, !1, u), i = ce && se(ce);
	i && (r.suspense = i), (!n || !n.render) && (r.user = !0), _ ? _.push(r) : w(r);
}
function S(e, t, n) {
	n = n ? Object.assign({}, s, n) : s;
	let r = fe(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, w(r), le.bind(r);
}
function te(e) {
	return E(e, !1);
}
function C(e) {
	if (h === null) return e();
	let t = h;
	h = null;
	try {
		return e();
	} finally {
		h = t;
	}
}
function ne(e) {
	ee(() => C(e));
}
function re(e) {
	return p === null || (p.cleanups === null ? p.cleanups = [e] : p.cleanups.push(e)), e;
}
function ie() {
	return h;
}
var [ae, oe] = /*@__PURE__*/ b(!1);
function se(e) {
	let t;
	return p && p.context && (t = p.context[e.id]) !== void 0 ? t : e.defaultValue;
}
var ce;
function le() {
	let e = m && m.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === u) w(this);
	else {
		let e = g;
		g = null, E(() => D(this), !1), g = e;
	}
	if (h) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== h) {
			let t = e ? e.length : 0;
			h.sources ? (h.sources.push(this), h.sourceSlots.push(t)) : (h.sources = [this], h.sourceSlots = [t]), e ? (e.push(h), this.observerSlots.push(h.sources.length - 1)) : (this.observers = [h], this.observerSlots = [h.sources.length - 1]);
		}
	}
	return e && m.sources.has(this) ? this.tValue : this.value;
}
function ue(e, t, n) {
	let r = m && m.running && m.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (m) {
			let r = m.running;
			(r || !n && m.sources.has(e)) && (m.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && E(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = m && m.running;
				r && m.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? g.push(n) : _.push(n), n.observers && ge(n)), r ? n.tState = u : n.state = u);
			}
			if (g.length > 1e6) throw g = [], Error();
		}, !1);
	}
	return t;
}
function w(e) {
	if (!e.fn) return;
	O(e);
	let t = v;
	de(e, m && m.running && m.sources.has(e) ? e.tValue : e.value, t), m && !m.running && m.sources.has(e) && queueMicrotask(() => {
		E(() => {
			m && (m.running = !0), h = p = e, de(e, e.tValue, t), h = p = null;
		}, !1);
	});
}
function de(e, t, n) {
	let r, i = p, a = h;
	h = p = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (m && m.running ? (e.tState = u, e.tOwned && e.tOwned.forEach(O), e.tOwned = void 0) : (e.state = u, e.owned && e.owned.forEach(O), e.owned = null)), e.updatedAt = n + 1, k(t);
	} finally {
		h = a, p = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? ue(e, r, !0) : m && m.running && e.pure ? (m.sources.has(e) || (e.value = r), m.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function fe(e, t, n, r = u, i) {
	let a = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: p,
		context: p ? p.context : null,
		pure: n
	};
	return m && m.running && (a.state = 0, a.tState = r), p === null || p !== f && (m && m.running && p.pure ? p.tOwned ? p.tOwned.push(a) : p.tOwned = [a] : p.owned ? p.owned.push(a) : p.owned = [a]), a;
}
function T(e) {
	let t = m && m.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === d) return D(e);
	if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < v);) {
		if (t && m.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (m.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === u) w(e);
		else if ((t ? e.tState : e.state) === d) {
			let t = g;
			g = null, E(() => D(e, n[0]), !1), g = t;
		}
	}
}
function E(e, t) {
	if (g) return e();
	let n = !1;
	t || (g = []), _ ? n = !0 : _ = [], v++;
	try {
		let t = e();
		return pe(n), t;
	} catch (e) {
		n || (_ = null), g = null, k(e);
	}
}
function pe(e) {
	if (g &&= (me(g), null), e) return;
	let t;
	if (m) {
		if (!m.promises.size && !m.queue.size) {
			let e = m.sources, n = m.disposed;
			_.push.apply(_, m.effects), t = m.resolve;
			for (let e of _) "tState" in e && (e.state = e.tState), delete e.tState;
			m = null, E(() => {
				for (let e of n) O(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) O(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				oe(!1);
			}, !1);
		} else if (m.running) {
			m.running = !1, m.effects.push.apply(m.effects, _), _ = null, oe(!0);
			return;
		}
	}
	let n = _;
	_ = null, n.length && E(() => l(n), !1), t && t();
}
function me(e) {
	for (let t = 0; t < e.length; t++) T(e[t]);
}
function he(t) {
	let r, i = 0;
	for (r = 0; r < t.length; r++) {
		let e = t[r];
		e.user ? t[i++] = e : T(e);
	}
	if (e.context) {
		if (e.count) {
			e.effects ||= [], e.effects.push(...t.slice(0, i));
			return;
		}
		n();
	}
	for (e.effects && (e.done || !e.count) && (t = [...e.effects, ...t], i += e.effects.length, delete e.effects), r = 0; r < i; r++) T(t[r]);
}
function D(e, t) {
	let n = m && m.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === u ? i !== t && (!i.updatedAt || i.updatedAt < v) && T(i) : e === d && D(i, t);
		}
	}
}
function ge(e) {
	let t = m && m.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = d : r.state = d, r.pure ? g.push(r) : _.push(r), r.observers && ge(r));
	}
}
function O(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) O(e.tOwned[t]);
		delete e.tOwned;
	}
	if (m && m.running && e.pure) _e(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) O(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	m && m.running ? e.tState = 0 : e.state = 0;
}
function _e(e, t) {
	if (t || (e.tState = 0, m.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) _e(e.owned[t]);
}
function ve(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function ye(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		k(e, n && n.owner || null);
	}
}
function k(e, t = p) {
	let n = c && t && t.context && t.context[c], r = ve(e);
	if (!n) throw r;
	_ ? _.push({
		fn() {
			ye(r, n, t);
		},
		state: u
	}) : ye(r, n, t);
}
var be = Symbol("fallback");
function xe(e) {
	for (let t = 0; t < e.length; t++) e[t]();
}
function Se(e, t, n = {}) {
	let r = [], i = [], a = [], s = 0, c = t.length > 1 ? [] : null;
	return re(() => xe(a)), () => {
		let l = e() || [], u = l.length, d, f;
		return l[o], C(() => {
			let e, t, o, m, h, g, _, v, b;
			if (u === 0) s !== 0 && (xe(a), a = [], r = [], i = [], s = 0, c &&= []), n.fallback && (r = [be], i[0] = y((e) => (a[0] = e, n.fallback())), s = 1);
			else if (s === 0) {
				for (i = Array(u), f = 0; f < u; f++) r[f] = l[f], i[f] = y(p);
				s = u;
			} else {
				for (o = Array(u), m = Array(u), c && (h = Array(u)), g = 0, _ = Math.min(s, u); g < _ && r[g] === l[g]; g++);
				for (_ = s - 1, v = u - 1; _ >= g && v >= g && r[_] === l[v]; _--, v--) o[v] = i[_], m[v] = a[_], c && (h[v] = c[_]);
				for (e = /* @__PURE__ */ new Map(), t = Array(v + 1), f = v; f >= g; f--) b = l[f], d = e.get(b), t[f] = d === void 0 ? -1 : d, e.set(b, f);
				for (d = g; d <= _; d++) b = r[d], f = e.get(b), f !== void 0 && f !== -1 ? (o[f] = i[d], m[f] = a[d], c && (h[f] = c[d]), f = t[f], e.set(b, f)) : a[d]();
				for (f = g; f < u; f++) f in o ? (i[f] = o[f], a[f] = m[f], c && (c[f] = h[f], c[f](f))) : i[f] = y(p);
				i = i.slice(0, s = u), r = l.slice(0);
			}
			return i;
		});
		function p(e) {
			if (a[f] = e, c) {
				let [e, n] = b(f);
				return c[f] = n, t(l[f], e);
			}
			return t(l[f]);
		}
	};
}
function A(e, t) {
	return C(() => e(t || {}));
}
function j() {
	return !0;
}
var Ce = {
	get(e, t, n) {
		return t === i ? n : e.get(t);
	},
	has(e, t) {
		return t === i || e.has(t);
	},
	set: j,
	deleteProperty: j,
	getOwnPropertyDescriptor(e, t) {
		return {
			configurable: !0,
			enumerable: !0,
			get() {
				return e.get(t);
			},
			set: j,
			deleteProperty: j
		};
	},
	ownKeys(e) {
		return e.keys();
	}
};
function we(e) {
	return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Te() {
	for (let e = 0, t = this.length; e < t; ++e) {
		let t = this[e]();
		if (t !== void 0) return t;
	}
}
function Ee(...e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t ||= !!r && i in r, e[n] = typeof r == "function" ? (t = !0, S(r)) : r;
	}
	if (a && t) return new Proxy({
		get(t) {
			for (let n = e.length - 1; n >= 0; n--) {
				let r = we(e[n])[t];
				if (r !== void 0) return r;
			}
		},
		has(t) {
			for (let n = e.length - 1; n >= 0; n--) if (t in we(e[n])) return !0;
			return !1;
		},
		keys() {
			let t = [];
			for (let n = 0; n < e.length; n++) t.push(...Object.keys(we(e[n])));
			return [...new Set(t)];
		}
	}, Ce);
	let n = {}, r = Object.create(null);
	for (let t = e.length - 1; t >= 0; t--) {
		let i = e[t];
		if (!i) continue;
		let a = Object.getOwnPropertyNames(i);
		for (let e = a.length - 1; e >= 0; e--) {
			let t = a[e];
			if (t === "__proto__" || t === "constructor") continue;
			let o = Object.getOwnPropertyDescriptor(i, t);
			if (!r[t]) r[t] = o.get ? {
				enumerable: !0,
				configurable: !0,
				get: Te.bind(n[t] = [o.get.bind(i)])
			} : o.value === void 0 ? void 0 : o;
			else {
				let e = n[t];
				e && (o.get ? e.push(o.get.bind(i)) : o.value !== void 0 && e.push(() => o.value));
			}
		}
	}
	let o = {}, s = Object.keys(r);
	for (let e = s.length - 1; e >= 0; e--) {
		let t = s[e], n = r[t];
		n && n.get ? Object.defineProperty(o, t, n) : o[t] = n ? n.value : void 0;
	}
	return o;
}
function De(e) {
	let t = "fallback" in e && { fallback: () => e.fallback };
	return S(Se(() => e.each, e.children, t || void 0));
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/web/dist/web.js
var Oe = /*#__PURE__*/ new Set([
	"className",
	"value",
	"readOnly",
	"noValidate",
	"formNoValidate",
	"isMap",
	"noModule",
	"playsInline",
	"adAuctionHeaders",
	"allowFullscreen",
	"browsingTopics",
	"defaultChecked",
	"defaultMuted",
	"defaultSelected",
	"disablePictureInPicture",
	"disableRemotePlayback",
	"preservesPitch",
	"shadowRootClonable",
	"shadowRootCustomElementRegistry",
	"shadowRootDelegatesFocus",
	"shadowRootSerializable",
	"sharedStorageWritable",
	.../* @__PURE__ */ "allowfullscreen.async.alpha.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.hidden.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.adauctionheaders.browsingtopics.credentialless.defaultchecked.defaultmuted.defaultselected.defer.disablepictureinpicture.disableremoteplayback.preservespitch.shadowrootclonable.shadowrootcustomelementregistry.shadowrootdelegatesfocus.shadowrootserializable.sharedstoragewritable".split(".")
]), ke = /*#__PURE__*/ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]), Ae = /*#__PURE__*/ Object.assign(Object.create(null), {
	className: "class",
	htmlFor: "for"
}), je = /*#__PURE__*/ Object.assign(Object.create(null), {
	class: "className",
	novalidate: {
		$: "noValidate",
		FORM: 1
	},
	formnovalidate: {
		$: "formNoValidate",
		BUTTON: 1,
		INPUT: 1
	},
	ismap: {
		$: "isMap",
		IMG: 1
	},
	nomodule: {
		$: "noModule",
		SCRIPT: 1
	},
	playsinline: {
		$: "playsInline",
		VIDEO: 1
	},
	readonly: {
		$: "readOnly",
		INPUT: 1,
		TEXTAREA: 1
	},
	adauctionheaders: {
		$: "adAuctionHeaders",
		IFRAME: 1
	},
	allowfullscreen: {
		$: "allowFullscreen",
		IFRAME: 1
	},
	browsingtopics: {
		$: "browsingTopics",
		IMG: 1
	},
	defaultchecked: {
		$: "defaultChecked",
		INPUT: 1
	},
	defaultmuted: {
		$: "defaultMuted",
		AUDIO: 1,
		VIDEO: 1
	},
	defaultselected: {
		$: "defaultSelected",
		OPTION: 1
	},
	disablepictureinpicture: {
		$: "disablePictureInPicture",
		VIDEO: 1
	},
	disableremoteplayback: {
		$: "disableRemotePlayback",
		AUDIO: 1,
		VIDEO: 1
	},
	preservespitch: {
		$: "preservesPitch",
		AUDIO: 1,
		VIDEO: 1
	},
	shadowrootclonable: {
		$: "shadowRootClonable",
		TEMPLATE: 1
	},
	shadowrootdelegatesfocus: {
		$: "shadowRootDelegatesFocus",
		TEMPLATE: 1
	},
	shadowrootserializable: {
		$: "shadowRootSerializable",
		TEMPLATE: 1
	},
	sharedstoragewritable: {
		$: "sharedStorageWritable",
		IFRAME: 1,
		IMG: 1
	}
});
function Me(e, t) {
	let n = je[e];
	return typeof n == "object" ? n[t] ? n.$ : void 0 : n;
}
var Ne = /*#__PURE__*/ new Set([
	"beforeinput",
	"click",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
]), Pe = {
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
}, Fe = (e) => S(() => e());
function Ie(e, t, n) {
	let r = n.length, i = t.length, a = r, o = 0, s = 0, c = t[i - 1].nextSibling, l = null;
	for (; o < i || s < a;) {
		if (t[o] === n[s]) {
			o++, s++;
			continue;
		}
		for (; t[i - 1] === n[a - 1];) i--, a--;
		if (i === o) {
			let t = a < r ? s ? n[s - 1].nextSibling : n[a - s] : c;
			for (; s < a;) e.insertBefore(n[s++], t);
		} else if (a === s) for (; o < i;) (!l || !l.has(t[o])) && t[o].remove(), o++;
		else if (t[o] === n[a - 1] && n[s] === t[i - 1]) {
			let r = t[--i].nextSibling;
			e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--a], r), t[i] = n[a];
		} else {
			if (!l) {
				l = /* @__PURE__ */ new Map();
				let e = s;
				for (; e < a;) l.set(n[e], e++);
			}
			let r = l.get(t[o]);
			if (r != null) if (s < r && r < a) {
				let c = o, u = 1, d;
				for (; ++c < i && c < a && (d = l.get(t[c])) != null && d === r + u;) u++;
				if (u > r - s) {
					let i = t[o];
					for (; s < r;) e.insertBefore(n[s++], i);
				} else e.replaceChild(n[s++], t[o++]);
			} else o++;
			else t[o++].remove();
		}
	}
}
var Le = "_$DX_DELEGATE";
function Re(e, t, n, r = {}) {
	let i;
	return y((r) => {
		i = r, t === document ? e() : P(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function M(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => C(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function ze(e, t = window.document) {
	let n = t[Le] || (t[Le] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, $e));
	}
}
function N(e, t, n) {
	F(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Be(e, t, n, r) {
	F(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function Ve(e, t, n) {
	F(e) || (n ? e.setAttribute(t, "") : e.removeAttribute(t));
}
function He(e, t) {
	F(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function Ue(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function We(e, t, n = {}) {
	let r = Object.keys(t || {}), i = Object.keys(n), a, o;
	for (a = 0, o = i.length; a < o; a++) {
		let r = i[a];
		!r || r === "undefined" || t[r] || (Ze(e, r, !1), delete n[r]);
	}
	for (a = 0, o = r.length; a < o; a++) {
		let i = r[a], o = !!t[i];
		!i || i === "undefined" || n[i] === o || !o || (Ze(e, i, !0), n[i] = o);
	}
	return n;
}
function Ge(e, t, n) {
	if (!t) return n ? N(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function Ke(e, t, n) {
	n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n);
}
function qe(e, t = {}, n, r) {
	let i = {};
	return r || x(() => i.children = I(e, t.children, i.children)), x(() => typeof t.ref == "function" && Je(t.ref, e)), x(() => Ye(e, t, n, !0, i, !0)), i;
}
function Je(e, t, n) {
	return C(() => e(t, n));
}
function P(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return I(e, t, r, n);
	x((r) => I(e, t(), r, n), r);
}
function Ye(e, t, n, r, i = {}, a = !1) {
	t ||= {};
	for (let r in i) if (!(r in t)) {
		if (r === "children") continue;
		i[r] = Qe(e, r, null, i[r], n, a, t);
	}
	for (let o in t) {
		if (o === "children") {
			r || I(e, t.children);
			continue;
		}
		let s = t[o];
		i[o] = Qe(e, o, s, i[o], n, a, t);
	}
}
function F(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function Xe(e) {
	return e.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function Ze(e, t, n) {
	let r = t.trim().split(/\s+/);
	for (let t = 0, i = r.length; t < i; t++) e.classList.toggle(r[t], n);
}
function Qe(e, t, n, r, i, a, o) {
	let s, c, l, u, d;
	if (t === "style") return Ge(e, n, r);
	if (t === "classList") return We(e, n, r);
	if (n === r) return r;
	if (t === "ref") a || n(e);
	else if (t.slice(0, 3) === "on:") {
		let i = t.slice(3);
		r && e.removeEventListener(i, r, typeof r != "function" && r), n && e.addEventListener(i, n, typeof n != "function" && n);
	} else if (t.slice(0, 10) === "oncapture:") {
		let i = t.slice(10);
		r && e.removeEventListener(i, r, !0), n && e.addEventListener(i, n, !0);
	} else if (t.slice(0, 2) === "on") {
		let i = t.slice(2).toLowerCase(), a = Ne.has(i);
		if (!a && r) {
			let t = Array.isArray(r) ? r[0] : r;
			e.removeEventListener(i, t);
		}
		(a || n) && (Ue(e, i, n, a), a && ze([i]));
	} else if (t.slice(0, 5) === "attr:") N(e, t.slice(5), n);
	else if (t.slice(0, 5) === "bool:") Ve(e, t.slice(5), n);
	else if ((d = t.slice(0, 5) === "prop:") || (l = ke.has(t)) || !i && ((u = Me(t, e.tagName)) || (c = Oe.has(t))) || (s = e.nodeName.includes("-") || "is" in o)) {
		if (d) t = t.slice(5), c = !0;
		else if (F(e)) return n;
		t === "class" || t === "className" ? He(e, n) : s && !c && !l ? e[Xe(t)] = n : e[u || t] = n;
	} else {
		let r = i && t.indexOf(":") > -1 && Pe[t.split(":")[0]];
		r ? Be(e, r, t, n) : N(e, Ae[t] || t, n);
	}
	return n;
}
function $e(t) {
	if (e.registry && e.events && e.events.find(([e, n]) => n === t)) return;
	let n = t.target, r = `$$${t.type}`, i = t.target, a = t.currentTarget, o = (e) => Object.defineProperty(t, "target", {
		configurable: !0,
		value: e
	}), s = () => {
		let e = n[r];
		if (e && !n.disabled) {
			let i = n[`${r}Data`];
			if (i === void 0 ? e.call(n, t) : e.call(n, i, t), t.cancelBubble) return;
		}
		return n.host && typeof n.host != "string" && !n.host._$host && n.contains(t.target) && o(n.host), !0;
	}, c = () => {
		for (; s() && (n = n._$host || n.parentNode || n.host););
	};
	if (Object.defineProperty(t, "currentTarget", {
		configurable: !0,
		get() {
			return n || document;
		}
	}), e.registry && !e.done && (e.done = _$HY.done = !0), t.composedPath) {
		let e = t.composedPath();
		o(e[0]);
		for (let t = 0; t < e.length - 2 && (n = e[t], s()); t++) {
			if (n._$host) {
				n = n._$host, c();
				break;
			}
			if (n.parentNode === a) break;
		}
	} else c();
	o(i);
}
function I(e, t, n, r, i) {
	let a = F(e);
	if (a) {
		!n && (n = [...e.childNodes]);
		let t = [];
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			r.nodeType === 8 && r.data.slice(0, 2) === "!$" ? r.remove() : t.push(r);
		}
		n = t;
	}
	for (; typeof n == "function";) n = n();
	if (t === n) return n;
	let o = typeof t, s = r !== void 0;
	if (e = s && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
		if (a || o === "number" && (t = t.toString(), t === n)) return n;
		if (s) {
			let i = n[0];
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = R(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = R(e, n, r);
	} else if (o === "function") return x(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = I(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (L(o, t, n, i)) return x(() => n = I(e, o, n, r, !0)), () => n;
		if (a) {
			if (!o.length) return n;
			if (r === void 0) return n = [...e.childNodes];
			let t = o[0];
			if (t.parentNode !== e) return n;
			let i = [t];
			for (; (t = t.nextSibling) !== r;) i.push(t);
			return n = i;
		}
		if (o.length === 0) {
			if (n = R(e, n, r), s) return n;
		} else c ? n.length === 0 ? et(e, o, r) : Ie(e, n, o) : (n && R(e), et(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = R(e, n, r, t);
			R(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function L(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (o != null && o !== !0 && o !== !1) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = L(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = L(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function et(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function R(e, t, n, r) {
	if (n === void 0) return e.textContent = "";
	let i = r || document.createTextNode("");
	if (t.length) {
		let r = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (i !== o) {
				let t = o.parentNode === e;
				!r && !a ? t ? e.replaceChild(i, o) : e.insertBefore(i, n) : t && o.remove();
			} else r = !0;
		}
	} else e.insertBefore(i, n);
	return [i];
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function tt(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function nt(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				tt(e);
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
//#region ../../../node_modules/.pnpm/wafer-host@0.0.6_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function rt(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/audio/effects.ts
function it(e, t, n) {
	let r = e.sampleRate, i = Math.floor(r * t), a = e.createBuffer(2, i, r);
	for (let e = 0; e < 2; e++) {
		let t = a.getChannelData(e);
		for (let e = 0; e < i; e++) t[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n;
	}
	return a;
}
function at(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createGain();
	r.gain.value = 1, i.gain.value = 0;
	let a = e.createDelay(.05), o = e.createDelay(.05);
	a.delayTime.value = .012, o.delayTime.value = .018;
	let s = e.createOscillator(), c = e.createOscillator(), l = e.createGain(), u = e.createGain();
	s.type = "sine", c.type = "sine", s.frequency.value = .7, c.frequency.value = 1, l.gain.value = .003, u.gain.value = .003, s.connect(l), c.connect(u), l.connect(a.delayTime), u.connect(o.delayTime), s.start(), c.start();
	let d = e.createChannelMerger(2);
	return t.connect(r), t.connect(a), t.connect(o), a.connect(d, 0, 0), o.connect(d, 0, 1), d.connect(i), r.connect(n), i.connect(n), {
		inputNode: t,
		outputNode: n,
		updateWet(e) {
			i.gain.value = e * .6, l.gain.value = e * .005, u.gain.value = e * .005;
		},
		cleanup() {
			s.stop(), c.stop(), s.disconnect(), c.disconnect(), l.disconnect(), u.disconnect(), a.disconnect(), o.disconnect(), r.disconnect(), i.disconnect(), t.disconnect();
		}
	};
}
function ot(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createConvolver();
	r.buffer = it(e, 2.5, 1.8);
	let i = e.createGain(), a = e.createGain();
	return i.gain.value = 1, a.gain.value = 0, t.connect(i), t.connect(r), r.connect(a), i.connect(n), a.connect(n), {
		inputNode: t,
		outputNode: n,
		updateWet(e) {
			a.gain.value = e * .8;
		},
		cleanup() {
			r.disconnect(), i.disconnect(), a.disconnect(), t.disconnect();
		}
	};
}
function st(e) {
	let t = e.createGain(), n = e.createWaveShaper(), r = 1024, i = new Float32Array(r);
	for (let e = 0; e < r; e++) {
		let t = e * 2 / r - 1;
		i[e] = (Math.PI + 2) * t / (Math.PI + 2 * Math.abs(t));
	}
	return n.curve = i, n.oversample = "4x", t.connect(n), {
		inputNode: t,
		outputNode: n,
		cleanup() {
			n.disconnect();
		}
	};
}
function ct(e) {
	let t = e.createGain(), n = e.createGain();
	n.gain.value = .8;
	let r = at(e), i = ot(e), a = st(e);
	return t.connect(r.inputNode), r.outputNode.connect(i.inputNode), i.outputNode.connect(a.inputNode), a.outputNode.connect(n), {
		inputNode: t,
		outputNode: n,
		updateParams(t) {
			r.updateWet(t.chorus), i.updateWet(t.reverb), n.gain.setValueAtTime(t.masterVolume, e.currentTime);
		},
		cleanup() {
			r.outputNode.disconnect(), i.outputNode.disconnect(), a.outputNode.disconnect(), r.cleanup(), i.cleanup(), a.cleanup(), t.disconnect();
		}
	};
}
//#endregion
//#region src/audio/synth-params.ts
var lt = {
	0: "Saw",
	1: "Sqr",
	2: "Tri",
	3: "Sin"
}, ut = {
	oscWave: 0,
	oscDetune: 0,
	subLevel: 0,
	drift: 0,
	chorus: 0,
	reverb: 0,
	filterCutoff: 1,
	filterPeak: 0,
	filterEnvMod: 0,
	ampDecay: 1,
	ampRelease: 0,
	masterVolume: .8
}, z = [
	"Init",
	"Bass1",
	"Bass2",
	"Lead1",
	"Lead2",
	"Pad1",
	"Pad2"
], dt = {
	Init: { ...ut },
	Bass1: {
		oscWave: 0,
		oscDetune: .15,
		subLevel: .3,
		drift: .2,
		chorus: 0,
		reverb: 0,
		filterCutoff: .63,
		filterPeak: .5,
		filterEnvMod: .79,
		ampDecay: .55,
		ampRelease: .1,
		masterVolume: .8
	},
	Bass2: {
		oscWave: 1,
		oscDetune: 0,
		subLevel: .5,
		drift: .1,
		chorus: 0,
		reverb: .1,
		filterCutoff: .4,
		filterPeak: .3,
		filterEnvMod: .4,
		ampDecay: .66,
		ampRelease: .15,
		masterVolume: .8
	},
	Lead1: {
		oscWave: 0,
		oscDetune: .25,
		subLevel: 0,
		drift: .3,
		chorus: .35,
		reverb: .2,
		filterCutoff: .7,
		filterPeak: .4,
		filterEnvMod: .5,
		ampDecay: .6,
		ampRelease: .3,
		masterVolume: .75
	},
	Lead2: {
		oscWave: 1,
		oscDetune: 0,
		subLevel: .2,
		drift: .1,
		chorus: .2,
		reverb: .1,
		filterCutoff: .75,
		filterPeak: .55,
		filterEnvMod: .35,
		ampDecay: .55,
		ampRelease: .2,
		masterVolume: .75
	},
	Pad1: {
		oscWave: 0,
		oscDetune: .4,
		subLevel: .2,
		drift: .4,
		chorus: .65,
		reverb: .7,
		filterCutoff: .5,
		filterPeak: .15,
		filterEnvMod: .1,
		ampDecay: 1,
		ampRelease: .7,
		masterVolume: .7
	},
	Pad2: {
		oscWave: 2,
		oscDetune: .3,
		subLevel: .45,
		drift: .5,
		chorus: .5,
		reverb: .8,
		filterCutoff: .4,
		filterPeak: .1,
		filterEnvMod: .2,
		ampDecay: 1,
		ampRelease: .8,
		masterVolume: .7
	}
};
//#endregion
//#region src/audio/voice.ts
function ft(e) {
	return 80 * 125 ** e;
}
function pt(e) {
	let t = e, n = t.createOscillator(), r = t.createOscillator(), i = t.createOscillator();
	i.type = "triangle";
	let a = t.createGain(), o = t.createGain(), s = t.createGain();
	a.gain.value = 1, o.gain.value = 0, s.gain.value = 0;
	let c = t.createGain();
	c.gain.value = .4;
	let l = t.createOscillator(), u = t.createGain();
	l.type = "sine", l.frequency.value = .07 + Math.random() * .25, u.gain.value = 0, l.connect(u), u.connect(n.detune), u.connect(r.detune), u.connect(i.detune);
	let d = t.createBiquadFilter();
	d.type = "lowpass", d.frequency.value = 8e3, d.Q.value = 1;
	let f = t.createGain();
	f.gain.value = 0;
	let p = t.createGain();
	p.gain.value = 1, n.connect(a), r.connect(o), i.connect(s), a.connect(c), o.connect(c), s.connect(c), c.connect(d), d.connect(f), f.connect(p), l.start(), n.start(), r.start(), i.start();
	let m = 261.63;
	function h(e) {
		return [
			"sawtooth",
			"square",
			"triangle",
			"sine"
		][e] ?? "sawtooth";
	}
	function g(e, i) {
		let a = i ?? t.currentTime;
		n.type = h(e.oscWave), r.type = h(e.oscWave);
		let c = e.oscDetune * 50;
		e.oscDetune > 0 ? (o.gain.setValueAtTime(1, a), n.detune.cancelScheduledValues(a), n.detune.setValueAtTime(-c / 2, a), r.detune.cancelScheduledValues(a), r.detune.setValueAtTime(c / 2, a)) : (o.gain.setValueAtTime(0, a), n.detune.cancelScheduledValues(a), n.detune.setValueAtTime(0, a), r.detune.cancelScheduledValues(a), r.detune.setValueAtTime(0, a)), s.gain.setValueAtTime(e.subLevel, a), u.gain.setValueAtTime(e.drift * 30, a);
	}
	function _(e, a, o = 1, s) {
		m = e;
		let c = s ?? t.currentTime, l = .003;
		g(a, c), n.frequency.setValueAtTime(e, c), r.frequency.setValueAtTime(e, c), i.frequency.setValueAtTime(e / 2, c);
		let u = ft(a.filterCutoff), p = Math.min(e / 261.63 * u, t.sampleRate / 2 - 100);
		d.frequency.cancelScheduledValues(c), d.frequency.setValueAtTime(Math.max(p, 20), c), d.Q.cancelScheduledValues(c), d.Q.setValueAtTime(.5 + a.filterPeak * 20, c);
		let h = a.filterEnvMod * 4800;
		if (d.detune.cancelScheduledValues(c), h > .1) {
			let e = a.ampDecay < 1 ? .05 + a.ampDecay * 1.95 : 4;
			d.detune.setValueAtTime(h, c), d.detune.exponentialRampToValueAtTime(.5, c + l + e);
		} else d.detune.setValueAtTime(0, c);
		if (f.gain.cancelScheduledValues(c), f.gain.setValueAtTime(1e-4, c), f.gain.linearRampToValueAtTime(o, c + l), a.ampDecay < 1) {
			let e = .05 + a.ampDecay * 1.95;
			f.gain.exponentialRampToValueAtTime(1e-4, c + l + e);
		}
	}
	function v(e, n) {
		let r = n ?? t.currentTime, i = .05 + e.ampRelease * 1.95, a = f.gain.value;
		f.gain.cancelScheduledValues(r), f.gain.setValueAtTime(Math.max(a, 1e-4), r), f.gain.exponentialRampToValueAtTime(1e-4, r + i);
	}
	function y(e) {
		g(e);
		let n = ft(e.filterCutoff), r = Math.min(m / 261.63 * n, t.sampleRate / 2 - 100);
		d.frequency.setValueAtTime(Math.max(r, 20), t.currentTime), d.Q.setValueAtTime(.5 + e.filterPeak * 20, t.currentTime);
	}
	function b() {
		let e = t.currentTime, n = f.gain.value;
		f.gain.cancelScheduledValues(e), f.gain.setValueAtTime(Math.max(n, 1e-4), e), f.gain.exponentialRampToValueAtTime(1e-4, e + .02);
	}
	return {
		outputNode: p,
		noteOn: _,
		noteOff: v,
		updateParams: y,
		forceStop: b
	};
}
//#endregion
//#region src/audio/audio-engine.ts
var B = rt("wafer-v01", import.meta.url);
function mt(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
var ht = 6;
function gt() {
	let e = B?.audioContext ?? new AudioContext(), t = B?.audioOutputNode ?? e.destination, n = ct(e);
	n.outputNode.connect(t);
	let r = Array.from({ length: ht }, () => ({
		voice: pt(e),
		midiNote: -1,
		startTime: 0,
		state: "idle"
	}));
	for (let e of r) e.voice.outputNode.connect(n.inputNode);
	let i = /* @__PURE__ */ new Map(), a = { ...ut };
	function o() {
		!(e instanceof OfflineAudioContext) && e.state === "suspended" && e.resume();
	}
	function s() {
		let e = r.find((e) => e.state === "idle");
		if (e) return e;
		let t = r.find((e) => e.state === "releasing");
		if (t) return t.voice.forceStop(), t;
		let n = r[0];
		for (let e of r) e.startTime < n.startTime && (n = e);
		return i.delete(n.midiNote), n.voice.forceStop(), n;
	}
	function c(e, t, n) {
		o();
		let r = i.get(e);
		r && (r.state = "idle", i.delete(e));
		let c = s(), l = mt(e);
		c.voice.noteOn(l, a, n, t), c.midiNote = e, c.startTime = t, c.state = "playing", i.set(e, c);
	}
	function l(t, n) {
		let r = i.get(t);
		if (!r) return;
		r.voice.noteOff(a, n), r.state = "releasing", i.delete(t);
		let o = (.05 + a.ampRelease * 1.95 + .2) * 1e3, s = (n - e.currentTime) * 1e3 + o, c = r;
		setTimeout(() => {
			c.state === "releasing" && (c.state = "idle");
		}, Math.max(0, s));
	}
	function u(e) {
		a = { ...e }, n.updateParams(e);
		for (let t of r) t.voice.updateParams(e);
	}
	return {
		noteOn: c,
		noteOff: l,
		updateParams: u,
		cleanup() {
			n.outputNode.disconnect(), n.cleanup();
		}
	};
}
//#endregion
//#region src/components/param-slider.tsx
var _t = /*#__PURE__*/ M("<div class=\"flex-ha gap-2 w-full px-3\"><span class=\"text-xs text-neutral-400 shrink-0\"style=width:50px;text-align:left></span><input type=range class=\"synth-slider flex-1\"><span class=\"text-xs text-neutral-200 shrink-0 font-mono\"style=width:30px;text-align:right>"), vt = (e) => {
	let t = () => `${((e.value - e.min) / (e.max - e.min) * 100).toFixed(1)}%`, n = () => e.formatValue ? e.formatValue(e.value) : e.value.toFixed(2);
	return (() => {
		var r = _t(), i = r.firstChild, a = i.nextSibling, o = a.nextSibling;
		return P(i, () => e.label), a.$$input = (t) => e.onChange(Number.parseFloat(t.currentTarget.value)), P(o, n), x((n) => {
			var r = e.min, i = e.max, o = e.step, s = t();
			return r !== n.e && N(a, "min", n.e = r), i !== n.t && N(a, "max", n.t = i), o !== n.a && N(a, "step", n.a = o), s !== n.o && Ke(a, "--slider-fill", n.o = s), n;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0
		}), x(() => a.value = e.value), r;
	})();
};
ze(["input"]);
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/store/dist/store.js
var V = Symbol("store-raw"), H = Symbol("store-node"), U = Symbol("store-has"), yt = Symbol("store-self");
function bt(e) {
	let t = e[i];
	if (!t && (Object.defineProperty(e, i, { value: t = new Proxy(e, wt) }), !Array.isArray(e))) {
		let n = Object.keys(e), r = Object.getOwnPropertyDescriptors(e), i = Object.getPrototypeOf(e), a = i !== null && typeof e == "object" && !!e && !Array.isArray(e) && i !== Object.prototype;
		if (a) {
			let e = Object.getOwnPropertyDescriptors(i);
			n.push(...Object.keys(e)), Object.assign(r, e);
		}
		for (let i = 0, o = n.length; i < o; i++) {
			let o = n[i];
			a && o === "constructor" || r[o].get && Object.defineProperty(e, o, {
				configurable: !0,
				enumerable: r[o].enumerable,
				get: r[o].get.bind(t)
			});
		}
	}
	return t;
}
function W(e) {
	let t;
	return typeof e == "object" && !!e && (e[i] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function G(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[V]) return n;
	if (!W(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = G(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = G(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function K(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function q(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = b(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function xt(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === i || t === H ? n : (delete n.value, delete n.writable, n.get = () => e[i][t], n);
}
function St(e) {
	ie() && q(K(e, H), yt)();
}
function Ct(e) {
	return St(e), Reflect.ownKeys(e);
}
var wt = {
	get(e, t, n) {
		if (t === V) return e;
		if (t === i) return n;
		if (t === o) return St(e), n;
		let r = K(e, H), a = r[t], s = a ? a() : e[t];
		if (t === H || t === U || t === "__proto__") return s;
		if (!a) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ie() && (typeof s != "function" || Object.prototype.hasOwnProperty.call(e, t)) && !(n && n.get) && (s = q(r, t, s)());
		}
		return W(s) ? bt(s) : s;
	},
	has(e, t) {
		return t === V || t === i || t === o || t === H || t === U || t === "__proto__" || (ie() && q(K(e, U), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: Ct,
	getOwnPropertyDescriptor: xt
};
function J(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[U] && e[U][t] && i !== void 0 && e[U][t].$()) : (e[t] = n, e[U] && e[U][t] && i === void 0 && e[U][t].$());
	let o = K(e, H), s;
	if ((s = q(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = q(o, "length", a)) && s.$(e.length);
	}
	(s = o[yt]) && s.$();
}
function Tt(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Et(i) || J(e, i, t[i]);
	}
}
function Et(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Dt(e, t) {
	if (typeof t == "function" && (t = t(e)), t = G(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && J(e, n, r);
		}
		J(e, "length", r);
	} else Tt(e, t);
}
function Y(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Et(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) Y(e, [r[i]].concat(t), n);
			return;
		}
		if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && Y(e, [i].concat(t), n);
			return;
		}
		if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) Y(e, [r].concat(t), n);
			return;
		}
		if (t.length > 1) {
			Y(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || (r !== void 0 || a != null) && (a = G(a), r === void 0 || W(i) && W(a) && !Array.isArray(a) ? Tt(i, a) : J(e, r, a));
}
function Ot(...[e, t]) {
	let n = G(e || {}), r = Array.isArray(n), i = bt(n);
	function a(...e) {
		te(() => {
			r && e.length === 1 ? Dt(n, e[0]) : Y(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/store/app-store.ts
var [X, Z] = Ot({
	currentPresetIndex: 0,
	parameters: { ...ut }
}), Q = null;
function kt() {
	return Q || (Q = gt(), Q.updateParams(X.parameters)), Q;
}
function At() {
	Q &&= (Q.cleanup(), null);
}
var $ = {
	setParameter(e, t) {
		Z("parameters", (n) => ({
			...n,
			[e]: t
		})), Q?.updateParams(X.parameters);
	},
	selectPreset(e) {
		let t = dt[z[e]];
		t && (Z("currentPresetIndex", e), Z("parameters", { ...t }), Q?.updateParams(t));
	},
	prevPreset() {
		let e = (X.currentPresetIndex - 1 + z.length) % z.length;
		$.selectPreset(e);
	},
	nextPreset() {
		let e = (X.currentPresetIndex + 1) % z.length;
		$.selectPreset(e);
	},
	noteOn(e, t, n) {
		kt().noteOn(e, t, n);
	},
	noteOff(e, t) {
		Q?.noteOff(e, t);
	},
	loadState(e) {
		Z("currentPresetIndex", e.currentPresetIndex), Z("parameters", e.parameters), Q?.updateParams(e.parameters);
	}
}, jt = /*#__PURE__*/ M("<div class=\"flex-v flex-1 justify-around py-2\">"), Mt = [
	{
		label: "Wave",
		key: "oscWave",
		min: 0,
		max: 3,
		step: 1,
		formatValue: (e) => lt[Math.round(e)] ?? "Saw"
	},
	{
		label: "Detune",
		key: "oscDetune",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Sub",
		key: "subLevel",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Drift",
		key: "drift",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Chorus",
		key: "chorus",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Reverb",
		key: "reverb",
		min: 0,
		max: 1,
		step: .001
	}
], Nt = [
	{
		label: "Cutoff",
		key: "filterCutoff",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Peak",
		key: "filterPeak",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "EnvMod",
		key: "filterEnvMod",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Decay",
		key: "ampDecay",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Release",
		key: "ampRelease",
		min: 0,
		max: 1,
		step: .001
	},
	{
		label: "Master",
		key: "masterVolume",
		min: 0,
		max: 1,
		step: .001
	}
], Pt = (e) => (() => {
	var t = jt();
	return P(t, A(De, {
		get each() {
			return e.params;
		},
		children: (e) => A(vt, {
			get label() {
				return e.label;
			},
			get value() {
				return X.parameters[e.key];
			},
			get min() {
				return e.min;
			},
			get max() {
				return e.max;
			},
			get step() {
				return e.step;
			},
			get formatValue() {
				return e.formatValue;
			},
			onChange: (t) => $.setParameter(e.key, e.step === 1 ? Math.round(t) : t)
		})
	})), t;
})(), Ft = /*#__PURE__*/ M("<div class=\"flex-h flex-1 overflow-hidden\"><div class=\"flex-v flex-1 border-r border-neutral-700\"></div><div class=\"flex-v flex-1\">"), It = () => (() => {
	var e = Ft(), t = e.firstChild, n = t.nextSibling;
	return P(t, A(Pt, { params: Mt })), P(n, A(Pt, { params: Nt })), e;
})(), Lt = /*#__PURE__*/ M("<svg>");
function Rt(e, t) {
	return (() => {
		var n = Lt();
		return qe(n, Ee(() => e.a, t, {
			get color() {
				return t.color || "currentColor";
			},
			get height() {
				return t.size || "1em";
			},
			get width() {
				return t.size || "1em";
			},
			xmlns: "http://www.w3.org/2000/svg",
			get style() {
				return {
					...typeof t.style == "object" ? t.style : {},
					overflow: "visible"
				};
			},
			get innerHTML() {
				return Fe(() => !!t.title)() ? `${e.c}<title>${t.title}</title>` : e.c;
			},
			src: void 0
		}), !0, !1), n;
	})();
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.14/node_modules/solid-icons/hi/index.js
function zt(e) {
	return Rt({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function Bt(e) {
	return Rt({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
//#endregion
//#region src/components/icons.tsx
var Vt = {
	Left: zt,
	Right: Bt
}, Ht = /*#__PURE__*/ M("<div class=\"flex-ha justify-center gap-2 h-full px-3 py-2\"><button type=button class=\"flex-c text-cyan-400 hover:text-cyan-200 px-4 py-2 border border-neutral-700 cursor-pointer\"></button><div class=flex-c style=min-width:180px><select class=\"synth-select w-full h-[40px]\"></select></div><button type=button class=\"flex-c text-cyan-400 hover:text-cyan-200 px-4 py-2 border border-neutral-700 cursor-pointer\">"), Ut = /*#__PURE__*/ M("<option>"), Wt = () => {
	let e = (e) => {
		let t = parseInt(e.target.value, 10);
		$.selectPreset(t);
	};
	return (() => {
		var t = Ht(), n = t.firstChild, r = n.nextSibling, i = r.firstChild, a = r.nextSibling;
		return n.$$click = () => $.prevPreset(), P(n, A(Vt.Left, { size: 20 })), i.addEventListener("change", e), P(i, () => z.map((e, t) => (() => {
			var n = Ut();
			return P(n, e), x(() => n.value = String(t)), n;
		})())), a.$$click = () => $.nextPreset(), P(a, A(Vt.Right, { size: 20 })), x(() => i.value = String(X.currentPresetIndex)), t;
	})();
};
ze(["click"]);
//#endregion
//#region src/sections/top-section.tsx
var Gt = /*#__PURE__*/ M("<div class=\"flex-ha w-full shrink-0 bg-neutral-800 border-b border-neutral-700\"style=height:54px><div class=\"flex-c shrink-0 border-r border-neutral-700 h-full px-4 w-[140px]\"><span class=\"text-cyan-400 uppercase font-bold\"style=font-size:0.7rem;letter-spacing:0.2em>Mini-Synth</span></div><div class=\"flex-1 flex-c h-full\"></div><div class=w-[140px]>"), Kt = () => (() => {
	var e = Gt(), t = e.firstChild;
	t.firstChild;
	var n = t.nextSibling;
	return P(n, A(Wt, {})), e;
})();
//#endregion
//#region src/store/persistence.ts
function qt(e) {
	return e * 255 >>> 0;
}
function Jt(e) {
	return e / 255;
}
var Yt = {
	serializeParameters(e) {
		let t = e;
		return [t.oscWave, ...[
			t.oscDetune,
			t.subLevel,
			t.drift,
			t.chorus,
			t.reverb,
			t.filterCutoff,
			t.filterPeak,
			t.filterEnvMod,
			t.ampDecay,
			t.ampRelease,
			t.masterVolume
		].map(qt)];
	},
	deserializeParameters(e) {
		let t = e.map(Jt);
		return {
			oscWave: e[0],
			oscDetune: t[1],
			subLevel: t[2],
			drift: t[3],
			chorus: t[4],
			reverb: t[5],
			filterCutoff: t[6],
			filterPeak: t[7],
			filterEnvMod: t[8],
			ampDecay: t[9],
			ampRelease: t[10],
			masterVolume: t[11]
		};
	}
}, Xt = 1, Zt = {
	emitStateBytes() {
		let { currentPresetIndex: e, parameters: t } = X, n = Yt.serializeParameters(t);
		return new Uint8Array([
			Xt,
			e,
			...n
		]);
	},
	applyStateBytes(e) {
		if (e.length === 14 && e[0] === Xt) {
			let t = e[1], n = Yt.deserializeParameters([...e.slice(2)]);
			$.loadState({
				currentPresetIndex: t,
				parameters: n
			});
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function Qt(e, t) {
	let n = {
		onStateChange() {
			let n = e.connection === "open";
			t.connectionStateCallback?.(n), console.log(n ? `midi input opened: ${e.name}` : "midi input closed");
		},
		onMidiMessage(e) {
			if (!e.data) return;
			let [n, r, i] = e.data, a = n & 240;
			if (a === 144 && i > 0) {
				let [e, n] = [r, i];
				t.noteOn?.(e, n / 127);
			} else if (a === 128 || a === 144 && i === 0) {
				let e = r;
				t.noteOff?.(e);
			} else console.log(n, r, i);
		}
	};
	return {
		open() {
			e.addEventListener("statechange", n.onStateChange), e.addEventListener("midimessage", n.onMidiMessage);
		},
		close() {
			e.removeEventListener("statechange", n.onStateChange), e.removeEventListener("midimessage", n.onMidiMessage), e.close();
		}
	};
}
async function $t() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function en(e) {
	let t, n = !1;
	return (async () => {
		let r = await $t();
		n || r && (t = Qt(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/app.tsx
var tn = /*#__PURE__*/ M("<div class=\"flex-v bg-neutral-900 text-white overflow-hidden\"style=width:640px;height:320px>");
function nn() {
	return ne(() => {
		B ? B.completeSetup({
			unitAspects: {
				unitType: "instrument",
				categoryHint: "synthesizer",
				viewSize: [640, 320]
			},
			noteInput: {
				noteOn(e, t) {
					$.noteOn(e, t ?? 0, 1);
				},
				noteOff(e, t) {
					$.noteOff(e, t ?? 0);
				}
			},
			persistence: Zt,
			cleanup: At
		}) : re(en({
			noteOn: (e) => $.noteOn(e, 0, 1),
			noteOff: (e) => $.noteOff(e, 0)
		}));
	}), (() => {
		var e = tn();
		return P(e, A(Kt, {}), null), P(e, A(It, {}), null), e;
	})();
}
var rn = nt((e) => Re(() => A(nn, {}), e), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-font-weight:initial;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-cyan-200:oklch(91.7% .08 205.041);--color-cyan-400:oklch(78.9% .154 211.53);--color-neutral-200:oklch(92.2% 0 none);--color-neutral-400:oklch(70.8% 0 none);--color-neutral-700:oklch(37.1% 0 none);--color-neutral-800:oklch(26.9% 0 none);--color-neutral-900:oklch(20.5% 0 none);--color-white:#fff;--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--font-weight-bold:700;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.relative{position:relative}.h-\\[40px\\]{height:40px}.h-full{height:100%}.w-\\[140px\\]{width:140px}.w-full{width:100%}.flex-1{flex:1}.shrink-0{flex-shrink:0}.cursor-pointer{cursor:pointer}.justify-around{justify-content:space-around}.justify-center{justify-content:center}.gap-2{gap:calc(var(--spacing) * 2)}.overflow-hidden{overflow:hidden}.border{border-style:var(--tw-border-style);border-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-neutral-700{border-color:var(--color-neutral-700)}.bg-neutral-800{background-color:var(--color-neutral-800)}.bg-neutral-900{background-color:var(--color-neutral-900)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.py-2{padding-block:calc(var(--spacing) * 2)}.font-mono{font-family:var(--font-mono)}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.text-cyan-400{color:var(--color-cyan-400)}.text-neutral-200{color:var(--color-neutral-200)}.text-neutral-400{color:var(--color-neutral-400)}.text-white{color:var(--color-white)}.uppercase{text-transform:uppercase}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}@media (hover:hover){.hover\\:text-cyan-200:hover{color:var(--color-cyan-200)}}}:host{-webkit-user-select:none;user-select:none;font-family:Orbitron,sans-serif}body{background:#0a0a0a;justify-content:center;align-items:center;min-height:100vh;display:flex}.synth-slider{--slider-fill:50%;appearance:none;cursor:pointer;background:linear-gradient(to right, #22d3ee var(--slider-fill), #374151 var(--slider-fill));border-radius:0;outline:none;width:100%;height:3px}.synth-slider::-webkit-slider-thumb{appearance:none;cursor:pointer;background:#e2e8f0;border:none;border-radius:0;width:8px;height:18px}.synth-slider::-moz-range-thumb{cursor:pointer;background:#e2e8f0;border:none;border-radius:0;width:8px;height:18px}.synth-slider::-webkit-slider-runnable-track{border-radius:0}.synth-select{appearance:none;color:#e2e8f0;cursor:pointer;text-align:center;letter-spacing:.1em;background:0 0;border:1px solid #4b5563;border-radius:0;outline:none;padding:4px 20px 4px 12px;font-family:Orbitron,sans-serif;font-size:.9rem}.synth-select:focus{border-color:#22d3ee}.synth-select option{color:#e2e8f0;background:#1f2937}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Orbitron:wght@400..700&display=swap"]
});
//#endregion
export { rn as default };
