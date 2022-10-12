import BooleanParameter from "./BooleanParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a boolean parameter that is not changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.cutoff");

  const booleanParameter = new BooleanParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: true,
    changedAtSection: false,
    description: "description",
  });

  expect(booleanParameter.val).toBe(true);
  booleanParameter.setValue(false);
  expect(booleanParameter.val).toBe(false);
});

test("set a boolean parameter that is changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.cutoff");

  const booleanParameter = new BooleanParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.cutoff",
    default: false,
    changedAtSection: true,
    description: "description",
  });

  expect(booleanParameter.val).toBe(false);
  booleanParameter.setValue(true);
  expect(booleanParameter.val).toBe(false);
  booleanParameter.swapOnDeck();
  expect(booleanParameter.val).toBe(true);
});
