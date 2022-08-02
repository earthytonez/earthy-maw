import Synthesizer from "../Synthesizer";

import IPlayParams from "../../../Types/IPlayParams";
import SequencerGate from '../../../Objects/Sequencer/SequencerRunner/SequencerGate';

import * as Tone from "tone";

export default class HiHat extends Synthesizer {
  name: string = "Hi Hat";
  slug: string = "hihat";
  // filter: Tone.Filter;
  player: any;
  // editParameters(): ISynthParams {

  // }

  play(_gate: SequencerGate, params: IPlayParams) {
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

    this.attachVolume(vol);
  }
}


// Remember that before, this.hiHat was a new Tone.MetalSynth();
