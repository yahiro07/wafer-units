import { createContext } from "svelte";
import { AppModel } from "./app-model.svelte";

export const [getAppModelContext, setAppModelContext] =
  createContext<AppModel>();
