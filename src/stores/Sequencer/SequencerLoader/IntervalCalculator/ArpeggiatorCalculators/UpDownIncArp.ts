import * as Tone from "tone";
import DoubleLengthArp from "./DoubleLengthArp";

import { IIntervalCalculatorParams } from "../IntervalCalculator";

export default class UpDownIncArp extends DoubleLengthArp {
  note: any;
  octave: number;

  _chordNotes: string[];

  constructor(params: IIntervalCalculatorParams, chordNotes: string[]) {
    super(params.chord.intervals.length, params.measureBeat, params.parameters);

    this._chordNotes = chordNotes;
    this.octave = params.octave;
  }

  chordNotes(): string[] {
    return this._chordNotes.concat([...this._chordNotes].reverse());
  }

  getTone() {
    let note = this.chordNotes()[this.step];
    if (note === undefined) {
      throw "Note upDownIncArpeggiator is undefined";
    }
    return Tone.Frequency(`${note}${this.octave}`);
  }
}
