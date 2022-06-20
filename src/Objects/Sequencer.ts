import Placeable from "./Placeable.ts";
import Synthesizer from "./Synthesizer.ts";

import { SequencerLoader, TriggerWhen } from "./SequencerLoader";

import IPlayParams from '../Types/IPlayParams';

const FourOTFloor: string = require("./Sequencers/FourOTFloor");
const HiHat: string = require("./Sequencers/HiHat");

export default class Sequencer extends Placeable {
    id: number;
    name: string;
    slug: string;
    boundSynthesizer: Synthesizer = undefined;
    sequencerLoader: SequencerLoader = new SequencerLoader();
    type: string = '';
    code: string = '';
    x = 0;
    triggerWhen: TriggerWhen;

    isSynth() {
        return false;
    }

    bindSynth(synth: Synthesizer) {
        console.log(`Binding Synth ${synth}`);
        this.boundSynthesizer = synth;
    }

    async load() {
        switch(this.type) {
            case "FourOTFloor":
                let fourOnTheFloor = await fetch(FourOTFloor);
                let fourOnTheFloorText = await fourOnTheFloor.text();
                this.sequencerLoader = new SequencerLoader(fourOnTheFloorText);
                break;
            case "HiHat":
                let hiHat = await fetch(HiHat);
                let hiHatText = await hiHat.text();
                this.sequencerLoader = new SequencerLoader(hiHatText);
                break;
            default:
        }

        await this.sequencerLoader.load();
        this.triggerWhen = this.sequencerLoader.triggerWhen();
        this.code = this.sequencerLoader.code();
        this.name = this.sequencerLoader.name();
    }

    playEveryX(interval: number): boolean {
        if (this.x >= interval) this.x = 0;
        console.log(`Sequencer for ${this.boundSynthesizer.name} everyX ${this.x} Interval ${interval}`)
        
        if (this.x === 0) {
            this.x++;
            return true;
        }
        this.x++;
        return false;
    }

    shouldPlay(beatNumber: number): boolean {
        if (!this.triggerWhen) {
            return false;
        }
        switch(this.triggerWhen.type) {
            case "everyX":
                return this.playEveryX(this.triggerWhen.parameters);
            default:
                return true;
        }
    }

    volume(beatNumber: number): number {
        return this.sequencerLoader.volume(beatNumber);
    }

    note(key: string, scale: string, beatNumber: number): number {
        return this.sequencerLoader.note(key, scale, beatNumber);
    }

    playParams(key: string, scale: string, beatNumber: number): IPlayParams {
        return {
            volume: this.volume(beatNumber),
            note: this.note(key, scale, beatNumber)
        }
    }

    async play(key: string, scale: string, beatNumber: number) {
        if (this.shouldPlay(beatNumber)) {
            this.boundSynthesizer.play(this.playParams(key, scale, beatNumber));
        }
    }

    constructor(type: string, id: number, songBeatNumber: number) {
        console.log(`Creating new Sequencer with type ${type}`);
        super();
        this.id = id;
        // this.slug = `sequencer-${id}`;
        this.slug = type;
        this.type = type;
    }
}