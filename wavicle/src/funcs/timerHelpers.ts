export function createLoopIntervalMonitor(): { next(): number } {
  let prevTimeStamp = Date.now();
  return {
    next(): number {
      const timeStamp = Date.now();
      const elapsedMs = timeStamp - prevTimeStamp;
      prevTimeStamp = timeStamp;
      return elapsedMs;
    },
  };
}

export function debounce<T extends any[]>(
  targetProc: (...args: T) => void,
  ms: number
) {
  let timerId: NodeJS.Timeout | undefined;
  return (...args: T) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = undefined;
    }
    timerId = setTimeout(() => targetProc(...args), ms);
  };
}
