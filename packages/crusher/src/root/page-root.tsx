import { EffectParameters } from "@/common/definitions";
import { ButtonWithIndicator } from "@/components/button-with-indicator";
import { EffectorBody } from "@/components/effector-body";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import { store } from "@/root/store";
import { qlsx, qu } from "@/utils/qstyle-goober";

const ControlsPart = () => {
  const { parameters } = store.useSnapshot();
  const setParameter = <K extends keyof EffectParameters>(
    key: K,
    value: EffectParameters[K],
  ) => {
    store.setParameters({ ...parameters, [key]: value });
  };
  const cellW = 48;

  return (
    <div class={qu.flexVC().gap(5)}>
      <div class={qu.flexHA().gap(2)}>
        <LabeledBox label="ON" width={cellW}>
          <ButtonWithIndicator
            active={parameters.isOn}
            onClick={() => setParameter("isOn", !parameters.isOn)}
          />
        </LabeledBox>
        {/* <LabeledBox label="Time" width={cellW} className={qu.relative()}>
          <div
            class={qlsx(
              qu.absolute().bottom(-14).left(0).fontSize(12).w(cellW),
              qu.flexC(),
            )}
          >
            {parameters.time.toString()}
          </div>
        </LabeledBox> */}
        <LabeledBox label="Age" width={cellW}>
          <Knob
            value={parameters.age}
            onChange={(value) => setParameter("age", value)}
          />
        </LabeledBox>
        <LabeledBox label="Grit" width={cellW}>
          <Knob
            value={parameters.grit}
            onChange={(value) => setParameter("grit", value)}
          />
        </LabeledBox>
        <LabeledBox label="Degrade" width={cellW}>
          <Knob
            value={parameters.degrade}
            onChange={(value) => setParameter("degrade", value)}
          />
        </LabeledBox>
      </div>
      <div class={qu.flexHA().gap(2)}>
        <LabeledBox label="Saturation Mode" width={cellW}>
          <Knob
            value={parameters.saturationMode}
            min={0}
            max={2}
            step={1}
            onChange={(value) => setParameter("saturationMode", value)}
          />
        </LabeledBox>
        <LabeledBox label="Tone Color" width={cellW}>
          <Knob
            value={parameters.toneColor}
            onChange={(value) => setParameter("toneColor", value)}
          />
        </LabeledBox>
        <LabeledBox label="Dust" width={cellW}>
          <Knob
            value={parameters.dust}
            onChange={(value) => setParameter("dust", value)}
          />
        </LabeledBox>
        <LabeledBox label="Noise Stuff" width={cellW}>
          <Knob
            value={parameters.noiseStuffIndex}
            min={0}
            max={1}
            step={1}
            onChange={(value) => setParameter("noiseStuffIndex", value)}
          />
        </LabeledBox>
      </div>
      {/* <div class={qu.flexHA().gap(2)}>
        <LabeledBox label="LFO" width={cellW}>
          <ButtonWithIndicator
            active={parameters.lfoOn}
            onClick={() => setParameter("lfoOn", !parameters.lfoOn)}
          />
        </LabeledBox>
        <LabeledBox label="Rate" width={cellW}>
          <Knob
            value={parameters.lfoRate}
            onChange={(value) => setParameter("lfoRate", value)}
          />
        </LabeledBox>
        <LabeledBox label="Depth" width={cellW}>
          <Knob
            value={parameters.lfoDepth}
            onChange={(value) => setParameter("lfoDepth", value)}
          />
        </LabeledBox>
      </div> */}
      {/* {false && (
        <div class={qu.flexVC().gap(2.5).pt(4)}>
          <LedIndicator active={parameters.isOn} />
          <StompButton onClick={() => setParameter("isOn", !parameters.isOn)} />
        </div>
      )} */}
    </div>
  );
};

// const SafetyPart = () => {
//   const { parameters } = store.useSnapshot();
//   const setParameter = <K extends keyof EffectParameters>(
//     key: K,
//     value: EffectParameters[K],
//   ) => {
//     store.setParameters({ ...parameters, [key]: value });
//   };
//   return (
//     <div>
//       <label class={qu.flexH().gap(1)}>
//         <input
//           type="checkbox"
//           checked={parameters.safety}
//           onChange={(e) =>
//             setParameter(
//               "safety",
//               (e.currentTarget as HTMLInputElement).checked,
//             )
//           }
//         />
//         safety
//       </label>
//     </div>
//   );
// };

export const PageRoot = () => {
  return (
    <div class={qu.flexC()}>
      <EffectorBody className={qlsx(qu.wh(320, 210), qu.flexVC())}>
        <div class={qu.flexV().gap(3)}>
          <div class={qu.flexHA().gap(2).justify("between")}>
            <div class={qu.fontSize(18).weight("bold")}>LoFi Crusher</div>
            {/* <SafetyPart /> */}
          </div>
          <ControlsPart />
        </div>
      </EffectorBody>
    </div>
  );
};
