import { iife } from "mofus/ax";
import { JSX } from "solid-js/jsx-runtime";
import { Icons } from "@/components/icons";
import { StepCode } from "@/sequencer/sequencer-engine";

const stepCodeToIcon = {
  on: Icons.Dot,
  off: Icons.Dash,
  tie: Icons.Tie,
};

export const StepButton = (props: {
  index: number;
  code: StepCode;
  active: boolean;
  onChange: (nextCode: StepCode) => void;
}) => {
  const isFirstStep = () => props.index === 0;

  const canGoUp = () => {
    if (props.code === "off") {
      return true;
    }
    if (props.code === "on") {
      return !isFirstStep();
    }
    return false;
  };

  const canGoDown = () => {
    if (props.code === "tie") {
      return true;
    }
    if (props.code === "on") {
      return true;
    }
    return false;
  };

  const onPressTop = () => {
    if (props.code === "off") {
      props.onChange("on");
      return;
    }
    if (props.code === "on" && !isFirstStep()) {
      props.onChange("tie");
    }
  };

  const onPressBottom = () => {
    if (props.code === "tie") {
      props.onChange("on");
      return;
    }
    if (props.code === "on") {
      props.onChange("off");
    }
  };

  const onPointerDown: JSX.EventHandlerUnion<
    HTMLButtonElement,
    PointerEvent
  > = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isTopHalf = event.clientY < rect.top + rect.height / 2;
    if (isTopHalf) {
      onPressTop();
    } else {
      onPressBottom();
    }
  };

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      class="w-[58px] h-[87px] flex-v border border-[#888] px-1 rounded-md text-[#555]"
      style={{
        "background-color": props.active ? "#9f9" : "#ddd",
        cursor: "pointer",
      }}
    >
      <div class="h-1/6 flex-c text-[14px]">
        {canGoUp() ? <Icons.Up /> : null}
      </div>
      <div class="grow flex-c text-[24px] leading-none">
        {/* {stepCodeToSymbol[props.code]} */}
        {iife(() => {
          const Icon = stepCodeToIcon[props.code];
          return <Icon />;
        })}
      </div>
      <div class="h-1/6 flex-c text-[14px]">
        {canGoDown() ? <Icons.Down /> : null}
      </div>
    </button>
  );
};
