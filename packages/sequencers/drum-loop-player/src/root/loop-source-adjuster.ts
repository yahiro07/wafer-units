//adjust loop material samples to satisfy the exact duration for precise looping
export async function loadLoopMaterialDurationAdjusted(
  audioContext: AudioContext,
  uri: string,
  barLength: number,
  originalBpm: number,
): Promise<Blob> {
  const buf = await fetch(uri).then((r) => r.arrayBuffer());
  const decodedData = await audioContext.decodeAudioData(buf.slice(0));
  const totalBeats = barLength * 4;
  const exactDuration = (60 / originalBpm) * totalBeats;
  const targetLengthInSamples = Math.floor(
    exactDuration * decodedData.sampleRate,
  );
  const trimmedLength = Math.min(targetLengthInSamples, decodedData.length);
  const trimmedBuffer = audioContext.createBuffer(
    decodedData.numberOfChannels,
    trimmedLength,
    decodedData.sampleRate,
  );
  for (let i = 0; i < decodedData.numberOfChannels; i++) {
    const channelData = decodedData.getChannelData(i);
    trimmedBuffer.copyToChannel(channelData.subarray(0, trimmedLength), i);
  }
  return audioBufferToWavBlob(trimmedBuffer);
}

function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  const sampleRate = buffer.sampleRate;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(pos, data, true);
    pos += 2;
  }
  function setUint32(data: number) {
    out.setUint32(pos, data, true);
    pos += 4;
  }

  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM
  setUint16(numOfChan);
  setUint32(sampleRate);
  setUint32(sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit
  setUint32(0x61746164); // "data" chunk
  setUint32(length - pos - 4);

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      out.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }
  return new Blob([out.buffer], { type: "audio/wav" });
}
