import { createContext, ReactNode, useContext } from "react";
import { Actions } from "@/store/actions";
import { AppStore } from "@/store/store";

export const AppContext = createContext<{
  store: AppStore;
  actions: Actions;
}>({} as any);

export const AppProvider = ({
  children,
  store,
  actions,
}: {
  children: ReactNode;
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
