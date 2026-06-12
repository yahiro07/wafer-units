//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/dist/solid.js
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
function r() {
	return {
		...e.context,
		id: e.getNextContextId(),
		count: 0
	};
}
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = typeof Proxy == "function", s = Symbol("solid-track"), c = { equals: i }, l = null, u = _e, d = 1, f = 2, p = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, m = null, h = null, g = null, _ = null, v = null, y = null, b = null, x = 0;
function ee(e, t) {
	let n = v, r = m, i = e.length === 0, a = t === void 0 ? r : t, o = i ? p : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => w(() => k(o)));
	m = o, v = null;
	try {
		return D(s, !0);
	} finally {
		v = n, m = r;
	}
}
function S(e, t) {
	t = t ? Object.assign({}, c, t) : c;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [fe.bind(n), (e) => (typeof e == "function" && (e = h && h.running && h.sources.has(n) ? e(n.tValue) : e(n.value)), pe(n, e))];
}
function C(e, t, n) {
	let r = he(e, t, !1, d);
	g && h && h.running ? y.push(r) : T(r);
}
function te(e, t, n) {
	u = ye;
	let r = he(e, t, !1, d), i = de && ue(de);
	i && (r.suspense = i), (!n || !n.render) && (r.user = !0), b ? b.push(r) : T(r);
}
function ne(e, t, n) {
	n = n ? Object.assign({}, c, n) : c;
	let r = he(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, g && h && h.running ? (r.tState = d, y.push(r)) : T(r), fe.bind(r);
}
function re(e) {
	return D(e, !1);
}
function w(e) {
	if (!_ && v === null) return e();
	let t = v;
	v = null;
	try {
		return _ ? _.untrack(e) : e();
	} finally {
		v = t;
	}
}
function ie(e) {
	te(() => w(e));
}
function ae(e) {
	return m === null || (m.cleanups === null ? m.cleanups = [e] : m.cleanups.push(e)), e;
}
function oe() {
	return v;
}
function se(e) {
	if (h && h.running) return e(), h.done;
	let t = v, n = m;
	return Promise.resolve().then(() => {
		v = t, m = n;
		let r;
		return (g || de) && (r = h ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), D(e, !1), v = m = null, r ? r.done : void 0;
	});
}
var [ce, le] = /* @__PURE__ */ S(!1);
function ue(e) {
	let t;
	return m && m.context && (t = m.context[e.id]) !== void 0 ? t : e.defaultValue;
}
var de;
function fe() {
	let e = h && h.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === d) T(this);
	else {
		let e = y;
		y = null, D(() => O(this), !1), y = e;
	}
	if (v) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== v) {
			let t = e ? e.length : 0;
			v.sources ? (v.sources.push(this), v.sourceSlots.push(t)) : (v.sources = [this], v.sourceSlots = [t]), e ? (e.push(v), this.observerSlots.push(v.sources.length - 1)) : (this.observers = [v], this.observerSlots = [v.sources.length - 1]);
		}
	}
	return e && h.sources.has(this) ? this.tValue : this.value;
}
function pe(e, t, n) {
	let r = h && h.running && h.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (h) {
			let r = h.running;
			(r || !n && h.sources.has(e)) && (h.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && D(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = h && h.running;
				r && h.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? y.push(n) : b.push(n), n.observers && be(n)), r ? n.tState = d : n.state = d);
			}
			if (y.length > 1e6) throw y = [], Error();
		}, !1);
	}
	return t;
}
function T(e) {
	if (!e.fn) return;
	k(e);
	let t = x;
	me(e, h && h.running && h.sources.has(e) ? e.tValue : e.value, t), h && !h.running && h.sources.has(e) && queueMicrotask(() => {
		D(() => {
			h && (h.running = !0), v = m = e, me(e, e.tValue, t), v = m = null;
		}, !1);
	});
}
function me(e, t, n) {
	let r, i = m, a = v;
	v = m = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (h && h.running ? (e.tState = d, e.tOwned && e.tOwned.forEach(k), e.tOwned = void 0) : (e.state = d, e.owned && e.owned.forEach(k), e.owned = null)), e.updatedAt = n + 1, we(t);
	} finally {
		v = a, m = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? pe(e, r, !0) : h && h.running && e.pure ? (h.sources.has(e) || (e.value = r), h.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function he(e, t, n, r = d, i) {
	let a = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: m,
		context: m ? m.context : null,
		pure: n
	};
	if (h && h.running && (a.state = 0, a.tState = r), m === null || m !== p && (h && h.running && m.pure ? m.tOwned ? m.tOwned.push(a) : m.tOwned = [a] : m.owned ? m.owned.push(a) : m.owned = [a]), _ && a.fn) {
		let e = a.fn, [t, n] = S(void 0, { equals: !1 }), r = _.factory(e, n);
		ae(() => r.dispose());
		let i, o = () => se(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), h && h.running ? (i ||= _.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function E(e) {
	let t = h && h.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === f) return O(e);
	if (e.suspense && w(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < x);) {
		if (t && h.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (h.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === d) T(e);
		else if ((t ? e.tState : e.state) === f) {
			let t = y;
			y = null, D(() => O(e, n[0]), !1), y = t;
		}
	}
}
function D(e, t) {
	if (y) return e();
	let n = !1;
	t || (y = []), b ? n = !0 : b = [], x++;
	try {
		let t = e();
		return ge(n), t;
	} catch (e) {
		n || (b = null), y = null, we(e);
	}
}
function ge(e) {
	if (y &&= (g && h && h.running ? ve(y) : _e(y), null), e) return;
	let t;
	if (h) {
		if (!h.promises.size && !h.queue.size) {
			let e = h.sources, n = h.disposed;
			b.push.apply(b, h.effects), t = h.resolve;
			for (let e of b) "tState" in e && (e.state = e.tState), delete e.tState;
			h = null, D(() => {
				for (let e of n) k(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) k(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				le(!1);
			}, !1);
		} else if (h.running) {
			h.running = !1, h.effects.push.apply(h.effects, b), b = null, le(!0);
			return;
		}
	}
	let n = b;
	b = null, n.length && D(() => u(n), !1), t && t();
}
function _e(e) {
	for (let t = 0; t < e.length; t++) E(e[t]);
}
function ve(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = h.queue;
		r.has(n) || (r.add(n), g(() => {
			r.delete(n), D(() => {
				h.running = !0, E(n);
			}, !1), h && (h.running = !1);
		}));
	}
}
function ye(t) {
	let r, i = 0;
	for (r = 0; r < t.length; r++) {
		let e = t[r];
		e.user ? t[i++] = e : E(e);
	}
	if (e.context) {
		if (e.count) {
			e.effects ||= [], e.effects.push(...t.slice(0, i));
			return;
		}
		n();
	}
	for (e.effects && (e.done || !e.count) && (t = [...e.effects, ...t], i += e.effects.length, delete e.effects), r = 0; r < i; r++) E(t[r]);
}
function O(e, t) {
	let n = h && h.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === d ? i !== t && (!i.updatedAt || i.updatedAt < x) && E(i) : e === f && O(i, t);
		}
	}
}
function be(e) {
	let t = h && h.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = f : r.state = f, r.pure ? y.push(r) : b.push(r), r.observers && be(r));
	}
}
function k(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) k(e.tOwned[t]);
		delete e.tOwned;
	}
	if (h && h.running && e.pure) xe(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) k(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	h && h.running ? e.tState = 0 : e.state = 0;
}
function xe(e, t) {
	if (t || (e.tState = 0, h.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) xe(e.owned[t]);
}
function Se(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Ce(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		we(e, n && n.owner || null);
	}
}
function we(e, t = m) {
	let n = l && t && t.context && t.context[l], r = Se(e);
	if (!n) throw r;
	b ? b.push({
		fn() {
			Ce(r, n, t);
		},
		state: d
	}) : Ce(r, n, t);
}
var Te = !1;
function A(t, i) {
	if (Te && e.context) {
		let a = e.context;
		n(r());
		let o = w(() => t(i || {}));
		return n(a), o;
	}
	return w(() => t(i || {}));
}
function j() {
	return !0;
}
var Ee = {
	get(e, t, n) {
		return t === a ? n : e.get(t);
	},
	has(e, t) {
		return t === a ? !0 : e.has(t);
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
function De(e) {
	return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Oe() {
	for (let e = 0, t = this.length; e < t; ++e) {
		let t = this[e]();
		if (t !== void 0) return t;
	}
}
function ke(...e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t ||= !!r && a in r, e[n] = typeof r == "function" ? (t = !0, ne(r)) : r;
	}
	if (o && t) return new Proxy({
		get(t) {
			for (let n = e.length - 1; n >= 0; n--) {
				let r = De(e[n])[t];
				if (r !== void 0) return r;
			}
		},
		has(t) {
			for (let n = e.length - 1; n >= 0; n--) if (t in De(e[n])) return !0;
			return !1;
		},
		keys() {
			let t = [];
			for (let n = 0; n < e.length; n++) t.push(...Object.keys(De(e[n])));
			return [...new Set(t)];
		}
	}, Ee);
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
				get: Oe.bind(n[t] = [o.get.bind(i)])
			} : o.value === void 0 ? void 0 : o;
			else {
				let e = n[t];
				e && (o.get ? e.push(o.get.bind(i)) : o.value !== void 0 && e.push(() => o.value));
			}
		}
	}
	let i = {}, s = Object.keys(r);
	for (let e = s.length - 1; e >= 0; e--) {
		let t = s[e], n = r[t];
		n && n.get ? Object.defineProperty(i, t, n) : i[t] = n ? n.value : void 0;
	}
	return i;
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/web/dist/web.js
var Ae = /* @__PURE__ */ new Set([
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
]), je = /* @__PURE__ */ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]), Me = /* @__PURE__ */ Object.assign(Object.create(null), {
	className: "class",
	htmlFor: "for"
}), Ne = /* @__PURE__ */ Object.assign(Object.create(null), {
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
function Pe(e, t) {
	let n = Ne[e];
	return typeof n == "object" ? n[t] ? n.$ : void 0 : n;
}
var Fe = /* @__PURE__ */ new Set([
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
]), Ie = {
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
}, Le = (e) => ne(() => e());
function Re(e, t, n) {
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
				for (; ++c < i && c < a && !((d = l.get(t[c])) == null || d !== r + u);) u++;
				if (u > r - s) {
					let i = t[o];
					for (; s < r;) e.insertBefore(n[s++], i);
				} else e.replaceChild(n[s++], t[o++]);
			} else o++;
			else t[o++].remove();
		}
	}
}
var ze = "_$DX_DELEGATE";
function Be(e, t, n, r = {}) {
	let i;
	return ee((r) => {
		i = r, t === document ? e() : P(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function M(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => w(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function Ve(e, t = window.document) {
	let n = t[ze] || (t[ze] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, et));
	}
}
function N(e, t, n) {
	F(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function He(e, t, n, r) {
	F(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function Ue(e, t, n) {
	F(e) || (n ? e.setAttribute(t, "") : e.removeAttribute(t));
}
function We(e, t) {
	F(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function Ge(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function Ke(e, t, n = {}) {
	let r = Object.keys(t || {}), i = Object.keys(n), a, o;
	for (a = 0, o = i.length; a < o; a++) {
		let r = i[a];
		!r || r === "undefined" || t[r] || (Qe(e, r, !1), delete n[r]);
	}
	for (a = 0, o = r.length; a < o; a++) {
		let i = r[a], o = !!t[i];
		!i || i === "undefined" || n[i] === o || !o || (Qe(e, i, !0), n[i] = o);
	}
	return n;
}
function qe(e, t, n) {
	if (!t) return n ? N(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function Je(e, t = {}, n, r) {
	let i = {};
	return r || C(() => i.children = I(e, t.children, i.children)), C(() => typeof t.ref == "function" && Ye(t.ref, e)), C(() => Xe(e, t, n, !0, i, !0)), i;
}
function Ye(e, t, n) {
	return w(() => e(t, n));
}
function P(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return I(e, t, r, n);
	C((r) => I(e, t(), r, n), r);
}
function Xe(e, t, n, r, i = {}, a = !1) {
	t ||= {};
	for (let r in i) if (!(r in t)) {
		if (r === "children") continue;
		i[r] = $e(e, r, null, i[r], n, a, t);
	}
	for (let o in t) {
		if (o === "children") {
			r || I(e, t.children);
			continue;
		}
		let s = t[o];
		i[o] = $e(e, o, s, i[o], n, a, t);
	}
}
function F(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function Ze(e) {
	return e.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function Qe(e, t, n) {
	let r = t.trim().split(/\s+/);
	for (let t = 0, i = r.length; t < i; t++) e.classList.toggle(r[t], n);
}
function $e(e, t, n, r, i, a, o) {
	let s, c, l, u, d;
	if (t === "style") return qe(e, n, r);
	if (t === "classList") return Ke(e, n, r);
	if (n === r) return r;
	if (t === "ref") a || n(e);
	else if (t.slice(0, 3) === "on:") {
		let i = t.slice(3);
		r && e.removeEventListener(i, r, typeof r != "function" && r), n && e.addEventListener(i, n, typeof n != "function" && n);
	} else if (t.slice(0, 10) === "oncapture:") {
		let i = t.slice(10);
		r && e.removeEventListener(i, r, !0), n && e.addEventListener(i, n, !0);
	} else if (t.slice(0, 2) === "on") {
		let i = t.slice(2).toLowerCase(), a = Fe.has(i);
		if (!a && r) {
			let t = Array.isArray(r) ? r[0] : r;
			e.removeEventListener(i, t);
		}
		(a || n) && (Ge(e, i, n, a), a && Ve([i]));
	} else if (t.slice(0, 5) === "attr:") N(e, t.slice(5), n);
	else if (t.slice(0, 5) === "bool:") Ue(e, t.slice(5), n);
	else if ((d = t.slice(0, 5) === "prop:") || (l = je.has(t)) || !i && ((u = Pe(t, e.tagName)) || (c = Ae.has(t))) || (s = e.nodeName.includes("-") || "is" in o)) {
		if (d) t = t.slice(5), c = !0;
		else if (F(e)) return n;
		t === "class" || t === "className" ? We(e, n) : s && !c && !l ? e[Ze(t)] = n : e[u || t] = n;
	} else {
		let r = i && t.indexOf(":") > -1 && Ie[t.split(":")[0]];
		r ? He(e, r, t, n) : N(e, Me[t] || t, n);
	}
	return n;
}
function et(t) {
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
	} else if (o === "function") return C(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = I(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (tt(o, t, n, i)) return C(() => n = I(e, o, n, r, !0)), () => n;
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
		} else c ? n.length === 0 ? nt(e, o, r) : Re(e, n, o) : (n && L(e), nt(e, o));
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
function tt(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = tt(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = tt(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function nt(e, t, n = null) {
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
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/unit-helper/index.js
function rt(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1;
		}
		connectedCallback() {
			if (this.isMounted || !this.shadowRoot) return;
			let n = document.createElement("style");
			n.dataset.unit1Styles = "true", n.textContent = t.join("\n"), this.shadowRoot.appendChild(n), this.disposeRender = e(this.shadowRoot), this.isMounted = !0;
		}
		disconnectedCallback() {
			this.isMounted && this.shadowRoot && setTimeout(() => {
				this.shadowRoot && (this.disposeRender?.(), this.disposeRender = null, this.isMounted = !1);
			}, 0);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/v01/index.js
function it(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/store/dist/store.js
var at = Symbol("store-raw"), R = Symbol("store-node"), z = Symbol("store-has"), ot = Symbol("store-self");
function st(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, dt) }), !Array.isArray(e))) {
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
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function V(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[at]) return n;
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
	let [r, i] = S(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function ct(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === R ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function lt(e) {
	oe() && U(H(e, R), ot)();
}
function ut(e) {
	return lt(e), Reflect.ownKeys(e);
}
var dt = {
	get(e, t, n) {
		if (t === at) return e;
		if (t === a) return n;
		if (t === s) return lt(e), n;
		let r = H(e, R), i = r[t], o = i ? i() : e[t];
		if (t === R || t === z || t === "__proto__") return o;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			oe() && (typeof o != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (o = U(r, t, o)());
		}
		return B(o) ? st(o) : o;
	},
	has(e, t) {
		return t === at || t === a || t === s || t === R || t === z || t === "__proto__" ? !0 : (oe() && U(H(e, z), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: ut,
	getOwnPropertyDescriptor: ct
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
	(s = o[ot]) && s.$();
}
function ft(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		pt(i) || W(e, i, t[i]);
	}
}
function pt(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function mt(e, t) {
	if (typeof t == "function" && (t = t(e)), t = V(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && W(e, n, r);
		}
		W(e, "length", r);
	} else ft(e, t);
}
function G(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && pt(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) G(e, [r[i]].concat(t), n);
			return;
		} else if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && G(e, [i].concat(t), n);
			return;
		} else if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) G(e, [r].concat(t), n);
			return;
		} else if (t.length > 1) {
			G(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = V(a), r === void 0 || B(i) && B(a) && !Array.isArray(a) ? ft(i, a) : W(e, r, a));
}
function ht(...[e, t]) {
	let n = V(e || {}), r = Array.isArray(n), i = st(n);
	function a(...e) {
		re(() => {
			r && e.length === 1 ? mt(n, e[0]) : G(n, e);
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
}, q = Object.keys(K), [J, gt] = ht({
	presetName: "Init",
	parameters: { ...K.Init }
});
//#endregion
//#region src/audio/chorus.ts
function _t(e) {
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
		}
	};
}
//#endregion
//#region src/audio/reverb.ts
function vt(e) {
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
		}
	};
}
//#endregion
//#region src/audio/utils.ts
function yt(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
//#endregion
//#region src/audio/voice.ts
var bt = null, xt = null;
function St(e, t) {
	let n = new Float32Array(64), r = new Float32Array(64);
	n[0] = t;
	for (let e = 1; e < 64; e++) {
		let i = e;
		n[e] = 2 / (i * Math.PI) * Math.sin(Math.PI * i * t), r[e] = 0;
	}
	return e.createPeriodicWave(n, r, { disableNormalization: !1 });
}
function Ct(e, t) {
	return t < .5 ? (xt ||= St(e, 1), "sawtooth") : t < 1.5 ? "square" : (bt ||= St(e, .125), bt);
}
function wt(e, t, n, r, i) {
	let a = e.createGain();
	a.gain.value = 1;
	let o = yt(t), s = e.createOscillator(), c = e.createOscillator(), l = e.createOscillator(), u = Ct(e, r.oscWave);
	typeof u == "string" ? (s.type = u, c.type = u) : (s.setPeriodicWave(u), c.setPeriodicWave(u)), l.type = "triangle", s.frequency.value = o, c.frequency.value = o, l.frequency.value = o / 2;
	let d = r.oscDetune * 50;
	r.oscDetune > 0 ? (s.detune.value = d, c.detune.value = -d) : (s.detune.value = 0, c.detune.value = 0);
	let f = e.createOscillator(), p = e.createGain();
	f.type = "sine", f.frequency.value = .5 + Math.random(), p.gain.value = r.oscDrift * 30, f.connect(p), p.connect(s.detune), p.connect(c.detune);
	let m = e.createGain();
	m.gain.value = r.oscDetune > 0 ? .5 : r.oscDetune === 0 ? 1 : .5;
	let h = e.createGain();
	h.gain.value = r.oscSub, s.connect(m), r.oscDetune > 0 && c.connect(m), l.connect(h);
	let g = e.createBiquadFilter();
	g.type = "lowpass";
	let _ = 40 * (1e4 / 40) ** r.filterCutoff;
	g.frequency.value = _, g.Q.value = r.filterPeak * 20, m.connect(g), h.connect(g);
	let v = e.createGain();
	v.gain.value = 0, g.connect(v), v.connect(a);
	let y = i && i > e.currentTime ? i : e.currentTime, b = r.ampDecay < 1 ? Math.max(.01, r.ampDecay * 3) : 3, x = +(r.ampDecay === 1);
	v.gain.setValueAtTime(0, y), v.gain.linearRampToValueAtTime(Math.max(.001, n), y + .01), x === 0 && v.gain.exponentialRampToValueAtTime(.001, y + .01 + b);
	let ee = r.filterEnvMod * 4800;
	ee > 0 ? (g.detune.setValueAtTime(ee, y), g.detune.exponentialRampToValueAtTime(1, y + .01 + b)) : g.detune.value = 0, f.start(y), s.start(y), c.start(y), l.start(y);
	let S = !1;
	return {
		outputNode: a,
		noteOff(t) {
			if (S) return;
			S = !0;
			let n = t && t > e.currentTime ? t : e.currentTime, i = Math.max(.01, r.ampRelease * 3);
			v.gain.cancelScheduledValues(n), v.gain.setValueAtTime(v.gain.value, n), v.gain.exponentialRampToValueAtTime(.001, n + i);
			let o = n + i + .1;
			f.stop(o), s.stop(o), c.stop(o), l.stop(o);
			let u = (n - e.currentTime + i + .2) * 1e3;
			setTimeout(() => {
				a.disconnect();
			}, Math.max(0, u));
		}
	};
}
//#endregion
//#region src/audio/index.ts
var Y = it("wus-v01", import.meta.url), X = null;
function Tt() {
	let e = Y?.audioContext ?? new AudioContext(), t = Y?.audioOutputNode ?? e.destination, n = e.createGain(), r = _t(e), i = vt(e), a = e.createGain();
	n.connect(r.inputNode), r.outputNode.connect(i.inputNode), i.outputNode.connect(a), a.connect(t);
	let o = /* @__PURE__ */ new Map();
	return {
		async resumeIfNeed() {
			e.state === "suspended" && await e.resume();
		},
		noteOn(t, r, i) {
			let a = o.get(t);
			a && a.noteOff(i);
			let s = wt(e, t, r, J.parameters, i);
			s.outputNode.connect(n), o.set(t, s);
		},
		noteOff(e, t) {
			let n = o.get(e);
			n && (n.noteOff(t), o.delete(e));
		},
		updateNodeParameters(e) {
			r.updateNodeParameters(e), i.updateNodeParameters(e), a.gain.value = e.masterVolume;
		}
	};
}
function Et() {
	return X || (X = Tt(), te(() => {
		X.updateNodeParameters(J.parameters);
	})), X;
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/lib/index.jsx
var Dt = /* @__PURE__ */ M("<svg>");
function Ot(e, t) {
	return (() => {
		var n = Dt();
		return Je(n, ke(() => e.a, t, {
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
				return Le(() => !!t.title)() ? `${e.c}<title>${t.title}</title>` : e.c;
			},
			src: void 0
		}), !0, !1), n;
	})();
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/hi/index.js
function kt(e) {
	return Ot({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function At(e) {
	return Ot({
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
var jt = {
	Left: kt,
	Right: At
}, Z = {
	setPreset(e) {
		K[e] && gt({
			presetName: e,
			parameters: { ...K[e] }
		});
	},
	shiftPreset(e) {
		let t = (q.indexOf(J.presetName) + e + q.length) % q.length;
		this.setPreset(q[t]);
	},
	setParameter(e, t) {
		gt("parameters", e, t);
	}
}, Mt = /* @__PURE__ */ M("<div class=\"flex-h items-center justify-center p-2 bg-gray-200 border-b border-gray-400\"><button type=button class=\"w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer\"></button><div class=px-2><select class=\"w-40 h-8.5 px-2 text-center bg-white border border-gray-500 outline-none cursor-pointer appearance-none\"></select></div><button type=button class=\"w-10 h-8 flex-c bg-gray-300 hover:bg-gray-400 border border-gray-500 cursor-pointer\">"), Nt = /* @__PURE__ */ M("<option>"), Pt = () => (() => {
	var e = Mt(), t = e.firstChild, n = t.nextSibling, r = n.firstChild, i = n.nextSibling;
	return t.$$click = () => Z.shiftPreset(-1), P(t, A(jt.Left, {})), r.addEventListener("change", (e) => Z.setPreset(e.currentTarget.value)), P(r, () => q.map((e) => (() => {
		var t = Nt();
		return t.value = e, P(t, e), t;
	})())), i.$$click = () => Z.shiftPreset(1), P(i, A(jt.Right, {})), C(() => r.value = J.presetName), e;
})();
Ve(["click"]);
//#endregion
//#region src/components/Slider.tsx
var Ft = /* @__PURE__ */ M("<div class=\"flex-h items-center justify-between w-full h-8 px-2 text-sm select-none gap-1\"><div class=\"w-16 text-gray-800 font-semibold\"></div><div class=\"flex-1 flex-ha\"><input type=range min=0 class=\"w-full h-2 bg-gray-300 outline-none appearance-none cursor-pointer\">"), Q = (e) => {
	let t = () => J.parameters[e.paramKey], n = (t) => {
		let n = t.target, r = parseFloat(n.value);
		Z.setParameter(e.paramKey, r);
	};
	return (() => {
		var r = Ft(), i = r.firstChild, a = i.nextSibling.firstChild;
		return P(i, () => e.label), a.$$input = n, C((t) => {
			var n = e.steps ? e.steps - 1 : 1, r = e.steps ? 1 : .01;
			return n !== t.e && N(a, "max", t.e = n), r !== t.t && N(a, "step", t.t = r), t;
		}, {
			e: void 0,
			t: void 0
		}), C(() => a.value = e.steps ? Math.round(t()) : t()), r;
	})();
};
Ve(["input"]);
//#endregion
//#region src/sections/LeftColumn.tsx
var It = /* @__PURE__ */ M("<div class=\"flex-v flex-1 p-2 border-r border-gray-400 gap-0 overflow-y-auto\">"), Lt = () => (() => {
	var e = It();
	return P(e, A(Q, {
		label: "Wave",
		paramKey: "oscWave",
		steps: 3
	}), null), P(e, A(Q, {
		label: "Detune",
		paramKey: "oscDetune"
	}), null), P(e, A(Q, {
		label: "Sub",
		paramKey: "oscSub"
	}), null), P(e, A(Q, {
		label: "Drift",
		paramKey: "oscDrift"
	}), null), P(e, A(Q, {
		label: "Chorus",
		paramKey: "fxChorus"
	}), null), P(e, A(Q, {
		label: "Reverb",
		paramKey: "fxReverb"
	}), null), e;
})(), Rt = /* @__PURE__ */ M("<div class=\"flex-v flex-1 p-2 gap-0 overflow-y-auto\">"), zt = () => (() => {
	var e = Rt();
	return P(e, A(Q, {
		label: "Cutoff",
		paramKey: "filterCutoff"
	}), null), P(e, A(Q, {
		label: "Peak",
		paramKey: "filterPeak"
	}), null), P(e, A(Q, {
		label: "EnvMod",
		paramKey: "filterEnvMod"
	}), null), P(e, A(Q, {
		label: "Decay",
		paramKey: "ampDecay"
	}), null), P(e, A(Q, {
		label: "Release",
		paramKey: "ampRelease"
	}), null), P(e, A(Q, {
		label: "Master",
		paramKey: "masterVolume"
	}), null), e;
})();
//#endregion
//#region src/store/persistence.ts
function Bt(e) {
	return e * 255 >>> 0;
}
function Vt(e) {
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
		].map(Bt)];
	},
	deserializeParameters(e) {
		let t = e.map(Vt);
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
}, Ht = 1, Ut = {
	emitStateBytes() {
		let { presetName: e, parameters: t } = J, n = $.serializeParameters(t), r = $.presetNameToIndex(e);
		return new Uint8Array([
			Ht,
			r,
			...n
		]);
	},
	applyStateBytes(e) {
		if (e.length === 14 && e[0] === Ht) {
			let t = e[1];
			gt({
				presetName: $.presetNameFromIndex(t),
				parameters: $.deserializeParameters([...e.slice(2)])
			});
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function Wt(e, t) {
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
async function Gt() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function Kt(e) {
	let t, n = !1;
	return (async () => {
		let r = await Gt();
		n || r && (t = Wt(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/MainApp.tsx
var qt = /* @__PURE__ */ M("<div class=flex-c><div class=\"bg-gray-100 border border-gray-400 shadow-xl overflow-hidden\"style=width:500px;height:270px;display:flex;flex-direction:column><div class=\"flex-h flex-1 px-2\">"), Jt = () => {
	let e, t = Et();
	return Y ? Y.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "synthesizer",
			outputs: ["audio"],
			inputs: ["note"]
		},
		noteInput: {
			async noteOn(e, n) {
				t.noteOn(e, 1, n);
			},
			noteOff(e, n) {
				t.noteOff(e, n);
			}
		},
		persistence: Ut
	}) : ae(Kt({
		async noteOn(e) {
			await t.resumeIfNeed(), t.noteOn(e, 1, 0);
		},
		noteOff(e) {
			t.noteOff(e, 0);
		}
	})), ie(() => {
		e.addEventListener("mousedown", async () => {
			await t.resumeIfNeed(), console.log("resumed");
		}, {
			capture: !0,
			once: !0
		});
	}), (() => {
		var t = qt(), n = t.firstChild, r = n.firstChild, i = e;
		return typeof i == "function" ? Ye(i, n) : e = n, P(n, A(Pt, {}), r), P(r, A(Lt, {}), null), P(r, A(zt, {}), null), t;
	})();
}, Yt = rt((e) => Be(() => A(Jt, {}), e), ["@import \"https://fonts.googleapis.com/css2?family=Orbitron:wght@400..700&display=swap\";@layer components;@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-300:oklch(87.2% .01 258.338);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-800:oklch(27.8% .033 256.848);--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--font-weight-semibold:600;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer utilities{.flex{display:flex}.h-2{height:calc(var(--spacing) * 2)}.h-8{height:calc(var(--spacing) * 8)}.h-8\\.5{height:calc(var(--spacing) * 8.5)}.w-10{width:calc(var(--spacing) * 10)}.w-16{width:calc(var(--spacing) * 16)}.w-40{width:calc(var(--spacing) * 40)}.w-full{width:100%}.flex-1{flex:1}.cursor-pointer{cursor:pointer}.appearance-none{appearance:none}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-0{gap:calc(var(--spacing) * 0)}.gap-1{gap:calc(var(--spacing) * 1)}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.border{border-style:var(--tw-border-style);border-width:1px}.border-r{border-right-style:var(--tw-border-style);border-right-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-gray-400{border-color:var(--color-gray-400)}.border-gray-500{border-color:var(--color-gray-500)}.bg-gray-100{background-color:var(--color-gray-100)}.bg-gray-200{background-color:var(--color-gray-200)}.bg-gray-300{background-color:var(--color-gray-300)}.bg-white{background-color:var(--color-white)}.p-2{padding:calc(var(--spacing) * 2)}.px-2{padding-inline:calc(var(--spacing) * 2)}.text-center{text-align:center}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-gray-800{color:var(--color-gray-800)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.outline-none{--tw-outline-style:none;outline-style:none}.select-none{-webkit-user-select:none;user-select:none}@media (hover:hover){.hover\\:bg-gray-400:hover{background-color:var(--color-gray-400)}}}body{-webkit-user-select:none;user-select:none;font-family:Orbitron,sans-serif}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"]);
//#endregion
export { Yt as default };
