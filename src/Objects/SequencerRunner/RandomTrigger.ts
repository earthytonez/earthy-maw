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
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }

  getRandomFloat(min: number, max: number, decimals: number): number {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

  randomInterval(
    beatMarker: number,
    beatsSinceLastNote: number,
    resetBeatsSinceLastNote: Function,
    parameters: ITriggerParameters,
    minGate: number,
    maxGate: number,
    minInterval: number,
    maxInterval: number
  ): ISequencerGate {
    let stepCount = beatMarker % this.rhythm_length;

    debug(
      "RANDOM_TRIGGER",
      `Playing from step list steps: ${beatMarker} / ${stepCount} (${parameters.stepList}`
    );

    if (
      beatsSinceLastNote >
      this.generateRandom(
        parameters.minSkip,
        parameters.maxSkip,
        minGate,
        maxGate,
        minInterval,
        maxInterval
      )
    ) {
      resetBeatsSinceLastNote();
      console.log(this.getRandomFloat(minGate, maxGate, 2));

      return {
        triggered: true,
        length: this.getRandomFloat(minGate, maxGate, 2),
      };
    }
    return {
      triggered: false,
    };
  }

  run(
    beatMarker: number,
    beatsSinceLastNote: number,
    resetBeatsSinceLastNote: Function,
    parameters: ITriggerParameters,
    minGate: number,
    maxGate: number,
    minInterval: number,
    maxInterval: number
  ): ISequencerGate {
    debug("RANDOM_TRIGGER", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "random":
        return this.randomInterval(
          beatMarker,
          beatsSinceLastNote,
          resetBeatsSinceLastNote,
          parameters,
          minGate,
          maxGate,
          minInterval,
          maxInterval
        );
    }
    return false;
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
    this.rhythm_length = 0;
  }
}
