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


  randomInterval(beatMarker: number, beatsSinceLastNote: number, resetBeatsSinceLastNote: Function, parameters: ITriggerParameters): boolean {
    let stepCount = beatMarker % this.rhythm_length;
    
    debug("RANDOM_TRIGGER",
      `Playing from step list steps: ${beatMarker} / ${stepCount} (${parameters.stepList}`
    );

    console.log('a');
    if (beatsSinceLastNote > this.generateRandom(parameters.minSkip, parameters.maxSkip)) {
      console.log('b');
      resetBeatsSinceLastNote();
      return true;
    }
    return false;
  }

  run(beatMarker: number, beatsSinceLastNote: number, resetBeatsSinceLastNote: Function, parameters: ITriggerParameters): boolean {
    debug("RANDOM_TRIGGER", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "random":
        return this.randomInterval(beatMarker, beatsSinceLastNote, resetBeatsSinceLastNote, parameters);
    }
    return false;
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
    this.rhythm_length = 0;
  }
}
