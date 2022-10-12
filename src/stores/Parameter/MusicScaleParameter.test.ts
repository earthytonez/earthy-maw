import MusicScaleParameter from "./MusicScaleParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a music scale parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicScaleParameter = new MusicScaleParameter({
    userParameterStore: userParameterStore,
    name: "Scale",
    key: "global.chord",
    default: "major",
    description: "description",
  });
  expect(musicScaleParameter.val.name).toBe("major");
  musicScaleParameter.setValue("square");
  expect(musicScaleParameter.val.name).toBe("major");
  musicScaleParameter.setValue("minor");
  expect(musicScaleParameter.val.name).toBe("major"); // Set Value shouldn't change value as music chord parameter defaults to on deck.
  musicScaleParameter.swapOnDeck();
  expect(musicScaleParameter.val.name).toBe("aeolian");
});
