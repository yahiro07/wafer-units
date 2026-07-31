type SampleEntry = { id: string; uri: string };

type SamplePlayOptions = {
  time?: number;
  speedRate?: number;
  volume?: number;
  skipIfNotLoaded?: boolean;
};

export type SamplePlayer = {
  registerSamples(sampleEntries: SampleEntry[]): void;
  preload(id: string): void;
  play(id: string, options?: SamplePlayOptions): void;
  cleanup(): void;
};

type AudioActor = {
  preload(): void;
  play(options?: SamplePlayOptions): void;
  cleanup(): void;
};

async function fetchAudioBuffer(uri: string, audioContext: AudioContext) {
  const response = await fetch(uri);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

function createAudioActor(
  uri: string,
  audioContext: AudioContext,
  destinationNode: AudioNode,
): AudioActor {
  let audioBufferPromise: Promise<AudioBuffer> | undefined;
  let audioBuffer: AudioBuffer | null | undefined;

  const cleanupFns: Set<() => void> = new Set();

  const internal = {
    async preload() {
      if (audioBuffer === undefined) {
        try {
          audioBufferPromise ??= fetchAudioBuffer(uri, audioContext);
          audioBuffer = await audioBufferPromise;
        } catch (_) {
          //do not retry loading if it failed once
          audioBuffer = null;
        }
      }
    },
    trigger(options?: SamplePlayOptions) {
      if (!audioBuffer) return;
      const gainNode = audioContext.createGain();
      gainNode.gain.value = options?.volume ?? 1;
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = options?.speedRate ?? 1;
      source.connect(gainNode);
      gainNode.connect(destinationNode);
      source.start(options?.time ?? audioContext.currentTime);

      const cleanupFn = () => {
        try {
          source.stop();
        } catch {}
        source.disconnect();
        gainNode.disconnect();
      };
      cleanupFns.add(cleanupFn);
      source.onended = () => {
        cleanupFn();
        cleanupFns.delete(cleanupFn);
      };
    },
  };
  return {
    preload() {
      void internal.preload();
    },
    async play(options) {
      if (!audioBuffer) {
        if (options?.skipIfNotLoaded) {
          void internal.preload();
          return;
        } else {
          await internal.preload();
        }
      }
      internal.trigger(options);
    },
    cleanup() {
      for (const cleanupFn of cleanupFns) {
        cleanupFn();
      }
      cleanupFns.clear();
    },
  };
}

export function createSamplePlayer(
  audioContext: AudioContext,
  destinationNode: AudioNode,
): SamplePlayer {
  const audioActors = new Map<string, AudioActor>();
  return {
    registerSamples(sampleEntries) {
      if (audioActors.size > 0) {
        console.warn("registerSamples called multiple times");
        return;
      }
      for (const sampleEntry of sampleEntries) {
        audioActors.set(
          sampleEntry.id,
          createAudioActor(sampleEntry.uri, audioContext, destinationNode),
        );
      }
    },
    preload(id) {
      const audioActor = audioActors.get(id);
      audioActor?.preload();
    },
    play(id, options) {
      const audioActor = audioActors.get(id);
      audioActor?.play(options);
    },
    cleanup() {
      for (const audioActor of audioActors.values()) {
        audioActor.cleanup();
      }
      audioActors.clear();
    },
  };
}
