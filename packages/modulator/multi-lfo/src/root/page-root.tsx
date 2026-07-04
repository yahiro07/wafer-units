import { qu } from "@/base/css-realm";
import { LfoLane } from "@/root/lfo-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { parameterIds, connected, slots } = store.useSnapshot();
  return (
    <div class={qu.flexC().it}>
      <div class={qu.wh(600, 350).bg("#aaa").p(4).color("#333").it}>
        <div class={qu.flexV().gap(2).it}>
          <div class={qu.flexH().gap(2).it}>
            <div>Multi LFO</div>
            <div class={qu.grow().it} />
            <div class={qu.fontSize(12).it}>
              {connected
                ? `Connected, ${parameterIds.length > 0 ? parameterIds.length : "no"} parameters available`
                : "Disconnected"}
            </div>
          </div>
          <div class={qu.flexVC().gap(2).it}>
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
