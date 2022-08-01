/*
 * Passed from a sequencer to a synthesizer to determine if a note is played and the length of the note.
 */
interface ISequencerGate {
    readonly triggered: boolean
    readonly length?: number
}

export default class SequencerGate implements ISequencerGate {
    _length?: number;
    triggered: boolean;

    get length(): number | undefined {
        return this._length
    }

    set length(length: number | undefined) {
        if (!length || length <= 0) {
            throw new Error("length must be greater than 0")
        }
        this._length = length;
    }

    constructor(triggered: boolean | undefined, length?: number) {
        this.triggered = !!triggered;
        if (length) this.length = length;
    }
}

export { ISequencerGate }