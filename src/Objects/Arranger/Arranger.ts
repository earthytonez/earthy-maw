import * as Tone from 'tone';

export default class Arranger {
    type: string;
    machineType: string = "Arranger";
    loading: boolean = true;
    audioContext: Tone.BaseContext;
    
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    constructor(type: string, audioContext: Tone.BaseContext) {
        this.audioContext = audioContext;
        this.type = type;
    }
}