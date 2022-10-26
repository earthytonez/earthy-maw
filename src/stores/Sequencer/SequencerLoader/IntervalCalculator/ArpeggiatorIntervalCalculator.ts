import { debug } from "../../../../Util/logger";

import * as Tone from "tone";

import { Chord } from "@tonaljs/tonal";

import IntervalCalculator, {
  IIntervalCalculatorParams,
} from "./IntervalCalculator";

import {
  UpDownArp,
  DownUpIncArp,
  DownUpArp,
  UpDownIncArp,
  UpArp,
  DownArp,
} from "./ArpeggiatorCalculators";

export default class ArpeggiatorIntervalCalculator extends IntervalCalculator {
  intervalType: "arpeggiator" = "arpeggiator";

  isUpArpeggiator() {
    return this.intervalArp === "up";
  }

  isDownArpeggiator() {
    return this.intervalArp === "down";
  }

  isUpDownArpeggiator() {
    return this.intervalArp === "updown";
  }

  isDownUpIncArpeggiator() {
    return this.intervalArp === "downupinc";
  }

  isUpDownIncArpeggiator() {
    return this.intervalArp === "updowninc";
  }

  isDownUpArpeggiator() {
    return this.intervalArp === "downup";
  }

  isRandomArpeggiator() {
    return this.intervalArp === "random";
  }

  isTopLineUpArpeggiator() {
    return this.intervalArp === "top-line-up";
  }

  isTopLineDownArpeggiator() {
    return this.intervalArp === "top-line-down";
  }

  isBottomLineUpArpeggiator() {
    return this.intervalArp === "bottom-line-up";
  }

  isBottomLineDownArpeggiator() {
    return this.intervalArp === "bottom-line-down";
  }

  isTopLineUpInversedArpeggiator() {
    return this.intervalArp === "top-line-up-inversed";
  }

  isTopLineDownInversedArpeggiator() {
    return this.intervalArp === "top-line-down-inversed";
  }

  isBottomLineUpInversedArpeggiator() {
    return this.intervalArp === "bottom-line-up-inversed";
  }

  isBottomLineDownInversedArpeggiator() {
    return this.intervalArp === "bottom-line-down-inversed";
  }

  calculate(params: IIntervalCalculatorParams): Tone.FrequencyClass<number> {
    debug(
      "INTERVAL_TO_PLAY",
      `this.intervalType:${params.measureBeat} |${
        this.intervalType
      }|${JSON.stringify(params.chord)}`
    );
    console.log(params.parameters);
    this.intervalArp = params.parameters.get("arpeggiatortype").val;

    let chordDef = Chord.getChord(params.chord.name, params.key);

    let stepInterval = 4;
    if (params.parameters.has("stepinterval")) {
      stepInterval = params.parameters.get("stepinterval").val;
    }

    let length: number = 0;
    let step: number = 0;

    console.log(chordDef);

    if (this.intervalType === "arpeggiator") {
      length = params.chord.intervals.length;
      step = Math.ceil((params.measureBeat / stepInterval) % length);
      debug(
        "INTERVAL_TO_PLAY",
        `Getting interval for intervalType Arpeggiator ${params.chord} -- ${step} - ${params.measureBeat} - ${length} ${chordDef.notes[step]}`
      );
    }

    if (this.isUpArpeggiator()) {
      let arpCalculator = new UpArp(params, chordDef.notes, step);
      return arpCalculator.getTone();
    }

    if (this.isDownArpeggiator()) {
      let arpCalculator = new DownArp(params, chordDef.notes, step);
      return arpCalculator.getTone();
    }

    if (this.isUpDownArpeggiator()) {
      let arpCalculator = new UpDownArp(params, chordDef.notes);
      return arpCalculator.getTone();
    }

    if (this.isDownUpArpeggiator()) {
      let arpCalculator = new DownUpArp(params, chordDef.notes);
      return arpCalculator.getTone();
    }

    if (this.isUpDownIncArpeggiator()) {
      let arpCalculator = new UpDownIncArp(params, chordDef.notes);
      return arpCalculator.getTone();
    }

    if (this.isDownUpIncArpeggiator()) {
      let arpCalculator = new DownUpIncArp(params, chordDef.notes);
      return arpCalculator.getTone();
    }

    if (this.isTopLineUpArpeggiator()) {
      length = length * 2 - 2;
      step = (params.measureBeat / stepInterval) % length;
      let chordNotes: string[] = [];
      chordDef.notes.forEach((_chordNote: string, i: number) => {
        if (i < chordDef.notes.length) {
          if (chordDef.notes[0] && chordDef.notes[i]) {
            chordNotes.push(chordDef.notes[chordDef.notes.length - 1]!);
            chordNotes.push(chordDef.notes[i]!);
          }
        }
      });

      console.log(chordNotes);

      let note = chordNotes[step];
      if (note === undefined) {
        throw "Note downUpArpeggiatoris undefined";
      }

      return Tone.Frequency(`${note}${params.octave}`);
    }

    if (this.isTopLineDownArpeggiator()) {
      length = length * 2 - 2;
      step = (params.measureBeat / stepInterval) % length;

      let chordNotes: string[] = [];
      chordDef.notes.forEach((_chordNote: string, i: number) => {
        if (i > 0) {
          if (chordDef.notes[0] && chordDef.notes[i]) {
            chordNotes.push(chordDef.notes[chordDef.notes.length - 1]!);
            chordNotes.push(chordDef.notes[chordDef.notes.length - i - 1]!);
          }
        }
      });

      let note = chordNotes[step];

      if (note === undefined) {
        throw "Note downUpArpeggiatoris undefined";
      }

      return Tone.Frequency(`${note}${params.octave}`);
    }

    if (this.isBottomLineDownArpeggiator()) {
      length = length * 2 - 2;
      step = (params.measureBeat / stepInterval) % length;
      let chordNotes: string[] = [];
      chordDef.notes.forEach((_chordNote: string, i: number) => {
        if (i < chordDef.notes.length) {
          if (chordDef.notes[0] && chordDef.notes[i]) {
            chordNotes.push(chordDef.notes[0]!);
            console.log(chordDef.notes.length - i);
            chordNotes.push(chordDef.notes[chordDef.notes.length - i - 1]!);
          }
        }
      });

      let note = chordNotes[step];
      if (note === undefined) {
        throw "Note bottomLineDownArpeggiator undefined";
      }

      return Tone.Frequency(`${note}${params.octave}`);
    }

    if (this.isBottomLineUpArpeggiator()) {
      length = length * 2 - 2;
      step = (params.measureBeat / stepInterval) % length;
      let chordNotes: string[] = [];
      chordDef.notes.forEach((_chordNote: string, i: number) => {
        if (i > 0) {
          if (chordDef.notes[0] && chordDef.notes[i]) {
            chordNotes.push(chordDef.notes[0]!);
            chordNotes.push(chordDef.notes[i]!);
          }
        }
      });

      let note = chordNotes[step];
      if (note === undefined) {
        throw "Note bottomLineUpArpeggiator undefined";
      }

      return Tone.Frequency(`${note}${params.octave}`);
    }

    if (this.isRandomArpeggiator()) {
      return Tone.Frequency(
        `${chordDef.notes[Math.floor(Math.random() * chordDef.notes.length)]}${
          params.octave
        }`
      );
    }

    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number ${params.measureBeat}, interval Length: ${this.intervalLength}`
    );
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number interval Array position: ${Math.floor(
        params.measureBeat / this.intervalLength
      )}`
    );

    return Tone.Frequency(params.startNote);
  }

  constructor(intervalLength: number, private intervalArp: string) {
    super(intervalLength);
  }
}
