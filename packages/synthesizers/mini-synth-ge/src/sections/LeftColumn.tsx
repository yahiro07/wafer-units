import { Slider } from "@/components/Slider";

export const LeftColumn = () => {
  return (
    <div class="flex-v flex-1 p-2 border-r border-gray-400 gap-0 overflow-y-auto">
      <Slider label="Wave" paramKey="oscWave" steps={3} />
      <Slider label="Detune" paramKey="oscDetune" />
      <Slider label="Sub" paramKey="oscSub" />
      <Slider label="Drift" paramKey="oscDrift" />
      <Slider label="Chorus" paramKey="fxChorus" />
      <Slider label="Reverb" paramKey="fxReverb" />
    </div>
  );
};
