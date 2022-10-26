import * as Tone from "tone";
import DoubleLengthArp from "./DoubleLengthArp";

import { IIntervalCalculatorParams } from "../IntervalCalculator";

export default class UpDownArp extends DoubleLengthArp {
  _chordNotes: string[];
  octave: number;

  constructor(params: IIntervalCalculatorParams, chordNotes: string[]) {
    super(params.chord.intervals.length, params.measureBeat, params.parameters);

    this.octave = params.octave;
    this._chordNotes = chordNotes;
  }

  chordNotes(): string[] {
    return this._chordNotes.concat(
      [...this._chordNotes.slice(0, -1)].reverse()
    );
  }

  getTone() {
    let note = this.chordNotes()[this.step];
    if (note === undefined) {
      throw "Note upDownArpeggiator is undefined";
    }
    return Tone.Frequency(`${note}${this.octave}`);
  }
}
