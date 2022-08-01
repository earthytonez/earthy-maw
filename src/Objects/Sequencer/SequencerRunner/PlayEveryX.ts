import { debug } from "../../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

import SequencerGate, { ISequencerGate } from "./SequencerGate";

/* 
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class PlayEveryX implements ISequencerRunner {
  rhythm_length: number;

  playEveryXStepInterval(beatMarker: number, parameters: ITriggerParameters): ISequencerGate {
    let stepCount = beatMarker % parameters.stepInterval!;
    debug("PLAY_EVERY_X",
      `Playing steps: ${beatMarker} / ${stepCount} - ${parameters.stepInterval} on ${parameters.on}`
    );

    if (stepCount === parameters.on) {
      return new SequencerGate(true);
    }

    return new SequencerGate(false);
  }

  playEveryXStepList(beatMarker: number, parameters: ITriggerParameters): ISequencerGate {
    let stepCount = beatMarker % this.rhythm_length;
    debug("PLAY_EVERY_X",
      `Playing from step list steps: ${this.rhythm_length} -- ${beatMarker} / ${stepCount} (${parameters.stepList}`
    );

    return new SequencerGate(parameters?.stepList?.includes(stepCount));
  }

  run(beatMarker: number, parameters: ITriggerParameters): ISequencerGate {
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(beatMarker, parameters);
      case "stepInterval":
        return this.playEveryXStepInterval(beatMarker, parameters);
    }
    return {
      triggered: false
    }
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
  }
}
