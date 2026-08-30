type CustomUnit = {
  inputNode?: AudioNode;
  outputNode: AudioNode;
};

export function disconnectNodes(...units: (AudioNode | CustomUnit)[]) {
  for (const unit of units) {
    const port = "outputNode" in unit ? unit.outputNode : unit;
    port.disconnect();
  }
}

export function connectNodes(...units: (AudioNode | CustomUnit)[]) {
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
