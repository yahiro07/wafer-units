type NotesPlotter = {
  setCanvas(canvas: HTMLCanvasElement | null): void;
  setBarLength(length: number): void;
  hostStarted(): void;
  putNoteScheduleEvent(
    barScheduledAt: number,
    barPoint: number,
    noteNumber: number,
    isOn: boolean,
  ): void;
};

export function createNotesPlotter(): NotesPlotter {
  let canvas: HTMLCanvasElement | null = null;
  let barLength = 1;

  function mapBarPositionToPlotX(barPosition: number) {
    if (!canvas) return 0;
    return ((barPosition % barLength) / barLength) * canvas.width;
  }

  const getCanvasContext = () => canvas?.getContext("2d");

  let yIndex = 0;
  let lastX0 = 0;

  return {
    setCanvas(_canvas) {
      canvas = _canvas;
    },
    setBarLength(length) {
      barLength = length;
    },
    hostStarted() {
      yIndex = 0;
    },
    putNoteScheduleEvent(barScheduledAt, barPoint, noteNumber, isOn) {
      const ctx = getCanvasContext();
      if (!ctx) return;
      const x0 = mapBarPositionToPlotX(barScheduledAt);
      if (x0 < lastX0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      const x1 = mapBarPositionToPlotX(barPoint);
      const y = yIndex * 8 + 8;
      if (x1 >= x0) {
        const color = "#08f";
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillRect(x0 - 2, y - 2, 4, 4);
        if (!isOn) {
          ctx.fillStyle = "#666";
        }
        ctx.fillRect(x1 - 2, y - 2, 4, 4);
        if (isOn) {
          ctx.fillText(noteNumber.toString(), x1, y + 8);
        }
      }
      yIndex = (yIndex + 1) % 10;
      lastX0 = x0;
    },
  };
}
