import { LabeledKnob } from "@/components/labeled-controls";
import { LedIndicator } from "@/components/led-indicator";
import {
  CommonParameters,
  SamplerSlot,
  SlotParameters,
} from "@/definitions/definitions";
import { appModel } from "@/model/app-model";
import { presenter } from "@/model/presenter";
import { LevelsScope } from "@/view/levels-scope";
import { SourceEditPanel } from "@/view/source-edit-panel";
import { cz } from "@lib/mu2609/utils/cz";
import { startDragSession } from "@lib/mu2609/utils/drag-session";
import { seqNumbers } from "@lib/mu2609/utils/helpers";
import { useEffect } from "preact/hooks";

const CommonParametersPart = () => {
  const { commonParameters: pr } = appModel.useSnapshot();
  const bindSetParameter = (key: keyof CommonParameters) => {
    return (v: number) => appModel.setCommonParameter(key, v);
  };
  return (
    <div class="flex-ha  h-100px bd-#888 gap-4 px-4">
      <div class={"flex-ha gap-1"}>
        <LedIndicator
          active={pr.reverbOn}
          onClick={() => appModel.setCommonParameter("reverbOn", !pr.reverbOn)}
        />
        <div>Reverb</div>
      </div>
      <LabeledKnob
        label="time"
        value={pr.reverbTime}
        onChange={bindSetParameter("reverbTime")}
      />
      <LabeledKnob
        label="tone"
        value={pr.reverbTone}
        onChange={bindSetParameter("reverbTone")}
      />
      <LabeledKnob
        label="mix"
        value={pr.reverbMix}
        onChange={bindSetParameter("reverbMix")}
      />
      <div class="w-10px" />

      <LabeledKnob
        label="aux"
        value={pr.auxLevel}
        onChange={bindSetParameter("auxLevel")}
      />
      <LabeledKnob
        label="main"
        value={pr.mainLevel}
        onChange={bindSetParameter("mainLevel")}
      />
    </div>
  );
};

function formatAudioPath(path: string) {
  return path.split("/").pop()?.split(".")[0];
}

const LevelsScopeContainer = ({ audioIndex }: { audioIndex: number }) => {
  const levels = presenter.useLevels(audioIndex);
  if (!levels) return;
  return <LevelsScope levels={levels} />;
};

const SlotParametersPart = ({
  slotIndex,
  slot,
}: {
  slotIndex: number;
  slot: SamplerSlot;
}) => {
  const pr = slot.parameters;
  const bindSetParameter = (key: keyof SlotParameters) => {
    return (v: number) => appModel.setSlotParameter(slotIndex, key, v);
  };
  return (
    <div class="flex-ha gap-4">
      <LabeledKnob
        label="speed"
        value={pr.speed}
        onChange={bindSetParameter("speed")}
      />

      <LabeledKnob label="eq" value={pr.eq} onChange={bindSetParameter("eq")} />
      <LabeledKnob
        label="drive"
        value={pr.drive}
        onChange={bindSetParameter("drive")}
      />
      <LabeledKnob
        label="pan"
        value={pr.pan}
        min={-1}
        onChange={bindSetParameter("pan")}
      />
      <LabeledKnob
        label="send"
        value={pr.aux}
        onChange={bindSetParameter("aux")}
      />
      <LabeledKnob
        label="volume"
        value={pr.volume}
        onChange={bindSetParameter("volume")}
      />
    </div>
  );
};

const CurrentSlotSection = () => {
  const { slots, currentSlotIndex, audioPaths } = appModel.useSnapshot();
  const slot = slots[currentSlotIndex];
  const path = audioPaths[slot.audioIndex] as string | undefined;
  return (
    <div class="flex-ha bd-#333 gap-6">
      <div class="flex-v">
        <div class={"w-140px h-70px bd-#888"}>
          <LevelsScopeContainer audioIndex={slot.audioIndex} />
        </div>
        <div className={"text-xs"}>
          {currentSlotIndex + 1} {path ? formatAudioPath(path) : ""}
        </div>
      </div>
      <SlotParametersPart slotIndex={currentSlotIndex} slot={slot} />
    </div>
  );
};

const SourceSampleCard = ({
  path,
  audioIndex,
}: {
  path: string;
  audioIndex: number;
}) => {
  return (
    <div
      class="w-64px h-36px bd-#888 text-xs relative"
      onClick={() => appModel.playSourcePreview(audioIndex)}
    >
      <LevelsScopeContainer audioIndex={audioIndex} />
      <div class="absolute top-0 left-0 w-full h-full text-xs flex-h justify-center">
        {formatAudioPath(path)}
      </div>
    </div>
  );
};

const SourceSamplesSection = () => {
  const { audioPaths } = appModel.useSnapshot();
  return (
    <div class="min-h-72px flex-ha">
      <div class="flex flex-wrap">
        {audioPaths.map((path, i) => (
          <SourceSampleCard key={i} path={path} audioIndex={i} />
        ))}
      </div>
    </div>
  );
};

const SlotColumn = ({
  slotIndex,
  slot,
}: {
  slotIndex: number;
  slot: SamplerSlot;
}) => {
  const { currentSlotIndex, padHoldStates } = appModel.useSnapshot();
  const active = currentSlotIndex === slotIndex;
  const padActive = padHoldStates[slotIndex];
  const handlePadPointerDown = (e0: PointerEvent) => {
    appModel.triggerSlot(slotIndex);
    startDragSession(e0, {
      onUpOrCancel() {
        appModel.unTriggerSlot(slotIndex);
      },
    });
  };
  return (
    <div class="flex-v w-60px">
      <div
        class={"h-30px bd-#888"}
        onClick={() => appModel.assignAudio(slotIndex, slotIndex)}
      >
        <LevelsScopeContainer audioIndex={slot.audioIndex} />
      </div>
      <button
        class={cz(
          "h-36px bd-#888 flex-c cursor-pointer",
          active && "border border-3px border-#08f",
        )}
        onClick={() => appModel.selectSlot(slotIndex)}
      >
        {slotIndex + 1}
      </button>
      <button
        class={cz("h-36px bd-#888", padActive && "bg-#0cf6")}
        onPointerDown={handlePadPointerDown}
      />
    </div>
  );
};

const SlotsSection = () => {
  const { slots } = appModel.useSnapshot();
  return (
    <div class={"flex-h gap-2"}>
      {seqNumbers(12).map((i) => (
        <SlotColumn key={i} slotIndex={i} slot={slots[i]} />
      ))}
    </div>
  );
};

const MachinePanel = () => {
  return (
    <div class="flex-v bg-#bbb text-#444 w-800px h-460px p-4 gap-4">
      <div class="flex-ha justify-between">
        <h1 class={"text-xl"}>Tone-Player</h1>
        <CommonParametersPart />
      </div>
      <CurrentSlotSection />
      <SourceSamplesSection />
      <SlotsSection />
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-v">
      {/* <div class="text-xl font-bold">SAMPLER1</div> */}
      <div class="flex-ha gap-6">
        <SourceEditPanel />
      </div>
      <MachinePanel />
    </div>
  );
};

export const App = () => {
  useEffect(appModel.setupDrivers, []);
  return <PageRoot />;
};
