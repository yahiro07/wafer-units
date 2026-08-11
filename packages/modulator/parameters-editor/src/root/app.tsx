import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";

const PageRoot = () => {
  const { parameterItems } = store.useSnapshot();
  return (
    <div class="h-[100dvh] flex-c bg-clPageBg text-clPageText">
      <div class="flex-v gap-3">
        <div>param editor</div>
        {JSON.stringify(parameterItems)}
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
