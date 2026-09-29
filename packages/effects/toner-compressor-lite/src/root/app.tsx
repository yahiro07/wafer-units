import { useSetupDrivers } from "@/root/drivers";
import { ParametersSection } from "@/root/parameters-section";
import { useStoreSnapshot } from "@/root/store";
import { cz } from "@lib/mu2609/utils/cz";

const PageRoot = () => {
  return (
    <div
      className={cz(
        "bg-clPanelBg text-clPanelText",
        "px-6 pt-1 pb-3 flex-v gap-2",
      )}
    >
      <div class="text-xl font-bold">Compressor</div>
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
