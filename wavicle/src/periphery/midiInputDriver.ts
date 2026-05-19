import { asyncRerender } from "alumina";
import { ISynthesizerBase } from "@/base";

type IMidiInputDeviceEntry = {
  id: string;
  name: string;
};

export interface IMidiInputDriver {
  initialize(): Promise<void>;
  allDeviceEntries: IMidiInputDeviceEntry[];
  currentDeviceId: string;
  selectDevice(id: string): void;
}

interface IMidiReceiver {
  start(): void;
  stop(): void;
}

function createMidiReceiver(
  midiIn: MIDIInput,
  synth: ISynthesizerBase,
): IMidiReceiver {
  function handleMidiMessage(ev: MIDIMessageEvent) {
    const [status, data1, velocity] = Array.from(ev.data!);
    const op = status & 0xf0;
    const noteNumber = data1;
    if (op === 0x90 && velocity > 0) {
      synth.noteOn(noteNumber);
    } else if (op === 0x80 || (op === 0x90 && velocity === 0)) {
      synth.noteOff(noteNumber);
    }
    asyncRerender();
  }
  return {
    start() {
      midiIn.addEventListener("midimessage", handleMidiMessage);
    },
    stop() {
      midiIn.removeEventListener("midimessage", handleMidiMessage as any);
    },
  };
}

export function createMidiInputDriver_notInUse(
  synth: ISynthesizerBase,
): IMidiInputDriver {
  let midiAccess: MIDIAccess | undefined;
  let allDeviceEntries: IMidiInputDeviceEntry[] = [];
  let currentDeviceId = "" as string;
  let midiReceiver: IMidiReceiver | undefined;

  function getMidiInputs(): MIDIInput[] {
    if (!midiAccess) return [];
    const res: MIDIInput[] = [];
    midiAccess.inputs.forEach((it) => {
      res.push(it);
    });
    return res;
  }

  function getMidiInputById(id: string): MIDIInput | undefined {
    return getMidiInputs().find((it) => it.id === id);
  }

  function selectDevice(id: string) {
    midiReceiver?.stop();
    const midiIn = getMidiInputById(id);
    if (midiIn) {
      midiReceiver = createMidiReceiver(midiIn, synth);
      midiReceiver.start();
    } else {
      midiReceiver = undefined;
    }
    currentDeviceId = id;
  }

  function updateEnumeration() {
    const prevNumDevices = allDeviceEntries.length;
    allDeviceEntries = getMidiInputs().map((it) => ({
      id: it.id,
      name: it.name || `device_${it.id}`,
    }));
    if (currentDeviceId && !getMidiInputById(currentDeviceId)) {
      selectDevice("");
    }
    if (allDeviceEntries.length !== prevNumDevices) {
      asyncRerender();
    }
  }

  return {
    async initialize() {
      if (!navigator.requestMIDIAccess) {
        return;
      }
      midiAccess = await navigator.requestMIDIAccess();
      updateEnumeration();
      setInterval(updateEnumeration, 1000);
    },

    get allDeviceEntries() {
      return allDeviceEntries;
    },
    get currentDeviceId() {
      return currentDeviceId;
    },
    selectDevice,
  };
}

export function createMidiInputDriverDummy(
  _synth: ISynthesizerBase,
): IMidiInputDriver {
  return {
    async initialize() {
      // do nothing
    },
    get allDeviceEntries() {
      return [];
    },
    get currentDeviceId() {
      return "";
    },
    selectDevice(_id: string) {
      // do nothing
    },
  };
}
