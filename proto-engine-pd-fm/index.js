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
var n = (e, t) => e === t, r = Symbol("solid-proxy"), i = Symbol("solid-track"), a = { equals: n }, o = null, s = ue, c = 1, l = 2, u = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, d = null, f = null, p = null, m = null, h = null, g = 0;
function ee(e, t) {
	let n = p, r = d, i = e.length === 0, a = t === void 0 ? r : t, o = i ? u : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, s = i ? e : () => e(() => y(() => T(o)));
	d = o, p = null;
	try {
		return C(s, !0);
	} finally {
		p = n, d = r;
	}
}
function _(e, t) {
	t = t ? Object.assign({}, a, t) : a;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [ae.bind(n), (e) => (typeof e == "function" && (e = f && f.running && f.sources.has(n) ? e(n.tValue) : e(n.value)), oe(n, e))];
}
function v(e, t, n) {
	x(ce(e, t, !1, c));
}
function te(e) {
	return C(e, !1);
}
function y(e) {
	if (p === null) return e();
	let t = p;
	p = null;
	try {
		return e();
	} finally {
		p = t;
	}
}
function ne(e) {
	return d === null || (d.cleanups === null ? d.cleanups = [e] : d.cleanups.push(e)), e;
}
function b() {
	return p;
}
var [re, ie] = /*@__PURE__*/ _(!1);
function ae() {
	let e = f && f.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === c) x(this);
	else {
		let e = m;
		m = null, C(() => w(this), !1), m = e;
	}
	if (p) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== p) {
			let t = e ? e.length : 0;
			p.sources ? (p.sources.push(this), p.sourceSlots.push(t)) : (p.sources = [this], p.sourceSlots = [t]), e ? (e.push(p), this.observerSlots.push(p.sources.length - 1)) : (this.observers = [p], this.observerSlots = [p.sources.length - 1]);
		}
	}
	return e && f.sources.has(this) ? this.tValue : this.value;
}
function oe(e, t, n) {
	let r = f && f.running && f.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (f) {
			let r = f.running;
			(r || !n && f.sources.has(e)) && (f.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && C(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = f && f.running;
				r && f.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? m.push(n) : h.push(n), n.observers && de(n)), r ? n.tState = c : n.state = c);
			}
			if (m.length > 1e6) throw m = [], Error();
		}, !1);
	}
	return t;
}
function x(e) {
	if (!e.fn) return;
	T(e);
	let t = g;
	se(e, f && f.running && f.sources.has(e) ? e.tValue : e.value, t), f && !f.running && f.sources.has(e) && queueMicrotask(() => {
		C(() => {
			f && (f.running = !0), p = d = e, se(e, e.tValue, t), p = d = null;
		}, !1);
	});
}
function se(e, t, n) {
	let r, i = d, a = p;
	p = d = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (f && f.running ? (e.tState = c, e.tOwned && e.tOwned.forEach(T), e.tOwned = void 0) : (e.state = c, e.owned && e.owned.forEach(T), e.owned = null)), e.updatedAt = n + 1, E(t);
	} finally {
		p = a, d = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? oe(e, r, !0) : f && f.running && e.pure ? (f.sources.has(e) || (e.value = r), f.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function ce(e, t, n, r = c, i) {
	let a = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: d,
		context: d ? d.context : null,
		pure: n
	};
	return f && f.running && (a.state = 0, a.tState = r), d === null || d !== u && (f && f.running && d.pure ? d.tOwned ? d.tOwned.push(a) : d.tOwned = [a] : d.owned ? d.owned.push(a) : d.owned = [a]), a;
}
function S(e) {
	let t = f && f.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === l) return w(e);
	if (e.suspense && y(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < g);) {
		if (t && f.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (f.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === c) x(e);
		else if ((t ? e.tState : e.state) === l) {
			let t = m;
			m = null, C(() => w(e, n[0]), !1), m = t;
		}
	}
}
function C(e, t) {
	if (m) return e();
	let n = !1;
	t || (m = []), h ? n = !0 : h = [], g++;
	try {
		let t = e();
		return le(n), t;
	} catch (e) {
		n || (h = null), m = null, E(e);
	}
}
function le(e) {
	if (m &&= (ue(m), null), e) return;
	let t;
	if (f) {
		if (!f.promises.size && !f.queue.size) {
			let e = f.sources, n = f.disposed;
			h.push.apply(h, f.effects), t = f.resolve;
			for (let e of h) "tState" in e && (e.state = e.tState), delete e.tState;
			f = null, C(() => {
				for (let e of n) T(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) T(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				ie(!1);
			}, !1);
		} else if (f.running) {
			f.running = !1, f.effects.push.apply(f.effects, h), h = null, ie(!0);
			return;
		}
	}
	let n = h;
	h = null, n.length && C(() => s(n), !1), t && t();
}
function ue(e) {
	for (let t = 0; t < e.length; t++) S(e[t]);
}
function w(e, t) {
	let n = f && f.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === c ? i !== t && (!i.updatedAt || i.updatedAt < g) && S(i) : e === l && w(i, t);
		}
	}
}
function de(e) {
	let t = f && f.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = l : r.state = l, r.pure ? m.push(r) : h.push(r), r.observers && de(r));
	}
}
function T(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) T(e.tOwned[t]);
		delete e.tOwned;
	}
	if (f && f.running && e.pure) fe(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) T(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	f && f.running ? e.tState = 0 : e.state = 0;
}
function fe(e, t) {
	if (t || (e.tState = 0, f.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) fe(e.owned[t]);
}
function pe(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function me(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		E(e, n && n.owner || null);
	}
}
function E(e, t = d) {
	let n = o && t && t.context && t.context[o], r = pe(e);
	if (!n) throw r;
	h ? h.push({
		fn() {
			me(r, n, t);
		},
		state: c
	}) : me(r, n, t);
}
function D(e, t) {
	return y(() => e(t || {}));
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/web/dist/web.js
function he(e, t, n) {
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
var ge = "_$DX_DELEGATE";
function _e(e, t, n, r = {}) {
	let i;
	return ee((r) => {
		i = r, t === document ? e() : A(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function ve(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => y(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function ye(e, t = window.document) {
	let n = t[ge] || (t[ge] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, be));
	}
}
function O(e, t, n) {
	j(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function k(e, t, n) {
	if (!t) return n ? O(e, "style") : t;
	let r = e.style;
	if (typeof t == "string") return r.cssText = t;
	typeof n == "string" && (r.cssText = n = void 0), n ||= {}, t ||= {};
	let i, a;
	for (a in n) t[a] ?? r.removeProperty(a), delete n[a];
	for (a in t) i = t[a], i !== n[a] && (r.setProperty(a, i), n[a] = i);
	return n;
}
function A(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return M(e, t, r, n);
	v((r) => M(e, t(), r, n), r);
}
function j(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function be(t) {
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
	let a = j(e);
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
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = P(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = P(e, n, r);
	} else if (o === "function") return v(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = M(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (N(o, t, n, i)) return v(() => n = M(e, o, n, r, !0)), () => n;
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
			if (n = P(e, n, r), s) return n;
		} else c ? n.length === 0 ? xe(e, o, r) : he(e, n, o) : (n && P(e), xe(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = P(e, n, r, t);
			P(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function N(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (o != null && o !== !0 && o !== !1) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = N(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = N(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function xe(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function P(e, t, n, r) {
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
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function Se(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function Ce(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				Se(e);
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
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function we(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/audio/chorus-effect.ts
function Te(e) {
	let t = e.createGain(), n = e.createGain(), r = e.createGain(), i = e.createDelay(), a = e.createGain(), o = e.createOscillator(), s = e.createGain();
	t.connect(r), r.connect(n), t.connect(i), i.connect(a), a.connect(n), o.type = "sine", o.frequency.value = .25, i.delayTime.value = .015, s.gain.value = .005, o.connect(s), s.connect(i.delayTime), o.start();
	function c(e, t) {
		let n = e * .5;
		(t || a.gain.value !== n) && (a.gain.value = n, r.gain.value = 1 - n);
	}
	return c(0), {
		inputNode: t,
		outputNode: n,
		setLevel: c,
		cleanup() {
			o.stop(), o.disconnect(), s.disconnect(), i.disconnect(), a.disconnect(), r.disconnect(), t.disconnect(), n.disconnect();
		}
	};
}
//#endregion
//#region src/audio/reverbrator.ts
function Ee(e, t, n) {
	let { sampleRate: r } = e, i = t * r, a = e.createBuffer(t, i, r), o = a.getChannelData(0), s = a.getChannelData(1);
	for (let e = 0; e < i; e++) o[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n, s[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n;
	return a;
}
function De(e) {
	let t = Ee(e, 2, 2), n = e.createGain();
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
		cleanup() {
			r.disconnect(), i.disconnect(), a.disconnect(), n.disconnect(), o.disconnect();
		}
	};
}
//#endregion
//#region src/audio/effect-chain.ts
function Oe(e) {
	let t = () => e.currentTime, n = (t, n) => {
		t.setTargetAtTime(n, e.currentTime, .01);
	}, r = e.createGain(), i = e.createGain(), a = e.createGain(), o = e.createGain(), s = e.createDelay(1), c = e.createGain();
	return r.connect(a), r.connect(s), s.delayTime.setValueAtTime(.375, t()), s.connect(c), c.connect(s), s.connect(o), a.connect(i), o.connect(i), c.gain.setValueAtTime(0, t()), o.gain.setValueAtTime(0, t()), {
		inputNode: r,
		outputNode: i,
		setLevel(e) {
			n(o.gain, e * .5), n(c.gain, e * .65);
		},
		cleanup() {
			s.disconnect(), c.disconnect(), o.disconnect(), a.disconnect(), r.disconnect(), i.disconnect();
		}
	};
}
function ke(e) {
	let t = e.createGain(), n = e.createGain(), r = Te(e), i = Oe(e), a = De(e);
	return t.connect(r.inputNode), r.outputNode.connect(i.inputNode), i.outputNode.connect(a.inputNode), a.outputNode.connect(n), {
		inputNode: t,
		outputNode: n,
		updateParameters(e) {
			e.chorus !== void 0 && r.setLevel(e.chorus), e.delay !== void 0 && i.setLevel(e.delay), e.reverb !== void 0 && a.setLevel(e.reverb);
		},
		cleanup() {
			r.cleanup(), i.cleanup(), a.cleanup(), t.disconnect(), n.disconnect();
		}
	};
}
//#endregion
//#region src/constants.ts
var Ae = /* @__PURE__ */ function(e) {
	return e[e.PD = 0] = "PD", e[e.FM = 1] = "FM", e[e.PTM2 = 2] = "PTM2", e[e.PTM3 = 3] = "PTM3", e[e.PTM4 = 4] = "PTM4", e[e.PTM5 = 5] = "PTM5", e[e.PTM6 = 6] = "PTM6", e[e.PTM7 = 7] = "PTM7", e[e.PTM8 = 8] = "PTM8", e[e.PTM9 = 9] = "PTM9", e[e.PTM10 = 10] = "PTM10", e[e.PTM11 = 11] = "PTM11", e[e.NumWaveModes = 12] = "NumWaveModes", e;
}({}), je = {
	waveMode: Ae.FM,
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
function Me() {
	return { ...je };
}
//#endregion
//#region src/audio/worklet.ts?worker&url
var Ne = "" + new URL("assets/worklet-8M-ynVVK.js", import.meta.url).href, F = we("wafer-v01", import.meta.url), Pe = (e) => 440 * 2 ** ((e - 69) / 12), Fe = 4, Ie = .001, Le = .1, I = .005;
function Re() {
	let e = null, t = null, n, r = [], i = /* @__PURE__ */ new Map(), a = { ...je };
	function o(e, t, n, r, i) {
		let a = e.parameters.get(t);
		a && (i ? a.setTargetAtTime(n, r, I) : a.setValueAtTime(n, r));
	}
	function s(e, t, n, r) {
		Object.keys(t).forEach((i) => {
			i !== "chorus" && i !== "delay" && i !== "reverb" && i !== "master" && o(e.workletNode, i, t[i], n, r);
		});
	}
	function c(e) {
		e.idleTimerId !== void 0 && (window.clearTimeout(e.idleTimerId), e.idleTimerId = void 0);
	}
	function l(t, n) {
		if (!e) return;
		c(t);
		let r = n + Math.max(.01, a.release) * 10 + Le, i = Math.max(0, r - e.currentTime);
		t.idleTimerId = window.setTimeout(() => {
			t.state === "releasing" && (t.state = "idle", t.noteNumber = null), t.idleTimerId = void 0;
		}, i * 1e3);
	}
	function u() {
		if (!e || !t) throw Error("Audio context is not initialized");
		let n = new AudioWorkletNode(e, "synth-processor", {
			numberOfInputs: 0,
			numberOfOutputs: 1,
			outputChannelCount: [1]
		}), r = n.parameters.get("gate");
		if (!r) throw Error("synth-processor is missing the gate parameter");
		let i = e.currentTime;
		r.setValueAtTime(0, i), o(n, "frequency", 440, i, !1), n.connect(t);
		let c = {
			workletNode: n,
			gateParam: r,
			noteNumber: null,
			state: "idle",
			startedAt: 0,
			releasedAt: 0,
			idleTimerId: void 0
		};
		return s(c, a, i, !1), c;
	}
	function d() {
		return r.find((e) => e.state === "idle") || r.filter((e) => e.state === "releasing").sort((e, t) => e.releasedAt - t.releasedAt)[0] || r.filter((e) => e.state === "active").sort((e, t) => e.startedAt - t.startedAt)[0];
	}
	function f(t, n) {
		if (!e) return;
		let r = Math.max(n, e.currentTime);
		t.gateParam.setValueAtTime(0, r), t.state = "releasing", t.releasedAt = r, l(t, r), t.noteNumber !== null && i.get(t.noteNumber) === t && i.delete(t.noteNumber);
	}
	async function p() {
		if (e) return;
		e = F?.audioContext || new (window.AudioContext || window.webkitAudioContext)();
		let i = F?.audioOutputNode ?? e.destination;
		await e.audioWorklet.addModule(Ne), t = e.createGain(), t.gain.setValueAtTime(a.master, e.currentTime), n = ke(e), t.connect(n.inputNode), n.outputNode.connect(i), r = Array.from({ length: Fe }, () => u());
	}
	function m(t, n) {
		if (!e) return;
		let i = e.currentTime;
		r.forEach((e) => {
			e.state !== "idle" && o(e.workletNode, t, n, i, !0);
		});
	}
	function h(e, t) {
		(e === "chorus" || e === "delay" || e === "reverb") && n?.updateParameters({ [e]: t });
	}
	return {
		async init() {
			await p();
		},
		async resumeIfNeeded() {
			e && !(e instanceof OfflineAudioContext) && e.state === "suspended" && await e.resume();
		},
		setParameter(n, r) {
			a[n] = r;
			let i = e?.currentTime || 0;
			if (n === "master") {
				t && t.gain.setTargetAtTime(r, i, I);
				return;
			}
			m(n, r), h(n, r);
		},
		setAllParameters(i) {
			Object.assign(a, i);
			let o = e?.currentTime || 0;
			t && t.gain.setTargetAtTime(a.master, o, I), r.forEach((e) => {
				e.state !== "idle" && (s(e, a, o, !0), e.state === "releasing" && l(e, e.releasedAt));
			}), n?.updateParameters({
				chorus: a.chorus,
				delay: a.delay,
				reverb: a.reverb
			});
		},
		noteOn(n, l) {
			if (!e || !t || r.length === 0) {
				console.warn("SynthEngine is not initialized. Call init() before using the engine.");
				return;
			}
			this.resumeIfNeeded();
			let u = i.get(n);
			u && f(u, l ?? e.currentTime);
			let p = d();
			if (!p) return;
			c(p), p.noteNumber !== null && i.delete(p.noteNumber);
			let m = l && l > e.currentTime ? l : e.currentTime;
			(p.state === "active" || p === u) && (p.gateParam.setValueAtTime(0, m), m += Ie), o(p.workletNode, "frequency", Pe(n), m, !1), s(p, a, m, !1), p.gateParam.setValueAtTime(1, m), p.noteNumber = n, p.state = "active", p.startedAt = m, i.set(n, p);
		},
		noteOff(t, n) {
			let r = i.get(t);
			!r || !e || f(r, n && n > e.currentTime ? n : e.currentTime);
		},
		getNumActiveNotes() {
			return i.size;
		},
		cleanup() {
			i.clear(), r.forEach((e) => {
				c(e), e.workletNode.port.postMessage({ type: "stop" });
				try {
					e.workletNode.disconnect();
				} finally {
					e.workletNode.port.close();
				}
			}), r = [], n?.cleanup(), t?.disconnect();
		}
	};
}
var L = Re(), R = Symbol("store-raw"), z = Symbol("store-node"), B = Symbol("store-has"), ze = Symbol("store-self");
function Be(e) {
	let t = e[r];
	if (!t && (Object.defineProperty(e, r, { value: t = new Proxy(e, We) }), !Array.isArray(e))) {
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
	return typeof e == "object" && !!e && (e[r] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function H(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[R]) return n;
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
	let [r, i] = _(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function Ve(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === r || t === z ? n : (delete n.value, delete n.writable, n.get = () => e[r][t], n);
}
function He(e) {
	b() && W(U(e, z), ze)();
}
function Ue(e) {
	return He(e), Reflect.ownKeys(e);
}
var We = {
	get(e, t, n) {
		if (t === R) return e;
		if (t === r) return n;
		if (t === i) return He(e), n;
		let a = U(e, z), o = a[t], s = o ? o() : e[t];
		if (t === z || t === B || t === "__proto__") return s;
		if (!o) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			b() && (typeof s != "function" || Object.prototype.hasOwnProperty.call(e, t)) && !(n && n.get) && (s = W(a, t, s)());
		}
		return V(s) ? Be(s) : s;
	},
	has(e, t) {
		return t === R || t === r || t === i || t === z || t === B || t === "__proto__" || (b() && W(U(e, B), t)(), t in e);
	},
	set() {
		return !0;
	},
	deleteProperty() {
		return !0;
	},
	ownKeys: Ue,
	getOwnPropertyDescriptor: Ve
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
	(s = o[ze]) && s.$();
}
function Ge(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Ke(i) || G(e, i, t[i]);
	}
}
function Ke(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function qe(e, t) {
	if (typeof t == "function" && (t = t(e)), t = H(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && G(e, n, r);
		}
		G(e, "length", r);
	} else Ge(e, t);
}
function K(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Ke(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) K(e, [r[i]].concat(t), n);
			return;
		}
		if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && K(e, [i].concat(t), n);
			return;
		}
		if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) K(e, [r].concat(t), n);
			return;
		}
		if (t.length > 1) {
			K(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || (r !== void 0 || a != null) && (a = H(a), r === void 0 || V(i) && V(a) && !Array.isArray(a) ? Ge(i, a) : G(e, r, a));
}
function Je(...[e, t]) {
	let n = H(e || {}), r = Array.isArray(n), i = Be(n);
	function a(...e) {
		te(() => {
			r && e.length === 1 ? qe(n, e[0]) : K(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/store.ts
var [q, J] = Je({
	synthParams: Me(),
	numActiveNotes: 0
});
//#endregion
//#region src/actions.ts
L.init();
var Y = {
	noteOn(e, t = 0) {
		L.noteOn(e, t), J("numActiveNotes", L.getNumActiveNotes());
	},
	noteOff(e, t = 0) {
		L.noteOff(e, t), J("numActiveNotes", L.getNumActiveNotes());
	},
	setSynthParam(e, t) {
		J("synthParams", e, t), L.setParameter(e, t);
	},
	loadStates(e) {
		J("synthParams", e.synthParams), L.setAllParameters(e.synthParams);
	}
};
//#endregion
//#region src/persistence.ts
function X(e) {
	return Math.max(0, Math.min(255, Math.round(e * 255)));
}
function Z(e) {
	return Math.max(0, Math.min(1, e / 255));
}
var Ye = {
	serializeParameters(e) {
		let t = e;
		return [
			t.waveMode,
			X(t.shape),
			X(t.envMod),
			X(t.detune),
			X(t.sub),
			X(t.decay),
			X(t.release),
			X(t.drift),
			X(t.loFi),
			X(t.chorus),
			X(t.delay),
			X(t.reverb),
			X(t.master)
		];
	},
	deserializeParameters(e) {
		return {
			waveMode: e[0],
			shape: Z(e[1]),
			envMod: Z(e[2]),
			detune: Z(e[3]),
			sub: Z(e[4]),
			decay: Z(e[5]),
			release: Z(e[6]),
			drift: Z(e[7]),
			loFi: Z(e[8]),
			chorus: Z(e[9]),
			delay: Z(e[10]),
			reverb: Z(e[11]),
			master: Z(e[12])
		};
	}
}, Q = 1, Xe = 14, Ze = {
	emitStateBytes() {
		let { synthParams: e } = q, t = Ye.serializeParameters(e);
		return new Uint8Array([Q, ...t]);
	},
	applyStateBytes(e) {
		if (e.length === Xe && e[0] === Q) {
			let t = Ye.deserializeParameters([...e.slice(1)]);
			Y.loadStates({ synthParams: t });
		}
	}
};
//#endregion
//#region src/utils/midi-keyboard-input.ts
function Qe(e, t) {
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
async function $e() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function et(e) {
	let t, n = !1;
	return (async () => {
		let r = await $e();
		n || r && (t = Qe(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region src/drivers.ts
function tt() {
	F ? F.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "synthesizer",
			viewSize: [660, 380],
			preferJustSize: !0
		},
		noteInput: {
			noteOn: Y.noteOn,
			noteOff: Y.noteOff
		},
		persistence: Ze,
		cleanup: L.cleanup
	}) : ne(et({
		async noteOn(e) {
			await L.resumeIfNeeded(), Y.noteOn(e);
		},
		noteOff(e) {
			Y.noteOff(e);
		}
	}));
}
//#endregion
//#region src/app.tsx
var nt = /*#__PURE__*/ ve("<div style=\"display:flex;align-items:center;justify-content:space-between;margin:8px 0;gap:16px\"><span style=width:84px;font-size:14px;font-weight:bold></span><input type=range min=0 class=accent-violet-400 style=flex:1;cursor:pointer><span style=width:24px;text-align:right;font-size:12px;color:#888>"), rt = /*#__PURE__*/ ve("<div class=\"w-[660px] h-[380px] flex-c bg-mist-700\"><div class=\"flex-h gap-4\"><div class=\"flex-v gap-4\"><div><h3>OSCILLATOR</h3></div><div><h3>AMP ENVELOPE</h3></div></div><div class=\"flex-v gap-4\"><div class=\"flex-v gap-4\"><div><h3>EFFECTS</h3></div></div><div><h3>CONTROL</h3></div><div class=\"w-full flex-ha mt-[-4px] text-xs font-bold justify-between\"><div>proto-engine-pd-fm</div><div>active notes: ");
function $(e) {
	let t = e.paramKey === "waveMode", n = t ? Ae.NumWaveModes - 1 : 1, r = t ? 1 : .01;
	return (() => {
		var i = nt(), a = i.firstChild, o = a.nextSibling, s = o.nextSibling;
		return A(a, () => e.label), o.$$input = (t) => Y.setSynthParam(e.paramKey, parseFloat(t.currentTarget.value)), O(o, "max", n), O(o, "step", r), A(s, () => t ? `M${q.synthParams[e.paramKey]}` : q.synthParams[e.paramKey].toFixed(2)), v(() => o.value = q.synthParams[e.paramKey]), i;
	})();
}
var it = () => {
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
		var t = rt(), n = t.firstChild.firstChild, r = n.firstChild, i = r.firstChild, a = r.nextSibling, o = a.firstChild, s = n.nextSibling.firstChild, c = s.firstChild, l = c.firstChild, u = s.nextSibling, d = u.firstChild, f = u.nextSibling.firstChild.nextSibling;
		return f.firstChild, A(r, D($, {
			paramKey: "waveMode",
			label: "Wave Mode"
		}), null), A(r, D($, {
			paramKey: "shape",
			label: "Shape/Mod"
		}), null), A(r, D($, {
			paramKey: "envMod",
			label: "Env Mod"
		}), null), A(r, D($, {
			paramKey: "detune",
			label: "Detune"
		}), null), A(r, D($, {
			paramKey: "sub",
			label: "Sub OSC"
		}), null), A(a, D($, {
			paramKey: "decay",
			label: "Decay"
		}), null), A(a, D($, {
			paramKey: "release",
			label: "Release"
		}), null), A(c, D($, {
			paramKey: "chorus",
			label: "Chorus"
		}), null), A(c, D($, {
			paramKey: "delay",
			label: "Delay"
		}), null), A(c, D($, {
			paramKey: "reverb",
			label: "Reverb"
		}), null), A(u, D($, {
			paramKey: "master",
			label: "Master Vol"
		}), null), A(u, D($, {
			paramKey: "drift",
			label: "Drift"
		}), null), A(u, D($, {
			paramKey: "loFi",
			label: "Lo-Fi"
		}), null), A(f, () => q.numActiveNotes, null), v((n) => {
			var s = e.panelBox, f = e.sectionBox, p = e.sectionHeader, m = e.sectionBox, h = e.sectionHeader, g = e.sectionBox, ee = e.sectionHeader, _ = e.sectionBox, v = e.sectionHeader;
			return n.e = k(t, s, n.e), n.t = k(r, f, n.t), n.a = k(i, p, n.a), n.o = k(a, m, n.o), n.i = k(o, h, n.i), n.n = k(c, g, n.n), n.s = k(l, ee, n.s), n.h = k(u, _, n.h), n.r = k(d, v, n.r), n;
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
function at() {
	return tt(), D(it, {});
}
ye([
	"input",
	"mousedown",
	"mouseup"
]);
var ot = Ce((e) => _e(() => D(at, {}), e), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-violet-400:oklch(70.2% .183 293.541);--color-mist-700:oklch(37.8% .015 216);--spacing:.25rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--font-weight-bold:700;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.fixed{position:fixed}.static{position:static}.mt-\\[-4px\\]{margin-top:-4px}.flex{display:flex}.h-\\[380px\\]{height:380px}.w-\\[660px\\]{width:660px}.w-full{width:100%}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.justify-between{justify-content:space-between}.gap-4{gap:calc(var(--spacing) * 4)}.border{border-style:var(--tw-border-style);border-width:1px}.bg-mist-700{background-color:var(--color-mist-700)}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.accent-violet-400{accent-color:var(--color-violet-400)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}}:host{-webkit-user-select:none;user-select:none;font-family:Oxanium,sans-serif}body{min-height:100dvh}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}", ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}"],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Oxanium:wght@400..700&display=swap"]
});
//#endregion
export { ot as default };
