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
        qu.wh(28, 17).bg("#999").bd("#555").rounded(1).cp(),
        qu.flexVA(),
      )}
      onClick={onClick}
    >
      <div
        class={qlsx(
          qu.wh(12, 5).rounded(1).bd("#444").mt(0.5),
          qu.bg(active ? "#0f0" : "#666"),
        )}
      />
    </div>
  );
};
