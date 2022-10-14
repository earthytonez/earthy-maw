import {
  MAJOR_SCALE_INTERVALS,
  MINOR_SCALE_INTERVALS,
} from "../../../../config/constants";
import { IMusicKey, IMusicScale } from "../../../../Types/index";

import { error } from "../../../../Util/logger";

const { ScaleType } = require("@tonaljs/tonal");
const SINGLE_OCTAVE_NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

export default class NoteIntervalCalculator {
  key: IMusicKey;
  scale: IMusicScale;

  getNoteName(noteNumber: number, halfStep?: boolean): string {
    let mod = 0;
    if (!!halfStep) {
      mod = 1;
    }
    let octave: string = (Math.floor(noteNumber / 12) - 1).toString();
    let name: string = SINGLE_OCTAVE_NOTES[((noteNumber - 9) % 12) + mod]!;
    return `${name}${octave}`;
  }

  octaveNumberFromNoteOctave(noteOctaveName: string): number {
    let octaveNumberRegEX = /([0-9]+)$/;
    let matchedExpression = noteOctaveName.match(octaveNumberRegEX);
    if (!matchedExpression || !matchedExpression[0]) {
      throw new Error("Invalid Note Octave Name");
    }
    let octaveNumber = parseInt(matchedExpression[0]);
    return octaveNumber;
  }

  noteNumberFromNoteOctave(noteOctaveName: string): number {
    let noteName = noteOctaveName.slice(0, -1);
    let noteNumber = SINGLE_OCTAVE_NOTES.indexOf(noteName) - 3;
    if (noteNumber < 0) {
      return 12 + noteNumber;
    }
    return noteNumber;
  }

  getNoteNumber(noteOctaveName: string): number {
    let octaveNumber = this.octaveNumberFromNoteOctave(noteOctaveName);
    let noteNumber = this.noteNumberFromNoteOctave(noteOctaveName);
    return (octaveNumber + 1) * 12 + noteNumber;
  }

  octaveFromNoteNumber(noteNumber: number): number {
    return Math.floor(noteNumber / 12 - 1);
  }

  // Next what if we're not starting at the root note.
  addIntervalToNote(noteNumber: number, interval: number) {
    /* retVal starts with the value of the current Note */
    let retVal: number = noteNumber;

    /* There are 12 notes in an octave.  We need to figure out where we are starting, and how that compares to
        the root note of the scale. */
    let octave = this.octaveFromNoteNumber(noteNumber);
    let rootNote = `${this.key}${octave}`;

    let rootNoteOfScale = this.getNoteNumber(rootNote);

    let noteDiff = retVal - rootNoteOfScale;
    // console.log(`noteDiff is ${noteDiff} from retVal ${retVal} and rootNote(${rootNote}) rootNoteOfScale(${rootNoteOfScale}), octave ${octave} and key ${this.key}`);
    let iMod = 0;
    let iTmp = 0;
    while (noteDiff > 0) {
      switch (this.scale.name) {
        case "major":
          noteDiff -= MAJOR_SCALE_INTERVALS[iTmp]!;
          iMod += 1;
          break;
        case "minor":
          noteDiff -= MINOR_SCALE_INTERVALS[iTmp]!;
          iMod += 1;
          break;
        case "aeolian":
          noteDiff -= MINOR_SCALE_INTERVALS[iTmp]!;
          iMod += 1;
          break;
        default:
          noteDiff -= 1;
          error("NOTE_INTERVAL_CALCULATOR", "This shouldn't really happen");
          break;
      }
      iTmp++;
    }
    let y = 0;
    for (let i = 0; i <= interval - 2; i++) {
      switch (this.scale.name) {
        case "major":
          let majorScaleInterval = MAJOR_SCALE_INTERVALS[i + iMod];
          if (!majorScaleInterval) {
            throw new Error(
              "Invalid interval mod for minor scaleinterval in NoteIntervalCalculator.ts"
            );
          }
          retVal += majorScaleInterval;
          y = y + majorScaleInterval;
          break;
        case "minor":
          let minorScaleInterval = MINOR_SCALE_INTERVALS[i + iMod];
          if (!minorScaleInterval) {
            throw new Error(
              "Invalid interval mod for minor scaleinterval in NoteIntervalCalculator.ts"
            );
          }
          retVal += minorScaleInterval;
          y = y + minorScaleInterval;
          break;
        case "aeolian":
          let aeolianScaleInterval = MINOR_SCALE_INTERVALS[i + iMod];
          if (!aeolianScaleInterval) {
            throw new Error(
              "Invalid interval mod for aeolian scaleinterval in NoteIntervalCalculator.ts"
            );
          }
          retVal += aeolianScaleInterval;
          y = y + aeolianScaleInterval;
          break;
      }
    }
    return retVal;
  }

  getNote(startNote: string, interval: number) {
    let halfStep = false;
    if (interval === 1) {
      return startNote;
    }
    if (interval % 1 === 0.5) {
      halfStep = true;
    }
    // console.log(`interval: ${interval}, halfStep: ${halfStep}`);

    let noteNumber = this.getNoteNumber(startNote);
    let addedInterval = this.addIntervalToNote(noteNumber, interval);
    return this.getNoteName(addedInterval, halfStep);
  }

  constructor(key: IMusicKey, scale: IMusicScale | string) {
    this.key = key;
    if (typeof scale == "string") {
      this.scale = ScaleType.get((scale as string).toLowerCase());
    } else {
      this.scale = scale;
    }

    console.log(this.scale.name);
  }
}
