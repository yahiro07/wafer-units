function mapFloatArrayToUint8Array(array: Float32Array): Uint8Array {
  const result = new Uint8Array(array.length);
  for (let i = 0; i < array.length; i++) {
    result[i] = Math.round(array[i] * 127) + 128;
  }
  return result;
}

export const previewDataConverter = {
  floatArrayToBase64: (array: Float32Array) => {
    const bytes = mapFloatArrayToUint8Array(array);
    return btoa(String.fromCharCode(...bytes));
  },
  floatArrayFromBase64: (base64: string) => {
    const bytes = atob(base64);
    const array = new Float32Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      array[i] = (bytes.charCodeAt(i) - 128) / 127;
    }
    return array;
  },
};
