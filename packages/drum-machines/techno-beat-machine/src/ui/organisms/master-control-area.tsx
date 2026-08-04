import { qu } from "@/ui/common/css-realm";
import { ControlButton } from "@/ui/components/buttons";
import { LabeledKnob } from "@/ui/components/labeled-knob";
import { TitleLabel } from "@/ui/components/title-label";
import { FlexSpacer } from "@/ui/components/utility-components";
import { actions } from "@/ui/store/actions";
import { store } from "@/ui/store/store";

export const MasterVolumeContainer = () => {
  const { masterVolume } = store.useSnapshot();
  return (
    <LabeledKnob
      label="MASTER"
      value={masterVolume}
      onChange={actions.setMasterVolume}
    />
  );
};

export const MasterControlArea = () => {
  const { localPlaying, soloMode } = store.useSnapshot();
  return (
    <div sx={qu.flexHA().gap(6)}>
      <div sx={qu.flexHA().gap(2)}>
        <ControlButton
          label="PLAY"
          active={localPlaying}
          onClick={actions.togglePlayState}
        />
        <ControlButton
          label="SOLO"
          active={soloMode}
          onClick={actions.toggleSoloMode}
        />
        <ControlButton label="RND" onClick={actions.randomizeAll} />
        <ControlButton label="CLEAR" onClick={actions.clearAll} />
      </div>
      <MasterVolumeContainer />
      <FlexSpacer />
      <TitleLabel text="TECHNO BEAT MACHINE" />
    </div>
  );
};
