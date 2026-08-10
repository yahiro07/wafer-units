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
var n = (e, t) => e === t, r = Symbol("solid-proxy"), i = Symbol("solid-track"), a = { equals: n }, o = null, s = pe, c = 1, l = 2, u = {
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
	}, s = i ? e : () => e(() => y(() => C(o)));
	d = o, p = null;
	try {
		return x(s, !0);
	} finally {
		p = n, d = r;
	}
}
function te(e, t) {
	t = t ? Object.assign({}, a, t) : a;
	let n = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [se.bind(n), (e) => (typeof e == "function" && (e = f && f.running && f.sources.has(n) ? e(n.tValue) : e(n.value)), ce(n, e))];
}
function _(e, t, n) {
	b(ue(e, t, !1, c));
}
function v(e, t, n) {
	n = n ? Object.assign({}, a, n) : a;
	let r = ue(e, t, !0, 0);
	return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, b(r), se.bind(r);
}
function ne(e) {
	return x(e, !1);
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
function re(e) {
	return d === null || (d.cleanups === null ? d.cleanups = [e] : d.cleanups.push(e)), e;
}
function ie() {
	return p;
}
var [ae, oe] = /*@__PURE__*/ te(!1);
function se() {
	let e = f && f.running;
	if (this.sources && (e ? this.tState : this.state)) if ((e ? this.tState : this.state) === c) b(this);
	else {
		let e = m;
		m = null, x(() => S(this), !1), m = e;
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
function ce(e, t, n) {
	let r = f && f.running && f.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (f) {
			let r = f.running;
			(r || !n && f.sources.has(e)) && (f.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && x(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = f && f.running;
				r && f.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? m.push(n) : h.push(n), n.observers && me(n)), r ? n.tState = c : n.state = c);
			}
			if (m.length > 1e6) throw m = [], Error();
		}, !1);
	}
	return t;
}
function b(e) {
	if (!e.fn) return;
	C(e);
	let t = g;
	le(e, f && f.running && f.sources.has(e) ? e.tValue : e.value, t), f && !f.running && f.sources.has(e) && queueMicrotask(() => {
		x(() => {
			f && (f.running = !0), p = d = e, le(e, e.tValue, t), p = d = null;
		}, !1);
	});
}
function le(e, t, n) {
	let r, i = d, a = p;
	p = d = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (f && f.running ? (e.tState = c, e.tOwned && e.tOwned.forEach(C), e.tOwned = void 0) : (e.state = c, e.owned && e.owned.forEach(C), e.owned = null)), e.updatedAt = n + 1, ve(t);
	} finally {
		p = a, d = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? ce(e, r, !0) : f && f.running && e.pure ? (f.sources.has(e) || (e.value = r), f.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function ue(e, t, n, r = c, i) {
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
function de(e) {
	let t = f && f.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === l) return S(e);
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
		if ((t ? e.tState : e.state) === c) b(e);
		else if ((t ? e.tState : e.state) === l) {
			let t = m;
			m = null, x(() => S(e, n[0]), !1), m = t;
		}
	}
}
function x(e, t) {
	if (m) return e();
	let n = !1;
	t || (m = []), h ? n = !0 : h = [], g++;
	try {
		let t = e();
		return fe(n), t;
	} catch (e) {
		n || (h = null), m = null, ve(e);
	}
}
function fe(e) {
	if (m &&= (pe(m), null), e) return;
	let t;
	if (f) {
		if (!f.promises.size && !f.queue.size) {
			let e = f.sources, n = f.disposed;
			h.push.apply(h, f.effects), t = f.resolve;
			for (let e of h) "tState" in e && (e.state = e.tState), delete e.tState;
			f = null, x(() => {
				for (let e of n) C(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) C(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				oe(!1);
			}, !1);
		} else if (f.running) {
			f.running = !1, f.effects.push.apply(f.effects, h), h = null, oe(!0);
			return;
		}
	}
	let n = h;
	h = null, n.length && x(() => s(n), !1), t && t();
}
function pe(e) {
	for (let t = 0; t < e.length; t++) de(e[t]);
}
function S(e, t) {
	let n = f && f.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === c ? i !== t && (!i.updatedAt || i.updatedAt < g) && de(i) : e === l && S(i, t);
		}
	}
}
function me(e) {
	let t = f && f.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = l : r.state = l, r.pure ? m.push(r) : h.push(r), r.observers && me(r));
	}
}
function C(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) C(e.tOwned[t]);
		delete e.tOwned;
	}
	if (f && f.running && e.pure) he(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) C(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	f && f.running ? e.tState = 0 : e.state = 0;
}
function he(e, t) {
	if (t || (e.tState = 0, f.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) he(e.owned[t]);
}
function ge(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function _e(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		ve(e, n && n.owner || null);
	}
}
function ve(e, t = d) {
	let n = o && t && t.context && t.context[o], r = ge(e);
	if (!n) throw r;
	h ? h.push({
		fn() {
			_e(r, n, t);
		},
		state: c
	}) : _e(r, n, t);
}
function w(e, t) {
	return y(() => e(t || {}));
}
var ye = (e) => `Stale read from <${e}>.`;
function be(e) {
	let t = e.keyed, n = v(() => e.when, void 0, void 0), r = t ? n : v(n, void 0, { equals: (e, t) => !e == !t });
	return v(() => {
		let i = r();
		if (i) {
			let a = e.children;
			return typeof a == "function" && a.length > 0 ? y(() => a(t ? i : () => {
				if (!y(r)) throw ye("Show");
				return n();
			})) : a;
		}
		return e.fallback;
	}, void 0, void 0);
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/web/dist/web.js
var xe = (e) => v(() => e());
function Se(e, t, n) {
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
var Ce = "_$DX_DELEGATE";
function we(e, t, n, r = {}) {
	let i;
	return ee((r) => {
		i = r, t === document ? e() : D(t, e(), t.firstChild ? null : void 0, n);
	}, r.owner), () => {
		i(), t.textContent = "";
	};
}
function T(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => y(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function Te(e, t = window.document) {
	let n = t[Ce] || (t[Ce] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, ke));
	}
}
function E(e, t, n) {
	Oe(e) || (n == null ? e.removeAttribute(t) : e.setAttribute(t, n));
}
function Ee(e, t) {
	Oe(e) || (t == null ? e.removeAttribute("class") : e.className = t);
}
function De(e, t, n, r) {
	if (r) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
	else if (Array.isArray(n)) {
		let r = n[0];
		e.addEventListener(t, n[0] = (t) => r.call(e, n[1], t));
	} else e.addEventListener(t, n, typeof n != "function" && n);
}
function D(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return O(e, t, r, n);
	_((r) => O(e, t(), r, n), r);
}
function Oe(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function ke(t) {
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
function O(e, t, n, r, i) {
	let a = Oe(e);
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
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = k(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = k(e, n, r);
	} else if (o === "function") return _(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = O(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (Ae(o, t, n, i)) return _(() => n = O(e, o, n, r, !0)), () => n;
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
			if (n = k(e, n, r), s) return n;
		} else c ? n.length === 0 ? je(e, o, r) : Se(e, n, o) : (n && k(e), je(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = k(e, n, r, t);
			k(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function Ae(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (o != null && o !== !0 && o !== !1) if ((c = typeof o) == "object" && o.nodeType) e.push(o);
		else if (Array.isArray(o)) i = Ae(e, o, s) || i;
		else if (c === "function") if (r) {
			for (; typeof o == "function";) o = o();
			i = Ae(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
		} else e.push(o), i = !0;
		else {
			let t = String(o);
			s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
		}
	}
	return i;
}
function je(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function k(e, t, n, r) {
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
//#region ../../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.14/node_modules/mofus/dist/ax-ui/utility-classes.css?inline
var Me = ".flex-h{display:flex}.flex-hs{align-items:start;display:flex}.flex-ha{align-items:center;display:flex}.flex-v{flex-direction:column;display:flex}.flex-vl{flex-direction:column;align-items:flex-start;display:flex}.flex-va{flex-direction:column;align-items:center;display:flex}.flex-c{justify-content:center;align-items:center;display:flex}.flex-vc{flex-direction:column;justify-content:center;align-items:center;display:flex}.absolute-full{position:absolute;inset:0}.bd-red{border:1px solid red}.bd-blue{border:1px solid #00f}";
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-helper/index.js
function Ne(e) {
	if (!Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"]")).some((t) => t.href === e)) {
		console.log(`Inserting link tag for ${e}`);
		let t = document.createElement("link");
		t.rel = "stylesheet", t.href = e, document.head.appendChild(t);
	}
}
function Pe(e, t) {
	return class extends HTMLElement {
		isMounted;
		disposeRender = null;
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this.isMounted = !1, t.stylesheetUrls && t.stylesheetUrls.forEach((e) => {
				Ne(e);
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
//#region ../../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.14/node_modules/mofus/dist/mx-audio/index.js
function Fe(e, t) {
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
async function Ie() {
	let e = await navigator.requestMIDIAccess();
	if (e) return console.log("midi inputs", Array.from(e.inputs.values()).length), Array.from(e.inputs.values())[0];
}
function Le(e) {
	let t, n = !1;
	return (async () => {
		let r = await Ie();
		n || r && (t = Fe(r, e), t.open());
	})(), () => {
		t?.close(), n = !0;
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/solid-js@1.9.14/node_modules/solid-js/store/dist/store.js
var Re = Symbol("store-raw"), A = Symbol("store-node"), j = Symbol("store-has"), ze = Symbol("store-self");
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
function M(e) {
	let t;
	return typeof e == "object" && !!e && (e[r] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function N(e, t = /* @__PURE__ */ new Set()) {
	let n, r, i, a;
	if (n = e != null && e[Re]) return n;
	if (!M(e) || t.has(e)) return e;
	if (Array.isArray(e)) {
		Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
		for (let n = 0, a = e.length; n < a; n++) i = e[n], (r = N(i, t)) !== i && (e[n] = r);
	} else {
		Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
		let n = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
		for (let s = 0, c = n.length; s < c; s++) a = n[s], !o[a].get && (i = e[a], (r = N(i, t)) !== i && (e[a] = r));
	}
	return e;
}
function P(e, t) {
	let n = e[t];
	return n || Object.defineProperty(e, t, { value: n = Object.create(null) }), n;
}
function F(e, t, n) {
	if (e[t]) return e[t];
	let [r, i] = te(n, {
		equals: !1,
		internal: !0
	});
	return r.$ = i, e[t] = r;
}
function Ve(e, t) {
	let n = Reflect.getOwnPropertyDescriptor(e, t);
	return !n || n.get || !n.configurable || t === r || t === A ? n : (delete n.value, delete n.writable, n.get = () => e[r][t], n);
}
function He(e) {
	ie() && F(P(e, A), ze)();
}
function Ue(e) {
	return He(e), Reflect.ownKeys(e);
}
var We = {
	get(e, t, n) {
		if (t === Re) return e;
		if (t === r) return n;
		if (t === i) return He(e), n;
		let a = P(e, A), o = a[t], s = o ? o() : e[t];
		if (t === A || t === j || t === "__proto__") return s;
		if (!o) {
			let n = Object.getOwnPropertyDescriptor(e, t);
			ie() && (typeof s != "function" || Object.prototype.hasOwnProperty.call(e, t)) && !(n && n.get) && (s = F(a, t, s)());
		}
		return M(s) ? Be(s) : s;
	},
	has(e, t) {
		return t === Re || t === r || t === i || t === A || t === j || t === "__proto__" || (ie() && F(P(e, j), t)(), t in e);
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
function I(e, t, n, r = !1) {
	if (t === "__proto__" || !r && e[t] === n) return;
	let i = e[t], a = e.length;
	n === void 0 ? (delete e[t], e[j] && e[j][t] && i !== void 0 && e[j][t].$()) : (e[t] = n, e[j] && e[j][t] && i === void 0 && e[j][t].$());
	let o = P(e, A), s;
	if ((s = F(o, t, i)) && s.$(() => n), Array.isArray(e) && e.length !== a) {
		for (let t = e.length; t < a; t++) (s = o[t]) && s.$();
		(s = F(o, "length", a)) && s.$(e.length);
	}
	(s = o[ze]) && s.$();
}
function Ge(e, t) {
	let n = Object.keys(t);
	for (let r = 0; r < n.length; r += 1) {
		let i = n[r];
		Ke(i) || I(e, i, t[i]);
	}
}
function Ke(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function qe(e, t) {
	if (typeof t == "function" && (t = t(e)), t = N(t), Array.isArray(t)) {
		if (e === t) return;
		let n = 0, r = t.length;
		for (; n < r; n++) {
			let r = t[n];
			e[n] !== r && I(e, n, r);
		}
		I(e, "length", r);
	} else Ge(e, t);
}
function L(e, t, n = []) {
	let r, i = e;
	if (t.length > 1) {
		r = t.shift();
		let a = typeof r, o = Array.isArray(e);
		if (a === "string" && (r === "__proto__" || t.length > 1 && Ke(r))) return;
		if (Array.isArray(r)) {
			for (let i = 0; i < r.length; i++) L(e, [r[i]].concat(t), n);
			return;
		}
		if (o && a === "function") {
			for (let i = 0; i < e.length; i++) r(e[i], i) && L(e, [i].concat(t), n);
			return;
		}
		if (o && a === "object") {
			let { from: i = 0, to: a = e.length - 1, by: o = 1 } = r;
			for (let r = i; r <= a; r += o) L(e, [r].concat(t), n);
			return;
		}
		if (t.length > 1) {
			L(e[r], t, [r].concat(n));
			return;
		}
		i = e[r], n = [r].concat(n);
	}
	let a = t[0];
	typeof a == "function" && (a = a(i, n), a === i) || (r !== void 0 || a != null) && (a = N(a), r === void 0 || M(i) && M(a) && !Array.isArray(a) ? Ge(i, a) : I(e, r, a));
}
function Je(...[e, t]) {
	let n = N(e || {}), r = Array.isArray(n), i = Be(n);
	function a(...e) {
		ne(() => {
			r && e.length === 1 ? qe(n, e[0]) : L(n, e);
		});
	}
	return [i, a];
}
//#endregion
//#region src/definitions/parameters.ts
var R = /* @__PURE__ */ function(e) {
	return e[e.sawToRect = 0] = "sawToRect", e[e.rectPw = 1] = "rectPw", e[e.pdSaw = 2] = "pdSaw", e[e.sawSpeed = 3] = "sawSpeed", e[e.sawAccel = 4] = "sawAccel", e[e.sawSfm = 5] = "sawSfm", e[e.sawDrill = 6] = "sawDrill", e[e.sawSdm = 7] = "sawSdm", e[e.sawCreep = 8] = "sawCreep", e[e.sawCreep2 = 9] = "sawCreep2", e[e.sawSquash = 10] = "sawSquash", e[e.sawSinus = 11] = "sawSinus", e[e.sawRidge = 12] = "sawRidge", e[e.sawScrew = 13] = "sawScrew", e[e.count = 14] = "count", e;
}({}), Ye = {
	oscWave: {
		min: 0,
		max: 13
	},
	oscOctave: {
		min: -2,
		max: 2
	},
	foldingShaperWave: {
		min: 0,
		max: 4
	}
};
function Xe() {
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
		hpfOn: !0,
		hpfCutoff: 0,
		hpfPeak: 0,
		filterOn: !0,
		filterCutoff: 1,
		filterPeak: 0,
		foldingShaperOn: !0,
		foldingShaperWave: 0,
		foldingShaperLevel: 0,
		densityShaperLevel: 0,
		masterVolume: .8
	};
}
//#endregion
//#region src/store.ts
var [z, B] = Je({
	synthParams: Xe(),
	notes: []
});
//#endregion
//#region ../../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.14/node_modules/mofus/dist/number-utils-Dgvlroy3.js
function V(e, t, n) {
	return e < t ? t : e > n ? n : e;
}
function Ze(e, t) {
	return Math.max(e, t);
}
function Qe(e, t) {
	return Math.min(e, t);
}
function H(e, t, n) {
	return t + (n - t) * e;
}
function $e(e, t, n, r) {
	if (n === t) return t;
	let i = (e - t) / (n - t);
	return r ? V(i, 0, 1) : i;
}
function et(e, t, n, r, i, a) {
	if (n === t) return r;
	let o = (e - t) / (n - t) * (i - r) + r;
	return a ? V(o, Math.min(r, i), Math.max(r, i)) : o;
}
function U(e, t, n) {
	return (1 - n) * e + n * t;
}
//#endregion
//#region ../../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.14/node_modules/mofus/dist/mo-synthesis/index.js
function tt(e, t) {
	let n = e.length, r = t >> 0, i = (r + 1) % n, a = t - r;
	return U(e[r], e[i], a);
}
function nt(e) {
	let t = e.length, n = 0;
	for (let r = 0; r < t; r++) n += e[r];
	let r = n / t;
	for (let n = 0; n < t; n++) e[n] -= r;
	return e;
}
function W(e) {
	return e * e;
}
function rt(e) {
	return 1 - (1 - e) * (1 - e);
}
function it(e, t) {
	return (e - t * e) / (t - 2 * t * Math.abs(e) + 1);
}
function at(e) {
	return e - Math.floor(e);
}
function ot(e) {
	return 440 * 2 ** ((e - 69) / 12);
}
//#endregion
//#region ../../../node_modules/.pnpm/wafer-host@0.1.5_react-dom@19.2.8_react@19.2.8__react@19.2.8/node_modules/wafer-host/dist/unit-types/index.js
function st(e, t) {
	return window?.queryUnitInterfaceForModule?.(e, t);
}
//#endregion
//#region src/synthesis/chrous-effect-ex.ts
function ct(e) {
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
			for (let e of o) e.stop(), e.disconnect();
			a.disconnect(), r.disconnect(), t.disconnect();
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/mofus@0.1.0_solid-js@1.9.14/node_modules/mofus/dist/array-utils-BJJNqsK6.js
function lt(e) {
	return Array(e).fill(0).map((e, t) => t);
}
//#endregion
//#region src/synthesis/effect-wrapper.ts
function G(e, t, n) {
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
function K(e, t) {
	let n = "", r = lt(2).map(() => new Float32Array(e));
	return { update(e, i) {
		let a = `${e}_${i}`;
		return a !== n && ([r[0], r[1]] = [r[1], r[0]], t(r[0], e, i), n = a), r[0];
	} };
}
//#endregion
//#region src/synthesis/density-shaper.ts
function ut(e, t, n) {
	let r = e.length, i = H(n, 0, -.9);
	for (let t = 0; t < r; t++) {
		let n = it(t / (r - 1) * 2 - 1, i) * 1;
		e[t] = n;
	}
}
var dt = K(1024, ut);
function ft(e) {
	let t = e.createWaveShaper();
	t.oversample = "2x";
	let n = G(e, t);
	return {
		inputNode: n.inputNode,
		outputNode: n.outputNode,
		setupNodes: n.setupNodes,
		cleanupNodes: n.cleanupNodes,
		updateNodeParameters(e) {
			n.setEnabled(e.enabled);
			let r = dt.update(-1, e.level);
			t.curve !== r && (t.curve = r);
		}
	};
}
//#endregion
//#region src/synthesis/envelope-generator-adsr.ts
function pt(e, t, n) {
	let r = e.createGain(), i = {
		attack: W(t.attack) * n.attackMaxSec,
		decay: W(t.decay) * n.decayMaxSec,
		release: W(t.release) * n.releaseMaxSec
	}, { gain: a } = r;
	return {
		node: r,
		getReleaseTime() {
			return i.release;
		},
		triggerAttack(n) {
			let o = n && n > e.currentTime ? n : e.currentTime;
			a.cancelScheduledValues(o), a.setValueAtTime(r.gain.value, o), a.setValueAtTime(.001, o), a.exponentialRampToValueAtTime(1, o + i.attack), a.exponentialRampToValueAtTime(Ze(t.sustain, .001), o + i.attack + i.decay);
		},
		triggerRelease(t) {
			let n = t && t > e.currentTime ? t : e.currentTime;
			a.cancelScheduledValues(n), a.setValueAtTime(r.gain.value, n), a.exponentialRampToValueAtTime(.001, n + i.release), a.setValueAtTime(0, n + i.release);
		}
	};
}
//#endregion
//#region src/synthesis/filters.ts
function mt(e, t) {
	let n = e.createBiquadFilter();
	n.type = "highpass";
	let r = G(e, n);
	return {
		inputNode: r.inputNode,
		outputNode: r.outputNode,
		setupNodes: r.setupNodes,
		cleanupNodes: r.cleanupNodes,
		updateNodeParameters(e) {
			r.setEnabled(e.enabled);
			let i = t - 12, a = t + 48, o = ot(V(H(e.cutoff, i, a), 0, 127));
			n.frequency.value !== o && (n.frequency.value = o);
			let s = H(W(e.peak), 0, 36);
			n.Q.value !== s && (n.Q.value = s);
		}
	};
}
function ht(e, t) {
	let n = e.createBiquadFilter();
	n.type = "lowpass";
	let r = G(e, n);
	return {
		inputNode: r.inputNode,
		outputNode: r.outputNode,
		setupNodes: r.setupNodes,
		cleanupNodes: r.cleanupNodes,
		updateNodeParameters(e) {
			r.setEnabled(e.enabled);
			let i = t - 24, a = ot(V(H(e.cutoff, i, 127), 0, 127));
			n.frequency.value !== a && (n.frequency.value = a);
			let o = H(W(e.peak), 0, 36);
			n.Q.value !== o && (n.Q.value = o);
		}
	};
}
//#endregion
//#region src/synthesis/folding-shaper.ts
function q(e) {
	return (t, ...n) => Math.sign(t) * e(Math.abs(t), ...n);
}
var gt = {
	foldSine(e) {
		return Math.sin(e * Math.PI * .5);
	},
	foldSineHalf: q((e) => {
		let t = Math.sign(e), n = Math.abs(e), r = 0;
		return r = n < 1 ? Math.sin(n * Math.PI / 2) : 1 - (1 - Math.sin(n * Math.PI / 2) ** 2), t * r;
	}),
	foldTriangle(e) {
		let t = ((e + 1) % 4 + 4) % 4;
		return t < 2 ? t - 1 : 3 - t;
	},
	foldTriangleHalf: q((e) => Math.abs((e + 1) % 2 - 1)),
	foldSaw: q((e) => {
		let t = e - Math.floor(e);
		return (e >> 0 & 1) == 1 && --t, t;
	}),
	foldSawHalf(e) {
		let t = Math.sign(e), n = Math.abs(e);
		return n %= 1, t * n;
	},
	foldPolyHalf: q((e) => e < 1 ? e : e < 2 ? 1 : e / 2 & 1 ? 0 : 1)
}, _t = {
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
function vt(e, t, n) {
	let r = e.length, i = _t[t], a = gt[i.shaperCoreKey];
	for (let t = 0; t < r; t++) {
		let o = a((t / (r - 1) * 2 - 1) * (1 + W(n) * i.maxGain));
		e[t] = o;
	}
}
var yt = K(1024, vt);
function bt(e) {
	let t = e.createWaveShaper();
	t.oversample = "4x";
	let n = G(e, t);
	return {
		inputNode: n.inputNode,
		outputNode: n.outputNode,
		setupNodes: n.setupNodes,
		cleanupNodes: n.cleanupNodes,
		updateNodeParameters(e) {
			n.setEnabled(e.enabled);
			let r = yt.update(e.wave, e.level);
			t.curve !== r && (t.curve = r);
		}
	};
}
//#endregion
//#region src/synthesis/pd-saw.ts
function xt(e, t) {
	let n = .5, r = n * (1 - t * .95), i = e + r / 2;
	i -= Math.floor(i);
	let a = 0;
	return a = i < r ? i / r * n : n + (i - r) / (1 - r) * .5, -Math.cos(a * Math.PI * 2);
}
//#endregion
//#region src/synthesis/phase-tweakers.ts
var St = Math.PI * 2, Ct = Math.PI / 2, wt = Math.PI, Tt = {
	sfm(e, t) {
		let n = H(t, 1, 4), r = t * 2;
		return [at(e + Math.sin(e * St * n) * r), 1 + St * r * n];
	},
	speed(e, t) {
		let n = 1 + t * 7;
		return [e * n % 1, n];
	},
	accel(e, t) {
		let n = 1 + W(e) * t * 15;
		return [e * n % 1, n];
	},
	drill(e, t) {
		let n = H(t, .25, 1), r = e, i = r * (1 + W(n) * 15), a = i % 1 < .5 ? 0 : 1;
		return i < 2 && (a = 1), [r * a, 1];
	},
	pw(e, t) {
		let n = H(t, .5, .05);
		return [e < n ? e / n * .5 : .5 + (e - n) / (1 - n) * .5, 1];
	},
	"sub-pw"(e, t) {
		let n = H(t, .5, .05), r = 0;
		return r = e < n ? e / n : et(e, n, 1, 0, 1), [r, 1];
	},
	sdm(e, t) {
		let n = H(t, 1, 100), r = e * n, i = Math.floor(r), a = i + 1, o = r - i, s = e;
		return [U(s, U(s, U(i === 0 ? 0 : Et[i], Et[a], o), t), t), n];
	},
	creep(e, t) {
		let n = 1 + t * 31, r = H(t, 1, 0), i = -Math.cos(rt(e) * wt * n) * .5 + .5, a = H(e, 1, r), o = H(rt(t), 1, 1.07);
		return [V(i * a * o, 0, 1), n];
	},
	creep2(e, t) {
		let n = 1 + W(t) * 31;
		return [(-Math.cos(e * wt * n) * .5 + .5) * Math.sin(e * Math.PI * .5), n];
	},
	squash(e, t) {
		return [at(e + W(t) * 4 * Math.tanh(3 * (2 * e - 1))) * 1, 1 + t * 4];
	},
	sinus(e, t) {
		return [-Math.cos(e * wt * (1 + t * 15)) * .5 + .5, Ct * (1 + t * 15)];
	},
	ridge(e, t) {
		let n = 1 + t * 15;
		return [Math.abs(Math.sin(e * Ct * n)), n];
	},
	screw(e, t) {
		let n = 1 + t * 7;
		return [e * n % 1 * e, n];
	}
}, Et = lt(200).map(() => Math.random()), Dt = {
	[R.sawSfm]: "sfm",
	[R.sawSpeed]: "speed",
	[R.sawAccel]: "accel",
	[R.sawDrill]: "drill",
	[R.sawSdm]: "sdm",
	[R.sawCreep]: "creep",
	[R.sawCreep2]: "creep2",
	[R.sawSquash]: "squash",
	[R.sawSinus]: "sinus",
	[R.sawRidge]: "ridge",
	[R.sawScrew]: "screw"
};
function Ot(e, t) {
	if (e === 0) {
		let e = -t * .9;
		return (t) => it(1 - t * 2, e);
	}
	if (e === 1) {
		let e = .5 - t * .4;
		return (t) => t < e ? 1 : -1;
	}
	if (e === 2) return (e) => xt(e, t);
	{
		function n(e) {
			return (n) => {
				let [r] = Tt[e](n, t);
				return r -= Math.floor(r), 1 - r * 2;
			};
		}
		let r = Dt[e];
		return r ? n(r) : (e) => Math.sin(e * Math.PI * 2);
	}
}
function kt(e, t, n) {
	let r = e.length, i = Ot(t, n);
	for (let t = 0; t < r; t++) {
		let n = i(t / r);
		e[t] = n;
	}
	return e;
}
function At(e, t, n) {
	return kt(e, t, n), nt(e), e;
}
//#endregion
//#region src/synthesis/reverbrator.ts
function jt(e, t, n) {
	let { sampleRate: r } = e, i = t * r, a = e.createBuffer(t, i, r), o = a.getChannelData(0), s = a.getChannelData(1);
	for (let e = 0; e < i; e++) o[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n, s[e] = (Math.random() * 2 - 1) * (1 - e / i) ** n;
	return a;
}
function Mt(e) {
	let t = jt(e, 2, 2), n = e.createGain();
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
		cleanupNodes() {
			r.disconnect(), i.disconnect(), a.disconnect(), n.disconnect();
		}
	};
}
//#endregion
//#region src/synthesis/webaudio-helper.ts
function Nt(...e) {
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
var J = st("wafer-v01", import.meta.url);
function Pt(e, t) {
	return ot(e + t * 12);
}
function Ft() {
	let e = J?.audioContext ?? new AudioContext();
	return {
		audioContext: e,
		voiceDestinationNode: e.createGain(),
		synthParameters: Xe(),
		finalDestinationNode: J?.audioOutputNode ?? e.destination
	};
}
var It = K(1024, At);
function Lt(e, t) {
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
			let i = Pt(t, e.octave);
			n.frequency.value !== i && (n.frequency.value = i);
			let o = It.update(e.wave, e.shape);
			o !== a && (r.curve = o, a = o);
		}
	};
}
function Rt(e, t) {
	let { audioContext: n, voiceDestinationNode: r } = e, i = Lt(n, t), a = mt(n, t), o = ht(n, t), s = bt(n), c = n.createGain(), l = e.synthParameters, u = pt(n, {
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
		let n = W(t.masterVolume);
		c.gain.value !== n && (c.gain.value = n);
	}
	let f = Nt(i, a, o, s, u.node, c, r);
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
function zt(e) {
	let { audioContext: t } = e, n = ct(t), r = Mt(t), i = ft(t), a = Nt(e.voiceDestinationNode, i, n, r, e.finalDestinationNode);
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
function Bt() {
	let e = Ft(), t = {}, n = zt(e);
	n.setupNodes();
	let r = {
		addNote(n, r) {
			let i = Rt(e, n);
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
			!(e.audioContext instanceof OfflineAudioContext) && e.audioContext.state === "suspended" && await e.audioContext.resume();
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
		},
		cleanup() {
			n.cleanupNodes();
		}
	};
}
//#endregion
//#region src/actions.ts
var Y = Bt(), X = {
	noteOn(e, t = 0, n = 1) {
		Y.noteOn(e, t), B("notes", (t) => [...t, e]);
	},
	noteOff(e, t = 0) {
		Y.noteOff(e, t), B("notes", (t) => t.filter((t) => t !== e));
	},
	setSynthParam(e, t) {
		B("synthParams", e, t), Y.setParameter(e, t);
	},
	loadStates(e) {
		B("synthParams", e.synthParams), Y.setAllParameters(e.synthParams);
	}
};
//#endregion
//#region src/automation-input.ts
function Vt() {
	return {
		getParameterSpecs() {
			return [
				{ id: "oscWave" },
				{ id: "oscOctave" },
				{ id: "oscShape" },
				{ id: "ampAttack" },
				{ id: "ampDecay" },
				{ id: "ampSustain" },
				{ id: "ampRelease" },
				{ id: "chorusLevel" },
				{ id: "reverbLevel" },
				{ id: "hpfCutoff" },
				{ id: "hpfPeak" },
				{ id: "filterCutoff" },
				{ id: "filterPeak" },
				{ id: "foldingShaperWave" },
				{ id: "foldingShaperLevel" },
				{ id: "densityShaperLevel" },
				{ id: "masterVolume" }
			];
		},
		getParameter(e) {
			let t = e, n = z.synthParams[t];
			if (typeof n == "boolean") return +!!n;
			let r = Ye[t];
			return r ? $e(n, r.min, r.max, !0) : n;
		},
		setParameter(e, t) {
			let n = e, r = Ye[n];
			r && (t = Math.round(H(t, r.min, r.max))), X.setSynthParam(n, t);
		}
	};
}
//#endregion
//#region src/persistence.ts
function Z(e) {
	return e * 255 >>> 0;
}
function Q(e) {
	return e / 255;
}
var Ht = {
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
}, Ut = 1, Wt = {
	emitStateBytes() {
		let { synthParams: e } = z, t = Ht.serializeParameters(e);
		return new Uint8Array([Ut, ...t]);
	},
	applyStateBytes(e) {
		if (e.length === 21 && e[0] === Ut) {
			let t = Ht.deserializeParameters([...e.slice(1)]);
			X.loadStates({ synthParams: t });
		}
	}
};
//#endregion
//#region src/drivers.ts
function Gt() {
	J ? J.completeSetup({
		unitAspects: {
			unitType: "instrument",
			categoryHint: "synthesizer",
			viewSize: [800, 380],
			preferJustSize: !0
		},
		noteInput: {
			noteOn: X.noteOn,
			noteOff: X.noteOff
		},
		automationInput: Vt(),
		persistence: Wt,
		cleanup: Y.cleanup
	}) : re(Le({
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
var Kt = /*#__PURE__*/ T("<div class=\"flex-ha h-8 text-[10px] tracking-[0.12em] text-[#d7dfeb] gap-2\"><div class=\"w-[72px] text-[#a8b4c0]\"></div><input type=range class=\"flex-1 accent-[#2ec965]\"><div class=\"w-[22px] text-right text-[#f8f8f8]\">");
function qt(e) {
	let t = e.step && e.step >= 1;
	return (() => {
		var n = Kt(), r = n.firstChild, i = r.nextSibling, a = i.nextSibling;
		return D(r, () => e.label), i.$$input = (t) => e.onChange(Number(t.currentTarget.value)), D(a, () => t ? Math.round(e.value) : e.value.toFixed(2)), _((t) => {
			var n = e.min ?? 0, r = e.max ?? 1, a = e.step ?? .01;
			return n !== t.e && E(i, "min", t.e = n), r !== t.t && E(i, "max", t.t = r), a !== t.a && E(i, "step", t.a = a), t;
		}, {
			e: void 0,
			t: void 0,
			a: void 0
		}), _(() => i.value = e.value), n;
	})();
}
Te(["input"]);
//#endregion
//#region src/organisms/module-header.tsx
var Jt = /*#__PURE__*/ T("<button type=button>"), Yt = /*#__PURE__*/ T("<div class=\"w-full flex-ha justify-between bg-indigo-800 py-1.5 px-2 text-[11px] tracking-[0.16em] text-[#dbe4ec] gap-2 mb-0.5\"><div class=\"flex-ha gap-1\"><span>");
function Xt(e) {
	return (() => {
		var t = Yt(), n = t.firstChild.firstChild;
		return D(n, () => e.title), D(t, w(be, {
			get when() {
				return e.withIndicator;
			},
			get children() {
				var t = Jt();
				return De(t, "click", e.onToggleIndicator, !0), _(() => Ee(t, `w-4 h-4 border ${e.enabled ? "border-[#72ffa4] bg-[#2d6d45]" : "border-[#6c7b8b] bg-[#212a35]"}`)), t;
			}
		}), null), t;
	})();
}
Te(["click"]);
//#endregion
//#region src/organisms/waveform-view.tsx
var Zt = /*#__PURE__*/ T("<div class=bg-[#222]><svg viewBox=\"0 0 160 90\"width=160 height=90><path stroke=#08f fill=#08f4>");
function Qt(e, t, n) {
	return `${[
		[0, n / 2],
		...lt(t).map((r) => [r, (-tt(e, Qe(r / (t - 1) * e.length, e.length - 1)) * .5 + .5) * n]),
		[t - 1, n / 2]
	].reduce((e, [t, n], r) => e + (r === 0 ? `M ${t} ${n}` : ` L ${t} ${n}`), "")}`;
}
function $t(e) {
	let t = K(64, kt), n = v(() => Qt(t.update(e.wave, e.shape), 160, 90));
	return (() => {
		var e = Zt(), t = e.firstChild.firstChild;
		return _(() => E(t, "d", n())), e;
	})();
}
//#endregion
//#region src/sections/main-view.tsx
var en = /*#__PURE__*/ T("<div class=\"flex-c gap-4 bg-gray-700\"><div class=\"flex-vc gap-4 bg-zinc-900 w-[800px] h-[380px]\"><div class=\"flex-h gap-6\"><div class=\"flex-vc gap-1 mb-[-20px]\"><div class=\"pt-2 pb-1\"></div></div><div class=\"flex-vl gap-1\"><div class=h-2></div></div><div class=\"flex-vl gap-1\"></div></div><div class=\"flex-h gap-6 \"><div class=\"w-[240px] flex-v text-white gap-1 pt-2 justify-end\"><div class=flex-vc><div>proto-engine-ptm-osc</div><div class=text-white></div></div></div><div class=\"flex-vl gap-1\"></div><div class=\"flex-vl gap-1 mt-[-36px]\">");
function $(e) {
	return w(qt, {
		get label() {
			return e.label;
		},
		get value() {
			return z.synthParams[e.paramKey];
		},
		onChange: (t) => X.setSynthParam(e.paramKey, t)
	});
}
function tn(e) {
	return w(qt, {
		get label() {
			return e.label;
		},
		get value() {
			return z.synthParams[e.paramKey];
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
function nn(e) {
	return w(qt, {
		get label() {
			return e.label;
		},
		get value() {
			return z.synthParams[e.paramKey];
		},
		onChange: (t) => X.setSynthParam(e.paramKey, t),
		min: 0,
		get max() {
			return e.count - 1;
		},
		step: 1
	});
}
function rn(e) {
	return w(Xt, {
		get title() {
			return e.title;
		},
		get enabled() {
			return z.synthParams[e.paramKey];
		},
		withIndicator: !0,
		onToggleIndicator: () => X.setSynthParam(e.paramKey, !z.synthParams[e.paramKey])
	});
}
function an() {
	return (() => {
		var e = en(), t = e.firstChild.firstChild, n = t.firstChild, r = n.firstChild, i = n.nextSibling, a = i.firstChild, o = i.nextSibling, s = t.nextSibling.firstChild, c = s.firstChild.firstChild.nextSibling, l = s.nextSibling, u = l.nextSibling;
		return D(n, w(Xt, { title: "oscillator" }), r), D(r, w($t, {
			get wave() {
				return z.synthParams.oscWave;
			},
			get shape() {
				return z.synthParams.oscShape;
			}
		})), D(n, w(nn, {
			paramKey: "oscWave",
			label: "osc_wave",
			get count() {
				return R.count;
			}
		}), null), D(n, w($, {
			paramKey: "oscShape",
			label: "osc_shape"
		}), null), D(n, w(tn, {
			paramKey: "oscOctave",
			label: "osc_octave",
			min: -2,
			max: 2
		}), null), D(i, w(rn, {
			title: "hpf",
			paramKey: "hpfOn"
		}), a), D(i, w($, {
			paramKey: "hpfCutoff",
			label: "hpf_cutoff"
		}), a), D(i, w($, {
			paramKey: "hpfPeak",
			label: "hpf_peak"
		}), a), D(i, w(rn, {
			title: "filter",
			paramKey: "filterOn"
		}), null), D(i, w($, {
			paramKey: "filterCutoff",
			label: "filter_cutoff"
		}), null), D(i, w($, {
			paramKey: "filterPeak",
			label: "filter_peak"
		}), null), D(o, w(Xt, { title: "amplifier" }), null), D(o, w($, {
			paramKey: "ampAttack",
			label: "amp_attack"
		}), null), D(o, w($, {
			paramKey: "ampDecay",
			label: "amp_decay"
		}), null), D(o, w($, {
			paramKey: "ampSustain",
			label: "amp_sustain"
		}), null), D(o, w($, {
			paramKey: "ampRelease",
			label: "amp_release"
		}), null), D(c, (() => {
			var e = xe(() => z.notes.length > 0);
			return () => e() ? `${z.notes.length}voices active` : "--";
		})()), D(s, w($, {
			paramKey: "masterVolume",
			label: "master"
		}), null), D(l, w(rn, {
			title: "folding shaper",
			paramKey: "foldingShaperOn"
		}), null), D(l, w(nn, {
			paramKey: "foldingShaperWave",
			label: "shaper_wave",
			count: 5
		}), null), D(l, w($, {
			paramKey: "foldingShaperLevel",
			label: "shaper_level"
		}), null), D(u, w(Xt, { title: "effects" }), null), D(u, w($, {
			paramKey: "densityShaperLevel",
			label: "density_level"
		}), null), D(u, w($, {
			paramKey: "chorusLevel",
			label: "chorus_level"
		}), null), D(u, w($, {
			paramKey: "reverbLevel",
			label: "reverb_level"
		}), null), e;
	})();
}
//#endregion
//#region src/app.tsx
function on() {
	return Gt(), w(an, {});
}
var sn = Pe((e) => we(() => w(on, {}), e), {
	cssTexts: ["/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-leading:initial;--tw-tracking:initial;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-indigo-800:oklch(39.8% .195 277.366);--color-gray-700:oklch(37.3% .034 259.733);--color-zinc-900:oklch(21% .006 285.885);--color-white:#fff;--spacing:.25rem;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}*{box-sizing:border-box;margin:0;padding:0}}@layer components;@layer utilities{.mt-\\[-36px\\]{margin-top:-36px}.mb-0\\.5{margin-bottom:calc(var(--spacing) * .5)}.mb-\\[-20px\\]{margin-bottom:-20px}.flex{display:flex}.h-2{height:calc(var(--spacing) * 2)}.h-4{height:calc(var(--spacing) * 4)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-\\[8px\\]{height:8px}.h-\\[380px\\]{height:380px}.h-full{height:100%}.w-4{width:calc(var(--spacing) * 4)}.w-\\[22px\\]{width:22px}.w-\\[72px\\]{width:72px}.w-\\[80px\\]{width:80px}.w-\\[240px\\]{width:240px}.w-\\[800px\\]{width:800px}.w-full{width:100%}.flex-1{flex:1}.cursor-pointer{cursor:pointer}.flex-col-reverse{flex-direction:column-reverse}.justify-between{justify-content:space-between}.justify-end{justify-content:flex-end}.gap-1{gap:var(--spacing)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-6{gap:calc(var(--spacing) * 6)}.gap-\\[2px\\]{gap:2px}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#6c7b8b\\]{border-color:#6c7b8b}.border-\\[\\#7df7a0\\]{border-color:#7df7a0}.border-\\[\\#72ffa4\\]{border-color:#72ffa4}.border-\\[\\#444\\]{border-color:#444}.border-\\[\\#63717f\\]{border-color:#63717f}.border-\\[\\#243342\\]{border-color:#243342}.border-\\[\\#485462\\]{border-color:#485462}.border-\\[\\#617081\\]{border-color:#617081}.border-\\[\\#ffb16f\\]{border-color:#ffb16f}.border-\\[\\#ffd861\\]{border-color:#ffd861}.bg-\\[\\#1a222d\\]{background-color:#1a222d}.bg-\\[\\#1b232d\\]{background-color:#1b232d}.bg-\\[\\#2d6d45\\]{background-color:#2d6d45}.bg-\\[\\#62d581\\]{background-color:#62d581}.bg-\\[\\#212a35\\]{background-color:#212a35}.bg-\\[\\#222\\]{background-color:#222}.bg-\\[\\#18242f\\]{background-color:#18242f}.bg-\\[\\#091015\\]{background-color:#091015}.bg-\\[\\#473405\\]{background-color:#473405}.bg-\\[\\#f58f45\\]{background-color:#f58f45}.bg-gray-700{background-color:var(--color-gray-700)}.bg-indigo-800{background-color:var(--color-indigo-800)}.bg-zinc-900{background-color:var(--color-zinc-900)}.px-2{padding-inline:calc(var(--spacing) * 2)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.pt-2{padding-top:calc(var(--spacing) * 2)}.pb-1{padding-bottom:var(--spacing)}.text-right{text-align:right}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.leading-none{--tw-leading:1;line-height:1}.tracking-\\[0\\.12em\\]{--tw-tracking:.12em;letter-spacing:.12em}.tracking-\\[0\\.14em\\]{--tw-tracking:.14em;letter-spacing:.14em}.tracking-\\[0\\.16em\\]{--tw-tracking:.16em;letter-spacing:.16em}.text-\\[\\#a8b4c0\\]{color:#a8b4c0}.text-\\[\\#c7d2de\\]{color:#c7d2de}.text-\\[\\#d7dfeb\\]{color:#d7dfeb}.text-\\[\\#dbe4ec\\]{color:#dbe4ec}.text-\\[\\#eef5ff\\]{color:#eef5ff}.text-\\[\\#f8f8f8\\]{color:#f8f8f8}.text-\\[\\#ffd861\\]{color:#ffd861}.text-white{color:var(--color-white)}.accent-\\[\\#2ec965\\]{accent-color:#2ec965}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}}:host{-webkit-user-select:none;user-select:none;font-family:Inter,sans-serif}body{min-height:100dvh}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-leading{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-blur{syntax:\"*\";inherits:false}@property --tw-brightness{syntax:\"*\";inherits:false}@property --tw-contrast{syntax:\"*\";inherits:false}@property --tw-grayscale{syntax:\"*\";inherits:false}@property --tw-hue-rotate{syntax:\"*\";inherits:false}@property --tw-invert{syntax:\"*\";inherits:false}@property --tw-opacity{syntax:\"*\";inherits:false}@property --tw-saturate{syntax:\"*\";inherits:false}@property --tw-sepia{syntax:\"*\";inherits:false}@property --tw-drop-shadow{syntax:\"*\";inherits:false}@property --tw-drop-shadow-color{syntax:\"*\";inherits:false}@property --tw-drop-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:\"*\";inherits:false}", Me],
	stylesheetUrls: ["https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"]
});
//#endregion
export { sn as default };
