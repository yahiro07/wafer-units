import { qu } from "@/base/css-realm";
import { LfoLane } from "@/root/lfo-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { parameterIds, connected, slots } = store.useSnapshot();
  return (
    <div sx={qu.h("dvh").flexC()}>
      <div sx={qu.wh(500, 310).bg("#aaa").p(4).color("#333")}>
        <div sx={qu.flexV().gap(3).px(4.5)}>
          <div sx={qu.flexH().gap(2)}>
            <div>Multi LFO</div>
            <div sx={qu.grow()} />
            <div sx={qu.fontSize(12)}>
              {connected
                ? `Connected, ${parameterIds.length > 0 ? parameterIds.length : "no"} parameters available`
                : "Disconnected"}
            </div>
          </div>
          <div sx={qu.flexVC().gap(2)}>
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
