import RandomTrigger from "./RandomTrigger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

test("test RandomTrigger random Trigger Type", async () => {
  let rhythmLength = 16;
  let randomTrigger = new RandomTrigger(rhythmLength);

  let parameters: ITriggerParameters = {
    stepInterval: 4,
    triggerType: "random",
    on: 0,
    octaves: 1,
    minSkip: 1,
    maxSkip: 2,
  };

  let resetBeatsSinceLastNote = jest.fn();

  expect(
    randomTrigger.run(0, 5, resetBeatsSinceLastNote, parameters, new Map())
      .triggered
  ).toBeTruthy();
});
