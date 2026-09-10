import { LfoLane } from "@/root/lfo-lane";
import { store } from "@/root/store";

export const PageRoot = () => {
  const { slots } = store.useSnapshot();
  return (
    <div class="h-dvh flex-c">
      <div class="w-500px h-310px bg-#aaa p-4 text-#333">
        <div class="flex-v gap-3 px-18px">
          <div class="flex-h gap-2">
            <div>Multi LFO</div>
            <div class="grow" />
          </div>
          <div class="flex-vc gap-2">
            {slots.map((slot) => (
              <LfoLane key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
