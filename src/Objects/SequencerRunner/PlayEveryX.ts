import { SequencerLoader } from "../SequencerLoader";
import { debug } from "../../Util/logger";

export default class PlayEveryX {
  sequencerLoader: SequencerLoader;
  playEveryXStepInterval(beatNumber: number, parameters: PlayParameters) {
    let stepCount = beatNumber % parameters.steps;
    debug("PLAY_EVERY_X",
      `Playing steps: ${beatNumber} / ${stepCount} - ${parameters.steps} on ${parameters.on} x: ${this.x}`
    );

    if (stepCount == parameters.on) {
      return true;
    }

    return false;
  }

  playEveryXStepList(beatNumber: number, parameters: PlayParameters) {
    let stepCount = beatNumber % this.sequencerLoader.rhythm_length;
    debug("PLAY_EVERY_X",
      `Playing from step list steps: ${this.sequencerLoader.rhythm_length} -- ${beatNumber} / ${stepCount} (${parameters.stepList}`
    );

    return parameters.stepList.includes(stepCount);
  }

  run(beatNumber: number, parameters: PlayParameters) {
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(beatNumber, parameters);
        break;
      case "stepInterval":
        return this.playEveryXStepInterval(beatNumber, parameters);
        break;
    }
  }

  constructor(sequencerLoader: SequencerLoader) {
    this.sequencerLoader = sequencerLoader;
  }
}
