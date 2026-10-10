type CustomUnit = {
  inputNode?: AudioNode;
  outputNode: AudioNode;
};

type IUnit = AudioNode | CustomUnit;

export function disconnectNodes(...units: IUnit[]) {
  let unit = units[0];
  for (let i = 1; i < units.length; i++) {
    const nextUnit = units[i];
    const src = "outputNode" in unit ? unit.outputNode : unit;
    const dest = (
      "inputNode" in nextUnit ? nextUnit.inputNode : nextUnit
    ) as AudioNode;
    if (src && dest) {
      src.disconnect(dest);
    }
    unit = nextUnit;
  }
}

export function connectNodes(...units: IUnit[]) {
  let unit = units[0];
  for (let i = 1; i < units.length; i++) {
    const nextUnit = units[i];
    const src = "outputNode" in unit ? unit.outputNode : unit;
    const dest = (
      "inputNode" in nextUnit ? nextUnit.inputNode : nextUnit
    ) as AudioNode;
    if (src && dest) {
      src.connect(dest);
    }
    unit = nextUnit;
  }
  return () => {
    disconnectNodes(...units);
  };
}

export function createConnectionKeeper() {
  let lastConnectedUnits: IUnit[] | undefined;

  const disconnects = () => {
    if (lastConnectedUnits) {
      disconnectNodes(...lastConnectedUnits);
      lastConnectedUnits = undefined;
    }
  };
  return {
    connects(...units: IUnit[]) {
      const changed = !(
        lastConnectedUnits &&
        lastConnectedUnits.length === units.length &&
        lastConnectedUnits.every((unit, index) => unit === units[index])
      );
      if (changed) {
        disconnects();
        connectNodes(...units);
        lastConnectedUnits = units;
      }
    },
    cleanup() {
      disconnects();
    },
  };
}

export function createNodeParameterSetter(
  ac: AudioContext,
  node: AudioParam,
  lerpTime: number,
) {
  return {
    set(value: number, immediate: boolean = false) {
      if (value === node.value) return;

      const t = ac.currentTime;
      node.cancelScheduledValues(t);
      if (!immediate) {
        node.linearRampToValueAtTime(value, t + lerpTime);
      } else {
        node.value = value;
      }
    },
  };
}
