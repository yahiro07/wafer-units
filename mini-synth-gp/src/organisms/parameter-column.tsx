import { For } from "solid-js";
import type { SynthParameters } from "@/audio/types";
import { ParameterSlider } from "@/components/parameter-slider";
import type { ParameterDefinition } from "@/store/parameter-definitions";

type ParameterColumnProps = {
  title: string;
  definitions: ParameterDefinition[];
  parameters: SynthParameters;
  onSetParameter: (key: keyof SynthParameters, value: number) => void;
};

export function ParameterColumn(props: ParameterColumnProps) {
  return (
    <section class="flex-v h-full w-full border border-slate-600 bg-slate-800/55 p-3">
      <h2 class="mb-2 border-b border-slate-600 pb-1 text-[11px] tracking-[0.24em] text-slate-300">
        {props.title}
      </h2>

      <div class="flex-v gap-1">
        <For each={props.definitions}>
          {(definition) => (
            <ParameterSlider
              label={definition.label}
              min={definition.min}
              max={definition.max}
              step={definition.step}
              value={props.parameters[definition.key] ?? 0}
              onInput={(value) => props.onSetParameter(definition.key, value)}
            />
          )}
        </For>
      </div>
    </section>
  );
}
