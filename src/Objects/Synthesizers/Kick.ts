import Synthesizer from "../Synthesizer.ts";

import IPlayParams from "../../Types/IPlayParams";
import ISynthParams from "../../Types/ISynthParams";
import { Volume } from "tone";

import { debug } from '../../Util/logger.ts';

import * as Tone from "tone";

export default class Kick extends Synthesizer {
  name: string = "Kick";
  slug: string = "kick";
  synth: any;

  editParameters(): ISynthParams {

  }

  attachVolume(vol: Volume) {
    if (vol) {
      this.synth.context = vol.context;
      this.synth.connect(vol);
    }
  }

  play(params: IPlayParams) {
    this.synth.triggerAttackRelease("C2", "8n", params.time);
    debug("Kick Context: ", this.synth);
  }

  constructor(vol: Volume) {
    super();
    this.synth = new Tone.MembraneSynth();
    if (vol) {
      this.synth.connect(vol);
    } else {
      this.synth.toDestination();
    }
  }
}
