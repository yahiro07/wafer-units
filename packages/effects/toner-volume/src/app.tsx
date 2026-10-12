import { appModel } from "@/app-model";
import { LabeledKnob } from "@/components/labeled-knob";
import { Show } from "solid-js";

export const App = () => {
  return (
    <Show when={appModel.getters.viewActive()}>
      <div class="h-dvh flex-c bg-#ccc text-#444">
        <div class="w-100px h-100px flex-c pt-2">
          <LabeledKnob
            label="VOLUME"
            value={appModel.getters.parameters().volume}
            onChange={(v) => appModel.actions.setParameter("volume", v)}
          />
        </div>
      </div>
    </Show>
  );
};
