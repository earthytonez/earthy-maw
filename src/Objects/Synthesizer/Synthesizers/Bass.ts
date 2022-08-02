import * as Tone from "tone";

import Synthesizer from "../Synthesizer";
import { ISequencerGate } from '../../../Objects/Sequencer/SequencerRunner/SequencerGate';
import IPlayParams from "../../../Types/IPlayParams";

import { debug } from '../../../Util/logger';

import ISynthesizerEditableParams from '../ISynthEditableParams';

export default class Bass extends Synthesizer {
  name: string = "Bass";
  slug: string = "bass";
  synth: any;
  filter: any;

  changeParameter(parameter: string, value: any) {
    this[parameter as keyof this] = value;
  }

  incrementParameter(_parameter: string): void {
    /* TODO: Fix */
    console.log(_parameter);
  }
  
  decrementParameter(_parameter: string): void {
    /* TODO: Fix */
    console.log(_parameter);
  }

  get editParameters(): ISynthesizerEditableParams[] {
    return [];
    }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.filter.connect(vol);
    }
  }

  play(_gate: ISequencerGate, params: IPlayParams) {
    this.synth.triggerAttackRelease("C1", "2n", params.time, .6);
    debug("Bass Context: ", this.synth);
  }

  constructor(vol: Tone.Volume) {
    super();
    this.synth = new Tone.Synth({
      envelope: {
      attack: 0.1,
      decay: 0,
      sustain: 0,
      release: .2
    }});
    
    this.synth.oscillator.type = "square"

    this.filter = new Tone.Filter(400, "lowpass");
    this.synth.connect(this.filter);

    if (vol) {
      this.filter.connect(vol);
    } else {
      this.filter.toDestination();
    }
  }
}
