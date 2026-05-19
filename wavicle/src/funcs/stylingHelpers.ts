export function rgbTranslucent(cssColorRgb: string, alpha: number) {
  if (cssColorRgb.length === 4) {
    const hexA = ((alpha * 15) >> 0).toString(16);
    return `${cssColorRgb}${hexA}`;
  } else if (cssColorRgb.length === 7) {
    const hexAA = ((alpha * 255) >> 0).toString(16).padStart(2, '0');
    return `${cssColorRgb}${hexAA}`;
  }
  return cssColorRgb;
}
