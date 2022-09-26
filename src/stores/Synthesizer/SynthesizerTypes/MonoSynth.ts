import BaseSynthesizer from "./Base";
import ISynthDefinition from "../SynthLoader/ISynthDefinition";

import * as Tone from "tone";

export default class MonoSynth extends BaseSynthesizer {
    _toneJSSynthConstructor() {
        return new Tone.MonoSynth();
    }

    constructor(synthDefinition: ISynthDefinition) {
        super(synthDefinition);        
        this.synth = this._toneJSSynthConstructor();
    }
}