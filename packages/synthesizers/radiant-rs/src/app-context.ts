import { createContext } from "svelte";
import { AppModel } from "./model/app-model.svelte";

export const [getAppModelContext, setAppModelContext] =
  createContext<AppModel>();
