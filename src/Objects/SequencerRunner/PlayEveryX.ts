import { debug } from "../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

import { BeatMarker } from "../../stores/MusicFeatures/BeatMarker";

/* 
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class PlayEveryX {
  rhythm_length: number;
  playEveryXStepInterval(beatMarker: BeatMarker, parameters: ITriggerParameters): boolean {
    let stepCount = beatMarker.num % parameters.stepInterval!;
    debug("PLAY_EVERY_X",
      `Playing steps: ${beatMarker.num} / ${stepCount} - ${parameters.stepInterval} on ${parameters.on} x: ${this.x}`
    );

    if (stepCount === parameters.on) {
      return true;
    }

    return false;
  }

  playEveryXStepList(beatMarker: BeatMarker, parameters: ITriggerParameters): boolean {
    let stepCount = beatMarker.num % this.rhythm_length;
    debug("PLAY_EVERY_X",
      `Playing from step list steps: ${this.rhythm_length} -- ${beatMarker.num} / ${stepCount} (${parameters.stepList}`
    );

    return parameters.stepList.includes(stepCount);
  }

  run(beatMarker: BeatMarker, parameters: ITriggerParameters): boolean {
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(beatMarker, parameters);
      case "stepInterval":
        return this.playEveryXStepInterval(beatMarker, parameters);
    }
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
  }
}
