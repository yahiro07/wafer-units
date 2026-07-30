import {
  ClockHandlers,
  queryUnitInterface,
  UnitInterface,
} from "wafer-host/unit-types";

export const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();
const audioDestinationNode =
  unitInterface?.audioOutputNode ?? audioContext.destination;

export type BeatSourceItem = {
  id: string;
  uri: string;
  barLength: number;
  originalBpm: number;
  //advanced feature
  //pitch remapping will be applied if specified
  //originalKey?: string; //C, Am, ...etc
  //preferredPitchShiftAlgorithm?: 'SOLA' | 'PhaseVocoder';
};

export type LoopPlayerEngine = {
  unitInterface: UnitInterface | undefined;
  registerBeatSourceItems(items: BeatSourceItem[]): void;
  preloadBeat(id: string): void;
  setBeatState(id: string, enabled: boolean): void;
  playInstantBeat(id: string, loop?: boolean): void;
  stopInstantBeat(id: string): void;
  setBpm(bpm: number): void;
  // setKey(camelot: string): void;
  clockHandlers: ClockHandlers;
  cleanup: () => void;
};

type AudioItem = {
  audio: HTMLAudioElement;
  audioBlobObjectURL: string;
  mediaElementSource: MediaElementAudioSourceNode;
  playing: boolean;
};

async function createAudioItem(uri: string): Promise<AudioItem> {
  const ext = uri.split(".").pop();
  const buf = await fetch(uri).then((r) => r.arrayBuffer());
  const audioBlobObjectURL = URL.createObjectURL(
    new Blob([buf], { type: `audio/${ext}` }),
  );
  const audio = new Audio(audioBlobObjectURL);
  const mediaElementSource = audioContext.createMediaElementSource(audio);
  let duration = 0;
  if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
    duration = audio.duration;
  } else {
    await new Promise((resolve, reject) => {
      audio.addEventListener("loadedmetadata", resolve, { once: true });
      audio.addEventListener("error", reject, { once: true });
    });
    duration = audio.duration;
  }
  if (!(Number.isFinite(duration) && duration > 0)) {
    throw new Error(`Invalid duration for ${uri}`);
  }
  return {
    audio,
    audioBlobObjectURL,
    mediaElementSource,
    playing: false,
  };
}

type HostTimeAnchor = {
  time: number;
  transportBarPosition: number;
};

function calculateStartTimePosition(
  timeAnchor: HostTimeAnchor | undefined,
  destinationBpm: number,
  sourceBpm: number,
  sourceBarLength: number,
  playbackRate: number,
  audioContextCurrentTime: number,
): number {
  if (!timeAnchor) return 0;
  const audioDuration = (sourceBarLength * 240) / sourceBpm;
  const { time, transportBarPosition } = timeAnchor;
  const secondsPerBar = 240 / destinationBpm;
  const hostTimePosition =
    transportBarPosition * secondsPerBar + (audioContextCurrentTime - time);
  const mediaTimelinePosition = hostTimePosition * playbackRate;
  return (mediaTimelinePosition + audioDuration) % audioDuration;
}

type SharedStateBus = {
  hostPlaying: boolean;
  hostBpm: number;
  hostTimeAnchor: HostTimeAnchor | undefined;
};

type BeatActor = {
  id: string;
  preload(): void;
  setBeatState(active: boolean): void;
  onHostStart(): void;
  onHostStop(): void;
  playInstant(loop?: boolean): void;
  stopInstant(): void;
  updatePlaybackRate(): void;
  cleanup(): void;
};

function createBeatActor(
  beatSource: BeatSourceItem,
  bus: SharedStateBus,
): BeatActor {
  let createAudioPromise: Promise<AudioItem> | undefined;
  let audioItem: AudioItem | undefined;
  let active = false;

  const internal = {
    async ensureLoaded() {
      if (audioItem) return;
      createAudioPromise ??= createAudioItem(beatSource.uri);
      audioItem = await createAudioPromise;
    },
    async play(syncToHost: boolean, loop: boolean) {
      await internal.ensureLoaded();
      if (!audioItem) return;
      if (syncToHost && (!active || !bus.hostPlaying)) return;
      if (!audioItem.playing) {
        const { audio, mediaElementSource } = audioItem;
        mediaElementSource.connect(audioDestinationNode);
        const playbackRate = bus.hostBpm / beatSource.originalBpm;
        const startTimePosition = syncToHost
          ? calculateStartTimePosition(
              bus.hostTimeAnchor,
              bus.hostBpm,
              beatSource.originalBpm,
              beatSource.barLength,
              playbackRate,
              audioContext.currentTime,
            )
          : 0;
        // console.log({
        //   hb: bus.hostBpm,
        //   ob: audioItem.originalBpm,
        //   dur: audioItem.duration,
        //   pr: playbackRate,
        //   st: startTimePosition,
        // });
        audio.currentTime = startTimePosition;
        audio.loop = loop;
        audio.playbackRate = playbackRate;
        audio.play();
        audioItem.playing = true;
        if (!loop) {
          audio.addEventListener("ended", internal.stop, { once: true });
        }
      }
    },
    stop() {
      if (audioItem?.playing) {
        const { audio, mediaElementSource } = audioItem;
        audio.pause();
        mediaElementSource.disconnect();
        audioItem.playing = false;
      }
    },
  };

  const self: BeatActor = {
    id: beatSource.id,
    preload() {
      void internal.ensureLoaded();
    },
    setBeatState(_active: boolean) {
      active = _active;
      if (bus.hostPlaying) {
        if (active) {
          void internal.play(true, true);
        } else {
          internal.stop();
        }
      } else {
        void internal.ensureLoaded();
      }
    },
    onHostStart() {
      if (active) {
        void internal.play(false, true);
      }
    },
    onHostStop() {
      if (active) {
        internal.stop();
      }
    },
    playInstant(loop?: boolean) {
      void internal.play(false, loop ?? false);
    },
    stopInstant() {
      internal.stop();
    },
    updatePlaybackRate() {
      if (audioItem) {
        const playbackRate = bus.hostBpm / beatSource.originalBpm;
        audioItem.audio.playbackRate = playbackRate;
        return playbackRate;
      }
    },
    cleanup() {
      if (audioItem) {
        const { mediaElementSource, audio, audioBlobObjectURL } = audioItem;
        audio.pause();
        mediaElementSource.disconnect();
        URL.revokeObjectURL(audioBlobObjectURL);
        audioItem = undefined;
      }
    },
  };
  return self;
}

export function createLoopPlayerEngine(): LoopPlayerEngine {
  const bus: SharedStateBus = {
    hostPlaying: false,
    hostBpm: 120,
    hostTimeAnchor: undefined,
  };
  let beatActors: BeatActor[] = [];

  function getBeatActor(id: string): BeatActor | undefined {
    return beatActors.find((beatActor) => beatActor.id === id);
  }

  const self: LoopPlayerEngine = {
    unitInterface,
    registerBeatSourceItems(items) {
      self.cleanup();
      beatActors = items.map((item) => createBeatActor(item, bus));
    },
    preloadBeat(id) {
      const beatActor = getBeatActor(id);
      beatActor?.preload();
    },
    setBeatState(id, enabled) {
      const beatActor = getBeatActor(id);
      beatActor?.setBeatState(enabled);
    },
    playInstantBeat(id, loop) {
      const beatActor = getBeatActor(id);
      beatActor?.playInstant(loop ?? false);
    },
    stopInstantBeat(id) {
      const beatActor = getBeatActor(id);
      beatActor?.stopInstant();
    },
    setBpm(bpm: number) {
      bus.hostBpm = bpm;
      for (const beatActor of beatActors) {
        beatActor.updatePlaybackRate();
      }
    },
    clockHandlers: {
      start() {
        bus.hostPlaying = true;
        for (const beatActor of beatActors) {
          beatActor.onHostStart();
        }
      },
      processScheduling(timeFrom, barFrom, _barTo, bpm) {
        if (bpm !== bus.hostBpm) {
          self.setBpm(bpm);
        }
        bus.hostTimeAnchor = { time: timeFrom, transportBarPosition: barFrom };
      },
      stop() {
        bus.hostPlaying = false;
        for (const beatActor of beatActors) {
          beatActor.onHostStop();
        }
      },
    },
    cleanup() {
      for (const beatActor of beatActors) {
        beatActor.cleanup();
      }
      beatActors.length = 0;
    },
  };
  return self;
}
