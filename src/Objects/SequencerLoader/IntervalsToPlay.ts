export default class IntervalToPlay {
    intervalArray: Array<number>
    intervalLength: number = 1;
    intervalType: string | undefined = undefined;
    intervalArp: string = "up";

    /* This code needs to be fixed */
    getChordLength(chord): number {
        if (chord == "major") {
            return 3;
        }

        if (chord == "maj7") {
            return 4;
        }
        return 3;
    }

    get(beatNumber: number, chord: any) {
        console.log(`this.intervalType:${beatNumber} |${this.intervalType}|${chord}`);
        if (this.intervalType === "arpeggiator") {
            /* This shouldn't necessarily be based on the section Length */
            let length = this.getChordLength(chord)
            if (this.intervalArp == "up") {
                let step = beatNumber % length;
                console.log(`Getting interval for intervalType Arpeggiator ${chord} -- ${step} - ${beatNumber} - ${length}`)
                return [1,3,5,7][step]; // This needs to be better
            }
        }
        console.log(this.intervalArray);
        console.log(`Beat Number ${beatNumber}, interval Array: ${this.intervalArray}, interval Length: ${this.intervalLength}`);
        console.log(`Beat Number interval Array position: ${Math.floor(beatNumber / this.intervalLength)}`);
        
        
        if (this.intervalArray) {
            return this.intervalArray[Math.floor(beatNumber / this.intervalLength)];
        }
    }

    getNumberVariable(name: string, line: string) {
        return parseInt(line.split("=")[1]);
    }

    getStringVariable(name: string, line: string) {
        return line.split("=")[1].trim().replace("\"", "").replace("\"", "");
    }

    parse(line: string) {
        let trimmedLine = line.trim();
        let replacedLine = trimmedLine.replace(/[\[\]]/g, '');

        console.log(`intervalType: ${trimmedLine}`);

        if (trimmedLine.startsWith('interval_length = ')) {
            return this.intervalLength = this.getNumberVariable('interval_length', line);
        }

        if (trimmedLine.startsWith('interval_type = ')) {
            return this.intervalType = this.getStringVariable('interval_type', line);
        }

        this.intervalArray = replacedLine.split(",").map((interval: string): number => { return parseFloat(interval)});
    }
}
