import BaseSynthesizer from "./Base";
import ISynthDefinition from "../SynthLoader/ISynthDefinition";

import * as Tone from "tone";

export default class PolySynth extends BaseSynthesizer {
  _toneJSSynthConstructor() {
    if (this.type === "PolySynth<FMSynth>") {
      return new Tone.PolySynth(Tone.FMSynth);
    }
    return new Tone.PolySynth();
  }

  constructor(synthDefinition: ISynthDefinition) {
    super(synthDefinition);
    this.synth = this._toneJSSynthConstructor();
  }
}
