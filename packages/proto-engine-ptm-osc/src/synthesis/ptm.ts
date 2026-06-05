import { removeDcOffsetInBuffer, tunableSigmoid } from "mofus/mo-synthesis";
import { OscWave } from "@/definitions/parameters";
import { getOscWaveformPdSaw } from "@/synthesis/pd-saw";
import { phaseTweakers } from "@/synthesis/phase-tweakers";

const ptmKeyMap: Partial<Record<OscWave, keyof typeof phaseTweakers>> = {
  [OscWave.sawSfm]: "sfm",
  [OscWave.sawSpeed]: "speed",
  [OscWave.sawAccel]: "accel",
  [OscWave.sawDrill]: "drill",
  [OscWave.sawSdm]: "sdm",
  [OscWave.sawCreep]: "creep",
  [OscWave.sawCreep2]: "creep2",
  [OscWave.sawSquash]: "squash",
  [OscWave.sawSinus]: "sinus",
  [OscWave.sawRidge]: "ridge",
  [OscWave.sawScrew]: "screw",
};

function getShapeCurveFn(wave: number, shape: number): (pp: number) => number {
  if (wave === 0) {
    //saw comp
    const k = -shape * 0.9;
    return (pp) => {
      const y = 1 - pp * 2;
      return tunableSigmoid(y, k);
    };
  } else if (wave === 1) {
    //rect pw
    const bp = 0.5 - shape * 0.4;
    return (pp) => (pp < bp ? 1 : -1);
  } else if (wave === 2) {
    //pd saw
    return (pp) => {
      return getOscWaveformPdSaw(pp, shape);
    };
  } else {
    function applyPtm(key: keyof typeof phaseTweakers) {
      return (pp: number) => {
        let [phase] = phaseTweakers[key](pp, shape);
        phase -= Math.floor(phase);
        return 1 - phase * 2;
      };
    }
    const ptmKey = ptmKeyMap[wave as OscWave];
    if (ptmKey) {
      return applyPtm(ptmKey);
    } else {
      //fallback
      return (pp) => Math.sin(pp * Math.PI * 2);
    }
  }
}

export function fillShaperCurveBuffer(
  curveBuffer: Float32Array,
  wave: number,
  shape: number,
) {
  const sz = curveBuffer.length;
  const shapeCurveFn = getShapeCurveFn(wave, shape);
  for (let i = 0; i < sz; i++) {
    const pp = i / sz;
    const y = shapeCurveFn(pp);
    curveBuffer[i] = y;
  }
  return curveBuffer;
}

export function fillShaperCurveBufferWithDcOffsetRemoval(
  curveBuffer: Float32Array,
  wave: number,
  shape: number,
) {
  fillShaperCurveBuffer(curveBuffer, wave, shape);
  removeDcOffsetInBuffer(curveBuffer);
  return curveBuffer;
}
