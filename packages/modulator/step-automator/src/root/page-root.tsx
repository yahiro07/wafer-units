import { qu } from "@/base/css-realm";
import { AutomationLane } from "@/root/automation-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { lanes, playbackStepIndex } = store.useSnapshot();
  return (
    <div sx={qu.h("dvh").flexC()}>
      <div sx={qu.wh(560, 220).bg("#aaa").p(4).color("#333").flexVC()}>
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
  );
};
