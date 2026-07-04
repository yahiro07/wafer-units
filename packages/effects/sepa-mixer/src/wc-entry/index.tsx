import { render } from "preact";
import { createStore } from "snap-store";
import { createCustomElementSharableClass } from "wafer-host/unit-helper";
import { UnitInterface } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";
import { IndicatorButton } from "@/components/indicator-button";
import { Knob } from "@/components/knob";
import { LabeledBox } from "@/components/labeled-box";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

type ChannelState = {
  active: boolean;
  volume: number;
};

const store = createStore({
  soloChannelKey: null as string | null,
  channelStates: {} as Record<string, ChannelState>,
});

export function mapKnobCurveCenterUnity(value: number) {
  if (value > 0.5) {
    return 1 + ((value - 0.5) / 0.5) * 1.5;
  } else {
    return (value / 0.5) ** 2;
  }
}

function createGainEffect(unitInterface: UnitInterface) {
  const { audioContext } = unitInterface;
  const gainNode = audioContext.createGain();
  unitInterface.audioInputNode.connect(gainNode);
  gainNode.connect(unitInterface.audioOutputNode);

  function affectLevel(level: number) {
    const gain = mapKnobCurveCenterUnity(level);
    gainNode.gain.value = gain;
  }
  let currentLevel = 0.5;
  affectLevel(currentLevel);
  return {
    update(
      active: boolean,
      volume: number,
      solo: boolean,
      mutedByOtherSolo: boolean,
    ) {
      const level = (active || solo) && !mutedByOtherSolo ? volume : 0;
      if (level !== currentLevel) {
        affectLevel(level);
        currentLevel = level;
      }
    },
  };
}

function createChannelSlice(unitInterface: UnitInterface) {
  const channelKey = crypto.randomUUID();
  const patchChannel = (attrs: Partial<ChannelState>) => {
    store.patchChannelStates({
      [channelKey]: { ...store.state.channelStates[channelKey], ...attrs },
    });
  };
  patchChannel({ active: true, volume: 0.5 });

  const gainEffect = createGainEffect(unitInterface);

  unitInterface.completeSetup({
    unitAspects: {
      unitType: "effect",
      outputs: ["audio"],
      inputs: ["audio"],
    },
  });

  const Render = () => {
    const { channelStates, soloChannelKey } = store.useSnapshot();
    const channelState = channelStates[channelKey];
    const { active, volume } = channelState;
    const solo = soloChannelKey === channelKey;
    const mutedByOtherSolo =
      (soloChannelKey && soloChannelKey !== channelKey) || false;
    gainEffect.update(active, volume, solo, mutedByOtherSolo);

    const handleSoloClick = () => {
      if (soloChannelKey === channelKey) {
        store.setSoloChannelKey(null);
      } else {
        store.setSoloChannelKey(channelKey);
      }
    };
    return (
      <div class={qu.wh(200, 80).bg("#dce").color("#fff").flexC().it}>
        <div class={qu.flexHA().gap(6).it}>
          <LabeledBox label="volume">
            <Knob
              value={volume}
              onChange={(value) => patchChannel({ volume: value })}
            />
          </LabeledBox>
          <LabeledBox label="on">
            <IndicatorButton
              active={active}
              onClick={() => patchChannel({ active: !active })}
            />
          </LabeledBox>

          <LabeledBox label="solo">
            <IndicatorButton active={solo} onClick={handleSoloClick} />
          </LabeledBox>
        </div>
      </div>
    );
  };

  return { Render };
}

export default createCustomElementSharableClass(
  (unitInterfaceProvider, shadowRoot) => {
    const unitInterface =
      unitInterfaceProvider.queryUnitInterface?.("wafer-v01");
    if (!unitInterface) {
      throw new Error("undefined unit interface");
    }
    const { Render } = createChannelSlice(unitInterface);
    render(<Render />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  {
    cssTexts: [cssText],
    stylesheetUrls: [webFontUrl],
    adoptedStyleSheets: [cssRealm.sheet],
  },
);
