export function createChorusEffectEx1(audioContext: AudioContext) {
  const inputNode = audioContext.createGain();
  const outputNode = audioContext.createGain();

  // 1. 原音（Dry）のルート
  const dryNode = audioContext.createGain();
  inputNode.connect(dryNode);
  dryNode.connect(outputNode);

  // 2. 7タップ分の精密なパラメータ設計
  // 外側に行くほど「遅延を深く（モジュレーション幅を広く）」、
  // かつLFO速度が同期しないよう、すべて異なるプライム（素数）的な比率で散らしています。
  const tapConfigs = [
    // --- 最外層（ステレオの圧倒的な広がりと深いデチューンを担当） ---
    { baseDelay: 0.028, lfoFreq: 0.13, modDepth: 0.007, pan: -0.95 }, // タップ1: 左端
    { baseDelay: 0.026, lfoFreq: 0.19, modDepth: 0.0065, pan: 0.95 }, // タップ2: 右端

    // --- 中間層（密度の濃いユニゾン感とシュワシュワ感を担当） ---
    { baseDelay: 0.019, lfoFreq: 0.31, modDepth: 0.0045, pan: -0.6 }, // タップ3: 左中
    { baseDelay: 0.022, lfoFreq: 0.23, modDepth: 0.0055, pan: 0.6 }, // タップ4: 右中

    // --- 内層（原音との繋がりをスムーズにし、芯を太くする担当） ---
    { baseDelay: 0.012, lfoFreq: 0.47, modDepth: 0.003, pan: -0.25 }, // タップ5: 左内
    { baseDelay: 0.015, lfoFreq: 0.37, modDepth: 0.0035, pan: 0.25 }, // タップ6: 右内

    // --- センター層（中央のデチューン成分を補強） ---
    { baseDelay: 0.017, lfoFreq: 0.53, modDepth: 0.0025, pan: 0.0 }, // タップ7: 中央
  ];

  // タップ全体の音量を管理するノード
  const wetMasterNode = audioContext.createGain();
  wetMasterNode.connect(outputNode);

  // 3. 各タップの生成と接続
  const lfos: OscillatorNode[] = [];

  tapConfigs.forEach((config) => {
    const delayNode = audioContext.createDelay();
    const pannerNode = audioContext.createStereoPanner();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    // オーディオルートの接続
    inputNode.connect(delayNode);
    delayNode.connect(pannerNode);
    pannerNode.connect(wetMasterNode);

    // パラメータ設定
    delayNode.delayTime.value = config.baseDelay;
    pannerNode.pan.value = config.pan;

    // モジュレーション設定
    lfo.type = "sine";
    lfo.frequency.value = config.lfoFreq;
    lfoGain.gain.value = config.modDepth;

    lfo.connect(lfoGain);
    lfoGain.connect(delayNode.delayTime);

    // 位相のランダム化（1周期分以上の猶予を持たせる）
    lfo.start(audioContext.currentTime + Math.random() * 2.0);
    lfos.push(lfo);
  });

  // 4. ミックスバランス調整関数
  function setLevel(value: number, force?: boolean) {
    // value: 0.0 〜 1.0
    if (force || wetMasterNode.gain.value !== value) {
      // 7つもの信号が重なると全体の音量が大幅にアップ（クリッピングの危険）するため、
      // 1/7（約0.14）を基準にしつつ、適度に存在感が出る倍率（0.35〜0.45程度）で補正します。
      // ※入力信号の音量に合わせて適宜調整してください。
      wetMasterNode.gain.value = value * 0.4;

      // センターに定位する原音の芯を少し残すことで、アタックのキレを維持します
      dryNode.gain.value = 1.0 - value * 0.3;
    }
  }
  setLevel(0);

  return {
    inputNode,
    outputNode,
    setLevel,
    setupNodes() {},
    cleanupNodes() {
      for (const lfo of lfos) {
        lfo.stop();
      }
    },
  };
}
