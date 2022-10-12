import MusicChordParameter from "./MusicChordParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicChordParameter = new MusicChordParameter({
    userParameterStore: userParameterStore,
    name: "Chord",
    key: "global.chord",
    default: "major",
    description: "description",
  });
  expect(musicChordParameter.val.name).toBe("major");
  musicChordParameter.setValue("square");
  expect(musicChordParameter.val.name).toBe("major");
  musicChordParameter.setValue("minor");
  expect(musicChordParameter.val.name).toBe("major"); // Set Value shouldn't change value as music chord parameter defaults to on deck.
  musicChordParameter.swapOnDeck();
  expect(musicChordParameter.val.name).toBe("minor");
});
