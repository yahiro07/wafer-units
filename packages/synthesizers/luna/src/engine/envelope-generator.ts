export function createEnvelopeGenerator(
  destParam: AudioParam,
  configs: {
    attackSec: number;
    decaySec: number;
    releaseSec: number;
  },
) {
  const egParams = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
    hasNaiveWave: false,
  };

  return {
    setParameters(params: {
      attack: number;
      decay: number;
      sustain: number;
      release: number;
      hasNaiveWave: boolean;
    }) {
      Object.assign(egParams, params);
    },
    triggerAttack(time: number) {
      const prAttack = egParams.attack;
      let prDecay = egParams.decay;
      const prSustain = egParams.sustain;
      if (prDecay === 0 && prSustain === 0) {
        prDecay = 0.01;
      }
      const topLevel = prDecay > 0 ? 1 : egParams.sustain;

      destParam.cancelScheduledValues(time);

      if (destParam.value > 0) {
        const jumpTime = egParams.hasNaiveWave ? 0.03 : 0.005;
        destParam.setValueAtTime(destParam.value, time);
        destParam.linearRampToValueAtTime(0, time + jumpTime);
        time += jumpTime;
      }

      const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.002;
      const attackTime = jumpTime + prAttack * configs.attackSec;
      destParam.setValueAtTime(0, time);
      destParam.linearRampToValueAtTime(topLevel, time + attackTime);
      time += attackTime;
      const decayTime = prDecay * configs.decaySec;
      destParam.setValueAtTime(topLevel, time);
      destParam.exponentialRampToValueAtTime(
        Math.max(prSustain, 1e-3),
        time + decayTime,
      );
    },
    triggerRelease(time: number) {
      const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.005;
      const releaseTime = jumpTime + egParams.release * configs.releaseSec;
      destParam.cancelScheduledValues(time);
      destParam.setValueAtTime(destParam.value, time);
      if (releaseTime === jumpTime) {
        destParam.linearRampToValueAtTime(0, time + releaseTime);
      } else {
        destParam.exponentialRampToValueAtTime(1e-4, time + releaseTime);
        destParam.setValueAtTime(0, time + releaseTime);
      }
    },
  };
}
