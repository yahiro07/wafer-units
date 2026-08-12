import { Knob } from "@/components/knob";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { tz } from "@/utils/tz";

const actions = {
  setParameterValue(id: string, value: number) {
    store.setParameterItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
    store.setLatestEditPayload({ id, value });
  },
};
const PageRoot = () => {
  const { connected, parameterItems } = store.useSnapshot();
  return (
    <div class="h-[100dvh] flex-c bg-clPageBg text-clPageText">
      <div class="flex-v gap-3">
        <div class={tz("flex-h gap-2")}>
          <span>{connected ? "connected" : "disconnected"}</span>
          <span>{parameterItems.length || "no"} parameters available</span>
        </div>
        <div class="h-[500px] overflow-y-scroll bg-[#ddd] p-4">
          <div class="flex-h w-[800px] flex-wrap gap-2">
            {parameterItems.map((item) => (
              <div class="w-[100px] bg-white flex-vc gap-1">
                <div>{item.id}</div>
                <Knob
                  value={item.value}
                  onChange={(v) => actions.setParameterValue(item.id, v)}
                  min={0}
                  max={1}
                  step={item.steps ? 1 / (item.steps - 1) : 0.01}
                />
                <div>{item.value.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
