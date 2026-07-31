import { UnitInterface } from "wafer-host/unit-types";
import { mapVolumeControlCurveCenterUnity } from "@/model/curve";
import { PartItem, PartKey, StepNote } from "@/model/defs";
import { createSamplePlayer, SamplePlayer } from "@/model/sample-player";

type HitCallbackFn = (partKey: PartKey) => void;

type SequencerEngine = {
  registerPartEntries(partKeys: PartKey[]): void;
  registerSampleEntries(sampleKeys: string[]): void;
  setHitCallback(hitCallback: HitCallbackFn | null): () => void;
  setBpm(bpm: number): void;
  play(): void;
  stop(): void;
  setPartItems(partItems: PartItem[]): void;
  setSoloPartKey(partKey: PartKey | null): void;
  setMasterVolume(volume: number): void;
  triggerPreview(partKey: PartKey, velocity: number): void;
  onHostStart(): void;
  onHostStep(stepIndex: number, time: number): void;
  onHostStop(): void;
  cleanup(): void;
};

type PartAttributes = {
  sampleKey: string;
  pitchTweak: number;
  weakVelocity: number;
  volume: number;
  notes: (StepNote | null)[];
  outputActive: boolean;
  mutedByOtherSolo: boolean;
};

type PartActor = {
  partKey: PartKey;
  setHitCallback(hitCallback: HitCallbackFn | null): void;
  triggerPreview(velocity: number): void;
  assignPartAttributes(attrs: Partial<PartAttributes>): void;
  handleStep(stepIndex: number, time: number): void;
};

function getRateFromPitch(pitch: number) {
  return Math.pow(2, (pitch * 100) / 1200);
}

function createPartActor(
  partKey: PartKey,
  samplePlayer: SamplePlayer,
): PartActor {
  let hitCallback: HitCallbackFn | null;
  const partAttrs: PartAttributes = {
    pitchTweak: 0,
    sampleKey: "",
    weakVelocity: 0.5,
    volume: 0.5,
    notes: [],
    outputActive: true,
    mutedByOtherSolo: false,
  };
  const internal = {
    triggerSample(velocity: number, time?: number, skipIfNotLoaded?: boolean) {
      const pa = partAttrs;
      const gain = pa.volume * 2; //0~1, center0.5 --> 0~2, center1
      const volume = gain * velocity;
      const speedRate = getRateFromPitch(pa.pitchTweak);
      samplePlayer.play(pa.sampleKey, {
        time,
        volume,
        speedRate,
        skipIfNotLoaded,
      });
      hitCallback?.(partKey);
    },
  };

  return {
    partKey,
    setHitCallback(_hitCallback) {
      hitCallback = _hitCallback;
    },
    triggerPreview(velocity) {
      internal.triggerSample(velocity);
    },
    assignPartAttributes(attrs) {
      Object.assign(partAttrs, attrs);
    },
    handleStep(inputStepIndex, time) {
      const { notes, outputActive, mutedByOtherSolo } = partAttrs;
      if (notes.length === 0) return;
      if (!outputActive || mutedByOtherSolo) return;
      const stepIndex = inputStepIndex % notes.length;
      const note = notes[stepIndex];
      if (note) {
        const velocity = note.velocity === 0.5 ? partAttrs.weakVelocity : 1;
        internal.triggerSample(velocity, time, true);
      }
    },
  };
}

export function createSequencerEngine(
  unitInterface: UnitInterface | undefined,
): SequencerEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const audioOutputNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const masterGainNode = audioContext.createGain();
  masterGainNode.connect(audioOutputNode);

  const samplePlayer = createSamplePlayer(audioContext, masterGainNode);
  const preloadRequestedFlags: Record<string, boolean> = {};

  let bpm = 120;
  let partActors: PartActor[] = [];
  let localPlaying = false;
  let localStepIndex = 0;

  function getPartActor(partKey: PartKey) {
    return partActors.find((partPlayer) => partPlayer.partKey === partKey);
  }

  const internal = {
    handleStep(stepIndex: number, time: number) {
      for (const partActor of partActors) {
        partActor.handleStep(stepIndex, time);
      }
    },
    localStepTask() {
      internal.handleStep(localStepIndex, audioContext.currentTime);
      localStepIndex++;
      if (localPlaying) {
        setTimeout(internal.localStepTask, (60 / bpm / 4) * 1000);
      }
    },
    updateMasterGain(volume: number) {
      const gain = mapVolumeControlCurveCenterUnity(volume);
      const constantScaler = 0.2;
      masterGainNode.gain.value = gain * constantScaler;
    },
  };
  internal.updateMasterGain(0.5);

  return {
    registerPartEntries(partKeys) {
      if (partActors.length > 0) {
        console.warn("registerPartEntries called multiple times");
        return;
      }
      partActors = partKeys.map((partKey) =>
        createPartActor(partKey, samplePlayer),
      );
    },
    registerSampleEntries(samplesKeys) {
      samplePlayer.registerSamples(
        samplesKeys.map((sampleKey) => ({
          id: sampleKey,
          uri: `./samples/${sampleKey}.ogg`,
        })),
      );
    },
    setHitCallback(hitCallback) {
      for (const partActor of partActors) {
        partActor.setHitCallback(hitCallback);
      }
      return () => {
        for (const partActor of partActors) {
          partActor.setHitCallback(null);
        }
      };
    },
    setBpm(_bpm) {
      bpm = _bpm;
    },
    play() {
      if (!localPlaying) {
        localPlaying = true;
        localStepIndex = 0;
        internal.localStepTask();
      }
    },
    stop() {
      localPlaying = false;
    },
    setPartItems(partItems) {
      for (const partItem of partItems) {
        const partActor = getPartActor(partItem.partKey);
        partActor?.assignPartAttributes({
          sampleKey: partItem.sampleKey,
          pitchTweak: partItem.pitchTweak,
          weakVelocity: partItem.weakVelocity,
          volume: partItem.volume,
          notes: partItem.notes,
          outputActive: partItem.outputActive,
        });
        const { sampleKey } = partItem;
        if (!preloadRequestedFlags[sampleKey]) {
          samplePlayer.preload(sampleKey);
          preloadRequestedFlags[sampleKey] = true;
        }
      }
    },
    setSoloPartKey(soloPartKey) {
      for (const partActor of partActors) {
        const mutedByOtherSolo = soloPartKey
          ? partActor.partKey !== soloPartKey
          : false;
        partActor.assignPartAttributes({ mutedByOtherSolo });
      }
    },
    setMasterVolume(volume) {
      internal.updateMasterGain(volume);
    },
    triggerPreview(partKey, velocity) {
      const partActor = getPartActor(partKey);
      partActor?.triggerPreview(velocity);
    },
    onHostStart() {},
    onHostStep(stepIndex, time) {
      internal.handleStep(stepIndex, time);
    },
    onHostStop() {},
    cleanup() {
      masterGainNode.disconnect();
      samplePlayer.cleanup();
    },
  };
}
