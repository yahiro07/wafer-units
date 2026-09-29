import { appModel } from "@/model/app-model";
import { useRef } from "preact/hooks";

export const SourceEditPanel = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleLoad = () => {
    const text = textAreaRef.current?.value;
    if (text) {
      //check entries length <=24
      appModel.loadAudioSourceText(text, true);
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
