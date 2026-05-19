import { asyncRerender } from 'alumina';
import { nums } from './utils';

export type IValueAnimator = {
  flush(): void;
};

export function animateValue(
  destFn: (value: number) => void,
  v0: number,
  v1: number,
  timeMs: number
): IValueAnimator {
  const startTime = Date.now();
  const endTime = startTime + timeMs;
  let complete = false;
  const loopFn = () => {
    if (complete) {
      return;
    }
    const currentTime = Date.now();
    if (currentTime > +endTime) {
      destFn(v1);
      complete = true;
    } else {
      const pos = nums.lerpMap(currentTime, startTime, endTime, 0, 1, true);
      const pos2 = 1 - Math.pow(1 - pos, 2);
      const value = nums.lerpMap(pos2, 0, 1, v0, v1);
      destFn(value);
      requestAnimationFrame(loopFn);
    }
    asyncRerender();
  };
  loopFn();

  return {
    flush() {
      if (!complete) {
        destFn(v1);
        complete = true;
      }
    },
  };
}
