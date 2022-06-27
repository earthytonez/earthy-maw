import Placeable from "./Placeable.ts";

export default class Synthesizer extends Placeable {
    isSynth() {
        return true;
    }

    bindSynth(synth: Synthesizer) {
        console.log("Can't bind a Synthesizer to a Synthesizer");
    }
    
    constructor() {
        super();
    }
}