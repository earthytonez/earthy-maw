import { ThirtyFpsSelect } from "@mui/icons-material";
import Arranger from "./Arranger.ts";
import Sequencer from "./Sequencer.ts";
import Synthesizer from "./Synthesizer.ts";
import { getSynthesizer } from "./SynthesizerFactory.ts";

export default class Track {
    arranger: Arranger
    sequencer: Sequencer
    synthesizer: Synthesizer
    id: number;
    slug: string;

    async tick(key, scale, beatNumber) {
        console.log("Ticking!");
        if (!this.sequencer) return;
        await this.sequencer.play(key, scale, beatNumber);
    }

    assignMachine(machineType: string, machine: any) {
        this[machineType] = machine;
        if (this.sequencer && this.synthesizer) {
            this.sequencer.bindSynth(this.synthesizer);
        }
        if (machineType === "sequencer") {
            this.sequencer.load();
        }
    }

    constructor(id: number, audioContext: any, trackData?: any) {
        this.id = id;
        this.slug = `track-${id}`;
        if (trackData) {
            if (trackData.arranger) {
                this.arranger = new Arranger(audioContext, trackData.arranger);
            }
            if (trackData.sequencer) {
                this.sequencer = new Sequencer(trackData.sequencer.type);
                this.sequencer.load();
            }
            if (trackData.synthesizer) {
                this.synthesizer = getSynthesizer(audioContext, trackData.synthesizer.slug);
            }
            if ((this.synthesizer) && (this.sequencer)) {
                this.sequencer.bindSynth(this.synthesizer);
            }
        }
    }
}