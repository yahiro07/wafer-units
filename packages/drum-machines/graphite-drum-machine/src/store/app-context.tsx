import { createContext, ComponentChildren } from "preact";
import { Actions } from "@/store/actions";
import { AppStore } from "@/store/store";
import { useContext } from "preact/hooks";

export const AppContext = createContext<{
  store: AppStore;
  actions: Actions;
}>({} as any);

export const AppProvider = ({
  children,
  store,
  actions,
}: {
  children: ComponentChildren;
  store: AppStore;
  actions: Actions;
}) => {
  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
