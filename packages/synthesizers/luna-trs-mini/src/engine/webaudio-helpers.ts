type CustomUnit = {
  inputNode: AudioNode;
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
    const dest = "inputNode" in nextUnit ? nextUnit.inputNode : nextUnit;
    src.connect(dest);
    unit = nextUnit;
  }
  return () => {
    disconnectNodes(...units);
  };
}
