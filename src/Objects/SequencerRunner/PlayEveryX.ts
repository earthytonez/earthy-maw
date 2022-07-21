import { SequencerLoader } from "../SequencerLoader";
import { debug } from "../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

/* 
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class PlayEveryX {
  rhythm_length: number;
  playEveryXStepInterval(beatNumber: number, parameters: ITriggerParameters): boolean {
    let stepCount = beatNumber % parameters.stepInterval!;
    debug("PLAY_EVERY_X",
      `Playing steps: ${beatNumber} / ${stepCount} - ${parameters.stepInterval} on ${parameters.on} x: ${this.x}`
    );

    if (stepCount === parameters.on) {
      return true;
    }

    return false;
  }

  playEveryXStepList(beatNumber: number, parameters: ITriggerParameters): boolean {
    let stepCount = beatNumber % this.rhythm_length;
    debug("PLAY_EVERY_X",
      `Playing from step list steps: ${this.rhythm_length} -- ${beatNumber} / ${stepCount} (${parameters.stepList}`
    );

    return parameters.stepList.includes(stepCount);
  }

  run(beatNumber: number, parameters: ITriggerParameters): boolean {
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(beatNumber, parameters);
      case "stepInterval":
        return this.playEveryXStepInterval(beatNumber, parameters);
    }
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
  }
}
