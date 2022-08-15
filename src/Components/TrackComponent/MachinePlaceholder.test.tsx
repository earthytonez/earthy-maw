import MachinePlaceholder from "./MachinePlaceholder";
import UIStateStore from "../../stores/UI/UIState.store";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import { UIStoreProvider } from "../../stores/UI/useUIStore";

Enzyme.configure({ adapter: new Adapter() });

test("renders learn react link", () => {
  const machineType:
    | "sequencer"
    | "modulator"
    | "synthesizer"
    | "arranger"
    | "musicFeature"
    | undefined = "sequencer";

  const uiStateStore = new UIStateStore();
  const container = mount(
    <UIStoreProvider>
      <MachinePlaceholder placeholder="placeholder" machineType={machineType} />
    </UIStoreProvider>
  );

  expect(container.html()).toMatchSnapshot();

  /* Open Machine browser */
  expect(uiStateStore.machineBrowserOpen).toBe(false);
  expect(uiStateStore.machinesBrowsing).toBe(undefined);
  container.find("button#browse-machines").simulate("click");

  expect(uiStateStore.machinesBrowsing).toBe(machineType);
  expect(uiStateStore.machineBrowserOpen).toBe(true);
  expect(1).toBe(1);
});
