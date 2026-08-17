import { cz } from "@/common/css-realm";
import { seqNumbers } from "@/utils/helpers";

export const StepsIndicatorBar = () => {
  let currentStep = 3;
  return (
    <div class={czStepsIndicatorBar}>
      {seqNumbers(16).map((i) => (
        <div key={i} class={cz(i === currentStep && "current")} />
      ))}
    </div>
  );
};
const czStepsIndicatorBar = cz(
  "w-[640px] flex-ha justify-around",
  "[&>div]:(w-5 h-2 bd-clPlayPos)",
  "[&>div.current]:(bg-clPlayPos)",
);
