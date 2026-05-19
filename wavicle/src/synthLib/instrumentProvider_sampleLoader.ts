import { ISampleLoopingMethod } from '~/base';
import { nums } from '~/funcs';
import { INoteSampleSourceLoopSpec } from './types';

function copyBuffer(
  dst: Float32Array,
  src: Float32Array,
  offset: number,
  length: number
) {
  for (let i = 0; i < length; i++) {
    const pos = offset + i;
    dst[pos] = src[pos];
  }
}

function scaleBuffer(
  buffer: Float32Array,
  offset: number,
  length: number,
  scale: number
) {
  for (let i = 0; i < length; i++) {
    const pos = offset + i;
    buffer[pos] *= scale;
  }
}

function getToneSlice(buf: Float32Array, sliceDuration: number, index: number) {
  const pos = sliceDuration * index;
  return buf.slice(pos, pos + sliceDuration);
}

export function instrumentProvider_sampleLoader_getToneBuffer(
  serialTonesBuffer: AudioBuffer,
  sliceDuration: number,
  sliceIndex: number,
  audioContext: AudioContext
): AudioBuffer {
  const sr = serialTonesBuffer.sampleRate;
  const dur = sliceDuration;

  const toneBuffer = audioContext.createBuffer(2, sr * dur, sr);

  const srcBufL0 = serialTonesBuffer.getChannelData(0);
  const srcBufR0 = serialTonesBuffer.getChannelData(1);
  const modBufL = toneBuffer.getChannelData(0);
  const modBufR = toneBuffer.getChannelData(1);

  const srcBufL = getToneSlice(srcBufL0, sr * dur, sliceIndex);
  const srcBufR = getToneSlice(srcBufR0, sr * dur, sliceIndex);

  copyBuffer(modBufL, srcBufL, 0, sr * dur);
  copyBuffer(modBufR, srcBufR, 0, sr * dur);
  return toneBuffer;
}

function fillBufferWithSlope(args: {
  srcBuf: Float32Array;
  srcOffset: number;
  destBuf: Float32Array;
  destOffset: number;
  duration: number;
  v0: number;
  v1: number;
}) {
  const { srcBuf, srcOffset, duration, destBuf, destOffset, v0, v1 } = args;
  for (let i = 0; i < duration; i++) {
    const level = nums.lerpMap(i, 0, duration, v0, v1, true);
    destBuf[destOffset + i] += srcBuf[srcOffset + i] * level;
  }
}

export function instrumentProvider_sampleLoader_getToneBufferWithLoop0(
  serialTonesBuffer: AudioBuffer,
  sliceDuration: number,
  sliceIndex: number,
  audioContext: AudioContext,
  noteNumber: number
): { samples: AudioBuffer; loopSpec: INoteSampleSourceLoopSpec } {
  const sr = serialTonesBuffer.sampleRate;
  const dur = sliceDuration;

  const srcBufL0 = serialTonesBuffer.getChannelData(0);
  const srcBufR0 = serialTonesBuffer.getChannelData(1);
  const srcBufL = getToneSlice(srcBufL0, sr * dur, sliceIndex);
  const srcBufR = getToneSlice(srcBufR0, sr * dur, sliceIndex);

  const toneBuffer = audioContext.createBuffer(2, sr * dur, sr);
  const modBufL = toneBuffer.getChannelData(0);
  const modBufR = toneBuffer.getChannelData(1);

  const freq = Math.pow(2, (noteNumber - 69) / 12) * 440;

  const loopHeadSec = 0.75;
  const loopDurSecBase = 2;

  const periodInSec = 1 / freq;
  const numPeriod = Math.floor(loopDurSecBase / periodInSec);
  const loopDurSec = numPeriod * periodInSec;

  const posLoopStart = (sr * loopHeadSec) >> 0;
  const posLoopEnd = (sr * (loopHeadSec + loopDurSec)) >> 0;
  const fadeDur = (sr * 0.01) >> 0;

  function fillModBuf(modBuf: Float32Array, srcBuf: Float32Array) {
    copyBuffer(modBuf, srcBuf, 0, posLoopEnd - fadeDur);
    fillBufferWithSlope({
      srcBuf: srcBuf,
      srcOffset: posLoopEnd - fadeDur,
      destBuf: modBuf,
      destOffset: posLoopEnd - fadeDur,
      duration: fadeDur,
      v0: 1.0,
      v1: 0.0,
    });
    fillBufferWithSlope({
      srcBuf: srcBuf,
      srcOffset: posLoopStart - fadeDur,
      destBuf: modBuf,
      destOffset: posLoopEnd - fadeDur,
      duration: fadeDur,
      v0: 0.0,
      v1: 1.0,
    });
  }
  fillModBuf(modBufL, srcBufL);
  fillModBuf(modBufR, srcBufR);

  return { samples: toneBuffer, loopSpec: { posLoopStart, posLoopEnd } };
}

export function instrumentProvider_sampleLoader_getToneBufferWithLoop(
  serialTonesBuffer: AudioBuffer,
  sliceDuration: number,
  sliceIndex: number,
  audioContext: AudioContext,
  noteNumber: number,
  loopingMethod: ISampleLoopingMethod = 'SL'
): { samples: AudioBuffer; loopSpec: INoteSampleSourceLoopSpec } {
  const sr = serialTonesBuffer.sampleRate;
  const dur = sliceDuration;

  const srcBufL0 = serialTonesBuffer.getChannelData(0);
  const srcBufR0 = serialTonesBuffer.getChannelData(1);
  const srcBufL = getToneSlice(srcBufL0, sr * dur, sliceIndex);
  const srcBufR = getToneSlice(srcBufR0, sr * dur, sliceIndex);

  const toneBuffer = audioContext.createBuffer(2, sr * dur, sr);
  const modBufL = toneBuffer.getChannelData(0);
  const modBufR = toneBuffer.getChannelData(1);

  const freq = Math.pow(2, (noteNumber - 69) / 12) * 440;

  if (loopingMethod === 'SL') {
    // simple loop
    const loopHeadSec = 0.75;
    const loopDurSecBase = 2;

    const periodInSec = 1 / freq;
    const numPeriod = Math.floor(loopDurSecBase / periodInSec);
    const loopDurSec = numPeriod * periodInSec;

    const posLoopStart = (sr * loopHeadSec) >> 0;
    const posLoopEnd = (sr * (loopHeadSec + loopDurSec)) >> 0;
    const fadeDur = (sr * 0.01) >> 0;

    function fillModBuf(modBuf: Float32Array, srcBuf: Float32Array) {
      copyBuffer(modBuf, srcBuf, 0, posLoopEnd - fadeDur);
      fillBufferWithSlope({
        srcBuf: srcBuf,
        srcOffset: posLoopEnd - fadeDur,
        destBuf: modBuf,
        destOffset: posLoopEnd - fadeDur,
        duration: fadeDur,
        v0: 1.0,
        v1: 0.0,
      });
      fillBufferWithSlope({
        srcBuf: srcBuf,
        srcOffset: posLoopStart - fadeDur,
        destBuf: modBuf,
        destOffset: posLoopEnd - fadeDur,
        duration: fadeDur,
        v0: 0.0,
        v1: 1.0,
      });
    }
    fillModBuf(modBufL, srcBufL);
    fillModBuf(modBufR, srcBufR);

    return { samples: toneBuffer, loopSpec: { posLoopStart, posLoopEnd } };
  } else {
    // cross fade
    const loopHeadSec = 0.75;
    const loopDurSecBase = 1;
    const periodInSec = 1 / freq;
    const numPeriod = Math.floor(loopDurSecBase / periodInSec);
    const loopDurSec = numPeriod * periodInSec;

    const posLoopStart = (sr * loopHeadSec) >> 0;
    const posLoopMid = (sr * (loopHeadSec + loopDurSec)) >> 0;
    const posLoopEnd = (sr * (loopHeadSec + loopDurSec * 2)) >> 0;
    const loopDur = (sr * loopDurSec) >> 0;

    const loopDurHalf = loopDur >> 1;

    const posA = posLoopMid - loopDurHalf;
    const posC = posLoopMid + loopDurHalf;

    function fillModBuf(modBuf: Float32Array, srcBuf: Float32Array) {
      copyBuffer(modBuf, srcBuf, 0, posLoopMid);
      fillBufferWithSlope({
        srcBuf: srcBuf,
        srcOffset: posLoopMid,
        destBuf: modBuf,
        destOffset: posLoopMid,
        duration: loopDur,
        v0: 1.0,
        v1: 0.0,
      });
      fillBufferWithSlope({
        srcBuf: srcBuf,
        srcOffset: posLoopStart,
        destBuf: modBuf,
        destOffset: posLoopMid,
        duration: loopDur,
        v0: 0.0,
        v1: 1.0,
      });

      if (1) {
        fillBufferWithSlope({
          srcBuf: srcBuf,
          srcOffset: posLoopMid,
          destBuf: modBuf,
          destOffset: posLoopMid,
          duration: loopDurHalf,
          v0: 0.5,
          v1: 1.0,
        });
        fillBufferWithSlope({
          srcBuf: srcBuf,
          srcOffset: posC,
          destBuf: modBuf,
          destOffset: posC,
          duration: loopDurHalf,
          v0: 1.0,
          v1: 0.5,
        });
        fillBufferWithSlope({
          srcBuf: srcBuf,
          srcOffset: posLoopEnd,
          destBuf: modBuf,
          destOffset: posLoopMid,
          duration: loopDurHalf,
          v0: 0.5,
          v1: 0,
        });
        fillBufferWithSlope({
          srcBuf: srcBuf,
          srcOffset: posA,
          destBuf: modBuf,
          destOffset: posC,
          duration: loopDurHalf,
          v0: 0,
          v1: 0.5,
        });

        scaleBuffer(modBuf, posLoopMid, loopDur, 0.667);
      }
    }
    fillModBuf(modBufL, srcBufL);
    fillModBuf(modBufR, srcBufR);

    return {
      samples: toneBuffer,
      loopSpec: { posLoopStart: posLoopMid, posLoopEnd },
    };
  }
}
