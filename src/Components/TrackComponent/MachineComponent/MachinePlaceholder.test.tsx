// import React from "react";

// import { TStore } from '../../stores/UI/createStore'
// import ReactDOM from 'react-dom/client';
// import { act } from 'react-dom/test-utils';

// import MachinePlaceholder from "./MachinePlaceholder";
// import UIStateStore from "../../stores/UI/UIState.store";
// import { assert } from "console";

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("has a placeholder test", () => {
  expect(1+1).toEqual(2);
});

// it("renders learn react link", () => {
//   const machineType:
//     | "sequencer"
//     | "modulator"
//     | "synthesizer"
//     | "arranger"
//     | "musicFeature"
//     | undefined = "sequencer";


//   const storeContext = React.createContext<TStore | null>(null)
//   let uiStateStore = new UIStateStore();

//   act(() => {
//     ReactDOM.createRoot(container).render(
//       <storeContext.Provider value={uiStateStore}>
//         <MachinePlaceholder placeholder="placeholder" machineType={machineType} />
//       </storeContext.Provider>
//     );
//   });

//   /* Open Machine browser */
//   expect(uiStateStore.machineBrowserOpen).toBe(false);
//   expect(uiStateStore.machinesBrowsing).toBe(undefined);

//   const button = container.querySelector('button#browse-machines');

//   act(() => {
//     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });

//   expect(uiStateStore.machinesBrowsing).toBe(machineType);
//   expect(uiStateStore.machineBrowserOpen).toBe(true);
//   expect(1).toBe(1);
// });
