import { useSetupDrivers } from "@/root/drivers";

const PageRoot = () => {
  return (
    <div class="h-[100dvh] flex-c bg-clPageBg text-clPageText">
      <div class="flex-v gap-3"></div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
