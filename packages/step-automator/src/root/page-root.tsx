import { AutomationLane } from "@/root/automation-lane";
import { store } from "@/root/store";
import { qu } from "@/utils/qstyle-goober";

export const PageRoot = () => {
  const { parameterIds, connected, lanes, playbackStepIndex } =
    store.useSnapshot();
  return (
    <div class={qu.flexC()}>
      <div class={qu.wh(600, 350).bg("#aaa").p(4).color("#333")}>
        <div class={qu.flexV().gap(2)}>
          <div class={qu.flexH().gap(2)}>
            <div>Step Automator</div>
            <div class={qu.grow()} />
            <div class={qu.fontSize(12)}>
              {connected
                ? `Connected, ${parameterIds.length > 0 ? parameterIds.length : "no"} parameters available`
                : "Disconnected"}
            </div>
          </div>
          <div class={qu.flexVC().gap(2)}>
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
