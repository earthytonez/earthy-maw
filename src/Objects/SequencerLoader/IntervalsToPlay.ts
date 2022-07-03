export default class IntervalToPlay {
    intervalArray: Array<number>
    intervalLength: number = 1;

    get(beatNumber: number) {
        console.log(`Beat Number ${beatNumber}, interval Array: ${this.intervalArray}, interval Length: ${this.intervalLength}`);
        console.log(`Beat Number interval Array position: ${Math.floor(beatNumber / this.intervalLength)}`);
        
        if (this.intervalArray) {
            return this.intervalArray[Math.floor(beatNumber / this.intervalLength)];
        }
    }

    getNumberVariable(name: string, line: string) {
        return parseInt(line.split("=")[1]);
    }

    parse(line: string) {
        let trimmedLine = line.trim();
        let replacedLine = trimmedLine.replace(/[\[\]]/g, '');

        if (trimmedLine.startsWith('interval_length = ')) {
            return this.intervalLength = this.getNumberVariable('interval_length', line);
        }

        this.intervalArray = replacedLine.split(",").map((interval: string): number => { return parseInt(interval)});
    }
}
