import RootStore from "./Root.store";

export function createStore() {
  // note the use of this which refers to observable instance of the store
  let audioContext = new AudioContext;
  return new RootStore(audioContext);
}

export type TStore = ReturnType<typeof createStore>;
