import Synthesizer from "../Synthesizer";

import * as Tone from "tone";
import IPlayParams from "../../../Types/IPlayParams";

import { debug } from "../../../Util/logger";

import { action, makeObservable } from 'mobx';

import { ISequencerGate } from "../../Sequencer/SequencerRunner/SequencerGate";
import ISynthEditableParams, { OSCILLATOR_TYPE_SYNTH_PARAM } from '../ISynthEditableParams';
import FilterFeature from "./Features/Filter";

import IOscillatorType from "../IOscillatorType";

export default class Waveform extends Synthesizer {
  name: string = "Waveform";
  slug: string = "waveform";
  synth: Tone.PolySynth;
  toneContext: any;
  reverb: any;

  pitch: number = 0;

  filter: FilterFeature = new FilterFeature();
  oscillatorType?: IOscillatorType = "sine";
  oscillatorTypeA?: IOscillatorType = undefined;
  oscillatorTypeB?: IOscillatorType = undefined;
  oscillatorTypeC?: IOscillatorType = undefined;

  // Filter should be a Mixin.

  get _editParameters(): ISynthEditableParams[] {
    return [
      OSCILLATOR_TYPE_SYNTH_PARAM(this.oscillatorType!)
    ];
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      try {
        this.synth.connect(this.filter.filter).connect(vol);
      } catch (err: any) {
        debug("SYNTHESIZER_WAVEFORM", err);
      }
    }
  }

  constructor(_vol: Tone.Volume, audioContext: Tone.BaseContext) {
    super();
    Tone.setContext(audioContext);
    this.synth = new Tone.PolySynth(Tone.FMSynth);

    this.toneContext = this.synth.context;

    makeObservable(this, {
      changeParameter: action.bound
    })
  }

  play(gate: ISequencerGate, params: IPlayParams) {
    if (gate.length === 0) {
      return console.log("Gate Length must be greater than 0");
    }
    debug("SYNTHESIZER_WAVEFORM", "Waveform Playing");

    this.synth.set({
      // harmonicity: 0.5,
      // modulationIndex: 1,
      envelope: {
        attack: 0,
        decay: 10,
        sustain: 1, // between 0 and 1
        release: 1
      },
      oscillator: {
        type: this.oscillatorType,
      },
      volume: 0,
    });

    console.log(`WaveForm triggerAttackRelase ${gate.length}`);

    if (!params.note) {
      throw new Error("No Note to play for synthesizer waveform");
    }

    this.synth.triggerAttackRelease(
      params.note!.toFrequency(),
      Tone.Time(gate.length).toNotation()
    );
  }
}
