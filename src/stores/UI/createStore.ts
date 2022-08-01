import UIStateStore from "./UIState.store";

export function createStore() {
  // note the use of this which refers to observable instance of the store
  return new UIStateStore();
}

export type TStore = ReturnType<typeof createStore>;
