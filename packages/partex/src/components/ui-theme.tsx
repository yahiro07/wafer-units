import { camelToKebab } from "mofur/ax";
import { ReactNode } from "react";

const colors = {
  clPanelBg: "#eee",
  clKnobBg: "#bbb",
  clKnobTickBg: "#fff",
  clButtonActiveBg: "#77aadd",
  clForeground: "#457",
};

export const colorVars: Record<keyof typeof colors, string> =
  Object.fromEntries(
    Object.keys(colors).map((key) => [key, `var(--${camelToKebab(key)})`]),
  ) as Record<keyof typeof colors, string>;

const cssVariablesCss = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [
    `--${camelToKebab(key)}`,
    value,
  ]),
);

export const CssVariablesFrame = ({ children }: { children: ReactNode }) => {
  return (
    <div style={cssVariablesCss} css={{ color: colorVars.clForeground }}>
      {children}
    </div>
  );
};

export const uiClasses = {
  borderCommon: "border border-black/15",
};
