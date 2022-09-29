import MusicScaleParameter from "./MusicScaleParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicChordParameter = new MusicScaleParameter({
    userParameterStore: userParameterStore,
    name: "Chord",
    key: "global.chord",
    default: "major",
  });
  expect(musicChordParameter.val.name).toBe("major");
  musicChordParameter.setValue("square");
  expect(musicChordParameter.val.name).toBe("major");
  musicChordParameter.setValue("minor");
  expect(musicChordParameter.val.name).toBe("minor");
});
