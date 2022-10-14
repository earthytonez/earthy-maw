import { IMusicChord, IMusicScale } from "Types";
import { IMusicKey } from "Types";
import { debug } from "../../../../Util/logger";

import * as Tone from "tone";

import NoteIntervalCalculator from "./NoteIntervalCalculator";

import IntervalCalculator from "./IntervalCalculator";

export default class ListIntervalCalculator extends IntervalCalculator {
  intervalType: "list" = "list";

  calculate(
    measureBeat: number,
    chord: IMusicChord,
    key: IMusicKey,
    scale: IMusicScale,
    startNote: string,
    _octave: number,
    parameters: any
  ): Tone.FrequencyClass<number> {
    debug(
      "INTERVAL_TO_PLAY",
      `this.intervalType:${measureBeat} |${this.intervalType}|${JSON.stringify(
        chord
      )}`
    );
    console.log(parameters);

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
        this.intervalList[Math.floor(measureBeat / this.intervalLength)];
      if (!interval) {
        return Tone.Frequency(startNote);
      }
      let noteIntervalCalculator = new NoteIntervalCalculator(key, scale);

      return Tone.Frequency(
        noteIntervalCalculator.getNote(startNote, interval)
      );
    }
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number ${measureBeat}, interval List: ${this.intervalList}, interval Length: ${this.intervalLength}`
    );
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number interval Array position: ${Math.floor(
        measureBeat / this.intervalLength
      )}`
    );

    return Tone.Frequency(startNote);
  }

  constructor(intervalLength: number, private intervalList: number[]) {
    super(intervalLength);
  }
}
