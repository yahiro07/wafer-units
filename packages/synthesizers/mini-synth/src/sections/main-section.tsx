import type { JSXElement } from "solid-js";
import {
  leftColumnParams,
  ParamColumn,
  rightColumnParams,
} from "@/organisms/param-column";

export const MainSection = (): JSXElement => {
  return (
    <div class="flex-h flex-1 overflow-hidden">
      <div class="flex-v flex-1 border-r border-neutral-700">
        <ParamColumn params={leftColumnParams} />
      </div>
      <div class="flex-v flex-1">
        <ParamColumn params={rightColumnParams} />
      </div>
    </div>
  );
};
