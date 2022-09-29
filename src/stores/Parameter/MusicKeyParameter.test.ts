import MusicKeyParameter from "./MusicKeyParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicChordParameter = new MusicKeyParameter({
    userParameterStore: userParameterStore,
    name: "Chord",
    key: "global.chord",
    default: "major",
  });
  expect(musicChordParameter.val).toBe("major");
  musicChordParameter.setValue("square");
  expect(musicChordParameter.val).toBe("major");
  musicChordParameter.setValue("minor");
  expect(musicChordParameter.val).toBe("minor");
});
