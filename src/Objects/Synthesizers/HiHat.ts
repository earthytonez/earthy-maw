import Synthesizer from "../Synthesizer.ts";

import IPlayParams from "../../Types/IPlayParams";

import * as Tone from "tone";

export default class HiHat extends Synthesizer {
  name: string = "Hi Hat";
  slug: string = "hihat";
  hiHat: Tone.MetalSynth;
  filter: Tone.Filter;
  player: any;
  editParameters(): ISynthParams {

  }

  play(params: IPlayParams) {
    this.player.start(params.time);

    // this.hiHat.harmonicity = 3;
    // this.hiHat.set({
    //   frequency: 250,
    //   envelope: {
    //     attack: 0,
    //     decay: 1.1,
    //     sustain: 0,
    //     release: 0.2
    //   },
    //   harmonicity: 5.1,
    //   modulationIndex: 32,
    //   resonance: 4000,
    //   octaves: 1.5,
  
    // })
    // this.hiHat.triggerAttackRelease("8n", params.time);
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.player.connect(vol);
    }
  }

  constructor(vol: Tone.Volume) {
    super();
    this.player = new Tone.Player("/samples/909/chh/HHCD0.WAV")
    // this.hiHat = new Tone.MetalSynth();
    // this.filter = new Tone.Filter(10000, "highpass");
    // this.hiHat.connect(this.filter);

    this.attachVolume(vol);
  }
}
