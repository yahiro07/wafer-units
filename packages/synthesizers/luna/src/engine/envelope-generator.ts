export function createEnvelopeGenerator(
  destParam: AudioParam,
  configs: {
    attackSec: number;
    decaySec: number;
    releaseSec: number;
  },
  secondDestParam?: AudioParam,
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

      const startTime = time;
      destParam.cancelScheduledValues(startTime);
      destParam.setValueAtTime(0, startTime);

      if (secondDestParam) {
        secondDestParam.cancelScheduledValues(startTime);
        secondDestParam.setValueAtTime(1, startTime);
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
    getReleaseDuration() {
      const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.005;
      return jumpTime + egParams.release * configs.releaseSec;
    },
    triggerRelease(time: number) {
      if (secondDestParam) {
        const targetParam = secondDestParam;
        const jumpTime = egParams.hasNaiveWave ? 0.02 : 0.005;
        const releaseTime = jumpTime + egParams.release * configs.releaseSec;
        targetParam.cancelScheduledValues(time);
        targetParam.setValueAtTime(1, time);
        if (releaseTime === jumpTime) {
          targetParam.linearRampToValueAtTime(0, time + releaseTime);
        } else {
          targetParam.exponentialRampToValueAtTime(1e-4, time + releaseTime);
          targetParam.setValueAtTime(0, time + releaseTime);
        }
      }
    },
  };
}
