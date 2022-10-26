import { NOTE_NUMBERS } from "../../../../../config/constants";
import { IIntervalCalculatorParams } from "../IntervalCalculator";

import * as Tone from "tone";

export default class UpArp {
  _chordNotes: string[];
  _note: any;
  _octave: number;
  step: number;

  constructor(
    params: IIntervalCalculatorParams,
    chordNotes: string[],
    step: number
  ) {
    this._octave = params.octave;
    this._note = chordNotes[step];
    this.step = step;
    this._chordNotes = chordNotes;
  }

  get note(): string {
    if (this._note === undefined) {
      throw "Note up is undefined";
    }

    if (this._note == "B#") {
      return "C";
    }
    if (this._note == "E#") {
      return "F";
    }

    return this._note;
  }

  get octave(): number {
    let incrOctave = false;
    for (let i = 0; i <= this.step; i++) {
      if (i == this.step) {
        continue;
      }
      if (NOTE_NUMBERS[this._chordNotes[i]!]! >= NOTE_NUMBERS[this.note!]!) {
        incrOctave = true;
      }
    }

    if (incrOctave) {
      return this._octave + 1;
    }

    return this._octave;
  }

  getTone() {
    console.log(`${this.note}${this.octave}`);
    return Tone.Frequency(`${this.note}${this.octave}`);
  }
}
