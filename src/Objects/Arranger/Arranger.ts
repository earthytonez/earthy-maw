export default class Arranger {
    type: string;
    machineType: string = "Arranger";
    loading: boolean = true;
    audioContext: AudioContext;
    
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    constructor(type: string, audioContext: AudioContext) {
        this.audioContext = audioContext;
        this.type = type;
    }
}