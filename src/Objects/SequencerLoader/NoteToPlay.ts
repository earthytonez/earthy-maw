export default class NoteToPlay {
    get() {
        return "C4";
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

    parse(line: string) {
        if (this.isLetterNumberNote(line)) {
            return this.letterNumberNoteToMidi(line);
        }
        if (this.isHzNote(line)) {
            return this.hzNoteToMidi(line);
        }

        if (this.isIntNote(line)) {
            return this.intNoteToMidi(line);
        }
    }
}