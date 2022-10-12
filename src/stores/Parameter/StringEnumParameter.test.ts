import StringEnumParameter from "./StringEnumParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a enum parameter", () => {
  const userParameterStore = new UserParameterStore();
  const enumParameter = new StringEnumParameter({
    userParameterStore: userParameterStore,
    name: "Waveform",
    key: "track.1.synthesizer.filter.waveform",
    options: ["sine", "square", "sawtooth", "triangle"],
    default: "sine",
    plugin: "Filter",
    description: "description",
  });
  expect(enumParameter.get()).toBe("sine");
  enumParameter.setValue("square");
  expect(enumParameter.get()).toBe("square");
  enumParameter.setValue("circle");
  expect(enumParameter.get()).toBe("square");
});
