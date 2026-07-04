import { qu } from "@/utils/qulex-goober";

export function reteToStepText(rate: number) {
  const steps = ["16", "8", "4", "2", "1", "/2", "/4", "/8", "/16"];
  const index = Math.min(Math.floor(rate * steps.length), steps.length - 1);
  return steps[index];
}

export const SteppedButton = ({
  active,
  rate,
  onClick,
}: {
  active: boolean;
  rate: number;
  onClick?: () => void;
}) => {
  return (
    <div class={qu.flexC().wh(40, 40).bg("#ddd").it} onClick={onClick}>
      {active ? reteToStepText(rate) : "--"}
    </div>
  );
};
