// lofier-effect.ts (メイン側)
import { EffectParameters, noiseStuffUrls } from "@/common/definitions";
import workletUrl from "./lofier-processor?worker&url";

// ユーザー定義の通信メソッド（モック、または実際の実装に差し替え）
async function fetchNoiseStuff(index: number): Promise<ArrayBuffer> {
  const url = noiseStuffUrls[index % noiseStuffUrls.length];
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch noise stuff: ${response.statusText}`);
  return response.arrayBuffer();
}

// サチュレーションの歪み曲線を生成するヘルパー関数
function makeDistortionCurve(mode: number, grit: number) {
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;

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
      const k = grit * 10;
      curve[i] = ((Math.PI + k) * x * deg) / (Math.PI + k * Math.abs(x));
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

  // 4. アンビエントノイズ
  const noiseGain = audioContext.createGain();
  let noiseSource: AudioBufferSourceNode | null = null;
  let cachedNoiseBuffer: AudioBuffer | null = null;

  // --- Workletのプレースホルダーノード ---
  let workletNode: AudioWorkletNode | null = null;

  // --- シグナルチェーンの接続 ---
  // ドライライン (バイパス用)
  inputNode.connect(dryGain);
  dryGain.connect(outputNode);

  // ウェットライン (エフェクト用)
  inputNode.connect(saturatorPreGain);
  saturatorPreGain.connect(waveShaper);
  waveShaper.connect(delayNode);
  // (注: Workletノードはロード完了後に delayNode と hpFilter の間に動的に挿入します)
  delayNode.connect(hpFilter);
  hpFilter.connect(lpFilter);
  lpFilter.connect(wetGain);
  wetGain.connect(outputNode);

  // LFOからディレイタイムへの変調結線
  lfo.connect(lfoGain);
  lfoGain.connect(delayNode.delayTime);

  // ノイズは最終フィルターの後段(wetGainの直前)にミックス
  noiseGain.connect(wetGain);

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

  // --- ノイズファイルの非同期読み込み・ループ再生処理 ---
  async function setupNoise(index: number) {
    if (state.currentNoiseIndex === index && cachedNoiseBuffer) return;

    if (noiseSource) {
      try {
        noiseSource.stop();
      } catch (e) {}
      noiseSource.disconnect();
    }

    state.currentNoiseIndex = index;
    cachedNoiseBuffer = null;

    try {
      // ユーザーの雛形関数をここで利用
      const arrayBuffer = await fetchNoiseStuff(index);
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      cachedNoiseBuffer = audioBuffer;

      // パラメーターが変更されていなければ再生を開始
      if (state.currentNoiseIndex === index && state.parameters.isOn) {
        startNoiseLoop(audioBuffer);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function startNoiseLoop(buffer: AudioBuffer) {
    if (noiseSource) {
      try {
        noiseSource.stop();
      } catch (e) {}
      noiseSource.disconnect();
    }
    noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    noiseSource.connect(noiseGain);
    noiseSource.start();
  }

  // --- パラメーターの動的適用 ---
  function applyParameters() {
    const p = state.parameters;
    const t = audioContext.currentTime;
    const rampTime = 0.05; // 50msのスムースな移行でプチノイズを防ぐ

    // 1. On / Off (ドライ・ウェットの比率切り替え)
    if (p.isOn) {
      dryGain.gain.linearRampToValueAtTime(0, t + rampTime);
      wetGain.gain.linearRampToValueAtTime(1, t + rampTime);
      if (cachedNoiseBuffer && !noiseSource) {
        startNoiseLoop(cachedNoiseBuffer);
      }
    } else {
      dryGain.gain.linearRampToValueAtTime(1, t + rampTime);
      wetGain.gain.linearRampToValueAtTime(0, t + rampTime);
      if (noiseSource) {
        try {
          noiseSource.stop();
        } catch (e) {}
        noiseSource.disconnect();
        noiseSource = null;
      }
      return; // Offの場合は以降の内部パラメータ更新をスキップして負荷軽減
    }

    // 2. Grit (サチュレーション) & ToneColor
    // Gritが上がるほど前段のゲインを上げて歪ませ、後段のWaveShaperで受ける
    const preGainValue = 1 + p.grit * 5; // 最大6倍の入力突っ込み
    saturatorPreGain.gain.linearRampToValueAtTime(preGainValue, t + rampTime);
    waveShaper.curve = makeDistortionCurve(p.saturationMode, p.grit);

    // 3. Age (ワウフラッターの深さ)
    // 基準ディレイを0.02s(20ms)とし、Ageに応じて最大±5ms揺らす
    delayNode.delayTime.setValueAtTime(0.02, t);
    lfoGain.gain.linearRampToValueAtTime(p.age * 0.005, t + rampTime);

    // 4. De-Qualifier (EQフィルター)
    // toneColorが0に近づくほどモコモコ(Dark)、1に近づくほどシャリシャリ(Bright)
    // ageが上がるほど自動でフィルター幅が狭まりLo-Fi感が増す
    const baseHp = 40 + p.age * 250; // 40Hz ~ 290Hz
    const baseLp = 18000 - p.age * 14000; // 18kHz ~ 4kHz

    // toneColorによるチルト補正
    const hpFreq = Math.max(20, baseHp * (2.0 - p.toneColor));
    const lpFreq = Math.min(20000, baseLp * (0.3 + p.toneColor * 0.7));

    hpFilter.frequency.exponentialRampToValueAtTime(hpFreq, t + rampTime);
    lpFilter.frequency.exponentialRampToValueAtTime(lpFreq, t + rampTime);

    // 5. Degrade (Workletへのパラメータ追従)
    if (state.isWorkletLoaded && workletNode) {
      const degradeParam = workletNode.parameters.get("degrade");
      degradeParam?.linearRampToValueAtTime(p.degrade, t + rampTime);
    }

    // 6. Dust (ノイズの音量)
    noiseGain.gain.linearRampToValueAtTime(p.dust * 0.15, t + rampTime); // 爆音防止のマックス0.15掛け

    // 7. NoiseStuffIndex (ノイズ素材の切り替え)
    setupNoise(p.noiseStuffIndex);
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
