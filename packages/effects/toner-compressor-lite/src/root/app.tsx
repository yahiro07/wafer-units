import { useSetupDrivers } from "@/root/drivers";
import { ParametersSection } from "@/root/parameters-section";
import { useStoreSnapshot } from "@/root/store";
import { cz } from "@lib/mu2609/utils/cz";

const PageRoot = () => {
  return (
    <div
      className={cz(
        "bg-clPanelBg text-clPanelText",
        "px-10 pt-2 pb-4 flex-v gap-1",
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
