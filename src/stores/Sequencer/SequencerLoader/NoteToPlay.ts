import * as Tone from "tone";

import { debug, warn } from "../../../Util/logger";

import { Scale } from "@tonaljs/tonal";
import { IMusicChord, IMusicKey, IMusicScale } from "Types";
import IntervalToPlay from "./IntervalToPlay";

export interface INoteToPlayDefinition {
  note: string;
}

export default class NoteToPlay {
  noteNotInterval: boolean = false;
  note?: Tone.FrequencyClass<number> | undefined;

  noteChooser: "random" | "interval" | "single" = "single";

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

  get(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    measureBeat: number,
    intervalToPlay: IntervalToPlay,
    parameters: any
  ): Tone.FrequencyClass {
    debug("NOTE_TO_PLAY", `Note set as ${JSON.stringify(this.note)}`);
    debug("NOTE_TO_PLAY", "intervalToPlay", intervalToPlay);

    if (intervalToPlay.intervalType === "arpeggiator") {
      this.noteChooser = "interval";
    }
    switch (this.noteChooser) {
      case "random":
        return this.getRandomNote(key, scale, chord, octaves, measureBeat);
      case "single":
        return this.getSingleNote();
      case "interval":
        return this.getIntervalNote(
          key,
          scale,
          chord,
          octaves,
          measureBeat,
          intervalToPlay,
          parameters
        );
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

  randomNoteToMidi() {}

  parseNote(note: string): Tone.FrequencyClass | undefined {
    if (this.isRandomNote(note)) {
      this.noteChooser = "random";
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
