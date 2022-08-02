import * as Tone from "tone";

import Synthesizer from "../Synthesizer";

import SequencerGate from '../../../Objects/Sequencer/SequencerRunner/SequencerGate';
import IPlayParams from "../../../Types/IPlayParams";
import { debug } from '../../../Util/logger';

export default class Kick extends Synthesizer {
  name: string = "Kick";
  slug: string = "kick";
  synth: any;

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.synth.connect(vol);
    }
  }

  play(_gate: ISequencerGate, params: IPlayParams) {
    this.synth.triggerAttackRelease("C2", "8n", params.time);
    debug("Kick Context: ", this.synth);
  }

  constructor(vol: Tone.Volume) {
    super();
    
    this.synth = new Tone.MembraneSynth();

    if (vol) {
      this.synth.connect(vol);
    } else {
      this.synth.toDestination();
    }
  }
}
