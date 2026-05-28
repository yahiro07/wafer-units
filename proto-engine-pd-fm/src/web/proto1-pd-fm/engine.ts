import { createStore } from "solid-js/store";
import { getHostInterface } from "wus-unit-types";
import { createEffectChain } from "@/web/proto1-pd-fm/effect-chain";
import { defaultParams, SynthParameters } from "./state";
import workletUrl from "./worklet?worker&url";

export const hostInterface = getHostInterface();

// ノート番号から周波数（Hz）への変換
const mtof = (note: number): number =>
  440.0 * Math.pow(2.0, (note - 69) / 12.0);

// 現在アクティブなボイス（WorkletNode）の管理用インターフェース
interface ActiveVoice {
  workletNode: AudioWorkletNode;
  gateParam: AudioParam;
}

type StoreState = SynthParameters & { numActiveNotes: number };

export class SynthEngine {
  private audioCtx: AudioContext | null = null;
  // 空間系エフェクトを繋ぐための、Workletの最終合流地点ノード
  private mainOutputNode: GainNode | null = null;

  // 現在鳴っている音をノート番号（0-127）をキーにして保持
  private activeVoices = new Map<number, ActiveVoice>();

  // SolidJSのStore（UI側はこのstateをそのまま参照してノブ等を描画）
  public state: StoreState;
  private setState: any;

  private effectChain?: ReturnType<typeof createEffectChain>;

  constructor() {
    // 1. SolidJSのStoreを初期化
    const [store, setStore] = createStore<StoreState>({
      ...defaultParams,
      numActiveNotes: 0,
    });
    this.state = store;
    this.setState = setStore;
  }

  /**
   * オーディオ環境の初期化
   * ユーザーのアクション（ボタンクリックなど）をトリガーにして一度だけ呼ぶ必要があります
   */
  async init(): Promise<void> {
    if (this.audioCtx) return; // 既に初期化済みの場合はスキップ

    this.audioCtx =
      hostInterface?.audioContext ||
      new (window.AudioContext || (window as any).webkitAudioContext)();

    const audioDestination =
      hostInterface?.audioDestinationNode || this.audioCtx.destination;

    // Workletファイルを読み込む（プロジェクトのパブリックディレクトリ等に配置したパス）
    await this.audioCtx.audioWorklet.addModule(workletUrl);

    // すべてのボイスが合流するメインゲイン
    this.mainOutputNode = this.audioCtx.createGain();
    this.mainOutputNode.gain.setValueAtTime(
      this.state.master,
      this.audioCtx.currentTime,
    ); // 初期値をストアから取得

    this.effectChain = createEffectChain(this.audioCtx);
    this.mainOutputNode.connect(this.effectChain.inputNode);
    this.effectChain.outputNode.connect(audioDestination);
  }

  async resumeOnUserAction() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }
  }

  /**
   * UIアクション: パラメーターの更新
   */
  public uiActions = {
    setParameter: (key: keyof SynthParameters, value: number) => {
      // 1. SolidJSのStoreを更新（UIに即座に反映される）
      this.setState(key, value);

      const now = this.audioCtx?.currentTime || 0;

      // master処理
      if (key === "master") {
        if (this.mainOutputNode) {
          this.mainOutputNode.gain.setTargetAtTime(value, now, 0.005);
        }
        return;
      }

      // 2. 現在鳴っているすべてのボイス（Worklet）のパラメータもリアルタイムに書き換える
      this.activeVoices.forEach((voice) => {
        const param = voice.workletNode.parameters.get(key);
        if (param) {
          // 変化が激しい場合はスジを消すためにリニアスルー（0.005秒）で滑らかに送る
          param.setTargetAtTime(value, now, 0.005);
        }
      });

      if (key === "chorus" || key === "delay" || key === "reverb") {
        this.effectChain?.updateParameters({ [key]: value });
      }
    },

    /**
     * UIアクション: 発音要求 (Note On)
     */
    noteOn: (noteNumber: number) => {
      if (!this.audioCtx || !this.mainOutputNode) {
        console.warn(
          "SynthEngineが初期化されていません。先にinit()を実行してください。",
        );
        return;
      }

      // 既に同じノート番号が鳴っている場合は、古いボイスを強制解放して二重発音を防ぐ
      if (this.activeVoices.has(noteNumber)) {
        this.uiActions.noteOff(noteNumber);
      }

      // AudioContextがブラウザによってサスペンドされている場合は解除
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      // 1. 新しいボイス用のAudioWorkletNodeを生成
      const workletNode = new AudioWorkletNode(
        this.audioCtx,
        "synth-processor",
        {
          numberOfInputs: 0,
          numberOfOutputs: 1,
          outputChannelCount: [1], // モノラル出力
        },
      );

      // 2. 作成したボイスに、現在のSolid Storeのパラメーターを全注入
      const now = this.audioCtx.currentTime;

      const freqParam = workletNode.parameters.get("frequency");
      if (freqParam) freqParam.setValueAtTime(mtof(noteNumber), now);

      // 初期パラメーターを巡回してセット
      (Object.keys(this.state) as Array<keyof SynthParameters>).forEach(
        (key) => {
          const p = workletNode.parameters.get(key);
          if (p) p.setValueAtTime(this.state[key], now);
        },
      );

      // 3. ゲートを開く (1.0 = 音を出す)
      const gateParam = workletNode.parameters.get("gate")!;
      gateParam.setValueAtTime(1.0, now);

      // 4. エフェクト合流用ノードへ接続
      workletNode.connect(this.mainOutputNode);

      // 5. アクティブボイスのマップに登録
      this.activeVoices.set(noteNumber, { workletNode, gateParam });

      this.setState("numActiveNotes", this.activeVoices.size);
    },

    /**
     * UIアクション: 消音要求 (Note Off)
     */
    noteOff: (noteNumber: number) => {
      const voice = this.activeVoices.get(noteNumber);
      if (!voice) return;

      const now = this.audioCtx?.currentTime || 0;

      // 1. ゲートを閉じる（Worklet内部で自動的にReleaseフェーズが始まります）
      voice.gateParam.setValueAtTime(0.0, now);

      // 2. マップから削除
      // ※注意：WorkletProcessorが自身で「false」を返して自動消滅するため、
      // メイン側で明示的に `disconnect` を呼ばなくてもメモリリークしません。
      this.activeVoices.delete(noteNumber);

      this.setState("numActiveNotes", this.activeVoices.size);
    },
  };
}

// シングルトンとしてエクスポートすると、SolidのどのUIコンポーネントからでも呼びやすくなります
export const synthEngine = new SynthEngine();
