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
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = Symbol("solid-track"), s = { equals: i }, c = null, l = me, u = 1, d = 2, f = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, p = null, m = null, h = null, g = null, _ = null, v = null, y = null, b = 0;
function ee(e, t) {
	let n = _, r = p, i = e.length === 0, a = t === void 0 ? r : t, o = i ? f : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => C(() => D(o)));
	p = o, _ = null;
	try {
		return T(s, !0);
	} finally {
		_ = n, p = r;
	}
}
function x(e, t) {
	t = t ? Object.assign({}, s, t) : s;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [ce.bind(n), (e) => (typeof e == "function" && (e = m && m.running && m.sources.has(n) ? e(n.tValue) : e(n.value)), le(n, e))];
}
function S(e, t, n) {
	let r = fe(e, t, !1, u);
	h && m && m.running ? v.push(r) : ue(r);
}
function te(e) {
	return T(e, !1);
}
function C(e) {
	if (!g && _ === null) return e();
	let t = _;
	_ = null;
	try {
		return g ? g.untrack(e) : e();
	} finally {
		_ = t;
	}
}
function ne(e) {
	return p === null || (p.cleanups === null ? p.cleanups = [e] : p.cleanups.push(e)), e;
}
function re() {
	return _;
}
function ie(e) {
	if (m && m.running) return e(), m.done;
	let t = _, n = p;
	return Promise.resolve().then(() => {
		_ = t, p = n;
		let r;
		return (h || se) && (r = m ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), T(e, !1), _ = p = null, r ? r.done : void 0;
	});
}
var [ae, oe] = /* @__PURE__ */ x(!1), se;
function ce() {
	let e = m && m.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === u) ue(this);
	else {
		let e = v;
		v = null, T(() => E(this), !1), v = e;
	}
	if (_) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== _) {
			let t = e ? e.length : 0;
			_.sources ? (_.sources.push(this), _.sourceSlots.push(t)) : (_.sources = [this], _.sourceSlots = [t]), e ? (e.push(_), this.observerSlots.push(_.sources.length - 1)) : (this.observers = [_], this.observerSlots = [_.sources.length - 1]);
		}
	}
	return e && m.sources.has(this) ? this.tValue : this.value;
}
function le(e, t, n) {
	let r = m && m.running && m.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (m) {
			let r = m.running;
			(r || !n && m.sources.has(e)) && (m.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && T(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = m && m.running;
				r && m.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? v.push(n) : y.push(n), n.observers && ge(n)), r ? n.tState = u : n.state = u);
			}
			if (v.length > 1e6) throw v = [], Error();
		}, !1);
	}
	return t;
}
function ue(e) {
	if (!e.fn) return;
	D(e);
	let t = b;
	de(e, m && m.running && m.sources.has(e) ? e.tValue : e.value, t), m && !m.running && m.sources.has(e) && queueMicrotask(() => {
		T(() => {
			m && (m.running = !0), _ = p = e, de(e, e.tValue, t), _ = p = null;
		}, !1);
	});
}
function de(e, t, n) {
	let r, i = p, a = _;
	_ = p = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (m && m.running ? (e.tState = u, e.tOwned && e.tOwned.forEach(D), e.tOwned = void 0) : (e.state = u, e.owned && e.owned.forEach(D), e.owned = null)), e.updatedAt = n + 1, O(t);
	} finally {
		_ = a, p = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? le(e, r, !0) : m && m.running && e.pure ? (m.sources.has(e) || (e.value = r), m.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
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
	if (m && m.running && (a.state = 0, a.tState = r), p === null || p !== f && (m && m.running && p.pure ? p.tOwned ? p.tOwned.push(a) : p.tOwned = [a] : p.owned ? p.owned.push(a) : p.owned = [a]), g && a.fn) {
		let e = a.fn, [t, n] = x(void 0, { equals: !1 }), r = g.factory(e, n);
		ne(() => r.dispose());
		let i, o = () => ie(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), m && m.running ? (i ||= g.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function w(e) {
	let t = m && m.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === d) return E(e);
	if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < b);) {
		if (t && m.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (m.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === u) ue(e);
		else if ((t ? e.tState : e.state) === d) {
			let t = v;
			v = null, T(() => E(e, n[0]), !1), v = t;
		}
	}
}
function T(e, t) {
	if (v) return e();
	let n = !1;
	t || (v = []), y ? n = !0 : y = [], b++;
	try {
		let t = e();
		return pe(n), t;
	} catch (e) {
		n || (y = null), v = null, O(e);
	}
}
function pe(e) {
	if (v &&= (h && m && m.running ? he(v) : me(v), null), e) return;
	let t;
	if (m) {
		if (!m.promises.size && !m.queue.size) {
			let e = m.sources, n = m.disposed;
			y.push.apply(y, m.effects), t = m.resolve;
			for (let e of y) "tState" in e && (e.state = e.tState), delete e.tState;
			m = null, T(() => {
				for (let e of n) D(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) D(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				oe(!1);
			}, !1);
		} else if (m.running) {
			m.running = !1, m.effects.push.apply(m.effects, y), y = null, oe(!0);
			return;
		}
	}
	let n = y;
	y = null, n.length && T(() => l(n), !1), t && t();
}
function me(e) {
	for (let t = 0; t < e.length; t++) w(e[t]);
}
function he(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = m.queue;
		r.has(n) || (r.add(n), h(() => {
			r.delete(n), T(() => {
				m.running = !0, w(n);
			}, !1), m && (m.running = !1);
		}));
	}
}
function E(e, t) {
	let n = m && m.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === u ? i !== t && (!i.updatedAt || i.updatedAt < b) && w(i) : e === d && E(i, t);
		}
	}
}
function ge(e) {
	let t = m && m.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = d : r.state = d, r.pure ? v.push(r) : y.push(r), r.observers && ge(r));
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
	if (m && m.running && e.pure) _e(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) D(e.owned[t]);
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
		O(e, n && n.owner || null);
	}
}
function O(e, t = p) {
	let n = c && t && t.context && t.context[c], r = ve(e);
	if (!n) throw r;
	y ? y.push({
		fn() {
			ye(r, n, t);
		},
		state: u
	}) : ye(r, n, t);
}
var be = !1;
function k(t, i) {
	if (be && e.context) {
		let a = e.context;
		n(r());
		let o = C(() => t(i || {}));
		return n(a), o;
	}
	return C(() => t(i || {}));
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/web/dist/web.js
function xe(e, t, n) {
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
var Se = "_$DX_DELEGATE";
function Ce(e, t, n, r = {}) {
	let i;
	return ee((r) => {
		i = r, t === document ? e() : M(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function we(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => C(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function Te(e, t = window.document) {
	let n = t[Se] || (t[Se] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, De));
	}
}
function A(e, t, n) {
	Ee(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function j(e, t, n) {
	if (!t) return n ? A(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function M(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return N(e, t, r, n);
	S((r) => N(e, t(), r, n), r);
}
function Ee(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function De(t) {
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
function N(e, t, n, r, i) {
	let a = Ee(e);
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
	} else if (o === "function") return S(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = N(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (P(o, t, n, i)) return S(() => n = N(e, o, n, r, !0)), () => n;
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
		} else c ? n.length === 0 ? Oe(e, o, r) : xe(e, n, o) : (n && F(e), Oe(e, o));
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
function P(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = P(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = P(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function Oe(e, t, n = null) {
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
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/unit-helper/index.js
function ke(e, t) {
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
function Ae(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/audio/chorus-effect.ts
function je(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createDelay(), a = e.createGain(), o = e.createOscillator(), s = e.createGain();
	t.connect(r), r.connect(n), t.connect(i), i.connect(a), a.connect(n), o.type = "sine", o.frequency.value = .25, i.delayTime.value = .015, s.gain.value = .005, o.connect(s), s.connect(i.delayTime), o.start();
	function c(e, t) {
		let n = e * .5;
		(t || a.gain.value !== n) && (a.gain.value = n, r.gain.value = 1 - n);
	}
	return c(0), {
		inputNode: t,
		outputNode: n,
		setLevel: c
	};
}
//#endregion
//#region src/audio/reverbrator.ts
function Me(e, t, n) {
	let { sampleRate: r } = e, i = t * r, a = e.createBuffer(t, i, r), o = a.getChannelData(0), s = a.getChannelData(1);
	for (let e = 0; e < i; e++) o[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n, s[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n;
	return a;
}
function Ne(e) {
	let t = Me(e, 2, 2), n = e.createGain();
	n.gain.value = 1;
	let r = e.createConvolver(), i = e.createGain(), a = e.createGain(), o = e.createGain();
	o.gain.value = 1, r.buffer = t, n.connect(r), r.connect(a), a.connect(o), n.connect(i), i.connect(o);
	let s = -1;
	function c(e) {
		s !== e && (s = e, i.gain.value = 1 - s, a.gain.value = s);
	}
	return c(0), {
		setLevel: c,
		inputNode: n,
		outputNode: o,
		setupNodes() {},
		cleanupNodes() {}
	};
}
//#endregion
//#region src/audio/effect-chain.ts
function Pe(e) {
	let t = () => e.currentTime, n = (t, n) => {
		t.setTargetAtTime(n, e.currentTime, .01);
	}, r = e.createGain(), i = e.createGain(), a = e.createGain(), o = e.createGain(), s = e.createDelay(1), c = e.createGain();
	return r.connect(a), r.connect(s), s.delayTime.setValueAtTime(.375, t()), s.connect(c), c.connect(s), s.connect(o), a.connect(i), o.connect(i), c.gain.setValueAtTime(0, t()), o.gain.setValueAtTime(0, t()), {
		inputNode: r,
		outputNode: i,
		setLevel(e) {
			n(o.gain, e * .5), n(c.gain, e * .65);
		}
	};
}
function Fe(e) {
	let t = e.createGain(), n = e.createGain(), r = je(e), i = Pe(e), a = Ne(e);
	return t.connect(r.inputNode), r.outputNode.connect(i.inputNode), i.outputNode.connect(a.inputNode), a.outputNode.connect(n), {
		inputNode: t,
		outputNode: n,
		updateParameters(e) {
			e.chorus !== void 0 && r.setLevel(e.chorus), e.delay !== void 0 && i.setLevel(e.delay), e.reverb !== void 0 && a.setLevel(e.reverb);
		}
	};
}
//#endregion
//#region src/constants.ts
var Ie = /* @__PURE__ */ function(e) {
	return e[e.PD = 0] = "PD", e[e.FM = 1] = "FM", e[e.FM_FB = 2] = "FM_FB", e[e.PD_RESO = 3] = "PD_RESO", e;
}({}), I = {
	waveMode: Ie.FM,
	shape: 0,
	envMod: 0,
	detune: 0,
	sub: 0,
	decay: 1,
	release: 0,
	drift: 0,
	loFi: 0,
	chorus: 0,
	delay: 0,
	reverb: 0,
	master: .7
};
function Le() {
	return { ...I };
}
Object.assign(I, {
	waveMode: Ie.PD,
	shape: .7,
	envMod: .5,
	detune: .1,
	sub: .3,
	decay: .4,
	release: .3,
	drift: .1,
	chorus: .2,
	reverb: .2
});
//#endregion
//#region src/audio/worklet.ts?worker&url
var Re = "" + new URL("assets/worklet-_C0HFN8c.js", import.meta.url).href, L = Ae("wus-v01", import.meta.url), ze = (e) => 440 * 2 ** ((e - 69) / 12);
function Be() {
	let e = null, t = null, n, r = /* @__PURE__ */ new Map(), i = { ...I };
	async function a() {
		if (e) return;
		e = L?.audioContext || new (window.AudioContext || window.webkitAudioContext)();
		let r = L?.audioOutputNode ?? e.destination;
		await e.audioWorklet.addModule(Re), t = e.createGain(), t.gain.setValueAtTime(i.master, e.currentTime), n = Fe(e), t.connect(n.inputNode), n.outputNode.connect(r);
	}
	function o(t, n) {
		let i = e?.currentTime || 0;
		r.forEach((e) => {
			let r = e.workletNode.parameters.get(t);
			r && r.setTargetAtTime(n, i, .005);
		});
	}
	function s(e, t) {
		(e === "chorus" || e === "delay" || e === "reverb") && n?.updateParameters({ [e]: t });
	}
	return {
		async init() {
			await a();
		},
		async resumeIfNeeded() {
			e && e.state === "suspended" && await e.resume();
		},
		setParameter(n, r) {
			i[n] = r;
			let a = e?.currentTime || 0;
			if (n === "master") {
				t && t.gain.setTargetAtTime(r, a, .005);
				return;
			}
			o(n, r), s(n, r);
		},
		setAllParameters(r) {
			Object.assign(i, r);
			let a = e?.currentTime || 0;
			t && t.gain.setTargetAtTime(i.master, a, .005), Object.keys(i).forEach((e) => {
				o(e, i[e]);
			}), n?.updateParameters({
				chorus: i.chorus,
				delay: i.delay,
				reverb: i.reverb
			});
		},
		noteOn(n, a) {
			if (!e || !t) {
				console.warn("SynthEngine is not initialized. Call init() before using the engine.");
				return;
			}
			r.has(n) && this.noteOff(n, a), e.state === "suspended" && e.resume();
			let o = new AudioWorkletNode(e, "synth-processor", {
				numberOfInputs: 0,
				numberOfOutputs: 1,
				outputChannelCount: [1]
			}), s = a && a > e.currentTime ? a : e.currentTime, c = o.parameters.get("frequency");
			c && c.setValueAtTime(ze(n), s), Object.keys(i).forEach((e) => {
				let t = o.parameters.get(e);
				t && t.setValueAtTime(i[e], s);
			});
			let l = o.parameters.get("gate");
			l.setValueAtTime(1, s), o.connect(t), r.set(n, {
				workletNode: o,
				gateParam: l
			});
		},
		noteOff(t, n) {
			let i = r.get(t);
			if (!i) return;
			let a = n && e && n > e.currentTime ? n : e?.currentTime || 0;
			i.gateParam.setValueAtTime(0, a), r.delete(t);
		},
		getNumActiveNotes() {
			return r.size;
		}
	};
}
var R = Be(), z = Symbol("store-raw"), B = Symbol("store-node"), V = Symbol("store-has"), Ve = Symbol("store-self");
function He(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, Ke) }), !Array.isArray(e))) {
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
function H(e) {
	let t;
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function U(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[z]) return n;
	if (!H(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = U(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = U(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function W(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function G(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = x(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function Ue(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === B ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function We(e) {
	re() && G(W(e, B), Ve)();
}
function Ge(e) {
	return We(e), Reflect.ownKeys(e);
}
var Ke = {
	get(e, t, n) {
		if (t === z) return e;
		if (t === a) return n;
		if (t === o) return We(e), n;
		let r = W(e, B), i = r[t], s = i ? i() : e[t];
		if (t === B || t === V || t === "__proto__") return s;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			re() && (typeof s != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (s = G(r, t, s)());
		}
		return H(s) ? He(s) : s;
	},
	has(e, t) {
		return t === z || t === a || t === o || t === B || t === V || t === "__proto__" ? !0 : (re() && G(W(e, V), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: Ge,
	getOwnPropertyDescriptor: Ue
};
function K(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[V] && e[V][t] && i !== void 0 && e[V][t].$()) : (e[t] = n, e[V] && e[V][t] && i === void 0 && e[V][t].$());
	let o = W(e, B), s;
	if ((s = G(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = G(o, "length", a)) && s.$(e.length);
	}
	(s = o[Ve]) && s.$();
}
function qe(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Je(i) || K(e, i, t[i]);
	}
}
function Je(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Ye(e, t) {
	if (typeof t == "function" && (t = t(e)), t = U(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && K(e, n, r);
		}
		K(e, "length", r);
	} else qe(e, t);
}
function q(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Je(r))) return;
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
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = U(a), r === void 0 || H(i) && H(a) && !Array.isArray(a) ? qe(i, a) : K(e, r, a));
}
function Xe(...[e, t]) {
	let n = U(e || {}), r = Array.isArray(n), i = He(n);
	function a(...e) {
		te(() => {
			r && e.length === 1 ? Ye(n, e[0]) : q(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/store.ts
var [J, Y] = Xe({
	synthParams: Le(),
	numActiveNotes: 0
});
//#endregion
//#region src/actions.ts
R.init();
var X = {
	async noteOn(e, t = 0, n = 1) {
		R.noteOn(e, t), Y("numActiveNotes", R.getNumActiveNotes());
	},
	noteOff(e, t = 0) {
		R.noteOff(e, t), Y("numActiveNotes", R.getNumActiveNotes());
	},
	setSynthParam(e, t) {
		Y("synthParams", e, t), R.setParameter(e, t);
	},
	loadStates(e) {
		Y("synthParams", e.synthParams), R.setAllParameters(e.synthParams);
	}
};
//#endregion
//#region src/persistence.ts
function Z(e) {
	return Math.max(0, Math.min(255, Math.round(e * 255)));
}
function Q(e) {
	return Math.max(0, Math.min(1, e / 255));
}
var Ze = {
	serializeParameters(e) {
		let t = e;
		return [
			t.waveMode,
			Z(t.shape),
			Z(t.envMod),
			Z(t.detune),
			Z(t.sub),
			Z(t.decay),
			Z(t.release),
			Z(t.drift),
			Z(t.loFi),
			Z(t.chorus),
			Z(t.delay),
			Z(t.reverb),
			Z(t.master)
		];
	},
	deserializeParameters(e) {
		return {
			waveMode: e[0],
			shape: Q(e[1]),
			envMod: Q(e[2]),
			detune: Q(e[3]),
			sub: Q(e[4]),
			decay: Q(e[5]),
			release: Q(e[6]),
			drift: Q(e[7]),
			loFi: Q(e[8]),
			chorus: Q(e[9]),
			delay: Q(e[10]),
			reverb: Q(e[11]),
			master: Q(e[12])
		};
	}
}, Qe = 1, $e = 14, et = {
	emitStateBytes() {
		let { synthParams: e } = J, t = Ze.serializeParameters(e);
		return new Uint8Array([Qe, ...t]);
	},
	applyStateBytes(e) {
		if (e.length === $e && e[0] === Qe) {
			let t = Ze.deserializeParameters([...e.slice(1)]);
			X.loadStates({ synthParams: t });
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function tt(e, t) {
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
async function nt() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function rt(e) {
	let t, n = !1;
	return (async () => {
		let r = await nt();
		n || r && (t = tt(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/drivers.ts
function it() {
	L ? L.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "synthesizer",
			outputs: ["audio"],
			inputs: ["note"]
		},
		noteInput: {
			noteOn: X.noteOn,
			noteOff: X.noteOff
		},
		persistence: et
	}) : ne(rt({
		async noteOn(e) {
			await R.resumeIfNeeded(), X.noteOn(e);
		},
		noteOff(e) {
			X.noteOff(e);
		}
	}));
}
//#endregion
//#region src/app.tsx
var at = /* @__PURE__ */ we("<div style=\"display:flex;align-items:center;justify-content:space-between;margin:8px 0;gap:16px\"><span style=width:84px;font-size:14px;font-weight:bold></span><input type=range min=0 class=accent-violet-400 style=flex:1;cursor:pointer><span style=width:24px;text-align:right;font-size:12px;color:#888>"), ot = /* @__PURE__ */ we("<div class=\"w-[660px] h-[380px] flex-c bg-mist-700\"><div class=\"flex-h gap-4\"><div class=\"flex-v gap-4\"><div><h3>OSCILLATOR</h3></div><div><h3>AMP ENVELOPE</h3></div></div><div class=\"flex-v gap-4\"><div class=\"flex-v gap-4\"><div><h3>EFFECTS</h3></div></div><div><h3>CONTROL</h3></div><div class=\"w-full flex-ha mt-[-4px] text-xs font-bold justify-between\"><div>proto-engine-pd-fm</div><div>active notes: ");
function $(e) {
	let t = e.paramKey === "waveMode", n = t ? "3" : "1", r = t ? "1" : "0.01";
	return (() => {
		var i = at(), a = i.firstChild, o = a.nextSibling, s = o.nextSibling;
		return M(a, () => e.label), o.$$input = (t) => X.setSynthParam(e.paramKey, parseFloat(t.currentTarget.value)), A(o, "max", n), A(o, "step", r), M(s, () => t ? `M${J.synthParams[e.paramKey]}` : J.synthParams[e.paramKey].toFixed(2)), S(() => o.value = J.synthParams[e.paramKey]), i;
	})();
}
var st = () => {
	let e = {
		panelBox: {
			color: "#fff",
			"box-shadow": "0 8px 24px rgba(0,0,0,0.5)"
		},
		topHeader: {
			margin: "0 0 20px 0",
			"text-align": "center",
			color: "#ff007f",
			"letter-spacing": "2px"
		},
		sectionBox: {
			background: "#262626",
			padding: "16px"
		},
		sectionHeader: {
			margin: "0 0 6px 0",
			"font-size": "14px",
			color: "#00a5ff",
			"font-weight": "bold"
		}
	};
	return (() => {
		var t = ot(), n = t.firstChild.firstChild, r = n.firstChild, i = r.firstChild, a = r.nextSibling, o = a.firstChild, s = n.nextSibling.firstChild, c = s.firstChild, l = c.firstChild, u = s.nextSibling, d = u.firstChild, f = u.nextSibling.firstChild.nextSibling;
		return f.firstChild, M(r, k($, {
			paramKey: "waveMode",
			label: "Wave Mode"
		}), null), M(r, k($, {
			paramKey: "shape",
			label: "Shape/Mod"
		}), null), M(r, k($, {
			paramKey: "envMod",
			label: "Env Mod"
		}), null), M(r, k($, {
			paramKey: "detune",
			label: "Detune"
		}), null), M(r, k($, {
			paramKey: "sub",
			label: "Sub OSC"
		}), null), M(a, k($, {
			paramKey: "decay",
			label: "Decay"
		}), null), M(a, k($, {
			paramKey: "release",
			label: "Release"
		}), null), M(c, k($, {
			paramKey: "chorus",
			label: "Chorus"
		}), null), M(c, k($, {
			paramKey: "delay",
			label: "Delay"
		}), null), M(c, k($, {
			paramKey: "reverb",
			label: "Reverb"
		}), null), M(u, k($, {
			paramKey: "master",
			label: "Master Vol"
		}), null), M(u, k($, {
			paramKey: "drift",
			label: "Drift"
		}), null), M(u, k($, {
			paramKey: "loFi",
			label: "Lo-Fi"
		}), null), M(f, () => J.numActiveNotes, null), S((n) => {
			var s = e.panelBox, f = e.sectionBox, p = e.sectionHeader, m = e.sectionBox, h = e.sectionHeader, g = e.sectionBox, _ = e.sectionHeader, v = e.sectionBox, y = e.sectionHeader;
			return n.e = j(t, s, n.e), n.t = j(r, f, n.t), n.a = j(i, p, n.a), n.o = j(a, m, n.o), n.i = j(o, h, n.i), n.n = j(c, g, n.n), n.s = j(l, _, n.s), n.h = j(u, v, n.h), n.r = j(d, y, n.r), n;
		}, {
			e: void 0,
			t: void 0,
			a: void 0,
			o: void 0,
			i: void 0,
			n: void 0,
			s: void 0,
			h: void 0,
			r: void 0
		}), t;
	})();
};
function ct() {
	return it(), k(st, {});
}
Te([
	"input",
	"mousedown",
	"mouseup"
]);
//#endregion
//#region src/index.tsx
var lt = ke((e) => Ce(() => k(ct, {}), e), ["@import \"https://fonts.googleapis.com/css2?family=Oxanium:wght@400..700&display=swap\";@layer components;@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-violet-400:oklch(70.2% .183 293.541);--color-mist-700:oklch(37.8% .015 216);--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--font-weight-bold:700;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer utilities{.fixed{position:fixed}.static{position:static}.mt-\\[-4px\\]{margin-top:-4px}.flex{display:flex}.h-\\[380px\\]{height:380px}.w-\\[660px\\]{width:660px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-between{justify-content:space-between}.gap-4{gap:calc(var(--spacing) * 4)}.border{border-style:var(--tw-border-style);border-width:1px}.bg-mist-700{background-color:var(--color-mist-700)}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.accent-violet-400{accent-color:var(--color-violet-400)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}}body{-webkit-user-select:none;user-select:none;min-height:100dvh;font-family:Oxanium,sans-serif}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"]);
//#endregion
export { lt as default };
