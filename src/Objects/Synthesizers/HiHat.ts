import Synthesizer from "../Synthesizer.ts";

import IPlayParams from "../../Types/IPlayParams";

import * as Tone from "tone";

export default class HiHat extends Synthesizer {
  name: string = "Hi Hat";
  slug: string = "hihat";
  hiHat: any;

  play(params: IPlayParams) {
    this.hiHat.triggerAttackRelease("16n", params.time);
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.hiHat.connect(vol);
    }
  }

  constructor(vol: Tone.Volume) {
    super();
    this.hiHat = new Tone.MetalSynth();
    this.attachVolume(vol);
  }
}
