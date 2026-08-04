import { qu } from "@/common/css-realm";

export const StompButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      sx={qu
        .wh(36, 36)
        .bg("#999")
        .bd("#777")
        .rounded("100%")
        .flexC()
        .cursor("pointer")}
      onClick={onClick}
    >
      <div sx={qu.wh(28, 28).bg("#bbb").rounded("100%")} />
    </div>
  );
};
