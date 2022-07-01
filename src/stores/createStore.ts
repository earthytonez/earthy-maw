import RootStore from "./Root.store.ts";

export function createStore() {
  // note the use of this which refers to observable instance of the store
  return new RootStore();
}

export type TStore = ReturnType<typeof createStore>;
