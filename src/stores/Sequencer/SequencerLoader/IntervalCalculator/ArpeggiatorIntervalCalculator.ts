import { IMusicChord, IMusicKey, IMusicScale } from "Types";
import { debug } from "../../../../Util/logger";

import * as Tone from "tone";

import { Chord } from "@tonaljs/tonal";

import IntervalCalculator from "./IntervalCalculator";

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

  isDownUpArpeggiator() {
    return this.intervalArp === "downup";
  }

  isRandomArpeggiator() {
    return this.intervalArp === "random";
  }

  calculate(
    measureBeat: number,
    chord: IMusicChord,
    key: IMusicKey,
    _scale: IMusicScale,
    startNote: string,
    octave: number,
    parameters: any
  ): Tone.FrequencyClass<number> {
    debug(
      "INTERVAL_TO_PLAY",
      `this.intervalType:${measureBeat} |${this.intervalType}|${JSON.stringify(
        chord
      )}`
    );
    console.log(parameters);
    this.intervalArp = parameters.get("arpeggiatortype").val;

    let chordDef = Chord.getChord(chord.name, key);

    let stepInterval = 4;
    if (parameters.has("stepinterval")) {
      stepInterval = parameters.get("stepinterval").val;
    }

    let length: number = 0;
    let step: number = 0;
    if (this.intervalType === "arpeggiator") {
      length = chord.intervals.length;
      step = (measureBeat / stepInterval) % length;
      debug(
        "INTERVAL_TO_PLAY",
        `Getting interval for intervalType Arpeggiator ${chord} -- ${step} - ${measureBeat} - ${length} ${chordDef.notes[step]}`
      );
    }

    if (this.isUpArpeggiator()) {
      return Tone.Frequency(`${chordDef.notes[step]}${octave}`);
    }

    if (this.isDownArpeggiator()) {
      return Tone.Frequency(`${chordDef.notes.reverse()[step]}${octave}`);
    }

    if (this.isUpDownArpeggiator()) {
      length = length * 2;
      step = (measureBeat / stepInterval) % length;
      let chordNotes = chordDef.notes.concat([...chordDef.notes].reverse());
      console.log(chordNotes);
      return Tone.Frequency(`${chordNotes[step]}${octave}`);
    }
    if (this.isDownUpArpeggiator()) {
      length = length * 2;
      step = (measureBeat / stepInterval) % length;
      let chordNotes = [...chordDef.notes].reverse().concat(chordDef.notes);
      return Tone.Frequency(`${chordNotes[step]}${octave}`);
    }

    if (this.isRandomArpeggiator()) {
      return Tone.Frequency(
        `${
          chordDef.notes[Math.floor(Math.random() * chordDef.notes.length)]
        }${octave}`
      );
    }

    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number ${measureBeat}, interval Length: ${this.intervalLength}`
    );
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number interval Array position: ${Math.floor(
        measureBeat / this.intervalLength
      )}`
    );

    return Tone.Frequency(startNote);
  }

  constructor(intervalLength: number, private intervalArp: string) {
    super(intervalLength);
  }
}
