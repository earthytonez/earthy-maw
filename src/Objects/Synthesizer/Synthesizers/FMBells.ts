import * as Tone from "tone";

import Synthesizer from "../Synthesizer.ts";

import IPlayParams from "../../Types/IPlayParams";

import { Frequency } from "tone/build/esm/core/type/Units";

export default class FMBells extends Synthesizer {
  name: string = "FM Bells";
  slug: string = "fmbells";
  synth: Tone.PolySynth;
  toneContext: any;
  reverb: any;
  delay: any;

  attachVolume(vol: Tone.Volume) {
    if (vol) this.synth.connect(vol);
  }

  constructor() {
    let lengthSeconds = 3;
    super();
    this.toneContext = Tone.context;

    this.delay = new Tone.FeedbackDelay({
      delayTime: lengthSeconds / 8,
      feedback: 0.88,
      wet: 0.66,
    });

    let flanger = new Tone.FeedbackDelay({
      delayTime: 0.005,
      feedback: 0.1,
      wet: 0.33,
    });
    new Tone.LFO(1, 0.003, 0.007).start().connect(flanger.delayTime);

    this.reverb = new Tone.Reverb({ decay: lengthSeconds / 4, wet: 0.8 });
    this.reverb.generate(); // Risky not to wait but ¯\_(ツ)_/¯

    this.synth = new Tone.PolySynth(Tone.FMSynth).chain(
      this.delay,
      flanger,
      this.reverb,
    );
  }

  play(params: IPlayParams) {
    // fmDrone(notes, lengthSeconds, tailSeconds);
    const { lengthSeconds, tailSeconds, notes } = params;

    // this.delay.delayTime = lengthSeconds! / 8;
    this.reverb.decay = lengthSeconds! / 4;
    this.synth.set({
      harmonicity: 1.4,
      modulationIndex: 1,
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.6,
        release: tailSeconds! - 1,
      },
      modulation: { type: "triangle" },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.6,
        release: tailSeconds,
      },
      volume: 0,
    });
    this.synth.triggerAttackRelease(notes as Frequency[], lengthSeconds!);
  }
}