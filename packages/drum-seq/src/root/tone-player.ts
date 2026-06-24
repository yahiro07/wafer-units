import { UnitInterface } from "wafer-host/unit-types";

export function createTonePlayer(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  return {
    preloadTone(uri: string) {},
    playTone(uri: string, time: number, pitch: number, volume: number) {},
  };
}
