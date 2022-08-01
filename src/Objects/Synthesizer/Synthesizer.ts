import * as Tone from 'tone';   

export default abstract class Synthesizer {
    machineType: string = "Synthesizer";
    loading: boolean = true;
    slug: string;

    abstract play(SequencerGate, IPlayParams);
    abstract attachVolume(vol: Tone.Volume);

    setLoading(loading: boolean) {
        this.loading = loading;
      }
    
    isSynth() {
        return true;
    }

    bindSynth(_synth: Synthesizer) {
        console.log("Can't bind a Synthesizer to a Synthesizer");
    }
}