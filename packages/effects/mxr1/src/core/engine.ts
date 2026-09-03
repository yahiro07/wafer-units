import { UnitInterface } from "wafer-host/unit-types";
import { ChannelParameters, EffectParameters } from "@/core/definitions";
import { mapUnaryFrom } from "@/utils/synth-math-utils";
import { connectNodes } from "@/core/webaudio-helper";
import { mapKnobCurveCenterUnity } from "@/core/volume-curve";

type ChannelStripLane = {
  inputNode: AudioNode;
  mainOutputNode: AudioNode;
  auxOutputNode: AudioNode;
  update(params: ChannelParameters): void;
};

type SwitchedFilter = {
  node: AudioNode;
  update(params: { prFreq: number; prQ: number }): void;
};

function mapCutoff(prFreqU: number): number {
  const top = Math.log2(20000);
  return Math.pow(2, prFreqU * top);
}

function createSwitchedFilter(ac: AudioContext): SwitchedFilter {
  const filterNode = ac.createBiquadFilter();
  return {
    node: filterNode,
    update({ prFreq, prQ }) {
      if (prFreq < 0.5) {
        filterNode.type = "lowpass";
        const prFreqU = mapUnaryFrom(prFreq, 0, 0.5);
        filterNode.frequency.value = mapCutoff(prFreqU);
      } else {
        filterNode.type = "highpass";
        const prFreqU = mapUnaryFrom(prFreq, 0.5, 1);
        filterNode.frequency.value = mapCutoff(prFreqU);
      }
      filterNode.Q.value = prQ * 10;
    },
  };
}

type TiltingEq = {
  inputNode: AudioNode;
  outputNode: AudioNode;
  update(params: { prFreq: number; prTilt: number }): void;
  cleanup(): void;
};

function createTiltingEq(ac: AudioContext): TiltingEq {
  const filter1 = ac.createBiquadFilter();
  const filter2 = ac.createBiquadFilter();
  filter1.connect(filter2);
  filter1.type = "lowshelf";
  filter2.type = "highshelf";
  return {
    inputNode: filter1,
    outputNode: filter2,
    update({ prFreq, prTilt }) {
      const freq = mapCutoff(prFreq);
      filter1.frequency.value = freq;
      filter2.frequency.value = freq;
      const tiltDb = prTilt * 8;
      filter1.gain.value = -tiltDb;
      filter2.gain.value = tiltDb;
    },
    cleanup() {
      filter1.disconnect();
    },
  };
}

function createChannelStripLane(ac: AudioContext): ChannelStripLane {
  const inputNode = ac.createGain();
  const mainOutputNode = ac.createGain();
  const auxOutputNode = ac.createGain();

  const filter = createSwitchedFilter(ac);
  const eq = createTiltingEq(ac);
  const panner = ac.createStereoPanner();
  connectNodes(inputNode, filter.node, eq.inputNode, panner);
  panner.connect(mainOutputNode);
  panner.connect(auxOutputNode);

  return {
    inputNode,
    mainOutputNode,
    auxOutputNode,
    update(params: ChannelParameters) {
      filter.update({
        prFreq: params.filterFreq,
        prQ: params.filterQ,
      });
      eq.update({
        prFreq: params.eqFreq,
        prTilt: params.eqTilt,
      });
      panner.pan.value = params.pan;
      mainOutputNode.gain.value = mapKnobCurveCenterUnity(params.levelMain);
      auxOutputNode.gain.value = mapKnobCurveCenterUnity(params.levelAux);
    },
  };
}

export function createEngine(unitInterface: UnitInterface | undefined) {
  const ac = unitInterface?.audioContext ?? new AudioContext();
  const mainDestinationNode = unitInterface?.audioOutputNode ?? ac.destination;
  const auxDestinationNode =
    unitInterface?.createAdditionalAudioOutputNode("aux") ?? ac.createGain();

  const ch1Input =
    unitInterface?.createAdditionalAudioInputNode("ch1") ?? ac.createGain();
  // const ch2Input = unitInterface?.createAdditionalAudioInputNode("ch2");

  const ch1Lane = createChannelStripLane(ac);
  const mainGainNode = ac.createGain();
  const auxGainNode = ac.createGain();

  ch1Input.connect(ch1Lane.inputNode);
  ch1Lane.mainOutputNode.connect(mainGainNode).connect(mainDestinationNode);
  ch1Lane.auxOutputNode.connect(auxGainNode).connect(auxDestinationNode);

  return {
    setParameters(pr: EffectParameters) {
      ch1Lane.update({
        pan: pr.ch1Pan,
        filterFreq: pr.ch1FilterFreq,
        filterQ: pr.ch1FilterQ,
        eqFreq: pr.ch1EqFreq,
        eqTilt: pr.ch1EqTilt,
        levelMain: pr.ch1LevelMain,
        levelAux: pr.ch1LevelAux,
      });
      mainGainNode.gain.value = mapKnobCurveCenterUnity(pr.mainGain);
      auxGainNode.gain.value = mapKnobCurveCenterUnity(pr.auxGain);
    },
    cleanup() {
      ch1Input.disconnect();
      ch1Lane.mainOutputNode.disconnect();
      ch1Lane.auxOutputNode.disconnect();
    },
  };
}
