import * as Tone from 'tone';   

import { ISequencerGate } from '../../Objects/Sequencer/SequencerRunner/SequencerGate';
import IPlayParams from '../../Types/IPlayParams';
import ISynthEditableParams from './ISynthEditableParams';
export default abstract class Synthesizer {
    machineType: string = "Synthesizer";
    loading: boolean = true;
    abstract name: string;
    abstract slug: string;

    abstract play(sequencerGate: ISequencerGate, params: IPlayParams): void;
    abstract attachVolume(vol: Tone.Volume): void;

    abstract incrementParameter(parameter: string): void
    abstract decrementParameter(parameter: string): void
    abstract changeParameter(parameter: string, value: any): void
    abstract get editParameters(): ISynthEditableParams[]
    

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