import { AudioFetcher, PreviewPlayer } from "@/definitions/interfaces";

export function createPreviewPlayer(
  audioContext: AudioContext,
  audioFetcher: AudioFetcher,
): PreviewPlayer {
  return {
    async play(uri) {
      const buffer = await audioFetcher.fetchAudioBufferCached(uri);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();
    },
  };
}
