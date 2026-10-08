import { appModel } from "@/app-model";
import { Show } from "solid-js";
import { SpectrumView } from "@/spectrum-view";

export const App = () => {
  appModel.setSize(860, 210);
  return (
    <Show when={appModel.getters.viewActive()}>
      <div class="h-dvh flex-c bg-#222">
        <div class="w-860px h-210px p-4 bg-#002 flex-c">
          <SpectrumView fftData={appModel.getters.fftData()} />
        </div>
      </div>
    </Show>
  );
};
