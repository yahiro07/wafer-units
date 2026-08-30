export function createShaperCurveBufferCache(
  size: number,
  updateFn: (buffer: Float32Array, level: number) => void,
) {
  const buffersCache: Record<number, Float32Array<ArrayBuffer>> = {};

  function createBufferForLevel(level: number) {
    // console.log("createBufferForLevel", level);
    const buffer = new Float32Array(size);
    updateFn(buffer, level);
    return buffer;
  }

  return {
    getCached(key: number, level: number): Float32Array<ArrayBuffer> {
      return (buffersCache[key] ??= createBufferForLevel(level));
    },
  };
}
