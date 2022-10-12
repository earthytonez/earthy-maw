import NumericArrayParameter from "./NumericArrayParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a numeric array parameter", () => {
  const userParameterStore = new UserParameterStore();
  const numericArrayParameter = new NumericArrayParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: [1],
    description: "description",
    min: 0,
    max: 100,
  });
  expect(numericArrayParameter.val).toStrictEqual([1]);
  numericArrayParameter.setValue([2]);
  expect(numericArrayParameter.val).toStrictEqual([2]);
});
