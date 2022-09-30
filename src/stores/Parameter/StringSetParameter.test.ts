import StringSetParameter from "./StringSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a set parameter", () => {
  const userParameterStore = new UserParameterStore();
  const setParameter = new StringSetParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: ["sine"],
  });
  expect(setParameter.val).toStrictEqual(["sine"]);
  setParameter.setValue(["square"]);
  expect(setParameter.val).toStrictEqual(["square"]);
});
