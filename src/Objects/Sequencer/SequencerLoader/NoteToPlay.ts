import NoteIntervalCalculator from "./NoteIntervalCalculator";
import { debug, info, warn } from '../../../Util/logger';

import { Scale } from '@tonaljs/tonal';
import { IMusicChord, IMusicKey, IMusicScale } from "Types";

import { BeatMarker } from "../../../stores/MusicFeatures/BeatMarker";

export interface INoteToPlayDefinition {
    note: string
}

export default class NoteToPlay {
    noteNotInterval: boolean = false;
    note: string;

    noteChooser: "random" | "interval" | "single"

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

        return `${note}${octave}`;
    }

    get(
        key: IMusicKey,
        scale: IMusicScale,
        chord: IMusicChord,
        octaves: number[],
        measureBeat: number,
        intervalToPlay: any,
        intervalsToPlay: any
      ): IToneJSNote {
        switch(this.noteChooser) {
            case "random":
                return this.getRandomNote(key, scale, chord, octaves, measureBeat);
        }
        let startNote = `${key}4`;
        let noteIntervalCalculator = new NoteIntervalCalculator(key, scale);
    
        if (this.noteNotInterval) {
          return startNote;
        }
    
        let interval = intervalToPlay.get(measureBeat, chord);
        if (!interval) {
          return startNote;
        }
    
        return noteIntervalCalculator.getNote(startNote, interval);
    }
    
    isLetterNumberNote(line: string): boolean {
        return /[A-G][0-9]/.test(line);
    }
    
    isHzNote(line: string): boolean {
        return /[0-9]+Hz/.test(line);    
    }
    
    isIntNote(line: string): boolean {
        return /[0-9][0-9]/.test(line);
    }

    intNoteToMidi(line: string): number {
        return 64;
    }

    hzNoteToMidi(line: string): number {
        return 64;
    }

    letterNumberNoteToMidi(line: string): number {
        return 64;
    }

    isRandomNote(noteChooserString: string) {
        return noteChooserString == "Rand()";
    }

    randomNoteToMidi() {

    }

    parse(noteToPlayDefinition:INoteToPlayDefinition) {
        if (!noteToPlayDefinition) {
            warn("NOTE_TO_PLAY", "NoteToPlay is not set.");
            return;
        }

        let note = noteToPlayDefinition.note;

        if (this.isRandomNote(note)) {
            this.noteChooser = "random";
        }
        if (this.isLetterNumberNote(note)) {
            return this.letterNumberNoteToMidi(note);
        }

        if (this.isHzNote(note)) {
            return this.hzNoteToMidi(note);
        }

        if (this.isIntNote(note)) {
            return this.intNoteToMidi(note);
        }
    }
}