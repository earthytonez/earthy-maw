import BaseSynthesizer from "./Base";
import ISynthDefinition from "../SynthLoader/ISynthDefinition";

import * as Tone from "tone";

export default class NoiseSynth extends BaseSynthesizer {
    _toneJSSynthConstructor() {
        return new Tone.NoiseSynth();
    }

    constructor(synthDefinition: ISynthDefinition) {
        super(synthDefinition);        
        this.synth = this._toneJSSynthConstructor();
    }
}