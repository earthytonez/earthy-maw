import Placeable from "./Placeable.ts";

export default class Synthesizer extends Placeable {
    machineType: string = "Synthesizer";

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