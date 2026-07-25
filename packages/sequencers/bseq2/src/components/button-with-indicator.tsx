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
        qu.wh(36, 36).bg("#999").bd("#555").rounded(8).p(0.75).cursor("pointer")
          .it,
        qu.flexHA().it,
      )}
      onClick={onClick}
    >
      <div
        class={cz(
          qu.wh(10, 10).rounded("full").bd("#444").it,
          qu.bg(active ? "#0f0" : "#666").it,
        )}
      />
    </div>
  );
};
