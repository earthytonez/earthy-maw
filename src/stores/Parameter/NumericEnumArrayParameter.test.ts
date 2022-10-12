import NumericEnumArrayParameter from "./NumericEnumArrayParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a numeric enum array parameter", () => {
  const userParameterStore = new UserParameterStore();
  const numericEnumArrayParameter = new NumericEnumArrayParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: [1],
    description: "hello",
    options: [1, 2, 3, 4],
  });
  expect(numericEnumArrayParameter.val).toStrictEqual([1]);
  numericEnumArrayParameter.setValue([2]);
  expect(numericEnumArrayParameter.val).toStrictEqual([2]);
});
