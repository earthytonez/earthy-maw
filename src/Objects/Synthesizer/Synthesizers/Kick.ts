import * as Tone from "tone";
import { observable, makeObservable, action } from "mobx";
import { Note } from "@tonaljs/tonal";

import Synthesizer from "../Synthesizer";

import { ISequencerGate } from '../../../Objects/Sequencer/SequencerRunner/SequencerGate';
import IPlayParams from "../../../Types/IPlayParams";
import { debug } from '../../../Util/logger';


import ISynthesizerEditableParams from '../ISynthEditableParams';

export default class Kick extends Synthesizer {
  name: string = "Kick";
  slug: string = "kick";
  synth: any;
  pitch: number = Note.midi("C2")!;

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
    return [{
      name: "Pitch",
      field: "pitch",
      fieldType: "slider",
      fieldOptions: {
        min: 0,
        max: 48,
        current: this.pitch
      }
    }];
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      this.synth.connect(vol);
    }
  }

  play(_gate: ISequencerGate, params: IPlayParams) {
    this.synth.triggerAttackRelease(Note.fromMidi(this.pitch), "16n", params.time);
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

    makeObservable(this, {
      pitch: observable,
      changeParameter: action.bound
    })
    
  }
}
