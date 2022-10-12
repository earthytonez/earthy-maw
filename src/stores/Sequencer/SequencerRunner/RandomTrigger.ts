import BaseParameter from "stores/Parameter/Base";
import { debug } from "../../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";
import SequencerGate from "./SequencerGate";
/*
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class RandomTrigger implements ISequencerRunner {
  rhythm_length: number;

  generateRandom(min: number, max: number) {
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
  ): SequencerGate {
    let stepCount = beatMarker % this.rhythm_length;

    debug(
      "RANDOM_TRIGGER",
      `Playing from step list steps: ${beatMarker} / ${stepCount} (${parameters.stepList}`
    );

    if (beatsSinceLastNote > this.generateRandom(minInterval, maxInterval)) {
      resetBeatsSinceLastNote();
      console.log(this.getRandomFloat(minGate, maxGate, 2));

      return new SequencerGate(true, this.getRandomFloat(minGate, maxGate, 2));
    }
    return new SequencerGate(false);
  }

  run(
    beatMarker: number,
    beatsSinceLastNote: number,
    resetBeatsSinceLastNote: Function,
    parameters: ITriggerParameters,
    sequencerParameters: Map<string, BaseParameter>
  ): SequencerGate {
    debug("RANDOM_TRIGGER", "Parameters = ", parameters);

    let minGate = sequencerParameters.get("min_gate") || { val: 0.1 };
    let maxGate = sequencerParameters.get("max_gate") || { val: 10 };
    let minInterval = sequencerParameters.get("min_interval") || { val: 5 };
    let maxInterval = sequencerParameters.get("max_interval") || { val: 10 };

    switch (parameters.triggerType) {
      case "random":
        return this.randomInterval(
          beatMarker,
          beatsSinceLastNote,
          resetBeatsSinceLastNote,
          parameters,
          minGate!.val,
          maxGate!.val,
          minInterval!.val,
          maxInterval!.val
        );
    }
    return new SequencerGate(false);
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
    this.rhythm_length = 0;
  }
}
