import { defaultSynthParameters } from "@/defs/definitions";
import { ISynthesizer } from "@/defs/interfaces";
import { createAmplifierUnit } from "@/engine/amplifier-unit";
import { createEffectChain } from "@/engine/effect-chain";
import { SynthesisBus } from "@/engine/engine-defs";
import { createFilterUnit } from "@/engine/filter-unit";
import { createOscillatorUnit } from "@/engine/oscillator-unit";
import { connectNodes } from "@/engine/webaudio-helpers";
import { UnitInterface } from "wafer-host/unit-types";

export function createSynthesizer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISynthesizer {
  const ac = audioContext;
  const destinationNode = unitInterface?.audioOutputNode ?? ac.destination;

  const bus: SynthesisBus = {
    parameters: { ...defaultSynthParameters },
    audioContext: ac,
  };

  const osc = createOscillatorUnit(bus);
  const filter = createFilterUnit(bus);
  const amp = createAmplifierUnit(bus);
  const effectChain = createEffectChain(bus);

  const disconnects = connectNodes(
    osc,
    filter,
    amp,
    effectChain,
    destinationNode,
  );

  let latestNoteNumber = 48;
  let oscStarted = false;

  return {
    setParameters(_parameters) {
      Object.assign(bus.parameters, _parameters);
      osc.update(latestNoteNumber);
      filter.update(latestNoteNumber);
      effectChain.update();
    },
    noteOn(noteNumber, time = ac.currentTime, modSpec) {
      if (!oscStarted) {
        osc.start(time);
        oscStarted = true;
      }
      if (modSpec?.slide) {
        osc.update(latestNoteNumber);
        osc.slideTo(latestNoteNumber, noteNumber, time, time + 0.06);
      } else {
        osc.update(noteNumber);
      }
      filter.update(noteNumber);
      filter.gateOn(time, modSpec?.accent);
      amp.gateOn(time, modSpec?.accent);
      latestNoteNumber = noteNumber;
    },
    noteOff(noteNumber, time = ac.currentTime) {
      if (noteNumber === latestNoteNumber) {
        filter.gateOff(time);
        amp.gateOff(time);
      }
    },
    cleanup() {
      disconnects();
      osc.stop();
      filter.cleanup();
      amp.cleanup();
    },
  };
}
