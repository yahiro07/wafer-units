export type IVector = {
  x: number;
  y: number;
};

export function getRelativePointerPosition(
  e: PointerEvent,
  baseElement?: HTMLElement
) {
  const el = baseElement || (e.currentTarget as HTMLElement);
  const bounds = el.getBoundingClientRect();
  const sx = e.pageX - bounds.left;
  const sy = e.pageY - bounds.top;
  return [sx, sy];
}

export function startDragSessionRelative(
  sourceEvent: PointerEvent,
  options: {
    moveHandler?: (delta: IVector, e: PointerEvent) => void;
    upHandler?: () => void;
  }
) {
  const originPos = { x: sourceEvent.clientX, y: sourceEvent.clientY };

  const onPointerMove = (e: PointerEvent) => {
    const pos = { x: e.clientX, y: e.clientY };
    const delta = {
      x: pos.x - originPos.x,
      y: pos.y - originPos.y,
    };
    options.moveHandler?.(delta, e);
    e.preventDefault();
  };

  const onPointerUp = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    options.upHandler?.();
  };

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
}

export const preventDefaultHandler = (e: Event) => e.preventDefault();
