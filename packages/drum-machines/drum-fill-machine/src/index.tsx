import { render } from "preact";
import { tz } from "./setup-twind";

const App = () => {
  return <div class={tz("h-[100dvh] flex-c")}>aaa</div>;
};

const rootElement = document.getElementById("app")!;
render(<App />, rootElement);
