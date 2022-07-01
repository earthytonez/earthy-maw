import Synthesizer from "./Synthesizer.ts";

import * as Tone from "tone";
import { Chord } from "@tonaljs/tonal";

import {
  runInAction,
  makeObservable,
  action,
} from "mobx";

import { SequencerLoader, TriggerWhen } from "./SequencerLoader/index.ts";

import IPlayParams from "../Types/IPlayParams";

import { debug, info } from "../Util/logger.ts";
import SequencerType from "./SequencerType.ts";
import MusicFeaturesStore from "../stores/MusicFeatures.store";

const OneTwo: string = require("./Sequencers/OneTwo");
const FourOTFloor: string = require("./Sequencers/FourOTFloor");
const OffBeatFour: string = require("./Sequencers/OffBeatFour");
const HiHat: string = require("./Sequencers/HiHat");
const SimpleDrone: string = require("./Sequencers/SimpleDrone");

export default class Sequencer extends SequencerType {
  id: number;
  name: string;
  slug: string;
  boundSynthesizer: Synthesizer = undefined;
  sequencerLoader: SequencerLoader = new SequencerLoader();
  machineType: string = "Sequencer";
  type: string = "";
  code: string = "";
  x = 0;
  triggerWhen: TriggerWhen;
  loading: boolean = true;

  awaitBuffers: Promise<any>;

  audioContext: any;
  musicFeaturesStore: MusicFeaturesStore;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  isSynth() {
    return false;
  }

  bindSynth(synth: Synthesizer) {
    this.boundSynthesizer = synth;
    this.setAwaitBuffers();
    debug("SEQUENCER", `Bound Synthesizer: ${synth}`, this.boundSynthesizer);
  }

  setAwaitBuffers() {
    if (this.awaitBuffers !== undefined) {
      return;
    }
    if (this.sequencerType() === "drone") {
      this.awaitBuffers = Promise.all([
        this.bounceChord(
          ["A#6", "F7", "A#7", "D#8", "F8"],
          (params) => this.boundSynthesizer.play(params),
          3,
          3
        ),
        this.bounceChord(
          ["D#5", "A#5", "C6", "G6", "A#6", "C9"],
          (params) => this.boundSynthesizer.play(params),
          3,
          3
        ),
        this.bounceChord(
          ["F6", "C6", "D#7", "A#7", "C8"],
          (params) => this.boundSynthesizer.play(params),
          3,
          3
        ),
        this.bounceChord(
          ["A#5", "D#6", "G6", "C7", "D#7", "G8"],
          (params) => this.boundSynthesizer.play(params),
          3,
          3
        ),
      ]);
    }
  }

  async load() {
    info(
      "SEQUENCER",
      `# Loading sequencer`,
      { type: this.type },
      "font-weight:bold"
    );

    switch (this.type) {
      case "FourOTFloor":
        let seqA = await fetch(FourOTFloor);
        let seqAText = await seqA.text();
        runInAction(() => {
          this.sequencerLoader = new SequencerLoader(seqAText);
        });
        break;
      case "HiHat":
        let seqB = await fetch(HiHat);
        let seqBText = await seqB.text();
        runInAction(() => {
          this.sequencerLoader = new SequencerLoader(seqBText);
        });
        break;
      case "OneTwo":
        let seqC = await fetch(OneTwo);
        let seqCText = await seqC.text();
        runInAction(() => {
          this.sequencerLoader = new SequencerLoader(seqCText);
        });
        break;
      case "SimpleDrone":
        let seqD = await fetch(SimpleDrone);
        let seqDText = await seqD.text();
        runInAction(() => {
          this.name = "Got This Far...";
          this.sequencerLoader = new SequencerLoader(seqDText);
        });
        break;
      case "OffBeatFour":
        let seqE = await fetch(OffBeatFour);
        let seqEText = await seqE.text();
        runInAction(() => {
          this.sequencerLoader = new SequencerLoader(seqEText);
        });
        break;

      default:
    }

    this.sequencerLoader.load();
    runInAction(() => {
      this.triggerWhen = this.sequencerLoader.triggerWhen();
      this.code = this.sequencerLoader.code();
      this.name = this.sequencerLoader.name;

      info(
        "SEQUENCER",
        `Loaded Sequencer ${this.name}`,
        this.sequencerLoader.sequencerHolder
      );
    });
  }

  playEveryX(parameters: any): boolean {
    debug(`Playing steps: ${parameters.steps} on ${parameters.on} x: ${this.x}`);
    if (this.x >= parameters.steps) this.x = 0;
    if (!this.boundSynthesizer) {
      return true;
    }
    // debug(
    //   `Sequencer for ${this.boundSynthesizer.name} everyX ${this.x} Interval ${interval}`
    // );

    if (this.x === parameters.on - 1) {
      this.x++;
      return true;
    }
    this.x++;
    return false;
  }

  shouldPlay(beatNumber: number): boolean {
    if (!this.triggerWhen) {
      return false;
    }
    switch (this.triggerWhen.type) {
      case "everyX":
        return this.playEveryX(this.triggerWhen.parameters);
      default:
        return true;
    }
  }

  volume(beatNumber: number): number {
    return this.sequencerLoader.volume(beatNumber);
  }

  note(key: string, scale: string, beatNumber: number): number {
    return this.sequencerLoader.note(key, scale, beatNumber);
  }

  bounceChord(notes, synthFn, playDuration, tailDuration) {
    let playParams = {
      lengthSeconds: Tone.Time(playDuration).toSeconds(),
      tailSeconds: Tone.Time(tailDuration).toSeconds(),
      notes: notes,
    };

    debug("SEQUENCER", "ToneOfflineLength", {
      lengthSeconds: playParams.lengthSeconds,
      tailSeconds: playParams.tailSeconds,
    });

    return Tone.Offline(
      () => synthFn(playParams), /// .bind(this)
      playParams.lengthSeconds + playParams.tailSeconds
    );
  }

  getChord(key: IMusicKey, chord: string): string[] {
    let chordDef = Chord.getChord(chord.toLowerCase(), key)
    console.log(chord);
    console.log(key);
    console.log(chordDef);
    
    return chordDef.notes
  }

  drone(key, chord, beatNumber: number, time: any) {
    info("DRONE_SEQUENCER", "Starting Drone");
    // this.setAwaitBuffers();

    let playParams = this.playParams(key, chord, beatNumber, time);
    playParams.lengthSeconds = 9;
    playParams.tailSeconds = 3;

    console.log(">>>>>>>>>>>>>>");
    let chordNotes = this.getChord(key, chord);
    console.log(chordNotes);

    let octave = 3;
    let rand = Math.floor(Math.random() * (4 - 1 + 1) + 4);
    if (rand < 4) {
      octave = 2;
    }

    let toneFrequencyChord = chordNotes.map((note: string) => { return Tone.Frequency(`${note}${octave}`) });
    console.log(toneFrequencyChord);
    let _ = toneFrequencyChord.sort(() => Math.random() - 0.5)[0];
    playParams.notes = toneFrequencyChord;
    playParams.note = playParams.notes[0];
    console.log(playParams);
    // playParams.notes = [
    //   [
    //     Tone.Frequency("C2"),
    //     Tone.Frequency("E2"),
    //     Tone.Frequency("G2"),
    //     Tone.Frequency("B3"),
    //     Tone.Frequency("D3"),
    //   ],
    //   [
    //     Tone.Frequency("D2"),
    //     Tone.Frequency("F2"),
    //     Tone.Frequency("A3"),
    //     Tone.Frequency("C3"),
    //     Tone.Frequency("E3"),
    //     Tone.Frequency("G3"),
    //   ],
    //   [
    //     Tone.Frequency("E2"),
    //     Tone.Frequency("G2"),
    //     Tone.Frequency("B3"),
    //     Tone.Frequency("D3"),
    //     Tone.Frequency("F3"),
    //   ],
    //   [
    //     Tone.Frequency("F2"),
    //     Tone.Frequency("A2"),
    //     Tone.Frequency("C3"),
    //     Tone.Frequency("E3"),
    //     Tone.Frequency("G3"),
    //     Tone.Frequency("B3"),
    //   ],
    // ].sort(() => Math.random() - 0.5)[0];
    debug("Playing Drone Sequencer", "Getting Buffers", playParams);
    this.boundSynthesizer.play(playParams);
    // this.awaitBuffers.then((buffers) => {
    //   debug("DRONE_SEQUENCER", "Getting Buffers", buffers);
    //   let patternCtrl = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    //   // let patternCtrl = new Tone.Pattern([0, 1, 2, 3], "random");
    //   // let timeCtrl = new Tone.CtrlRandom(6, 18);
    //   let timeCtrl = Math.random() * (18 - 6) + 6;

    //   let randomBufferIndex = patternCtrl[beatNumber % patternCtrl.length];
    //   let selectedBuffer = buffers[randomBufferIndex];

    //   debug("DRONE_SEQUENCER",
    //     `Playing from buffer source ${selectedBuffer}, at ${randomBufferIndex}, now is ${Tone.now()}, time is ${time}`
    //   );

    //   // this.boundSynthesizer.play(Object.assign({ notes: ["C4", "E4", "G4"], lengthSeconds: 3,
    //   //   tailSeconds: 3, time: time})
    //   // );

    //   const toneBufferSource = new Tone.ToneBufferSource(selectedBuffer, () => {
    //     debug("DRONE_SEQUENCER", "Loaded Tone Audio Buffer");
    //   });
    //   toneBufferSource.toDestination();
    //   toneBufferSource.start(time);
    // });
  }

  playParams(
    key: string,
    scale: string,
    beatNumber: number,
    time: any
  ): IPlayParams {
    return {
      volume: this.volume(beatNumber),
      note: this.note(key, scale, beatNumber),
      time: time,
    };
  }

  sequencerType(): string {
    return this.sequencerLoader.type;
  }

  async play(key: string, scale: string, chord: string, beatNumber: number, time: any) {
    if (!this.boundSynthesizer) {
      return // debug("SEQUENCER", "No Bound Synthesizer");
    }
    if (this.shouldPlay(beatNumber)) {
      if (this.sequencerType() === "drone") {
        return this.drone(key, chord, beatNumber, time);
      }

      return this.boundSynthesizer.play(
        this.playParams(key, scale, beatNumber, time)
      );
    }
  }

  constructor(type: string, audioContext: any, musicFeaturesStore: MusicFeaturesStore) {
    super();

    this.audioContext = audioContext;
    this.musicFeaturesStore = musicFeaturesStore;
    this.slug = type;
    this.type = type;
    this.name = "";

    makeObservable(this, {
      play: action,
      bindSynth: action,
    });
  }
}
