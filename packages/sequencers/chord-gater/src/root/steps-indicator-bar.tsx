import { cz } from "@/common/css-realm";
import { store } from "@/root/store";
import { seqNumbers } from "@/utils/helpers";

export const StepsIndicatorBar = () => {
  const { playStepIndex } = store.useSnapshot();
  return (
    <div class={czStepsIndicatorBar}>
      {seqNumbers(16).map((i) => (
        <div key={i} class={cz(i === playStepIndex && "current")} />
      ))}
    </div>
  );
};
const czStepsIndicatorBar = cz(
  "w-[640px] flex-ha justify-around",
  "[&>div]:(w-5 h-2 bd-#444 bg-#555)",
  "[&>div.current]:(bg-clPlayPos bd-clPlayPos)",
);
