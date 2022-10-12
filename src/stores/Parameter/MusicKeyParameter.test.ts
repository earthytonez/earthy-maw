import MusicKeyParameter from "./MusicKeyParameter";
import UserParameterStore from "stores/UserParameter.store";

test("set a string parameter", () => {
  const userParameterStore = new UserParameterStore();
  const musicKeyParameter = new MusicKeyParameter({
    userParameterStore: userParameterStore,
    name: "Key",
    key: "global.chord",
    default: "C",
    description: "description",
  });
  expect(musicKeyParameter.val).toBe("C");
  musicKeyParameter.setValue("square");
  expect(musicKeyParameter.val).toBe("C");
  musicKeyParameter.setValue("D");
  expect(musicKeyParameter.val).toBe("C"); // Set Value shouldn't change value as music chord parameter defaults to on deck.
  musicKeyParameter.swapOnDeck();
  expect(musicKeyParameter.val).toBe("D");
});
