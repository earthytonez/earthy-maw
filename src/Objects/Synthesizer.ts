import Placeable from "./Placeable.ts";

export default abstract class Synthesizer extends Placeable {
    machineType: string = "Synthesizer";
    loading: boolean = true;

    abstract play(SequencerGate, IPlayParams);
    
    setLoading(loading: boolean) {
        this.loading = loading;
      }
    
    isSynth() {
        return true;
    }

    bindSynth(synth: Synthesizer) {
        console.log("Can't bind a Synthesizer to a Synthesizer");
    }
}