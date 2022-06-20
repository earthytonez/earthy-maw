import Synthesizer from "../Synthesizer.ts";

import IPlayParams from '../../Types/IPlayParams';

export default class Bell extends Synthesizer {
    id: number;
    name: string = "Bell"
    slug: string = "bell";
    audioContext: any;

    playOscillator(shape: "sine" | "triangle" | "square", frequency: number) {
        const now = this.audioContext.currentTime;

        let osc = this.audioContext.createOscillator();
        let gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.type = shape;
    
        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);                
    }

    play(params: IPlayParams) {
        console.log(`Playing synthesizer ${this.name}`);
        this.playOscillator('triangle', 120);
        this.playOscillator('sine', 50);              
    }

    constructor(audioContext: any, id: number) {
        super();
        this.audioContext = audioContext;
    }
}