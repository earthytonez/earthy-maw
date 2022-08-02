import { debug } from "../../../Util/logger";

export default class IntervalToPlay {
    intervalArray: Array<number> = [];
    intervalLength: number = 1;
    intervalType: string | undefined = undefined;
    intervalArp: string = "up";

    /* This code needs to be fixed */
    getChordLength(chord: string): number {
        interface IChordLength {
            [chord: string]: number
        }
        let chordLengths: IChordLength = {
            "major": 3,
            "maj7": 4,
            "maj9": 5
        }

        if (chordLengths[chord]) {
            return chordLengths[chord]!
        }
        return 3;
    }

    get(measureBeat: number, chord: any) {
        debug("IntervalsToPlay", `this.intervalType:${measureBeat} |${this.intervalType}|${chord}`);
        if (this.intervalType === "arpeggiator") {
            /* This shouldn't necessarily be based on the section Length */
            let length = this.getChordLength(chord)
            if (this.intervalArp === "up") {
                let step = measureBeat / 4 % length;
                debug("IntervalsToPlay", `Getting interval for intervalType Arpeggiator ${chord} -- ${step} - ${measureBeat} - ${length}`)
                return [1,3,5,7][step]; // This needs to be better
            }
        }
        debug("IntervalsToPlay", "intervalArray", this.intervalArray);
        debug("IntervalsToPlay", `Beat Number ${measureBeat}, interval Array: ${this.intervalArray}, interval Length: ${this.intervalLength}`);
        debug("IntervalsToPlay", `Beat Number interval Array position: ${Math.floor(measureBeat / this.intervalLength)}`);
        
        if (this.intervalArray) {
            return this.intervalArray[Math.floor(measureBeat / this.intervalLength)];
        }
        
        return 0;
    }

    parse(line: any) {
        if (!line) {
            return;
        }
        this.intervalType = line.interval_type;
        this.intervalArray = line.interval_array;
        this.intervalArp = line.list[0];
        return;
    }
}
