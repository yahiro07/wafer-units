(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=window;return e.__aluminaGlobal||={rerender:()=>{},asyncRerenderFlag:!1,hookEffectFuncs:[],debug:{nAll:0,nUpdated:0,nPatchCall:0},prevRootVdom:void 0,jsxCreateElementFunction:void 0,asyncLoopInitialized:!1,gHookInstance:void 0,gSheet:void 0,cssTextToClassNameMap:{},seqClassNameIndex:0,classNameIndexTable:{},cssClassNameToTextMap:{}},e.__aluminaGlobal}var t=e();function n(e){let t=e;return{get value(){return t},Provider:({value:e,children:n})=>(t=e,n[0])}}function r(e){return e.value}var i=`http://www.w3.org/2000/svg`,a=[`value`,`selected`,`checked`],o=[`key`,`children`,`if`,`ref`,...a];function s(e,t,n){let r=n?.props||{},i=t.props,a=Object.keys(i).filter(e=>!o.includes(e)).filter(e=>i[e]!==r[e]);Object.keys(r).filter(e=>!o.includes(e)).filter(e=>i[e]===void 0).forEach(t=>{let n=r[t];t.startsWith(`on`)&&typeof n==`function`?e[t.toLocaleLowerCase()]=void 0:e.removeAttribute(t)}),a.forEach(n=>{let r=t.props[n];r===!1||r==null?e.removeAttribute(n):n.startsWith(`on`)&&typeof r==`function`?e[n.toLocaleLowerCase()]=r:e.setAttribute(n,r?.toString()||``)}),!n?.marker&&t.marker&&e.setAttribute(`data-fc`,t.marker)}function c(e){return e.replace(/[A-Z]/g,e=>`-`+e.charAt(0).toLowerCase())}function l(e){return Object.keys(e).map(t=>{let n=e[t];return`${c(t)}:${n};`}).join(` `)}function u(e,n){if(typeof n==`string`&&e){for(let n in e)if(n.startsWith(`on`)){let r=e[n];delete e[n];let i=n.toLowerCase();e[i]=r?(...e)=>{r?.(...e),t.rerender()}:void 0}if(e.class||e.className){let t=[...Array.isArray(e.class)?e.class:[e.class],e.className].filter(e=>!!e).join(` `);delete e.className,e.class=t}e.style&&typeof e.style==`object`&&(e.style=l(e.style))}}function d(){return{holders:[],index:0,pendingEffectHolders:[]}}function f(e,t){if(!e||!t)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!0;return!1}function p(){let e=t.gHookInstance;if(!e)throw Error(`hook functions called outside render context`);let n=e,r=n.holders[n.index],i=!1;return r||(r=n.holders[n.index]={},i=!0),n.index++,{holder:r,first:i}}function m(e){let{holder:t,first:n}=p();n&&(t.value=e,t.setValue=e=>{typeof e==`function`?t.value=e(t.value):t.value=e});let{value:r,setValue:i}=t;return[r,i]}function h(e){let[t]=m(`call`in e?e():e);return t}function g(e,n){let{holder:r}=p();f(r.deps,n)&&(r.effectFunc=e,r.deps=n,t.gHookInstance.pendingEffectHolders.push(r))}function _(){let{holder:e,first:t}=p();return t&&(e.refObject={current:void 0}),e.refObject}function v(e){e.index=0,t.gHookInstance=e}function y(){t.gHookInstance=void 0}function b(e,n=!1){(n?e.holders:e.pendingEffectHolders).forEach(e=>{if(e.cleanupFunc&&=(e.cleanupFunc(),void 0),e.effectFunc){let n=e.effectFunc();n&&typeof n==`function`&&(e.cleanupFunc=n),t.asyncRerenderFlag=!0,e.effectFunc=void 0}}),e.pendingEffectHolders=[]}var x=Promise.resolve();function ee(e){x.then(e)}function S(e){return Array.isArray(e)?e.filter(e=>!!e).join(` `):e}function C(e){let t=e.name;return{name:t,mount(n,r){return n.fcsig=t,n.hook=d(),n.renderWithHook=r=>{v(n.hook);let i=e(r);if(i&&(i.marker=`${t}`),r.class&&i&&(i.vtype===`vElement`||i.vtype===`vComponent`)){let e=S(r.class);i.props.class=i.props.class?`${i.props.class} ${e}`:e}return y(),ee(()=>b(n.hook)),i},n.renderWithHook(r)},update(e,t){return e.renderWithHook(t)},unmount(e){b(e.hook,!0)}}}function te(e){return e.__AluminaFunctionComponentWrapper||=C(e),e.__AluminaFunctionComponentWrapper}function w(e){return{vtype:`vBlank`,debugSig:`blank__${e}`}}function ne(e){return{vtype:`vText`,text:e,debugSig:`text__${e}`}}function re(e,t,n){return{vtype:`vElement`,tagName:e,props:t,children:n,debugSig:`${e}__${n.length}`}}function ie(e,t,n){return{vtype:`vComponent`,componentWrapper:e,props:t,children:n,debugSig:`${e.name}`,state:{}}}function ae(e){if(e.some(e=>Array.isArray(e))){let t=[];for(let n of e)Array.isArray(n)?t.push(...n):t.push(n);return t}return e}function oe(e){return(Array.isArray(e)?ae(e):[e]).map(e=>e==null||e===!1?w(e):typeof e==`string`||typeof e==`number`||typeof e==`boolean`?ne(e.toString()):e)}function se(e){return`children`in e?oe(e.children):[]}function ce(e,t){if(t&&`if`in t&&!t.if)return w(null);if(e===le)return{vtype:`vFragment`,children:se(t)};u(t,e),typeof e==`function`&&(e=te(e));let n=se(t);return t={...t,children:n},typeof e==`object`?ie(e,t,n):re(e,t,n)}function T(e,t,...n){return t||={},n.length>0?ce(e,{...t,children:n}):ce(e,t)}function le(){}function E(e){e||console.log(`assertion failed`)}function D(e,t,n=null){let r;if(t.vtype===`vBlank`)r=document.createComment(`NULL`),e.insertBefore(r,n);else if(t.vtype===`vText`)r=document.createTextNode(t.text),e.insertBefore(r,n);else if(t.vtype===`vElement`){r=t.tagName===`svg`||e instanceof SVGElement?document.createElementNS(i,t.tagName):document.createElement(t.tagName),s(r,t,void 0),t.children.forEach(e=>D(r,e));let o=t.props.ref;o&&typeof o==`object`&&(o.current=r),e.insertBefore(r,n),a.forEach(e=>{let n=t.props[e];n!==void 0&&(r[e]=n)})}else if(t.vtype===`vComponent`){t.state.componentState={};let i=t.componentWrapper.mount(t.state.componentState,t.props)||w(null);t.state.renderRes=i,r=D(e,i,n)}else if(t.vtype===`vFragment`)r=e,t.children.forEach(e=>D(r,e,n));else throw Error(`invalid vnode ${t}`);return t.dom=r,r}function O(e,t){if(t.vtype===`vBlank`)e.removeChild(t.dom);else if(t.vtype===`vText`)e.removeChild(t.dom);else if(t.vtype===`vElement`){let n=t.dom;t.children.forEach(e=>O(n,e)),e.removeChild(n)}else if(t.vtype===`vComponent`)O(e,t.state.renderRes),t.state.renderRes=void 0,t.componentWrapper.unmount(t.state.componentState);else if(t.vtype===`vFragment`){let e=t.dom;t.children.forEach(t=>O(e,t))}else throw Error(`invalid vnode ${t}`);t.dom=void 0}function ue(e,t,n){t.state.componentState=n.state.componentState;let r=n.state.renderRes,i=t.componentWrapper.update(t.state.componentState,t.props)||w(null);t.state.renderRes=i,k(e,i,r)}function de(e,t,n){if(t.length===n.length)for(let r=0;r<t.length;r++){let i=t[r],a=n[r];k(e,i,a)}else n.forEach(t=>O(e,t)),t.forEach(t=>D(e,t))}function k(e,t,n){if(E(e&&t&&n),E(n.dom),E(!Array.isArray(t)),t===n)t.dom=n.dom;else if(t.vtype===`vBlank`&&n.vtype===`vBlank`)t.dom=n.dom;else if(t.vtype===`vText`&&n.vtype===`vText`){let e=n.dom;t.text!==n.text&&(e.nodeValue=t.text),t.dom=e}else if(t.vtype===`vComponent`&&n.vtype===`vComponent`&&t.componentWrapper===n.componentWrapper)ue(e,t,n),t.dom=n.dom;else if(n.dom instanceof Element&&t.vtype===`vElement`&&n.vtype===`vElement`&&t.tagName===n.tagName){let e=n.dom;s(e,t,n),de(e,t.children,n.children),t.dom=e,a.forEach(r=>{let i=n.props[r],a=t.props[r];(a!==i||t.children.length!==n.children.length)&&(e[r]=a)})}else if(t.vtype===`vFragment`&&n.vtype===`vFragment`){let e=n.dom;de(e,t.children,n.children),t.dom=e}else if(t.vtype!==n.vtype||n.vtype===`vElement`&&t.vtype===`vElement`&&n.tagName!==t.tagName||n.vtype===`vComponent`&&t.vtype===`vComponent`&&t.componentWrapper!==n.componentWrapper){let r=n.dom?.nextSibling||null;n.vtype===`vFragment`&&(r=n.children[n.children.length-1].dom?.nextSibling||null),O(e,n),D(e,t,r)}else console.log(`invalid condition`)}function fe(e,n){let r=t.prevRootVdom;r?k(n,e,r):D(n,e),t.prevRootVdom=e}var pe=/(?:([A-Z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,me=/\/\*[\s\S]*?\*\/|\s{2,}|\n/gm,he=e=>{let t=[{}],n;for(;n=pe.exec(e.replace(me,``));)n[4]&&t.shift(),n[3]?t.unshift(t[0][n[3]]=t[0][n[3]]||{}):n[4]||(t[0][n[1]]=n[2]);return t[0]},A=(e,t)=>{let n=``,r=``,i=``,a;for(let o in e){let s=e[o];if(typeof s==`object`)a=t?t.replace(/([^,])+/g,e=>o.replace(/([^,])+/g,t=>/&/g.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):o,o[0]===`@`?o[1]===`f`?r+=A(s,o):r+=o+`{`+A(s,o[1]===`k`?``:t)+`}`:r+=A(s,a);else if(o[0]===`@`&&o[1]===`i`)n=o+` `+s+`;`;else{let e=A.p;i+=e?e(o.replace(/[A-Z]/g,`-$&`).toLowerCase(),s):o.replace(/[A-Z]/g,`-$&`).toLowerCase()+`:`+s+`;`}}return i[0]?(a=t?t+`{`+i+`}`:i,n+a+r):n+r},ge=(e,n)=>{let{classNameIndexTable:r}=t,i=r[e];return i===void 0&&(i=r[e]=t.seqClassNameIndex++),n?`cs${i}_${n}`:`cs${i}`};function _e(){let{gSheet:e}=t;return e||(e=document.createElement(`style`),e.innerHTML=` `,e.id=`alumina_css_in_js`,document.head.appendChild(e),t.gSheet=e),e.firstChild}function ve(e){let t=_e(),n=e.replace(/label:.+?;/g,``);t.data.includes(n)||(t.data+=n)}function ye(e){return e.match(/label: (.+);/)?.[1]}function be(e,n){let r=``,i=0,{cssClassNameToTextMap:a}=t;for(i=0;i<n.length;i++){r+=e[i];let t=n[i].toString();a[t]&&(t=a[t]),r+=t}return r+=e[i],r}function j(e,...n){let{cssTextToClassNameMap:r,cssClassNameToTextMap:i}=t,a=be(e,n);if(r[a])return r[a];let o=ge(a,ye(a));return ve(A(he(a),`.${o}`)),r[a]=o,i[o]=a,o}function xe(e){let{cssClassNameToTextMap:n}=t,r=n[e];r&&ve(A(he(r),``))}function Se(e){t.jsxCreateElementFunction=e}new Proxy({},{get:(e,n)=>(...e)=>{let r=j(...e);return e=>{let i=[r,e.className||``].join(` `),{jsxCreateElementFunction:a}=t;return a(n,{...e,className:i})}}});function M(e,t){return t&&(e.props.class?e.props.class+=` `+t:e.props.class=t),e}Se(T);function N(){t.asyncRerenderFlag=!0}function Ce(){if(!t.asyncLoopInitialized){let e=()=>{t.asyncRerenderFlag&&=(t.rerender(),!1),requestAnimationFrame(e)};e(),t.asyncLoopInitialized=!0}}function we(e,n){let r=()=>{fe(e(),n),t.hookEffectFuncs.forEach(e=>e()),t.hookEffectFuncs=[]};t.rerender=r,r(),Ce()}var P={versionCode:`v220907`,bottomNoteNumber:24,numKeys:85,activeKeyRangeUnitOffsetDefault:14,activeKeyRangeUnitSize:15,mainKeyUnitWidth:50,octaveSelectionKeyUnitOffsets:[0,7,14,21,28,35]},F={isJapaneseEnvironment:!1,isWebMidiSupported:!1,isMobile:!1,get isPc(){return!F.isMobile}};F.isMobile&&(P.activeKeyRangeUnitSize=10,P.mainKeyUnitWidth=75);var Te=[[`piano`,`Piano`,`ピアノ`],[`elepi`,`Electric Piano`,`エレピ`],[`celesta`,`Celesta`,`チェレスタ`],[`guitar`,`Guitar`,`ギター`],[`bell`,`Bell`,`ベル`],[`ocarina`,`Ocarina`,`オカリナ`],[`bass1`,`Bass1`,`ベース1`],[`bass2`,`Bass2`,`ベース2`],[`pluck1`,`Pluck1`,`プラック1`],[`pluck2`,`Pluck2`,`プラック2`],[`pluck3`,`Pluck3`,`プラック3`],[`pluck4`,`Pluck4`,`プラック4`],[`brass1`,`Brass1`,`ブラス1`],[`brass2`,`Brass2`,`ブラス2`],[`lead1`,`Lead1`,`リード1`],[`lead2`,`Lead2`,`リード2`],[`lead3`,`Lead3`,`リード3`],[`lead4`,`Lead4`,`リード4`],[`pad1`,`Pad1`,`パッド1`],[`pad2`,`Pad2`,`パッド2`],[`strings1`,`Strings1`,`ストリングス1`],[`strings2`,`Strings2`,`ストリングス2`],[`orchestra`,`Orchestra`,`オーケストラ`],[`nes`,`NES`,`ファミコン`]],Ee=Te.map(e=>e[0]);function De(e,t){let n=t===`ja`?2:1;return Te.find(t=>t[0]===e)?.[n]||`err`}function I(e,t){let n={x:e.clientX,y:e.clientY},r=e=>{let r={x:e.clientX,y:e.clientY},i={x:r.x-n.x,y:r.y-n.y};t.moveHandler?.(i,e),e.preventDefault()},i=()=>{window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerup`,i),t.upHandler?.()};window.addEventListener(`pointermove`,r),window.addEventListener(`pointerup`,i)}var Oe=e=>e.preventDefault();function ke(e){return t=>{e(t.currentTarget.value)}}function Ae(e,t){return e.length===4?`${e}${(t*15>>0).toString(16)}`:e.length===7?`${e}${(t*255>>0).toString(16).padStart(2,`0`)}`:e}function je(){let e=Date.now();return{next(){let t=Date.now(),n=t-e;return e=t,n}}}function Me(e,t){let n;return(...r)=>{n&&=(clearTimeout(n),void 0),n=setTimeout(()=>e(...r),t)}}var L;(function(e){function t(e,t,n){return(1-n)*e+n*t}e.lerp=t;function n(e,t,n){return e<t?t:e>n?n:e}e.clamp=n;function r(e,t,n,r,i,a){let o=(e-t)/(n-t)*(i-r)+r;if(a){let e=Math.max(r,i),t=Math.min(r,i);if(o>e)return e;if(o<t)return t}return o}e.lerpMap=r;function i(e,t,n){return t<=e&&e<=n}e.between=i})(L||={});var Ne;(function(e){function t(e){return Array(e).fill(0).map((e,t)=>t)}e.seq=t;function n(e,n){return t(n+1-e).map(t=>e+t)}e.range=n;function r(e,t){let n=0;for(;n<e.length;){if(e[n]===t){e.splice(n,1);continue}n++}}e.remove=r})(Ne||={});function Pe(e,t,n,r){let i=Date.now(),a=i+r,o=!1,s=()=>{if(o)return;let r=Date.now();if(r>+a)e(n),o=!0;else{let o=1-(1-L.lerpMap(r,i,a,0,1,!0))**2;e(L.lerpMap(o,0,1,t,n)),requestAnimationFrame(s)}N()};return s(),{flush(){o||=(e(n),!0)}}}function Fe(e){let t=window;return t.checkUnitInterfaceCompatibility?.(e),t?.unitInterface}var R=Fe(`wus-v02`);function Ie(e){R?.completeSetup({unitAspects:{unitType:`instrument`,categoryHint:`synthesizer`,outputs:[`audio`],inputs:[`note`]},primaryInputPortHandlers:{noteInput:{noteOn(t){e.noteOn(t),N()},noteOff(t){e.noteOff(t),N()}}}})}function Le(e){return{async initialize(){},get allDeviceEntries(){return[]},get currentDeviceId(){return``},selectDevice(e){}}}function z(e,t,n,r){for(let i=0;i<r;i++){let r=n+i;e[r]=t[r]}}function Re(e,t,n,r){for(let i=0;i<n;i++){let n=t+i;e[n]*=r}}function B(e,t,n){let r=t*n;return e.slice(r,r+t)}function ze(e,t,n,r){let i=e.sampleRate,a=t,o=r.createBuffer(2,i*a,i),s=e.getChannelData(0),c=e.getChannelData(1),l=o.getChannelData(0),u=o.getChannelData(1),d=B(s,i*a,n),f=B(c,i*a,n);return z(l,d,0,i*a),z(u,f,0,i*a),o}function V(e){let{srcBuf:t,srcOffset:n,duration:r,destBuf:i,destOffset:a,v0:o,v1:s}=e;for(let e=0;e<r;e++){let c=L.lerpMap(e,0,r,o,s,!0);i[a+e]+=t[n+e]*c}}function Be(e,t,n,r,i,a=`SL`){let o=e.sampleRate,s=t,c=e.getChannelData(0),l=e.getChannelData(1),u=B(c,o*s,n),d=B(l,o*s,n),f=r.createBuffer(2,o*s,o),p=f.getChannelData(0),m=f.getChannelData(1),h=2**((i-69)/12)*440;if(a===`SL`){let e=.75,t=1/h,n=Math.floor(2/t)*t,r=o*e>>0,i=o*(e+n)>>0,a=o*.01>>0;function s(e,t){z(e,t,0,i-a),V({srcBuf:t,srcOffset:i-a,destBuf:e,destOffset:i-a,duration:a,v0:1,v1:0}),V({srcBuf:t,srcOffset:r-a,destBuf:e,destOffset:i-a,duration:a,v0:0,v1:1})}return s(p,u),s(m,d),{samples:f,loopSpec:{posLoopStart:r,posLoopEnd:i}}}else{let e=.75,t=1/h,n=Math.floor(1/t)*t,r=o*e>>0,i=o*(e+n)>>0,a=o*(e+n*2)>>0,s=o*n>>0,c=s>>1,l=i-c,g=i+c;function _(e,t){z(e,t,0,i),V({srcBuf:t,srcOffset:i,destBuf:e,destOffset:i,duration:s,v0:1,v1:0}),V({srcBuf:t,srcOffset:r,destBuf:e,destOffset:i,duration:s,v0:0,v1:1}),V({srcBuf:t,srcOffset:i,destBuf:e,destOffset:i,duration:c,v0:.5,v1:1}),V({srcBuf:t,srcOffset:g,destBuf:e,destOffset:g,duration:c,v0:1,v1:.5}),V({srcBuf:t,srcOffset:a,destBuf:e,destOffset:i,duration:c,v0:.5,v1:0}),V({srcBuf:t,srcOffset:l,destBuf:e,destOffset:g,duration:c,v0:0,v1:.5}),Re(e,i,s,.667)}return _(p,u),_(m,d),{samples:f,loopSpec:{posLoopStart:i,posLoopEnd:a}}}}function H(e,t){return Array(t).fill(0).map((t,n)=>e+n*12)}function Ve(){return[{instrumentKey:`piano`,sourcePath:`samples/freesound/piano_4s_c0c7.mp3`,sliceDuration:4,noteNumbers:H(24,8),looped:!1,gainAdjustment:1,releaseParam:.5},{instrumentKey:`elepi`,sourcePath:`samples/freesound/rhodes_4s_d1d6.mp3`,sliceDuration:4,noteNumbers:H(38,7),looped:!1,gainAdjustment:1,releaseParam:.7},{instrumentKey:`celesta`,sourcePath:`samples/freesound/celesta_4s_g2g6.mp3`,sliceDuration:4,noteNumbers:H(43,5),looped:!1,gainAdjustment:1,releaseParam:.7},{instrumentKey:`guitar`,sourcePath:`samples/freesound/guitar_4s_e3e6.mp3`,sliceDuration:4,noteNumbers:H(40,4),looped:!1,gainAdjustment:1,releaseParam:.5}]}function He(){return[[`bell`,`steelbell.mp3`,!1,1.5,.9,void 0],[`ocarina`,`sleepy.mp3`,!0,1,.5,`SL`],[`bass1`,`bass2.mp3`,!1,1.4,.5,void 0],[`bass2`,`slidebass.mp3`,!0,1,.2,`SL`],[`pluck1`,`hipluck2.mp3`,!1,1,.5,void 0],[`pluck2`,`pluck1.mp3`,!1,4,.5,void 0],[`pluck3`,`brightkey.mp3`,!1,1,.7,void 0],[`pluck4`,`key_shiny.mp3`,!1,1,.7,void 0],[`brass1`,`trumpet.mp3`,!0,1,.4,`SL`],[`brass2`,`brass2.mp3`,!0,1.4,.5,`XF`],[`lead1`,`super1.mp3`,!0,.7,.7,`XF`],[`lead2`,`coldwave.mp3`,!0,.8,.5,`XF`],[`lead3`,`lead_bright.mp3`,!0,.4,.7,`XF`],[`lead4`,`finale.mp3`,!0,.8,.5,`XF`],[`pad1`,`softkey.mp3`,!1,1,.8,void 0],[`pad2`,`pad2.mp3`,!0,1,.7,`XF`],[`strings1`,`gradient.mp3`,!0,.8,.8,`XF`],[`strings2`,`slowstrings.mp3`,!1,1,.8,void 0],[`orchestra`,`grandwave.mp3`,!0,1,.8,`XF`],[`nes`,`chipwave.mp3`,!0,1,.4,`SL`]].map(e=>{let[t,n,r,i,a,o]=e;return{instrumentKey:t,pitched:!0,sourcePath:`samples/arctrax/${n}`,sliceDuration:4,noteNumbers:[33,45,57,69,81,93],looped:r,gainAdjustment:i,releaseParam:a,loopingMethod:o}})}async function Ue(e,t){let n=t.split(`/`).pop();console.log(`fetching ${n}`);let r=await(await fetch(t)).arrayBuffer();if(r.byteLength===0)throw Error(`invalid audio resource: ${t}`);return e.decodeAudioData(r)}async function We(e,t){let n=await Ue(t,e.sourcePath);return{sampleSources:e.noteNumbers.map((r,i)=>{if(e.looped){let{samples:a,loopSpec:o}=Be(n,e.sliceDuration,i,t,r,e.loopingMethod);return{noteNumber:r,samples:a,loopSpec:o}}else return{noteNumber:r,samples:ze(n,e.sliceDuration,i,t)}}),gainAdjustment:e.gainAdjustment,releaseParam:e.releaseParam}}var Ge={};async function Ke(e,t){return Ge[e.instrumentKey]||=await We(e,t)}function qe(e){let t=[...Ve(),...He()],n=Ee.map(e=>{let n=t.find(t=>t.instrumentKey===e);if(!n)throw Error(`instrument definition not found for ${e}`);return n});return{allInstrumentKeys:Ee,loadInstrument(t){let r=n.find(e=>e.instrumentKey===t);if(!r)throw Error(`instrument definition not found for ${t}`);return Ke(r,e)},async preloadAllInstrumentSamples(){await Promise.all(n.map(t=>Ke(t,e)))}}}function Je(e,t){let n=t.map(t=>Math.abs(t.noteNumber-e)),r=Math.min(...n);return t[n.indexOf(r)]}function Ye(e,t,n,r,i,a){let o=e.sampleRate,s=Je(t,n),c=2**((t-s.noteNumber)/12),l=e.createBufferSource();l.buffer=s.samples,l.playbackRate.value=c;let{loopSpec:u}=s;u&&(l.loop=!0,l.loopStart=u.posLoopStart/o,l.loopEnd=u.posLoopEnd/o);let d=!!u,{volume:f,release:p}=r,m=f*i,h=p*p*3e3,g=e.createGain();g.gain.value=m,l.connect(g).connect(a);let _=s.samples.duration/c*1e3,v=!0,y=0,b=0;function x(t,n,r){g.gain.setValueAtTime(t,e.currentTime);let i=e.currentTime+r/1e3;g.gain.linearRampToValueAtTime(n,i)}let ee=()=>{l.start(0),b=0},S=()=>{v=!1,y=0,x(m,0,h)},C=()=>{l.stop(),l.disconnect()};return{noteOn:ee,noteOff:S,update:e=>!v&&(y+=e,y>h)||(b+=e,!d&&b>_)?(C(),!0):!1,forceStop:()=>{v=!1,y=0,h=Math.min(h,50),x(g.gain.value,0,h)}}}function Xe(){let e={},t=je();return{noteOn(t,n){let r=e[t];r&&(r.forceStop(),delete e[t]),n.noteOn(),e[t]=n},noteOff(t){let n=e[t];n&&n.noteOff()},updateVoices(){let n=t.next();for(let t in e){let r=e[t];r&&r.update(n)&&delete e[t]}}}}function Ze(e){return`note-${e}`}function Qe(){let e=R?.audioContext??new AudioContext,t=qe(e),{allInstrumentKeys:n}=t,r=Xe(),i=e.createGain(),a=e.createDynamicsCompressor(),o=e.createAnalyser(),s=new Float32Array(o.fftSize);i.connect(a).connect(o).connect(R?.primaryOutputPort.audioOutput.node??e.destination);let c,l=1,u=!1,d,f=n[0],p=!1,m=!1,h=[],g={volume:.5,release:.4};function _(){i.gain.value=l}function v(){o.getFloatTimeDomainData(s);let e=0;for(let t of s)e+=t*t;let t=Math.sqrt(e/s.length);return t<=0?-80:Math.max(-80,Math.min(0,20*Math.log10(t)))}let y={allInstrumentKeys:t.allInstrumentKeys,get masterVolume(){return l},setMasterVolume(e){l=e,_()},get currentInstrumentKey(){return f},get webAudioInitialized(){return p},get noteReceived(){return m},instrumentParameters:g,holdNoteNumbers:h,setInstrumentParameter(e,t){g[e]=t},initialize(){_(),c=setInterval(()=>r.updateVoices(),50)},activateWebAudioOnUserAction(){p||(e.resume(),p=!0,console.log(`web audio started`),N())},readOutputLevelDb(){return v()},get isLoadingSamples(){return u},async preloadAllInstrumentSamples(){return t.preloadAllInstrumentSamples()},async setInstrument(e,n){f=e,u=!0;let r=await t.loadInstrument(e);u=!1,f===e&&(d=r,n&&y.setInstrumentParameter(`release`,d.releaseParam),N())},noteOn(t,n){if(!d||u)return;let a=Ze(t),{sampleSources:o,gainAdjustment:s}=d,c=Ye(e,t,o,g,s,i);r.noteOn(a,c),h.push(t),m=!0},noteOff(e){let t=Ze(e);r.noteOff(t),Ne.remove(h,e)},finalize(){c&&=(clearInterval(c),void 0)}};return y}var $e=({unitWidthPx:e,heightPx:t,activeRangeOffsetU:n,activeRangeSizeU:r,children:i})=>{let a=e*r,o=-n*e;return M(T(`div`,null,T(`div`,{class:`inner`},i)),j`
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
    `)},et={languageKey:`en`,colors:{clPanelBody:`#aceefe88`,clForeground:`#fff`,clControlHighlight:`#0AF`,systemMessage:`#F08`}},tt=n(et);function U(){return r(tt)}var W=`0.25s`,G=j`
  transition: all ${W} linear;
`,nt=`Roboto`,rt=`'Noto Sans JP'`,it=`'M PLUS 1p'`,at=`Orbitron, sans-serif`,ot=`Oxanium, sans-serif`,st=`${it}, sans-serif`,ct=`Play, sans-serif`,lt=`Play`;function ut(e,t){let{languageKey:n}=U();return n===`ja`?t:e}function dt(e,t){let{languageKey:n}=U();return n===`ja`?t:e}var ft={en:{instrument:`instrument`,volume:`volume`,release:`release`,midiIn:`MIDI IN`,none:`none`,msgNeedTapSomewhereToEnableAudioOutput:`Click somewhere to enable audio output.`},ja:{instrument:`音色`,volume:`音量`,release:`余韻`,midiIn:`MIDI IN`,none:`なし`,msgNeedTapSomewhereToEnableAudioOutput:`画面のどこかをクリックすると、オーディオ出力が有効になります。`}};function K(){let{languageKey:e}=Q.uiPresenter.state;return ft[e]}var q;(function(e){let t=.1,n=[0,1-t,1,2.1,2,3,4-t,4,5,5,6.1,6];function r(e,t){let r=e/12>>0,i=n[e%12];return t&&(i=Math.round(i)),r*7+i}e.getKeyOffsetInUnits=r;function i(e,t){return Math.floor(t+e*12/7)}e.getNoteNumberFormKeyOffset=i;let a=[1,3,6,8,10];function o(e){let t=e%12;return a.includes(t)}e.checkBlackKey=o;function s(e,t){let n=r(e,!0);return r(e+t,!0)-n}e.getKeysOuterWidthU=s})(q||={});function pt(e,t){if(!t)return;let n=e-t.rootNoteNumber;return t.labels[n]}var mt=({unitWidth:e,height:t,bottomNoteNumber:n,numKeys:r,holdNoteNumbers:i,onKeyHoldEvent:a,labelOptions:o,showCenterCMark:s,isMainKeys:c})=>{let l=`#f80b`,{getKeyOffsetInUnits:u,getKeysOuterWidthU:d,checkBlackKey:f}=q,p=Ne.range(n,n+r-1),m=u(n,!0),g=t*.63,_=e*.65,v=e*d(n,r)+1,y=h({playingNoteNumber:void 0}),b=e=>{a?.({noteNumber:e,hold:!0}),y.playingNoteNumber=e},x=()=>{y.playingNoteNumber&&(a?.({noteNumber:y.playingNoteNumber,hold:!1}),y.playingNoteNumber)},ee=(e,t)=>{b(t),I(e,{moveHandler(e,t){let n=document.elementFromPoint(t.clientX,t.clientY);if(n?.classList.contains(`keyblocks-playable-key`)){let e=parseInt(n.dataset.noteNumber||``);isFinite(e)&&e!==y.playingNoteNumber&&(x(),b(e),N())}},upHandler(){x(),N()}})},S=!!a,C=e/10>>0,te=`0 0 ${C}px ${C}px`,w=!!o;return M(T(`div`,null,p.map(t=>{let n=f(t),r=(u(t)-m)*e,a=i?.includes(t),c=pt(t,o),l=t===60&&s;return T(`div`,{key:t,class:[`key`,n&&`--black`,a&&`--hold`,S&&`--can-play`,S&&`keyblocks-playable-key`],style:{left:`${r}px`},onPointerDown:S&&(e=>ee(e,t))||void 0,onTouchStart:Oe,"data-note-number":t},T(`div`,{if:l,class:`center-c-mark`}),T(`div`,{if:c,class:`label`},c))}),T(`div`,{class:`cover`,if:c})),j`
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
        font-family: ${ct};
        font-size: 14px;
        color: ${l};

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: ${te};

        &.--black {
          background-color: #000;
          background-image: url('./images/black_key_texture.svg');
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
          margin-bottom: ${c&&!w?`10px`:`2px`};
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
    `)},ht=({unitWidthPx:e,heightPx:t,bottomNoteNumber:n,numKeys:r,activeRangeOffsetU:i,activeRangeSizeU:a,onScrollActiveRange:o})=>{let s=q.getKeysOuterWidthU(n,r),c=e*s,l=i*e,u=a*e;return M(T(`div`,null,T(`div`,{class:`inner`,onPointerDown:t=>{I(t,{moveHandler(t){o(L.clamp(i+t.x/e,0,s-a)),N()}})}})),j`
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
    `)},gt=({options:e,value:t,onChange:n,width:r,height:i,fontSize:a,disabled:o})=>{let s={...r?{width:`${r}px`}:{},...i?{height:`${i}px`}:{},...a?{fontSize:`${a}px`}:{}},c=U().colors.clControlHighlight;return M(T(`select`,{value:e.length>0?t:``,onChange:ke(n),disabled:o,onKeyDown:e=>e.preventDefault(),style:s},e.map((e,t)=>{let n=typeof e==`string`?e:e.value,r=typeof e==`string`?e:e.label;return T(`option`,{value:n,key:t},r)})),j`
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

      font-family: ${ut(lt,it)},
        'sans-serif';

      font-size: ${dt(`16px`,`14px`)};

      ${G};
      &:hover {
        border-color: ${c};
      }
    `)},J=e=>j`
  font-size: ${e?`${e}px`:`inherit`};
`,Y=({spec:e,size:t})=>{if(e.startsWith(`ri-`)||e.startsWith(`ph-`))return T(`i`,{class:[e,J(t)]});if(e.startsWith(`fa-`))return T(`i`,{class:[e,J(t&&t*.85>>0)]});if(e.startsWith(`ti-`))return T(`i`,{class:[`ti`,e,J(t)]});if(e.startsWith(`bi-`))return T(`i`,{class:[`bi`,e,J(t&&t*.9>>0)]});if(e.startsWith(`mi `)){let n=e.replace(`mi `,``);return T(`i`,{class:[`material-icons`,J(t)]},n)}if(e.startsWith(`mso `)){let n=e.replace(`mso `,``);return T(`span`,{class:[`material-symbols-outlined`,J(t)]},n)}return T(`div`,null,`invalid iconSpec: `,e)},_t=({iconSpec:e,size:t,onClick:n,disabled:r})=>{let i=U().colors.clForeground;return M(T(`div`,{class:r&&`--disabled`,onClick:n},T(Y,{spec:e,size:t})),j`
      cursor: pointer;
      ${G}
      color: ${i};

      &:hover {
        opacity: 0.7;
      }

      &.--disabled {
        opacity: 0.5;
      }
    `)},vt=[`settings`,`sliders`,`info`,`play`,`menu`,`edit`,`close`,`power`,`undo`,`star`,`search`],yt=[{libraryName:`font awesome 6`,iconSpecs:{settings:`fa-solid fa-gear`,sliders:`fa-solid fa-sliders`,info:`fa-solid fa-circle-info`,play:`fa-solid fa-play`,menu:`fa-solid fa-bars`,edit:`fa-solid fa-pen-to-square`,close:`fa-solid fa-xmark`,power:`fa-solid fa-power-off`,undo:`fa-solid fa-rotate-left`,star:`fa-solid fa-star`,search:`fa-solid fa-magnifying-glass`}},{libraryName:`material icons`,iconSpecs:{settings:`mi settings`,sliders:`mi tune`,info:`mi info`,play:`mi play_arrow`,menu:`mi menu`,edit:`mi edit`,close:`mi close`,power:`mi power_settings_new`,undo:`mi undo`,star:`mi star`,search:`mi search`}},{libraryName:`material symbols`,iconSpecs:{settings:`mso settings`,sliders:`mso tune`,info:`mso info`,play:`mso play_arrow`,menu:`mso menu`,edit:`mso edit`,close:`mso close`,power:`mso power_rounded`,undo:`mso undo`,star:`mso star`,search:`mso search`}},{libraryName:`bootstrap icons`,iconSpecs:{settings:`bi-gear-fill`,sliders:`bi-sliders`,info:`bi-info-circle`,play:`bi-play-fill`,menu:`bi-list`,edit:`bi-pencil-square`,close:`bi-x`,power:`bi-power`,undo:`bi-arrow-counterclockwise`,star:`bi-star-fill`,search:`bi-search`}},{libraryName:`remix icons`,iconSpecs:{settings:`ri-settings-3-fill`,sliders:`ri-equalizer-fill`,info:`ri-information-line`,play:`ri-play-fill`,menu:`ri-menu-fill`,edit:`ri-edit-fill`,close:`ri-close-line`,power:`ri-shut-down-line`,undo:`ri-arrow-go-back-line`,star:`ri-star-fill`,search:`ri-search-line`}},{libraryName:`tabler icons`,iconSpecs:{settings:`ti-settings`,sliders:`ti-adjustments-horizontal`,info:`ti-info-circle`,play:`ti-player-play`,menu:`ti-menu-2`,edit:`ti-edit`,close:`ti-square-x`,power:`ti-power`,undo:`ti-arrow-back-up`,star:`ti-star`,search:`ti-search`}},{libraryName:`phosphor icons`,iconSpecs:{settings:`ph-gear-fill`,sliders:`ph-sliders-horizontal-bold`,info:`ph-info-bold`,play:`ph-play-fill`,menu:`ph-list-bold`,edit:`ph-pencil-line-fill`,close:`ph-x-bold`,power:`ph-power-bold`,undo:`ph-arrow-counter-clockwise-bold`,star:`ph-star-fill`,search:`ph-magnifying-glass-bold`}}],bt=30;M(T(`table`,null,T(`tbody`,null,yt.map(e=>T(`tr`,{key:e.libraryName},T(`td`,null,e.libraryName),vt.map(t=>T(`td`,{key:t},T(Y,{size:bt,spec:e.iconSpecs[t]}))))))),j`
      font-size: 18px;
      td:first-child {
        text-align: left;
      }
      td {
        padding: 4px;
        text-align: center;
        vertical-align: center;
      }
    `),j`
  color: red;
`;var xt=({isLoading:e})=>M(T(Y,{spec:`ph-spinner`,size:24,class:e&&`--visible`}),j`
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
    `),X=({height:e,asr:t=1.25,children:n,onClick:r,disabled:i})=>{let{colors:a}=U(),o=a.clControlHighlight,s=e*t>>0;return M(T(`div`,null,T(`div`,{onClick:r,class:[`inner`,i&&`--disabled`]},n)),j`
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
            background: ${Ae(o,.5)};
          }
        }

        &.--disabled {
          opacity: 0.4;
        }
      }
    `)},St=({value:e,onChange:t,size:n})=>{let r=U().colors.clControlHighlight,i=`rotate(${L.lerpMap(e,0,1,125,415)})`,a=h({dragging:!1});return M(T(`div`,null,T(`div`,{class:`cover`}),T(`svg`,{viewBox:`-50 -50 100 100`,class:a.dragging&&`--dragging`},T(`circle`,{class:`knob`,cx:0,cy:0,r:49,onPointerDown:n=>{let r=e;a.dragging=!0,I(n,{moveHandler(e){t(L.clamp(r-e.y*.01,0,1)),N()},upHandler(){a.dragging=!1,N()}})}}),T(`circle`,{class:`knob_inner`,cx:0,cy:0,r:40}),T(`g`,{class:`marker`,transform:i},T(`line`,{x1:50*.25,y1:0,x2:45,y2:0})))),j`
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
    `)};function Ct(e,t=16){return e===`ja`?j`
      font-family: ${st};
      font-size: ${t*.9>>0}px;
      display: flex;
      align-items: center;
      height: ${t*1.5>>0}px;
    `:j`
      font-family: ${ot};
      font-size: ${t*1>>0}px;
      height: ${t*1.5>>0}px;
      display: flex;
      align-items: center;
    `}var Z=({text:e})=>{let{languageKey:t}=Q.uiPresenter.state;return M(T(`div`,null,e),j`
      ${Ct(t)};
    `)};j`
  cursor: pointer;
`;var wt=({contentWidth:e,contentHeight:t,children:n})=>{let r=h({scale:1,mh:0,mv:0}),i=_(),a=i.current;if(a){let{clientWidth:n,clientHeight:i}=a;r.scale=Math.min(n/e,i/t),r.mh=Math.max((n-e*r.scale)/2,0),r.mv=Math.max((i-t*r.scale)/2,0)}else N();return g(N,[e,t]),M(T(`div`,{ref:i},T(`div`,{class:[`inner`,`bg-plane`],style:{width:`${e*r.scale}px`,height:`${t*r.scale}px`,marginLeft:`${r.mh}px`,marginTop:`${r.mv}px`}}),T(`div`,{class:`inner`,style:{width:`${e}px`,height:`${t}px`,transform:`scale(${r.scale}, ${r.scale})`,marginLeft:`${r.mh}px`,marginTop:`${r.mv}px`}},n)),j`
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
    `)},Tt=({size:e})=>{let t=U().colors.clForeground;return M(T(`div`,null,T(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 30 30`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,style:`fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;`},T(`g`,{transform:`matrix(1,0,0,1,-410.457,-257.386)`},T(`path`,{d:`M411.064,276.322C412.981,274.63 414.799,273.823 416.523,273.682C419.474,273.442 422.05,275.124 424.166,277.126C426.668,279.492 429.351,281.214 432.286,281.515C433.825,281.673 435.453,281.456 437.179,280.708C434.503,284.436 430.132,286.866 425.197,286.866C418.519,286.866 412.873,282.416 411.064,276.322ZM410.91,268.489C412.884,266.703 414.753,265.856 416.523,265.711C419.474,265.471 422.05,267.154 424.166,269.155C426.668,271.521 429.351,273.243 432.286,273.544C434.613,273.783 437.145,273.165 439.905,271.152C439.926,271.474 439.937,271.799 439.937,272.126C439.937,273.307 439.798,274.456 439.535,275.557C436.964,277.886 434.704,278.747 432.592,278.531C430.27,278.293 428.208,276.819 426.228,274.946C423.496,272.363 420.088,270.382 416.28,270.692C414.447,270.842 412.499,271.514 410.48,272.956C410.464,272.682 410.457,272.405 410.457,272.126C410.457,270.872 410.614,269.653 410.91,268.489ZM413.299,263.427C415.983,259.765 420.314,257.386 425.197,257.386C431.828,257.386 437.442,261.774 439.292,267.803C436.821,269.969 434.637,270.769 432.592,270.56C430.27,270.322 428.208,268.848 426.228,266.975C423.496,264.392 420.088,262.411 416.28,262.721C415.316,262.8 414.32,263.023 413.299,263.427Z`})))),j`
      width: ${e}px;
      height: ${e}px;
      fill: ${t};
    `)},Et=({canGoPrev:e,canGoNext:t,onShift:n})=>M(T(`div`,null,T(X,{height:30,onClick:()=>n(-1),disabled:!e},T(Y,{spec:`ph-caret-left-fill`,size:20})),T(X,{height:30,onClick:()=>n(1),disabled:!t},T(Y,{spec:`ph-caret-right-fill`,size:20}))),j`
      display: flex;
      gap: 6px;
    `),Dt=({canGoPrev:e,canGoNext:t,onShift:n})=>{let r=80/45;return M(T(`div`,null,T(X,{height:45,onClick:()=>n(-1),disabled:!e,asr:r},T(Y,{spec:`ph-caret-left-fill`,size:32})),T(X,{height:45,onClick:()=>n(1),disabled:!t,asr:r},T(Y,{spec:`ph-caret-right-fill`,size:32}))),j`
      display: flex;
      gap: 12px;
    `)};function Ot(e){return L.lerpMap(e,-80,-3,0,1,!0)}function kt(e,t){for(let n=t.length-1;n>=0;n--){let r=t[n];if(r<e)return r}}function At(e,t){return t.find(t=>t>e)}function jt(e){let t=P.octaveSelectionKeyUnitOffsets,n,r={keyRangeOffset:P.activeKeyRangeUnitOffsetDefault,keysRangeSize:P.activeKeyRangeUnitSize,languageKey:F.isJapaneseEnvironment?`ja`:`en`,isCompactMode:localStorage.getItem(`wavicle_is_compact_mode`)===`1`,usagePanelVisible:!1,outputLevel01:0},i={get currentInstrumentIndex(){let{allInstrumentKeys:t,currentInstrumentKey:n}=e;return t.indexOf(n)},get canShiftInstrumentPrev(){return i.currentInstrumentIndex>0},get canShiftInstrumentNext(){let{allInstrumentKeys:t}=e;return i.currentInstrumentIndex<t.length-1},get canShiftKeysOffsetLower(){return r.keyRangeOffset>t[0]},get canShiftKeysOffsetHigher(){return r.keyRangeOffset<t[t.length-1]},get pcKeyboardRootNoteNumber(){let e=kt(r.keyRangeOffset+3.5,t)||0;return q.getNoteNumberFormKeyOffset(e,P.bottomNoteNumber)},get needUserActionForAudioOutput(){return!e.webAudioInitialized&&e.noteReceived}},a,o={initialize(){n=setInterval(()=>{let t=Ot(e.readOutputLevelDb());Math.abs(r.outputLevel01-t)<.01||(r.outputLevel01=t,N())},50)},finalize(){n&&=(clearInterval(n),void 0)},setKeyRangeOffset(e){r.keyRangeOffset=e},shiftInstrument(t){let n=i.currentInstrumentIndex;if(n>=0){let{allInstrumentKeys:r}=e,i=r[n+t];i&&e.setInstrument(i,!0)}},shiftOctave(e){a?.flush();let n=r.keyRangeOffset,i=(e===1?At:kt)(n,t);i!==void 0&&(a=Pe(o.setKeyRangeOffset,n,i,500))},setLanguageKey(e){F.isJapaneseEnvironment&&(r.languageKey=e)},setCompactMode(e){r.isCompactMode=e,localStorage.setItem(`wavicle_is_compact_mode`,e?`1`:`0`)},showUsagePanel(){r.usagePanelVisible=!0},hideUsagePanel(){r.usagePanelVisible=!1}};return{state:r,readers:i,actions:o}}function Mt(){let e=Qe(),t=Le(e),n=jt(e);return{synthEngine:e,midiInputDriver:t,uiPresenter:n,async initialize(){e.initialize(),n.actions.initialize(),e.setInstrument(e.currentInstrumentKey,!1),await t.initialize(),Ie(e)}}}var Q=Mt();function Nt(){let e=`wavicle__app_persist_state`;return{load(){let t=localStorage.getItem(e);if(t)try{let{midiInDeviceId:e,currentInstrumentKey:n,instrumentParameters:r,languageKey:i,keyRangeOffset:a}=JSON.parse(t),{synthEngine:o,midiInputDriver:s,uiPresenter:c}=Q;s.allDeviceEntries.some(t=>t.id===e)&&s.selectDevice(e),o.allInstrumentKeys.includes(n)&&o.setInstrument(n,!1);let{volume:l,release:u}=r;L.between(l,0,1)&&L.between(u,0,1)&&(o.setInstrumentParameter(`volume`,l),o.setInstrumentParameter(`release`,u)),(i===`en`||i===`ja`)&&c.actions.setLanguageKey(i);let d=P.octaveSelectionKeyUnitOffsets[0],f=P.octaveSelectionKeyUnitOffsets[P.octaveSelectionKeyUnitOffsets.length-1];L.between(a,d,f)&&c.actions.setKeyRangeOffset(a)}catch{console.log(`failed to load persist state`)}},save(){let{synthEngine:t,midiInputDriver:n,uiPresenter:r}=Q,i=n.currentDeviceId,{currentInstrumentKey:a,instrumentParameters:o}=t,{state:{languageKey:s,keyRangeOffset:c}}=r,l={midiInDeviceId:i,currentInstrumentKey:a,instrumentParameters:o,languageKey:s,keyRangeOffset:c};localStorage.setItem(e,JSON.stringify(l))}}}var Pt=Nt(),Ft=j`
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
`,It=20;function Lt(e){let t=e/(It-1);return t<=.4?`hsl(84deg 100% 52%)`:t<=.9?`hsl(${L.lerpMap(t,.4,.9,84,0)}deg 100% 52%)`:`hsl(0deg 100% 52%)`}var Rt=({level:e})=>{let t=Math.round(Math.max(0,Math.min(1,e))*It);return M(T(`div`,{class:`gauge`},Array.from({length:It},(e,n)=>{let r=n<t;return T(`div`,{class:r?`segment active`:`segment`,style:{background:r?Lt(n):void 0}})})),j`
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
    `)},zt=()=>{let{state:{isCompactMode:e},actions:{setCompactMode:t}}=Q.uiPresenter;return M(T(`div`,null,T(_t,{iconSpec:e?`ph-arrows-out-simple`:`ph-arrows-in-simple`,size:45,onClick:()=>t(!e),class:e&&`--active`})),j`
    `)},Bt=()=>{let{allInstrumentKeys:e,currentInstrumentKey:t,setInstrument:n,isLoadingSamples:r}=Q.synthEngine,{state:{languageKey:i},readers:{canShiftInstrumentPrev:a,canShiftInstrumentNext:o},actions:{shiftInstrument:s}}=Q.uiPresenter,c=K(),l=e.map(e=>({value:e,label:De(e,i)}));return M(T(`div`,null,T(`div`,{class:`head-row`},T(Z,{text:c.instrument})),T(`div`,{class:`second-row`},T(gt,{options:l,value:t,onChange:e=>{n(e,!0)},width:130}),T(xt,{isLoading:r})),T(`div`,{class:`buttons-row`},T(Et,{canGoPrev:a,canGoNext:o,onShift:s}))),j`
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
    `)},Vt=()=>{let{readers:{canShiftInstrumentPrev:e,canShiftInstrumentNext:t},actions:{shiftInstrument:n}}=Q.uiPresenter;return T(Dt,{canGoPrev:e,canGoNext:t,onShift:n})},Ht=()=>{let{allInstrumentKeys:e,currentInstrumentKey:t,setInstrument:n,isLoadingSamples:r}=Q.synthEngine,{state:{languageKey:i}}=Q.uiPresenter,a=K(),o=e.map(e=>({value:e,label:De(e,i)}));return M(T(`div`,null,T(`div`,{class:`head-row`},T(Z,{text:a.instrument}),T(xt,{isLoading:r})),T(`div`,{class:`second-row`},T(gt,{options:o,value:t,onChange:e=>{n(e,!0)},width:172,height:44,fontSize:18})),T(`div`,{class:`buttons-row`})),j`
        > .head-row {
          display: flex;
        }
        > .second-row {
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
    `)},Ut=()=>{let{bottomNoteNumber:e,numKeys:t}=P,{holdNoteNumbers:n}=Q.synthEngine,{state:{keyRangeOffset:r,keysRangeSize:i},actions:{setKeyRangeOffset:a}}=Q.uiPresenter;return M(T(`div`,null,T(mt,{unitWidth:10,height:33,bottomNoteNumber:e,numKeys:t,holdNoteNumbers:n,showCenterCMark:!1,isMainKeys:!1}),T(`div`,{class:`cover`},T(ht,{unitWidthPx:10,heightPx:33,bottomNoteNumber:e,numKeys:t,activeRangeOffsetU:r,activeRangeSizeU:i,onScrollActiveRange:a}))),j`
      position: relative;
      > .cover {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
      }
    `)},Wt=()=>{let{bottomNoteNumber:e,numKeys:t}=P,{holdNoteNumbers:n,noteOn:r,noteOff:i}=Q.synthEngine,{state:{keyRangeOffset:a,keysRangeSize:o}}=Q.uiPresenter,s=P.mainKeyUnitWidth;return M(T($e,{unitWidthPx:s,heightPx:254,activeRangeOffsetU:a,activeRangeSizeU:o},T(mt,{unitWidth:s,height:254,bottomNoteNumber:e,numKeys:t,holdNoteNumbers:n,onKeyHoldEvent:e=>{e.hold?r(e.noteNumber):i(e.noteNumber)},labelOptions:void 0,showCenterCMark:!1,isMainKeys:!0})),j`
      border-top: solid ${2}px #0004;
      border-left: solid ${3}px #0004;
      border-right: solid ${3}px #fff6;
      padding-bottom: 8px;
    `)},Gt=()=>{let{readers:{canShiftKeysOffsetLower:e,canShiftKeysOffsetHigher:t},actions:{shiftOctave:n}}=Q.uiPresenter;return T(Et,{canGoPrev:e,canGoNext:t,onShift:n})},Kt=()=>{let{instrumentParameters:e,setInstrumentParameter:t}=Q.synthEngine,n=K();return M(T(`div`,null,T(`div`,null,T(Z,{text:n.volume}),T(St,{value:e.volume,onChange:e=>t(`volume`,e),size:50})),T(`div`,null,T(Z,{text:n.release}),T(St,{value:e.release,onChange:e=>t(`release`,e),size:50}))),j`
      display: flex;
      gap: 15px;
      > div {
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `)},qt=()=>M(T(`div`,null,T(Tt,{size:44,class:`logo`}),T(`h1`,null,`Wavicle`)),j`
        display: flex;
        align-items: center;
        padding: 10px;
        gap: 1px;

        > .logo {
          margin-top: 10px;
        }

        > h1 {
          font-family: ${at};
          margin-top: 5px;
          font-size: 50px;
          line-height: 40px;
        }
    `),Jt=()=>M(T(`div`,null,T(qt,null)),j`
      position: absolute;
      top: 0;
      left: 0;
    `),$=({url:e})=>T(`a`,{href:e,target:`_blank`,rel:`noreferrer`},e),Yt=()=>M(T(`div`,{class:`table`},T(`div`,null,`Piano`),T(`div`,null,T($,{url:`https://freesound.org/people/beskhu/packs/17088/`})),T(`div`,null,`Electric Piano`),T(`div`,null,T($,{url:`https://freesound.org/people/RealRhodesSounds/packs/243/`})),T(`div`,null,`Celesta`),T(`div`,null,T($,{url:`https://freesound.org/people/pjcohen/packs/23108/`})),T(`div`,null,`Guitar`),T(`div`,null,T($,{url:`https://freesound.org/people/Kyster/packs/7398/`})),T(`div`,null,`Synthesizers`),T(`div`,null,T($,{url:`http://soundsphere.jp/arctrax.shtml`}))),j`
      display: grid;
      grid-template-columns: auto 1fr;
      > div {
        margin-right: 15px;
      }
    `),Xt=()=>{let{languageKey:e}=Q.uiPresenter.state,t=e===`en`?`ja`:`en`;return M(T(`div`,null,T(`h1`,null,`Wavicle`),T(`h3`,{lang:`ja`},`概要`),T(`p`,{lang:`ja`},`ブラウザで楽器の音を鳴らせるキーボードアプリです。`),T(`h3`,{lang:`en`},`Overview`),T(`p`,{lang:`en`},`This is a browser-based keyboard application that lets you play instrument sounds.`),T(`h3`,{lang:`ja`},`動作環境`),T(`div`,{lang:`ja`},T(`p`,null,`PCやスマートフォンのブラウザ上で動作します。`),T(`p`,null,`音を鳴らすのにWebAudioを使用していますが、最近のブラウザはどれもWebAudioに対応しているようです。`),T(`p`,null,`ブラウザがWebMIDIに対応していれば、MIDIキーボードで弾いた音を鳴らすことができます。PC版のChrome/Opera/EdgeなどがWebMIDIに対応しています。`)),T(`h3`,{lang:`en`},`Operation Environment`),T(`div`,{lang:`en`},T(`p`,null,`It runs in a browser on any PC or smartphones.`),T(`p`,null,`It uses WebAudio to play sounds, the latest browsers all seem to support WebAudio.`),T(`p`,null,`If your browser supports WebMIDI, you can play sounds by a MIDI keyboard. PC versions of Chrome/Opera/Edge support WebMIDI.`)),T(`h3`,{lang:`ja`},`使い方`),T(`h3`,{lang:`en`},`How to use`),T(`img`,{src:`https://i.gyazo.com/8feafe0f4775d77b5926239fb6fd57bd.png`,alt:`usage`}),T(`div`,{lang:`ja`,class:`usage-block`},T(`h4`,null,`1.音色選択パート`),T(`p`,null,`演奏する音色を選択します。`),T(`h4`,null,`2.パラメータコントロールパート`),T(`p`,null,`音を鳴らすときに適用されるパラメータを調整します。`,T(`br`,null),`'volume'は全体の音量を設定し、これは各音色によらず共通で使われます。`,T(`br`,null),`'release'はキーを離したときの音の余韻の長さを設定するパラメタで、値が大きいほど余韻が長くなります。音色をロードすると音色ごとに規定の値に設定されます。`),T(`h4`,null,`3.オクターブスライダ`),T(`p`,null,`メイン鍵盤で表示する範囲を設定します。ボタンを押すとオクターブオクターブ単位で表示範囲をシフトします。鍵盤のオレンジ色の部分を横方向にドラッグすると、表示範囲を無段階にスクロールできます。`),T(`h4`,null,`4.メイン鍵盤`),T(`p`,null,`鍵盤です。クリックすると音が鳴ります。PCのキーボードでも演奏することができます。PCキーボードのキーがマッピングされる範囲はオクターブスライダを操作したときに自動で変更されます。`),T(`h4`,null,`5.MIDI IN デバイス選択UI`),T(`p`,null,`MIDIデバイスを選択します。WebMIDIに対応している環境でのみこのUIが表示されます。`),T(`h4`,null,`6.言語選択UI`),T(`p`,null,`表示言語を切り替えます。ブラウザの言語に日本語が設定されている場合のみ表示されます。`)),T(`div`,{lang:`en`,class:`usage-block`},T(`h4`,null,`1.Instrument Selection Part`),T(`p`,null,`Select the instrument you want to play.`),T(`h4`,null,`2.Parameters control part`),T(`p`,null,`Adjust the parameters that are applied when a tone is played.`,T(`br`,null),`"volume" parameter sets the overall volume, which is common to all instruments.`,T(`br`,null),`"release" parameter sets the length of the sound's aftertone when the key is released. The higher the value, the longer the duration. When a instrument is loaded, it is set to the predefined value for each instrument.`),T(`h4`,null,`3.Octave slider`),T(`p`,null,`Set the display range of the main keyboard. Pressing the button shifts the display range in octave unit. Drag the orange area horizontally to scroll the display range linearly.`),T(`h4`,null,`4.Main Keyboard`),T(`p`,null,`This is the main keyboard. Clicking on a key to play a tone. You can also play using PC keyboard. Keys on the PC keyboard are automatically mapped according to the octave slider.`),T(`h4`,null,`5.MIDI IN Device Selection UI`),T(`p`,null,`Selects MIDI device. This UI is only available in environments that support WebMIDI.`),T(`h4`,null,`6.Language Selection UI`),T(`p`,null,`Switches the display language. It is available only when the browser language is set to Japanese.`)),T(`h3`,{lang:`ja`},`音の持続について`),T(`p`,{lang:`ja`},`鍵盤を押し続けたときに、音色によって音が持続するものとそうでないものがあります。撥音楽器のような音は鍵盤を弾いたときにワンショットで音を鳴らしています。また、鳴りはじめの音量の立ち上がりが遅い音色などでもループが難しいため音が持続しない設定になっています。`),T(`h3`,{lang:`en`},`About sound sustention`),T(`p`,{lang:`en`},`When a keyboard key is pressed and held down, some tones are sustained while others are not. A sound like a plucked instrument is played in one shot when the keyboard key is pressed. Also, tones that have a slow attack are difficult to loop, so they are configured not to sustain.`),T(`h3`,{lang:`ja`},`クレジット`),T(`h3`,{lang:`en`},`Credits`),T(`div`,{class:`resources-block`},T(`p`,{lang:`ja`},`下記のリソースを音源として使用しています。`),T(`p`,{lang:`en`},`The following resources are used as sound sources.`),T(Yt,null),T(`div`,null,T(`p`,{lang:`ja`},`freesound.orgの音源の一部はCC BY 3.0ライセンスが適用されているものです。`),T(`p`,{lang:`en`},`Some of the sounds on freesound.org are licensed under CC BY 3.0.`),T(`div`,{lang:`en`},T($,{url:`https://creativecommons.org/licenses/by/3.0/deed.en`})),T(`div`,{lang:`ja`},T($,{url:`https://creativecommons.org/licenses/by/3.0/deed.ja`}))),T(`p`,{lang:`ja`},`シンセサイザーの音色は私が以前作ったArcTraxというソフトシンセの音を録音したものです。`),T(`p`,{lang:`en`},`The synthesizer sounds are recorded from ArcTrax, a software synthesizer I made in the past.`)),T(`h3`,{lang:`ja`},`連絡先`),T(`p`,{lang:`ja`},`不具合等がありましたら下記の連絡先にお知らせください。`),T(`h3`,{lang:`en`},`Contact Information`),T(`p`,{lang:`en`},`If you have any problems, please contact to the following address.`),T(`p`,null,`Twitter`,T(`a`,{href:`https://twitter.com/yahiro120`,target:`_blank`,rel:`noreferrer`},`@yahiro120`)),T(`p`,{class:`mail`},`mail: yahiro1200`,T(`img`,{src:`https://i.gyazo.com/e54845878425c702a37b27c14c3587e2.png`,alt:`mail`})),T(`div`,{class:`version`},`version `,P.versionCode)),j`
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
        font-family: ${at};
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
    `)},Zt=()=>{let e=`#4ae`,{hideUsagePanel:t}=Q.uiPresenter.actions;return M(T(`div`,null,T(`div`,{class:`panel`},T(`div`,{class:`top-bar`},T(_t,{iconSpec:`ph-x-bold`,size:30,onClick:t})),T(`div`,{class:`content-body`},T(Xt,null)))),j`
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
      padding: ${F.isPc?`10px`:0};
    `)},Qt=()=>{let{colors:e}=U(),{outputLevel01:t}=Q.uiPresenter.state,n=e.clForeground,r=e.clPanelBody;return M(T(`div`,null,T(`div`,{class:`content`},T(`div`,{class:`top-row`},T(qt,null),T(zt,null)),T(`div`,{class:`main-row`},T(`div`,{class:`selectors-part`},T(Ht,null),T(Vt,{class:`shifter-buttons`})),T(`div`,{class:`controls-part-box`},T(Kt,null),T(Rt,{level:t})))),T(`div`,{class:`cover`})),j`
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
    `)},$t=()=>{let{colors:e}=U(),{outputLevel01:t}=Q.uiPresenter.state,n=e.clForeground,r=e.clPanelBody;return M(T(`div`,null,T(`div`,{class:`top-row`},T(Bt,null),T(Kt,null),T(`div`,{class:`top-right-part`},T(zt,null)),T(Jt,null)),T(`div`,{class:`second-row`},T(`div`,{class:`keys-box`},T(Gt,null),T(Ut,null)),T(Rt,{level:t})),T(`div`,{class:`main-keys-row`},T(Wt,null)),T(`div`,{class:`cover`})),j`
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
    `)},en=()=>{let{languageKey:e,usagePanelVisible:t,isCompactMode:n}=Q.uiPresenter.state,r={...et,languageKey:e},i=ut(nt,rt);return M(T(tt.Provider,{value:r},T(`div`,null,n?T(wt,{contentWidth:400,contentHeight:225,class:`scaler-box`},T(Qt,null)):T(wt,{contentWidth:800,contentHeight:450,class:`scaler-box`},T($t,null)),T(Zt,{if:t}))),j`
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
    `)};async function tn(){console.log(`wavicle ${P.versionCode}`),await Q.initialize(),Pt.load(),xe(Ft),we(()=>T(en,null),document.getElementById(`app`));let{activateWebAudioOnUserAction:e}=Q.synthEngine;window.addEventListener(`pointerdown`,e),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&Pt.save()}),window.addEventListener(`resize`,Me(N,100)),window.addEventListener(`contextmenu`,Oe)}window.addEventListener(`load`,tn);