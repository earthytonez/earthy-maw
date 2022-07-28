/*
 * Passed from a sequencer to a synthesizer to determine if a note is played and the length of the note.
 */
interface ISequencerGate {
    triggered: boolean
    length?: number
}