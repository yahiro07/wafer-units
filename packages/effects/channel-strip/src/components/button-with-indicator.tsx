import { cz, qu } from "@/common/css-realm";

export const ButtonWithIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={cz(
        qu.wh(28, 17).bg("#999").bd("#555").rounded(1).cursor("pointer").it,
        qu.flexVA().it,
      )}
      onClick={onClick}
    >
      <div
        class={cz(
          qu.wh(12, 5).rounded(1).bd("#444").mt(0.5).it,
          qu.bg(active ? "#0f0" : "#666").it,
        )}
      />
    </div>
  );
};
