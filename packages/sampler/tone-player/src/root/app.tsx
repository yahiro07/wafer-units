import { useSetupDrivers } from "@/root/drivers";
import { useSetupLoaderTask } from "@/root/loader-task";

const PageRoot = () => {
  return (
    <div class="flex-v bg-clControlBg bd-clControlEdge py-2 px-4">
      <div class="text-xl font-bold">SAMPLER1</div>
      <div class="flex-ha gap-6">
        {/* <LabeledBox label={`SHIFT ${parameters.noteShift}`}>
          <Knob
            value={parameters.noteShift}
            onChange={(value) => actions.setParameter("noteShift", value)}
            min={-12}
            max={12}
            step={1}
          />
        </LabeledBox>
        <LabeledBox label="VOLUME">
          <Knob
            value={parameters.volume}
            onChange={(value) => actions.setParameter("volume", value)}
          />
        </LabeledBox>
        <LabeledBox label="RELEASE">
          <Knob
            value={parameters.release}
            onChange={(value) => actions.setParameter("release", value)}
          />
        </LabeledBox> */}
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  useSetupLoaderTask();
  return <PageRoot />;
};
