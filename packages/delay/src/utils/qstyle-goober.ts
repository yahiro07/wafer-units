import { css } from "goober";
import { CSSProperties } from "preact";

function npx(value: number) {
  return `${value}px`;
}

function npx4(value: number) {
  return npx(value * 4);
}

const core = {
  flexH: () => ({
    display: "flex",
    flexDirection: "row",
  }),
  flexHA: () => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  flexC: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  flexV: () => ({
    display: "flex",
    flexDirection: "column",
  }),
  flexVA: () => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  flexVC: () => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  flexVL: () => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }),
  justify: (
    value: "start" | "center" | "end" | "between" | "around" | "evenly",
  ) => {
    const actualValue = {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    }[value];
    return { justifyContent: actualValue };
  },
  gap: (value: number) => ({
    gap: npx(value * 4),
  }),
  grow: () => ({ flexGrow: 1 }),
  w: (width: number) => ({ width: npx(width) }),
  h: (height: number) => ({ height: npx(height) }),
  wh: (width: number, height: number) => ({
    width: npx(width),
    height: npx(height),
  }),
  bg: (color: string) => ({ background: color }),
  bd: (color: string) => ({ border: `solid 1px ${color}` }),
  p: (padding: number) => ({ padding: npx4(padding) }),
  pt: (padding: number) => ({ paddingTop: npx4(padding) }),
  pb: (padding: number) => ({ paddingBottom: npx4(padding) }),
  pl: (padding: number) => ({ paddingLeft: npx4(padding) }),
  pr: (padding: number) => ({ paddingRight: npx4(padding) }),
  m: (margin: number) => ({ margin: npx4(margin) }),
  ml: (margin: number) => ({ marginLeft: npx4(margin) }),
  mr: (margin: number) => ({ marginRight: npx4(margin) }),
  color: (color: string) => ({ color }),
  weight: (weight: string) => ({ fontWeight: weight }),
  inlineBlock: () => ({ display: "inline-block" }),
  fontSize: (size: number) => ({ fontSize: npx(size) }),
  rounded: (radius: number | string) => ({
    borderRadius: typeof radius === "number" ? npx(radius) : radius,
  }),
  relative: () => ({ position: "relative" }),
  full: () => ({ width: "100%", height: "100%" }),
  css: (attrs: CSSProperties) => attrs,
  cp: () => ({ cursor: "pointer" }),
  minW: (width: number) => ({ minWidth: npx(width) }),
  invisible: () => ({ visibility: "hidden" }),
};

function makeAdapter<T extends Record<string, (...args: any[]) => any>, R>(
  obj: T,
  adapter: (obj: ReturnType<T[keyof T]>) => R,
): { [K in keyof T]: (...args: Parameters<T[K]>) => R } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, fn]) => [
      key,
      (...args: any[]) => adapter(fn(...args)),
    ]),
  ) as { [K in keyof T]: (...args: Parameters<T[K]>) => R };
}

type QCursor = string & {
  [K in keyof typeof core]: (...args: Parameters<(typeof core)[K]>) => QCursor;
} & {
  getStylesObject: () => Record<string, any>;
  toString: () => string;
  [Symbol.toPrimitive]: () => string;
};

function createQCursor(initialObj?: Record<string, any>): QCursor {
  const obj: any = initialObj ?? {};

  let cachedClassName: string | undefined;

  const toClassName = () => {
    cachedClassName ??= css(obj);
    return cachedClassName;
  };

  let self: QCursor;

  const coreAdapted = makeAdapter<typeof core, QCursor>(
    core,
    (style): QCursor => {
      Object.assign(obj, style);
      cachedClassName = undefined;
      return self;
    },
  );

  self = {
    getStylesObject() {
      return obj;
    },
    toString: toClassName,
    [Symbol.toPrimitive]: toClassName,
    ...coreAdapted,
  } as QCursor;

  return self;
}

export const qu = makeAdapter(core, (style) => createQCursor(style));

export function cx(...items: (QCursor | false | string | undefined)[]): string {
  return items
    .filter(Boolean)
    .map((cursor) => cursor!.toString())
    .join(" ");
}

export const qlsx = cx;
