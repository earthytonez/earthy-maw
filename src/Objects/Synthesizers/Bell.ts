import Synthesizer from "../Synthesizer.ts";

import * as Tone from 'tone'

import IPlayParams from '../../Types/IPlayParams';

export default class Bell extends Synthesizer {
    name: string = "Bell"
    slug: string = "bell";

    play(params: IPlayParams) {
        const plucky = new Tone.PluckSynth().toDestination();
        console.log(`Bell is playing note ${params.note}`);
        plucky.triggerAttack(params.note, "+0.5");
    }
}