import { AudioFetcher, PreviewPlayer } from "@/definitions/interfaces";

export function createPreviewPlayer(
  audioContext: AudioContext,
  destinationNode: AudioNode,
  audioFetcher: AudioFetcher,
): PreviewPlayer {
  return {
    async play(uri) {
      const buffer = await audioFetcher.fetchAudioBufferCached(uri);
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(destinationNode);
      source.start();
    },
  };
}
