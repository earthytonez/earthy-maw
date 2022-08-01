import Synthesizer from "../Synthesizer";

import * as Tone from "tone";
import IPlayParams from "src/Types/IPlayParams";
import { Frequency } from "tone/build/esm/core/type/Units";

import { debug } from "../../../Util/logger";
import SequencerGate from "src/Objects/Sequencer/SequencerRunner/ISequencerGate";

import { action, makeObservable } from 'mobx';

type OscillatorType = "sine" | "square" | "triangle" | "sawtooth";
const OSCILLATOR_TYPES: OscillatorType[] = [
  "sine",
  "square",
  "triangle",
  "sawtooth",
];

let reverbDecayMod = 4;

export default class FMDrone extends Synthesizer {
  name: string = "FMDrone";
  slug: string = "fmdrone";
  synth: Tone.PolySynth;
  toneContext: any;
  reverb: any;
  oscillatorType: OscillatorType = "sine";

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
    ];
  }

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      try {
        this.synth.connect(vol);
      } catch (err) {
        debug("FMDRONE", err);
        debug("FMDRONE", err.message);
        debug("FMDRONE", JSON.stringify(err));
      }
    }
  }

  constructor(vol, audioContext) {
    super();
    Tone.setContext(audioContext);
    this.synth = new Tone.PolySynth(Tone.FMSynth);

    this.toneContext = this.synth.context;
    this.reverb = new Tone.Reverb({
      context: this.toneContext,
      decay: 1,
      wet: 0.8,
    });

    this.reverb.generate(); // Risky not to wait but ¯\_(ツ)_/¯

    let chorus = new Tone.Chorus({
      context: this.toneContext,
      frequency: 0.33,
      depth: 0.7,
      wet: 0.85,
    });
    
    let delay = new Tone.FeedbackDelay({
      context: this.toneContext,
      delayTime: 3 / 16, // lenghtSeconds / 16;
      feedback: 0.33,
      wet: 0.66,
    });

    this.synth.chain(
      chorus,
      delay,
      this.reverb // Tone.master
    );

    makeObservable(this, {
      changeParameter: action.bound
    })
  }

  play(gate: SequencerGate, params: IPlayParams) {
    let { lengthSeconds, tailSeconds, notes } = params;

    // if (lengthSeconds == undefined) { lengthSeconds = 3};
    // if (reverbDecayMod == undefined) { reverbDecayMod = 4};
    // if (tailSeconds == undefined) { tailSeconds = 3};

    this.reverb.decay = lengthSeconds! / reverbDecayMod;

    if (!lengthSeconds) {
      throw new Error("Must Include Length Seconds");
    }

    if (!tailSeconds) {
      throw new Error("Must Include Length Seconds");
    }

    this.synth.set({
      harmonicity: 0.5,
      modulationIndex: 1,
      oscillator: {
        type: this.oscillatorType,
      },
      envelope: {
        attack: lengthSeconds! / 3,
        sustain: 1,
        release: tailSeconds! - 1,
        attackCurve: "linear",
        releaseCurve: "linear",
      },
      modulation: { type: "sine" },
      modulationEnvelope: {
        attack: lengthSeconds! * 2,
        sustain: 1,
        release: tailSeconds,
        releaseCurve: "linear",
      },
      volume: 0,
    });

    debug(
      "FMDrone",
      `Starting FMDrone Play Trigger Attack Release of ${notes} with lengthSeconds ${lengthSeconds}`
    );

      console.log(notes);

    this.synth.triggerAttackRelease(notes as Frequency[], Tone.Time(lengthSeconds).toNotation());
  }

  // play(params: IPlayParams) {
  //   const { lengthSeconds, tailSeconds, notes } = params;

  //   if (!lengthSeconds) {
  //     throw new Error("Must Include Length Seconds");
  //   }

  //   if (!tailSeconds) {
  //     throw new Error("Must Include Length Seconds");
  //   }

  //   this.toneContext = Tone.context;

  //   let reverb = new Tone.Reverb({ context: this.toneContext, decay: lengthSeconds / 4, wet: 0.8 });
  //   reverb.decay = lengthSeconds / 4;
  //   reverb.generate(); // Risky not to wait but ¯\_(ツ)_/¯

  //   this.synth.chain(
  //     new Tone.Chorus({ context: this.toneContext, frequency: 0.33, depth: 0.7, wet: 0.85 }),
  //     new Tone.FeedbackDelay({
  //       context: this.toneContext,
  //       delayTime: lengthSeconds / 16,
  //       feedback: 0.33,
  //       wet: 0.66,
  //     }),
  //     reverb // Tone.master
  //   );

  //   this.synth.set({
  //     harmonicity: 0.5,
  //     modulationIndex: 1,
  //     oscillator: {
  //       type: "sine",
  //     },
  //     envelope: {
  //       attack: lengthSeconds / 4,
  //       sustain: 1,
  //       release: tailSeconds - 1,
  //       attackCurve: "linear",
  //       releaseCurve: "linear",
  //     },
  //     modulation: { type: "sine" },
  //     modulationEnvelope: {
  //       attack: lengthSeconds * 2,
  //       sustain: 1,
  //       release: tailSeconds,
  //       releaseCurve: "linear",
  //     },
  //     volume: -10,
  //   });

  //   debug(`Starting FMDrone Play Trigger Attack Release of ${notes} with lengthSeconds ${lengthSeconds}`);
  //   this.synth.triggerAttackRelease(notes as Frequency[], lengthSeconds);
  // }
}
