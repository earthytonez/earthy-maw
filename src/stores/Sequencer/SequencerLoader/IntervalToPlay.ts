import { IMusicChord, IMusicScale } from "Types";
import { IMusicKey } from "Types";
import { debug, info } from "../../../Util/logger";

import NoteIntervalCalculator from "./NoteIntervalCalculator";

import * as Tone from "tone";

import { Chord, Scale } from "@tonaljs/tonal";
/*
 * IntervalToPlay parses an array or a type of an interval to determine what notes to play
 * in a sequence.  You can think of this as a melody, though often it is for something
 * simpler than a lead melody.
 *
 * There are two main types of intervals,
 *
 * list: A simple list of intervals, which can have lenghts associated with them so you don't change every beat.
 * arpeggiator: Take a chord and play it's intervals.
 */
export default class IntervalToPlay {
  intervalArray: Array<number> = [];
  intervalLength: number = 1;
  intervalType: "list" | "arpeggiator" | undefined = undefined;
  intervalArp: string = "up";
  intervalList: number[] = [];

  isUpArpeggiator() {
    return this.intervalType === "arpeggiator" && this.intervalArp === "up";
  }

  isDownArpeggiator() {
    return this.intervalType === "arpeggiator" && this.intervalArp === "down";
  }

  isUpDownArpeggiator() {
    return this.intervalType === "arpeggiator" && this.intervalArp === "updown";
  }

  isDownUpArpeggiator() {
    return this.intervalType === "arpeggiator" && this.intervalArp === "downup";
  }

  isRandomArpeggiator() {
    return this.intervalType === "arpeggiator" && this.intervalArp === "random";
  }

  coinToss() {
    return Math.floor(Math.random() * 2) === 0;
  }

  allOctavesScale(scaleDef: any): string[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8]
      .map((o: number) => {
        return scaleDef.notes.map((n: string) => {
          return `${n}${o}`;
        });
      })
      .flat();
  }

  getCurrentIntervalFromScale(
    scale: IMusicScale,
    key: IMusicKey,
    startNote: string,
    lastNote: string
  ): number {
    let scaleDef = Scale.get(`${key} ${scale.name}`);
    let allOctavesScale: string[] = this.allOctavesScale(scaleDef);
    let last = allOctavesScale.indexOf(lastNote);
    let start = allOctavesScale.indexOf(startNote);
    return last - start;

    // switch (direction) {
    //   case "up":
    //     return last - start;
    //   case "down":
    //     return start - last;
    //   case "either":
    //     if (this.coinToss()) {
    //       return last - start;
    //     } else {
    //       return start - last;
    //     }
    // }
    // return 0;
  }

  getScaleInterval(
    scale: IMusicScale,
    key: IMusicKey,
    interval: number,
    octave: number
  ) {
    info(
      "INTERVAL_TO_PLAY",
      `getScaleInterval ${scale.name} ${key} ${interval} ${octave}`
    );
    let scaleDef = Scale.get(`${key} ${scale.name}`);
    let allOctavesScale: string[] = this.allOctavesScale(scaleDef);

    let startIndex = allOctavesScale.indexOf(`${key}${octave}`);
    let retNote = allOctavesScale[startIndex + interval];
    return Tone.Frequency(retNote);
  }

  get(
    measureBeat: number,
    chord: IMusicChord,
    key: IMusicKey,
    scale: IMusicScale,
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
      console.log(step);
      let chordNotes = chordDef.notes.concat([...chordDef.notes].reverse());
      console.log(chordNotes);
      return Tone.Frequency(`${chordNotes[step]}${octave}`);
    }
    if (this.isDownUpArpeggiator()) {
      length = length * 2;
      step = (measureBeat / stepInterval) % length;
      console.log(step);
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

    if (this.intervalType === "list") {
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
    }
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number ${measureBeat}, interval Array: ${this.intervalArray}, interval Length: ${this.intervalLength}`
    );
    debug(
      "INTERVAL_TO_PLAY",
      `Beat Number interval Array position: ${Math.floor(
        measureBeat / this.intervalLength
      )}`
    );

    return Tone.Frequency(startNote);
  }

  parse(line: any) {
    if (!line) {
      return;
    }
    this.intervalLength = line.interval_length;
    this.intervalType = line.interval_type;

    if (this.intervalType === "arpeggiator") {
      this.intervalArp = line.type_list[0];
    }

    if (this.intervalType === "list") {
      this.intervalList = line.list;
    }
  }
}
