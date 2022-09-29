import NumericSetParameter from "./NumericSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicChordParameter = new NumericSetParameter({
    userParameterStore: userParameterStore,
    name: "Chord",
    key: "global.chord",
    default: [1, 2],
  });
  expect(musicChordParameter.val).toBe([1, 2]);
  musicChordParameter.setValue([3, 4]);
  expect(musicChordParameter.val).toBe([3, 4]);
});
