export type PickKeysForValueType<T, S> = {
  [K in keyof T]: T[K] extends S ? K : never;
}[keyof T];
