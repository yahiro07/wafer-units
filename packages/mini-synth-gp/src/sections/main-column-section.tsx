import type { SynthParameters } from "@/audio/types";
import { ParameterColumn } from "@/organisms/parameter-column";
import {
  leftColumnParameters,
  rightColumnParameters,
} from "@/store/parameter-definitions";

type MainColumnSectionProps = {
  parameters: SynthParameters;
  onSetParameter: (key: keyof SynthParameters, value: number) => void;
};

export function MainColumnSection(props: MainColumnSectionProps) {
  return (
    <section class="flex-h h-full w-full gap-2">
      <ParameterColumn
        title="OSC / FX"
        definitions={leftColumnParameters}
        parameters={props.parameters}
        onSetParameter={props.onSetParameter}
      />

      <ParameterColumn
        title="FILTER / AMP"
        definitions={rightColumnParameters}
        parameters={props.parameters}
        onSetParameter={props.onSetParameter}
      />
    </section>
  );
}
