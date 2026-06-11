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
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = typeof Proxy == "function", s = Symbol("solid-track"), c = { equals: i }, l = null, u = ve, d = 1, f = 2, p = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, m = null, h = null, g = null, _ = null, v = null, y = null, b = null, ee = 0;
function te(e, t) {
	let n = v, r = m, i = e.length === 0, a = t === void 0 ? r : t, o = i ? p : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => S(() => D(o)));
	m = o, v = null;
	try {
		return T(s, !0);
	} finally {
		v = n, m = r;
	}
}
function ne(e, t) {
	t = t ? Object.assign({}, c, t) : c;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [pe.bind(n), (e) => (typeof e == "function" && (e = h && h.running && h.sources.has(n) ? e(n.tValue) : e(n.value)), me(n, e))];
}
function x(e, t, n) {
	let r = ge(e, t, !1, d);
	g && h && h.running ? y.push(r) : C(r);
}
function re(e, t, n) {
	u = be;
	let r = ge(e, t, !1, d), i = fe && de(fe);
	i && (r.suspense = i), (!n || !n.render) && (r.user = !0), b ? b.push(r) : C(r);
}
function ie(e, t, n) {
	n = n ? Object.assign({}, c, n) : c;
	let r = ge(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, g && h && h.running ? (r.tState = d, y.push(r)) : C(r), pe.bind(r);
}
function ae(e) {
	return T(e, !1);
}
function S(e) {
	if (!_ && v === null) return e();
	let t = v;
	v = null;
	try {
		return _ ? _.untrack(e) : e();
	} finally {
		v = t;
	}
}
function oe(e) {
	return m === null || (m.cleanups === null ? m.cleanups = [e] : m.cleanups.push(e)), e;
}
function se() {
	return v;
}
function ce(e) {
	if (h && h.running) return e(), h.done;
	let t = v, n = m;
	return Promise.resolve().then(() => {
		v = t, m = n;
		let r;
		return (g || fe) && (r = h ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), T(e, !1), v = m = null, r ? r.done : void 0;
	});
}
var [le, ue] = /* @__PURE__ */ ne(!1);
function de(e) {
	let t;
	return m && m.context && (t = m.context[e.id]) !== void 0 ? t : e.defaultValue;
}
var fe;
function pe() {
	let e = h && h.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === d) C(this);
	else {
		let e = y;
		y = null, T(() => E(this), !1), y = e;
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
function me(e, t, n) {
	let r = h && h.running && h.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (h) {
			let r = h.running;
			(r || !n && h.sources.has(e)) && (h.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && T(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = h && h.running;
				r && h.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? y.push(n) : b.push(n), n.observers && xe(n)), r ? n.tState = d : n.state = d);
			}
			if (y.length > 1e6) throw y = [], Error();
		}, !1);
	}
	return t;
}
function C(e) {
	if (!e.fn) return;
	D(e);
	let t = ee;
	he(e, h && h.running && h.sources.has(e) ? e.tValue : e.value, t), h && !h.running && h.sources.has(e) && queueMicrotask(() => {
		T(() => {
			h && (h.running = !0), v = m = e, he(e, e.tValue, t), v = m = null;
		}, !1);
	});
}
function he(e, t, n) {
	let r, i = m, a = v;
	v = m = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (h && h.running ? (e.tState = d, e.tOwned && e.tOwned.forEach(D), e.tOwned = void 0) : (e.state = d, e.owned && e.owned.forEach(D), e.owned = null)), e.updatedAt = n + 1, Te(t);
	} finally {
		v = a, m = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? me(e, r, !0) : h && h.running && e.pure ? (h.sources.has(e) || (e.value = r), h.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function ge(e, t, n, r = d, i) {
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
		let e = a.fn, [t, n] = ne(void 0, { equals: !1 }), r = _.factory(e, n);
		oe(() => r.dispose());
		let i, o = () => ce(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), h && h.running ? (i ||= _.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function w(e) {
	let t = h && h.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === f) return E(e);
	if (e.suspense && S(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ee);) {
		if (t && h.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (h.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === d) C(e);
		else if ((t ? e.tState : e.state) === f) {
			let t = y;
			y = null, T(() => E(e, n[0]), !1), y = t;
		}
	}
}
function T(e, t) {
	if (y) return e();
	let n = !1;
	t || (y = []), b ? n = !0 : b = [], ee++;
	try {
		let t = e();
		return _e(n), t;
	} catch (e) {
		n || (b = null), y = null, Te(e);
	}
}
function _e(e) {
	if (y &&= (g && h && h.running ? ye(y) : ve(y), null), e) return;
	let t;
	if (h) {
		if (!h.promises.size && !h.queue.size) {
			let e = h.sources, n = h.disposed;
			b.push.apply(b, h.effects), t = h.resolve;
			for (let e of b) "tState" in e && (e.state = e.tState), delete e.tState;
			h = null, T(() => {
				for (let e of n) D(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) D(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				ue(!1);
			}, !1);
		} else if (h.running) {
			h.running = !1, h.effects.push.apply(h.effects, b), b = null, ue(!0);
			return;
		}
	}
	let n = b;
	b = null, n.length && T(() => u(n), !1), t && t();
}
function ve(e) {
	for (let t = 0; t < e.length; t++) w(e[t]);
}
function ye(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = h.queue;
		r.has(n) || (r.add(n), g(() => {
			r.delete(n), T(() => {
				h.running = !0, w(n);
			}, !1), h && (h.running = !1);
		}));
	}
}
function be(t) {
	let r, i = 0;
	for (r = 0; r < t.length; r++) {
		let e = t[r];
		e.user ? t[i++] = e : w(e);
	}
	if (e.context) {
		if (e.count) {
			e.effects ||= [], e.effects.push(...t.slice(0, i));
			return;
		}
		n();
	}
	for (e.effects && (e.done || !e.count) && (t = [...e.effects, ...t], i += e.effects.length, delete e.effects), r = 0; r < i; r++) w(t[r]);
}
function E(e, t) {
	let n = h && h.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === d ? i !== t && (!i.updatedAt || i.updatedAt < ee) && w(i) : e === f && E(i, t);
		}
	}
}
function xe(e) {
	let t = h && h.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = f : r.state = f, r.pure ? y.push(r) : b.push(r), r.observers && xe(r));
	}
}
function D(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) D(e.tOwned[t]);
		delete e.tOwned;
	}
	if (h && h.running && e.pure) Se(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) D(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	h && h.running ? e.tState = 0 : e.state = 0;
}
function Se(e, t) {
	if (t || (e.tState = 0, h.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) Se(e.owned[t]);
}
function Ce(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function we(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		Te(e, n && n.owner || null);
	}
}
function Te(e, t = m) {
	let n = l && t && t.context && t.context[l], r = Ce(e);
	if (!n) throw r;
	b ? b.push({
		fn() {
			we(r, n, t);
		},
		state: d
	}) : we(r, n, t);
}
var Ee = !1;
function O(t, i) {
	if (Ee && e.context) {
		let a = e.context;
		n(r());
		let o = S(() => t(i || {}));
		return n(a), o;
	}
	return S(() => t(i || {}));
}
function De() {
	return !0;
}
var Oe = {
	get(e, t, n) {
		return t === a ? n : e.get(t);
	},
	has(e, t) {
		return t === a ? !0 : e.has(t);
	},
	set: De,
	deleteProperty: De,
	getOwnPropertyDescriptor(e, t) {
		return {
			configurable: !0,
			enumerable: !0,
			get() {
				return e.get(t);
			},
			set: De,
			deleteProperty: De
		};
	},
	ownKeys(e) {
		return e.keys();
	}
};
function ke(e) {
	return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Ae() {
	for (let e = 0, t = this.length; e < t; ++e) {
		let t = this[e]();
		if (t !== void 0) return t;
	}
}
function je(...e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		t ||= !!r && a in r, e[n] = typeof r == "function" ? (t = !0, ie(r)) : r;
	}
	if (o && t) return new Proxy({
		get(t) {
			for (let n = e.length - 1; n >= 0; n--) {
				let r = ke(e[n])[t];
				if (r !== void 0) return r;
			}
		},
		has(t) {
			for (let n = e.length - 1; n >= 0; n--) if (t in ke(e[n])) return !0;
			return !1;
		},
		keys() {
			let t = [];
			for (let n = 0; n < e.length; n++) t.push(...Object.keys(ke(e[n])));
			return [...new Set(t)];
		}
	}, Oe);
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
				get: Ae.bind(n[t] = [o.get.bind(i)])
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
var Me = /* @__PURE__ */ new Set([
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
]), Ne = /* @__PURE__ */ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]), Pe = /* @__PURE__ */ Object.assign(Object.create(null), {
	className: "class",
	htmlFor: "for"
}), Fe = /* @__PURE__ */ Object.assign(Object.create(null), {
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
function Ie(e, t) {
	let n = Fe[e];
	return typeof n == "object" ? n[t] ? n.$ : void 0 : n;
}
var Le = /* @__PURE__ */ new Set([
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
]), Re = /* @__PURE__ */ new Set(/* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animate.animateColor.animateMotion.animateTransform.circle.clipPath.color-profile.cursor.defs.desc.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.font.font-face.font-face-format.font-face-name.font-face-src.font-face-uri.foreignObject.g.glyph.glyphRef.hkern.image.line.linearGradient.marker.mask.metadata.missing-glyph.mpath.path.pattern.polygon.polyline.radialGradient.rect.set.stop.svg.switch.symbol.text.textPath.tref.tspan.use.view.vkern".split(".")), ze = {
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace"
}, k = (e) => ie(() => e());
function Be(e, t, n) {
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
var Ve = "_$DX_DELEGATE";
function He(e, t, n, r = {}) {
	let i;
	return te((r) => {
		i = r, t === document ? e() : M(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function A(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => S(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function Ue(e, t = window.document) {
	let n = t[Ve] || (t[Ve] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, it));
	}
}
function We(e, t, n) {
	N(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ge(e, t, n, r) {
	N(e) || (r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r));
}
function Ke(e, t, n) {
	N(e) || (n ? e.setAttribute(t, "") : e.removeAttribute(t));
}
function qe(e, t) {
	N(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function Je(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function Ye(e, t, n = {}) {
	let r = Object.keys(t || {}), i = Object.keys(n), a, o;
	for (a = 0, o = i.length; a < o; a++) {
		let r = i[a];
		!r || r === "undefined" || t[r] || (nt(e, r, !1), delete n[r]);
	}
	for (a = 0, o = r.length; a < o; a++) {
		let i = r[a], o = !!t[i];
		!i || i === "undefined" || n[i] === o || !o || (nt(e, i, !0), n[i] = o);
	}
	return n;
}
function Xe(e, t, n) {
	if (!t) return n ? We(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function j(e, t, n) {
	n == null ? e.style.removeProperty(t) : e.style.setProperty(t, n);
}
function Ze(e, t = {}, n, r) {
	let i = {};
	return r || x(() => i.children = P(e, t.children, i.children)), x(() => typeof t.ref == "function" && $e(t.ref, e)), x(() => et(e, t, n, !0, i, !0)), i;
}
function Qe(e, t) {
	let n = e[t];
	return Object.defineProperty(e, t, {
		get() {
			return n();
		},
		enumerable: !0
	}), e;
}
function $e(e, t, n) {
	return S(() => e(t, n));
}
function M(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return P(e, t, r, n);
	x((r) => P(e, t(), r, n), r);
}
function et(e, t, n, r, i = {}, a = !1) {
	t ||= {};
	for (let r in i) if (!(r in t)) {
		if (r === "children") continue;
		i[r] = rt(e, r, null, i[r], n, a, t);
	}
	for (let o in t) {
		if (o === "children") {
			r || P(e, t.children);
			continue;
		}
		let s = t[o];
		i[o] = rt(e, o, s, i[o], n, a, t);
	}
}
function N(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function tt(e) {
	return e.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase());
}
function nt(e, t, n) {
	let r = t.trim().split(/\s+/);
	for (let t = 0, i = r.length; t < i; t++) e.classList.toggle(r[t], n);
}
function rt(e, t, n, r, i, a, o) {
	let s, c, l, u, d;
	if (t === "style") return Xe(e, n, r);
	if (t === "classList") return Ye(e, n, r);
	if (n === r) return r;
	if (t === "ref") a || n(e);
	else if (t.slice(0, 3) === "on:") {
		let i = t.slice(3);
		r && e.removeEventListener(i, r, typeof r != "function" && r), n && e.addEventListener(i, n, typeof n != "function" && n);
	} else if (t.slice(0, 10) === "oncapture:") {
		let i = t.slice(10);
		r && e.removeEventListener(i, r, !0), n && e.addEventListener(i, n, !0);
	} else if (t.slice(0, 2) === "on") {
		let i = t.slice(2).toLowerCase(), a = Le.has(i);
		if (!a && r) {
			let t = Array.isArray(r) ? r[0] : r;
			e.removeEventListener(i, t);
		}
		(a || n) && (Je(e, i, n, a), a && Ue([i]));
	} else if (t.slice(0, 5) === "attr:") We(e, t.slice(5), n);
	else if (t.slice(0, 5) === "bool:") Ke(e, t.slice(5), n);
	else if ((d = t.slice(0, 5) === "prop:") || (l = Ne.has(t)) || !i && ((u = Ie(t, e.tagName)) || (c = Me.has(t))) || (s = e.nodeName.includes("-") || "is" in o)) {
		if (d) t = t.slice(5), c = !0;
		else if (N(e)) return n;
		t === "class" || t === "className" ? qe(e, n) : s && !c && !l ? e[tt(t)] = n : e[u || t] = n;
	} else {
		let r = i && t.indexOf(":") > -1 && ze[t.split(":")[0]];
		r ? Ge(e, r, t, n) : We(e, Pe[t] || t, n);
	}
	return n;
}
function it(t) {
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
function P(e, t, n, r, i) {
	let a = N(e);
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
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = F(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = F(e, n, r);
	} else if (o === "function") return x(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = P(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (at(o, t, n, i)) return x(() => n = P(e, o, n, r, !0)), () => n;
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
			if (n = F(e, n, r), s) return n;
		} else c ? n.length === 0 ? ot(e, o, r) : Be(e, n, o) : (n && F(e), ot(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = F(e, n, r, t);
			F(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function at(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = at(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = at(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function ot(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function F(e, t, n, r) {
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
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/ax-ui/utility-classes.css?inline
var st = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}", ct = /* @__PURE__ */ A("<button type=button class=\"min-w-[48px] h-[28px] flex-c border border-[#444]\">"), lt = /* @__PURE__ */ A("<span>"), ut = (e) => (() => {
	var t = ct();
	return Je(t, "click", e.onClick, !0), M(t, (() => {
		var t = k(() => !!e.text);
		return () => t() && (() => {
			var t = lt();
			return M(t, () => e.text), t;
		})();
	})(), null), M(t, () => e.children, null), x((n) => {
		var r = e.disabled, i = e.active ? "#6c7" : "#ccc", a = e.active ? "#fff" : "#333", o = e.disabled ? "default" : "pointer", s = e.disabled ? .5 : 1;
		return r !== n.e && (t.disabled = n.e = r), i !== n.t && j(t, "background-color", n.t = i), a !== n.a && j(t, "color", n.a = a), o !== n.o && j(t, "cursor", n.o = o), s !== n.i && j(t, "opacity", n.i = s), n;
	}, {
		e: void 0,
		t: void 0,
		a: void 0,
		o: void 0,
		i: void 0
	}), t;
})();
Ue(["click"]);
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/lib/index.jsx
var dt = /* @__PURE__ */ A("<svg>");
function I(e, t) {
	return (() => {
		var n = dt();
		return Ze(n, je(() => e.a, t, {
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
				return k(() => !!t.title)() ? `${e.c}<title>${t.title}</title>` : e.c;
			},
			src: void 0
		}), !0, !1), n;
	})();
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/bi/index.js
function ft(e) {
	return I({
		a: {
			viewBox: "0 0 24 24",
			fill: "currentColor"
		},
		c: "<path d=\"M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z\"/>"
	}, e);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/bs/index.js
function pt(e) {
	return I({
		a: {
			fill: "currentColor",
			viewBox: "0 0 16 16"
		},
		c: "<path d=\"m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393\"/>"
	}, e);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/hi/index.js
function mt(e) {
	return I({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function ht(e) {
	return I({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function gt(e) {
	return I({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
function _t(e) {
	return I({
		a: {
			fill: "none",
			stroke: "currentColor",
			viewBox: "0 0 24 24"
		},
		c: "<path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/oc/index.js
function vt(e) {
	return I({
		a: {
			viewBox: "0 0 16 16",
			fill: "currentColor"
		},
		c: "<path d=\"M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z\"/>"
	}, e);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-icons@1.2.0_solid-js@1.9.13/node_modules/solid-icons/vs/index.js
function yt(e) {
	return I({
		a: {
			fill: "currentColor",
			viewBox: "0 0 16 16"
		},
		c: "<path fill-rule=\"evenodd\" d=\"M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z\" clip-rule=\"evenodd\"/>"
	}, e);
}
//#endregion
//#region src/components/icons.tsx
var L = {
	Play: pt,
	Left: ht,
	Right: gt,
	Up: _t,
	Down: mt,
	Dot: vt,
	Tie: ft,
	Dash: yt
};
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/number-utils-Dgvlroy3.js
function bt(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function xt(e, t, n) {
	return t + (n - t) * e;
}
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/ax/index.js
function St(e) {
	return e();
}
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/drag-session-luX6UhZj.js
function Ct(e, t, n) {
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
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/h/dist/h.js
var R = Symbol("hyper-element");
function wt(e) {
	function t() {
		let n = [].slice.call(arguments), r, i = [], a = !1;
		for (; Array.isArray(n[0]);) n = n[0];
		n[0][R] && n.unshift(t.Fragment), typeof n[0] == "string" && l(n);
		let o = () => {
			for (; n.length;) s(n.shift());
			return r instanceof Element && i.length && r.classList.add(...i), r;
		};
		return o[R] = !0, o;
		function s(t) {
			let o = typeof t;
			if (t != null) {
				if (o === "string") r ? r.appendChild(document.createTextNode(t)) : c(t);
				else if (o === "number" || o === "boolean" || o === "bigint" || o === "symbol" || t instanceof Date || t instanceof RegExp) r.appendChild(document.createTextNode(t.toString()));
				else if (Array.isArray(t)) for (let e = 0; e < t.length; e++) s(t[e]);
				else if (t instanceof Element) e.insert(r, t, a ? null : void 0);
				else if (o === "object") {
					let a = !1, o = Object.getOwnPropertyDescriptors(t);
					for (let n in o) {
						if (n === "class" && i.length !== 0) {
							let e = i.join(" "), r = typeof o.class.value == "function" ? () => e + " " + o.class.value() : e + " " + t.class;
							Object.defineProperty(t, "class", {
								...o[n],
								value: r
							}), i = [];
						}
						n !== "ref" && n.slice(0, 2) !== "on" && typeof o[n].value == "function" ? (e.dynamicProperty(t, n), a = !0) : o[n].get && (a = !0);
					}
					a ? e.spread(r, t, r instanceof SVGElement, !!n.length) : e.assign(r, t, r instanceof SVGElement, !!n.length);
				} else if (o === "function") if (r) {
					for (; t[R];) t = t();
					e.insert(r, t, a ? null : void 0);
				} else {
					let i, a = n[0];
					(a == null || typeof a == "object" && !Array.isArray(a) && !(a instanceof Element)) && (i = n.shift()), i ||= {}, n.length && (i.children = n.length > 1 ? n : n[0]);
					let o = Object.getOwnPropertyDescriptors(i);
					for (let t in o) if (Array.isArray(o[t].value)) {
						let n = o[t].value;
						i[t] = () => {
							for (let e = 0; e < n.length; e++) for (; n[e][R];) n[e] = n[e]();
							return n;
						}, e.dynamicProperty(i, t);
					} else typeof o[t].value == "function" && !o[t].value.length && e.dynamicProperty(i, t);
					r = e.createComponent(t, i), n = [];
				}
			}
		}
		function c(t) {
			let n = t.split(/([\.#]?[^\s#.]+)/);
			/^\.|#/.test(n[1]) && (r = document.createElement("div"));
			for (let t = 0; t < n.length; t++) {
				let a = n[t], o = a.substring(1, a.length);
				a && (r ? a[0] === "." ? i.push(o) : a[0] === "#" && r.setAttribute("id", o) : r = e.SVGElements.has(a) ? document.createElementNS("http://www.w3.org/2000/svg", a) : document.createElement(a));
			}
		}
		function l(e) {
			for (let t = 1; t < e.length; t++) if (typeof e[t] == "function") {
				a = !0;
				return;
			} else Array.isArray(e[t]) && l(e[t]);
		}
	}
	return t.Fragment = (e) => e.children, t;
}
var Tt = wt({
	spread: Ze,
	assign: et,
	insert: M,
	createComponent: O,
	dynamicProperty: Qe,
	SVGElements: Re
});
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/h/jsx-runtime/dist/jsx.js
function Et(e, t) {
	return Tt(e, t);
}
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/mo-solid/index.js
function Dt(e) {
	return /* @__PURE__ */ Et("div", {
		onPointerDown: (t) => {
			let n = e.min, r = e.max, i = e.step, a = e.dragRange ?? 100, o = e.value;
			Ct(t, { onMove(t) {
				let s = o + -(t.position.y - t.originalPosition.y) / (a / (r - n));
				i > 0 && (s = Math.round(s / i) * i), s = bt(s, n, r), e.onChange(s);
			} });
		},
		class: "cursor-pointer",
		children: e.children
	});
}
//#endregion
//#region src/components/knob.tsx
var Ot = /* @__PURE__ */ A("<div class=\"border border-[#444] w-[30px] h-[30px] rounded-full bg-[#aaa]\"><div class=\"w-full h-full flex justify-center\"><div class=\"w-[1px] h-[10px] bg-[#444]\">");
function kt(e) {
	let t = { tickAngel() {
		let { value: t, min: n, max: r } = e;
		return xt((t - n) / (r - n), -135, 135);
	} };
	return (() => {
		var e = Ot(), n = e.firstChild;
		return x((e) => j(n, "transform", `rotate(${t.tickAngel()}deg)`)), e;
	})();
}
function At(e) {
	let t = je({
		min: 0,
		max: 1,
		step: .01
	}, e);
	return O(Dt, {
		get value() {
			return t.value;
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
		get onChange() {
			return t.onChange;
		},
		get children() {
			return O(kt, {
				get value() {
					return t.value;
				},
				get min() {
					return t.min;
				},
				get max() {
					return t.max;
				}
			});
		}
	});
}
//#endregion
//#region src/components/number-slider-box.tsx
var jt = /* @__PURE__ */ A("<div class=\"border border-[#444] w-[48px] h-[28px] flex-c bg-[#ccc]\">");
function Mt(e) {
	return (() => {
		var t = jt();
		return M(t, () => e.value.toFixed(e.fracDigits ?? 2)), t;
	})();
}
function Nt(e) {
	let t = je({
		min: 0,
		max: 1,
		step: .01,
		fracDigits: 2
	}, e);
	return O(Dt, {
		get value() {
			return t.value;
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
		get onChange() {
			return t.onChange;
		},
		get children() {
			return O(Mt, {
				get value() {
					return t.value;
				},
				get fracDigits() {
					return t.fracDigits;
				}
			});
		}
	});
}
//#endregion
//#region src/organisms/note-clock-view.tsx
var Pt = /* @__PURE__ */ A("<div class=\"border border-[#444] w-[30px] h-[30px] rounded-full bg-[#aaa]\"><div class=\"w-full h-full flex justify-center\"><div class=\"w-[1px] h-[15px] bg-[#444]\">");
function Ft(e) {
	let t = { tickAngel() {
		return e.noteNumber * 30;
	} };
	return (() => {
		var e = Pt(), n = e.firstChild;
		return x((e) => j(n, "transform", `rotate(${t.tickAngel()}deg)`)), e;
	})();
}
//#endregion
//#region src/organisms/step-button.tsx
var It = /* @__PURE__ */ A("<button type=button class=\"w-[58px] h-[87px] flex-v border border-[#888] px-1 rounded-md text-[#555]\"style=cursor:pointer><div class=\"h-1/6 flex-c text-[14px]\"></div><div class=\"grow flex-c text-[24px] leading-none\"></div><div class=\"h-1/6 flex-c text-[14px]\">"), Lt = {
	on: L.Dot,
	off: L.Dash,
	tie: L.Tie
}, Rt = (e) => {
	let t = () => e.index === 0, n = () => e.code === "off" ? !0 : e.code === "on" ? !t() : !1, r = () => e.code === "tie" || e.code === "on", i = () => {
		if (e.code === "off") {
			e.onChange("on");
			return;
		}
		e.code === "on" && !t() && e.onChange("tie");
	}, a = () => {
		if (e.code === "tie") {
			e.onChange("on");
			return;
		}
		e.code === "on" && e.onChange("off");
	}, o = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		e.clientY < t.top + t.height / 2 ? i() : a();
	};
	return (() => {
		var t = It(), i = t.firstChild, a = i.nextSibling, s = a.nextSibling;
		return t.$$pointerdown = o, M(i, (() => {
			var e = k(() => !!n());
			return () => e() ? O(L.Up, {}) : null;
		})()), M(a, () => St(() => {
			let t = Lt[e.code];
			return O(t, {});
		})), M(s, (() => {
			var e = k(() => !!r());
			return () => e() ? O(L.Down, {}) : null;
		})()), x((n) => j(t, "background-color", e.active ? "#9f9" : "#ddd")), t;
	})();
};
Ue(["pointerdown"]);
//#endregion
//#region src/organisms/step-roll-bar.tsx
var zt = /* @__PURE__ */ A("<div class=\"relative h-[24px]\">"), Bt = /* @__PURE__ */ A("<div class=\"absolute h-full\">"), Vt = (e) => {
	let t = ie(() => {
		let t = [];
		for (let n = 0; n < e.stepCodes.length; n += 1) {
			if (e.stepCodes[n] !== "on") continue;
			let r = 1;
			for (; n + r < e.stepCodes.length && e.stepCodes[n + r] === "tie";) r += 1;
			let i = e.currentStepIndex, a = e.playing && i !== null && i >= n && i < n + r, o = r + e.duty - 1;
			t.push({
				start: n,
				length: o,
				active: a
			});
		}
		return t;
	});
	return (() => {
		var n = zt();
		return M(n, () => t().map((e) => (() => {
			var t = Bt();
			return x((n) => {
				var r = `${e.start * 66}px`, i = `${e.length * 66}px`, a = `1px solid ${e.active ? "#4f4" : "#7b7b7b"}`, o = e.active ? "#8f8" : "#ddd";
				return r !== n.e && j(t, "left", n.e = r), i !== n.t && j(t, "width", n.t = i), a !== n.a && j(t, "border", n.a = a), o !== n.o && j(t, "background-color", n.o = o), n;
			}, {
				e: void 0,
				t: void 0,
				a: void 0,
				o: void 0
			}), t;
		})())), x((t) => j(n, "width", `${e.stepCodes.length * 66}px`)), n;
	})();
};
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/mx-audio/index.js
function Ht(e, t) {
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
async function Ut() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function Wt(e) {
	let t, n = !1;
	return (async () => {
		let r = await Ut();
		n || r && (t = Ht(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
function Gt(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), r = {
		emitNoteOn(n) {
			e.noteOn(n), t.add(n);
		},
		emitNoteOff(n) {
			t.has(n) && (e.noteOff(n), t.delete(n));
		},
		reserveNoteOff(e, t) {
			let i = setTimeout(() => {
				n.delete(e), r.emitNoteOff(e);
			}, t * 1e3);
			n.set(e, i);
		},
		cancelNoteOffReservation(e) {
			let t = n.get(e);
			t !== void 0 && (clearTimeout(t), n.delete(e));
		},
		allNotesOff() {
			for (let e of n.values()) clearTimeout(e);
			n.clear();
			for (let n of t) e.noteOff(n);
			t.clear();
		}
	};
	return {
		noteOn(e, t) {
			r.cancelNoteOffReservation(e), r.emitNoteOff(e), r.emitNoteOn(e), t !== void 0 && r.reserveNoteOff(e, t);
		},
		noteOff(e) {
			r.cancelNoteOffReservation(e), r.emitNoteOff(e);
		},
		allNotesOff() {
			r.allNotesOff();
		}
	};
}
function Kt() {
	let e;
	return {
		start(t, n) {
			e = setInterval(t, n);
		},
		stop() {
			e !== void 0 && (clearInterval(e), e = void 0);
		}
	};
}
function qt(e, t) {
	return e / 6e4 * t * 480;
}
function Jt(e, t) {
	let n = Math.floor(e / 120), r = Math.floor(t / 120), i = [];
	for (let e = n + 1; e <= r; e++) i.push(e);
	return i;
}
function Yt(e, t, n, r) {
	for (let t of r) e.processStep?.(t);
	e.processTickRange?.(t, n);
}
function Xt() {
	let e = {
		bpm: 120,
		previousTime: 0,
		ppqTick: 0
	}, t = Kt();
	return {
		setBpm(t) {
			e.bpm = t;
		},
		start(n) {
			e.previousTime = performance.now(), e.ppqTick = 0;
			function r(t) {
				let r = qt(t - e.previousTime, e.bpm), i = e.ppqTick, a = i + r;
				Yt(n, i, a, Jt(i, a)), e.ppqTick = a, e.previousTime = t;
			}
			Yt(n, 0, 0, [0]), t.start(() => {
				r(performance.now());
			}, 5);
		},
		stop() {
			t.stop();
		}
	};
}
function Zt(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
function Qt() {
	let e = new AudioContext(), t = {};
	return {
		async resumeIfNeed() {
			e.state === "suspended" && await e.resume();
		},
		noteOn(n) {
			let r = Zt(n), i = e.createOscillator();
			i.frequency.setValueAtTime(r, e.currentTime), i.type = "sawtooth", i.connect(e.destination), i.start(), t[n] = i;
		},
		noteOff(e) {
			let n = t[e];
			n && (n.stop(), t[e] && delete t[e]);
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/store/dist/store.js
var $t = Symbol("store-raw"), z = Symbol("store-node"), B = Symbol("store-has"), en = Symbol("store-self");
function tn(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, on) }), !Array.isArray(e))) {
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
function V(e) {
	let t;
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function H(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[$t]) return n;
	if (!V(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = H(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = H(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function U(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function W(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = ne(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function nn(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === z ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function rn(e) {
	se() && W(U(e, z), en)();
}
function an(e) {
	return rn(e), Reflect.ownKeys(e);
}
var on = {
	get(e, t, n) {
		if (t === $t) return e;
		if (t === a) return n;
		if (t === s) return rn(e), n;
		let r = U(e, z), i = r[t], o = i ? i() : e[t];
		if (t === z || t === B || t === "__proto__") return o;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			se() && (typeof o != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (o = W(r, t, o)());
		}
		return V(o) ? tn(o) : o;
	},
	has(e, t) {
		return t === $t || t === a || t === s || t === z || t === B || t === "__proto__" ? !0 : (se() && W(U(e, B), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: an,
	getOwnPropertyDescriptor: nn
};
function G(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[B] && e[B][t] && i !== void 0 && e[B][t].$()) : (e[t] = n, e[B] && e[B][t] && i === void 0 && e[B][t].$());
	let o = U(e, z), s;
	if ((s = W(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = W(o, "length", a)) && s.$(e.length);
	}
	(s = o[en]) && s.$();
}
function sn(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		cn(i) || G(e, i, t[i]);
	}
}
function cn(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function ln(e, t) {
	if (typeof t == "function" && (t = t(e)), t = H(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && G(e, n, r);
		}
		G(e, "length", r);
	} else sn(e, t);
}
function K(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && cn(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) K(e, [r[i]].concat(t), n);
			return;
		} else if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && K(e, [i].concat(t), n);
			return;
		} else if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) K(e, [r].concat(t), n);
			return;
		} else if (t.length > 1) {
			K(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = H(a), r === void 0 || V(i) && V(a) && !Array.isArray(a) ? sn(i, a) : G(e, r, a));
}
function un(...[e, t]) {
	let n = H(e || {}), r = Array.isArray(n), i = tn(n);
	function a(...e) {
		ae(() => {
			r && e.length === 1 ? ln(n, e[0]) : K(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.6/node_modules/wus-unit-types/dist/v01/index.js
function dn(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/sequencer/app-synth-target.ts
function fn(e) {
	if (e) {
		let t = e.noteOutputPort;
		return {
			async resumeIfNeed() {},
			noteOn(e) {
				t.noteOn(e);
			},
			noteOff(e) {
				t.noteOff(e);
			}
		};
	} else {
		let e = Qt();
		return {
			async resumeIfNeed() {
				await e.resumeIfNeed();
			},
			noteOn(t) {
				e.noteOn(t);
			},
			noteOff(t) {
				e.noteOff(t);
			}
		};
	}
}
//#endregion
//#region src/sequencer/sequencer-engine.ts
var q = 4, pn = (e) => (e % q + q) % q;
function mn(e) {
	let t = Gt(e), n = 1, r = 120, i = [
		"off",
		"on",
		"on",
		"on"
	], a = 45, o = null, s = (e) => {
		let t = 1;
		for (; t < q && i[pn(e + t)] === "tie";) t += 1;
		return t;
	};
	return {
		processOnStep: (e) => {
			let c = pn(e);
			if (o?.(c), i[c] !== "on") return;
			let l = (s(c) + n - 1) * 60 / (r * 4);
			t.noteOff(a), t.noteOn(a, l);
		},
		setOnStep(e) {
			o = e;
		},
		allNotesOff() {
			t.allNotesOff();
		},
		setBpm(e) {
			r = e;
		},
		setDuty(e) {
			n = e;
		},
		setStepCodes(e) {
			i = e;
		},
		setNoteNumber(e) {
			a = e;
		}
	};
}
//#endregion
//#region src/store/store.ts
var hn = dn("wus-v01", import.meta.url), J = fn(hn), Y = mn(J), [X, Z] = un({
	bpm: 110,
	playing: !1,
	duty: .5,
	stepCodes: [
		"off",
		"on",
		"on",
		"on"
	],
	currentStepIndex: null,
	noteNumber: 33,
	exPlaying: !1
});
function gn() {
	Y.setBpm(X.bpm), Y.setDuty(X.duty), Y.setStepCodes(X.stepCodes), Y.setNoteNumber(X.noteNumber);
}
gn();
var _n = { somePlaying: () => X.playing || X.exPlaying }, Q = {
	async noteOn(e) {
		await J.resumeIfNeed(), J.noteOn(e), Y.setNoteNumber(e);
	},
	noteOff(e) {
		J.noteOff(e);
	},
	setBpm(e) {
		Z("bpm", e), Y.setBpm(e);
	},
	setPlaying(e) {
		Z("playing", e), e || Z("currentStepIndex", null);
	},
	setDuty(e) {
		Z("duty", e), Y.setDuty(e);
	},
	setStepCode(e, t) {
		let n = [...X.stepCodes];
		n[e] = t, Z("stepCodes", n), Y.setStepCodes([...n]);
	},
	setNoteNumber(e) {
		Z("noteNumber", e), Y.setNoteNumber(e);
	},
	setExPlaying(e) {
		Z("exPlaying", e);
	},
	setCurrentStepIndex(e) {
		Z("currentStepIndex", e);
	},
	loadStepCodes(e) {
		Z("stepCodes", e), Y.setStepCodes(e);
	}
}, vn = {
	toByte(e) {
		return {
			off: 0,
			on: 1,
			tie: 2
		}[e];
	},
	fromByte(e) {
		return {
			0: "off",
			1: "on",
			2: "tie"
		}[e] ?? "off";
	}
}, yn = {
	setPersistedState(e) {
		Q.setDuty(e.duty), Q.loadStepCodes(e.stepCodes);
	},
	getPersistedState() {
		return {
			duty: X.duty,
			stepCodes: X.stepCodes
		};
	}
}, bn = {
	emitStateBytes() {
		let e = yn.getPersistedState();
		return new Uint8Array([e.duty * 255 >>> 0, ...e.stepCodes.map(vn.toByte)]);
	},
	applyStateBytes(e) {
		if (e.length === 5) {
			let t = e[0] / 255, n = [...e.slice(1, 5)].map(vn.fromByte);
			yn.setPersistedState({
				duty: t,
				stepCodes: n
			});
		}
	}
}, $ = {
	wrapProcessStep(e) {
		Y.processOnStep(e % 4), Q.setCurrentStepIndex(e % 4);
	},
	setupUnitInterface() {
		hn?.completeSetup({
			unitAspects: {
				unitType: "sequencer",
				categoryHint: "stepSequencer",
				outputs: ["note"]
			},
			clockHandlers: {
				start() {
					Q.setExPlaying(!0);
				},
				stop() {
					Q.setExPlaying(!1), Y.allNotesOff();
				},
				processStep: $.wrapProcessStep
			},
			persistence: {
				emitStateBytes: bn.emitStateBytes,
				applyStateBytes: bn.applyStateBytes
			},
			hostCallbacks: { setBpm(e) {
				Q.setBpm(e);
			} }
		});
	},
	setupTickDriver() {
		let e = Xt();
		re(() => {
			e.setBpm(X.bpm);
		}), re(() => {
			X.playing ? e.start({ processStep: $.wrapProcessStep }) : (e.stop(), Y.allNotesOff());
		});
	},
	setupMidiKeyboardInput() {
		hn || oe(Wt({
			noteOn: Q.noteOn,
			noteOff: Q.noteOff
		}));
	},
	setupAll() {
		$.setupUnitInterface(), $.setupTickDriver(), $.setupMidiKeyboardInput();
	}
}, xn = [
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
];
function Sn(e) {
	return `${xn[e % 12]}`;
}
//#endregion
//#region src/app.tsx
var Cn = /* @__PURE__ */ A("<div class=\"w-full flex-c gap-3 bg-zinc-600 px-2 py-3\"><div class=\"flex-ha gap-1\"><div class=text-white>note</div><div class=\"w-[16px] text-white\"></div></div><div class=\"flex-ha gap-1\"><div class=text-white>duty"), wn = /* @__PURE__ */ A("<div class=\"flex-c text-[#444]\"><div class=\"w-[340px] h-[210px] flex-vc bg-zinc-100 border border-[#445]\"><div class=\"grow flex-vc gap-3\"><div class=\"flex-ha gap-3\">"), Tn = () => (() => {
	var e = Cn(), t = e.firstChild, n = t.firstChild.nextSibling, r = t.nextSibling;
	return r.firstChild, M(e, O(ut, {
		get active() {
			return X.playing;
		},
		onClick: () => Q.setPlaying(!X.playing),
		get children() {
			return O(L.Play, {});
		}
	}), t), M(t, O(Nt, {
		get value() {
			return X.noteNumber;
		},
		get onChange() {
			return Q.setNoteNumber;
		},
		min: 12,
		max: 48,
		step: 1,
		fracDigits: 0
	}), n), M(t, O(Ft, { get noteNumber() {
		return X.noteNumber;
	} }), n), M(n, () => Sn(X.noteNumber)), M(r, O(At, {
		get value() {
			return X.duty;
		},
		get onChange() {
			return Q.setDuty;
		},
		min: .1,
		max: 1,
		step: .01
	}), null), e;
})(), En = () => (() => {
	var e = wn(), t = e.firstChild, n = t.firstChild, r = n.firstChild;
	return M(t, O(Tn, {}), n), M(n, O(Vt, {
		get stepCodes() {
			return X.stepCodes;
		},
		get currentStepIndex() {
			return X.currentStepIndex;
		},
		get playing() {
			return _n.somePlaying();
		},
		get duty() {
			return X.duty;
		}
	}), r), M(r, () => X.stepCodes.map((e, t) => O(Rt, {
		index: t,
		code: e,
		get active() {
			return k(() => X.currentStepIndex === t)() && _n.somePlaying();
		},
		onChange: (e) => Q.setStepCode(t, e)
	}))), e;
})(), Dn = () => (console.log("bseq1 0914"), $.setupAll(), O(En, {})), On = "@import \"https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap\";@layer components;@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-leading:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-zinc-100:oklch(96.7% .001 286.375);--color-zinc-600:oklch(44.2% .017 285.786);--color-white:#fff;--spacing:.25rem;--radius-md:.375rem;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer utilities{.absolute{position:absolute}.relative{position:relative}.flex{display:flex}.h-1\\/6{height:16.6667%}.h-\\[10px\\]{height:10px}.h-\\[15px\\]{height:15px}.h-\\[24px\\]{height:24px}.h-\\[28px\\]{height:28px}.h-\\[30px\\]{height:30px}.h-\\[87px\\]{height:87px}.h-\\[210px\\]{height:210px}.h-full{height:100%}.w-\\[1px\\]{width:1px}.w-\\[16px\\]{width:16px}.w-\\[30px\\]{width:30px}.w-\\[48px\\]{width:48px}.w-\\[58px\\]{width:58px}.w-\\[340px\\]{width:340px}.w-full{width:100%}.min-w-\\[48px\\]{min-width:48px}.grow{flex-grow:1}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-center{justify-content:center}.gap-1{gap:calc(var(--spacing) * 1)}.gap-3{gap:calc(var(--spacing) * 3)}.rounded-full{border-radius:3.40282e38px}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#444\\]{border-color:#444}.border-\\[\\#445\\]{border-color:#445}.border-\\[\\#888\\]{border-color:#888}.bg-\\[\\#444\\]{background-color:#444}.bg-\\[\\#aaa\\]{background-color:#aaa}.bg-\\[\\#ccc\\]{background-color:#ccc}.bg-zinc-100{background-color:var(--color-zinc-100)}.bg-zinc-600{background-color:var(--color-zinc-600)}.px-1{padding-inline:calc(var(--spacing) * 1)}.px-2{padding-inline:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.text-\\[14px\\]{font-size:14px}.text-\\[24px\\]{font-size:24px}.leading-none{--tw-leading:1;line-height:1}.text-\\[\\#444\\]{color:#444}.text-\\[\\#555\\]{color:#555}.text-white{color:var(--color-white)}}body{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-leading{syntax:\"*\";inherits:false}", kn = class extends HTMLElement {
	isMounted;
	disposeRender = null;
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this.isMounted = !1;
	}
	connectedCallback() {
		if (this.isMounted || !this.shadowRoot) return;
		let e = document.createElement("style");
		e.dataset.unit1Styles = "true", e.textContent = On + st, this.shadowRoot.appendChild(e), this.disposeRender = He(() => O(Dn, {}), this.shadowRoot), this.isMounted = !0;
	}
	disconnectedCallback() {
		this.isMounted && this.shadowRoot && setTimeout(() => {
			this.shadowRoot && (this.disposeRender?.(), this.disposeRender = null, this.isMounted = !1);
		}, 0);
	}
};
//#endregion
export { kn as default };
