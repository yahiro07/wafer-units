import { mapUnaryFrom } from "beams/ax/number-utils";

export const SegmentedSpectrumView = ({
  nx,
  ny,
  gapX,
  gapY,
  fftData,
}: {
  nx: number;
  ny: number;
  gapX: number;
  gapY: number;
  fftData: Float32Array;
}) => {
  const elements = [];
  const segmentWidth = (100 - gapX * (nx - 1)) / nx;
  const segmentHeight = (100 - gapY * (ny - 1)) / ny;

  for (let x = 0; x < nx; x++) {
    const dataIdx = Math.floor((x / nx) * fftData.length);
    const val = mapUnaryFrom(fftData[dataIdx], -120, 0, true);
    const activeSegments = Math.round(Math.max(0, Math.min(1, val)) * ny);
    const left = x * (segmentWidth + gapX);
    for (let y = 0; y < ny; y++) {
      const bottom = y * (segmentHeight + gapY);
      const isActive = y < activeSegments;
      elements.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: `${left}%`,
            bottom: `${bottom}%`,
            width: `${segmentWidth}%`,
            height: `${segmentHeight}%`,
            backgroundColor: isActive ? "#0f0" : "#000",
            borderRadius: "1px",
            transition: "background-color 0.1s ease-out",
          }}
        />,
      );
    }
  }
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {elements}
    </div>
  );
};
