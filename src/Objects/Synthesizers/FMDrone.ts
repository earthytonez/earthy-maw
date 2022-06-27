import Synthesizer from "../Synthesizer.ts";

import * as Tone from "tone";
import IPlayParams from "../../Types/IPlayParams";
import { Frequency } from "tone/build/esm/core/type/Units";

import { debug } from '../../Util/logger.ts';

export default class FMDrone extends Synthesizer {
  name: string = "FMDrone";
  slug: string = "fmdrone";
  synth: Tone.PolySynth;
  toneContext: any;
  reverb: any;

  attachVolume(vol: Tone.Volume) {
    if (vol) {
      console.log("AttachVolume");
      
      console.log(vol.context === this.synth.context);
      console.log(vol);
      console.log(this.synth);
      this.synth.connect(vol);
    }
  }

  constructor() {
    super();
    this.synth = new Tone.PolySynth(Tone.FMSynth)
    this.toneContext = Tone.context;

    this.reverb = new Tone.Reverb({ context: this.toneContext, decay: 1, wet: 0.8 });
    this.reverb.generate(); // Risky not to wait but ¯\_(ツ)_/¯

    this.synth.chain(
      new Tone.Chorus({ context: this.toneContext, frequency: 0.33, depth: 0.7, wet: 0.85 }),
      new Tone.FeedbackDelay({
        context: this.toneContext,
        delayTime: 3 / 16, // lenghtSeconds / 16;
        feedback: 0.33,
        wet: 0.66,
      }),
      this.reverb // Tone.master
    );

  }

  play(params: IPlayParams) {
    const { lengthSeconds, tailSeconds, notes } = params;

    this.reverb.decay = lengthSeconds! / 4;

    console.log("This synth get");
    console.log(this.synth.get());

    this.synth.set({
      // harmonicity: 0.5,
      // modulationIndex: 1,
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: lengthSeconds! / 4,
        sustain: 1,
        release: tailSeconds! - 1,
        attackCurve: "linear",
        releaseCurve: "linear",
      },
      // modulation: { type: "sine" },
      // modulationEnvelope: {
      //   attack: lengthSeconds! * 2,
      //   sustain: 1,
      //   release: tailSeconds,
      //   releaseCurve: "linear",
      // },
      volume: -10,
    });

    if (!lengthSeconds) {
      throw new Error("Must Include Length Seconds");
    }

    if (!tailSeconds) {
      throw new Error("Must Include Length Seconds");
    }
        
    debug("FMDrone", `Starting FMDrone Play Trigger Attack Release of ${notes} with lengthSeconds ${lengthSeconds}`);
    this.synth.triggerAttackRelease(notes as Frequency[], lengthSeconds);
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

        
  //   console.log(`Starting FMDrone Play Trigger Attack Release of ${notes} with lengthSeconds ${lengthSeconds}`);
  //   this.synth.triggerAttackRelease(notes as Frequency[], lengthSeconds);
  // }

}
