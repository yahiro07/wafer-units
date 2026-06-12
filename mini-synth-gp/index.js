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
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = typeof Proxy == "function", s = Symbol("solid-track"), c = { equals: i }, l = null, u = pe, d = 1, f = 2, p = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, m = null, h = null, g = null, _ = null, v = null, y = null, b = null, x = 0;
function S(e, t) {
	let n = v, r = m, i = e.length === 0, a = t === void 0 ? r : t, o = i ? p : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => E(() => k(o)));
	m = o, v = null;
	try {
		return O(s, !0);
	} finally {
		v = n, m = r;
	}
}
function C(e, t) {
	t = t ? Object.assign({}, c, t) : c;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [se.bind(n), (e) => (typeof e == "function" && (e = h && h.running && h.sources.has(n) ? e(n.tValue) : e(n.value)), ce(n, e))];
}
function w(e, t, n) {
	let r = ue(e, t, !1, d);
	g && h && h.running ? y.push(r) : D(r);
}
function T(e, t, n) {
	n = n ? Object.assign({}, c, n) : c;
	let r = ue(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, g && h && h.running ? (r.tState = d, y.push(r)) : D(r), se.bind(r);
}
function ee(e) {
	return O(e, !1);
}
function E(e) {
	if (!_ && v === null) return e();
	let t = v;
	v = null;
	try {
		return _ ? _.untrack(e) : e();
	} finally {
		v = t;
	}
}
function te(e) {
	return m === null || (m.cleanups === null ? m.cleanups = [e] : m.cleanups.push(e)), e;
}
function ne() {
	return v;
}
function re(e) {
	if (h && h.running) return e(), h.done;
	let t = v, n = m;
	return Promise.resolve().then(() => {
		v = t, m = n;
		let r;
		return (g || oe) && (r = h ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), O(e, !1), v = m = null, r ? r.done : void 0;
	});
}
var [ie, ae] = /* @__PURE__ */ C(!1), oe;
function se() {
	let e = h && h.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === d) D(this);
	else {
		let e = y;
		y = null, O(() => he(this), !1), y = e;
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
function ce(e, t, n) {
	let r = h && h.running && h.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (h) {
			let r = h.running;
			(r || !n && h.sources.has(e)) && (h.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && O(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = h && h.running;
				r && h.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? y.push(n) : b.push(n), n.observers && ge(n)), r ? n.tState = d : n.state = d);
			}
			if (y.length > 1e6) throw y = [], Error();
		}, !1);
	}
	return t;
}
function D(e) {
	if (!e.fn) return;
	k(e);
	let t = x;
	le(e, h && h.running && h.sources.has(e) ? e.tValue : e.value, t), h && !h.running && h.sources.has(e) && queueMicrotask(() => {
		O(() => {
			h && (h.running = !0), v = m = e, le(e, e.tValue, t), v = m = null;
		}, !1);
	});
}
function le(e, t, n) {
	let r, i = m, a = v;
	v = m = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (h && h.running ? (e.tState = d, e.tOwned && e.tOwned.forEach(k), e.tOwned = void 0) : (e.state = d, e.owned && e.owned.forEach(k), e.owned = null)), e.updatedAt = n + 1, be(t);
	} finally {
		v = a, m = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? ce(e, r, !0) : h && h.running && e.pure ? (h.sources.has(e) || (e.value = r), h.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function ue(e, t, n, r = d, i) {
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
		let e = a.fn, [t, n] = C(void 0, { equals: !1 }), r = _.factory(e, n);
		te(() => r.dispose());
		let i, o = () => re(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), h && h.running ? (i ||= _.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function de(e) {
	let t = h && h.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === f) return he(e);
	if (e.suspense && E(e.suspense.inFallback)) return e.suspense.effects.push(e);
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
		if ((t ? e.tState : e.state) === d) D(e);
		else if ((t ? e.tState : e.state) === f) {
			let t = y;
			y = null, O(() => he(e, n[0]), !1), y = t;
		}
	}
}
function O(e, t) {
	if (y) return e();
	let n = !1;
	t || (y = []), b ? n = !0 : b = [], x++;
	try {
		let t = e();
		return fe(n), t;
	} catch (e) {
		n || (b = null), y = null, be(e);
	}
}
function fe(e) {
	if (y &&= (g && h && h.running ? me(y) : pe(y), null), e) return;
	let t;
	if (h) {
		if (!h.promises.size && !h.queue.size) {
			let e = h.sources, n = h.disposed;
			b.push.apply(b, h.effects), t = h.resolve;
			for (let e of b) "tState" in e && (e.state = e.tState), delete e.tState;
			h = null, O(() => {
				for (let e of n) k(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) k(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				ae(!1);
			}, !1);
		} else if (h.running) {
			h.running = !1, h.effects.push.apply(h.effects, b), b = null, ae(!0);
			return;
		}
	}
	let n = b;
	b = null, n.length && O(() => u(n), !1), t && t();
}
function pe(e) {
	for (let t = 0; t < e.length; t++) de(e[t]);
}
function me(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = h.queue;
		r.has(n) || (r.add(n), g(() => {
			r.delete(n), O(() => {
				h.running = !0, de(n);
			}, !1), h && (h.running = !1);
		}));
	}
}
function he(e, t) {
	let n = h && h.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === d ? i !== t && (!i.updatedAt || i.updatedAt < x) && de(i) : e === f && he(i, t);
		}
	}
}
function ge(e) {
	let t = h && h.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = f : r.state = f, r.pure ? y.push(r) : b.push(r), r.observers && ge(r));
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
	if (h && h.running && e.pure) _e(e, !0);
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
function _e(e, t) {
	if (t || (e.tState = 0, h.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) _e(e.owned[t]);
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
function be(e, t = m) {
	let n = l && t && t.context && t.context[l], r = ve(e);
	if (!n) throw r;
	b ? b.push({
		fn() {
			ye(r, n, t);
		},
		state: d
	}) : ye(r, n, t);
}
var xe = Symbol("fallback");
function Se(e) {
	for (let t = 0; t < e.length; t++) e[t]();
}
function Ce(e, t, n = {}) {
	let r = [], i = [], a = [], o = 0, c = t.length > 1 ? [] : null;
	return te(() => Se(a)), () => {
		let l = e() || [], u = l.length, d, f;
		return l[s], E(() => {
			let e, t, s, m, h, g, _, v, y;
			if (u === 0) o !== 0 && (Se(a), a = [], r = [], i = [], o = 0, c &&= []), n.fallback && (r = [xe], i[0] = S((e) => (a[0] = e, n.fallback())), o = 1);
			else if (o === 0) {
				for (i = Array(u), f = 0; f < u; f++) r[f] = l[f], i[f] = S(p);
				o = u;
			} else {
				for (s = Array(u), m = Array(u), c && (h = Array(u)), g = 0, _ = Math.min(o, u); g < _ && r[g] === l[g]; g++);
				for (_ = o - 1, v = u - 1; _ >= g && v >= g && r[_] === l[v]; _--, v--) s[v] = i[_], m[v] = a[_], c && (h[v] = c[_]);
				for (e = /* @__PURE__ */ new Map(), t = Array(v + 1), f = v; f >= g; f--) y = l[f], d = e.get(y), t[f] = d === void 0 ? -1 : d, e.set(y, f);
				for (d = g; d <= _; d++) y = r[d], f = e.get(y), f !== void 0 && f !== -1 ? (s[f] = i[d], m[f] = a[d], c && (h[f] = c[d]), f = t[f], e.set(y, f)) : a[d]();
				for (f = g; f < u; f++) f in s ? (i[f] = s[f], a[f] = m[f], c && (c[f] = h[f], c[f](f))) : i[f] = S(p);
				i = i.slice(0, o = u), r = l.slice(0);
			}
			return i;
		});
		function p(e) {
			if (a[f] = e, c) {
				let [e, n] = C(f);
				return c[f] = n, t(l[f], e);
			}
			return t(l[f]);
		}
	};
}
var we = !1;
function A(t, i) {
	if (we && e.context) {
		let a = e.context;
		n(r());
		let o = E(() => t(i || {}));
		return n(a), o;
	}
	return E(() => t(i || {}));
}
function j() {
	return !0;
}
var Te = {
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
function Ee(e) {
	return (e = typeof e == "function" ? e() : e) ? e : {};
}
function De() {
	for (let e = 0, t = this.length; e < t; ++e) {
		let t = this[e]();
		if (t !== void 0) return t;
	}
}
function Oe(...e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t ||= !!r && a in r, e[n] = typeof r == "function" ? (t = !0, T(r)) : r;
	}
	if (o && t) return new Proxy({
		get(t) {
			for (let n = e.length - 1; n >= 0; n--) {
				let r = Ee(e[n])[t];
				if (r !== void 0) return r;
			}
		},
		has(t) {
			for (let n = e.length - 1; n >= 0; n--) if (t in Ee(e[n])) return !0;
			return !1;
		},
		keys() {
			let t = [];
			for (let n = 0; n < e.length; n++) t.push(...Object.keys(Ee(e[n])));
			return [...new Set(t)];
		}
	}, Te);
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
				get: De.bind(n[t] = [o.get.bind(i)])
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
function ke(e) {
	let t = "fallback" in e && { fallback: () => e.fallback };
	return T(Ce(() => e.each, e.children, t || void 0));
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
}, Le = (e) => T(() => e());
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
	return S((r) => {
		i = r, t === document ? e() : F(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function M(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => E(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function N(e, t = window.document) {
	let n = t[ze] || (t[ze] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, $e));
	}
}
function P(e, t, n) {
	I(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ve(e, t, n, r) {
	I(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function He(e, t, n) {
	I(e) || (n ? e.setAttribute(t, "") : e.removeAttribute(t));
}
function Ue(e, t) {
	I(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function We(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function Ge(e, t, n = {}) {
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
function Ke(e, t, n) {
	if (!t) return n ? P(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function qe(e, t = {}, n, r) {
	let i = {};
	return r || w(() => i.children = L(e, t.children, i.children)), w(() => typeof t.ref == "function" && Je(t.ref, e)), w(() => Ye(e, t, n, !0, i, !0)), i;
}
function Je(e, t, n) {
	return E(() => e(t, n));
}
function F(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return L(e, t, r, n);
	w((r) => L(e, t(), r, n), r);
}
function Ye(e, t, n, r, i = {}, a = !1) {
	t ||= {};
	for (let r in i) if (!(r in t)) {
		if (r === "children") continue;
		i[r] = Qe(e, r, null, i[r], n, a, t);
	}
	for (let o in t) {
		if (o === "children") {
			r || L(e, t.children);
			continue;
		}
		let s = t[o];
		i[o] = Qe(e, o, s, i[o], n, a, t);
	}
}
function I(t) {
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
	if (t === "style") return Ke(e, n, r);
	if (t === "classList") return Ge(e, n, r);
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
		(a || n) && (We(e, i, n, a), a && N([i]));
	} else if (t.slice(0, 5) === "attr:") P(e, t.slice(5), n);
	else if (t.slice(0, 5) === "bool:") He(e, t.slice(5), n);
	else if ((d = t.slice(0, 5) === "prop:") || (l = je.has(t)) || !i && ((u = Pe(t, e.tagName)) || (c = Ae.has(t))) || (s = e.nodeName.includes("-") || "is" in o)) {
		if (d) t = t.slice(5), c = !0;
		else if (I(e)) return n;
		t === "class" || t === "className" ? Ue(e, n) : s && !c && !l ? e[Xe(t)] = n : e[u || t] = n;
	} else {
		let r = i && t.indexOf(":") > -1 && Ie[t.split(":")[0]];
		r ? Ve(e, r, t, n) : P(e, Me[t] || t, n);
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
function L(e, t, n, r, i) {
	let a = I(e);
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
	} else if (o === "function") return w(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = L(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (et(o, t, n, i)) return w(() => n = L(e, o, n, r, !0)), () => n;
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
		} else c ? n.length === 0 ? tt(e, o, r) : Re(e, n, o) : (n && R(e), tt(e, o));
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
function et(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = et(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = et(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function tt(e, t, n = null) {
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
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/unit-helper/index.js
function nt(e, t) {
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
//#region src/audio/default-parameters.ts
var z = {
	oscWave: 0,
	oscDetune: 0,
	oscSub: 0,
	oscDrift: 0,
	fxChorus: 0,
	fxReverb: 0,
	filterCutoff: .9,
	filterPeak: 0,
	filterEnvMod: 0,
	ampDecay: 1,
	ampRelease: .2,
	ampMaster: .8
};
function B(e = z) {
	return { ...e };
}
//#endregion
//#region src/audio/presets.ts
var V = [
	{
		name: "Init",
		parameters: B(z)
	},
	{
		name: "Bass1",
		parameters: {
			oscWave: 1,
			oscDetune: .15,
			oscSub: .55,
			oscDrift: .06,
			fxChorus: .08,
			fxReverb: .06,
			filterCutoff: .32,
			filterPeak: .52,
			filterEnvMod: .72,
			ampDecay: .38,
			ampRelease: .12,
			ampMaster: .82
		}
	},
	{
		name: "Bass2",
		parameters: {
			oscWave: 0,
			oscDetune: .22,
			oscSub: .68,
			oscDrift: .04,
			fxChorus: 0,
			fxReverb: .04,
			filterCutoff: .25,
			filterPeak: .64,
			filterEnvMod: .88,
			ampDecay: .32,
			ampRelease: .1,
			ampMaster: .84
		}
	},
	{
		name: "Lead1",
		parameters: {
			oscWave: 0,
			oscDetune: .3,
			oscSub: .15,
			oscDrift: .12,
			fxChorus: .32,
			fxReverb: .22,
			filterCutoff: .62,
			filterPeak: .34,
			filterEnvMod: .48,
			ampDecay: .58,
			ampRelease: .34,
			ampMaster: .8
		}
	},
	{
		name: "Lead2",
		parameters: {
			oscWave: 2,
			oscDetune: .26,
			oscSub: .08,
			oscDrift: .1,
			fxChorus: .42,
			fxReverb: .28,
			filterCutoff: .7,
			filterPeak: .2,
			filterEnvMod: .3,
			ampDecay: .66,
			ampRelease: .42,
			ampMaster: .78
		}
	},
	{
		name: "Pad1",
		parameters: {
			oscWave: 3,
			oscDetune: .35,
			oscSub: .12,
			oscDrift: .2,
			fxChorus: .7,
			fxReverb: .68,
			filterCutoff: .54,
			filterPeak: .12,
			filterEnvMod: .16,
			ampDecay: 1,
			ampRelease: .75,
			ampMaster: .72
		}
	},
	{
		name: "Pad2",
		parameters: {
			oscWave: 2,
			oscDetune: .4,
			oscSub: .18,
			oscDrift: .25,
			fxChorus: .86,
			fxReverb: .74,
			filterCutoff: .46,
			filterPeak: .24,
			filterEnvMod: .22,
			ampDecay: 1,
			ampRelease: .82,
			ampMaster: .68
		}
	}
], rt = /* @__PURE__ */ M("<label class=\"flex-ha h-9 w-full gap-2 text-xs\"><span class=\"w-14 text-zinc-200\"></span><input type=range class=\"h-5 w-[170px] accent-amber-400\"><span class=\"w-9 text-right text-zinc-400\">");
function it(e) {
	return (() => {
		var t = rt(), n = t.firstChild, r = n.nextSibling, i = r.nextSibling;
		return F(n, () => e.label), r.$$input = (t) => {
			e.onInput(Number(t.currentTarget.value));
		}, F(i, () => e.value.toFixed(e.step >= 1 ? 0 : 2)), w((t) => {
			var n = e.min, i = e.max, a = e.step;
			return n !== t.e && P(r, "min", t.e = n), i !== t.t && P(r, "max", t.t = i), a !== t.a && P(r, "step", t.a = a), t;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		}), w(() => r.value = e.value), t;
	})();
}
N(["input"]);
//#endregion
//#region src/organisms/parameter-column.tsx
var at = /* @__PURE__ */ M("<section class=\"flex-v h-full w-full border border-slate-600 bg-slate-800/55 p-3\"><h2 class=\"mb-2 border-b border-slate-600 pb-1 text-[11px] tracking-[0.24em] text-slate-300\"></h2><div class=\"flex-v gap-1\">");
function ot(e) {
	return (() => {
		var t = at(), n = t.firstChild, r = n.nextSibling;
		return F(n, () => e.title), F(r, A(ke, {
			get each() {
				return e.definitions;
			},
			children: (t) => A(it, {
				get label() {
					return t.label;
				},
				get min() {
					return t.min;
				},
				get max() {
					return t.max;
				},
				get step() {
					return t.step;
				},
				get value() {
					return e.parameters[t.key] ?? 0;
				},
				onInput: (n) => e.onSetParameter(t.key, n)
			})
		})), t;
	})();
}
//#endregion
//#region src/store/parameter-definitions.ts
var st = [
	{
		key: "oscWave",
		label: "Wave",
		min: 0,
		max: 3,
		step: 1
	},
	{
		key: "oscDetune",
		label: "Detune",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "oscSub",
		label: "Sub",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "oscDrift",
		label: "Drift",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "fxChorus",
		label: "Chorus",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "fxReverb",
		label: "Reverb",
		min: 0,
		max: 1,
		step: .01
	}
], ct = [
	{
		key: "filterCutoff",
		label: "Cutoff",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "filterPeak",
		label: "Peak",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "filterEnvMod",
		label: "EnvMod",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "ampDecay",
		label: "Decay",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "ampRelease",
		label: "Release",
		min: 0,
		max: 1,
		step: .01
	},
	{
		key: "ampMaster",
		label: "Master",
		min: 0,
		max: 1,
		step: .01
	}
], lt = /* @__PURE__ */ M("<section class=\"flex-h h-full w-full gap-2\">");
function ut(e) {
	return (() => {
		var t = lt();
		return F(t, A(ot, {
			title: "OSC / FX",
			definitions: st,
			get parameters() {
				return e.parameters;
			},
			get onSetParameter() {
				return e.onSetParameter;
			}
		}), null), F(t, A(ot, {
			title: "FILTER / AMP",
			definitions: ct,
			get parameters() {
				return e.parameters;
			},
			get onSetParameter() {
				return e.onSetParameter;
			}
		}), null), t;
	})();
}
//#endregion
//#region src/components/icon-button.tsx
var dt = /* @__PURE__ */ M("<button type=button class=\"flex-c h-10 w-12 border border-zinc-700 bg-navy-950 text-gray-100 hover:bg-zinc-800 active:bg-zinc-700\">");
function ft(e) {
	return (() => {
		var t = dt();
		return We(t, "click", e.onClick, !0), F(t, () => e.children), w(() => P(t, "aria-label", e.label)), t;
	})();
}
N(["click"]);
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/lib/index.jsx
var pt = /* @__PURE__ */ M("<svg>");
function mt(e, t) {
	return (() => {
		var n = pt();
		return qe(n, Oe(() => e.a, t, {
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
function ht(e) {
	return mt({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function gt(e) {
	return mt({
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
var _t = {
	Left: ht,
	Right: gt
}, vt = /* @__PURE__ */ M("<div class=\"flex-ha gap-2\"><select class=\"h-10 w-[220px] border border-zinc-700 bg-navy-950 px-3 text-sm text-zinc-100 outline-none focus:border-amber-400\">"), yt = /* @__PURE__ */ M("<option>");
function bt(e) {
	return (() => {
		var t = vt(), n = t.firstChild;
		return F(t, A(ft, {
			label: "Previous program",
			onClick: () => e.onShift(-1),
			get children() {
				return A(_t.Left, { size: 18 });
			}
		}), n), n.$$input = (t) => e.onSelectIndex(Number(t.currentTarget.value)), F(n, A(ke, {
			get each() {
				return e.names;
			},
			children: (e, t) => (() => {
				var n = yt();
				return F(n, e), w(() => n.value = t()), n;
			})()
		})), F(t, A(ft, {
			label: "Next program",
			onClick: () => e.onShift(1),
			get children() {
				return A(_t.Right, { size: 18 });
			}
		}), null), w(() => n.value = e.selectedIndex), t;
	})();
}
N(["input"]);
//#endregion
//#region src/sections/top-column-section.tsx
var xt = /* @__PURE__ */ M("<section class=\"flex-ha h-14 w-full border border-slate-600 bg-slate-800/55 px-3\"><div class=\"flex-ha w-full justify-between gap-3\"><div class=\"text-[10px] tracking-[0.18em] text-slate-300\">MIDI ");
function St(e) {
	return (() => {
		var t = xt(), n = t.firstChild, r = n.firstChild;
		return r.firstChild, F(n, A(bt, {
			get selectedIndex() {
				return e.selectedProgramIndex;
			},
			get names() {
				return e.programNames;
			},
			get onSelectIndex() {
				return e.onSelectProgram;
			},
			get onShift() {
				return e.onShiftProgram;
			}
		}), r), F(r, () => e.midiConnected ? "CONNECTED" : "WAITING", null), t;
	})();
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/store/dist/store.js
var Ct = Symbol("store-raw"), H = Symbol("store-node"), U = Symbol("store-has"), wt = Symbol("store-self");
function Tt(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, At) }), !Array.isArray(e))) {
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
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function G(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[Ct]) return n;
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
function Et(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function K(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = C(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function Dt(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === H ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function Ot(e) {
	ne() && K(Et(e, H), wt)();
}
function kt(e) {
	return Ot(e), Reflect.ownKeys(e);
}
var At = {
	get(e, t, n) {
		if (t === Ct) return e;
		if (t === a) return n;
		if (t === s) return Ot(e), n;
		let r = Et(e, H), i = r[t], o = i ? i() : e[t];
		if (t === H || t === U || t === "__proto__") return o;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ne() && (typeof o != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (o = K(r, t, o)());
		}
		return W(o) ? Tt(o) : o;
	},
	has(e, t) {
		return t === Ct || t === a || t === s || t === H || t === U || t === "__proto__" ? !0 : (ne() && K(Et(e, U), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: kt,
	getOwnPropertyDescriptor: Dt
};
function jt(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[U] && e[U][t] && i !== void 0 && e[U][t].$()) : (e[t] = n, e[U] && e[U][t] && i === void 0 && e[U][t].$());
	let o = Et(e, H), s;
	if ((s = K(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = K(o, "length", a)) && s.$(e.length);
	}
	(s = o[wt]) && s.$();
}
function Mt(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Nt(i) || jt(e, i, t[i]);
	}
}
function Nt(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Pt(e, t) {
	if (typeof t == "function" && (t = t(e)), t = G(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && jt(e, n, r);
		}
		jt(e, "length", r);
	} else Mt(e, t);
}
function q(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Nt(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) q(e, [r[i]].concat(t), n);
			return;
		} else if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && q(e, [i].concat(t), n);
			return;
		} else if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) q(e, [r].concat(t), n);
			return;
		} else if (t.length > 1) {
			q(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = G(a), r === void 0 || W(i) && W(a) && !Array.isArray(a) ? Mt(i, a) : jt(e, r, a));
}
function Ft(...[e, t]) {
	let n = G(e || {}), r = Array.isArray(n), i = Tt(n);
	function a(...e) {
		ee(() => {
			r && e.length === 1 ? Pt(n, e[0]) : q(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/store/app-store.ts
var [J, Y] = Ft({
	selectedProgramIndex: 0,
	midiConnected: !1,
	parameters: B(z)
});
//#endregion
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/v01/index.js
function It(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/utils/number-utils.ts
function X(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Z(e, t, n) {
	return t + (n - t) * e;
}
function Lt(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? X(o, Math.min(r, i), Math.max(r, i)) : o;
}
//#endregion
//#region src/audio/create-chorus-module.ts
function Rt(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createGain(), a = e.createDelay(.05), o = e.createDelay(.05);
	a.delayTime.value = .01, o.delayTime.value = .016;
	let s = e.createOscillator(), c = e.createOscillator(), l = e.createGain(), u = e.createGain();
	s.type = "sine", c.type = "triangle", s.frequency.value = .23, c.frequency.value = .31, l.gain.value = 0, u.gain.value = 0, t.connect(r), t.connect(a), t.connect(o), a.connect(i), o.connect(i), r.connect(n), i.connect(n), s.connect(l), c.connect(u), l.connect(a.delayTime), u.connect(o.delayTime), s.start(), c.start();
	function d(t) {
		let n = X(t.amount, 0, 1), a = e.currentTime;
		r.gain.setTargetAtTime(1 - n * .55, a, .02), i.gain.setTargetAtTime(n * .85, a, .02), l.gain.setTargetAtTime(.0025 * n, a, .02), u.gain.setTargetAtTime(.0032 * n, a, .02);
	}
	return {
		inputNode: t,
		outputNode: n,
		updateNodeParameters: d
	};
}
//#endregion
//#region src/audio/create-reverb-module.ts
function zt(e, t, n) {
	let r = e.sampleRate, i = Math.floor(r * t), a = e.createBuffer(2, i, r);
	for (let e = 0; e < a.numberOfChannels; e += 1) {
		let t = a.getChannelData(e);
		for (let e = 0; e < i; e += 1) {
			let r = e / i;
			t[e] = (Math.random() * 2 - 1) * (1 - r) ** n;
		}
	}
	return a;
}
function Bt(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createGain(), a = e.createConvolver();
	a.buffer = zt(e, 2.4, 2.8), t.connect(r), t.connect(a), a.connect(i), r.connect(n), i.connect(n);
	function o(t) {
		let n = X(t.amount, 0, 1), a = e.currentTime;
		r.gain.setTargetAtTime(1 - n * .65, a, .03), i.gain.setTargetAtTime(n * .8, a, .03);
	}
	return {
		inputNode: t,
		outputNode: n,
		updateNodeParameters: o
	};
}
//#endregion
//#region src/audio/create-mini-synth-audio.ts
var Vt = It("wus-v01", import.meta.url), Ht = [
	"sawtooth",
	"square",
	"triangle",
	"sine"
];
function Ut(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
function Wt(e) {
	return Ht[Math.round(X(e, 0, 3))];
}
function Gt(e) {
	return Z(e, 80, 12e3);
}
function Kt(e) {
	return Z(e, 0, 26);
}
function qt(e) {
	return Z(e, 0, 12);
}
function Jt(e) {
	return e >= .999 ? .01 : Lt(e, 0, 1, .08, 2.4, !0);
}
function Yt(e) {
	return Lt(e, 0, 1, .02, 2.6, !0);
}
function Xt(e) {
	return Lt(e, 0, 1, .06, 1.4, !0);
}
function Zt(e, t, n, r, i) {
	let a = i ?? e.currentTime, o = Ut(n), s = e.createGain(), c = e.createGain(), l = e.createGain(), u = e.createBiquadFilter(), d = e.createOscillator(), f = e.createOscillator(), p = e.createOscillator(), m = e.createGain(), h = e.createGain(), g = e.createGain(), _ = e.createOscillator(), v = e.createGain(), y = e.createGain();
	u.type = "lowpass", l.gain.value = 0, d.connect(m), f.connect(h), p.connect(g), m.connect(c), h.connect(c), g.connect(c), c.connect(u), u.connect(l), l.connect(s), _.type = "sine", _.frequency.value = .24, _.connect(v), _.connect(y), v.connect(d.detune), y.connect(f.detune), d.frequency.value = o, f.frequency.value = o, p.frequency.value = o / 2, p.type = "triangle";
	let b = {
		noteNumber: n,
		outputNode: s,
		filterNode: u,
		ampNode: l,
		oscMain: d,
		oscDetuned: f,
		oscSub: p,
		oscDetunedGain: h,
		oscSubGain: g,
		driftLfoNode: _,
		driftLfoGainMain: v,
		driftLfoGainDetuned: y,
		released: !1,
		velocity: r
	};
	Qt(e, b, t);
	let x = X(.22 + r * .6, .2, 1);
	l.gain.cancelScheduledValues(a), l.gain.setValueAtTime(0, a), l.gain.linearRampToValueAtTime(x, a + .01);
	let S = t.ampDecay >= .999 ? x : 0, C = Jt(t.ampDecay);
	S !== x && l.gain.setTargetAtTime(S, a + .01, C / 3.5);
	let w = Gt(t.filterCutoff), T = Z(t.filterEnvMod, 0, 9e3), ee = Math.min(w + T, 16e3);
	return u.frequency.cancelScheduledValues(a), u.frequency.setValueAtTime(w, a), u.frequency.linearRampToValueAtTime(ee, a + .005), u.frequency.setTargetAtTime(w, a + .005, Xt(t.ampDecay) / 3.2), d.start(a), f.start(a), p.start(a), _.start(a), b;
}
function Qt(e, t, n) {
	let r = e.currentTime, i = Wt(n.oscWave);
	t.oscMain.type = i, t.oscDetuned.type = i;
	let a = Kt(n.oscDetune);
	t.oscDetuned.detune.setTargetAtTime(a, r, .02);
	let o = n.oscDetune > 0 ? .55 : 0;
	t.oscDetunedGain.gain.setTargetAtTime(o, r, .02), t.oscSubGain.gain.setTargetAtTime(n.oscSub * .7, r, .02);
	let s = qt(n.oscDrift);
	t.driftLfoGainMain.gain.setTargetAtTime(s, r, .03), t.driftLfoGainDetuned.gain.setTargetAtTime(s * 1.2, r, .03), t.driftLfoNode.frequency.setTargetAtTime(Lt(n.oscDrift, 0, 1, .12, .45, !0), r, .03), t.filterNode.frequency.setTargetAtTime(Gt(n.filterCutoff), r, .03), t.filterNode.Q.setTargetAtTime(Z(n.filterPeak, .3, 22), r, .03);
}
function $t(e, t, n, r, i) {
	if (t.released) return;
	t.released = !0;
	let a = r ?? e.currentTime, o = Yt(n.ampRelease);
	t.ampNode.gain.cancelScheduledValues(a), t.ampNode.gain.setValueAtTime(Math.max(t.ampNode.gain.value, 1e-4), a), t.ampNode.gain.setTargetAtTime(1e-4, a, o / 4);
	let s = a + o * 1.3;
	t.oscMain.stop(s), t.oscDetuned.stop(s), t.oscSub.stop(s), t.driftLfoNode.stop(s);
	let c = (a - e.currentTime + o * 1.4) * 1e3;
	setTimeout(i, Math.max(0, c));
}
function en() {
	let e = Vt?.audioContext ?? new AudioContext(), t = Vt?.audioOutputNode ?? e.destination, n = e.createGain(), r = e.createGain(), i = Rt(e), a = Bt(e);
	r.connect(i.inputNode), i.outputNode.connect(a.inputNode), a.outputNode.connect(n), n.connect(t);
	let o = /* @__PURE__ */ new Map(), s = B(z);
	function c(t) {
		s = B(t), i.updateNodeParameters({ amount: s.fxChorus }), a.updateNodeParameters({ amount: s.fxReverb }), n.gain.setTargetAtTime(s.ampMaster, e.currentTime, .03), o.forEach((t) => {
			Qt(e, t, s);
		});
	}
	function l(t, n, i) {
		u(t, i);
		let a = Zt(e, s, t, n, i);
		a.outputNode.connect(r), o.set(t, a);
	}
	function u(t, n) {
		let r = o.get(t);
		r && (o.delete(t), $t(e, r, s, n, () => {
			r.outputNode.disconnect(), o.get(t) === r && o.delete(t);
		}));
	}
	function d() {
		Array.from(o.keys()).forEach((e) => {
			u(e);
		});
	}
	return c(s), {
		audioContext: e,
		updateParameters: c,
		noteOn: l,
		noteOff: u,
		allNotesOff: d
	};
}
//#endregion
//#region src/store/persistence.ts
function tn(e) {
	return e * 255 >>> 0;
}
function nn(e) {
	return e / 255;
}
var rn = {
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
			t.ampMaster
		].map(tn)];
	},
	deserializeParameters(e) {
		let t = e.map(nn);
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
			ampMaster: t[11]
		};
	}
}, an = 1, on = {
	emitStateBytes() {
		let { selectedProgramIndex: e, parameters: t } = J, n = rn.serializeParameters(t);
		return new Uint8Array([
			an,
			e,
			...n
		]);
	},
	applyStateBytes(e) {
		if (e.length === 14 && e[0] === an) {
			let t = e[1], n = rn.deserializeParameters([...e.slice(2)]);
			$.loadStates({
				selectedProgramIndex: t,
				parameters: n
			});
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function sn(e, t) {
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
async function cn() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function ln(e) {
	let t, n = !1;
	return (async () => {
		let r = await cn();
		n || r && (t = sn(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/store/ui-actions.ts
var Q = en(), un = !1, $ = {
	initialize() {
		if (!un) if (un = !0, Q.updateParameters(J.parameters), Vt) Vt.completeSetup({
			unitAspects: {
				unitType: "instrument",
				categoryHint: "synthesizer",
				outputs: ["audio"],
				inputs: ["note"]
			},
			noteInput: {
				async noteOn(e, t) {
					Q.noteOn(e, 1, t);
				},
				async noteOff(e, t) {
					Q.noteOff(e, t);
				}
			},
			persistence: on
		});
		else return ln({
			connectionStateCallback(e) {
				Y("midiConnected", e);
			},
			noteOn(e, t) {
				Q.audioContext.resume(), Q.noteOn(e, t);
			},
			noteOff(e) {
				Q.noteOff(e);
			}
		});
	},
	setParameter(e, t) {
		Y("parameters", e, e === "oscWave" ? Math.round(t) : t), Q.updateParameters(J.parameters);
	},
	applyPresetByIndex(e) {
		let t = (e + V.length) % V.length, n = V[t];
		Y("selectedProgramIndex", t), Y("parameters", B(n.parameters)), Q.updateParameters(J.parameters);
	},
	shiftProgram(e) {
		$.applyPresetByIndex(J.selectedProgramIndex + e);
	},
	resumeAudio() {
		Q.audioContext.resume();
	},
	allNotesOff() {
		Q.allNotesOff();
	},
	loadStates(e) {
		Y("selectedProgramIndex", e.selectedProgramIndex), Y("parameters", B(e.parameters)), Q.updateParameters(e.parameters);
	}
}, dn = /* @__PURE__ */ M("<main class=\"flex-v h-full w-full gap-2 border border-slate-600 bg-slate-900 p-2 text-slate-100\">"), fn = V.map((e) => e.name);
function pn() {
	return (() => {
		var e = dn();
		return F(e, A(St, {
			get selectedProgramIndex() {
				return J.selectedProgramIndex;
			},
			programNames: fn,
			get midiConnected() {
				return J.midiConnected;
			},
			get onSelectProgram() {
				return $.applyPresetByIndex;
			},
			get onShiftProgram() {
				return $.shiftProgram;
			}
		}), null), F(e, A(ut, {
			get parameters() {
				return J.parameters;
			},
			get onSetParameter() {
				return $.setParameter;
			}
		}), null), e;
	})();
}
//#endregion
//#region src/app.tsx
var mn = /* @__PURE__ */ M("<div class=flex-c><div class=\"h-auto w-[min(96vw,640px)] border border-slate-600\">");
function hn() {
	let e = $.initialize();
	return te(() => {
		e?.(), $.allNotesOff();
	}), (() => {
		var e = mn(), t = e.firstChild;
		return We(t, "pointerdown", $.resumeAudio, !0), F(t, A(pn, {})), e;
	})();
}
N(["pointerdown"]);
//#endregion
//#region src/index.tsx
var gn = nt((e) => Be(() => A(hn, {}), e), ["@import \"https://fonts.googleapis.com/css2?family=Orbitron:wght@400..700&display=swap\";@layer components;@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-tracking:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-amber-400:oklch(82.8% .189 84.429);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-gray-100:oklch(96.7% .003 264.542);--color-zinc-100:oklch(96.7% .001 286.375);--color-zinc-200:oklch(92% .004 286.32);--color-zinc-400:oklch(70.5% .015 286.067);--color-zinc-700:oklch(37% .013 285.805);--color-zinc-800:oklch(27.4% .006 286.033);--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer utilities{.mb-2{margin-bottom:calc(var(--spacing) * 2)}.h-5{height:calc(var(--spacing) * 5)}.h-9{height:calc(var(--spacing) * 9)}.h-10{height:calc(var(--spacing) * 10)}.h-14{height:calc(var(--spacing) * 14)}.h-auto{height:auto}.h-full{height:100%}.w-9{width:calc(var(--spacing) * 9)}.w-12{width:calc(var(--spacing) * 12)}.w-14{width:calc(var(--spacing) * 14)}.w-\\[170px\\]{width:170px}.w-\\[220px\\]{width:220px}.w-\\[min\\(96vw\\,640px\\)\\]{width:min(96vw,640px)}.w-full{width:100%}.justify-between{justify-content:space-between}.gap-1{gap:calc(var(--spacing) * 1)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.border{border-style:var(--tw-border-style);border-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-slate-600{border-color:var(--color-slate-600)}.border-zinc-700{border-color:var(--color-zinc-700)}.bg-slate-800\\/55{background-color:#1d293d8c}@supports (color:color-mix(in lab, red, red)){.bg-slate-800\\/55{background-color:color-mix(in oklab, var(--color-slate-800) 55%, transparent)}}.bg-slate-900{background-color:var(--color-slate-900)}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.px-3{padding-inline:calc(var(--spacing) * 3)}.pb-1{padding-bottom:calc(var(--spacing) * 1)}.text-right{text-align:right}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.tracking-\\[0\\.18em\\]{--tw-tracking:.18em;letter-spacing:.18em}.tracking-\\[0\\.24em\\]{--tw-tracking:.24em;letter-spacing:.24em}.text-gray-100{color:var(--color-gray-100)}.text-slate-100{color:var(--color-slate-100)}.text-slate-300{color:var(--color-slate-300)}.text-zinc-100{color:var(--color-zinc-100)}.text-zinc-200{color:var(--color-zinc-200)}.text-zinc-400{color:var(--color-zinc-400)}.accent-amber-400{accent-color:var(--color-amber-400)}.outline-none{--tw-outline-style:none;outline-style:none}@media (hover:hover){.hover\\:bg-zinc-800:hover{background-color:var(--color-zinc-800)}}.focus\\:border-amber-400:focus{border-color:var(--color-amber-400)}.active\\:bg-zinc-700:active{background-color:var(--color-zinc-700)}}body{-webkit-user-select:none;user-select:none;font-family:Orbitron,sans-serif}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-tracking{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"]);
//#endregion
export { gn as default };
