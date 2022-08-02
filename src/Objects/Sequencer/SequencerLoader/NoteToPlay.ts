import * as Tone from 'tone';

import NoteIntervalCalculator from "./NoteIntervalCalculator";
import { debug, warn } from '../../../Util/logger';

import { Scale } from '@tonaljs/tonal';
import { IMusicChord, IMusicKey, IMusicScale } from "Types";

export interface INoteToPlayDefinition {
    note: string
}

export default class NoteToPlay {
    noteNotInterval: boolean = false;
    note?: string;

    noteChooser: "random" | "interval" | "single" = "single"

    getRandomNote(
        key: IMusicKey,
        scale: IMusicScale,
        _chord: IMusicChord,
        octaves: number[],
        _measureBeat: number
    ) {
        let scaleName = `${key} ${scale.toLowerCase()}`;
        debug("NoteToPlay", `Getting notes from ${scaleName} scale.`);
        let notes = Scale.get(scaleName).notes;
        debug("NoteToPlay", `NOTES: `, notes);
        let octave = octaves[Math.floor(Math.random()*octaves.length)];
        let note = notes[Math.floor(Math.random()*notes.length)];

        return Tone.Frequency(`${note}${octave}`);
    }

    get(
        key: IMusicKey,
        scale: IMusicScale,
        chord: IMusicChord,
        octaves: number[],
        measureBeat: number,
        intervalToPlay: any,
        intervalsToPlay: any
      ): Tone.FrequencyClass {
        switch(this.noteChooser) {
            case "random":
                return this.getRandomNote(key, scale, chord, octaves, measureBeat);
        }
        let startNote = `${key}4`;
        let noteIntervalCalculator = new NoteIntervalCalculator(key, scale);
    
        if (this.noteNotInterval) {
          return Tone.Frequency(startNote);
        }
    
        let interval = intervalToPlay.get(measureBeat, chord);
        if (!interval) {
          return Tone.Frequency(startNote);
        }
    
        return Tone.Frequency(noteIntervalCalculator.getNote(startNote, interval));
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

    randomNoteToMidi() {

    }

    parse(noteToPlayDefinition:INoteToPlayDefinition): Tone.FrequencyClass | undefined {
        if (!noteToPlayDefinition) {
            warn("NOTE_TO_PLAY", "NoteToPlay is not set.");
            return undefined;
        }

        let note = noteToPlayDefinition.note;

        if (this.isRandomNote(note)) {
            this.noteChooser = "random";
        }
        if (this.isLetterNumberNote(note)) {
            return Tone.Frequency(this.letterNumberNoteToMidi(note));
        }

        if (this.isHzNote(note)) {
            return Tone.Frequency(this.hzNoteToMidi(note));
        }

        if (this.isIntNote(note)) {
            return Tone.Frequency(this.intNoteToMidi(note));
        }

        return undefined;
    }
}