export type FixedDurationAudioRecorder = {
  inputNode: AudioNode;
  start(options: {
    durationSec: number;
    completeCallback: (blob: Blob) => void;
    progressCallback: (currentSec: number) => void;
  }): void;
  cancel(): void;
};

export function createFixedDurationRecorder(
  audioContext: AudioContext,
): FixedDurationAudioRecorder {
  const mediaStreamDestination = audioContext.createMediaStreamDestination();

  let recording = false;
  let mediaRecorder: MediaRecorder | null = null;
  let timerId: number | null = null;
  let timerId2: number | null = null;
  let cleanupTimers: () => void;

  return {
    inputNode: mediaStreamDestination,
    start({ durationSec, completeCallback, progressCallback }) {
      if (!recording) {
        const startTime = Date.now();
        mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
        const chunks: BlobPart[] = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
          if (recording) {
            const recordedBlob = new Blob(chunks, { type: "audio/webm" });
            mediaRecorder = null;
            completeCallback(recordedBlob);
            recording = false;
          }
        });
        mediaRecorder.start(1000);
        recording = true;

        const durationMs = durationSec * 1000;
        timerId = setTimeout(() => {
          if (recording) {
            if (mediaRecorder?.state === "recording") {
              mediaRecorder?.stop();
            }
            cleanupTimers();
          }
        }, durationMs);
        timerId2 = setInterval(() => {
          const elapsedSec = (Date.now() - startTime) / 1000;
          progressCallback(elapsedSec);
        }, 100);

        cleanupTimers = () => {
          if (timerId) {
            clearTimeout(timerId);
            timerId = null;
          }
          if (timerId2) {
            clearInterval(timerId2);
            timerId2 = null;
          }
        };
      }
    },
    cancel() {
      cleanupTimers();
      if (recording) {
        recording = false;
        if (mediaRecorder?.state === "recording") {
          mediaRecorder?.stop();
        }
      }
    },
  };
}
