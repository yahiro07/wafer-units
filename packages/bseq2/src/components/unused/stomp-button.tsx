import { qu } from "@/utils/qstyle-goober";

export const StompButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      class={qu.wh(36, 36).bg("#999").bd("#777").rounded("100%").flexC().cp()}
      onClick={onClick}
    >
      <div class={qu.wh(28, 28).bg("#bbb").rounded("100%")} />
    </div>
  );
};
