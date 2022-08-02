import * as Tone from "tone";

import Synthesizer from "../Synthesizer";
import IPlayParams from "../../../Types/IPlayParams";
import { debug } from '../../../Util/logger';



export default class Bass extends Synthesizer {
  name: string = "Bass";
  slug: string = "bass";
  synth: any;
  filter: any;

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.filter.connect(vol);
    }
  }

  play(params: IPlayParams) {
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
