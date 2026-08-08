import { render } from "preact";
import "./setup-twind";

const App = () => {
  return <div class="h-[100dvh] flex-c">hello</div>;
};

render(<App />, document.getElementById("app")!);
