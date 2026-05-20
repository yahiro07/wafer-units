import { css, domStyled, FC, jsx } from "alumina";
import { getInstrumentLabel, IInstrumentKey } from "@/base";
import { appStore } from "@/store";
import { ISelectorOption, useUiTexts } from "../base";
import {
  GeneralSelector,
  LocalLoadingSpinner,
  ParameterLabel,
} from "../components";
import { ShifterButtonsUi, ShifterButtonsUiLarge } from "../organisms";

export const InstrumentSelectionPart: FC = () => {
  const {
    allInstrumentKeys,
    currentInstrumentKey,
    setInstrument,
    isLoadingSamples,
  } = appStore.synthEngine;

  const {
    state: { languageKey },
    readers: { canShiftInstrumentPrev, canShiftInstrumentNext },
    actions: { shiftInstrument },
  } = appStore.uiPresenter;

  const texts = useUiTexts();

  const instrumentSelectionOptions: ISelectorOption[] = allInstrumentKeys.map(
    (key) => ({ value: key, label: getInstrumentLabel(key, languageKey) }),
  );

  const onInstrumentChange = (instrumentKey: IInstrumentKey) => {
    setInstrument(instrumentKey, true);
  };

  return domStyled(
    <div>
      <div class="head-row">
        <ParameterLabel text={texts.instrument} />
      </div>
      <div class="second-row">
        <GeneralSelector
          options={instrumentSelectionOptions}
          value={currentInstrumentKey}
          onChange={onInstrumentChange}
          width={130}
        />
        <LocalLoadingSpinner isLoading={isLoadingSamples} />
      </div>
      <div class="buttons-row">
        <ShifterButtonsUi
          canGoPrev={canShiftInstrumentPrev}
          canGoNext={canShiftInstrumentNext}
          onShift={shiftInstrument}
        />
      </div>
    </div>,
    css`
      display: flex;
      flex-direction: column;
      > .head-row {
        display: flex;
      }
      > .second-row {
        margin-top: 2px;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      > .buttons-row {
        margin-top: 9px;
      }
    `,
  );
};

export const InstrumentSelectionPartHorizontal_Buttons: FC = () => {
  const {
    readers: { canShiftInstrumentPrev, canShiftInstrumentNext },
    actions: { shiftInstrument },
  } = appStore.uiPresenter;
  return (
    <ShifterButtonsUiLarge
      canGoPrev={canShiftInstrumentPrev}
      canGoNext={canShiftInstrumentNext}
      onShift={shiftInstrument}
    />
  );
};

export const InstrumentSelectionPartHorizontal_Selector: FC = () => {
  const {
    allInstrumentKeys,
    currentInstrumentKey,
    setInstrument,
    isLoadingSamples,
  } = appStore.synthEngine;

  const {
    state: { languageKey },
  } = appStore.uiPresenter;

  const texts = useUiTexts();

  const instrumentSelectionOptions: ISelectorOption[] = allInstrumentKeys.map(
    (key) => ({ value: key, label: getInstrumentLabel(key, languageKey) }),
  );

  const onInstrumentChange = (instrumentKey: IInstrumentKey) => {
    setInstrument(instrumentKey, true);
  };

  return domStyled(
    <div>
      <div class="head-row">
        <ParameterLabel text={texts.instrument} />
        <LocalLoadingSpinner isLoading={isLoadingSamples} />
      </div>
      <div class="second-row">
        <GeneralSelector
          options={instrumentSelectionOptions}
          value={currentInstrumentKey}
          onChange={onInstrumentChange}
          width={172}
          height={44}
          fontSize={18}
        />
      </div>
      <div class="buttons-row"></div>
    </div>,
    css`
        > .head-row {
          display: flex;
        }
        > .second-row {
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
    `,
  );
};
