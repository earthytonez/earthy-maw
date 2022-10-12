import StringSetParameter from "./StringSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a String Set parameter", () => {
  const userParameterStore = new UserParameterStore();
  const setParameter = new StringSetParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: ["sine"],
    description: "description",
  });
  expect(setParameter.val).toStrictEqual(["sine"]);
  setParameter.setValue(["square"]);
  expect(setParameter.val).toStrictEqual(["square"]);
});
