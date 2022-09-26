import NumericParameter from "./NumericParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a numeric parameter", () => {
  const userParameterStore = new UserParameterStore();
  const numericParameter = new NumericParameter({
    userParameterStore: userParameterStore,
    name: "Cutoff",
    key: "track.1.synthesizer.filter.cutoff",
    default: 1500,
  });
  expect(numericParameter.get()).toBe(1500);
  numericParameter.setValue(1000);
  expect(numericParameter.get()).toBe(1000);
});
