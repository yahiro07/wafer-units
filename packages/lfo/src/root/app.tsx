import { setup } from "goober";
import { h } from "preact";
import { LfoLane } from "@/root/lfo-lane";
import { store } from "@/root/store";
import { qu } from "@/utils/qstyle-goober";

setup(h);

export const App = () => {
  const { parameterIds, connected, slots } = store.useSnapshot();
  return (
    <div class={qu.flexC()}>
      <div class={qu.wh(600, 350).bg("#aaa").p(4).color("#333")}>
        <div class={qu.flexV().gap(2)}>
          <div class={qu.flexH().gap(2)}>
            <div>Multi LFO</div>
            <div class={qu.grow()} />
            <div>{connected ? "Connected" : "Disconnected"}</div>
          </div>
          <div>parameterIds: {JSON.stringify(parameterIds)}</div>
          <div class={qu.flexVC().gap(2)}>
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
