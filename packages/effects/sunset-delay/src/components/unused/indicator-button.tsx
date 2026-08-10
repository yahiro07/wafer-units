import { qu } from "@/common/css-realm";

export const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      sx={qu.flexC().wh(20, 20)}
      style={{
        background: active ? "#59e" : "#ddd",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};
