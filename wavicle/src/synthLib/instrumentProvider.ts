import {
  allInstrumentKeys,
  IInstrumentKey,
  ISampleLoopingMethod,
} from '~/base';
import {
  instrumentProvider_sampleLoader_getToneBuffer,
  instrumentProvider_sampleLoader_getToneBufferWithLoop,
} from './instrumentProvider_sampleLoader';
import { IInstrumentData } from './types';

interface IInstrumentProvider {
  allInstrumentKeys: IInstrumentKey[];
  loadInstrument(instrumentKeys: string): Promise<IInstrumentData>;
  preloadAllInstrumentSamples(): Promise<void>;
}

type IInstrumentSourceDefinition = {
  instrumentKey: IInstrumentKey;
  sourcePath: string;
  sliceDuration: number;
  noteNumbers: number[];
  looped: boolean;
  gainAdjustment: number;
  releaseParam: number;
  loopingMethod?: ISampleLoopingMethod;
};

function octaveNoteSequence(first: number, num: number) {
  return Array(num)
    .fill(0)
    .map((_, i) => first + i * 12);
}

function createInstrumentsSampleBased(): IInstrumentSourceDefinition[] {
  return [
    {
      instrumentKey: 'piano',
      sourcePath: 'samples/freesound/piano_4s_c0c7.mp3',
      sliceDuration: 4,
      noteNumbers: octaveNoteSequence(24, 8),
      looped: false,
      gainAdjustment: 1,
      releaseParam: 0.5,
    },
    {
      instrumentKey: 'elepi',
      sourcePath: 'samples/freesound/rhodes_4s_d1d6.mp3',
      sliceDuration: 4,
      noteNumbers: octaveNoteSequence(36 + 2, 7),
      looped: false,
      gainAdjustment: 1,
      releaseParam: 0.7,
    },
    {
      instrumentKey: 'celesta',
      sourcePath: 'samples/freesound/celesta_4s_g2g6.mp3',
      sliceDuration: 4,
      noteNumbers: octaveNoteSequence(36 + 7, 5),
      looped: false,
      gainAdjustment: 1,
      releaseParam: 0.7,
    },
    {
      instrumentKey: 'guitar',
      sourcePath: 'samples/freesound/guitar_4s_e3e6.mp3',
      sliceDuration: 4,
      noteNumbers: octaveNoteSequence(36 + 4, 4),
      looped: false,
      gainAdjustment: 1,
      releaseParam: 0.5,
    },
  ];
}

function createInstrumentsArcTrax(): IInstrumentSourceDefinition[] {
  const toneFileSpecs: [
    IInstrumentKey,
    string,
    boolean,
    number,
    number,
    ISampleLoopingMethod | undefined
  ][] = [
    ['bell', 'steelbell.mp3', false, 1.5, 0.9, undefined],
    ['ocarina', 'sleepy.mp3', true, 1, 0.5, 'SL'],

    ['bass1', 'bass2.mp3', false, 1.4, 0.5, undefined],
    ['bass2', 'slidebass.mp3', true, 1, 0.2, 'SL'],

    ['pluck1', 'hipluck2.mp3', false, 1, 0.5, undefined],
    ['pluck2', 'pluck1.mp3', false, 4, 0.5, undefined],
    ['pluck3', 'brightkey.mp3', false, 1, 0.7, undefined],
    ['pluck4', 'key_shiny.mp3', false, 1, 0.7, undefined],

    ['brass1', 'trumpet.mp3', true, 1, 0.4, 'SL'],
    ['brass2', 'brass2.mp3', true, 1.4, 0.5, 'XF'],

    ['lead1', 'super1.mp3', true, 0.7, 0.7, 'XF'],
    ['lead2', 'coldwave.mp3', true, 0.8, 0.5, 'XF'],
    ['lead3', 'lead_bright.mp3', true, 0.4, 0.7, 'XF'],
    ['lead4', 'finale.mp3', true, 0.8, 0.5, 'XF'],

    ['pad1', 'softkey.mp3', false, 1, 0.8, undefined],
    ['pad2', 'pad2.mp3', true, 1, 0.7, 'XF'],

    ['strings1', 'gradient.mp3', true, 0.8, 0.8, 'XF'],
    ['strings2', 'slowstrings.mp3', false, 1, 0.8, undefined],

    ['orchestra', 'grandwave.mp3', true, 1, 0.8, 'XF'],
    ['nes', 'chipwave.mp3', true, 1, 0.4, 'SL'],
  ];

  return toneFileSpecs.map((toneFileSpec) => {
    const [
      instrumentKey,
      toneFileName,
      looped,
      gainAdjustment,
      releaseParam,
      loopingMethod,
    ] = toneFileSpec;
    return {
      instrumentKey,
      pitched: true,
      sourcePath: `samples/arctrax/${toneFileName}`,
      sliceDuration: 4,
      noteNumbers: [33, 45, 57, 69, 81, 93],
      looped,
      gainAdjustment,
      releaseParam,
      loopingMethod,
    };
  });
}

async function loadSamplesFromFile(
  audioContext: AudioContext,
  filePath: string
) {
  const fileName = filePath.split('/').pop();
  console.log(`fetching ${fileName}`);
  const res = await fetch(filePath);
  const buf = await res.arrayBuffer();
  if (buf.byteLength === 0) {
    throw new Error(`invalid audio resource: ${filePath}`);
  }
  return audioContext.decodeAudioData(buf);
}

async function loadInstrumentData(
  def: IInstrumentSourceDefinition,
  audioContext: AudioContext
): Promise<IInstrumentData> {
  const serialTonesBuffer = await loadSamplesFromFile(
    audioContext,
    def.sourcePath
  );
  const toneBuffers = def.noteNumbers.map((noteNumber, sliceIndex) => {
    if (!def.looped) {
      return {
        noteNumber,
        samples: instrumentProvider_sampleLoader_getToneBuffer(
          serialTonesBuffer,
          def.sliceDuration,
          sliceIndex,
          audioContext
        ),
      };
    } else {
      const { samples, loopSpec } =
        instrumentProvider_sampleLoader_getToneBufferWithLoop(
          serialTonesBuffer,
          def.sliceDuration,
          sliceIndex,
          audioContext,
          noteNumber,
          def.loopingMethod
        );
      return {
        noteNumber,
        samples,
        loopSpec,
      };
    }
  });
  return {
    sampleSources: toneBuffers,
    gainAdjustment: def.gainAdjustment,
    releaseParam: def.releaseParam,
  };
}

const instrumentDataCache: Record<string, IInstrumentData> = {};
async function loadInstrumentDataCached(
  def: IInstrumentSourceDefinition,
  audioContext: AudioContext
): Promise<IInstrumentData> {
  return (instrumentDataCache[def.instrumentKey] ||= await loadInstrumentData(
    def,
    audioContext
  ));
}

export function createInstrumentProvider(
  audioContext: AudioContext
): IInstrumentProvider {
  const instrumentSourceDefinitions0: IInstrumentSourceDefinition[] = [
    ...createInstrumentsSampleBased(),
    ...createInstrumentsArcTrax(),
  ];
  const instrumentSourceDefinitions = allInstrumentKeys.map((key) => {
    const res = instrumentSourceDefinitions0.find(
      (def) => def.instrumentKey === key
    );
    if (!res) {
      throw new Error(`instrument definition not found for ${key}`);
    }
    return res;
  });

  return {
    allInstrumentKeys,
    loadInstrument(instrumentKey: string): Promise<IInstrumentData> {
      const def = instrumentSourceDefinitions.find(
        (it) => it.instrumentKey === instrumentKey
      );
      if (!def) {
        throw new Error(`instrument definition not found for ${instrumentKey}`);
      }
      return loadInstrumentDataCached(def, audioContext);
    },
    async preloadAllInstrumentSamples() {
      await Promise.all(
        instrumentSourceDefinitions.map((def) =>
          loadInstrumentDataCached(def, audioContext)
        )
      );
    },
  };
}
