import { getSortOrder } from "@/utils/helpers";

type SchedulingPoint = {
  barScheduledAt: number;
  barFrom: number;
  barTo: number;
};

type StepPoint = {
  stepIndex: number;
  barPosition: number;
};

type RenderingItem =
  | { type: "schedulingPoint"; point: SchedulingPoint }
  | { type: "stepPoint"; point: StepPoint };

export function createSchedulingPlotter() {
  let canvas: HTMLCanvasElement | null = null;
  let barLength = 1;

  let renderIndex = 0;
  let lastX0 = 0;

  function mapBarPositionToPlotX(barPosition: number) {
    if (!canvas) return 0;
    return ((barPosition % barLength) / barLength) * canvas.width;
  }

  const getCanvasContext = () => canvas?.getContext("2d");

  const renderingItemQueue: RenderingItem[] = [];
  let rafId: number | undefined;

  const getYPosition = () => 16 + (renderIndex % 10) * 8;

  const internal = {
    clear() {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      renderIndex = 0;
    },
    plotSchedulePoint(ctx: CanvasRenderingContext2D, po: SchedulingPoint) {
      const x0 = mapBarPositionToPlotX(po.barScheduledAt);
      if (x0 < lastX0) {
        internal.clear();
      }
      const x1 = mapBarPositionToPlotX(po.barFrom);
      const x2 = mapBarPositionToPlotX(po.barTo);
      if (!(x0 <= x1 && x1 <= x2)) return;

      const y = getYPosition();
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
    },
    plotStepPoint(ctx: CanvasRenderingContext2D, stepPoint: StepPoint) {
      const { stepIndex, barPosition } = stepPoint;
      const x = mapBarPositionToPlotX(barPosition);
      const y = getYPosition();

      ctx.fillStyle = "#f08";
      ctx.fillRect(x - 1, y, 2, 2);

      const y2 = 8;
      if (0) {
        ctx.font = "8px Arial";
        ctx.fillText(stepIndex.toString(), x, y2);
      }
      ctx.fillRect(x - 1, y2, 2, 2);
    },
    flushRenderingItems() {
      renderingItemQueue.sort(
        getSortOrder((it) => (it.type === "schedulingPoint" ? 0 : 1), "asc"),
      );
      const ctx = getCanvasContext();
      if (ctx) {
        for (const item of renderingItemQueue) {
          if (item.type === "schedulingPoint") {
            internal.plotSchedulePoint(ctx, item.point);
          } else {
            internal.plotStepPoint(ctx, item.point);
          }
        }
        renderIndex++;
      }
      renderingItemQueue.length = 0;
      rafId = undefined;
    },
    pushRenderingItem(item: RenderingItem) {
      renderingItemQueue.push(item);
      if (!rafId) {
        rafId = requestAnimationFrame(internal.flushRenderingItems);
      }
    },
  };

  return {
    setCanvas(_canvas: HTMLCanvasElement | null) {
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
      internal.pushRenderingItem({
        type: "schedulingPoint",
        point: schedulingPoint,
      });
    },
    addScheduleStepPoint(stepIndex: number, barPosition: number) {
      internal.pushRenderingItem({
        type: "stepPoint",
        point: { stepIndex, barPosition },
      });
    },
    setBarLength(length: number) {
      barLength = length;
    },
  };
}
