import { debug } from "../../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

import SequencerGate, { ISequencerGate } from "./SequencerGate";

const DEFAULT_GATE = 1;

/*
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class PlayEveryX implements ISequencerRunner {
  rhythm_length: number;

  playEveryXStepInterval(
    beatMarker: number,
    parameters: ITriggerParameters,
    sequencerParameters: any
  ): ISequencerGate {
    let stepInterval;
    if (sequencerParameters.has("stepinterval")) {
      stepInterval = sequencerParameters.get("stepinterval").val;
    } else {
      stepInterval = parameters.stepInterval;
    }

    let stepCount = beatMarker % stepInterval!;

    debug(
      "PLAY_EVERY_X",
      `Playing steps: ${beatMarker} / ${stepCount} - ${stepInterval} on ${parameters.on} -- ${parameters.fillEnd}`
    );

    let fillStep = 0;
    if (parameters?.fillEnd) {
      fillStep = beatMarker % parameters.fillEnd;
    }

    /* TODO: NEEDS MUCHO WORKO */
    if (parameters.selectedFill !== 0) {
      // 0 as a selected fill means no fill.

      if (
        fillStep &&
        parameters?.fillStart &&
        parameters?.fillEnd &&
        fillStep >= parameters.fillStart &&
        fillStep <= parameters.fillEnd
      ) {
        const fillArray = parameters.fillList![parameters.selectedFill!];
        if (fillArray) {
          const triggerFill = fillArray.includes(
            fillStep - parameters.fillStart
          );
          if (triggerFill) {
            return new SequencerGate(true);
          } else {
            return new SequencerGate(false);
          }
        }
      }
    }

    if (stepCount === parameters.on) {
      return new SequencerGate(true);
    }

    return new SequencerGate(false);
  }

  playEveryXStepList(
    beatMarker: number,
    parameters: ITriggerParameters,
    sequencerParameters: any
  ): ISequencerGate {
    let stepCount = beatMarker % this.rhythm_length;

    let stepInterval;
    if (sequencerParameters.has("stepinterval")) {
      stepInterval = sequencerParameters.get("stepinterval");
    } else {
      stepInterval = parameters.stepInterval;
    }

    debug(
      "PLAY_EVERY_X",
      `Playing from step list steps: ${this.rhythm_length} -- ${beatMarker} / ${stepCount} (${parameters.stepList}`
    );

    let gateToPlay;
    if (!parameters.gateList) {
      gateToPlay = DEFAULT_GATE;
    } else {
      gateToPlay = stepCount % parameters.gateList!.length;
    }
    debug(
      "PLAY_EVERY_X",
      `Playing from step list steps: ${gateToPlay} --  ${beatMarker} / ${stepCount} - ${stepInterval} on ${parameters.on}`
    );

    console.log(parameters.gateList);
    console.log(gateToPlay);

    return new SequencerGate(
      parameters?.stepList?.includes(stepCount),
      parameters.gateList![gateToPlay]! / 10
    );
  }

  run(
    beatMarker: number,
    parameters: ITriggerParameters,
    sequencerParameters: any
  ): ISequencerGate {
    console.log(sequencerParameters);
    debug("PLAY_EVERY_X", "Parameters = ", parameters);

    switch (parameters.triggerType) {
      case "stepList":
        return this.playEveryXStepList(
          beatMarker,
          parameters,
          sequencerParameters
        );
      case "stepInterval":
        return this.playEveryXStepInterval(
          beatMarker,
          parameters,
          sequencerParameters
        );
    }
    return {
      triggered: false,
    };
  }

  constructor(rhythm_length: number) {
    this.rhythm_length = rhythm_length;
  }
}
