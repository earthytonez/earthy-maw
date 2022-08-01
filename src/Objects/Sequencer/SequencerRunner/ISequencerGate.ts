/*
 * Passed from a sequencer to a synthesizer to determine if a note is played and the length of the note.
 */
interface ISequencerGate {
    readonly triggered: boolean
    readonly length?: number
}

export default class SequencerGate implements ISequencerGate {
    _length: number;
    triggered: boolean;

    get length() {
        return this._length
    }

    set length(length: number) {
        if (length <= 0) {
            throw new Error("length must be greater than 0")
        }
        this._length = length;
    }

    constructor(triggered: boolean, length?: number) {
        this.triggered = triggered;
        if (length) this.length = length;
    }
}