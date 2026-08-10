import { qu } from "@/base/css-realm";
import { AutomationLane } from "@/root/automation-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { parameterIds, connected, lanes, playbackStepIndex } =
    store.useSnapshot();
  return (
    <div sx={qu.h("dvh").flexC()}>
      <div sx={qu.wh(560, 300).bg("#aaa").p(4).color("#333").flexVC()}>
        <div sx={qu.flexV().gap(4)}>
          <div sx={qu.flexH().gap(2).px(1)}>
            <div>Step Automator</div>
            <div sx={qu.grow()} />
            <div sx={qu.fontSize(12)}>
              {connected
                ? `Connected, ${parameterIds.length > 0 ? parameterIds.length : "no"} parameters available`
                : "Disconnected"}
            </div>
          </div>
          <div sx={qu.flexVC().gap(2)}>
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
