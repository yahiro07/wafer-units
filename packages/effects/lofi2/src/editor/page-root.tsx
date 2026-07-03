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
    <div class="flex-v">
      <div class="text-lg font-bold ml-2">Lofi2</div>
      <div class="flex-v gap-2">
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
        <div class="flex-ha gap-2">
          <LabeledBox label="drive" className="w-12">
            <Knob
              value={parameters.drive}
              onChange={(value) => setParameter("drive", value)}
            />
          </LabeledBox>
          <LabeledBox label="noise" className="w-12">
            <Knob
              value={parameters.noise}
              onChange={(value) => setParameter("noise", value)}
            />
          </LabeledBox>
          <LabeledBox label="wobble" className="w-12">
            <Knob
              value={parameters.wobble}
              onChange={(value) => setParameter("wobble", value)}
            />
          </LabeledBox>
          <LabeledBox label="mix" className="w-12">
            <Knob
              value={parameters.mix}
              onChange={(value) => setParameter("mix", value)}
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
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
