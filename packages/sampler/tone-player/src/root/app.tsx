import { Knob } from "@/components/knob";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { actions } from "@/root/actions";
import { engine } from "@/root/engine-instance";
import { LabeledBox } from "@/components/labeled-controls";

const PageRoot = () => {
  const { parameters } = store.useSnapshot();

  return (
    <div class="flex-v bg-clControlBg bd-clControlEdge py-2 px-4">
      <div class="text-xl font-bold">SAMPLER1</div>
      <div class="flex-ha gap-6">
        <LabeledBox label={`SHIFT ${parameters.noteShift}`}>
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
        </LabeledBox>
        <input
          className="border border-dashed border-clControlEdge rounded-md p-2 h-[80px]"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              engine.loadSampleFile(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
