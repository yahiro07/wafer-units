import { setup } from "goober";
import { h } from "preact";
import { createStore } from "snap-store/preact";
import { queryUnitInterface } from "wafer-host/unit-types";
import { cx, qu } from "@/utils/qstyle-goober";

setup(h);

const unitInterface = queryUnitInterface("wafer-v01");

const store = createStore<{
  count: number;
  connected: boolean;
  parameterIds: string[];
}>({
  count: 0,
  connected: false,
  parameterIds: [],
});

unitInterface?.completeSetup({
  unitAspects: {
    unitType: "sequencer",
    outputs: ["automation"],
  },
  unitCallbacks: {
    onConnectedTo(linkedPortSubtypes) {
      console.log("onConnectedTo", linkedPortSubtypes);
      if (linkedPortSubtypes.includes("automation")) {
        const parameterSpecs =
          unitInterface?.automationOutputPort?.getParameterSpecs();
        if (parameterSpecs) {
          store.setParameterIds(parameterSpecs.map((spec) => spec.id));
        }
      }
      store.setConnected(true);
    },
    onDisconnectedTo() {
      store.setParameterIds([]);
      store.setConnected(false);
    },
  },
});

export const App = () => {
  const { count, parameterIds, connected } = store.useSnapshot();
  return (
    <div class={qu.flexC()}>
      <div class={qu.wh_px(500, 300).bg("#aaa").p(4).color("#333")}>
        <div class={qu.flexV(2)}>
          <div>LFO dev</div>
          <div class={qu.flexVL(2)}>
            <div class={qu.bg("yellow").p(2).flexC()}>Hello</div>
            <div
              class={cx(
                qu.bg("blue").p(2).flexC(),
                qu.color("white").weight("bold"),
              )}
            >
              Hello
            </div>
          </div>
          <div>{connected ? "Connected" : "Disconnected"}</div>
          <div onClick={() => store.setCount(count + 1)}>count: {count}</div>
          <div>parameterIds: {JSON.stringify(parameterIds)}</div>
        </div>
      </div>
    </div>
  );
};
