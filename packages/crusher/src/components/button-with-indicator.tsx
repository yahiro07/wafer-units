import { qlsx, qu } from "@/utils/qstyle-goober";

export const ButtonWithIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={qlsx(
        qu.wh(36, 36).bg("#999").bd("#555").rounded(8).p(0.75).cp(),
        qu.flexHA(),
      )}
      onClick={onClick}
    >
      <div
        class={qlsx(
          qu.wh(10, 10).rounded("full").bd("#444"),
          qu.bg(active ? "#0f0" : "#666"),
        )}
      />
    </div>
  );
};
