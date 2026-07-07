type SynthParameters = {
  octave: number; // -2, -1, 0, 1, 2
  unisonDetune: number; // 0~1
  unisonSpread: number; // 0~1
  unisonMix: number; // 0~1
  phaseRandom: boolean;
  ampRelease: number; // 0~1 (秒数へのマッピング)
  volume: number; // 0~1
};

export function createSynthesizerGePoly(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
  } = {
    parameters: initialParameters,
  };

  // 最終出力をまとめるメインゲイン
  const outputNode = audioContext.createGain();

  // アクティブなノートを管理するマップ (MIDIノート番号 -> ノートオブジェクト)
  type ActiveNote = {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    gateGain: GainNode; // エンベロープ用
  };
  const activeNotes = new Map<number, ActiveNote>();

  // JP-8000のSuperSawデチューン相対比率 (中央を0とした時の各レイヤーの比率)
  // 7本の構成: 中央(0), 右3本(+), 左3本(-)
  const DETUNE_RATIOS = [
    0.0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883,
  ];

  // パンの配置 (中央, 右に分散, 左に分散)
  const PAN_DIRECTIONS = [0.0, 0.5, 0.75, 1.0, -0.5, -0.75, -1.0];

  // パラメータの適用
  function applyParameters() {
    const p = state.parameters;
    // メインボリュームの更新 (即座に反映)
    outputNode.gain.setValueAtTime(p.volume, audioContext.currentTime);

    // 鳴らしている最中のノートのデチューンやパン、ミックスも動的に変更したい場合は
    // ここで activeNotes をループしてリアルタイム反映させることも可能ですが、
    // 負荷と複雑さを考慮し、今回は次の noteOn から確実に反映される形にしています。
  }

  // 初期パラメータの適用
  applyParameters();

  // 周波数変換ヘルパー
  function midiNoteToFrequency(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  return {
    outputNode,

    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;
      applyParameters();
    },

    noteOn(noteNumber: number, time: number) {
      // 既に同じノートが鳴っていたら一度消去 (ボイスリトリーガー)
      if (activeNotes.has(noteNumber)) {
        this.noteOff(noteNumber, time);
      }

      const p = state.parameters;
      const startTime = Math.max(time, audioContext.currentTime);

      // オクターブ補正を加算
      const finalNote = noteNumber + p.octave * 12;
      const baseFrequency = midiNoteToFrequency(finalNote);

      // ノート全体のエンベロープを担当するゲインノード
      const gateGain = audioContext.createGain();

      // Attack = 0, Sustain = 1 固定の処理
      gateGain.gain.setValueAtTime(0, startTime);
      gateGain.gain.setValueAtTime(1, startTime); // Attack 0 なので即座に1へ
      gateGain.connect(outputNode);

      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      // 7つの鋸波を生成
      for (let i = 0; i < 7; i++) {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const panner = audioContext.createStereoPanner
          ? audioContext.createStereoPanner()
          : null;

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(baseFrequency, startTime);

        // --- デチューンの設定 ---
        // JP-8000の最大デチューン幅を考慮し、セント単位にスケーリング (最大で約100セント強のズレ)
        // unisonDetune (0~1) を乗算
        const detuneCents = DETUNE_RATIOS[i] * p.unisonDetune * 1200;
        osc.detune.setValueAtTime(detuneCents, startTime);

        // --- 位相のランダム化 (PeriodicWaveによるエミュレーション) ---
        // Web Audioの標準Oscillatorは通常位相0からスタートするため、
        // 完全に揃うとアタックが非常に鋭く（悪く言えばクリックノイズに）なります。
        // phaseRandomがtrueの場合は、僅かなタイムディレイを仕込むか、
        // もしくは実用的なハックとして、数ミリ秒のランダムなディレイを oscillator のスタートに与えることで位相をずらします。
        const startDelay = p.phaseRandom ? Math.random() * 0.02 : 0; // 最大20msのズレ

        // --- 音量(Mix)の設定 ---
        // 中央(i=0)は1固定、それ以外は unisonMix (0~1) を適用
        const gainVal = i === 0 ? 1.0 : p.unisonMix;
        // 7本重なると音が割れる（クリッピングする）のを防ぐため、全体のスケールを調整
        const normalizedGain = gainVal / (1.0 + p.unisonMix * 6);
        gainNode.gain.setValueAtTime(normalizedGain, startTime);

        // --- ステレオ定位(Spread)の設定 ---
        if (panner) {
          const panVal = PAN_DIRECTIONS[i] * p.unisonSpread;
          panner.pan.setValueAtTime(panVal, startTime);

          osc.connect(gainNode);
          gainNode.connect(panner);
          panner.connect(gateGain);
        } else {
          // StereoPannerNode が未対応の環境用フォールバック
          osc.connect(gainNode);
          gainNode.connect(gateGain);
        }

        osc.start(startTime + startDelay);

        oscillators.push(osc);
        gains.push(gainNode);
      }

      // アクティブノートに保存
      activeNotes.set(noteNumber, { oscillators, gains, gateGain });
    },

    noteOff(noteNumber: number, time: number) {
      const note = activeNotes.get(noteNumber);
      if (!note) return;

      const p = state.parameters;
      const stopTime = Math.max(time, audioContext.currentTime);

      // ampRelease (0~1) を実際の秒数にマッピング (例: 最大5秒のリリース)
      const releaseTimeSeconds = p.ampRelease ** 2 * 3.0;
      const finishTime = stopTime + releaseTimeSeconds;

      // 音量が1から0へ指数関数的、または線形に減衰
      note.gateGain.gain.cancelScheduledValues(stopTime);
      note.gateGain.gain.setValueAtTime(note.gateGain.gain.value, stopTime);
      note.gateGain.gain.linearRampToValueAtTime(0, finishTime);

      // リリース終了後にオシレーターを完全に停止してリソースを解放
      note.oscillators.forEach((osc) => {
        osc.stop(finishTime);
      });

      // マップから削除
      activeNotes.delete(noteNumber);
    },

    cleanup() {
      // すべての進行中の音を即座に停止してクリア
      activeNotes.forEach((note) => {
        note.oscillators.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {
            // すでに停止している場合の例外をハンドリング
          }
        });
        note.gateGain.disconnect();
      });
      activeNotes.clear();
      outputNode.disconnect();
    },
  };
}
