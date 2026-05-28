import { clampValue, linearInterpolate, lowClip } from "@/utils/number-utils";
import { power2 } from "@/utils/synth-math-utils";
import { createInterpolator } from "@/web/proto1-pd-fm/interpolator";
import { WaveMode } from "./constants";

// PD (Phase Distortion) 計算関数
function computePD(phase: number, amount: number): number {
  // 1周期の真ん中（0.5）の変形点を、amountに応じて前方に歪ませる
  const pivot = 0.5 + amount * 0.45; // 0.5 〜 0.95
  let distortedPhase = 0.0;

  if (phase < pivot) {
    distortedPhase = (phase / pivot) * 0.5;
  } else {
    distortedPhase = 0.5 + ((phase - pivot) / (1.0 - pivot)) * 0.5;
  }
  // 歪ませた位相をサイン波に流し込むことで、鋸歯状波へとモーフィングする
  if (0) {
    return Math.sin(2.0 * Math.PI * distortedPhase + Math.PI);
  } else {
    return -Math.cos(2.0 * Math.PI * distortedPhase + Math.PI);
  }
}

// PD_RESO (疑似レゾナンス) 計算関数
function computePDReso(phase: number, amount: number): number {
  // インデックスに応じて高域倍音の倍率を設定（最大16倍周期）
  const resoMultiplier = 1.0 + Math.floor(amount * 15.0);
  // 1周期の後方に向かって綺麗に減衰する窓関数（CZの特徴）
  const window = 1.0 - phase;

  return Math.sin(phase * resoMultiplier * 2.0 * Math.PI) * window;
}

function createSynthesizerCore() {
  // オシレーターの位相管理 (2つのOSC分 + サブOSC)
  let phase1 = 0.0;
  let phase2 = 0.0;
  let phaseSub = 0.0;

  // FMフィードバック用の1サンプルバッファ
  let fbStorage = 0.0;

  // Drift（ピッチのヨレ）用の不規則LFOの位相
  let driftPhase1 = 0.0;
  let driftPhase2 = 0.0;

  // Lo-Fi（ダウンサンプリング）用のサンプルホールド保持用
  let sampleCount = 0;
  let heldSample = 0.0;

  // エンベロープ（EG）の状態管理
  let egValue = 0.0;
  let isReleased = false;
  let releaseStartValue = 0.0;
  let egTime = 0.0; // ノートオンまたはオフからの経過時間（秒）

  const interpolators = {
    shape: createInterpolator(),
    envMod: createInterpolator(),
  };

  return {
    process(
      _inputs: Float32Array[][],
      outputs: Float32Array[][],
      parameters: Record<string, Float32Array>,
    ): boolean {
      const output = outputs[0];
      const outputChannel = output[0]; // モノラル出力
      const sampleRate = globalThis.sampleRate; // Web Audio API提供のグローバル環境変数
      const bufferSize = outputChannel.length; // 通常は128固定

      // 配列アクセスのオーバーヘッドを減らすため、定常パラメーターは最初の値をキャプチャ
      const baseFreq = parameters["frequency"][0];
      const gate = parameters["gate"][0];
      const waveMode = Math.floor(parameters["waveMode"][0]) as WaveMode;
      const _shape = parameters["shape"][0];
      const _envMod = parameters["envMod"][0];
      const detune = parameters["detune"][0];
      const subVol = parameters["sub"][0];
      const decay = parameters["decay"][0];
      const release = parameters["release"][0];
      const driftAmount = parameters["drift"][0];
      const loFiAmount = parameters["loFi"][0];

      interpolators.shape.feed(_shape, bufferSize);
      interpolators.envMod.feed(_envMod, bufferSize);

      // 128サンプルのブロックループ
      for (let i = 0; i < bufferSize; i++) {
        const shape = interpolators.shape.advance();
        const envMod = interpolators.envMod.advance();
        // -------------------------------------------------------------
        // 1. エンベロープ（EG）の更新ロジック
        // -------------------------------------------------------------
        if (gate > 0.5) {
          if (isReleased) {
            // 再度ノートオンされた場合のリセット
            isReleased = false;
            egTime = 0.0;
          }
          // Decayフェーズ: 指数関数的な減衰（アタックは0秒の超高速設計）
          egValue = Math.exp(-egTime / Math.max(0.01, decay));
          const sustain =
            decay < 0.75 ? 0 : linearInterpolate(decay, 0.75, 1, 0, 1);
          egValue = lowClip(egValue, sustain);
          egTime += 1.0 / sampleRate;
        } else {
          if (!isReleased) {
            // ノートオフがトリガーされた瞬間
            isReleased = true;
            releaseStartValue = egValue;
            egTime = 0.0;
          }
          // Releaseフェーズ
          egValue =
            releaseStartValue * Math.exp(-egTime / Math.max(0.01, release));
          egTime += 1.0 / sampleRate;
        }

        // -------------------------------------------------------------
        // 2. Drift（ピッチのヨレ）の計算
        // -------------------------------------------------------------
        let pitchDrift = 0.0;
        if (driftAmount > 0.0) {
          // 異なる周期のLFOを掛け合わせて「予測できないヨレ」を演出
          driftPhase1 += (2.0 * Math.PI * 0.73) / sampleRate; // 0.73Hz
          driftPhase2 += (2.0 * Math.PI * 3.14) / sampleRate; // 3.14Hz
          if (driftPhase1 > 2.0 * Math.PI) driftPhase1 -= 2.0 * Math.PI;
          if (driftPhase2 > 2.0 * Math.PI) driftPhase2 -= 2.0 * Math.PI;

          const slowWobble = Math.sin(driftPhase1) * Math.sin(driftPhase2);
          // 最大で約30セントのピッチ揺らぎを発生させる
          pitchDrift = slowWobble * driftAmount * 0.018;
        }

        // -------------------------------------------------------------
        // 3. オシレーター周波数の決定（Detune処理）
        // -------------------------------------------------------------
        // detuneノブが0の時は、OSC2を完全にシャットダウンしてOSC1のみにする
        const isDualOsc = detune > 0.005;
        const detuneFactor = 1.0 + detune * 0.015; // 最大で1.5%ほどのデチューン幅

        const f1 = baseFreq * (1.0 + pitchDrift);
        const f2 = baseFreq * detuneFactor * (1.0 + pitchDrift);
        const fSub = baseFreq * 0.5 * (1.0 + pitchDrift); // 1オクターブ下

        // 位相の進捗更新
        phase1 += f1 / sampleRate;
        if (phase1 >= 1.0) phase1 -= 1.0;

        if (isDualOsc) {
          phase2 += f2 / sampleRate;
          if (phase2 >= 1.0) phase2 -= 1.0;
        }

        phaseSub += fSub / sampleRate;
        if (phaseSub >= 1.0) phaseSub -= 1.0;

        // -------------------------------------------------------------
        // 4. モジュレーション値（ノブ値 + Env Mod）の統合
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // 5. 各種アルゴリズムによる波形生成
        // -------------------------------------------------------------
        let osc1Out = 0.0;
        let osc2Out = 0.0;

        switch (waveMode) {
          case WaveMode.PD: {
            // EnvModが1.0のとき、アタック時はcurrentIndexが「ノブの設定＋1.0（上限突破）」になり、Decayと共にノブの位置へ軟着陸
            let currentIndex = shape + egValue * envMod;
            currentIndex = clampValue(currentIndex, 0, 1); // 安全のためのクランプ
            // CZ式 Phase Distortion（ノコギリ波への変形）
            osc1Out = computePD(phase1, currentIndex);
            if (isDualOsc) osc2Out = computePD(phase2, currentIndex);
            break;
          }
          case WaveMode.FM: {
            const currentIndex = shape + egValue * power2(envMod);
            const modDepth = currentIndex * 5.0;
            const ratio = 1.0 + Math.floor(shape * 7.0); // Ratio: 1倍〜8倍

            osc1Out = Math.sin(
              2.0 * Math.PI * phase1 +
                Math.sin(2.0 * Math.PI * phase1 * ratio) * modDepth,
            );
            if (isDualOsc) {
              osc2Out = Math.sin(
                2.0 * Math.PI * phase2 +
                  Math.sin(2.0 * Math.PI * phase2 * ratio) * modDepth,
              );
            }
            break;
          }
          case WaveMode.FM_FB: {
            // EnvModが1.0のとき、アタック時はcurrentIndexが「ノブの設定＋1.0（上限突破）」になり、Decayと共にノブの位置へ軟着陸
            let currentIndex = shape + egValue * envMod;
            currentIndex = clampValue(currentIndex, 0, 1); // 安全のためのクランプ

            // フィードバック付きFM
            const fbAmount = currentIndex * 2.5; // フィードバック強度
            const modulator = Math.sin(
              2.0 * Math.PI * phase1 + fbStorage * fbAmount,
            );
            fbStorage = modulator; // 1サンプル記憶

            osc1Out = Math.sin(2.0 * Math.PI * phase1 + modulator * 2.0);
            if (isDualOsc) {
              osc2Out = Math.sin(2.0 * Math.PI * phase2 + modulator * 2.0); // OSC2も同じモジュレータを共有
            }
            break;
          }
          case WaveMode.PD_RESO: {
            // EnvModが1.0のとき、アタック時はcurrentIndexが「ノブの設定＋1.0（上限突破）」になり、Decayと共にノブの位置へ軟着陸
            let currentIndex = shape + egValue * envMod;
            currentIndex = clampValue(currentIndex, 0, 1); // 安全のためのクランプ

            // CZ式 疑似レゾナンス・フィルター
            osc1Out = computePDReso(phase1, currentIndex);
            if (isDualOsc) osc2Out = computePDReso(phase2, currentIndex);
            break;
          }
        }

        // メインオシレーターのミックス
        let mainMix = isDualOsc ? (osc1Out + osc2Out) * 0.5 : osc1Out;

        // -------------------------------------------------------------
        // 6. Lo-Fi（メインOSCにのみ適用し、エッジを尖らせる）
        // -------------------------------------------------------------
        if (loFiAmount > 0.005) {
          // A. ビットクラッシュ (16bitから最小4bitまで落とす)
          const bits = 16.0 - loFiAmount * 12.0;
          const step = Math.pow(2, bits);
          mainMix = Math.round(mainMix * step) / step;

          // B. ダウンサンプリング (ホールド処理)
          // loFiAmountに応じて、何サンプルに1回更新するかを決定（最大で15サンプルに1回＝約3kHz相当）
          const sampleHoldInterval = Math.floor(1 + loFiAmount * 14);
          if (sampleCount % sampleHoldInterval === 0) {
            heldSample = mainMix;
          }
          mainMix = heldSample;
          sampleCount++;
        }

        // -------------------------------------------------------------
        // 7. サブオシレーターの合流と最終音量 EG
        // -------------------------------------------------------------
        // サブOSCは三角波。Lo-Fi化をバイパスさせることで、低域の体幹を維持
        let subOut = 0.0;
        if (subVol > 0.005) {
          subOut = phaseSub < 0.5 ? 4.0 * phaseSub - 1.0 : 3.0 - 4.0 * phaseSub;
        }

        // 最終ミックスにメインの音量EGを乗せる
        const finalSample = (mainMix + subOut * subVol * 0.6) * egValue;

        // チャンネルへ書き込み
        outputChannel[i] = finalSample;

        // ステレオ対応が必要な場合、もう片方のチャンネルへもコピー
        if (output.length > 1) {
          output[1][i] = finalSample;
        }
      }

      // EGが完全に収束し、かつノートオフされていれば、このノートの処理は終了（生存フラグ）
      if (isReleased && egValue < 0.0001) {
        return false; // 以降、このボイスノードは自動的に破棄される
      }

      return true;
    },
  };
}

class SynthProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "frequency",
        defaultValue: 440.0,
        minValue: 0.0,
        maxValue: 22000.0,
      },
      { name: "gate", defaultValue: 1.0, minValue: 0.0, maxValue: 1.0 }, // 1.0でノートオン, 0.0でノートオフ
      { name: "waveMode", defaultValue: 0, minValue: 0, maxValue: 3 },
      { name: "shape", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "envMod", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "detune", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "sub", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "decay", defaultValue: 0.5, minValue: 0.001, maxValue: 1.0 },
      { name: "release", defaultValue: 0.3, minValue: 0.001, maxValue: 1.0 },
      { name: "drift", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
      { name: "loFi", defaultValue: 0.0, minValue: 0.0, maxValue: 1.0 },
    ];
  }
  private synthesizerCore = createSynthesizerCore();

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean {
    return this.synthesizerCore.process(_inputs, outputs, parameters);
  }
}

// 登録手続き
registerProcessor("synth-processor", SynthProcessor);
