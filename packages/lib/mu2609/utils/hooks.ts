import { useState } from "preact/hooks";

export function useInstance<T>(factory: () => T): T {
  const [instance] = useState(factory);
  return instance;
}
