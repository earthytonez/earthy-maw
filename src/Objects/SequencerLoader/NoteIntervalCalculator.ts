
import { debug } from "../../Util/logger";
import { A_ZERO_STARTING_NUMBER, MAJOR_SCALE_INTERVALS, MINOR_SCALE_INTERVALS } from "../../config/constants";
import { IMusicKey, IMusicScale } from "../../Types/index.ts"
// C4 = 60;

const SINGLE_OCTAVE_NOTES = ["A", "A#", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#"];

export default class NoteIntervalCalculator {
    key: IMusicKey
    scale: IMusicScale

    getNoteName(noteNumber: number): string {
        let octave: string = (Math.floor((noteNumber / 12)) - 1).toString();
        let name: string = SINGLE_OCTAVE_NOTES[(noteNumber - 9) % 12];
        return `${name}${octave}`;
    }

    octaveNumberFromNoteOctave(noteOctaveName: string): number {
        let octaveNumberRegEX = /([0-9]+)$/;
        let matchedExpression = noteOctaveName.match(octaveNumberRegEX);
        if (!matchedExpression) {
            throw("Invalid Note Octave Name");
        }
        let octaveNumber = parseInt(matchedExpression[0]);
        return octaveNumber;
    }

    noteNumberFromNoteOctave(noteOctaveName: string): number {
        let noteName = noteOctaveName.slice(0, -1);
        let noteNumber = SINGLE_OCTAVE_NOTES.indexOf(noteName) - 3;
        if (noteNumber < 0) {
            return 12 + noteNumber
        }
        return noteNumber;
        
    }

    getNoteNumber(noteOctaveName: string): number {
        let octaveNumber = this.octaveNumberFromNoteOctave(noteOctaveName);
        let noteNumber = this.noteNumberFromNoteOctave(noteOctaveName);
        return ((octaveNumber + 1) * 12) + noteNumber
    }

    // Next what if we're not starting at the root note.
    addIntervalToNote(noteNumber: number, interval: number) {
        let retVal: number = noteNumber
        let x = 0;
        let y = 0;
        for (let i = noteNumber % 12; i <= (noteNumber % 12) + interval - 2; i++) {
            x++;
            switch(this.scale) {
                case "major":
                    retVal += MAJOR_SCALE_INTERVALS[i];
                    y = y + MAJOR_SCALE_INTERVALS[i];
                    break;
                case "minor":
                    retVal += MINOR_SCALE_INTERVALS[i];
                    y = y + MINOR_SCALE_INTERVALS[i];
                    break;
            }
        }
        console.log(`Looped ${x} times and added ${y}`)
        return retVal;
    }

    getNote(startNote: string, interval: number) {
        if (interval == 1) {
            return startNote;
        }
        let noteNumber = this.getNoteNumber(startNote);
        let addedInterval = this.addIntervalToNote(noteNumber, interval);
        return this.getNoteName(addedInterval);
    }

    constructor(key: IMusicKey, scale: IMusicScale) {
        this.key = key;
        this.scale = scale;
    }

}