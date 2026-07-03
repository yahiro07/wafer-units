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
            active={parameters.noiseAOn}
            onClick={() => setParameter("noiseAOn", !parameters.noiseAOn)}
          />
        </LabeledBox>
        <LabeledBox label="lpf" className="w-12">
          <Knob
            value={parameters.noiseALpfCutoff}
            onChange={(value) => setParameter("noiseALpfCutoff", value)}
          />
        </LabeledBox>
        <LabeledBox label="gain" className="w-12">
          <Knob
            value={parameters.noiseAGain}
            onChange={(value) => setParameter("noiseAGain", value)}
          />
        </LabeledBox>
        <LabeledBox label="attack" className="w-12">
          <Knob
            value={parameters.envAttack}
            onChange={(value) => setParameter("envAttack", value)}
          />
        </LabeledBox>
        <LabeledBox label="release" className="w-12">
          <Knob
            value={parameters.envRelease}
            onChange={(value) => setParameter("envRelease", value)}
          />
        </LabeledBox>
      </div>
      <div class="flex-ha gap-2">
        <LabeledBox label="ON" className="w-12">
          <ButtonWithIndicator
            active={parameters.noiseBOn}
            onClick={() => setParameter("noiseBOn", !parameters.noiseBOn)}
          />
        </LabeledBox>
        <LabeledBox label="hpf" className="w-12">
          <Knob
            value={parameters.noiseBHpfCutoff}
            onChange={(value) => setParameter("noiseBHpfCutoff", value)}
          />
        </LabeledBox>

        <LabeledBox label="gain" className="w-12">
          <Knob
            value={parameters.noiseBGain}
            onChange={(value) => setParameter("noiseBGain", value)}
          />
        </LabeledBox>
        <LabeledBox label="abs" className="w-12">
          <ButtonWithIndicator
            active={parameters.noiseBAbs}
            onClick={() => setParameter("noiseBAbs", !parameters.noiseBAbs)}
          />
        </LabeledBox>
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
