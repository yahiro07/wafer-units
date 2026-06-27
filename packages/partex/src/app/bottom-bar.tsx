import { lowClip } from "mofur/ax";
import { useEffect } from "react";
import { store } from "@/store/store";

export const BottomBar = () => {
  const { currentPageIndex, loopBars } = store.useSnapshot();
  const pageNum = lowClip(loopBars / 2, 1);
  useEffect(() => {
    if (currentPageIndex >= pageNum) {
      store.setCurrentPageIndex(0);
    }
  }, [currentPageIndex, pageNum]);
  return (
    <div className="text-xs text-center">
      {currentPageIndex + 1} / {pageNum}
    </div>
  );
};
