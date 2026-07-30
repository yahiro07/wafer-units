import { loopSourceItems } from "@/root/definitions";
import { previewDataConverter } from "@/root/preview-data-converter";

const configs = {
  numPoints: 100,
};

async function loadAudioWaveform(uri: string) {
  const response = await fetch(uri);
  if (!response.ok) throw new Error(`fetch failed: ${uri}`);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const left = audioBuffer.getChannelData(0);
  const right =
    audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < mono.length; i++) {
    mono[i] = (left[i] + right[i]) * 0.5;
  }
  return {
    sampleRate: audioBuffer.sampleRate,
    duration: audioBuffer.duration,
    length: audioBuffer.length,
    mono,
  };
}

function downsampleForWaveform(
  samples: Float32Array,
  width: number,
): Float32Array {
  const result = new Float32Array(width);
  const blockSize = samples.length / width;
  for (let i = 0; i < width; i++) {
    let min = 1;
    let max = -1;
    const start = Math.floor(i * blockSize);
    const end = Math.floor((i + 1) * blockSize);
    for (let j = start; j < end; j++) {
      const v = samples[j];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    result[i] = Math.max(Math.abs(min), Math.abs(max));
  }
  return result;
}

export async function pregeneratePreviewData() {
  const mappedItems = await Promise.all(
    loopSourceItems.map(async (item) => {
      const uri = `./loops/${item.fileName}`;
      const { mono } = await loadAudioWaveform(uri);
      const peaks = downsampleForWaveform(mono, configs.numPoints);
      const base64 = previewDataConverter.floatArrayToBase64(peaks);
      return {
        fileName: item.fileName,
        levelsBase64: base64,
      };
    }),
  );
  const data = Object.fromEntries(
    mappedItems.map((item) => [item.fileName, item.levelsBase64]),
  );
  const text = JSON.stringify(data);
  console.log(text);
}
