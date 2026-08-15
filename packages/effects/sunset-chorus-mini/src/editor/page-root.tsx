import {
  ButtonWithIndicator,
  EffectorBody,
  Knob,
  LabeledBox,
} from "@/common/components";
import { ChorusType, EffectParameters } from "@/core/definitions";
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
    <div class="flex-vc gap-1">
      <div class="text-md font-bold ml-2">Sunset Chorus Mini</div>
      <div class="flex-ha gap-2">
        <LabeledBox label="On" className="w-12">
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        <LabeledBox label="Type" className="w-12">
          <Knob
            value={parameters.chorusType}
            min={1}
            max={5}
            step={1}
            onChange={(value) =>
              setParameter("chorusType", value as ChorusType)
            }
          />
        </LabeledBox>

        <LabeledBox label="Level" className="w-12">
          <Knob
            value={parameters.chorusLevel}
            onChange={(value) => setParameter("chorusLevel", value)}
          />
        </LabeledBox>
      </div>
    </div>
  );
};

export const PageRoot = () => {
  return (
    <div class="h-dvh flex-c">
      <EffectorBody className="flex-vc w-[200px] h-[120px]">
        <ControlsPart />
      </EffectorBody>
    </div>
  );
};
