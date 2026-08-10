import { qu } from "@/common/css-realm";

export const ButtonWithIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      sx={[
        qu.wh(36, 36).bg("#999").bd("#555").rounded(8).p(0.75),
        qu.flexHA().cursor("pointer"),
      ]}
      onClick={onClick}
    >
      <div
        sx={[
          qu.wh(10, 10).rounded("full").bd("#444"),
          qu.bg(active ? "#0f0" : "#666"),
        ]}
      />
    </div>
  );
};
