import { css } from "goober";

function npx(value: number) {
  return `${value}px`;
}

const core = {
  flexC: (gap?: number) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(gap && { gap: npx(gap * 4) }),
  }),
  flexV: (gap?: number) => ({
    display: "flex",
    flexDirection: "column",
    ...(gap && { gap: npx(gap * 4) }),
  }),
  wh: (width: number, height: number) => ({
    width: npx(width * 4),
    height: npx(height * 4),
  }),
  bg: (color: string) => ({ background: color }),
  bd: (color: string) => ({ border: `solid 1px ${color}` }),
  p: (padding: number) => ({ padding: npx(padding * 4) }),
  m: (margin: number) => ({ margin: npx(margin * 4) }),
  color: (color: string) => ({ color }),
  weight: (weight: string) => ({ fontWeight: weight }),
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

export function cx(...cursors: QCursor[]): string {
  return cursors.map((cursor) => cursor.toString()).join(" ");
}
