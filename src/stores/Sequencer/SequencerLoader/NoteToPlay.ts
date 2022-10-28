import * as Tone from "tone";

import { debug, info, warn } from "../../../Util/logger";

import { Note, Scale } from "@tonaljs/tonal";
import { IMusicChord, IMusicKey, IMusicScale } from "Types";
import IntervalToPlay from "./IntervalToPlay";

export interface INoteToPlayDefinition {
  note: string;
}

export default class NoteToPlay {
  noteNotInterval: boolean = false;
  note?: Tone.FrequencyClass<number> | undefined;

  noteChooser: "random" | "interval" | "interval_parameter" | "single" =
    "single";

  getRandomNote(
    key: IMusicKey,
    scale: IMusicScale,
    _chord: IMusicChord,
    octaves: number[],
    _measureBeat: number
  ): Tone.FrequencyClass<number> {
    let scaleName = `${key} ${scale.name}`;
    debug("NOTE_TO_PLAY", `Getting notes from ${scaleName} scale.`);
    let notes = Scale.get(scaleName).notes;
    debug("NOTE_TO_PLAY", `NOTES: `, notes);
    let octave = octaves[Math.floor(Math.random() * octaves.length)];
    let note = notes[Math.floor(Math.random() * notes.length)];

    return Tone.Frequency(`${note}${octave}`);
  }

  getSingleNote(): Tone.FrequencyClass<number> {
    return Tone.Frequency(this.note);
  }

  getIntervalNote(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    measureBeat: number,
    intervalToPlay: IntervalToPlay,
    parameters: any
  ): Tone.FrequencyClass<number> {
    let octaveToPlay = 4;
    console.log("NOTE_TO_PLAY", octaveToPlay, octaves);
    if (octaves[0]) {
      octaveToPlay = octaves[0];
    }

    let startNote = `${key}${octaveToPlay}`;

    if (this.noteNotInterval) {
      return Tone.Frequency(startNote);
    }

    debug(
      "NOTE_TO_PLAY",
      `Getting notes from ${measureBeat} ${chord.name} chord.`
    );

    let intervalFrequency = intervalToPlay.get(
      measureBeat,
      chord,
      key,
      scale,
      startNote,
      octaveToPlay,
      parameters
    );

    debug(
      "NOTE_TO_PLAY",
      `Returning intervalFrequency ${intervalFrequency}`,
      intervalFrequency
    );
    return intervalFrequency;
  }

  getOctave(octaves: number[]) {
    let octaveToPlay = 4;
    if (octaves[0]) {
      octaveToPlay = octaves[0];
    }
    return octaveToPlay;
  }

  coinToss() {
    return Math.floor(Math.random() * 2) === 0;
  }

  calcInterval(
    interval: number,
    direction: string,
    pitchShift: number
  ): number {
    switch (direction) {
      case "up":
        return interval + pitchShift;
      case "down":
        return interval - pitchShift;
      case "either":
        if (this.coinToss()) {
          return interval + pitchShift;
        } else {
          return interval - pitchShift;
        }
    }
    return interval + pitchShift;
  }

  getArrayStep(measureBeat: number, stepInterval: number, steps: number) {
    return (measureBeat / stepInterval - 1) % steps;
  }

  getIntervalParameterNote({
    key,
    scale,
    octaves,
    measureBeat,
    intervalToPlay,
    parameters,
    lastParams,
  }: {
    key: IMusicKey;
    scale: IMusicScale;
    octaves: number[];
    measureBeat: number;
    intervalToPlay: IntervalToPlay;
    parameters: any;
    lastParams: any;
  }): Tone.FrequencyClass<number> {
    let octaveToPlay = this.getOctave(octaves);

    let stepInterval = parameters.get("stepinterval").val;
    let _arrayStep = this.getArrayStep(
      measureBeat,
      stepInterval,
      parameters.get("steppitchshift").val.length
    );

    let stepPitchShift = parseInt(
      parameters.get("steppitchshift").val[_arrayStep]
    ) as number;

    console.log(parameters.get("steppitchshiftdirection").val);

    let stepPitchShiftDirection = parameters.get("steppitchshiftdirection").val[
      _arrayStep
    ] as string;

    let startNote = `${key}${octaveToPlay}`;
    let startNoteMidi = Note.midi(startNote) as number;
    let lastNote = startNote;
    if (_arrayStep !== 0 && lastParams && lastParams.note) {
      lastNote = lastParams.note._val;
    }
    if (lastNote == undefined) {
      lastNote = startNote;
    }

    let interval = intervalToPlay.getCurrentIntervalFromScale(
      scale,
      key,
      startNote,
      lastNote
    );

    info(
      "NOTE_TO_PLAY",
      `interval ${measureBeat} ${stepInterval} ${_arrayStep} ${lastParams} ${lastNote} ${interval} ${stepPitchShift} ${stepPitchShiftDirection} ${startNote} ${startNoteMidi}`
    );

    let retVal = intervalToPlay.getScaleInterval(
      scale,
      key,
      this.calcInterval(interval, stepPitchShiftDirection, stepPitchShift),
      octaveToPlay
    );
    info("NOTE_TO_PLAY", `retVal: ${retVal}`, retVal);
    return retVal;
  }

  get(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    measureBeat: number,
    intervalToPlay: IntervalToPlay,
    parameters: any,
    lastParams: any
  ): Tone.FrequencyClass {
    if (intervalToPlay.intervalType === "arpeggiator") {
      this.noteChooser = "interval";
    }

    debug(
      "NOTE_TO_PLAY",
      `Note set as ${JSON.stringify(this.note)}, noteChooser: ${
        this.noteChooser
      }, intervalToPlay: ${intervalToPlay}`
    );

    switch (this.noteChooser) {
      case "random":
        return this.getRandomNote(key, scale, chord, octaves, measureBeat);
      case "single":
        return this.getSingleNote();
      case "interval":
        let intervalNote = this.getIntervalNote(
          key,
          scale,
          chord,
          octaves,
          measureBeat,
          intervalToPlay,
          parameters
        );
        console.log(`NOTE_TO_PLAY GET_INTERVAL_NOTE ${intervalNote}`);
        return intervalNote;
      case "interval_parameter":
        return this.getIntervalParameterNote({
          key,
          scale,
          octaves,
          measureBeat,
          intervalToPlay,
          parameters,
          lastParams,
        });
    }
  }

  isLetterNumberNote(line: string): boolean {
    return /[A-G]\d/.test(line);
  }

  isHzNote(line: string): boolean {
    return /\d+Hz/.test(line);
  }

  isIntNote(line: string): boolean {
    return /\d\d/.test(line);
  }

  intNoteToMidi(_line: string): number {
    return 64;
  }

  hzNoteToMidi(_line: string): number {
    return 64;
  }

  letterNumberNoteToMidi(_line: string): number {
    return 64;
  }

  isRandomNote(noteChooserString: string) {
    return noteChooserString === "Rand()";
  }

  isIntervalParameterNote(noteChooserString: string) {
    return noteChooserString === "IntervalParameter()";
  }

  randomNoteToMidi() {}

  parseNote(note: string): Tone.FrequencyClass | undefined {
    if (this.isRandomNote(note)) {
      this.noteChooser = "random";
    }

    if (this.isIntervalParameterNote(note)) {
      this.noteChooser = "interval_parameter";
    }

    if (this.isLetterNumberNote(note)) {
      this.noteChooser = "single";
      return Tone.Frequency(this.letterNumberNoteToMidi(note));
    }

    if (this.isHzNote(note)) {
      this.noteChooser = "single";
      return Tone.Frequency(this.hzNoteToMidi(note));
    }

    if (this.isIntNote(note)) {
      return Tone.Frequency(this.intNoteToMidi(note));
    }

    return undefined;
  }

  parse(noteToPlayDefinition: INoteToPlayDefinition) {
    if (!noteToPlayDefinition) {
      warn("NOTE_TO_PLAY", "NoteToPlay is not set.");
      return undefined;
    }

    this.note = this.parseNote(noteToPlayDefinition.note);
    return;
  }
}
