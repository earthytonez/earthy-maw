import Synthesizer from "../Synthesizer";

import * as Tone from "tone";

import { ISequencerGate } from '../../../Objects/Sequencer/SequencerRunner/SequencerGate';
import IPlayParams from "Types/IPlayParams";
import { debug } from '../../../Util/logger';

import ISynthesizerEditableParams from '../ISynthEditableParams';

export default class Bell extends Synthesizer {
  name: string = "Bell";
  slug: string = "bell";
  synth: any;

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
      this.synth.connect(vol);
    }
  }

  play(_gate: ISequencerGate, params: IPlayParams) {
    console.log(`Bell is playing note ${params.note}`);
    this.synth.triggerAttackRelease(params.note, "4n");
    debug("Bell Context: ", this.synth);
  }

  constructor(vol: Tone.Volume) {
    super();

    try {
      this.synth = new Tone.FMSynth(
        {
          modulation: {
            type: "sine1",
          },
          modulationIndex: 1.3,
          modulationEnvelope: {
            attack: 0.002,
            decay: 0.998,
            sustain: 0,
            release: 0
          },
          oscillator : {
            type : 'sine',
          },
          envelope: {
            attack: 0.002,
            decay: 0.998,
            sustain: 0,
            release: 0
          }
        }
      );

      
    } catch(err) {
      console.error(this.synth);
      console.error(err);
    }
    if (vol) {
      this.synth.connect(vol);
    } else {
      this.synth.toDestination();
    }
  }
}
