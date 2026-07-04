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
  rounded: (radius: number | string) => {
    if (radius === "full") {
      radius = "100%";
    }
    return { borderRadius: typeof radius === "number" ? npx(radius) : radius };
  },
  relative: () => ({ position: "relative" }),
  absolute: () => ({ position: "absolute" }),
  full: () => ({ width: "100%", height: "100%" }),
  css: (attrs: CSSProperties) => attrs,
  cp: () => ({ cursor: "pointer" }),
  minW: (width: number) => ({ minWidth: npx(width) }),
  invisible: () => ({ visibility: "hidden" }),
  addClass: (className: string | undefined) => className,
  top: (top: number) => ({ top: npx(top) }),
  right: (right: number) => ({ right: npx(right) }),
  bottom: (bottom: number) => ({ bottom: npx(bottom) }),
  left: (left: number) => ({ left: npx(left) }),
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

type QCursor = {
  [K in keyof typeof core]: (...args: Parameters<(typeof core)[K]>) => QCursor;
} & {
  it: string;
};

type CssFn = (obj: Record<string, any>) => string;

function createQCursor(
  cssFn: CssFn,
  initialObj?: Record<string, any>,
): QCursor {
  const obj: Record<string, any> = initialObj ? { ...initialObj } : {};
  const additionalClasses: string[] = [];
  let cachedClassName: string | undefined;

  const toClassName = () => {
    if (cachedClassName !== undefined) {
      return cachedClassName;
    }
    let className = cssFn(obj);
    if (additionalClasses.length > 0) {
      className += " " + additionalClasses.join(" ");
    }
    cachedClassName = className;
    return className;
  };

  let self: QCursor;

  const coreAdapted = makeAdapter<typeof core, QCursor>(
    core,
    (style): QCursor => {
      if (typeof style === "string") {
        additionalClasses.push(style);
      } else if (typeof style === "object") {
        if ((style as any).__isQCursor) {
          Object.assign(obj, (style as any).getStylesObject());
        } else {
          for (const key in style) {
            obj[key] = (style as any)[key];
          }
        }
      }
      cachedClassName = undefined;
      return self;
    },
  );

  self = {
    get it() {
      return toClassName();
    },
    ...coreAdapted,
  };

  return self;
}

const toKebab = (str: string) =>
  str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function makeCssText(obj: Record<string, any>): string {
  let cssText = "";
  for (const key in obj) {
    cssText += `${toKebab(key)}:${obj[key]};`;
  }
  return cssText;
}

//crc32 function based on https://stackoverflow.com/a/18639999
const makeCRCTable = () => {
  let c: number;
  const crcTable: number[] = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
};
const crcTable = makeCRCTable();

export const crc32 = (str: string): string => {
  let crc = 0 ^ -1;
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
  }
  const value = (crc ^ -1) >>> 0;
  return value.toString(16).padStart(8, "0");
};

function cz(...items: (false | string | undefined)[]): string {
  return items.filter(Boolean).join(" ");
}

export function createCssRealm() {
  const sheet = new CSSStyleSheet();
  const cache = new Set<string>();

  const cssFn: CssFn = (obj) => {
    const cssText = makeCssText(obj);
    if (cssText === "") return "";

    const hash = crc32(cssText);
    const className = `cs-${hash}`;
    if (!cache.has(className)) {
      cache.add(className);
      const rule = `.${className}{${cssText}}`;
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        console.error(`Failed to insert rule: ${rule}`, e);
      }
    }
    return className;
  };

  const qu = makeAdapter(core, (style) =>
    createQCursor(cssFn, style as Record<string, any>),
  );
  return { qu, cz, cssRealm: { sheet } };
}
