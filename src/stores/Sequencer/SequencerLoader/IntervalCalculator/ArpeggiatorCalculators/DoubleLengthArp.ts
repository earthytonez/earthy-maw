import BaseArp from "./BaseArpCalc";

export default class DoubleLengthArp extends BaseArp {
  measureBeat: number;
  stepInterval: number = 4;
  chordLength: number;

  get length() {
    return this.chordLength * 2;
  }

  get step() {
    return (this.measureBeat / this.stepInterval) % this.length;
  }

  setStepInterval(parameters: any) {
    if (parameters.has("stepinterval")) {
      this.stepInterval = parameters.get("stepinterval").val;
    }
  }

  constructor(length: number, measureBeat: number, parameters: Map<any, any>) {
    super();

    this.chordLength = length;
    this.measureBeat = measureBeat;

    this.setStepInterval(parameters);
  }
}
