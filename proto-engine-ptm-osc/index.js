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
var i = (e, t) => e === t, a = Symbol("solid-proxy"), o = Symbol("solid-track"), s = { equals: i }, c = null, l = he, u = 1, d = 2, f = {
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
function te(e, t) {
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
	let r = fe(e, t, !1, u);
	h && m && m.running ? v.push(r) : w(r);
}
function S(e, t, n) {
	n = n ? Object.assign({}, s, n) : s;
	let r = fe(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, h && m && m.running ? (r.tState = u, v.push(r)) : w(r), le.bind(r);
}
function ne(e) {
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
function re(e) {
	return p === null || (p.cleanups === null ? p.cleanups = [e] : p.cleanups.push(e)), e;
}
function ie() {
	return _;
}
function ae(e) {
	if (m && m.running) return e(), m.done;
	let t = _, n = p;
	return Promise.resolve().then(() => {
		_ = t, p = n;
		let r;
		return (h || ce) && (r = m ||= {
			sources: /* @__PURE__ */ new Set(),
			effects: [],
			promises: /* @__PURE__ */ new Set(),
			disposed: /* @__PURE__ */ new Set(),
			queue: /* @__PURE__ */ new Set(),
			running: !0
		}, r.done ||= new Promise((e) => r.resolve = e), r.running = !0), T(e, !1), _ = p = null, r ? r.done : void 0;
	});
}
var [oe, se] = /* @__PURE__ */ te(!1), ce;
function le() {
	let e = m && m.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === u) w(this);
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
function ue(e, t, n) {
	let r = m && m.running && m.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (m) {
			let r = m.running;
			(r || !n && m.sources.has(e)) && (m.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && T(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = m && m.running;
				r && m.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? v.push(n) : y.push(n), n.observers && _e(n)), r ? n.tState = u : n.state = u);
			}
			if (v.length > 1e6) throw v = [], Error();
		}, !1);
	}
	return t;
}
function w(e) {
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
		return e.pure && (m && m.running ? (e.tState = u, e.tOwned && e.tOwned.forEach(D), e.tOwned = void 0) : (e.state = u, e.owned && e.owned.forEach(D), e.owned = null)), e.updatedAt = n + 1, xe(t);
	} finally {
		_ = a, p = i;
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
	if (m && m.running && (a.state = 0, a.tState = r), p === null || p !== f && (m && m.running && p.pure ? p.tOwned ? p.tOwned.push(a) : p.tOwned = [a] : p.owned ? p.owned.push(a) : p.owned = [a]), g && a.fn) {
		let e = a.fn, [t, n] = te(void 0, { equals: !1 }), r = g.factory(e, n);
		re(() => r.dispose());
		let i, o = () => ae(n).then(() => {
			i &&= (i.dispose(), void 0);
		});
		a.fn = (n) => (t(), m && m.running ? (i ||= g.factory(e, o), i.track(n)) : r.track(n));
	}
	return a;
}
function pe(e) {
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
		if ((t ? e.tState : e.state) === u) w(e);
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
		return me(n), t;
	} catch (e) {
		n || (y = null), v = null, xe(e);
	}
}
function me(e) {
	if (v &&= (h && m && m.running ? ge(v) : he(v), null), e) return;
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
				se(!1);
			}, !1);
		} else if (m.running) {
			m.running = !1, m.effects.push.apply(m.effects, y), y = null, se(!0);
			return;
		}
	}
	let n = y;
	y = null, n.length && T(() => l(n), !1), t && t();
}
function he(e) {
	for (let t = 0; t < e.length; t++) pe(e[t]);
}
function ge(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t], r = m.queue;
		r.has(n) || (r.add(n), h(() => {
			r.delete(n), T(() => {
				m.running = !0, pe(n);
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
			e === u ? i !== t && (!i.updatedAt || i.updatedAt < b) && pe(i) : e === d && E(i, t);
		}
	}
}
function _e(e) {
	let t = m && m.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = d : r.state = d, r.pure ? v.push(r) : y.push(r), r.observers && _e(r));
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
	if (m && m.running && e.pure) ve(e, !0);
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
function ve(e, t) {
	if (t || (e.tState = 0, m.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) ve(e.owned[t]);
}
function ye(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function be(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		xe(e, n && n.owner || null);
	}
}
function xe(e, t = p) {
	let n = c && t && t.context && t.context[c], r = ye(e);
	if (!n) throw r;
	y ? y.push({
		fn() {
			be(r, n, t);
		},
		state: u
	}) : be(r, n, t);
}
var Se = !1;
function O(t, i) {
	if (Se && e.context) {
		let a = e.context;
		n(r());
		let o = C(() => t(i || {}));
		return n(a), o;
	}
	return C(() => t(i || {}));
}
var Ce = (e) => `Stale read from <${e}>.`;
function we(e) {
	let t = e.keyed, n = S(() => e.when, void 0, void 0), r = t ? n : S(n, void 0, { equals: (e, t) => !e == !t });
	return S(() => {
		let i = r();
		if (i) {
			let a = e.children;
			return typeof a == "function" && a.length > 0 ? C(() => a(t ? i : () => {
				if (!C(r)) throw Ce("Show");
				return n();
			})) : a;
		}
		return e.fallback;
	}, void 0, void 0);
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/web/dist/web.js
var Te = (e) => S(() => e());
function Ee(e, t, n) {
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
var De = "_$DX_DELEGATE";
function Oe(e, t, n, r = {}) {
	let i;
	return ee((r) => {
		i = r, t === document ? e() : j(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function k(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => C(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function ke(e, t = window.document) {
	let n = t[De] || (t[De] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, Ne));
	}
}
function A(e, t, n) {
	Me(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ae(e, t) {
	Me(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function je(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function j(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return M(e, t, r, n);
	x((r) => M(e, t(), r, n), r);
}
function Me(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function Ne(t) {
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
function M(e, t, n, r, i) {
	let a = Me(e);
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
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = N(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = N(e, n, r);
	} else if (o === "function") return x(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = M(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (Pe(o, t, n, i)) return x(() => n = M(e, o, n, r, !0)), () => n;
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
			if (n = N(e, n, r), s) return n;
		} else c ? n.length === 0 ? Fe(e, o, r) : Ee(e, n, o) : (n && N(e), Fe(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = N(e, n, r, t);
			N(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function Pe(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (!(o == null || o === !0 || o === !1)) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = Pe(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = Pe(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function Fe(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function N(e, t, n, r) {
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
var Ie = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}";
//#endregion
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/unit-helper/index.js
function Le(e, t) {
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
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/mx-audio/index.js
function Re(e, t) {
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
async function ze() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function Be(e) {
	let t, n = !1;
	return (async () => {
		let r = await ze();
		n || r && (t = Re(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region ../../node_modules/.pnpm/solid-js@1.9.13/node_modules/solid-js/store/dist/store.js
var Ve = Symbol("store-raw"), P = Symbol("store-node"), F = Symbol("store-has"), He = Symbol("store-self");
function Ue(e) {
	let t = e[a];
	if (!t && (Object.defineProperty(e, a, { value: t = new Proxy(e, qe) }), !Array.isArray(e))) {
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
function I(e) {
	let t;
	return typeof e == "object" && !!e && (e[a] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function L(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[Ve]) return n;
	if (!I(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = L(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = L(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function R(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function z(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = te(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function We(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === a || t === P ? n : (delete n.value, delete n.writable, n.get = () => e[a][t], n);
}
function Ge(e) {
	ie() && z(R(e, P), He)();
}
function Ke(e) {
	return Ge(e), Reflect.ownKeys(e);
}
var qe = {
	get(e, t, n) {
		if (t === Ve) return e;
		if (t === a) return n;
		if (t === o) return Ge(e), n;
		let r = R(e, P), i = r[t], s = i ? i() : e[t];
		if (t === P || t === F || t === "__proto__") return s;
		if (!i) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ie() && (typeof s != "function" || e.hasOwnProperty(t)) && !(n && n.get) && (s = z(r, t, s)());
		}
		return I(s) ? Ue(s) : s;
	},
	has(e, t) {
		return t === Ve || t === a || t === o || t === P || t === F || t === "__proto__" ? !0 : (ie() && z(R(e, F), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: Ke,
	getOwnPropertyDescriptor: We
};
function B(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[F] && e[F][t] && i !== void 0 && e[F][t].$()) : (e[t] = n, e[F] && e[F][t] && i === void 0 && e[F][t].$());
	let o = R(e, P), s;
	if ((s = z(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = z(o, "length", a)) && s.$(e.length);
	}
	(s = o[He]) && s.$();
}
function Je(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Ye(i) || B(e, i, t[i]);
	}
}
function Ye(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function Xe(e, t) {
	if (typeof t == "function" && (t = t(e)), t = L(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && B(e, n, r);
		}
		B(e, "length", r);
	} else Je(e, t);
}
function V(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Ye(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) V(e, [r[i]].concat(t), n);
			return;
		} else if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && V(e, [i].concat(t), n);
			return;
		} else if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) V(e, [r].concat(t), n);
			return;
		} else if (t.length > 1) {
			V(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || r === void 0 && a == null || (a = L(a), r === void 0 || I(i) && I(a) && !Array.isArray(a) ? Je(i, a) : B(e, r, a));
}
function Ze(...[e, t]) {
	let n = L(e || {}), r = Array.isArray(n), i = Ue(n);
	function a(...e) {
		ne(() => {
			r && e.length === 1 ? Xe(n, e[0]) : V(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/definitions/parameters.ts
var H = /* @__PURE__ */ function(e) {
	return e[e.sawToRect = 0] = "sawToRect", e[e.rectPw = 1] = "rectPw", e[e.pdSaw = 2] = "pdSaw", e[e.sawSpeed = 3] = "sawSpeed", e[e.sawAccel = 4] = "sawAccel", e[e.sawSfm = 5] = "sawSfm", e[e.sawDrill = 6] = "sawDrill", e[e.sawSdm = 7] = "sawSdm", e[e.sawCreep = 8] = "sawCreep", e[e.sawCreep2 = 9] = "sawCreep2", e[e.sawSquash = 10] = "sawSquash", e[e.sawSinus = 11] = "sawSinus", e[e.sawRidge = 12] = "sawRidge", e[e.sawScrew = 13] = "sawScrew", e[e.count = 14] = "count", e;
}({});
function Qe() {
	return {
		oscWave: 3,
		oscOctave: 0,
		oscShape: 0,
		ampAttack: 0,
		ampDecay: 0,
		ampSustain: 1,
		ampRelease: 0,
		chorusLevel: 0,
		reverbLevel: 0,
		hpfOn: !1,
		hpfCutoff: 0,
		hpfPeak: 0,
		filterOn: !1,
		filterCutoff: 1,
		filterPeak: 0,
		foldingShaperOn: !1,
		foldingShaperWave: 0,
		foldingShaperLevel: 0,
		densityShaperLevel: 0,
		masterVolume: .8
	};
}
//#endregion
//#region src/store.ts
var [U, W] = Ze({
	synthParams: Qe(),
	notes: []
});
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/number-utils-Dgvlroy3.js
function G(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function $e(e, t) {
	return Math.max(e, t);
}
function et(e, t) {
	return Math.min(e, t);
}
function K(e, t, n) {
	return t + (n - t) * e;
}
function tt(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? G(o, Math.min(r, i), Math.max(r, i)) : o;
}
function q(e, t, n) {
	return (1 - n) * e + n * t;
}
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/mo-synthesis/index.js
function nt(e, t) {
	let n = e.length, r = t >> 0, i = (r + 1) % n, a = t - r;
	return q(e[r], e[i], a);
}
function rt(e) {
	let t = e.length, n = 0;
	for (let r = 0; r < t; r++) n += e[r];
	let r = n / t;
	for (let n = 0; n < t; n++) e[n] -= r;
	return e;
}
function J(e) {
	return e * e;
}
function it(e) {
	return 1 - (1 - e) * (1 - e);
}
function at(e, t) {
	return (e - t * e) / (t - 2 * t * Math.abs(e) + 1);
}
function ot(e) {
	return e - Math.floor(e);
}
function st(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
//#endregion
//#region ../../node_modules/.pnpm/wus-unit-types@0.2.7/node_modules/wus-unit-types/dist/v01/index.js
function ct(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/synthesis/chrous-effect-ex.ts
function lt(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain();
	t.connect(r), r.connect(n);
	let i = [
		{
			baseDelay: .028,
			lfoFreq: .13,
			modDepth: .007,
			pan: -.95
		},
		{
			baseDelay: .026,
			lfoFreq: .19,
			modDepth: .0065,
			pan: .95
		},
		{
			baseDelay: .019,
			lfoFreq: .31,
			modDepth: .0045,
			pan: -.6
		},
		{
			baseDelay: .022,
			lfoFreq: .23,
			modDepth: .0055,
			pan: .6
		},
		{
			baseDelay: .012,
			lfoFreq: .47,
			modDepth: .003,
			pan: -.25
		},
		{
			baseDelay: .015,
			lfoFreq: .37,
			modDepth: .0035,
			pan: .25
		},
		{
			baseDelay: .017,
			lfoFreq: .53,
			modDepth: .0025,
			pan: 0
		}
	], a = e.createGain();
	a.connect(n);
	let o = [];
	i.forEach((n) => {
		let r = e.createDelay(), i = e.createStereoPanner(), s = e.createOscillator(), c = e.createGain();
		t.connect(r), r.connect(i), i.connect(a), r.delayTime.value = n.baseDelay, i.pan.value = n.pan, s.type = "sine", s.frequency.value = n.lfoFreq, c.gain.value = n.modDepth, s.connect(c), c.connect(r.delayTime), s.start(e.currentTime + Math.random() * 2), o.push(s);
	});
	function s(e, t) {
		(t || a.gain.value !== e) && (a.gain.value = e * .4, r.gain.value = 1 - e * .3);
	}
	return s(0), {
		inputNode: t,
		outputNode: n,
		setLevel: s,
		setupNodes() {},
		cleanupNodes() {
			for (let e of o) e.stop();
		}
	};
}
//#endregion
//#region ../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.13/node_modules/mofus/dist/array-utils-BJJNqsK6.js
function ut(e) {
	return Array(e).fill(0).map((e, t) => t);
}
//#endregion
//#region src/synthesis/effect-wrapper.ts
function dt(e, t, n) {
	n ??= t;
	let r = e.createGain(), i = e.createGain(), a = e.createGain(), o = e.createGain();
	function s(e, t) {
		let n = +!!e;
		(o.gain.value !== n || t) && (o.gain.value = n, a.gain.value = n === 1 ? 0 : 1);
	}
	return s(!1, !0), {
		inputNode: r,
		outputNode: i,
		setupNodes() {
			r.connect(t), n.connect(o), o.connect(i), r.connect(a), a.connect(i);
		},
		cleanupNodes() {
			r.disconnect(), t.disconnect(), n.disconnect(), o.disconnect(), a.disconnect();
		},
		setEnabled: s
	};
}
//#endregion
//#region src/synthesis/shaper-curve-buffer-cache.ts
function ft(e, t) {
	let n = "", r = ut(2).map(() => new Float32Array(e));
	return { update(e, i) {
		let a = `${e}_${i}`;
		return a !== n && ([r[0], r[1]] = [r[1], r[0]], t(r[0], e, i), n = a), r[0];
	} };
}
//#endregion
//#region src/synthesis/density-shaper.ts
function pt(e, t, n) {
	let r = e.length, i = K(n, 0, -.9);
	for (let t = 0; t < r; t++) e[t] = at(t / (r - 1) * 2 - 1, i) * 1;
}
var mt = ft(1024, pt);
function ht(e) {
	let t = e.createWaveShaper();
	t.oversample = "2x";
	let n = dt(e, t);
	return {
		inputNode: n.inputNode,
		outputNode: n.outputNode,
		setupNodes: n.setupNodes,
		cleanupNodes: n.cleanupNodes,
		updateNodeParameters(e) {
			n.setEnabled(e.enabled);
			let r = mt.update(-1, e.level);
			t.curve !== r && (t.curve = r);
		}
	};
}
//#endregion
//#region src/synthesis/envelope-generator-adsr.ts
function gt(e, t, n) {
	let r = e.createGain(), i = {
		attack: J(t.attack) * n.attackMaxSec,
		decay: J(t.decay) * n.decayMaxSec,
		release: J(t.release) * n.releaseMaxSec
	}, { gain: a } = r;
	return {
		node: r,
		getReleaseTime() {
			return i.release;
		},
		triggerAttack(n) {
			let o = n && n > e.currentTime ? n : e.currentTime;
			a.cancelScheduledValues(o), a.setValueAtTime(r.gain.value, o), a.setValueAtTime(.001, o), a.exponentialRampToValueAtTime(1, o + i.attack), a.exponentialRampToValueAtTime($e(t.sustain, .001), o + i.attack + i.decay);
		},
		triggerRelease(t) {
			let n = t && t > e.currentTime ? t : e.currentTime;
			a.cancelScheduledValues(n), a.setValueAtTime(r.gain.value, n), a.exponentialRampToValueAtTime(.001, n + i.release), a.setValueAtTime(0, n + i.release);
		}
	};
}
//#endregion
//#region src/synthesis/filters.ts
function _t(e, t) {
	let n = e.createBiquadFilter();
	n.type = "highpass";
	let r = dt(e, n);
	return {
		inputNode: r.inputNode,
		outputNode: r.outputNode,
		setupNodes: r.setupNodes,
		cleanupNodes: r.cleanupNodes,
		updateNodeParameters(e) {
			r.setEnabled(e.enabled);
			let i = t - 12, a = t + 48, o = st(G(K(e.cutoff, i, a), 0, 127));
			n.frequency.value !== o && (n.frequency.value = o);
			let s = K(J(e.peak), 0, 36);
			n.Q.value !== s && (n.Q.value = s);
		}
	};
}
function vt(e, t) {
	let n = e.createBiquadFilter();
	n.type = "lowpass";
	let r = dt(e, n);
	return {
		inputNode: r.inputNode,
		outputNode: r.outputNode,
		setupNodes: r.setupNodes,
		cleanupNodes: r.cleanupNodes,
		updateNodeParameters(e) {
			r.setEnabled(e.enabled);
			let i = t - 24, a = st(G(K(e.cutoff, i, 127), 0, 127));
			n.frequency.value !== a && (n.frequency.value = a);
			let o = K(J(e.peak), 0, 36);
			n.Q.value !== o && (n.Q.value = o);
		}
	};
}
//#endregion
//#region src/synthesis/folding-shaper.ts
function yt(e) {
	return (t, ...n) => Math.sign(t) * e(Math.abs(t), ...n);
}
var bt = {
	foldSine(e) {
		return Math.sin(e * Math.PI * .5);
	},
	foldSineHalf: yt((e) => {
		let t = Math.sign(e), n = Math.abs(e), r = 0;
		return r = n < 1 ? Math.sin(n * Math.PI / 2) : 1 - (1 - Math.sin(n * Math.PI / 2) ** 2), t * r;
	}),
	foldTriangle(e) {
		let t = ((e + 1) % 4 + 4) % 4;
		return t < 2 ? t - 1 : 3 - t;
	},
	foldTriangleHalf: yt((e) => Math.abs((e + 1) % 2 - 1)),
	foldSaw: yt((e) => {
		let t = e - Math.floor(e);
		return (e >> 0 & 1) == 1 && --t, t;
	}),
	foldSawHalf(e) {
		let t = Math.sign(e), n = Math.abs(e);
		return n %= 1, t * n;
	},
	foldPolyHalf: yt((e) => e < 1 ? e : e < 2 ? 1 : e / 2 & 1 ? 0 : 1)
}, xt = {
	0: {
		shaperCoreKey: "foldSine",
		maxGain: 24
	},
	1: {
		shaperCoreKey: "foldSawHalf",
		maxGain: 8
	},
	2: {
		shaperCoreKey: "foldPolyHalf",
		maxGain: 8
	},
	3: {
		shaperCoreKey: "foldTriangle",
		maxGain: 12
	},
	4: {
		shaperCoreKey: "foldSaw",
		maxGain: 12
	}
};
function St(e, t, n) {
	let r = e.length, i = xt[t], a = bt[i.shaperCoreKey];
	for (let t = 0; t < r; t++) e[t] = a((t / (r - 1) * 2 - 1) * (1 + J(n) * i.maxGain));
}
var Ct = ft(1024, St);
function wt(e) {
	let t = e.createWaveShaper();
	t.oversample = "4x";
	let n = dt(e, t);
	return {
		inputNode: n.inputNode,
		outputNode: n.outputNode,
		setupNodes: n.setupNodes,
		cleanupNodes: n.cleanupNodes,
		updateNodeParameters(e) {
			n.setEnabled(e.enabled);
			let r = Ct.update(e.wave, e.level);
			t.curve !== r && (t.curve = r);
		}
	};
}
//#endregion
//#region src/synthesis/pd-saw.ts
function Tt(e, t) {
	let n = .5, r = n * (1 - t * .95), i = e + r / 2;
	i -= Math.floor(i);
	let a = 0;
	return a = i < r ? i / r * n : n + (i - r) / (1 - r) * (1 - n), -Math.cos(a * Math.PI * 2);
}
//#endregion
//#region src/synthesis/phase-tweakers.ts
var Et = Math.PI * 2, Dt = Math.PI / 2, Ot = Math.PI, kt = {
	sfm(e, t) {
		let n = K(t, 1, 4), r = t * 2;
		return [ot(e + Math.sin(e * Et * n) * r), 1 + Et * r * n];
	},
	speed(e, t) {
		let n = 1 + t * 7;
		return [e * n % 1, n];
	},
	accel(e, t) {
		let n = 1 + J(e) * t * 15;
		return [e * n % 1, n];
	},
	drill(e, t) {
		let n = K(t, .25, 1), r = e, i = r * (1 + J(n) * 15), a = i % 1 < .5 ? 0 : 1;
		return i < 2 && (a = 1), [r * a, 1];
	},
	pw(e, t) {
		let n = K(t, .5, .05);
		return [e < n ? e / n * .5 : .5 + (e - n) / (1 - n) * .5, 1];
	},
	"sub-pw"(e, t) {
		let n = K(t, .5, .05), r = 0;
		return r = e < n ? e / n : tt(e, n, 1, 0, 1), [r, 1];
	},
	sdm(e, t) {
		let n = K(t, 1, 100), r = e * n, i = Math.floor(r), a = i + 1, o = r - i, s = e;
		return [q(s, q(s, q(i === 0 ? 0 : At[i], At[a], o), t), t), n];
	},
	creep(e, t) {
		let n = 1 + t * 31, r = K(t, 1, 0), i = -Math.cos(it(e) * Ot * n) * .5 + .5, a = K(e, 1, r), o = K(it(t), 1, 1.07);
		return [G(i * a * o, 0, 1), n];
	},
	creep2(e, t) {
		let n = 1 + J(t) * 31;
		return [(-Math.cos(e * Ot * n) * .5 + .5) * Math.sin(e * Math.PI * .5), n];
	},
	squash(e, t) {
		return [ot(e + J(t) * 4 * Math.tanh(3 * (2 * e - 1))) * 1, 1 + t * 4];
	},
	sinus(e, t) {
		return [-Math.cos(e * Ot * (1 + t * 15)) * .5 + .5, Dt * (1 + t * 15)];
	},
	ridge(e, t) {
		let n = 1 + t * 15;
		return [Math.abs(Math.sin(e * Dt * n)), n];
	},
	screw(e, t) {
		let n = 1 + t * 7;
		return [e * n % 1 * e, n];
	}
}, At = ut(200).map(() => Math.random()), jt = {
	[H.sawSfm]: "sfm",
	[H.sawSpeed]: "speed",
	[H.sawAccel]: "accel",
	[H.sawDrill]: "drill",
	[H.sawSdm]: "sdm",
	[H.sawCreep]: "creep",
	[H.sawCreep2]: "creep2",
	[H.sawSquash]: "squash",
	[H.sawSinus]: "sinus",
	[H.sawRidge]: "ridge",
	[H.sawScrew]: "screw"
};
function Mt(e, t) {
	if (e === 0) {
		let e = -t * .9;
		return (t) => at(1 - t * 2, e);
	} else if (e === 1) {
		let e = .5 - t * .4;
		return (t) => t < e ? 1 : -1;
	} else if (e === 2) return (e) => Tt(e, t);
	else {
		function n(e) {
			return (n) => {
				let [r] = kt[e](n, t);
				return r -= Math.floor(r), 1 - r * 2;
			};
		}
		let r = jt[e];
		return r ? n(r) : (e) => Math.sin(e * Math.PI * 2);
	}
}
function Nt(e, t, n) {
	let r = e.length, i = Mt(t, n);
	for (let t = 0; t < r; t++) e[t] = i(t / r);
	return e;
}
function Pt(e, t, n) {
	return Nt(e, t, n), rt(e), e;
}
//#endregion
//#region src/synthesis/reverbrator.ts
function Ft(e, t, n) {
	let { sampleRate: r } = e, i = t * r, a = e.createBuffer(t, i, r), o = a.getChannelData(0), s = a.getChannelData(1);
	for (let e = 0; e < i; e++) o[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n, s[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n;
	return a;
}
function It(e) {
	let t = Ft(e, 2, 2), n = e.createGain();
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
//#region src/synthesis/webaudio-helper.ts
function Lt(...e) {
	return {
		connects() {
			let t = null;
			for (let n of e) {
				let e = "inputNode" in n ? n.inputNode : n, r = "outputNode" in n ? n.outputNode : n;
				t && e && t.connect(e), "setupNodes" in n && n.setupNodes(), t = r;
			}
		},
		disconnects() {
			let t = null;
			for (let n of e) {
				let e = "inputNode" in n ? n.inputNode : n, r = "outputNode" in n ? n.outputNode : n;
				t && e && t.disconnect(e), "cleanupNodes" in n && n.cleanupNodes(), t = r;
			}
		}
	};
}
//#endregion
//#region src/synthesis/index.ts
var Rt = ct("wus-v01", import.meta.url);
function zt(e, t) {
	return st(e + t * 12);
}
function Bt() {
	let e = Rt?.audioContext ?? new AudioContext();
	return {
		audioContext: e,
		voiceDestinationNode: e.createGain(),
		synthParameters: Qe(),
		finalDestinationNode: Rt?.audioOutputNode ?? e.destination
	};
}
var Vt = ft(1024, Pt);
function Ht(e, t) {
	let n = e.createOscillator();
	n.type = "sawtooth";
	let r = e.createWaveShaper();
	r.oversample = "2x";
	let i = e.createBiquadFilter();
	i.type = "highpass", i.frequency.value = 10, i.Q.value = Math.SQRT1_2;
	let a;
	return {
		outputNode: i,
		setupNodes() {
			n.connect(r), r.connect(i), n.start();
		},
		cleanupNodes() {
			n.disconnect(), r.disconnect(), n.stop();
		},
		updateNodeParameters(e) {
			let i = zt(t, e.octave);
			n.frequency.value !== i && (n.frequency.value = i);
			let o = Vt.update(e.wave, e.shape);
			o !== a && (r.curve = o, a = o);
		}
	};
}
function Ut(e, t) {
	let { audioContext: n, voiceDestinationNode: r } = e, i = Ht(n, t), a = _t(n, t), o = vt(n, t), s = wt(n), c = n.createGain(), l = e.synthParameters, u = gt(n, {
		attack: l.ampAttack,
		decay: l.ampDecay,
		sustain: l.ampSustain,
		release: l.ampRelease
	}, {
		attackMaxSec: 2,
		decayMaxSec: 3,
		releaseMaxSec: 3
	});
	function d() {
		let { synthParameters: t } = e;
		i.updateNodeParameters({
			wave: t.oscWave,
			octave: t.oscOctave,
			shape: t.oscShape
		}), a.updateNodeParameters({
			enabled: t.hpfOn,
			cutoff: t.hpfCutoff,
			peak: t.hpfPeak
		}), o.updateNodeParameters({
			enabled: t.filterOn,
			cutoff: t.filterCutoff,
			peak: t.filterPeak
		}), s.updateNodeParameters({
			enabled: t.foldingShaperOn,
			wave: t.foldingShaperWave,
			level: t.foldingShaperLevel
		});
		let n = J(t.masterVolume);
		c.gain.value !== n && (c.gain.value = n);
	}
	let f = Lt(i, a, o, s, u.node, c, r);
	return {
		start(e) {
			d(), f.connects(), u.triggerAttack(e);
		},
		stop(e) {
			u.triggerRelease(e);
			let t = ((e && e > n.currentTime ? e : n.currentTime) - n.currentTime + u.getReleaseTime()) * 1e3 + 100;
			setTimeout(() => {
				f.disconnects();
			}, Math.max(0, t));
		},
		updateNodeParameters: d
	};
}
function Wt(e) {
	let { audioContext: t } = e, n = lt(t), r = It(t), i = ht(t), a = Lt(e.voiceDestinationNode, i, n, r, e.finalDestinationNode);
	return {
		setupNodes() {
			a.connects();
		},
		cleanupNodes() {
			a.disconnects();
		},
		updateNodeParameters() {
			let t = e.synthParameters;
			i.updateNodeParameters({
				enabled: t.densityShaperLevel > 0,
				level: t.densityShaperLevel
			}), n.setLevel(t.chorusLevel), r.setLevel(t.reverbLevel);
		}
	};
}
function Gt() {
	let e = Bt(), t = {}, n = Wt(e);
	n.setupNodes();
	let r = {
		addNote(n, r) {
			let i = Ut(e, n);
			i.updateNodeParameters(), i.start(r), t[n] = i;
		},
		removeNote(e, n) {
			let r = t[e];
			r && (r.stop(n), delete t[e]);
		},
		updateNodeParameters() {
			for (let e of Object.values(t)) e.updateNodeParameters();
			n.updateNodeParameters();
		}
	};
	return {
		async resumeIfNeeded() {
			e.audioContext.state === "suspended" && await e.audioContext.resume();
		},
		setParameter(t, n) {
			e.synthParameters[t] = n, r.updateNodeParameters();
		},
		setAllParameters(t) {
			Object.assign(e.synthParameters, t), r.updateNodeParameters();
		},
		noteOn(e, t) {
			r.removeNote(e, t), r.addNote(e, t);
		},
		noteOff(e, t) {
			r.removeNote(e, t);
		}
	};
}
//#endregion
//#region src/actions.ts
var Y = Gt(), X = {
	noteOn(e, t = 0, n = 1) {
		Y.noteOn(e, t), W("notes", (t) => [...t, e]);
	},
	noteOff(e, t = 0) {
		Y.noteOff(e, t), W("notes", (t) => t.filter((t) => t !== e));
	},
	setSynthParam(e, t) {
		W("synthParams", e, t), Y.setParameter(e, t);
	},
	loadStates(e) {
		W("synthParams", e.synthParams), Y.setAllParameters(e.synthParams);
	}
};
//#endregion
//#region src/persistence.ts
function Z(e) {
	return e * 255 >>> 0;
}
function Q(e) {
	return e / 255;
}
var Kt = {
	serializeParameters(e) {
		let t = e;
		return [
			t.oscWave,
			t.oscOctave + 100,
			Z(t.oscShape),
			Z(t.ampAttack),
			Z(t.ampDecay),
			Z(t.ampSustain),
			Z(t.ampRelease),
			Z(t.chorusLevel),
			Z(t.reverbLevel),
			+!!t.hpfOn,
			Z(t.hpfCutoff),
			Z(t.hpfPeak),
			+!!t.filterOn,
			Z(t.filterCutoff),
			Z(t.filterPeak),
			+!!t.foldingShaperOn,
			Z(t.foldingShaperWave),
			Z(t.foldingShaperLevel),
			Z(t.densityShaperLevel),
			Z(t.masterVolume)
		];
	},
	deserializeParameters(e) {
		return {
			oscWave: e[0],
			oscOctave: e[1] - 100,
			oscShape: Q(e[2]),
			ampAttack: Q(e[3]),
			ampDecay: Q(e[4]),
			ampSustain: Q(e[5]),
			ampRelease: Q(e[6]),
			chorusLevel: Q(e[7]),
			reverbLevel: Q(e[8]),
			hpfOn: e[9] === 1,
			hpfCutoff: Q(e[10]),
			hpfPeak: Q(e[11]),
			filterOn: e[12] === 1,
			filterCutoff: Q(e[13]),
			filterPeak: Q(e[14]),
			foldingShaperOn: e[15] === 1,
			foldingShaperWave: Q(e[16]),
			foldingShaperLevel: Q(e[17]),
			densityShaperLevel: Q(e[18]),
			masterVolume: Q(e[19])
		};
	}
}, qt = 1, Jt = {
	emitStateBytes() {
		let { synthParams: e } = U, t = Kt.serializeParameters(e);
		return new Uint8Array([qt, ...t]);
	},
	applyStateBytes(e) {
		if (e.length === 21 && e[0] === qt) {
			let t = Kt.deserializeParameters([...e.slice(1)]);
			X.loadStates({ synthParams: t });
		}
	}
};
//#endregion
//#region src/drivers.ts
function Yt() {
	Rt ? Rt.completeSetup({
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
		persistence: Jt
	}) : re(Be({
		async noteOn(e) {
			await Y.resumeIfNeeded(), X.noteOn(e);
		},
		noteOff(e) {
			X.noteOff(e);
		}
	}));
}
//#endregion
//#region src/components/slider-parameter.tsx
var Xt = /* @__PURE__ */ k("<div class=\"flex-ha h-8 text-[10px] tracking-[0.12em] text-[#d7dfeb] gap-2\"><div class=\"w-[72px] text-[#a8b4c0]\"></div><input type=range class=\"flex-1 accent-[#2ec965]\"><div class=\"w-[22px] text-right text-[#f8f8f8]\">");
function Zt(e) {
	let t = e.step && e.step >= 1;
	return (() => {
		var n = Xt(), r = n.firstChild, i = r.nextSibling, a = i.nextSibling;
		return j(r, () => e.label), i.$$input = (t) => e.onChange(Number(t.currentTarget.value)), j(a, () => t ? Math.round(e.value) : e.value.toFixed(2)), x((t) => {
			var n = e.min ?? 0, r = e.max ?? 1, a = e.step ?? .01;
			return n !== t.e && A(i, "min", t.e = n), r !== t.t && A(i, "max", t.t = r), a !== t.a && A(i, "step", t.a = a), t;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		}), x(() => i.value = e.value), n;
	})();
}
ke(["input"]);
//#endregion
//#region src/organisms/module-header.tsx
var Qt = /* @__PURE__ */ k("<button type=button>"), $t = /* @__PURE__ */ k("<div class=\"w-full flex-ha justify-between bg-indigo-800 py-1.5 px-2 text-[11px] tracking-[0.16em] text-[#dbe4ec] gap-2 mb-0.5\"><div class=\"flex-ha gap-1\"><span>");
function en(e) {
	return (() => {
		var t = $t(), n = t.firstChild.firstChild;
		return j(n, () => e.title), j(t, O(we, {
			get when() {
				return e.withIndicator;
			},
			get children() {
				var t = Qt();
				return je(t, "click", e.onToggleIndicator, !0), x(() => Ae(t, `w-4 h-4 border ${e.enabled ? "border-[#72ffa4] bg-[#2d6d45]" : "border-[#6c7b8b] bg-[#212a35]"}`)), t;
			}
		}), null), t;
	})();
}
ke(["click"]);
//#endregion
//#region src/organisms/waveform-view.tsx
var tn = /* @__PURE__ */ k("<div class=bg-[#222]><svg viewBox=\"0 0 160 90\"width=160 height=90><path stroke=#08f fill=#08f4>");
function nn(e, t, n) {
	return `${[
		[0, n / 2],
		...ut(t).map((r) => [r, (-nt(e, et(r / (t - 1) * e.length, e.length - 1)) * .5 + .5) * n]),
		[t - 1, n / 2]
	].reduce((e, [t, n], r) => e + (r === 0 ? `M ${t} ${n}` : ` L ${t} ${n}`), "")}`;
}
function rn(e) {
	let t = ft(64, Nt), n = S(() => nn(t.update(e.wave, e.shape), 160, 90));
	return (() => {
		var e = tn(), t = e.firstChild.firstChild;
		return x(() => A(t, "d", n())), e;
	})();
}
//#endregion
//#region src/sections/main-view.tsx
var an = /* @__PURE__ */ k("<div class=\"flex-c gap-4 bg-gray-700\"><div class=\"flex-vc gap-4 bg-zinc-900 w-[800px] h-[380px]\"><div class=\"flex-h gap-6\"><div class=\"flex-vc gap-1 mb-[-20px]\"><div class=\"pt-2 pb-1\"></div></div><div class=\"flex-vl gap-1\"><div class=h-2></div></div><div class=\"flex-vl gap-1\"></div></div><div class=\"flex-h gap-6 \"><div class=\"w-[240px] flex-v text-white gap-1 pt-2 justify-end\"><div class=flex-vc><div>proto-engine-ptm-osc</div><div class=text-white></div></div></div><div class=\"flex-vl gap-1\"></div><div class=\"flex-vl gap-1 mt-[-36px]\">");
function $(e) {
	return O(Zt, {
		get label() {
			return e.label;
		},
		get value() {
			return U.synthParams[e.paramKey];
		},
		onChange: (t) => X.setSynthParam(e.paramKey, t)
	});
}
function on(e) {
	return O(Zt, {
		get label() {
			return e.label;
		},
		get value() {
			return U.synthParams[e.paramKey];
		},
		onChange: (t) => X.setSynthParam(e.paramKey, t),
		get min() {
			return e.min;
		},
		get max() {
			return e.max;
		},
		step: 1
	});
}
function sn(e) {
	return O(Zt, {
		get label() {
			return e.label;
		},
		get value() {
			return U.synthParams[e.paramKey];
		},
		onChange: (t) => X.setSynthParam(e.paramKey, t),
		min: 0,
		get max() {
			return e.count - 1;
		},
		step: 1
	});
}
function cn(e) {
	return O(en, {
		get title() {
			return e.title;
		},
		get enabled() {
			return U.synthParams[e.paramKey];
		},
		withIndicator: !0,
		onToggleIndicator: () => X.setSynthParam(e.paramKey, !U.synthParams[e.paramKey])
	});
}
function ln() {
	return (() => {
		var e = an(), t = e.firstChild.firstChild, n = t.firstChild, r = n.firstChild, i = n.nextSibling, a = i.firstChild, o = i.nextSibling, s = t.nextSibling.firstChild, c = s.firstChild.firstChild.nextSibling, l = s.nextSibling, u = l.nextSibling;
		return j(n, O(en, { title: "oscillator" }), r), j(r, O(rn, {
			get wave() {
				return U.synthParams.oscWave;
			},
			get shape() {
				return U.synthParams.oscShape;
			}
		})), j(n, O(sn, {
			paramKey: "oscWave",
			label: "osc_wave",
			get count() {
				return H.count;
			}
		}), null), j(n, O($, {
			paramKey: "oscShape",
			label: "osc_shape"
		}), null), j(n, O(on, {
			paramKey: "oscOctave",
			label: "osc_octave",
			min: -2,
			max: 2
		}), null), j(i, O(cn, {
			title: "hpf",
			paramKey: "hpfOn"
		}), a), j(i, O($, {
			paramKey: "hpfCutoff",
			label: "hpf_cutoff"
		}), a), j(i, O($, {
			paramKey: "hpfPeak",
			label: "hpf_peak"
		}), a), j(i, O(cn, {
			title: "filter",
			paramKey: "filterOn"
		}), null), j(i, O($, {
			paramKey: "filterCutoff",
			label: "filter_cutoff"
		}), null), j(i, O($, {
			paramKey: "filterPeak",
			label: "filter_peak"
		}), null), j(o, O(en, { title: "amplifier" }), null), j(o, O($, {
			paramKey: "ampAttack",
			label: "amp_attack"
		}), null), j(o, O($, {
			paramKey: "ampDecay",
			label: "amp_decay"
		}), null), j(o, O($, {
			paramKey: "ampSustain",
			label: "amp_sustain"
		}), null), j(o, O($, {
			paramKey: "ampRelease",
			label: "amp_release"
		}), null), j(c, (() => {
			var e = Te(() => U.notes.length > 0);
			return () => e() ? `${U.notes.length}voices active` : "--";
		})()), j(s, O($, {
			paramKey: "masterVolume",
			label: "master"
		}), null), j(l, O(cn, {
			title: "folding shaper",
			paramKey: "foldingShaperOn"
		}), null), j(l, O(sn, {
			paramKey: "foldingShaperWave",
			label: "shaper_wave",
			count: 5
		}), null), j(l, O($, {
			paramKey: "foldingShaperLevel",
			label: "shaper_level"
		}), null), j(u, O(en, { title: "effects" }), null), j(u, O($, {
			paramKey: "densityShaperLevel",
			label: "density_level"
		}), null), j(u, O($, {
			paramKey: "chorusLevel",
			label: "chorus_level"
		}), null), j(u, O($, {
			paramKey: "reverbLevel",
			label: "reverb_level"
		}), null), e;
	})();
}
//#endregion
//#region src/app.tsx
function un() {
	return Yt(), O(ln, {});
}
//#endregion
//#region src/index.tsx
var dn = Le((e) => Oe(() => O(un, {}), e), ["@import \"https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap\";@layer components;@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-leading:initial;--tw-tracking:initial;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-indigo-800:oklch(39.8% .195 277.366);--color-gray-700:oklch(37.3% .034 259.733);--color-zinc-900:oklch(21% .006 285.885);--color-white:#fff;--spacing:.25rem;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer utilities{.mt-\\[-36px\\]{margin-top:-36px}.mb-0\\.5{margin-bottom:calc(var(--spacing) * .5)}.mb-\\[-20px\\]{margin-bottom:-20px}.flex{display:flex}.h-2{height:calc(var(--spacing) * 2)}.h-4{height:calc(var(--spacing) * 4)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-\\[8px\\]{height:8px}.h-\\[380px\\]{height:380px}.h-full{height:100%}.w-4{width:calc(var(--spacing) * 4)}.w-\\[22px\\]{width:22px}.w-\\[72px\\]{width:72px}.w-\\[80px\\]{width:80px}.w-\\[240px\\]{width:240px}.w-\\[800px\\]{width:800px}.w-full{width:100%}.flex-1{flex:1}.cursor-pointer{cursor:pointer}.flex-col-reverse{flex-direction:column-reverse}.justify-between{justify-content:space-between}.justify-end{justify-content:flex-end}.gap-1{gap:calc(var(--spacing) * 1)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-\\[2px\\]{gap:2px}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#6c7b8b\\]{border-color:#6c7b8b}.border-\\[\\#7df7a0\\]{border-color:#7df7a0}.border-\\[\\#72ffa4\\]{border-color:#72ffa4}.border-\\[\\#444\\]{border-color:#444}.border-\\[\\#63717f\\]{border-color:#63717f}.border-\\[\\#243342\\]{border-color:#243342}.border-\\[\\#485462\\]{border-color:#485462}.border-\\[\\#617081\\]{border-color:#617081}.border-\\[\\#ffb16f\\]{border-color:#ffb16f}.border-\\[\\#ffd861\\]{border-color:#ffd861}.bg-\\[\\#1a222d\\]{background-color:#1a222d}.bg-\\[\\#1b232d\\]{background-color:#1b232d}.bg-\\[\\#2d6d45\\]{background-color:#2d6d45}.bg-\\[\\#62d581\\]{background-color:#62d581}.bg-\\[\\#212a35\\]{background-color:#212a35}.bg-\\[\\#222\\]{background-color:#222}.bg-\\[\\#18242f\\]{background-color:#18242f}.bg-\\[\\#091015\\]{background-color:#091015}.bg-\\[\\#473405\\]{background-color:#473405}.bg-\\[\\#f58f45\\]{background-color:#f58f45}.bg-gray-700{background-color:var(--color-gray-700)}.bg-indigo-800{background-color:var(--color-indigo-800)}.bg-zinc-900{background-color:var(--color-zinc-900)}.px-2{padding-inline:calc(var(--spacing) * 2)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pb-1{padding-bottom:calc(var(--spacing) * 1)}.text-right{text-align:right}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.leading-none{--tw-leading:1;line-height:1}.tracking-\\[0\\.12em\\]{--tw-tracking:.12em;letter-spacing:.12em}.tracking-\\[0\\.14em\\]{--tw-tracking:.14em;letter-spacing:.14em}.tracking-\\[0\\.16em\\]{--tw-tracking:.16em;letter-spacing:.16em}.text-\\[\\#a8b4c0\\]{color:#a8b4c0}.text-\\[\\#c7d2de\\]{color:#c7d2de}.text-\\[\\#d7dfeb\\]{color:#d7dfeb}.text-\\[\\#dbe4ec\\]{color:#dbe4ec}.text-\\[\\#eef5ff\\]{color:#eef5ff}.text-\\[\\#f8f8f8\\]{color:#f8f8f8}.text-\\[\\#ffd861\\]{color:#ffd861}.text-white{color:var(--color-white)}.accent-\\[\\#2ec965\\]{accent-color:#2ec965}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}}body{-webkit-user-select:none;user-select:none;min-height:100dvh;font-family:Inter,sans-serif}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", Ie]);
//#endregion
export { dn as default };
