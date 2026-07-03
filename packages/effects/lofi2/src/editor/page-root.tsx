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
    <div class="flex-c gap-3">
      <div class="flex-v gap-3">
        <div class="flex-ha gap-2">
          <LabeledBox label="on" className="w-12">
            <ButtonWithIndicator
              active={parameters.isOn}
              onClick={() => setParameter("isOn", !parameters.isOn)}
            />
          </LabeledBox>
          <LabeledBox label="banded" className="w-12">
            <Knob
              value={parameters.banded}
              onChange={(value) => setParameter("banded", value)}
            />
          </LabeledBox>
          <LabeledBox label="hi" className="w-12">
            <Knob
              value={parameters.hi}
              onChange={(value) => setParameter("hi", value)}
            />
          </LabeledBox>
          <LabeledBox label="degrade" className="w-12">
            <Knob
              value={parameters.degrade}
              onChange={(value) => setParameter("degrade", value)}
            />
          </LabeledBox>
        </div>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class="flex-c">
      <EffectorBody className="flex-vc w-[320px] h-[180px]">
        <div class="flex-v gap-1">
          <div class="text-lg font-bold ml-2">Noise Mix</div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
