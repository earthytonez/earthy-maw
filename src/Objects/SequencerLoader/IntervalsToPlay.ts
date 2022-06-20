export default class IntervalToPlay {
    intervalArray: Array<number>

    get(beatNumber: number) {
        if (this.intervalArray) {
            return this.intervalArray[beatNumber];
        }
    }
    parse(line: string) {
        let trimmedLine = line.trim();
        let replacedLine = trimmedLine.replace(/[\[\]]/g, '');
        this.intervalArray = replacedLine.split(",").map((interval: string): number => { return parseInt(interval)});
    }
}
