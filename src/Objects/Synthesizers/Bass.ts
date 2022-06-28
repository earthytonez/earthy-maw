import Synthesizer from "../Synthesizer.ts";

import IPlayParams from "../../Types/IPlayParams";
import { Volume } from "tone";

import { debug } from '../../Util/logger.ts';

import * as Tone from "tone";

export default class Bass extends Synthesizer {
  name: string = "Bass";
  slug: string = "bass";
  synth: any;
  filter: any;

  attachVolume(vol: Volume) {
    if (vol) {
      this.filter.connect(vol);
    }
  }

  play(params: IPlayParams) {
    this.synth.triggerAttackRelease("C1", "8n", params.time, .6);
    debug("Bass Context: ", this.synth);
  }

  constructor(vol: Volume) {
    super();
    this.synth = new Tone.Synth().toDestination()
    this.synth.oscillator.type = "square"
    this.filter = new Tone.Filter(400, "lowpass").toDestination();

    this.synth.connect(this.filter);
    if (vol) {
      this.filter.connect(vol);
    } else {
      this.filter.toDestination();
    }
  }
}
