import StringSetParameter from "./StringSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string enum array parameter", () => {
  const userParameterStore = new UserParameterStore();
  const stringEnumArrayParameter = new StringSetParameter({
    userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.waveform",
    default: ["sine"],
    description: "description",
  });
  expect(stringEnumArrayParameter.val).toStrictEqual(["sine"]);
  stringEnumArrayParameter.setValue(["square"]);
  expect(stringEnumArrayParameter.val).toStrictEqual(["square"]);
});
