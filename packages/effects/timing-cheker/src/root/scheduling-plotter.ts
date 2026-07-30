type SchedulingPoint = {
  barScheduledAt: number;
  barFrom: number;
  barTo: number;
};

export function createSchedulingPlotter() {
  let canvas: HTMLCanvasElement | undefined;
  let barLength = 1;

  let renderIndex = 0;
  let lastX0 = 0;

  function mapBarPositionToPlotX(barPosition: number) {
    if (!canvas) return 0;
    return ((barPosition % barLength) / barLength) * canvas.width;
  }

  const internal = {
    clear() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderIndex = 0;
    },
    plotSchedulePoint(po: SchedulingPoint) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      const x0 = mapBarPositionToPlotX(po.barScheduledAt);
      if (x0 < lastX0) {
        internal.clear();
      }
      const x1 = mapBarPositionToPlotX(po.barFrom);
      const x2 = mapBarPositionToPlotX(po.barTo);
      if (!(x0 <= x1 && x1 <= x2)) return;

      const y = 12 + (renderIndex % 10) * 8;
      const color = "#fa0";
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, y + 0.5);
      ctx.lineTo(x1, y + 0.5);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.fillRect(x0 - 2, y, 4, 4);
      ctx.fillRect(x1, y, x2 - x1, 4);

      lastX0 = x0;

      renderIndex++;
    },
  };

  return {
    setCanvas(_canvas: HTMLCanvasElement) {
      canvas = _canvas;
    },
    hostStarted() {
      internal.clear();
    },
    hostScheduled(barScheduledAt: number, barFrom: number, barTo: number) {
      const schedulingPoint: SchedulingPoint = {
        barScheduledAt,
        barFrom,
        barTo,
      };
      requestAnimationFrame(() => internal.plotSchedulePoint(schedulingPoint));
    },
    setBarLength(length: number) {
      barLength = length;
    },
  };
}
