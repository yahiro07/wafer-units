import { useSetupDrivers } from "@/root/drivers";
import { ParametersSection } from "@/root/parameters-section";
import { PlottingSection } from "@/root/plotting-section";
import { useStoreSnapshot } from "@/root/store";

const PageRoot = () => {
  return (
    <div className="relative p-4 flex-vc gap-5 bg-clPanelBg text-clPanelText">
      <div className="absolute-top-center mt-3.5">
        <div class="text-xl font-bold">Toner Compressor</div>
      </div>
      <PlottingSection />
      <ParametersSection />
    </div>
  );
};

export const App = () => {
  const { viewActive } = useStoreSnapshot();
  useSetupDrivers();
  if (!viewActive) return null;
  return <PageRoot />;
};
