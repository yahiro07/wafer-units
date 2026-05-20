import { css, domStyled, FC, jsx } from "alumina";
import { appStore } from "@/store";
import { IconButton } from "@/ui/components";

export const CompactModeSwitcher: FC = () => {
  const {
    state: { isCompactMode },
    actions: { setCompactMode },
  } = appStore.uiPresenter;
  return domStyled(
    <div>
      <IconButton
        iconSpec={
          isCompactMode ? "ph-arrows-out-simple" : "ph-arrows-in-simple"
        }
        size={45}
        onClick={() => setCompactMode(!isCompactMode)}
        class={isCompactMode && "--active"}
      />
    </div>,
    css`
    `,
  );
};
