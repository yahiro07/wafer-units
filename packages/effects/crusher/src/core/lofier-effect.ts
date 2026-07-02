// lofier-effect.ts (メイン側)
import { EffectParameters } from "./definitions";
import workletUrl from "./lofier-processor?worker&url";

// サチュレーションの歪み曲線を生成するヘルパー関数
function makeDistortionCurve(mode: number, grit: number) {
  const n_samples = 2048;
  const curve = new Float32Array(n_samples);

  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;

    if (mode === 0) {
      // Tube: 偶数次倍音を含む非対称な緩やかカーブ
      const k = grit * 4;
      curve[i] = Math.tanh(x * k) + grit * 0.2 * Math.sin(x * Math.PI);
    } else if (mode === 1) {
      // Tape: ハードとソフトの中間、コンプ感の強い丸み
      const k = 1 + grit * 8;
      curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
    } else {
      // Transistor: 奇数次中心のパキッとした硬い歪み
      const k = grit * 14;
      curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
    }
  }
  return curve;
}

export function createLofierEffect(
  audioContext: AudioContext,
  initialParameters: EffectParameters,
) {
  const state = {
    parameters: { ...initialParameters },
    currentNoiseIndex: -1,
    isWorkletLoaded: false,
  };

  // --- 基礎入出力ノード ---
  const inputNode = audioContext.createGain();
  const dryGain = audioContext.createGain();
  const wetGain = audioContext.createGain();
  const outputNode = audioContext.createGain();

  // --- 各エフェクトモジュールの作成 ---
  // 1. サチュレーター
  const saturatorPreGain = audioContext.createGain();
  const waveShaper = audioContext.createWaveShaper();
  const waveShaperDryGain = audioContext.createGain();
  const waveShaperWetGain = audioContext.createGain();
  const waveShaperMixGain = audioContext.createGain();
  waveShaper.oversample = "4x";

  // 2. テープ・ワウフラッター (Delay + LFO)
  const delayNode = audioContext.createDelay(1.0);
  const lfo = audioContext.createOscillator();
  const lfoGain = audioContext.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(1.2, audioContext.currentTime); // ~1.2Hzのゆったりした揺れ
  lfo.start();

  // 3. De-Qualifier (EQフィルター)
  const hpFilter = audioContext.createBiquadFilter();
  hpFilter.type = "highpass";
  const lpFilter = audioContext.createBiquadFilter();
  lpFilter.type = "lowpass";
  const toneLowShelf = audioContext.createBiquadFilter();
  toneLowShelf.type = "lowshelf";
  toneLowShelf.frequency.setValueAtTime(1000, audioContext.currentTime);
  const toneHighShelf = audioContext.createBiquadFilter();
  toneHighShelf.type = "highshelf";
  toneHighShelf.frequency.setValueAtTime(2000, audioContext.currentTime);

  // --- Workletのプレースホルダーノード ---
  let workletNode: AudioWorkletNode | null = null;

  // --- シグナルチェーンの接続 ---
  // ドライライン (バイパス用)
  inputNode.connect(dryGain);
  dryGain.connect(outputNode);

  // ウェットライン (エフェクト用)
  inputNode.connect(waveShaperDryGain);
  inputNode.connect(saturatorPreGain);
  saturatorPreGain.connect(waveShaper);
  waveShaper.connect(waveShaperWetGain);
  waveShaperDryGain.connect(waveShaperMixGain);
  waveShaperWetGain.connect(waveShaperMixGain);
  waveShaperMixGain.connect(delayNode);
  // (注: Workletノードはロード完了後に delayNode と hpFilter の間に動的に挿入します)
  delayNode.connect(hpFilter);
  hpFilter.connect(lpFilter);
  lpFilter.connect(toneLowShelf);
  toneLowShelf.connect(toneHighShelf);
  toneHighShelf.connect(wetGain);
  wetGain.connect(outputNode);

  // LFOからディレイタイムへの変調結線
  lfo.connect(lfoGain);
  lfoGain.connect(delayNode.delayTime);

  // // ノイズは最終フィルターの後段(wetGainの直前)にミックス
  // noiseGain.connect(wetGain);

  // --- Workletの非同期ロード処理 ---
  audioContext.audioWorklet
    .addModule(workletUrl)
    .then(() => {
      workletNode = new AudioWorkletNode(audioContext, "lofier-processor");

      // チェーンの組み替え: delayNode -> workletNode -> hpFilter
      delayNode.disconnect(hpFilter);
      delayNode.connect(workletNode);
      workletNode.connect(hpFilter);

      state.isWorkletLoaded = true;
      // Worklet読み込み後に一度パラメーターを適用
      const degradeParam = workletNode.parameters.get("degrade");
      if (degradeParam) {
        degradeParam.setValueAtTime(
          state.parameters.degrade,
          audioContext.currentTime,
        );
      }
    })
    .catch((err) => console.error("Failed to load Lofier AudioWorklet:", err));

  // --- パラメーターの動的適用 ---
  function applyParameters() {
    const pr = state.parameters;
    const t = audioContext.currentTime;
    const rampTime = 0.05; // 50msのスムースな移行でプチノイズを防ぐ

    // 1. On / Off (ドライ・ウェットの比率切り替え)
    if (pr.isOn) {
      dryGain.gain.linearRampToValueAtTime(0, t + rampTime);
      wetGain.gain.linearRampToValueAtTime(1, t + rampTime);
    } else {
      dryGain.gain.linearRampToValueAtTime(1, t + rampTime);
      wetGain.gain.linearRampToValueAtTime(0, t + rampTime);
      return; // Offの場合は以降の内部パラメータ更新をスキップして負荷軽減
    }

    const p = {
      grit: pr.grit,
      age: pr.age ** 3,
      toneColor: pr.toneColor,
      degrade: pr.degrade,
      saturationMode: pr.saturationMode,
    };

    // 2. Grit (サチュレーション) & ToneColor
    // Gritが上がるほど前段のゲインを上げて歪ませ、後段のWaveShaperで受ける
    const preGainValue = 1 + p.grit * 5; // 最大6倍の入力突っ込み
    const postGainCompensation = 1 / Math.sqrt(preGainValue);
    saturatorPreGain.gain.linearRampToValueAtTime(preGainValue, t + rampTime);
    waveShaperDryGain.gain.linearRampToValueAtTime(1 - p.grit, t + rampTime);
    waveShaperWetGain.gain.linearRampToValueAtTime(
      p.grit * postGainCompensation,
      t + rampTime,
    );
    waveShaper.curve = makeDistortionCurve(p.saturationMode, p.grit);

    // 3. Age (ワウフラッターの深さ)
    // 基準ディレイを0.02s(20ms)とし、Ageに応じて最大±5ms揺らす
    delayNode.delayTime.setValueAtTime(0.02, t);
    lfoGain.gain.linearRampToValueAtTime(p.age * 0.005, t + rampTime);

    // 4. De-Qualifier (EQフィルター)
    // ageが上がるほど自動でフィルター幅が狭まりLo-Fi感が増す
    const baseHp = 40 + p.age * 250; // 40Hz ~ 290Hz
    const baseLp = 18000 - p.age * 14000; // 18kHz ~ 4kHz

    hpFilter.frequency.exponentialRampToValueAtTime(baseHp, t + rampTime);
    lpFilter.frequency.exponentialRampToValueAtTime(baseLp, t + rampTime);

    // toneColorによるチルト補正。ageには依存させず、0=Dark / 1=Bright として扱う。
    const tilt = (p.toneColor - 0.5) * 2;
    const tiltGain = tilt * 9;
    toneLowShelf.gain.linearRampToValueAtTime(-tiltGain, t + rampTime);
    toneHighShelf.gain.linearRampToValueAtTime(tiltGain, t + rampTime);

    // 5. Degrade (Workletへのパラメータ追従)
    if (state.isWorkletLoaded && workletNode) {
      const degradeParam = workletNode.parameters.get("degrade");
      degradeParam?.linearRampToValueAtTime(p.degrade, t + rampTime);
    }
  }

  // 初回実行
  applyParameters();

  return {
    inputNode,
    outputNode,
    setParameters(parameters: EffectParameters) {
      state.parameters = { ...parameters };
      applyParameters();
    },
  };
}
