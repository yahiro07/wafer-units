import { mount } from "svelte";
import "./page.css";
import App from "./app.svelte";

const target = document.getElementById("app")!;
const app = mount(App, { target });

export default app;
