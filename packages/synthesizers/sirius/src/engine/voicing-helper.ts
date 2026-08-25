export function invokeAtJustBefore(
  context: AudioContext,
  time: number,
  callback: () => void,
) {
  const waitingMs = (time - context.currentTime) * 1000 - 4;
  if (waitingMs > 0) {
    setTimeout(callback, waitingMs);
  } else {
    callback();
  }
}
