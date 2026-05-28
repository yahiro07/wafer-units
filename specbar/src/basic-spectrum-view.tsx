import { mapUnaryFrom, mapUnaryTo } from "@beam/ax/number-utils";
import { useEffect, useRef } from "react";
import { useDomElementSize } from "@/use-dom-element-size";

function renderCanvasSpectrum(
  canvas: HTMLCanvasElement,
  fftData: Float32Array,
) {
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x++) {
    const i = Math.floor(
      mapUnaryFrom(x, 0, canvas.width) * (fftData.length - 1),
    );
    const value = mapUnaryFrom(fftData[i], -120, 0, true);
    const px = x;
    const py = mapUnaryTo(value, canvas.height, 0);
    ctx.strokeStyle = "#0f0";
    ctx.beginPath();
    ctx.moveTo(px, canvas.height);
    ctx.lineTo(px, py);
    ctx.stroke();
  }
}

export const BasicSpectrumView = ({ fftData }: { fftData: Float32Array }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDomSize = useDomElementSize(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvasSpectrum(canvas, fftData);
  }, [fftData]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasDomSize?.width ?? 0}
      height={canvasDomSize?.height ?? 0}
      className="w-full h-full"
    />
  );
};
