import StringArrayParameter from "./StringArrayParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string array parameter", () => {
  const userParameterStore = new UserParameterStore();
  const stringArrayParameter = new StringArrayParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: ["sine"],
    description: "Description",
  });
  expect(stringArrayParameter.val).toStrictEqual(["sine"]);
  stringArrayParameter.setValue(["square"]);
  expect(stringArrayParameter.val).toStrictEqual(["square"]);
});
