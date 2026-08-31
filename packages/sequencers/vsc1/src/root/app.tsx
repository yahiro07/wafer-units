import { useSetupDrivers } from "@/root/drivers";

const PageRoot = () => {
  return <div class="flex-v gap-3 bg-clPageBg text-clPageText p-8">app</div>;
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
