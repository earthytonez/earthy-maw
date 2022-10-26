import BaseSynthesizer from "./Base";
import ISynthDefinition from "../SynthLoader/ISynthDefinition";

import * as Tone from "tone";

export default class MembraneSynth extends BaseSynthesizer {
  _toneJSSynthConstructor() {
    return new Tone.MembraneSynth();
  }

  constructor(synthDefinition: ISynthDefinition) {
    super(synthDefinition);
    this.synth = this._toneJSSynthConstructor();
    console.log(this.synth.get());
    console.log(Tone.MembraneSynth.getDefaults());
  }
}
