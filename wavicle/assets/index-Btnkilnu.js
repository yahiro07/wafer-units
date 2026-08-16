(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=window;return e.__aluminaGlobal||={rerender:()=>{},asyncRerenderFlag:!1,hookEffectFuncs:[],debug:{nAll:0,nUpdated:0,nPatchCall:0},prevRootVdom:void 0,jsxCreateElementFunction:void 0,asyncLoopInitialized:!1,gHookInstance:void 0,gSheet:void 0,cssTextToClassNameMap:{},seqClassNameIndex:0,classNameIndexTable:{},cssClassNameToTextMap:{}},e.__aluminaGlobal}var t=e();function n(e){let t=e;return{get value(){return t},Provider:({value:e,children:n})=>(t=e,n[0])}}function r(e){return e.value}var i=`http://www.w3.org/2000/svg`,a=[`value`,`selected`,`checked`],o=[`key`,`children`,`if`,`ref`,...a];function s(e,t,n){let r=n?.props||{},i=t.props,a=Object.keys(i).filter(e=>!o.includes(e)).filter(e=>i[e]!==r[e]);Object.keys(r).filter(e=>!o.includes(e)).filter(e=>i[e]===void 0).forEach(t=>{let n=r[t];t.startsWith(`on`)&&typeof n==`function`?e[t.toLocaleLowerCase()]=void 0:e.removeAttribute(t)}),a.forEach(n=>{let r=t.props[n];r===!1||r==null?e.removeAttribute(n):n.startsWith(`on`)&&typeof r==`function`?e[n.toLocaleLowerCase()]=r:e.setAttribute(n,r?.toString()||``)}),!n?.marker&&t.marker&&e.setAttribute(`data-fc`,t.marker)}function c(e){return e.replace(/[A-Z]/g,e=>`-`+e.charAt(0).toLowerCase())}function l(e){return Object.keys(e).map(t=>{let n=e[t];return`${c(t)}:${n};`}).join(` `)}function u(e,n){if(typeof n==`string`&&e){for(let n in e)if(n.startsWith(`on`)){let r=e[n];delete e[n];let i=n.toLowerCase();e[i]=r?(...e)=>{r?.(...e),t.rerender()}:void 0}if(e.class||e.className){let t=[...Array.isArray(e.class)?e.class:[e.class],e.className].filter(e=>!!e).join(` `);delete e.className,e.class=t}e.style&&typeof e.style==`object`&&(e.style=l(e.style))}}function d(){return{holders:[],index:0,pendingEffectHolders:[]}}function f(e,t){if(!e||!t)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!0;return!1}function p(){let e=t.gHookInstance;if(!e)throw Error(`hook functions called outside render context`);let n=e,r=n.holders[n.index],i=!1;return r||(r=n.holders[n.index]={},i=!0),n.index++,{holder:r,first:i}}function m(e){let{holder:t,first:n}=p();n&&(t.value=e,t.setValue=e=>{typeof e==`function`?t.value=e(t.value):t.value=e});let{value:r,setValue:i}=t;return[r,i]}function h(e){let[t]=m(`call`in e?e():e);return t}function g(e,n){let{holder:r}=p();f(r.deps,n)&&(r.effectFunc=e,r.deps=n,t.gHookInstance.pendingEffectHolders.push(r))}function _(){let{holder:e,first:t}=p();return t&&(e.refObject={current:void 0}),e.refObject}function v(e){e.index=0,t.gHookInstance=e}function y(){t.gHookInstance=void 0}function b(e,n=!1){(n?e.holders:e.pendingEffectHolders).forEach(e=>{if(e.cleanupFunc&&=(e.cleanupFunc(),void 0),e.effectFunc){let n=e.effectFunc();n&&typeof n==`function`&&(e.cleanupFunc=n),t.asyncRerenderFlag=!0,e.effectFunc=void 0}}),e.pendingEffectHolders=[]}var x=Promise.resolve();function S(e){x.then(e)}function C(e){return Array.isArray(e)?e.filter(e=>!!e).join(` `):e}function w(e){let t=e.name;return{name:t,mount(n,r){return n.fcsig=t,n.hook=d(),n.renderWithHook=r=>{v(n.hook);let i=e(r);if(i&&(i.marker=`${t}`),r.class&&i&&(i.vtype===`vElement`||i.vtype===`vComponent`)){let e=C(r.class);i.props.class=i.props.class?`${i.props.class} ${e}`:e}return y(),S(()=>b(n.hook)),i},n.renderWithHook(r)},update(e,t){return e.renderWithHook(t)},unmount(e){b(e.hook,!0)}}}function ee(e){return e.__AluminaFunctionComponentWrapper||=w(e),e.__AluminaFunctionComponentWrapper}function T(e){return{vtype:`vBlank`,debugSig:`blank__${e}`}}function te(e){return{vtype:`vText`,text:e,debugSig:`text__${e}`}}function ne(e,t,n){return{vtype:`vElement`,tagName:e,props:t,children:n,debugSig:`${e}__${n.length}`}}function re(e,t,n){return{vtype:`vComponent`,componentWrapper:e,props:t,children:n,debugSig:`${e.name}`,state:{}}}function ie(e){if(e.some(e=>Array.isArray(e))){let t=[];for(let n of e)Array.isArray(n)?t.push(...n):t.push(n);return t}return e}function ae(e){return(Array.isArray(e)?ie(e):[e]).map(e=>e==null||e===!1?T(e):typeof e==`string`||typeof e==`number`||typeof e==`boolean`?te(e.toString()):e)}function oe(e){return`children`in e?ae(e.children):[]}function se(e,t){if(t&&`if`in t&&!t.if)return T(null);if(e===ce)return{vtype:`vFragment`,children:oe(t)};u(t,e),typeof e==`function`&&(e=ee(e));let n=oe(t);return t={...t,children:n},typeof e==`object`?re(e,t,n):ne(e,t,n)}function E(e,t,...n){return t||={},n.length>0?se(e,{...t,children:n}):se(e,t)}function ce(){}function le(e){e||console.log(`assertion failed`)}function D(e,t,n=null){let r;if(t.vtype===`vBlank`)r=document.createComment(`NULL`),e.insertBefore(r,n);else if(t.vtype===`vText`)r=document.createTextNode(t.text),e.insertBefore(r,n);else if(t.vtype===`vElement`){r=t.tagName===`svg`||e instanceof SVGElement?document.createElementNS(i,t.tagName):document.createElement(t.tagName),s(r,t,void 0),t.children.forEach(e=>D(r,e));let o=t.props.ref;o&&typeof o==`object`&&(o.current=r),e.insertBefore(r,n),a.forEach(e=>{let n=t.props[e];n!==void 0&&(r[e]=n)})}else if(t.vtype===`vComponent`){t.state.componentState={};let i=t.componentWrapper.mount(t.state.componentState,t.props)||T(null);t.state.renderRes=i,r=D(e,i,n)}else if(t.vtype===`vFragment`)r=e,t.children.forEach(e=>D(r,e,n));else throw Error(`invalid vnode ${t}`);return t.dom=r,r}function O(e,t){if(t.vtype===`vBlank`)e.removeChild(t.dom);else if(t.vtype===`vText`)e.removeChild(t.dom);else if(t.vtype===`vElement`){let n=t.dom;t.children.forEach(e=>O(n,e)),e.removeChild(n)}else if(t.vtype===`vComponent`)O(e,t.state.renderRes),t.state.renderRes=void 0,t.componentWrapper.unmount(t.state.componentState);else if(t.vtype===`vFragment`){let e=t.dom;t.children.forEach(t=>O(e,t))}else throw Error(`invalid vnode ${t}`);t.dom=void 0}function ue(e,t,n){t.state.componentState=n.state.componentState;let r=n.state.renderRes,i=t.componentWrapper.update(t.state.componentState,t.props)||T(null);t.state.renderRes=i,fe(e,i,r)}function de(e,t,n){if(t.length===n.length)for(let r=0;r<t.length;r++){let i=t[r],a=n[r];fe(e,i,a)}else n.forEach(t=>O(e,t)),t.forEach(t=>D(e,t))}function fe(e,t,n){if(le(e&&t&&n),le(n.dom),le(!Array.isArray(t)),t===n)t.dom=n.dom;else if(t.vtype===`vBlank`&&n.vtype===`vBlank`)t.dom=n.dom;else if(t.vtype===`vText`&&n.vtype===`vText`){let e=n.dom;t.text!==n.text&&(e.nodeValue=t.text),t.dom=e}else if(t.vtype===`vComponent`&&n.vtype===`vComponent`&&t.componentWrapper===n.componentWrapper)ue(e,t,n),t.dom=n.dom;else if(n.dom instanceof Element&&t.vtype===`vElement`&&n.vtype===`vElement`&&t.tagName===n.tagName){let e=n.dom;s(e,t,n),de(e,t.children,n.children),t.dom=e,a.forEach(r=>{let i=n.props[r],a=t.props[r];(a!==i||t.children.length!==n.children.length)&&(e[r]=a)})}else if(t.vtype===`vFragment`&&n.vtype===`vFragment`){let e=n.dom;de(e,t.children,n.children),t.dom=e}else if(t.vtype!==n.vtype||n.vtype===`vElement`&&t.vtype===`vElement`&&n.tagName!==t.tagName||n.vtype===`vComponent`&&t.vtype===`vComponent`&&t.componentWrapper!==n.componentWrapper){let r=n.dom?.nextSibling||null;n.vtype===`vFragment`&&(r=n.children[n.children.length-1].dom?.nextSibling||null),O(e,n),D(e,t,r)}else console.log(`invalid condition`)}function pe(e,n){let r=t.prevRootVdom;r?fe(n,e,r):D(n,e),t.prevRootVdom=e}var me=/(?:([A-Z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,he=/\/\*[\s\S]*?\*\/|\s{2,}|\n/gm,ge=e=>{let t=[{}],n;for(;n=me.exec(e.replace(he,``));)n[4]&&t.shift(),n[3]?t.unshift(t[0][n[3]]=t[0][n[3]]||{}):n[4]||(t[0][n[1]]=n[2]);return t[0]},k=(e,t)=>{let n=``,r=``,i=``,a;for(let o in e){let s=e[o];if(typeof s==`object`)a=t?t.replace(/([^,])+/g,e=>o.replace(/([^,])+/g,t=>/&/g.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):o,o[0]===`@`?o[1]===`f`?r+=k(s,o):r+=o+`{`+k(s,o[1]===`k`?``:t)+`}`:r+=k(s,a);else if(o[0]===`@`&&o[1]===`i`)n=o+` `+s+`;`;else{let e=k.p;i+=e?e(o.replace(/[A-Z]/g,`-$&`).toLowerCase(),s):o.replace(/[A-Z]/g,`-$&`).toLowerCase()+`:`+s+`;`}}return i[0]?(a=t?t+`{`+i+`}`:i,n+a+r):n+r},_e=(e,n)=>{let{classNameIndexTable:r}=t,i=r[e];return i===void 0&&(i=r[e]=t.seqClassNameIndex++),n?`cs${i}_${n}`:`cs${i}`};function ve(){let{gSheet:e}=t;return e||(e=document.createElement(`style`),e.innerHTML=` `,e.id=`alumina_css_in_js`,document.head.appendChild(e),t.gSheet=e),e.firstChild}function ye(e){let t=ve(),n=e.replace(/label:.+?;/g,``);t.data.includes(n)||(t.data+=n)}function be(e){return e.match(/label: (.+);/)?.[1]}function xe(e,n){let r=``,i=0,{cssClassNameToTextMap:a}=t;for(i=0;i<n.length;i++){r+=e[i];let t=n[i].toString();a[t]&&(t=a[t]),r+=t}return r+=e[i],r}function A(e,...n){let{cssTextToClassNameMap:r,cssClassNameToTextMap:i}=t,a=xe(e,n);if(r[a])return r[a];let o=_e(a,be(a));return ye(k(ge(a),`.${o}`)),r[a]=o,i[o]=a,o}function Se(e){let{cssClassNameToTextMap:n}=t,r=n[e];r&&ye(k(ge(r),``))}function Ce(e){t.jsxCreateElementFunction=e}new Proxy({},{get:(e,n)=>(...e)=>{let r=A(...e);return e=>{let i=[r,e.className||``].join(` `),{jsxCreateElementFunction:a}=t;return a(n,{...e,className:i})}}});function j(e,t){return t&&(e.props.class?e.props.class+=` `+t:e.props.class=t),e}Ce(E);function we(){t.rerender()}function M(){t.asyncRerenderFlag=!0}function Te(){if(!t.asyncLoopInitialized){let e=()=>{t.asyncRerenderFlag&&=(t.rerender(),!1),requestAnimationFrame(e)};e(),t.asyncLoopInitialized=!0}}function Ee(e,n){let r=()=>{pe(e(),n),t.hookEffectFuncs.forEach(e=>e()),t.hookEffectFuncs=[]};t.rerender=r,r(),Te()}function N(e,t){let n={x:e.clientX,y:e.clientY},r=e=>{let r={x:e.clientX,y:e.clientY},i={x:r.x-n.x,y:r.y-n.y};t.moveHandler?.(i,e),e.preventDefault()},i=()=>{window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerup`,i),t.upHandler?.()};window.addEventListener(`pointermove`,r),window.addEventListener(`pointerup`,i)}var De=e=>e.preventDefault();function Oe(e){return t=>{e(t.currentTarget.value)}}function ke(e,t){return e.length===4?`${e}${(t*15>>0).toString(16)}`:e.length===7?`${e}${(t*255>>0).toString(16).padStart(2,`0`)}`:e}function Ae(e,t){let n;return(...r)=>{n&&=(clearTimeout(n),void 0),n=setTimeout(()=>e(...r),t)}}var P;(function(e){function t(e,t,n){return(1-n)*e+n*t}e.lerp=t;function n(e,t,n){return e<t?t:e>n?n:e}e.clamp=n;function r(e,t,n,r,i,a){let o=(e-t)/(n-t)*(i-r)+r;if(a){let e=Math.max(r,i),t=Math.min(r,i);if(o>e)return e;if(o<t)return t}return o}e.lerpMap=r;function i(e,t,n){return t<=e&&e<=n}e.between=i})(P||={});var F;(function(e){function t(e){return Array(e).fill(0).map((e,t)=>t)}e.seq=t;function n(e,n){return t(n+1-e).map(t=>e+t)}e.range=n;function r(e,t){let n=0;for(;n<e.length;){if(e[n]===t){e.splice(n,1);continue}n++}}e.remove=r})(F||={});function je(e,t,n,r){let i=Date.now(),a=i+r,o=!1,s=()=>{if(o)return;let r=Date.now();if(r>+a)e(n),o=!0;else{let o=1-(1-P.lerpMap(r,i,a,0,1,!0))**2;e(P.lerpMap(o,0,1,t,n)),requestAnimationFrame(s)}M()};return s(),{flush(){o||=(e(n),!0)}}}var I={versionCode:`v220907`,bottomNoteNumber:24,numKeys:85,activeKeyRangeUnitOffsetDefault:14,activeKeyRangeUnitSize:15,mainKeyUnitWidth:50,octaveSelectionKeyUnitOffsets:[0,7,14,21,28,35]},L={isJapaneseEnvironment:!1,isWebMidiSupported:!1,isMobile:!1,get isPc(){return!L.isMobile}};L.isMobile&&(I.activeKeyRangeUnitSize=10,I.mainKeyUnitWidth=75);var Me=[[`piano`,`Piano`,`ピアノ`],[`elepi`,`Electric Piano`,`エレピ`],[`celesta`,`Celesta`,`チェレスタ`],[`guitar`,`Guitar`,`ギター`],[`bell`,`Bell`,`ベル`],[`ocarina`,`Ocarina`,`オカリナ`],[`bass1`,`Bass1`,`ベース1`],[`bass2`,`Bass2`,`ベース2`],[`pluck1`,`Pluck1`,`プラック1`],[`pluck2`,`Pluck2`,`プラック2`],[`pluck3`,`Pluck3`,`プラック3`],[`pluck4`,`Pluck4`,`プラック4`],[`brass1`,`Brass1`,`ブラス1`],[`brass2`,`Brass2`,`ブラス2`],[`lead1`,`Lead1`,`リード1`],[`lead2`,`Lead2`,`リード2`],[`lead3`,`Lead3`,`リード3`],[`lead4`,`Lead4`,`リード4`],[`pad1`,`Pad1`,`パッド1`],[`pad2`,`Pad2`,`パッド2`],[`strings1`,`Strings1`,`ストリングス1`],[`strings2`,`Strings2`,`ストリングス2`],[`orchestra`,`Orchestra`,`オーケストラ`],[`nes`,`NES`,`ファミコン`]],Ne=Me.map(e=>e[0]);function Pe(e,t){let n=t===`ja`?2:1;return Me.find(t=>t[0]===e)?.[n]||`err`}function Fe(e){return{async initialize(){},get allDeviceEntries(){return[]},get currentDeviceId(){return``},selectDevice(e){}}}function Ie(e){return window.queryUnitInterface?.(e)}var R=Ie(`wafer-v01`);function z(e,t,n,r){for(let i=0;i<r;i++){let r=n+i;e[r]=t[r]}}function Le(e,t,n,r){for(let i=0;i<n;i++){let n=t+i;e[n]*=r}}function B(e,t,n){let r=t*n;return e.slice(r,r+t)}function Re(e,t,n,r){let i=e.sampleRate,a=t,o=r.createBuffer(2,i*a,i),s=e.getChannelData(0),c=e.getChannelData(1),l=o.getChannelData(0),u=o.getChannelData(1),d=B(s,i*a,n),f=B(c,i*a,n);return z(l,d,0,i*a),z(u,f,0,i*a),o}function V(e){let{srcBuf:t,srcOffset:n,duration:r,destBuf:i,destOffset:a,v0:o,v1:s}=e;for(let e=0;e<r;e++){let c=P.lerpMap(e,0,r,o,s,!0);i[a+e]+=t[n+e]*c}}function ze(e,t,n,r,i,a=`SL`){let o=e.sampleRate,s=t,c=e.getChannelData(0),l=e.getChannelData(1),u=B(c,o*s,n),d=B(l,o*s,n),f=r.createBuffer(2,o*s,o),p=f.getChannelData(0),m=f.getChannelData(1),h=2**((i-69)/12)*440;if(a===`SL`){let e=.75,t=1/h,n=Math.floor(2/t)*t,r=o*e>>0,i=o*(e+n)>>0,a=o*.01>>0;function s(e,t){z(e,t,0,i-a),V({srcBuf:t,srcOffset:i-a,destBuf:e,destOffset:i-a,duration:a,v0:1,v1:0}),V({srcBuf:t,srcOffset:r-a,destBuf:e,destOffset:i-a,duration:a,v0:0,v1:1})}return s(p,u),s(m,d),{samples:f,loopSpec:{posLoopStart:r,posLoopEnd:i}}}{let e=.75,t=1/h,n=Math.floor(1/t)*t,r=o*e>>0,i=o*(e+n)>>0,a=o*(e+n*2)>>0,s=o*n>>0,c=s>>1,l=i-c,g=i+c;function _(e,t){z(e,t,0,i),V({srcBuf:t,srcOffset:i,destBuf:e,destOffset:i,duration:s,v0:1,v1:0}),V({srcBuf:t,srcOffset:r,destBuf:e,destOffset:i,duration:s,v0:0,v1:1}),V({srcBuf:t,srcOffset:i,destBuf:e,destOffset:i,duration:c,v0:.5,v1:1}),V({srcBuf:t,srcOffset:g,destBuf:e,destOffset:g,duration:c,v0:1,v1:.5}),V({srcBuf:t,srcOffset:a,destBuf:e,destOffset:i,duration:c,v0:.5,v1:0}),V({srcBuf:t,srcOffset:l,destBuf:e,destOffset:g,duration:c,v0:0,v1:.5}),Le(e,i,s,.667)}return _(p,u),_(m,d),{samples:f,loopSpec:{posLoopStart:i,posLoopEnd:a}}}}function H(e,t){return Array(t).fill(0).map((t,n)=>e+n*12)}function Be(){return[{instrumentKey:`piano`,sourcePath:`samples/freesound/piano_4s_c0c7.mp3`,sliceDuration:4,noteNumbers:H(24,8),looped:!1,gainAdjustment:1,releaseParam:.5},{instrumentKey:`elepi`,sourcePath:`samples/freesound/rhodes_4s_d1d6.mp3`,sliceDuration:4,noteNumbers:H(38,7),looped:!1,gainAdjustment:1,releaseParam:.7},{instrumentKey:`celesta`,sourcePath:`samples/freesound/celesta_4s_g2g6.mp3`,sliceDuration:4,noteNumbers:H(43,5),looped:!1,gainAdjustment:1,releaseParam:.7},{instrumentKey:`guitar`,sourcePath:`samples/freesound/guitar_4s_e3e6.mp3`,sliceDuration:4,noteNumbers:H(40,4),looped:!1,gainAdjustment:1,releaseParam:.5}]}function Ve(){return[[`bell`,`steelbell.mp3`,!1,1.5,.9,void 0],[`ocarina`,`sleepy.mp3`,!0,1,.5,`SL`],[`bass1`,`bass2.mp3`,!1,1.4,.5,void 0],[`bass2`,`slidebass.mp3`,!0,1,.2,`SL`],[`pluck1`,`hipluck2.mp3`,!1,1,.5,void 0],[`pluck2`,`pluck1.mp3`,!1,4,.5,void 0],[`pluck3`,`brightkey.mp3`,!1,1,.7,void 0],[`pluck4`,`key_shiny.mp3`,!1,1,.7,void 0],[`brass1`,`trumpet.mp3`,!0,1,.4,`SL`],[`brass2`,`brass2.mp3`,!0,1.4,.5,`XF`],[`lead1`,`super1.mp3`,!0,.7,.7,`XF`],[`lead2`,`coldwave.mp3`,!0,.8,.5,`XF`],[`lead3`,`lead_bright.mp3`,!0,.4,.7,`XF`],[`lead4`,`finale.mp3`,!0,.8,.5,`XF`],[`pad1`,`softkey.mp3`,!1,1,.8,void 0],[`pad2`,`pad2.mp3`,!0,1,.7,`XF`],[`strings1`,`gradient.mp3`,!0,.8,.8,`XF`],[`strings2`,`slowstrings.mp3`,!1,1,.8,void 0],[`orchestra`,`grandwave.mp3`,!0,1,.8,`XF`],[`nes`,`chipwave.mp3`,!0,1,.4,`SL`]].map(e=>{let[t,n,r,i,a,o]=e;return{instrumentKey:t,pitched:!0,sourcePath:`samples/arctrax/${n}`,sliceDuration:4,noteNumbers:[33,45,57,69,81,93],looped:r,gainAdjustment:i,releaseParam:a,loopingMethod:o}})}async function He(e,t){let n=t.split(`/`).pop();console.log(`fetching ${n}`);let r=await(await fetch(t)).arrayBuffer();if(r.byteLength===0)throw Error(`invalid audio resource: ${t}`);return e.decodeAudioData(r)}async function Ue(e,t){let n=await He(t,e.sourcePath);return{sampleSources:e.noteNumbers.map((r,i)=>{if(e.looped){let{samples:a,loopSpec:o}=ze(n,e.sliceDuration,i,t,r,e.loopingMethod);return{noteNumber:r,samples:a,loopSpec:o}}return{noteNumber:r,samples:Re(n,e.sliceDuration,i,t)}}),gainAdjustment:e.gainAdjustment,releaseParam:e.releaseParam}}var We={};async function Ge(e,t){return We[e.instrumentKey]||=await Ue(e,t)}function Ke(e){let t=[...Be(),...Ve()],n=Ne.map(e=>{let n=t.find(t=>t.instrumentKey===e);if(!n)throw Error(`instrument definition not found for ${e}`);return n});return{allInstrumentKeys:Ne,loadInstrument(t){let r=n.find(e=>e.instrumentKey===t);if(!r)throw Error(`instrument definition not found for ${t}`);return Ge(r,e)},async preloadAllInstrumentSamples(){await Promise.all(n.map(t=>Ge(t,e)))}}}function qe(e,t){let n=t.map(t=>Math.abs(t.noteNumber-e)),r=Math.min(...n);return t[n.indexOf(r)]}function Je(e,t,n,r,i,a){let o=e.sampleRate,s=qe(t,n),c=2**((t-s.noteNumber)/12),l=e.createBufferSource();l.buffer=s.samples,l.playbackRate.value=c;let{loopSpec:u}=s;u&&(l.loop=!0,l.loopStart=u.posLoopStart/o,l.loopEnd=u.posLoopEnd/o);let d=!!u,{volume:f,release:p}=r,m=f*i,h=p*p*3e3,g=e.createGain();g.gain.value=m,l.connect(g).connect(a);let _=s.samples.duration/c,v,y;function b(e,t,n,r){g.gain.setValueAtTime(t,e);let i=e+r/1e3;g.gain.linearRampToValueAtTime(n,i)}let x=e=>{l.start(e),v=e},S=e=>{y=e,b(e,m,0,h)},C=()=>{l.stop(),l.disconnect()};return{noteOn:x,noteOff:S,update:()=>{if(y!==void 0&&e.currentTime>=y+h/1e3)return C(),!0;let t=e.currentTime-v;return!d&&t>_&&(C(),!0)},forceStop:e=>{y=e,h=Math.min(h,50),b(e,g.gain.value,0,h)}}}function Ye(){let e={},t=[];return{noteOn(n,r,i){let a=e[n];a&&(a.forceStop(r),t.push(a)),i.noteOn(r),e[n]=i},noteOff(t,n){let r=e[t];r&&r.noteOff(n)},updateVoices(){for(let t in e){let n=e[t];n&&n.update()&&delete e[t]}for(let e=t.length-1;e>=0;e--)t[e].update()&&t.splice(e,1)}}}function Xe(e){return`note-${e}`}function Ze(){let e=R?.audioContext??new AudioContext,t=Ke(e),{allInstrumentKeys:n}=t,r=Ye(),i=e.createGain(),a=e.createDynamicsCompressor(),o=e.createAnalyser(),s=new Float32Array(o.fftSize);i.connect(a).connect(o).connect(R?.audioOutputNode??e.destination);let c,l=1,u=!1,d,f=n[0],p=!1,m=!1,h=[],g={volume:.5,release:.4};function _(){i.gain.value=l}function v(){o.getFloatTimeDomainData(s);let e=0;for(let t of s)e+=t*t;let t=Math.sqrt(e/s.length);return t<=0?-80:Math.max(-80,Math.min(0,20*Math.log10(t)))}let y={allInstrumentKeys:t.allInstrumentKeys,get masterVolume(){return l},setMasterVolume(e){l=e,_()},get currentInstrumentKey(){return f},get webAudioInitialized(){return p},get noteReceived(){return m},instrumentParameters:g,holdNoteNumbers:h,setInstrumentParameter(e,t){g[e]=t},initialize(){_(),c=setInterval(()=>r.updateVoices(),50)},activateWebAudioOnUserAction(){p||(!(e instanceof OfflineAudioContext)&&e.state===`suspended`&&e.resume(),p=!0,console.log(`web audio started`),M())},readOutputLevelDb(){return v()},get isLoadingSamples(){return u},async preloadAllInstrumentSamples(){return t.preloadAllInstrumentSamples()},async setInstrument(e,n){f=e,u=!0;let r=await t.loadInstrument(e);u=!1,f===e&&(d=r,n&&y.setInstrumentParameter(`release`,d.releaseParam),M())},noteOn(t,n,a){if(n=Math.max(n??0,e.currentTime),!d){console.warn(`noteOn called while instrumentData is not loaded`);return}if(u){console.warn(`noteOn called while isLoadingSamples`);return}let o=Xe(t),{sampleSources:s,gainAdjustment:c}=d,l=Je(e,t,s,g,c,i);r.noteOn(o,n,l),h.push(t),m=!0},noteOff(t,n){n=Math.max(n??0,e.currentTime);let i=Xe(t);r.noteOff(i,n),F.remove(h,t)},finalize(){c&&=(clearInterval(c),void 0)}};return y}var Qe=({unitWidthPx:e,heightPx:t,activeRangeOffsetU:n,activeRangeSizeU:r,children:i})=>{let a=e*r,o=-n*e;return j(E(`div`,null,E(`div`,{class:`inner`},i)),A`
      position: relative;
      width: ${a}px;
      height: ${t}px;
      overflow: hidden;
      box-sizing: content-box;

      > .inner {
        position: absolute;
        top: 0;
        left: ${o}px;
      }
    `)},$e={languageKey:`en`,colors:{clPanelBody:`#aceefe88`,clForeground:`#fff`,clControlHighlight:`#0AF`,systemMessage:`#F08`}},et=n($e);function U(){return r(et)}var W=`0.25s`,G=A`
  transition: all ${W} linear;
`,tt=`Roboto`,nt=`'Noto Sans JP'`,rt=`'M PLUS 1p'`,it=`Orbitron, sans-serif`,at=`Oxanium, sans-serif`,ot=`${rt}, sans-serif`,st=`Play, sans-serif`,ct=`Play`;function lt(e,t){let{languageKey:n}=U();return n===`ja`?t:e}function ut(e,t){let{languageKey:n}=U();return n===`ja`?t:e}var dt={en:{instrument:`instrument`,volume:`volume`,release:`release`,midiIn:`MIDI IN`,none:`none`,msgNeedTapSomewhereToEnableAudioOutput:`Click somewhere to enable audio output.`},ja:{instrument:`音色`,volume:`音量`,release:`余韻`,midiIn:`MIDI IN`,none:`なし`,msgNeedTapSomewhereToEnableAudioOutput:`画面のどこかをクリックすると、オーディオ出力が有効になります。`}};function K(){let{languageKey:e}=Q.uiPresenter.state;return dt[e]}var q;(function(e){let t=[0,.9,1,2.1,2,3,3.9,4,5,5,6.1,6];function n(e,n){let r=e/12>>0,i=e%12,a=t[i];return n&&(a=Math.round(a)),r*7+a}e.getKeyOffsetInUnits=n;function r(e,t){return Math.floor(t+e*12/7)}e.getNoteNumberFormKeyOffset=r;let i=[1,3,6,8,10];function a(e){let t=e%12;return i.includes(t)}e.checkBlackKey=a;function o(e,t){let r=n(e,!0);return n(e+t,!0)-r}e.getKeysOuterWidthU=o})(q||={});function ft(e,t){if(!t)return;let n=e-t.rootNoteNumber;return t.labels[n]}var pt=({unitWidth:e,height:t,bottomNoteNumber:n,numKeys:r,holdNoteNumbers:i,onKeyHoldEvent:a,labelOptions:o,showCenterCMark:s,isMainKeys:c})=>{let l=`#f80b`,{getKeyOffsetInUnits:u,getKeysOuterWidthU:d,checkBlackKey:f}=q,p=F.range(n,n+r-1),m=u(n,!0),g=t*.63,_=e*.65,v=e*d(n,r)+1,y=h({playingNoteNumber:void 0}),b=e=>{a?.({noteNumber:e,hold:!0}),y.playingNoteNumber=e},x=()=>{y.playingNoteNumber&&=(a?.({noteNumber:y.playingNoteNumber,hold:!1}),void 0)},S=(e,t)=>{b(t),N(e,{moveHandler(e,t){let n=document.elementFromPoint(t.clientX,t.clientY);if(n?.classList.contains(`keyblocks-playable-key`)){let e=parseInt(n.dataset.noteNumber||``);isFinite(e)&&e!==y.playingNoteNumber&&(x(),b(e),M())}},upHandler(){x(),M()}})},C=!!a,w=e/10>>0,ee=`0 0 ${w}px ${w}px`,T=!!o;return j(E(`div`,null,p.map(t=>{let n=f(t),r=(u(t)-m)*e,a=i?.includes(t),c=ft(t,o),l=t===60&&s;return E(`div`,{key:t,class:[`key`,n&&`--black`,a&&`--hold`,C&&`--can-play`,C&&`keyblocks-playable-key`],style:{left:`${r}px`},onPointerDown:C&&(e=>S(e,t))||void 0,onTouchStart:De,"data-note-number":t},E(`div`,{if:l,class:`center-c-mark`}),E(`div`,{if:c,class:`label`},c))}),E(`div`,{class:`cover`,if:c})),A`
      position: relative;
      width: ${v}px;
      height: ${t}px;

      > .key {
        position: absolute;
        top: 0;
        border: solid 1px #222;
        width: ${e}px;
        height: ${t}px;
        background: #fff;
        font-family: ${st};
        font-size: 14px;
        color: ${l};

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: ${ee};

        &.--black {
          background-color: #000;
          background-image: url("./images/black_key_texture.svg");
          background-size: cover;
          background-position: center bottom;

          width: ${_}px;
          height: ${g}px;
          transform: translateX(${-_/2}px);
          z-index: 1;
          border-radius: 0;
        }

        transition: all 0.15s linear;

        &.--hold {
          background: #8f8;
        }

        &.--can-play {
          cursor: pointer;
        }

        > .center-c-mark {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${l};
          margin-bottom: ${c&&!T?`10px`:`2px`};
        }

        > .label {
          margin-top: 2px;
          margin-bottom: 7px;
        }

        &.--black > .label {
          margin-bottom: 21px;
        }
      }

      > .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: inset 0px 2px 6px #0004;
        z-index: 2;
        pointer-events: none;
      }
    `)},mt=({unitWidthPx:e,heightPx:t,bottomNoteNumber:n,numKeys:r,activeRangeOffsetU:i,activeRangeSizeU:a,onScrollActiveRange:o})=>{let s=q.getKeysOuterWidthU(n,r),c=e*s,l=i*e,u=a*e;return j(E(`div`,null,E(`div`,{class:`inner`,onPointerDown:t=>{N(t,{moveHandler(t){o(P.clamp(i+t.x/e,0,s-a)),M()}})}})),A`
      position: relative;
      width: ${c}px;
      height: ${t}px;
      > .inner {
        position: absolute;
        z-index: 2;
        top: 0;
        left: ${l}px;
        width: ${u}px;
        height: ${t}px;
        background: #f804;
        cursor: pointer;
        box-sizing: border-box;
        border: solid 1px #f806;

        &:hover {
          border: solid 1px #f80b;
        }
      }
    `)},ht=({options:e,value:t,onChange:n,width:r,height:i,fontSize:a,disabled:o})=>{let s={...r?{width:`${r}px`}:{},...i?{height:`${i}px`}:{},...a?{fontSize:`${a}px`}:{}},c=U().colors.clControlHighlight;return j(E(`select`,{value:e.length>0?t:``,onChange:Oe(n),disabled:o,onKeyDown:e=>e.preventDefault(),style:s},e.map((e,t)=>{let n=typeof e==`string`?e:e.value,r=typeof e==`string`?e:e.label;return E(`option`,{value:n,key:t},r)})),A`
      -webkit-appearance: none;
      border: none;
      border-radius: 2px;
      height: 32px;
      outline: none;

      cursor: pointer;
      padding-left: 6px;
      padding-top: 1px;

      user-select: none;

      background: #ecf0ec;
      color: #336;

      border-top: solid ${1}px #0008;
      border-left: solid ${1}px #0008;
      border-bottom: solid ${1}px #eee8;
      border-right: solid ${1}px #eee8;

      box-shadow: inset 1px 2px 4px #0003;

      font-family: ${lt(ct,rt)},
        'sans-serif';

      font-size: ${ut(`16px`,`14px`)};

      ${G};
      &:hover {
        border-color: ${c};
      }
    `)},J=e=>A`
  font-size: ${e?`${e}px`:`inherit`};
`,Y=({spec:e,size:t})=>{if(e.startsWith(`ri-`)||e.startsWith(`ph-`))return E(`i`,{class:[e,J(t)]});if(e.startsWith(`fa-`))return E(`i`,{class:[e,J(t&&t*.85>>0)]});if(e.startsWith(`ti-`))return E(`i`,{class:[`ti`,e,J(t)]});if(e.startsWith(`bi-`))return E(`i`,{class:[`bi`,e,J(t&&t*.9>>0)]});if(e.startsWith(`mi `)){let n=e.replace(`mi `,``);return E(`i`,{class:[`material-icons`,J(t)]},n)}if(e.startsWith(`mso `)){let n=e.replace(`mso `,``);return E(`span`,{class:[`material-symbols-outlined`,J(t)]},n)}return E(`div`,null,`invalid iconSpec: `,e)},gt=({iconSpec:e,size:t,onClick:n,disabled:r})=>{let i=U().colors.clForeground;return j(E(`div`,{class:r&&`--disabled`,onClick:n},E(Y,{spec:e,size:t})),A`
      cursor: pointer;
      ${G}
      color: ${i};

      &:hover {
        opacity: 0.7;
      }

      &.--disabled {
        opacity: 0.5;
      }
    `)},_t=[`settings`,`sliders`,`info`,`play`,`menu`,`edit`,`close`,`power`,`undo`,`star`,`search`],vt=[{libraryName:`font awesome 6`,iconSpecs:{settings:`fa-solid fa-gear`,sliders:`fa-solid fa-sliders`,info:`fa-solid fa-circle-info`,play:`fa-solid fa-play`,menu:`fa-solid fa-bars`,edit:`fa-solid fa-pen-to-square`,close:`fa-solid fa-xmark`,power:`fa-solid fa-power-off`,undo:`fa-solid fa-rotate-left`,star:`fa-solid fa-star`,search:`fa-solid fa-magnifying-glass`}},{libraryName:`material icons`,iconSpecs:{settings:`mi settings`,sliders:`mi tune`,info:`mi info`,play:`mi play_arrow`,menu:`mi menu`,edit:`mi edit`,close:`mi close`,power:`mi power_settings_new`,undo:`mi undo`,star:`mi star`,search:`mi search`}},{libraryName:`material symbols`,iconSpecs:{settings:`mso settings`,sliders:`mso tune`,info:`mso info`,play:`mso play_arrow`,menu:`mso menu`,edit:`mso edit`,close:`mso close`,power:`mso power_rounded`,undo:`mso undo`,star:`mso star`,search:`mso search`}},{libraryName:`bootstrap icons`,iconSpecs:{settings:`bi-gear-fill`,sliders:`bi-sliders`,info:`bi-info-circle`,play:`bi-play-fill`,menu:`bi-list`,edit:`bi-pencil-square`,close:`bi-x`,power:`bi-power`,undo:`bi-arrow-counterclockwise`,star:`bi-star-fill`,search:`bi-search`}},{libraryName:`remix icons`,iconSpecs:{settings:`ri-settings-3-fill`,sliders:`ri-equalizer-fill`,info:`ri-information-line`,play:`ri-play-fill`,menu:`ri-menu-fill`,edit:`ri-edit-fill`,close:`ri-close-line`,power:`ri-shut-down-line`,undo:`ri-arrow-go-back-line`,star:`ri-star-fill`,search:`ri-search-line`}},{libraryName:`tabler icons`,iconSpecs:{settings:`ti-settings`,sliders:`ti-adjustments-horizontal`,info:`ti-info-circle`,play:`ti-player-play`,menu:`ti-menu-2`,edit:`ti-edit`,close:`ti-square-x`,power:`ti-power`,undo:`ti-arrow-back-up`,star:`ti-star`,search:`ti-search`}},{libraryName:`phosphor icons`,iconSpecs:{settings:`ph-gear-fill`,sliders:`ph-sliders-horizontal-bold`,info:`ph-info-bold`,play:`ph-play-fill`,menu:`ph-list-bold`,edit:`ph-pencil-line-fill`,close:`ph-x-bold`,power:`ph-power-bold`,undo:`ph-arrow-counter-clockwise-bold`,star:`ph-star-fill`,search:`ph-magnifying-glass-bold`}}],yt=30;j(E(`table`,null,E(`tbody`,null,vt.map(e=>E(`tr`,{key:e.libraryName},E(`td`,null,e.libraryName),_t.map(t=>E(`td`,{key:t},E(Y,{size:yt,spec:e.iconSpecs[t]}))))))),A`
      font-size: 18px;
      td:first-child {
        text-align: left;
      }
      td {
        padding: 4px;
        text-align: center;
        vertical-align: center;
      }
    `),A`
  color: red;
`;var bt=({isLoading:e})=>j(E(Y,{spec:`ph-spinner`,size:24,class:e&&`--visible`}),A`
      @keyframes rotation1 {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      animation: 2s linear infinite rotation1;

      visibility: hidden;
      &.--visible {
        visibility: visible;
      }
    `),X=({height:e,asr:t=1.25,children:n,onClick:r,disabled:i})=>{let{colors:a}=U(),o=a.clControlHighlight,s=e*t>>0;return j(E(`div`,null,E(`div`,{onClick:r,class:[`inner`,i&&`--disabled`]},n)),A`
      width: ${s}px;
      height: ${e}px;

      background: #0006;
      border-radius: 3px;
      padding: 1px;

      > .inner {
        filter: drop-shadow(1px 3px 5px #0003);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eee;
        border: solid 1px #bbb8;
        border-radius: 4px;
        color: #37a;
        cursor: pointer;

        ${G};

        &:not(.--disabled) {
          &:hover {
            color: ${o};
            border-color: ${o};
          }
          &:active {
            background: ${ke(o,.5)};
          }
        }

        &.--disabled {
          opacity: 0.4;
        }
      }
    `)},xt=({value:e,onChange:t,size:n})=>{let r=U().colors.clControlHighlight,i=`rotate(${P.lerpMap(e,0,1,125,415)})`,a=h({dragging:!1});return j(E(`div`,null,E(`div`,{class:`cover`}),E(`svg`,{viewBox:`-50 -50 100 100`,class:a.dragging&&`--dragging`},E(`circle`,{class:`knob`,cx:0,cy:0,r:49,onPointerDown:n=>{let r=e;a.dragging=!0,N(n,{moveHandler(e){t(P.clamp(r-e.y*.01,0,1)),M()},upHandler(){a.dragging=!1,M()}})}}),E(`circle`,{class:`knob_inner`,cx:0,cy:0,r:40}),E(`g`,{class:`marker`,transform:i},E(`line`,{x1:12.5,y1:0,x2:45,y2:0})))),A`
      filter: drop-shadow(1px 3px 5px #0005);

      > svg {
        width: ${n}px;
        height: ${n}px;

        > .knob {
          fill: #ccc;
          cursor: pointer;
          transition: stroke ${W};
          stroke-width: 2px;
          stroke: transparent;
        }

        > .knob_inner {
          fill: #e8e8e8;
          pointer-events: none;
        }

        > .marker {
          stroke: #f80;
          stroke-width: ${10};
          pointer-events: none;
          transition: stroke ${W};
        }

        &:hover,
        &.--dragging {
          > .marker {
            stroke: ${r};
          }
          > .knob {
            stroke: ${r};
          }
        }
      }
    `)};function St(e,t=16){return e===`ja`?A`
      font-family: ${ot};
      font-size: ${t*.9>>0}px;
      display: flex;
      align-items: center;
      height: ${t*1.5>>0}px;
    `:A`
      font-family: ${at};
      font-size: ${t*1>>0}px;
      height: ${t*1.5>>0}px;
      display: flex;
      align-items: center;
    `}var Z=({text:e})=>{let{languageKey:t}=Q.uiPresenter.state;return j(E(`div`,null,e),A`
      ${St(t)};
    `)};A`
  cursor: pointer;
`;var Ct=({contentWidth:e,contentHeight:t,children:n})=>{let r=h({scale:1,mh:0,mv:0}),i=_(),a=i.current;if(a){let{clientWidth:n,clientHeight:i}=a;r.scale=Math.min(n/e,i/t),r.mh=Math.max((n-e*r.scale)/2,0),r.mv=Math.max((i-t*r.scale)/2,0)}else M();return g(M,[e,t]),j(E(`div`,{ref:i},E(`div`,{class:[`inner`,`bg-plane`],style:{width:`${e*r.scale}px`,height:`${t*r.scale}px`,marginLeft:`${r.mh}px`,marginTop:`${r.mv}px`}}),E(`div`,{class:`inner`,style:{width:`${e}px`,height:`${t}px`,transform:`scale(${r.scale}, ${r.scale})`,marginLeft:`${r.mh}px`,marginTop:`${r.mv}px`}},n)),A`
      width: 100%;
      height: 100%;
      position: relative;

      > .inner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto auto;
        transform-origin: left top;
      }
    `)},wt=({size:e})=>{let t=U().colors.clForeground;return j(E(`div`,null,E(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 30 30`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,style:`fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;`},E(`g`,{transform:`matrix(1,0,0,1,-410.457,-257.386)`},E(`path`,{d:`M411.064,276.322C412.981,274.63 414.799,273.823 416.523,273.682C419.474,273.442 422.05,275.124 424.166,277.126C426.668,279.492 429.351,281.214 432.286,281.515C433.825,281.673 435.453,281.456 437.179,280.708C434.503,284.436 430.132,286.866 425.197,286.866C418.519,286.866 412.873,282.416 411.064,276.322ZM410.91,268.489C412.884,266.703 414.753,265.856 416.523,265.711C419.474,265.471 422.05,267.154 424.166,269.155C426.668,271.521 429.351,273.243 432.286,273.544C434.613,273.783 437.145,273.165 439.905,271.152C439.926,271.474 439.937,271.799 439.937,272.126C439.937,273.307 439.798,274.456 439.535,275.557C436.964,277.886 434.704,278.747 432.592,278.531C430.27,278.293 428.208,276.819 426.228,274.946C423.496,272.363 420.088,270.382 416.28,270.692C414.447,270.842 412.499,271.514 410.48,272.956C410.464,272.682 410.457,272.405 410.457,272.126C410.457,270.872 410.614,269.653 410.91,268.489ZM413.299,263.427C415.983,259.765 420.314,257.386 425.197,257.386C431.828,257.386 437.442,261.774 439.292,267.803C436.821,269.969 434.637,270.769 432.592,270.56C430.27,270.322 428.208,268.848 426.228,266.975C423.496,264.392 420.088,262.411 416.28,262.721C415.316,262.8 414.32,263.023 413.299,263.427Z`})))),A`
      width: ${e}px;
      height: ${e}px;
      fill: ${t};
    `)},Tt=({canGoPrev:e,canGoNext:t,onShift:n})=>j(E(`div`,null,E(X,{height:30,onClick:()=>n(-1),disabled:!e},E(Y,{spec:`ph-caret-left-fill`,size:20})),E(X,{height:30,onClick:()=>n(1),disabled:!t},E(Y,{spec:`ph-caret-right-fill`,size:20}))),A`
      display: flex;
      gap: 6px;
    `),Et=({canGoPrev:e,canGoNext:t,onShift:n})=>{let r=80/45;return j(E(`div`,null,E(X,{height:45,onClick:()=>n(-1),disabled:!e,asr:r},E(Y,{spec:`ph-caret-left-fill`,size:32})),E(X,{height:45,onClick:()=>n(1),disabled:!t,asr:r},E(Y,{spec:`ph-caret-right-fill`,size:32}))),A`
      display: flex;
      gap: 12px;
    `)};function Dt(e){return P.lerpMap(e,-80,-3,0,1,!0)}function Ot(e,t){for(let n=t.length-1;n>=0;n--){let r=t[n];if(r<e)return r}}function kt(e,t){return t.find(t=>t>e)}function At(e){let t=I.octaveSelectionKeyUnitOffsets,n,r={keyRangeOffset:I.activeKeyRangeUnitOffsetDefault,keysRangeSize:I.activeKeyRangeUnitSize,languageKey:L.isJapaneseEnvironment?`ja`:`en`,isCompactMode:localStorage.getItem(`wavicle_is_compact_mode`)===`1`,usagePanelVisible:!1,outputLevel01:0},i={get currentInstrumentIndex(){let{allInstrumentKeys:t,currentInstrumentKey:n}=e;return t.indexOf(n)},get canShiftInstrumentPrev(){return i.currentInstrumentIndex>0},get canShiftInstrumentNext(){let{allInstrumentKeys:t}=e;return i.currentInstrumentIndex<t.length-1},get canShiftKeysOffsetLower(){return r.keyRangeOffset>t[0]},get canShiftKeysOffsetHigher(){return r.keyRangeOffset<t[t.length-1]},get pcKeyboardRootNoteNumber(){let e=Ot(r.keyRangeOffset+3.5,t)||0;return q.getNoteNumberFormKeyOffset(e,I.bottomNoteNumber)},get needUserActionForAudioOutput(){return!e.webAudioInitialized&&e.noteReceived}},a,o={initialize(){n=setInterval(()=>{let t=Dt(e.readOutputLevelDb());Math.abs(r.outputLevel01-t)<.01||(r.outputLevel01=t,M())},50)},finalize(){n&&=(clearInterval(n),void 0)},setKeyRangeOffset(e){r.keyRangeOffset=e},shiftInstrument(t){let n=i.currentInstrumentIndex;if(n>=0){let{allInstrumentKeys:r}=e,i=r[n+t];i&&e.setInstrument(i,!0)}},shiftOctave(e){a?.flush();let n=r.keyRangeOffset,i=(e===1?kt:Ot)(n,t);i!==void 0&&(a=je(o.setKeyRangeOffset,n,i,500))},setLanguageKey(e){L.isJapaneseEnvironment&&(r.languageKey=e)},setCompactMode(e){r.isCompactMode=e,localStorage.setItem(`wavicle_is_compact_mode`,e?`1`:`0`)},showUsagePanel(){r.usagePanelVisible=!0},hideUsagePanel(){r.usagePanelVisible=!1}};return{state:r,readers:i,actions:o}}function jt(){let e=Ze(),t=Fe(e),n=At(e);return{synthEngine:e,midiInputDriver:t,uiPresenter:n,async initialize(){e.initialize(),n.actions.initialize(),e.setInstrument(e.currentInstrumentKey,!1),await t.initialize()}}}var Q=jt();function Mt(){let e=`wavicle__app_persist_state`;return{load(){let t=localStorage.getItem(e);if(t)try{let{midiInDeviceId:e,currentInstrumentKey:n,instrumentParameters:r,languageKey:i,keyRangeOffset:a}=JSON.parse(t),{synthEngine:o,midiInputDriver:s,uiPresenter:c}=Q;s.allDeviceEntries.some(t=>t.id===e)&&s.selectDevice(e),o.allInstrumentKeys.includes(n)&&o.setInstrument(n,!1);let{volume:l,release:u}=r;P.between(l,0,1)&&P.between(u,0,1)&&(o.setInstrumentParameter(`volume`,l),o.setInstrumentParameter(`release`,u)),(i===`en`||i===`ja`)&&c.actions.setLanguageKey(i);let d=I.octaveSelectionKeyUnitOffsets[0],f=I.octaveSelectionKeyUnitOffsets[I.octaveSelectionKeyUnitOffsets.length-1];P.between(a,d,f)&&c.actions.setKeyRangeOffset(a)}catch{console.log(`failed to load persist state`)}},save(){let{synthEngine:t,midiInputDriver:n,uiPresenter:r}=Q,i=n.currentDeviceId,{currentInstrumentKey:a,instrumentParameters:o}=t,{state:{languageKey:s,keyRangeOffset:c}}=r,l={midiInDeviceId:i,currentInstrumentKey:a,instrumentParameters:o,languageKey:s,keyRangeOffset:c};localStorage.setItem(e,JSON.stringify(l))}}}var Nt=Mt();function Pt(){let e=Q.synthEngine;R?.completeSetup({unitAspects:{unitType:`instrument`,categoryHint:`synthesizer`,viewSize:[700,394]},noteInput:{noteOn(t,n){e.noteOn(t,n),M()},noteOff(t,n){e.noteOff(t,n),M()}},persistence:{emitState(){let{currentInstrumentKey:t,instrumentParameters:n}=e;return{currentInstrumentKey:t,instrumentParameters:n}},applyState(t){let{currentInstrumentKey:n,instrumentParameters:r}=t,{volume:i,release:a}=r;e.allInstrumentKeys.includes(n)&&e.setInstrument(n,!1),P.between(i,0,1)&&P.between(a,0,1)&&(e.setInstrumentParameter(`volume`,i),e.setInstrumentParameter(`release`,a)),we()}}})}var Ft=A`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #app {
    height: 100%;
  }
  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: 16px;
    font-weight: normal;
  }

  ul,
  li {
    list-style: none;
  }
`,It=20;function Lt(e){let t=e/19;return t<=.4?`hsl(84deg 100% 52%)`:t<=.9?`hsl(${P.lerpMap(t,.4,.9,84,0)}deg 100% 52%)`:`hsl(0deg 100% 52%)`}var Rt=({level:e})=>{let t=Math.round(Math.max(0,Math.min(1,e))*It);return j(E(`div`,{class:`gauge`},Array.from({length:It},(e,n)=>{let r=n<t;return E(`div`,{class:r?`segment active`:`segment`,style:{background:r?Lt(n):void 0}})})),A`
      width: 150px;
      height: 28px;
      padding: 3px;
      display: flex;
      gap: 2px;
      background: #1b1b1b;
      border-radius: 2px;
      overflow: hidden;

      .segment {
        flex: 1 1 0;
        height: 100%;
        background: #1b1b1b;
        border-radius: 1px;
        transition: background-color 0.1s ease-out;
      }

      .segment.active {
        box-shadow: inset 0 0 0 1px #fff3;
      }
    `)},zt=()=>{let{state:{isCompactMode:e},actions:{setCompactMode:t}}=Q.uiPresenter;return j(E(`div`,null,E(gt,{iconSpec:e?`ph-arrows-out-simple`:`ph-arrows-in-simple`,size:45,onClick:()=>t(!e),class:e&&`--active`})),A`
    `)},Bt=()=>{let{allInstrumentKeys:e,currentInstrumentKey:t,setInstrument:n,isLoadingSamples:r}=Q.synthEngine,{state:{languageKey:i},readers:{canShiftInstrumentPrev:a,canShiftInstrumentNext:o},actions:{shiftInstrument:s}}=Q.uiPresenter,c=K(),l=e.map(e=>({value:e,label:Pe(e,i)}));return j(E(`div`,null,E(`div`,{class:`head-row`},E(Z,{text:c.instrument})),E(`div`,{class:`second-row`},E(ht,{options:l,value:t,onChange:e=>{n(e,!0)},width:130}),E(bt,{isLoading:r})),E(`div`,{class:`buttons-row`},E(Tt,{canGoPrev:a,canGoNext:o,onShift:s}))),A`
      display: flex;
      flex-direction: column;
      > .head-row {
        display: flex;
      }
      > .second-row {
        margin-top: 2px;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      > .buttons-row {
        margin-top: 9px;
      }
    `)},Vt=()=>{let{readers:{canShiftInstrumentPrev:e,canShiftInstrumentNext:t},actions:{shiftInstrument:n}}=Q.uiPresenter;return E(Et,{canGoPrev:e,canGoNext:t,onShift:n})},Ht=()=>{let{allInstrumentKeys:e,currentInstrumentKey:t,setInstrument:n,isLoadingSamples:r}=Q.synthEngine,{state:{languageKey:i}}=Q.uiPresenter,a=K(),o=e.map(e=>({value:e,label:Pe(e,i)}));return j(E(`div`,null,E(`div`,{class:`head-row`},E(Z,{text:a.instrument}),E(bt,{isLoading:r})),E(`div`,{class:`second-row`},E(ht,{options:o,value:t,onChange:e=>{n(e,!0)},width:172,height:44,fontSize:18})),E(`div`,{class:`buttons-row`})),A`
        > .head-row {
          display: flex;
        }
        > .second-row {
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
    `)},Ut=()=>{let{bottomNoteNumber:e,numKeys:t}=I,{holdNoteNumbers:n}=Q.synthEngine,{state:{keyRangeOffset:r,keysRangeSize:i},actions:{setKeyRangeOffset:a}}=Q.uiPresenter;return j(E(`div`,null,E(pt,{unitWidth:10,height:33,bottomNoteNumber:e,numKeys:t,holdNoteNumbers:n,showCenterCMark:!1,isMainKeys:!1}),E(`div`,{class:`cover`},E(mt,{unitWidthPx:10,heightPx:33,bottomNoteNumber:e,numKeys:t,activeRangeOffsetU:r,activeRangeSizeU:i,onScrollActiveRange:a}))),A`
      position: relative;
      > .cover {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
      }
    `)},Wt=()=>{let{bottomNoteNumber:e,numKeys:t}=I,{holdNoteNumbers:n,noteOn:r,noteOff:i}=Q.synthEngine,{state:{keyRangeOffset:a,keysRangeSize:o}}=Q.uiPresenter,s=I.mainKeyUnitWidth;return j(E(Qe,{unitWidthPx:s,heightPx:254,activeRangeOffsetU:a,activeRangeSizeU:o},E(pt,{unitWidth:s,height:254,bottomNoteNumber:e,numKeys:t,holdNoteNumbers:n,onKeyHoldEvent:e=>{e.hold?r(e.noteNumber):i(e.noteNumber)},labelOptions:void 0,showCenterCMark:!1,isMainKeys:!0})),A`
      border-top: solid ${2}px #0004;
      border-left: solid ${3}px #0004;
      border-right: solid ${3}px #fff6;
      padding-bottom: 8px;
    `)},Gt=()=>{let{readers:{canShiftKeysOffsetLower:e,canShiftKeysOffsetHigher:t},actions:{shiftOctave:n}}=Q.uiPresenter;return E(Tt,{canGoPrev:e,canGoNext:t,onShift:n})},Kt=()=>{let{instrumentParameters:e,setInstrumentParameter:t}=Q.synthEngine,n=K();return j(E(`div`,null,E(`div`,null,E(Z,{text:n.volume}),E(xt,{value:e.volume,onChange:e=>t(`volume`,e),size:50})),E(`div`,null,E(Z,{text:n.release}),E(xt,{value:e.release,onChange:e=>t(`release`,e),size:50}))),A`
      display: flex;
      gap: 15px;
      > div {
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `)},qt=()=>j(E(`div`,null,E(wt,{size:44,class:`logo`}),E(`h1`,null,`Wavicle`)),A`
        display: flex;
        align-items: center;
        padding: 10px;
        gap: 1px;

        > .logo {
          margin-top: 10px;
        }

        > h1 {
          font-family: ${it};
          margin-top: 5px;
          font-size: 50px;
          line-height: 40px;
        }
    `),Jt=()=>j(E(`div`,null,E(qt,null)),A`
      position: absolute;
      top: 0;
      left: 0;
    `),$=({url:e})=>E(`a`,{href:e,target:`_blank`,rel:`noreferrer`},e),Yt=()=>j(E(`div`,{class:`table`},E(`div`,null,`Piano`),E(`div`,null,E($,{url:`https://freesound.org/people/beskhu/packs/17088/`})),E(`div`,null,`Electric Piano`),E(`div`,null,E($,{url:`https://freesound.org/people/RealRhodesSounds/packs/243/`})),E(`div`,null,`Celesta`),E(`div`,null,E($,{url:`https://freesound.org/people/pjcohen/packs/23108/`})),E(`div`,null,`Guitar`),E(`div`,null,E($,{url:`https://freesound.org/people/Kyster/packs/7398/`})),E(`div`,null,`Synthesizers`),E(`div`,null,E($,{url:`http://soundsphere.jp/arctrax.shtml`}))),A`
      display: grid;
      grid-template-columns: auto 1fr;
      > div {
        margin-right: 15px;
      }
    `),Xt=()=>{let{languageKey:e}=Q.uiPresenter.state,t=e===`en`?`ja`:`en`;return j(E(`div`,null,E(`h1`,null,`Wavicle`),E(`h3`,{lang:`ja`},`概要`),E(`p`,{lang:`ja`},`ブラウザで楽器の音を鳴らせるキーボードアプリです。`),E(`h3`,{lang:`en`},`Overview`),E(`p`,{lang:`en`},`This is a browser-based keyboard application that lets you play instrument sounds.`),E(`h3`,{lang:`ja`},`動作環境`),E(`div`,{lang:`ja`},E(`p`,null,`PCやスマートフォンのブラウザ上で動作します。`),E(`p`,null,`音を鳴らすのにWebAudioを使用していますが、最近のブラウザはどれもWebAudioに対応しているようです。`),E(`p`,null,`ブラウザがWebMIDIに対応していれば、MIDIキーボードで弾いた音を鳴らすことができます。PC版のChrome/Opera/EdgeなどがWebMIDIに対応しています。`)),E(`h3`,{lang:`en`},`Operation Environment`),E(`div`,{lang:`en`},E(`p`,null,`It runs in a browser on any PC or smartphones.`),E(`p`,null,`It uses WebAudio to play sounds, the latest browsers all seem to support WebAudio.`),E(`p`,null,`If your browser supports WebMIDI, you can play sounds by a MIDI keyboard. PC versions of Chrome/Opera/Edge support WebMIDI.`)),E(`h3`,{lang:`ja`},`使い方`),E(`h3`,{lang:`en`},`How to use`),E(`img`,{src:`https://i.gyazo.com/8feafe0f4775d77b5926239fb6fd57bd.png`,alt:`usage`}),E(`div`,{lang:`ja`,class:`usage-block`},E(`h4`,null,`1.音色選択パート`),E(`p`,null,`演奏する音色を選択します。`),E(`h4`,null,`2.パラメータコントロールパート`),E(`p`,null,`音を鳴らすときに適用されるパラメータを調整します。`,E(`br`,null),`'volume'は全体の音量を設定し、これは各音色によらず共通で使われます。`,E(`br`,null),`'release'はキーを離したときの音の余韻の長さを設定するパラメタで、値が大きいほど余韻が長くなります。音色をロードすると音色ごとに規定の値に設定されます。`),E(`h4`,null,`3.オクターブスライダ`),E(`p`,null,`メイン鍵盤で表示する範囲を設定します。ボタンを押すとオクターブオクターブ単位で表示範囲をシフトします。鍵盤のオレンジ色の部分を横方向にドラッグすると、表示範囲を無段階にスクロールできます。`),E(`h4`,null,`4.メイン鍵盤`),E(`p`,null,`鍵盤です。クリックすると音が鳴ります。PCのキーボードでも演奏することができます。PCキーボードのキーがマッピングされる範囲はオクターブスライダを操作したときに自動で変更されます。`),E(`h4`,null,`5.MIDI IN デバイス選択UI`),E(`p`,null,`MIDIデバイスを選択します。WebMIDIに対応している環境でのみこのUIが表示されます。`),E(`h4`,null,`6.言語選択UI`),E(`p`,null,`表示言語を切り替えます。ブラウザの言語に日本語が設定されている場合のみ表示されます。`)),E(`div`,{lang:`en`,class:`usage-block`},E(`h4`,null,`1.Instrument Selection Part`),E(`p`,null,`Select the instrument you want to play.`),E(`h4`,null,`2.Parameters control part`),E(`p`,null,`Adjust the parameters that are applied when a tone is played.`,E(`br`,null),`"volume" parameter sets the overall volume, which is common to all instruments.`,E(`br`,null),`"release" parameter sets the length of the sound's aftertone when the key is released. The higher the value, the longer the duration. When a instrument is loaded, it is set to the predefined value for each instrument.`),E(`h4`,null,`3.Octave slider`),E(`p`,null,`Set the display range of the main keyboard. Pressing the button shifts the display range in octave unit. Drag the orange area horizontally to scroll the display range linearly.`),E(`h4`,null,`4.Main Keyboard`),E(`p`,null,`This is the main keyboard. Clicking on a key to play a tone. You can also play using PC keyboard. Keys on the PC keyboard are automatically mapped according to the octave slider.`),E(`h4`,null,`5.MIDI IN Device Selection UI`),E(`p`,null,`Selects MIDI device. This UI is only available in environments that support WebMIDI.`),E(`h4`,null,`6.Language Selection UI`),E(`p`,null,`Switches the display language. It is available only when the browser language is set to Japanese.`)),E(`h3`,{lang:`ja`},`音の持続について`),E(`p`,{lang:`ja`},`鍵盤を押し続けたときに、音色によって音が持続するものとそうでないものがあります。撥音楽器のような音は鍵盤を弾いたときにワンショットで音を鳴らしています。また、鳴りはじめの音量の立ち上がりが遅い音色などでもループが難しいため音が持続しない設定になっています。`),E(`h3`,{lang:`en`},`About sound sustention`),E(`p`,{lang:`en`},`When a keyboard key is pressed and held down, some tones are sustained while others are not. A sound like a plucked instrument is played in one shot when the keyboard key is pressed. Also, tones that have a slow attack are difficult to loop, so they are configured not to sustain.`),E(`h3`,{lang:`ja`},`クレジット`),E(`h3`,{lang:`en`},`Credits`),E(`div`,{class:`resources-block`},E(`p`,{lang:`ja`},`下記のリソースを音源として使用しています。`),E(`p`,{lang:`en`},`The following resources are used as sound sources.`),E(Yt,null),E(`div`,null,E(`p`,{lang:`ja`},`freesound.orgの音源の一部はCC BY 3.0ライセンスが適用されているものです。`),E(`p`,{lang:`en`},`Some of the sounds on freesound.org are licensed under CC BY 3.0.`),E(`div`,{lang:`en`},E($,{url:`https://creativecommons.org/licenses/by/3.0/deed.en`})),E(`div`,{lang:`ja`},E($,{url:`https://creativecommons.org/licenses/by/3.0/deed.ja`}))),E(`p`,{lang:`ja`},`シンセサイザーの音色は私が以前作ったArcTraxというソフトシンセの音を録音したものです。`),E(`p`,{lang:`en`},`The synthesizer sounds are recorded from ArcTrax, a software synthesizer I made in the past.`)),E(`h3`,{lang:`ja`},`連絡先`),E(`p`,{lang:`ja`},`不具合等がありましたら下記の連絡先にお知らせください。`),E(`h3`,{lang:`en`},`Contact Information`),E(`p`,{lang:`en`},`If you have any problems, please contact to the following address.`),E(`p`,null,`Twitter`,E(`a`,{href:`https://twitter.com/yahiro120`,target:`_blank`,rel:`noreferrer`},`@yahiro120`)),E(`p`,{class:`mail`},`mail: yahiro1200`,E(`img`,{src:`https://i.gyazo.com/e54845878425c702a37b27c14c3587e2.png`,alt:`mail`})),E(`div`,{class:`version`},`version `,I.versionCode)),A`
      padding: 30px 30px;
      font-size: 16px;
      width: 100%;
      max-width: 800px;

      background: #fff;
      position: relative;

      text-size-adjust: none;
      -webkit-text-size-adjust: none;

      touch-action: pan-y;

      *[lang='${t}'] {
        display: none;
      }

      p {
        line-height: 1.5em;
      }

      > h1 {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 20px;
        font-family: ${it};
      }

      > h3 {
        color: #fff;
        background: #47b;
        padding: 6px;
        font-size: 22px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }

      > img {
        width: 100%;
      }

      > .mail {
        display: flex;
        align-items: center;
        gap: 1px;
      }

      > div + div {
        margin-top: 10px;
      }

      > .usage-block {
        margin-top: 10px;
        h4 {
          margin-bottom: 5px;
          color: #008;
          font-size: 18px;
        }
        > * + h4 {
          margin-top: 10px;
        }
      }

      > .resources-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      > .version {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 15px;
        margin: 35px;
      }
    `)},Zt=()=>{let e=`#4ae`,{hideUsagePanel:t}=Q.uiPresenter.actions;return j(E(`div`,null,E(`div`,{class:`panel`},E(`div`,{class:`top-bar`},E(gt,{iconSpec:`ph-x-bold`,size:30,onClick:t})),E(`div`,{class:`content-body`},E(Xt,null)))),A`
      > .panel {
        background: #fff;
        color: #333;
        border: solid 3px ${e};
        border-radius: 4px;

        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        > .top-bar {
          background: ${e};
          height: 40px;
          padding: 0 3px;
          color: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
        }

        > .content-body {
          flex-grow: 1;
          display: flex;
          overflow-x: hidden;
          overflow-y: auto;
          flex-direction: column;
          align-items: center;
          background: #ddd;
        }
      }

      position: absolute;
      width: 100%;
      height: 100%;
      padding: ${L.isPc?`10px`:0};
    `)},Qt=()=>{let{colors:e}=U(),{outputLevel01:t}=Q.uiPresenter.state,n=e.clForeground,r=e.clPanelBody;return j(E(`div`,null,E(`div`,{class:`content`},E(`div`,{class:`top-row`},E(qt,null),E(zt,null)),E(`div`,{class:`main-row`},E(`div`,{class:`selectors-part`},E(Ht,null),E(Vt,{class:`shifter-buttons`})),E(`div`,{class:`controls-part-box`},E(Kt,null),E(Rt,{level:t})))),E(`div`,{class:`cover`})),A`
      position: relative;
      background: ${r};
      border-radius: 2px;
      width: 400px;
      height: 225px;
      font-size: 16px;
      flex-shrink: 0;
      user-select: none;
      color: ${n};
      display: flex;
      justify-content: center;
      align-items: center;

      > .content{
        margin-top: -20px;
        display: flex;
        flex-direction: column;

        > .top-row{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: -8px;
        }

        > .main-row{
          display: flex;
          gap: 30px;

          > .selectors-part {
            display: flex;
            flex-direction: column;
            gap: 10px;
            
          }

          > .controls-part-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 4px;
          }
        }
      }

      > .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        border-top: solid ${3}px #fff3;
        border-left: solid ${3}px #fff4;
        border-bottom: solid ${3}px #0003;
        border-right: solid ${3}px #0004;
      }
    `)},$t=()=>{let{colors:e}=U(),{outputLevel01:t}=Q.uiPresenter.state,n=e.clForeground,r=e.clPanelBody;return j(E(`div`,null,E(`div`,{class:`top-row`},E(Bt,null),E(Kt,null),E(`div`,{class:`top-right-part`},E(zt,null)),E(Jt,null)),E(`div`,{class:`second-row`},E(`div`,{class:`keys-box`},E(Gt,null),E(Ut,null)),E(Rt,{level:t})),E(`div`,{class:`main-keys-row`},E(Wt,null)),E(`div`,{class:`cover`})),A`
      position: relative;
      padding: 15px 15px 0;
      background: ${r};
      border-radius: 2px;
      width: 800px;
      height: 450px;
      font-size: 16px;
      flex-shrink: 0;
      user-select: none;
      color: ${n};

      display: flex;
      flex-direction: column;

      > div {
        /* border: solid 1px #888; */
      }

      > .top-row {
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 10px;
        padding-bottom: 5px;

        > .top-right-part {
          margin-left: 40px;
        }
        margin-bottom: auto;
      }

      > .second-row {
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;

        > .keys-box {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        > .midi-in-part {
          margin-left: auto;
          margin-bottom: 1px;
        }
      }

      > .main-keys-row {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        margin-bottom: 3px;
      }

      > .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        border-top: solid ${3}px #fff3;
        border-left: solid ${3}px #fff4;
        border-bottom: solid ${3}px #0003;
        border-right: solid ${3}px #0004;
      }
    `)},en=()=>{let{languageKey:e,usagePanelVisible:t,isCompactMode:n}=Q.uiPresenter.state,r={...$e,languageKey:e},i=lt(tt,nt);return j(E(et.Provider,{value:r},E(`div`,null,n?E(Ct,{contentWidth:400,contentHeight:225,class:`scaler-box`},E(Qt,null)):E(Ct,{contentWidth:800,contentHeight:450,class:`scaler-box`},E($t,null)),E(Zt,{if:t}))),A`
      width: 100dvw;
      height: 100dvh;
      background: #aaa;
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
      font-family: ${i}, sans-serif;

      > .scaler-box > .bg-plane {
        background: url('./images/marble.png');
        background-size: cover;
        border-radius: 2px;
      }
    `)};async function tn(){console.log(`wavicle ${I.versionCode}`),await Q.initialize(),Nt.load(),Se(Ft),Ee(()=>E(en,null),document.getElementById(`app`)),Pt();let{activateWebAudioOnUserAction:e}=Q.synthEngine;window.addEventListener(`pointerdown`,e),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&Nt.save()}),window.addEventListener(`resize`,Ae(M,100)),window.addEventListener(`contextmenu`,De)}window.addEventListener(`load`,tn);