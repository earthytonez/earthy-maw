import { debug } from "../../../Util/logger";

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

import SequencerGate, { ISequencerGate } from "./SequencerGate";

const DEFAULT_GATE = 1;

interface IPlayEveryXFillParams {
  beatMarker: number;
  fillStart: number;
  fillEnd: number;
  fillList: number[][];
  selectedFill: number;
}

class PlayEveryXFill {
  beatMarker: number;
  fillStart: number;
  fillEnd: number;
  fillList: number[][];
  selectedFill: number;
  fillStep: number = 0;
  constructor(params: IPlayEveryXFillParams) {
    this.beatMarker = params.beatMarker;
    this.fillStart = params.fillStart;
    this.fillEnd = params.fillEnd;
    this.fillList = params.fillList;
    this.selectedFill = params.selectedFill;
  }

  private get fillArray(): number[] {
    return this.fillList[this.selectedFill]!;
  }

  private get triggerFill() {
    return this.fillArray.includes(this.fillStep - this.fillStart);
  }

  fill(): ISequencerGate {
    debug(
      "PLAY_EVERY_X_FILL",
      `Returning Fill fillArray=${this.fillArray} triggerFillDecision=${this.fillStep}-${this.fillStart} triggerFill=${this.triggerFill}`
    );
    if (this.fillArray && this.triggerFill) {
      return new SequencerGate(true);
    } else {
      return new SequencerGate(false);
    }
  }

  try(): boolean {
    if (this.fillEnd) {
      this.fillStep = this.beatMarker % this.fillEnd;
    }

    let decision =
      this.fillStep >= this.fillStart && this.fillStep <= this.fillEnd;

    debug(
      "PLAY_EVERY_X_FILL",
      `Returning Fill Try ${this.fillStep}, ${this.fillStart}, ${this.fillEnd}, ${decision}`
    );

    return decision;
  }
}
/*
 * Play Every X is used to calculate whether or not a trigger should occur, usually
 * playing every x notes.
 */
export default class PlayEveryX implements ISequencerRunner {
  rhythm_length: number;

  playEveryXStepInterval(
    beatMarker: number,
    parameters: ITriggerParameters,
    sequencerParameters: Map<string, any>
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
      `Playing steps: ${beatMarker} / ${stepCount} - ${stepInterval} on ${
        parameters.on
      } -- fillStart: ${parameters.fillStart} -- fillEnd: ${
        parameters.fillEnd
      }, Selected Fill: ${sequencerParameters.get("selectedfill")}`
    );

    if (
      sequencerParameters.has("selectedfill") &&
      sequencerParameters.get("selectedfill") !== 0 &&
      parameters.fillStart &&
      parameters.fillEnd &&
      parameters.fillList
    ) {
      let playEveryXFill = new PlayEveryXFill({
        beatMarker: beatMarker,
        fillStart: parameters.fillStart,
        fillEnd: parameters.fillEnd,
        fillList: parameters.fillList,
        selectedFill: sequencerParameters.get("selectedfill").val,
      });

      if (playEveryXFill.try()) {
        let fill = playEveryXFill.fill();
        console.log(`PLAY_EVERY_X_FILL CRAP ${fill}`);
        return fill;
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
    debug("PLAY_EVERY_X", "Parameters ", {
      parameters: parameters,
      sequencerParameters: sequencerParameters,
    });

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
