import * as Tone from "tone";

import { IIntervalCalculatorParams } from "../IntervalCalculator";

export default class DownArp {
  note: any;
  octave: number;

  constructor(
    params: IIntervalCalculatorParams,
    chordNotes: string[],
    step: number
  ) {
    this.octave = params.octave;
    this.note = chordNotes[chordNotes.length - step - 1];
  }

  getTone() {
    if (this.note == undefined) {
      throw "Note down is undefined";
    }

    return Tone.Frequency(`${this.note}${this.octave}`);
  }
}
