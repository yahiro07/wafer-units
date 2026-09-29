import { appModel } from "@/model/app-model";
import { SourceEditPanel } from "@/view/source-edit-panel";
import { useEffect } from "preact/hooks";

const SamplerSourcePanel = () => {
  const { audioBaseUrl, audioPaths } = appModel.useSnapshot();
  return (
    <div class="w-200px h-400px bg-#aaa">
      list of entry samples, text only, max 24 entries
      <div>base: {audioBaseUrl}</div>
      <div>
        {audioPaths.map((path) => (
          <div>{path}</div>
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

const PageRoot = () => {
  return (
    <div class="flex-v bg-clControlBg bd-clControlEdge py-2 px-4">
      <div class="text-xl font-bold">SAMPLER1</div>
      <div class="flex-ha gap-6">
        <SourceEditPanel />
        <SamplerSourcePanel />
        <SamplerAssignmentPanel />
      </div>
    </div>
  );
};

export const App = () => {
  useEffect(appModel.setupDrivers, []);
  return <PageRoot />;
};
