import { LabeledKnob } from "@/components/labeled-controls";
import { appModel } from "@/model/app-model";
import { SourceEditPanel } from "@/view/source-edit-panel";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { useEffect } from "preact/hooks";

const SamplerSourcePanel = () => {
  const { audioBaseUrl, audioPaths } = appModel.useSnapshot();
  return (
    <div class="w-200px h-400px bg-#aaa">
      list of entry samples, text only, max 24 entries
      <div>base: {audioBaseUrl}</div>
      <div>
        {audioPaths.map((path, i) => (
          <div key={i}>{path}</div>
        ))}
      </div>
    </div>
  );
};

const SamplerAssignmentPanel = () => {
  return (
    <div class="w-200px h-400px bg-#aaa">
      slots with waveform levels 12 items
    </div>
  );
};

const CommonParametersPart = () => {
  return (
    <div class="flex-ha w-400px h-100px bd-#888 gap-4">
      <LabeledKnob label="time" value={0} />
      <LabeledKnob label="tone" value={0} />
      <LabeledKnob label="mix" value={0} />

      <LabeledKnob label="main" value={0} />
      <LabeledKnob label="aux" value={0} />
    </div>
  );
};

const CurrentSlotSection = () => {
  return (
    <div class="flex-ha bd-#333">
      <div class="flex-v">
        <div class={"w-220px h-70px bd-#888"}>waveform</div>
        <div>1 super-awesome-kick-123.ogg</div>
      </div>
      <div class="flex-ha gap-4">
        <LabeledKnob label="volume" value={0} />
        <LabeledKnob label="pan" value={0} />
        <LabeledKnob label="drive" value={0} />
        <LabeledKnob label="eq" value={0} />
        <LabeledKnob label="send" value={0} />
      </div>
    </div>
  );
};

const SourceSampleCard = ({ path, index }: { path: string; index: number }) => {
  return (
    <div
      class="w-64px h-36px bd-#888 text-xs"
      onClick={() => appModel.playSourcePreview(index)}
    >
      {path}
    </div>
  );
};

const SourceSamplesSection = () => {
  const { audioPaths } = appModel.useSnapshot();
  return (
    <div class="min-h-72px flex-ha">
      <div class="flex flex-wrap">
        {audioPaths.map((path, i) => (
          <SourceSampleCard key={i} path={path} index={i} />
        ))}
      </div>
    </div>
  );
};

const SlotColumn = ({ slotIndex }: { slotIndex: number }) => {
  return (
    <div class="flex-v w-60px">
      <div
        class={"h-30px bd-#888"}
        onClick={() => appModel.assignAudio(slotIndex, slotIndex)}
      ></div>
      <div class={"h-36px bd-#888 flex-c"}>{slotIndex + 1}</div>
      <div
        class={"h-36px bd-#888"}
        onClick={() => appModel.triggerSlot(slotIndex)}
      ></div>
    </div>
  );
};

const SlotsSection = () => {
  return (
    <div class={"flex-h gap-2"}>
      {seqNumbers(12).map((i) => (
        <SlotColumn key={i} slotIndex={i} />
      ))}
    </div>
  );
};

const MachinePanel = () => {
  return (
    <div class="flex-v bg-#bbb text-#444 w-800px h-460px p-4 gap-4">
      <div class="flex-ha justify-between">
        <h1 class={"text-xl"}>Tone-Player</h1>
        <CommonParametersPart />
      </div>
      <CurrentSlotSection />
      <SourceSamplesSection />
      <SlotsSection />
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v">
      {/* <div class="text-xl font-bold">SAMPLER1</div> */}
      <div class="flex-ha gap-6">
        <SourceEditPanel />
        <SamplerSourcePanel />
        <SamplerAssignmentPanel />
      </div>
      <MachinePanel />
    </div>
  );
};

export const App = () => {
  useEffect(appModel.setupDrivers, []);
  return <PageRoot />;
};
