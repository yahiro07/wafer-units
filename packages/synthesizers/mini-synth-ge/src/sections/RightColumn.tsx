import { Slider } from "@/components/Slider";

export const RightColumn = () => {
  return (
    <div class="flex-v flex-1 p-2 gap-0 overflow-y-auto">
      <Slider label="Cutoff" paramKey="filterCutoff" />
      <Slider label="Peak" paramKey="filterPeak" />
      <Slider label="EnvMod" paramKey="filterEnvMod" />
      <Slider label="Decay" paramKey="ampDecay" />
      <Slider label="Release" paramKey="ampRelease" />
      <Slider label="Master" paramKey="masterVolume" />
    </div>
  );
};
