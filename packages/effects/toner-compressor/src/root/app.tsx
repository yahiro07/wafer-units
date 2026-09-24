import { useSetupDrivers } from "@/root/drivers";
import { ParametersSection } from "@/root/parameters-section";
import { PlottingSection } from "@/root/plotting-section";
import { useStoreSnapshot } from "@/root/store";

const PageRoot = () => {
  return (
    <div>
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
