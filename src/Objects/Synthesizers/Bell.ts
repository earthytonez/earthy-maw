import Synthesizer from "../Synthesizer.ts";

import * as Tone from 'tone'

import IPlayParams from '../../Types/IPlayParams';

export default class Bell extends Synthesizer {
    id: number;
    name: string = "Bell"
    slug: string = "bell";
    audioContext: any;

    play(params: IPlayParams) {
        const plucky = new Tone.PluckSynth().toDestination();
        console.log(`Bell is playing note ${params.note}`);
        plucky.triggerAttack(params.note, "+0.5");

    }

    constructor(audioContext: any, id: number) {
        super();
        this.audioContext = audioContext;
    }
}