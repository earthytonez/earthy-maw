import * as Tone from "tone";

export default interface ISynthParams {
    volume: number, // +/- 100
    note?: number,
    notes?: Array<typeof Tone.Frequency>,
    lengthSeconds?: number,
    tailSeconds?: number,
    time: any
}