import { qu } from "@/base/css-realm";
import { AutomationLane } from "@/root/automation-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { parameterIds, connected, lanes, playbackStepIndex } =
    store.useSnapshot();
  return (
    <div class={qu.h("dvh").flexC().it}>
      <div class={qu.wh(560, 300).bg("#aaa").p(4).color("#333").flexVC().it}>
        <div class={qu.flexV().gap(4).it}>
          <div class={qu.flexH().gap(2).px(1).it}>
            <div>Step Automator</div>
            <div class={qu.grow().it} />
            <div class={qu.fontSize(12).it}>
              {connected
                ? `Connected, ${parameterIds.length > 0 ? parameterIds.length : "no"} parameters available`
                : "Disconnected"}
            </div>
          </div>
          <div class={qu.flexVC().gap(2).it}>
            {lanes.map((lane) => (
              <AutomationLane
                key={lane.id}
                lane={lane}
                playbackStepIndex={playbackStepIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
