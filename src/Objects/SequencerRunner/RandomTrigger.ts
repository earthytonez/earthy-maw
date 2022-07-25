import { debug } from "../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

/* 
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class RandomTrigger {
  rhythm_length: number;

  generateRandom(min, max) {
    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}


  randomInterval(beatMarker: any, parameters: ITriggerParameters): boolean {

    debug("RANDOM_TRIGGER", "beatMarker", beatMarker);
    debug("RANDOM_TRIGGER", "rhythm_length", this.rhythm_length);
    debug("RANDOM_TRIGGER", "parameters", parameters);
    let stepCount = beatMarker.num % this.rhythm_length;
    debug("RANDOM_TRIGGER",
      `Playing from step list steps: ${this.rhythm_length} -- ${beatMarker.num} / ${stepCount} (${parameters.stepList}`
    );

    if (beatMarker.beatsSinceLastNote > this.generateRandom(parameters.minSkip, parameters.maxSkip)) {
      beatMarker.resetBeatsSinceLastNote();
      return true;
    }
  }

  run(beatMarker: number, parameters: ITriggerParameters): boolean {
    debug("RANDOM_TRIGGER", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "random":
        return this.randomInterval(beatMarker, parameters);
      case "stepInterval":
        return this.randomInterval(beatMarker, parameters);
    }
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
  }
}
