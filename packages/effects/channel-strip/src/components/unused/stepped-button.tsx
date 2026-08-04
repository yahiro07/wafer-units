import { qu } from "@/common/css-realm";

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
    <div sx={qu.flexC().wh(40, 40).bg("#ddd")} onClick={onClick}>
      {active ? reteToStepText(rate) : "--"}
    </div>
  );
};
