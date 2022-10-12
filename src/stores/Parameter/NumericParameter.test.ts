import NumericParameter from "./NumericParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a numeric parameter that is not changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.cutoff");

  const numericParameter = new NumericParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: 1,
    changedAtSection: false,
    description: "description",
    min: 0,
    max: 1,
  });

  expect(numericParameter.val).toBe(1);
  numericParameter.setValue(2);
  expect(numericParameter.val).toBe(2);
});

test("set a numeric parameter that is changed at section intervals", async () => {
  const userParameterStore = new UserParameterStore();
  await userParameterStore.remove("track.1.synthesizer.cutoff");
  const numericParameter = new NumericParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.cutoff",
    default: 1,
    changedAtSection: true,
    description: "description",
    min: 0,
    max: 1,
  });

  expect(numericParameter.val).toBe(1);
  numericParameter.setValue(2);
  expect(numericParameter.val).toBe(1);
  numericParameter.swapOnDeck();
  expect(numericParameter.val).toBe(2);
});
