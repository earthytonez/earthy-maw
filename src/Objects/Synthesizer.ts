import Placeable from "./Placeable.ts";

export default class Synthesizer extends Placeable {
    audioContext: any = undefined;
    osc: any;
    osc2: any;
    gainOsc: any;
    gainOsc2: any;

    isSynth() {
        return true;
    }

    bindSynth(synth: Synthesizer) {
        console.log("Can't bind a Synthesizer to a Synthesizer");
    }

    constructor(audioContext: any) {
        super();
        this.audioContext = audioContext;
    }
}