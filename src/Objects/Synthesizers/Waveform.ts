import Synthesizer from "../Synthesizer.ts";

import * as Tone from "tone";
import IPlayParams from "../../Types/IPlayParams";
import { Frequency } from "tone/build/esm/core/type/Units";

import { debug } from "../../Util/logger.ts";

import { action, makeObservable } from 'mobx';

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
  filterCutoff: 0;
  filterResonance: 0;

  changeParameter(parameter: string, value: any) {
    this[parameter] = value;
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
      } catch (err) {
        debug("SYNTHESIZER_WAVEFORM", err);
      }
    }
  }

  constructor(vol, audioContext) {
    super();
    Tone.setContext(audioContext);
    this.synth = new Tone.PolySynth(Tone.FMSynth);

    this.toneContext = this.synth.context;

    makeObservable(this, {
      changeParameter: action.bound
    })
  }

  play(params: IPlayParams) {
    debug("Waveform Playing");

    this.synth.set({
      harmonicity: 0.5,
      modulationIndex: 1,
      envelope: {
        attack: 0,
        decay: .3,
        sustain: 0,
        release: 0
      },
      oscillator: {
        type: this.oscillatorType,
      },
      volume: 0,
    });

    this.synth.triggerAttackRelease(params.note as Frequency);
  }
}
