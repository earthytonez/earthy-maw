import Synthesizer from "../Synthesizer.ts";

import * as Tone from "tone";
import IPlayParams from "../../Types/IPlayParams";

export default class FMBells extends Synthesizer {
  name: string = "FM Bells";
  slug: string = "fmbells";

  play(params: IPlayParams) {
    // fmDrone(notes, lengthSeconds, tailSeconds);
    const { lengthSeconds, tailSeconds, notes } = params;
    let delay = new Tone.FeedbackDelay({
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

    let reverb = new Tone.Reverb({ decay: lengthSeconds / 4, wet: 0.8 });
    reverb.generate(); // Risky not to wait but ¯\_(ツ)_/¯

    let synth = new Tone.PolySynth(5, Tone.FMSynth).chain(
      delay,
      flanger,
      reverb,
      Tone.Master
    );
    synth.set({
      harmonicity: 1.4,
      modulationIndex: 1,
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.6,
        release: tailSeconds - 1,
      },
      modulation: { type: "triangle" },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.6,
        release: tailSeconds,
      },
      volume: -30,
    });
    synth.triggerAttackRelease(notes, playSeconds);
  }
}
