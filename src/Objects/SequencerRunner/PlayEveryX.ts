import { SequencerLoader } from "../SequencerLoader";
import { debug } from "../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

export default class PlayEveryX {
  sequencerLoader: SequencerLoader;
  playEveryXStepInterval(beatNumber: number, parameters: ITriggerParameters) {
    let stepCount = beatNumber % parameters.stepInterval!;
    debug("PLAY_EVERY_X",
      `Playing steps: ${beatNumber} / ${stepCount} - ${parameters.stepInterval} on ${parameters.on} x: ${this.x}`
    );

    if (stepCount === parameters.on) {
      return true;
    }

    return false;
  }

  playEveryXStepList(beatNumber: number, parameters: ITriggerParameters) {
    let stepCount = beatNumber % this.sequencerLoader.rhythm_length;
    debug("PLAY_EVERY_X",
      `Playing from step list steps: ${this.sequencerLoader.rhythm_length} -- ${beatNumber} / ${stepCount} (${parameters.stepList}`
    );

    return parameters.stepList.includes(stepCount);
  }

  run(beatNumber: number, parameters: ITriggerParameters) {
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(beatNumber, parameters);
      case "stepInterval":
        return this.playEveryXStepInterval(beatNumber, parameters);
    }
  }

  constructor(sequencerLoader: SequencerLoader) {
    this.sequencerLoader = sequencerLoader;
  }
}
