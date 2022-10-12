import NumericSetParameter from "./NumericSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const numericSetParameter = new NumericSetParameter({
    userParameterStore: userParameterStore,
    name: "Chord",
    key: "global.chord",
    default: [1, 2],
    description: "Chord",
  });
  expect(numericSetParameter.val).toStrictEqual([1, 2]);
  numericSetParameter.setValue([3, 4]);
  expect(numericSetParameter.val).toStrictEqual([3, 4]);
});
