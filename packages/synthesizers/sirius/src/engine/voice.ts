import { SynthParameters } from "@/defs/definitions";
import { createAmplifierUnit } from "@/engine/amplifier-unit";
import { createFilterUnit } from "@/engine/filter-unit";
import { createOscillatorsUnit } from "@/engine/oscillators-unit";

export type Voice = {
  outputNode: GainNode;
  updateNodeParameters: () => void;
  gateOn: (time: number) => void;
  gateOff: (time: number) => void;
};

export function createVoice(
  context: AudioContext,
  params: SynthParameters,
  noteNumber: number,
  velocity: number,
): Voice {
  const oscillators = createOscillatorsUnit(context, params, noteNumber);
  const filter = createFilterUnit(context, params, oscillators.bottomFreq);
  filter.update();
  const amp = createAmplifierUnit(context, params, velocity);

  oscillators.outputNode.connect(filter.inputNode);
  filter.outputNode.connect(amp.inputNode);

  let released = false;

  const cleanup = () => {
    oscillators.cleanup();
    filter.cleanup();
    amp.cleanup();
  };

  return {
    outputNode: amp.outputNode,
    updateNodeParameters() {
      const updateTime = context.currentTime;
      oscillators.update(updateTime);
      filter.update(updateTime);
    },
    gateOn(time) {
      const t = time && time > context.currentTime ? time : context.currentTime;
      amp.triggerEnvelope(t);
      filter.triggerEnvelope(t);
      oscillators.start(t);
    },
    gateOff(time) {
      if (!released) {
        const { tOff, releaseTime } = amp.release(time);
        oscillators.stop(tOff + releaseTime + 0.1);
        const delayMs = (tOff + releaseTime + 0.2 - context.currentTime) * 1000;
        setTimeout(cleanup, Math.max(0, delayMs));
        released = true;
      }
    },
  };
}
