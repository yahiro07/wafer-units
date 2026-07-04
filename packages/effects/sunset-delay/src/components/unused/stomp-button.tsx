import { qu } from "@/utils/qulex-goober";

export const StompButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      class={
        qu.wh(36, 36).bg("#999").bd("#777").rounded("100%").flexC().cp().it
      }
      onClick={onClick}
    >
      <div class={qu.wh(28, 28).bg("#bbb").rounded("100%").it} />
    </div>
  );
};
