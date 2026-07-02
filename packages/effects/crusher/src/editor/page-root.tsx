import {
  ButtonWithIndicator,
  EffectorBody,
  Knob,
  LabeledBox,
} from "@/common/components";
import { EffectParameters } from "@/core/definitions";
import { store } from "@/editor/store";

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.setParameters({ ...parameters, [key]: value });
  };

  return (
    <div class="flex-vc gap-3">
      <div class="flex-ha gap-2">
        <LabeledBox label="ON" className="w-12">
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        <LabeledBox label="Wow" className="w-12">
          <Knob
            value={parameters.age}
            onChange={(value) => setParameter("age", value)}
          />
        </LabeledBox>

        <LabeledBox label="Crush" className="w-12">
          <Knob
            value={parameters.degrade}
            onChange={(value) => setParameter("degrade", value)}
          />
        </LabeledBox>
      </div>
      <div class="flex-ha gap-2">
        <LabeledBox label="Type" className="w-12">
          <Knob
            value={parameters.saturationMode}
            min={0}
            max={2}
            step={1}
            onChange={(value) => setParameter("saturationMode", value)}
          />
        </LabeledBox>
        <LabeledBox label="Drive" className="w-12">
          <Knob
            value={parameters.grit}
            onChange={(value) => setParameter("grit", value)}
          />
        </LabeledBox>
        <LabeledBox label="Tone" className="w-12">
          <Knob
            value={parameters.toneColor}
            onChange={(value) => setParameter("toneColor", value)}
          />
        </LabeledBox>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class="flex-c">
      <EffectorBody className="flex-vc w-[320px] h-[210px]">
        <div class="flex-v gap-1">
          <div class="text-lg font-bold">LoFi Crusher</div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
