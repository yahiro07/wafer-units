import { RefObject } from "preact";
import { useEffect } from "preact/hooks";

export function useInitialScrollCenter(baseDivRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const div = baseDivRef.current;
    if (div) {
      div.scrollTo(0, div.scrollHeight / 2 - div.clientHeight / 2);
    }
  }, []);
}
