import { debug } from "../../../Util/logger";

/*
 * IntervalToPlay parses an array or a type of an interval to determine what notes to play
 * in a sequence.  You can think of this as a melody, though often it is for something 
 * simpler than a lead melody.
 */
export default class IntervalToPlay {
    intervalArray: Array<number> = [];
    intervalLength: number = 1;
    intervalType: string | undefined = undefined;
    intervalArp: string = "up";
    intervalList: number[] = [];

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
        debug("INTERVAL_TO_PLAY", `this.intervalType:${measureBeat} |${this.intervalType}|${JSON.stringify(chord)}`);
        if (this.intervalType === "arpeggiator") {
            /* This shouldn't necessarily be based on the section Length */
            let length = this.getChordLength(chord)
            if (this.intervalArp === "up") {
                let step = measureBeat / 4 % length;
                debug("INTERVAL_TO_PLAY", `Getting interval for intervalType Arpeggiator ${chord} -- ${step} - ${measureBeat} - ${length}`)
                return [1,3,5,7][step]; // This needs to be better
            }
        }

        if (this.intervalType === "list") {
            debug("INTERVAL_TO_PLAY", `intervalType === 'LIST' - intervalList: ${this.intervalList} interavalLength = ${this.intervalLength}`);

            if (this.intervalList) {
                return this.intervalList[Math.floor(measureBeat / this.intervalLength)];
            }    
        }
        debug("INTERVAL_TO_PLAY", `Beat Number ${measureBeat}, interval Array: ${this.intervalArray}, interval Length: ${this.intervalLength}`);
        debug("INTERVAL_TO_PLAY", `Beat Number interval Array position: ${Math.floor(measureBeat / this.intervalLength)}`);
        
        
        return 0;
    }

    parse(line: any) {
        if (!line) {
            return;
        }
        
        this.intervalLength = line.interval_length;

        this.intervalType = line.interval_type;
        
        if (this.intervalType === "arpeggiator") {
            this.intervalArp = line.type_list[0];
        }
        
        if (this.intervalType === "list") {
            this.intervalList = line.list;
        }
    }
}
