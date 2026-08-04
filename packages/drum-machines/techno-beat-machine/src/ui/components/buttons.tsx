import { ComponentChildren } from "preact";
import { colors } from "@/ui/common/colors";
import { cz, qu } from "@/ui/common/css-realm";
import { PartIndicator } from "@/ui/components/indicators";
import { npx } from "@/utils/helpers";
import { qfc } from "@/utils/qfc";

export const Button = qfc<{
  className?: string;
  height?: number;
  asr?: number;
  children?: ComponentChildren;
  active?: boolean;
  disabled?: boolean;
  altActive?: boolean;
  onClick?: () => void;
}>()({
  render: (
    {
      className,
      height = 50,
      asr = 1.6,
      children,
      active,
      disabled,
      altActive,
      onClick,
    },
    styles,
  ) => {
    const width = height * asr;
    return (
      <button
        type="button"
        sx={[styles.base, disabled && styles.baseDisabled, className]}
        style={{ width: npx(width), height: npx(height) }}
        onClick={onClick}
      >
        <div
          sx={[
            styles.inner,
            active && styles.innerActive,
            disabled && styles.innerDisabled,
            altActive && styles.innerAltActive,
          ]}
        >
          {children}
        </div>
      </button>
    );
  },
  styles: {
    base: qu.bg("#222").color("#fff").p(0.5).rounded(1).cursor("pointer"),
    baseDisabled: qu.pointerEvents("none"),
    inner: cz(
      qu.wh("full", "full").flexC(),
      qu.bd("inset 1px #aaa3").bg(colors.buttonBg).rounded(2),
    ),
    innerActive: qu.bg(colors.active),
    innerDisabled: cz(qu.bg("#444"), { borderColor: "#aaa3" }),
    innerAltActive: qu.bd(`solid 1.5px ${colors.active}`).color(colors.active),
  },
});

export const PartButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      className={cz(qu.fontSize(22).weight("500"))}
      altActive={active}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const ControlButton = ({
  label,
  active,
  children,
  onClick,
}: {
  label?: string;
  active?: boolean;
  children?: ComponentChildren;
  onClick?: () => void;
}) => {
  return (
    <Button
      height={40}
      asr={1.6}
      className={cz(qu.fontSize(16))}
      active={active}
      onClick={onClick}
    >
      {label}
      {children}
    </Button>
  );
};

export const PartActiveButton = ({
  active,
  disabled,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      height={30}
      asr={2}
      disabled={disabled}
      onClick={onClick}
      className={cz(qu.relative())}
    >
      <div sx={qu.absoluteFull().flexC().pb(3)}>
        <PartIndicator width={18} height={6} active={active} />
      </div>
    </Button>
  );
};
