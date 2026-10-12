import { appModel } from "@/app-model";
import { LabeledKnob } from "@/components/labeled-knob";
import { Show } from "solid-js";

export const App = () => {
  return (
    <Show when={appModel.getters.viewActive()}>
      <div class="h-dvh flex-c bg-#ccc text-#444">
        <div class="pt-3.5 pb-1.5 px-6">
          <LabeledKnob
            label="Volume"
            value={appModel.getters.parameters().volume}
            onChange={(v) => appModel.actions.setParameter("volume", v)}
          />
        </div>
      </div>
    </Show>
  );
};
