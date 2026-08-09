import { twind, cssom, tx as tx$, css as css$ } from "@twind/core";
import type { CSSProperties, Falsey, Class, CSSObject } from "@twind/core";
import { twindConfig } from "@/twind-config";

export const tw = twind(twindConfig, cssom());
export const tx = tx$.bind(tw);
export const css = css$.bind(tw);

type StyleObject = CSSProperties & {
  [K in
    | `&${string}`
    | `${string} &${string}`
    | `@media ${string}`
    | `@supports ${string}`
    | `@layer ${string}`]?: StyleObject;
};
// oxlint-disable-next-line typescript/no-redundant-type-constituents
type TzArg = string | number | boolean | StyleObject | Falsey | TzArg[];

function normalize(arg: TzArg): Class {
  if (Array.isArray(arg)) {
    return arg.map(normalize);
  }
  if (arg && typeof arg === "object") {
    return css(arg as CSSObject);
  }
  return arg as Exclude<TzArg, StyleObject | TzArg[]>;
}

export function tz(...args: TzArg[]): string {
  return tx(...args.map(normalize));
}
