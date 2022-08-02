import Synthesizer from "../Synthesizer";

import * as Tone from "tone";
import IPlayParams from "../../../Types/IPlayParams";

import { debug } from "../../../Util/logger";

import { action, makeObservable } from 'mobx';

import { ISequencerGate } from "../../Sequencer/SequencerRunner/SequencerGate";

type OscillatorType = "sine" | "square" | "triangle" | "sawtooth";
const OSCILLATOR_TYPES: OscillatorType[] = [
  "sine",
  "square",
  "triangle",
  "sawtooth",
];

export default class Waveform extends Synthesizer {
  name: string = "Waveform";
  slug: string = "waveform";
  synth: Tone.PolySynth;
  toneContext: any;
  reverb: any;
  oscillatorType: OscillatorType = "sine";


  // Filter should be a Mixin.
  filterCutoff: number = 10000;
  filterResonance: number = 0;

  changeParameter(parameter: string, value: any) {
    this[parameter as keyof this] = value;
  }

  get editParameters() {
    return [
      {
        name: "Oscillator Type",
        field: "oscillatorType",
        fieldType: "radio",
        fieldOptions: {
          options: OSCILLATOR_TYPES,
          current: this.oscillatorType
        },
      },
      {
        name: "Filter Cutoff",
        field: "filterCutoff",
        fieldType: "dial",
        fieldOptions: {
          max: 100,
          min: 0,
          current: this.filterCutoff
        },
      },
      {
        name: "Filter Resonance",
        field: "filterResonance",
        fieldType: "dial",
        fieldOptions: {
          max: 100,
          min: 0,
          current: this.filterResonance
        },
      },
    ];
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      try {
        this.synth.connect(vol);
      } catch (err: any) {
        debug("SYNTHESIZER_WAVEFORM", err);
      }
    }
  }

  constructor(_vol: typeof Tone.Volume, audioContext: Tone.BaseContext) {
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
    this.synth.triggerAttackRelease(params.note as typeof Tone.Frequency, Tone.Time(gate.length).toNotation());
    // this.synth.triggerAttackRelease(params.note as Frequency, 1000);
  }
}
