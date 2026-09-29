import { appModel } from "@/root/app-model";
import { useEffect, useRef } from "preact/hooks";

const SourceEditPanel = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleLoad = () => {
    const text = textAreaRef.current?.value;
    if (text) {
      //check entries length <=24
      appModel.setAudioSourceText(text);
    }
  };
  return (
    <div class="flex-v gap-1">
      <textarea class="w-500px h-400px bg-white bd-#000" ref={textAreaRef}>
        {`@base https://github.com/yahiro07/wafer-units/tree/main/packages/drum-machines/techno-beat-machine/public/samples/

@samples
bd1.ogg
bs1.ogg
cl1.ogg
hc1.ogg
ho1.ogg
pr1.ogg
rd1.ogg
sn1.ogg
st1.ogg

@license MIT`}
      </textarea>
      <div class="flex-c">
        <button class="bg-#888 text-white p-1 px-2" onClick={handleLoad}>
          load
        </button>
      </div>
    </div>
  );
};

const SamplerSourcePanel = () => {
  return (
    <div class="w-200px h-400px bg-#aaa">
      list of entry samples, text only, max 24 entries
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
