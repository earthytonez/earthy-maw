import StringParameter from "./StringParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter that is not changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.waveform");
  const stringParameter = new StringParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: "sine",
    changedAtSection: false,
    description: "description",
  });
  expect(stringParameter.val).toBe("sine");
  stringParameter.setValue("square");
  expect(stringParameter.val).toBe("square");
});

test("set a string parameter that is changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.waveform");
  const stringParameterSectionInterval = new StringParameter({
    userParameterStore: userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: "sine",
    changedAtSection: true,
    description: "description",
  });
  expect(stringParameterSectionInterval.val).toBe("sine");
  stringParameterSectionInterval.setValue("square");
  expect(stringParameterSectionInterval.val).toBe("sine");
  stringParameterSectionInterval.swapOnDeck();
  expect(stringParameterSectionInterval.val).toBe("square");
});
