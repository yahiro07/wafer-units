import { colors } from "@/ui/common/colors";
import { cz, qu } from "@/ui/common/css-realm";
import { Button } from "@/ui/components/buttons";
import { npx } from "@/utils/helpers";

const StepButtonIndicator = ({
  active,
  size,
  altColor,
}: {
  active: boolean;
  size: number;
  altColor?: boolean;
}) => {
  return (
    <div
      class={cz(
        qu.bg("#4444").rounded(99).it,
        active && qu.bg(`${altColor ? "#684" : colors.active}!important`).it,
      )}
      style={{ width: npx(size), height: npx(size) }}
    />
  );
};

export const StepButton = ({
  value,
  onClick,
  isMirrored,
}: {
  value?: number;
  onClick?: () => void;
  isMirrored?: boolean;
}) => {
  return (
    <Button height={42} asr={1} disabled={isMirrored} onClick={onClick}>
      {value === 0.5 && (
        <StepButtonIndicator active={true} size={8} altColor={isMirrored} />
      )}
      {value === 1 && (
        <StepButtonIndicator active={true} size={15} altColor={isMirrored} />
      )}
    </Button>
  );
};
