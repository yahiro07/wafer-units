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
		return e.pure && (m && m.running ? (e.tState = u, e.tOwned && e.tOwned.forEach(O), e.tOwned = void 0) : (e.state = u, e.owned && e.owned.forEach(O), e.owned = null)), e.updatedAt = n + 1, be(t);
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
		n || (_ = null), g = null, be(e);
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
		be(e, n && n.owner || null);
	}
}
function be(e, t = p) {
	let n = c && t && t.context && t.context[c], r = ve(e);
	if (!n) throw r;
	_ ? _.push({
		fn() {
			ye(r, n, t);
		},
		state: u
	}) : ye(r, n, t);
}
function k(e, t) {
	return C(() => e(t || {}));
}
function A() {
	return !0;
}
var xe = {
	get(e, t, n) {
		return t === i ? n : e.get(t);
	},
	has(e, t) {
		return t === i || e.has(t);
	},
	set: A,
	deleteProperty: A,
	getOwnPropertyDescriptor(e, t) {
		return {
			configurable: !0,
			enumerable: !0,
			get() {
				return e.get(t);
			},
			set: A,
			deleteProperty: A
		};
	},
	ownKeys(e) {
		return e.keys();
	}
};
function j(e) {
	return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Se() {
	for (let e = 0, t = this.length; e < t; ++e) {
		let t = this[e]();
		if (t !== void 0) return t;
	}
}
function Ce(...e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t ||= !!r && i in r, e[n] = typeof r == "function" ? (t = !0, S(r)) : r;
	}
	if (a && t) return new Proxy({
		get(t) {
			for (let n = e.length - 1; n >= 0; n--) {
				let r = j(e[n])[t];
				if (r !== void 0) return r;
			}
		},
		has(t) {
			for (let n = e.length - 1; n >= 0; n--) if (t in j(e[n])) return !0;
			return !1;
		},
		keys() {
			let t = [];
			for (let n = 0; n < e.length; n++) t.push(...Object.keys(j(e[n])));
			return [...new Set(t)];
		}
	}, xe);
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
				get: Se.bind(n[t] = [o.get.bind(i)])
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
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/web/dist/web.js
var we = /*#__PURE__*/ new Set([
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
]), Te = /*#__PURE__*/ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]), Ee = /*#__PURE__*/ Object.assign(Object.create(null), {
	className: "class",
	htmlFor: "for"
}), De = /*#__PURE__*/ Object.assign(Object.create(null), {
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
function Oe(e, t) {
	let n = De[e];
	return typeof n == "object" ? n[t] ? n.$ : void 0 : n;
}
var ke = /*#__PURE__*/ new Set([
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
]), Ae = {
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
}, je = (e) => S(() => e());
function Me(e, t, n) {
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
var Ne = "_$DX_DELEGATE";
function Pe(e, t, n, r = {}) {
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
function Fe(e, t = window.document) {
	let n = t[Ne] || (t[Ne] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, Je));
	}
}
function N(e, t, n) {
	F(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ie(e, t, n, r) {
	F(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function Le(e, t, n) {
	F(e) || (n ? e.setAttribute(t, "") : e.removeAttribute(t));
}
function Re(e, t) {
	F(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function ze(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function Be(e, t, n = {}) {
	let r = Object.keys(t || {}), i = Object.keys(n), a, o;
	for (a = 0, o = i.length; a < o; a++) {
		let r = i[a];
		!r || r === "undefined" || t[r] || (Ke(e, r, !1), delete n[r]);
	}
	for (a = 0, o = r.length; a < o; a++) {
		let i = r[a], o = !!t[i];
		!i || i === "undefined" || n[i] === o || !o || (Ke(e, i, !0), n[i] = o);
	}
	return n;
}
function Ve(e, t, n) {
	if (!t) return n ? N(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function He(e, t = {}, n, r) {
	let i = {};
	return r || x(() => i.children = I(e, t.children, i.children)), x(() => typeof t.ref == "function" && Ue(t.ref, e)), x(() => We(e, t, n, !0, i, !0)), i;
}
function Ue(e, t, n) {
	return C(() => e(t, n));
}
function P(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return I(e, t, r, n);
	x((r) => I(e, t(), r, n), r);
}
function We(e, t, n, r, i = {}, a = !1) {
	t ||= {};
	for (let r in i) if (!(r in t)) {
		if (r === "children") continue;
		i[r] = qe(e, r, null, i[r], n, a, t);
	}
	for (let o in t) {
		if (o === "children") {
			r || I(e, t.children);
			continue;
		}
		let s = t[o];
		i[o] = qe(e, o, s, i[o], n, a, t);
	}
}
function F(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function Ge(e) {
	return e.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function Ke(e, t, n) {
	let r = t.trim().split(/\s+/);
	for (let t = 0, i = r.length; t < i; t++) e.classList.toggle(r[t], n);
}
function qe(e, t, n, r, i, a, o) {
	let s, c, l, u, d;
	if (t === "style") return Ve(e, n, r);
	if (t === "classList") return Be(e, n, r);
	if (n === r) return r;
	if (t === "ref") a || n(e);
	else if (t.slice(0, 3) === "on:") {
		let i = t.slice(3);
		r && e.removeEventListener(i, r, typeof r != "function" && r), n && e.addEventListener(i, n, typeof n != "function" && n);
	} else if (t.slice(0, 10) === "oncapture:") {
		let i = t.slice(10);
		r && e.removeEventListener(i, r, !0), n && e.addEventListener(i, n, !0);
	} else if (t.slice(0, 2) === "on") {
		let i = t.slice(2).toLowerCase(), a = ke.has(i);
		if (!a && r) {
			let t = Array.isArray(r) ? r[0] : r;
			e.removeEventListener(i, t);
		}
		(a || n) && (ze(e, i, n, a), a && Fe([i]));
	} else if (t.slice(0, 5) === "attr:") N(e, t.slice(5), n);
	else if (t.slice(0, 5) === "bool:") Le(e, t.slice(5), n);
	else if ((d = t.slice(0, 5) === "prop:") || (l = Te.has(t)) || !i && ((u = Oe(t, e.tagName)) || (c = we.has(t))) || (s = e.nodeName.includes("-") || "is" in o)) {
		if (d) t = t.slice(5), c = !0;
		else if (F(e)) return n;
		t === "class" || t === "className" ? Re(e, n) : s && !c && !l ? e[Ge(t)] = n : e[u || t] = n;
	} else {
		let r = i && t.indexOf(":") > -1 && Ae[t.split(":")[0]];
		r ? Ie(e, r, t, n) : N(e, Ee[t] || t, n);
	}
	return n;
}
function Je(t) {
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
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = L(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = L(e, n, r);
	} else if (o === "function") return x(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = I(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (Ye(o, t, n, i)) return x(() => n = I(e, o, n, r, !0)), () => n;
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
			if (n = L(e, n, r), s) return n;
		} else c ? n.length === 0 ? Xe(e, o, r) : Me(e, n, o) : (n && L(e), Xe(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = L(e, n, r, t);
			L(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function Ye(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (o != null && o !== !0 && o !== !1) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = Ye(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = Ye(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function Xe(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function L(e, t, n, r) {
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
function Ze(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function Qe(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				Ze(e);
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
function $e(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/store/dist/store.js
var et = Symbol("store-raw"), R = Symbol("store-node"), z = Symbol("store-has"), tt = Symbol("store-self");
function nt(e) {
	let t = e[i];
	if (!t && (Object.defineProperty(e, i, { value: t = new Proxy(e, ot) }), !Array.isArray(e))) {
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
function B(e) {
	let t;
	return typeof e == "object" && !!e && (e[i] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function V(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[et]) return n;
	if (!B(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = V(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = V(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function H(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function U(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = b(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function rt(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === i || t === R ? n : (delete n.value, delete n.writable, n.get = () => e[i][t], n);
}
function it(e) {
	ie() && U(H(e, R), tt)();
}
function at(e) {
	return it(e), Reflect.ownKeys(e);
}
var ot = {
	get(e, t, n) {
		if (t === et) return e;
		if (t === i) return n;
		if (t === o) return it(e), n;
		let r = H(e, R), a = r[t], s = a ? a() : e[t];
		if (t === R || t === z || t === "__proto__") return s;
		if (!a) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ie() && (typeof s != "function" || Object.prototype.hasOwnProperty.call(e, t)) && !(n && n.get) && (s = U(r, t, s)());
		}
		return B(s) ? nt(s) : s;
	},
	has(e, t) {
		return t === et || t === i || t === o || t === R || t === z || t === "__proto__" || (ie() && U(H(e, z), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: at,
	getOwnPropertyDescriptor: rt
};
function W(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[z] && e[z][t] && i !== void 0 && e[z][t].$()) : (e[t] = n, e[z] && e[z][t] && i === void 0 && e[z][t].$());
	let o = H(e, R), s;
	if ((s = U(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = U(o, "length", a)) && s.$(e.length);
	}
	(s = o[tt]) && s.$();
}
function st(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		ct(i) || W(e, i, t[i]);
	}
}
function ct(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function lt(e, t) {
	if (typeof t == "function" && (t = t(e)), t = V(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && W(e, n, r);
		}
		W(e, "length", r);
	} else st(e, t);
}
function G(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && ct(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) G(e, [r[i]].concat(t), n);
			return;
		}
		if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && G(e, [i].concat(t), n);
			return;
		}
		if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) G(e, [r].concat(t), n);
			return;
		}
		if (t.length > 1) {
			G(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || (r !== void 0 || a != null) && (a = V(a), r === void 0 || B(i) && B(a) && !Array.isArray(a) ? st(i, a) : W(e, r, a));
}
function ut(...[e, t]) {
	let n = V(e || {}), r = Array.isArray(n), i = nt(n);
	function a(...e) {
		te(() => {
			r && e.length === 1 ? lt(n, e[0]) : G(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/store/store.ts
var K = {
	Init: {
		oscWave: 0,
		oscDetune: 0,
		oscSub: 0,
		oscDrift: 0,
		fxChorus: 0,
		fxReverb: 0,
		filterCutoff: 1,
		filterPeak: 0,
		filterEnvMod: 0,
		ampDecay: 1,
		ampRelease: .1,
		masterVolume: .8
	},
	Bass1: {
		oscWave: 1,
		oscDetune: 0,
		oscSub: .8,
		oscDrift: 0,
		fxChorus: 0,
		fxReverb: 0,
		filterCutoff: .3,
		filterPeak: .5,
		filterEnvMod: .6,
		ampDecay: .3,
		ampRelease: .1,
		masterVolume: .8
	},
	Bass2: {
		oscWave: 0,
		oscDetune: .2,
		oscSub: .5,
		oscDrift: .1,
		fxChorus: .2,
		fxReverb: .1,
		filterCutoff: .4,
		filterPeak: .3,
		filterEnvMod: .4,
		ampDecay: .4,
		ampRelease: .1,
		masterVolume: .8
	},
	Lead1: {
		oscWave: 0,
		oscDetune: .3,
		oscSub: 0,
		oscDrift: .2,
		fxChorus: .1,
		fxReverb: .4,
		filterCutoff: .8,
		filterPeak: .4,
		filterEnvMod: .2,
		ampDecay: 1,
		ampRelease: .2,
		masterVolume: .8
	},
	Lead2: {
		oscWave: 2,
		oscDetune: 0,
		oscSub: 0,
		oscDrift: .1,
		fxChorus: .3,
		fxReverb: .5,
		filterCutoff: .7,
		filterPeak: .6,
		filterEnvMod: .4,
		ampDecay: .5,
		ampRelease: .4,
		masterVolume: .8
	},
	Pad1: {
		oscWave: 0,
		oscDetune: .8,
		oscSub: .2,
		oscDrift: .5,
		fxChorus: .8,
		fxReverb: .8,
		filterCutoff: .6,
		filterPeak: .2,
		filterEnvMod: .2,
		ampDecay: 1,
		ampRelease: .8,
		masterVolume: .8
	},
	Pad2: {
		oscWave: 1,
		oscDetune: .5,
		oscSub: .4,
		oscDrift: .8,
		fxChorus: .5,
		fxReverb: .9,
		filterCutoff: .4,
		filterPeak: .1,
		filterEnvMod: .2,
		ampDecay: 1,
		ampRelease: .9,
		masterVolume: .8
	}
}, q = Object.keys(K), [J, dt] = ut({
	presetName: "Init",
	parameters: { ...K.Init }
});
//#endregion
//#region src/audio/chorus.ts
function ft(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createGain(), a = e.createDelay();
	a.delayTime.value = .02;
	let o = e.createOscillator();
	o.type = "sine", o.frequency.value = 1.5;
	let s = e.createGain();
	return s.gain.value = .005, o.connect(s), s.connect(a.delayTime), o.start(), t.connect(r), t.connect(a), a.connect(i), r.connect(n), i.connect(n), {
		inputNode: t,
		outputNode: n,
		updateNodeParameters(e) {
			let t = e.fxChorus;
			i.gain.value = t, r.gain.value = 1 - t * .5;
		},
		cleanup() {
			o.stop(), o.disconnect(), s.disconnect(), a.disconnect(), i.disconnect(), r.disconnect(), t.disconnect(), n.disconnect();
		}
	};
}
//#endregion
//#region src/audio/reverb.ts
function pt(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createGain(), a = e.createConvolver(), o = e.sampleRate, s = e.createBuffer(2, o * 2, o);
	for (let e = 0; e < 2; e++) {
		let t = s.getChannelData(e);
		for (let e = 0; e < s.length; e++) {
			let n = Math.exp(-e / (o * 2) * 5);
			t[e] = (Math.random() * 2 - 1) * n;
		}
	}
	return a.buffer = s, t.connect(r), t.connect(a), a.connect(i), r.connect(n), i.connect(n), {
		inputNode: t,
		outputNode: n,
		updateNodeParameters(e) {
			let t = e.fxReverb;
			i.gain.value = t, r.gain.value = 1 - t * .5;
		},
		cleanup() {
			a.disconnect(), i.disconnect(), r.disconnect(), t.disconnect(), n.disconnect();
		}
	};
}
//#endregion
//#region src/audio/utils.ts
function mt(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
//#endregion
//#region src/audio/voice.ts
var ht = null, gt = null;
function _t(e, t) {
	let n = /* @__PURE__ */ new Float32Array(64), r = /* @__PURE__ */ new Float32Array(64);
	n[0] = t;
	for (let e = 1; e < 64; e++) {
		let i = e;
		n[e] = 2 / (i * Math.PI) * Math.sin(Math.PI * i * t), r[e] = 0;
	}
	return e.createPeriodicWave(n, r, { disableNormalization: !1 });
}
function vt(e, t) {
	return t < .5 ? (gt ||= _t(e, 1), "sawtooth") : t < 1.5 ? "square" : (ht ||= _t(e, .125), ht);
}
function yt(e, t, n, r, i) {
	let a = r, o = e.createGain();
	o.gain.value = 1;
	let s = mt(t), c = e.createOscillator(), l = e.createOscillator(), u = e.createOscillator(), d = vt(e, r.oscWave);
	typeof d == "string" ? (c.type = d, l.type = d) : (c.setPeriodicWave(d), l.setPeriodicWave(d)), u.type = "triangle", c.frequency.value = s, l.frequency.value = s, u.frequency.value = s / 2;
	let f = r.oscDetune * 50;
	r.oscDetune > 0 ? (c.detune.value = f, l.detune.value = -f) : (c.detune.value = 0, l.detune.value = 0);
	let p = e.createOscillator(), m = e.createGain();
	p.type = "sine", p.frequency.value = .5 + Math.random(), m.gain.value = r.oscDrift * 30, p.connect(m), m.connect(c.detune), m.connect(l.detune);
	let h = e.createGain();
	h.gain.value = .5;
	let g = e.createGain();
	g.gain.value = r.oscSub, c.connect(h), l.connect(h), u.connect(g);
	let _ = e.createBiquadFilter();
	_.type = "lowpass";
	let v = 40 * (1e4 / 40) ** r.filterCutoff;
	_.frequency.value = v, _.Q.value = r.filterPeak * 20, h.connect(_), g.connect(_);
	let y = e.createGain();
	y.gain.value = 0, _.connect(y), y.connect(o);
	let b = i && i > e.currentTime ? i : e.currentTime, x = r.ampDecay < 1 ? Math.max(.01, r.ampDecay * 3) : 3, ee = +(r.ampDecay === 1);
	y.gain.setValueAtTime(0, b), y.gain.linearRampToValueAtTime(Math.max(.001, n), b + .01), ee === 0 && y.gain.exponentialRampToValueAtTime(.001, b + .01 + x);
	let S = r.filterEnvMod * 4800;
	S > 0 ? (_.detune.setValueAtTime(S, b), _.detune.exponentialRampToValueAtTime(1, b + .01 + x)) : _.detune.value = 0, p.start(b), c.start(b), l.start(b), u.start(b);
	let te = !1;
	function C(t) {
		a = t;
		let n = e.currentTime, r = vt(e, t.oscWave);
		typeof r == "string" ? (c.type = r, l.type = r) : (c.setPeriodicWave(r), l.setPeriodicWave(r));
		let i = t.oscDetune * 50;
		c.detune.setTargetAtTime(i, n, .01), l.detune.setTargetAtTime(-i, n, .01), m.gain.setTargetAtTime(t.oscDrift * 30, n, .01), g.gain.setTargetAtTime(t.oscSub, n, .01);
		let o = 40 * (1e4 / 40) ** t.filterCutoff;
		_.frequency.setTargetAtTime(o, n, .01), _.Q.setTargetAtTime(t.filterPeak * 20, n, .01);
	}
	return {
		outputNode: o,
		updateNodeParameters: C,
		noteOff(t) {
			if (te) return;
			te = !0;
			let n = t && t > e.currentTime ? t : e.currentTime, r = Math.max(.01, a.ampRelease * 3);
			y.gain.cancelScheduledValues(n), y.gain.setValueAtTime(y.gain.value, n), y.gain.exponentialRampToValueAtTime(.001, n + r);
			let i = n + r + .1;
			p.stop(i), c.stop(i), l.stop(i), u.stop(i);
			let s = (n - e.currentTime + r + .2) * 1e3;
			setTimeout(() => {
				o.disconnect();
			}, Math.max(0, s));
		}
	};
}
//#endregion
//#region src/audio/index.ts
var Y = $e("wafer-v01", import.meta.url), X = null;
function bt() {
	let e = Y?.audioContext ?? new AudioContext(), t = Y?.audioOutputNode ?? e.destination, n = e.createGain(), r = ft(e), i = pt(e), a = e.createGain();
	n.connect(r.inputNode), r.outputNode.connect(i.inputNode), i.outputNode.connect(a), a.connect(t);
	let o = /* @__PURE__ */ new Map();
	return {
		async resumeIfNeed() {
			!(e instanceof OfflineAudioContext) && e.state === "suspended" && await e.resume();
		},
		noteOn(t, r, i) {
			let a = o.get(t);
			a && a.noteOff(i);
			let s = yt(e, t, r, J.parameters, i);
			s.outputNode.connect(n), o.set(t, s);
		},
		noteOff(e, t) {
			let n = o.get(e);
			n && (n.noteOff(t), o.delete(e));
		},
		updateNodeParameters(e) {
			r.updateNodeParameters(e), i.updateNodeParameters(e), a.gain.value = e.masterVolume;
			for (let t of o.values()) t.updateNodeParameters(e);
		},
		cleanup() {
			r.cleanup(), i.cleanup(), a.disconnect(), n.disconnect();
		}
	};
}
function xt() {
	return X || (X = bt(), ee(() => {
		let { oscWave: e, oscDetune: t, oscSub: n, oscDrift: r, filterCutoff: i, filterPeak: a, filterEnvMod: o, ampDecay: s, ampRelease: c, masterVolume: l, fxChorus: u, fxReverb: d } = J.parameters;
		X.updateNodeParameters({
			oscWave: e,
			oscDetune: t,
			oscSub: n,
			oscDrift: r,
			filterCutoff: i,
			filterPeak: a,
			filterEnvMod: o,
			ampDecay: s,
			ampRelease: c,
			masterVolume: l,
			fxChorus: u,
			fxReverb: d
		});
	})), X;
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.14/node_modules/solid-icons/lib/index.jsx
var St = /*#__PURE__*/ M("<svg>");
function Ct(e, t) {
	return (() => {
		var n = St();
		return He(n, Ce(() => e.a, t, {
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
				return je(() => !!t.title)() ? `${e.c}<title>${t.title}</title>` : e.c;
			},
			src: void 0
		}), !0, !1), n;
	})();
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.14/node_modules/solid-icons/hi/index.js
function wt(e) {
	return Ct({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function Tt(e) {
	return Ct({
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
var Et = {
	Left: wt,
	Right: Tt
}, Z = {
	setPreset(e) {
		K[e] && dt({
			presetName: e,
			parameters: { ...K[e] }
		});
	},
	shiftPreset(e) {
		let t = (q.indexOf(J.presetName) + e + q.length) % q.length;
		this.setPreset(q[t]);
	},
	setParameter(e, t) {
		dt("parameters", e, t);
	}
}, Dt = /*#__PURE__*/ M("<div class=\"flex-h items-center justify-center p-2 bg-gray-200 border-b border-gray-400\"><button type=button class=\"w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer\"></button><div class=px-2><select class=\"w-40 h-8.5 px-2 text-center bg-white border border-gray-500 outline-none cursor-pointer appearance-none\"></select></div><button type=button class=\"w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer\">"), Ot = /*#__PURE__*/ M("<option>"), kt = () => (() => {
	var e = Dt(), t = e.firstChild, n = t.nextSibling, r = n.firstChild, i = n.nextSibling;
	return t.$$click = () => Z.shiftPreset(-1), P(t, k(Et.Left, {})), r.addEventListener("change", (e) => Z.setPreset(e.currentTarget.value)), P(r, () => q.map((e) => (() => {
		var t = Ot();
		return t.value = e, P(t, e), t;
	})())), i.$$click = () => Z.shiftPreset(1), P(i, k(Et.Right, {})), x(() => r.value = J.presetName), e;
})();
Fe(["click"]);
//#endregion
//#region src/components/Slider.tsx
var At = /*#__PURE__*/ M("<div class=\"flex-h items-center justify-between w-full h-8 px-2 text-sm select-none gap-1\"><div class=\"w-16 text-gray-800 font-semibold\"></div><div class=\"flex-1 flex-ha\"><input type=range min=0 class=\"w-full h-2 bg-gray-300 outline-none appearance-none cursor-pointer\">"), Q = (e) => {
	let t = () => J.parameters[e.paramKey], n = (t) => {
		let n = t.target, r = parseFloat(n.value);
		Z.setParameter(e.paramKey, r);
	};
	return (() => {
		var r = At(), i = r.firstChild, a = i.nextSibling.firstChild;
		return P(i, () => e.label), a.$$input = n, x((t) => {
			var n = e.steps ? e.steps - 1 : 1, r = e.steps ? 1 : .01;
			return n !== t.e && N(a, "max", t.e = n), r !== t.t && N(a, "step", t.t = r), t;
		}, {
			e: void 0,
			t: void 0
		}), x(() => a.value = e.steps ? Math.round(t()) : t()), r;
	})();
};
Fe(["input"]);
//#endregion
//#region src/sections/LeftColumn.tsx
var jt = /*#__PURE__*/ M("<div class=\"flex-v flex-1 p-2 border-r border-gray-400 gap-0 overflow-y-auto\">"), Mt = () => (() => {
	var e = jt();
	return P(e, k(Q, {
		label: "Wave",
		paramKey: "oscWave",
		steps: 3
	}), null), P(e, k(Q, {
		label: "Detune",
		paramKey: "oscDetune"
	}), null), P(e, k(Q, {
		label: "Sub",
		paramKey: "oscSub"
	}), null), P(e, k(Q, {
		label: "Drift",
		paramKey: "oscDrift"
	}), null), P(e, k(Q, {
		label: "Chorus",
		paramKey: "fxChorus"
	}), null), P(e, k(Q, {
		label: "Reverb",
		paramKey: "fxReverb"
	}), null), e;
})(), Nt = /*#__PURE__*/ M("<div class=\"flex-v flex-1 p-2 gap-0 overflow-y-auto\">"), Pt = () => (() => {
	var e = Nt();
	return P(e, k(Q, {
		label: "Cutoff",
		paramKey: "filterCutoff"
	}), null), P(e, k(Q, {
		label: "Peak",
		paramKey: "filterPeak"
	}), null), P(e, k(Q, {
		label: "EnvMod",
		paramKey: "filterEnvMod"
	}), null), P(e, k(Q, {
		label: "Decay",
		paramKey: "ampDecay"
	}), null), P(e, k(Q, {
		label: "Release",
		paramKey: "ampRelease"
	}), null), P(e, k(Q, {
		label: "Master",
		paramKey: "masterVolume"
	}), null), e;
})();
//#endregion
//#region src/store/persistence.ts
function Ft(e) {
	return e * 255 >>> 0;
}
function It(e) {
	return e / 255;
}
var $ = {
	serializeParameters(e) {
		let t = e;
		return [t.oscWave, ...[
			t.oscDetune,
			t.oscSub,
			t.oscDrift,
			t.fxChorus,
			t.fxReverb,
			t.filterCutoff,
			t.filterPeak,
			t.filterEnvMod,
			t.ampDecay,
			t.ampRelease,
			t.masterVolume
		].map(Ft)];
	},
	deserializeParameters(e) {
		let t = e.map(It);
		return {
			oscWave: e[0],
			oscDetune: t[1],
			oscSub: t[2],
			oscDrift: t[3],
			fxChorus: t[4],
			fxReverb: t[5],
			filterCutoff: t[6],
			filterPeak: t[7],
			filterEnvMod: t[8],
			ampDecay: t[9],
			ampRelease: t[10],
			masterVolume: t[11]
		};
	},
	presetNameToIndex(e) {
		return q.indexOf(e);
	},
	presetNameFromIndex(e) {
		return q[e] || q[0];
	}
}, Lt = 1, Rt = {
	emitStateBytes() {
		let { presetName: e, parameters: t } = J, n = $.serializeParameters(t), r = $.presetNameToIndex(e);
		return new Uint8Array([
			Lt,
			r,
			...n
		]);
	},
	applyStateBytes(e) {
		if (e.length === 14 && e[0] === Lt) {
			let t = e[1];
			dt({
				presetName: $.presetNameFromIndex(t),
				parameters: $.deserializeParameters([...e.slice(2)])
			});
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function zt(e, t) {
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
async function Bt() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function Vt(e) {
	let t, n = !1;
	return (async () => {
		let r = await Bt();
		n || r && (t = zt(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/MainApp.tsx
var Ht = /*#__PURE__*/ M("<div class=flex-c><div class=\"bg-gray-100 border border-gray-400 shadow-xl overflow-hidden\"style=width:500px;height:270px;display:flex;flex-direction:column><div class=\"flex-h flex-1 px-2\">"), Ut = () => {
	let e, t = xt();
	return Y ? Y.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "synthesizer",
			viewSize: [500, 270]
		},
		noteInput: {
			async noteOn(e, n) {
				t.noteOn(e, 1, n);
			},
			noteOff(e, n) {
				t.noteOff(e, n);
			}
		},
		automationInput: {
			getParameterSpecs() {
				return [
					{
						id: "oscWave",
						step: 2
					},
					{ id: "oscDetune" },
					{ id: "oscSub" },
					{ id: "oscDrift" },
					{ id: "fxChorus" },
					{ id: "fxReverb" },
					{ id: "filterCutoff" },
					{ id: "filterPeak" },
					{ id: "filterEnvMod" },
					{ id: "ampDecay" },
					{ id: "ampRelease" },
					{ id: "masterVolume" }
				];
			},
			getParameter(e) {
				return e === "oscWave" ? J.parameters.oscWave / 2 : J.parameters[e];
			},
			setParameter(e, t) {
				e === "oscWave" ? Z.setParameter("oscWave", t * 2) : Z.setParameter(e, t);
			}
		},
		persistence: Rt,
		cleanup: t.cleanup
	}) : re(Vt({
		async noteOn(e) {
			await t.resumeIfNeed(), t.noteOn(e, 1, 0);
		},
		noteOff(e) {
			t.noteOff(e, 0);
		}
	})), ne(() => {
		Y || e.addEventListener("mousedown", async () => {
			await t.resumeIfNeed(), console.log("resumed");
		}, {
			capture: !0,
			once: !0
		});
	}), (() => {
		var t = Ht(), n = t.firstChild, r = n.firstChild, i = e;
		return typeof i == "function" ? Ue(i, n) : e = n, P(n, k(kt, {}), r), P(r, k(Mt, {}), null), P(r, k(Pt, {}), null), t;
	})();
}, Wt = Qe((e) => Pe(() => k(Ut, {}), e), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-300:oklch(87.2% .01 258.338);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-800:oklch(27.8% .033 256.848);--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--font-weight-semibold:600;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.flex{display:flex}.h-2{height:calc(var(--spacing) * 2)}.h-8{height:calc(var(--spacing) * 8)}.h-8\\.5{height:calc(var(--spacing) * 8.5)}.w-10{width:calc(var(--spacing) * 10)}.w-16{width:calc(var(--spacing) * 16)}.w-40{width:calc(var(--spacing) * 40)}.w-full{width:100%}.flex-1{flex:1}.cursor-pointer{cursor:pointer}.appearance-none{appearance:none}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-0{gap:0}.gap-1{gap:var(--spacing)}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.border{border-style:var(--tw-border-style);border-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-gray-400{border-color:var(--color-gray-400)}.border-gray-500{border-color:var(--color-gray-500)}.bg-gray-100{background-color:var(--color-gray-100)}.bg-gray-200{background-color:var(--color-gray-200)}.bg-gray-300{background-color:var(--color-gray-300)}.bg-white{background-color:var(--color-white)}.p-2{padding:calc(var(--spacing) * 2)}.px-2{padding-inline:calc(var(--spacing) * 2)}.text-center{text-align:center}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-gray-800{color:var(--color-gray-800)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}@media (hover:hover){.hover\\:bg-gray-400:hover{background-color:var(--color-gray-400)}}}:host{-webkit-user-select:none;user-select:none;font-family:Orbitron,sans-serif}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Orbitron:wght@400..700&display=swap"]
});
//#endregion
export { Wt as default };
