import { setup } from "goober";
import { h } from "preact";
import { cx, qu } from "@/utils/qstyle-goober";

setup(h);

export const App = () => {
  return (
    <div class={qu.flexV(2)}>
      <div class={qu.bg("yellow").p(2).flexC()}>Hello</div>
      <div
        class={cx(qu.bg("blue").p(2).flexC(), qu.color("white").weight("bold"))}
      >
        Hello
      </div>
    </div>
  );
};
