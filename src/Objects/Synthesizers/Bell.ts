import Synthesizer from "../Synthesizer.ts";

import * as Tone from "tone";

import IPlayParams from "../../Types/IPlayParams";
import { debug } from '../../Util/logger.ts';

export default class Bell extends Synthesizer {
  name: string = "Bell";
  slug: string = "bell";
  synth: any;

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.synth.connect(vol);
    }
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

  play(params: IPlayParams) {
    console.log(`Bell is playing note ${params.note}`);
    this.synth.triggerAttackRelease(params.note, "4n");
    debug("Bell Context: ", this.synth);

  }
}
