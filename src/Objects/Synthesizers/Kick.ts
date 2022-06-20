import Synthesizer from "../Synthesizer.ts";

import * as Tone from 'tone'
import IPlayParams from '../../Types/IPlayParams';

export default class Kick extends Synthesizer {
    id: number;
    name: string = "Kick"
    slug: string = "kick";
    audioContext: any;

    playOscillator() {

    }
    // playOscillator(shape: "sine" | "triangle" | "square", frequency: number) {
    //     const now = this.audioContext.currentTime;

    //     let osc = this.audioContext.createOscillator();
    //     let gain = this.audioContext.createGain();
    //     osc.connect(gain);
    //     gain.connect(this.audioContext.destination);

    //     osc.type = shape;
    
    //     gain.gain.setValueAtTime(1, now);
    //     gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        
    //     osc.frequency.setValueAtTime(frequency, now);
    //     osc.frequency.exponentialRampToValueAtTime(0.001, now + 0.5);

    //     osc.start(now);
    //     osc.stop(now + 0.5);                
    // }

    play(params: IPlayParams) {
        console.log(`Playing synthesizer ${this.name}`);

        const synth = new Tone.MembraneSynth().toDestination();
        synth.triggerAttackRelease("C2", "8n");
        
        // this.playOscillator('triangle', 120);
        // this.playOscillator('sine', 50);
        
        // console.log("Playing Synthesizer");
        // this.osc.frequency.value = 150;
        
        
        // this.gain.gain.setValueAtTime(1, now);
        // this.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        // this.osc.start(now);
        // this.osc.stop(now + 0.5);
              
    }

    constructor(audioContext: any, id: number) {
        super();
        this.id = id;
        this.audioContext = audioContext;
    }
}