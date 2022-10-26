import { debug } from "../../../../Util/logger";

import * as Tone from "tone";

import NoteIntervalCalculator from "./NoteIntervalCalculator";

import IntervalCalculator, {
  IIntervalCalculatorParams,
} from "./IntervalCalculator";

export default class ListIntervalCalculator extends IntervalCalculator {
  intervalType: "list" = "list";

  calculate(params: IIntervalCalculatorParams): Tone.FrequencyClass<number> {
    debug(
      "INTERVAL_TO_PLAY",
      `this.intervalType:${params.measureBeat} |${
        this.intervalType
      }|${JSON.stringify(params.chord)}`
    );
    console.log(params.parameters);

    // let stepInterval = 4;
    // if (parameters.has("stepinterval")) {
    //   stepInterval = parameters.get("stepinterval").val;
    // }

    debug(
      "INTERVAL_TO_PLAY",
      `intervalType === 'LIST' - intervalList: ${this.intervalList} interavalLength = ${this.intervalLength}`
    );

    if (this.intervalList) {
      let interval =
        this.intervalList[Math.floor(params.measureBeat / this.intervalLength)];
      if (!interval) {
        return Tone.Frequency(params.startNote);
      }
      let noteIntervalCalculator = new NoteIntervalCalculator(
        params.key,
        params.scale
      );

      return Tone.Frequency(
        noteIntervalCalculator.getNote(params.startNote, interval)
      );
    }
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number $params.measureBeat}, interval List: ${this.intervalList}, interval Length: ${this.intervalLength}`
    );
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number interval Array position: ${Math.floor(
        params.measureBeat / this.intervalLength
      )}`
    );

    return Tone.Frequency(params.startNote);
  }

  constructor(intervalLength: number, private intervalList: number[]) {
    super(intervalLength);
  }
}
