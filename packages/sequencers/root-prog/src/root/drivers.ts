import { queryUnitInterface } from "wafer-host/unit-types";
import { createSequencerEngine } from "@/root/sequencer";
import { store } from "@/root/store";

const unitInterface = queryUnitInterface("wafer-v01");
const engine = createSequencerEngine(unitInterface);

export function setupUnit() {
  engine.setState(store.state);

  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "sequencer",
      viewSize: [460, 280],
    },
    clockHandlers: engine.clockHandlers,
  });
}

export function setupSynchronization() {
  return store.subscribe(({ loopBars, notes }) => {
    if (loopBars !== undefined) {
      engine.setState({ loopBars });
    }
    if (notes !== undefined) {
      engine.setState({ notes });
    }
  });
}
