import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";

const Button = styled("button", { base: { background: "yellow" } });

export function App() {
  return (
    <div class="text-red-500 p-2 bd-blue">
      hello solidjs
      <Button>Click me</Button>
      <div class={foo}>foo</div>
    </div>
  );
}
const foo = style({
  background: "cyan",
});
