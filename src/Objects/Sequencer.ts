import Placeable from "./Placeable.ts";
import Synthesizer from "./Synthesizer.ts";

import * as Tone from "tone";

import { makeObservable, observable, flow, action, computed } from "mobx";

import { SequencerLoader, TriggerWhen } from "./SequencerLoader/index.ts";

import IPlayParams from "../Types/IPlayParams";

import { debug, info, warn } from "../Util/logger.ts";

const OneTwo: string = require("./Sequencers/OneTwo");
const FourOTFloor: string = require("./Sequencers/FourOTFloor");
const OffBeatFour: string = require("./Sequencers/OffBeatFour");
const HiHat: string = require("./Sequencers/HiHat");
const SimpleDrone: string = require("./Sequencers/SimpleDrone");

export default class Sequencer extends Placeable {
  id: number;
  name: string;
  slug: string;
  boundSynthesizer: Synthesizer = undefined;
  sequencerLoader: SequencerLoader = new SequencerLoader();
  type: string = "";
  code: string = "";
  x = 0;
  triggerWhen: TriggerWhen;

  awaitBuffers: Promise<any>;

  isSynth() {
    return false;
  }

  bindSynth(synth: Synthesizer) {
    this.boundSynthesizer = synth;
    this.setAwaitBuffers();
    debug("SEQUENCER", `Bound Synthesizer: ${synth}`, this.boundSynthesizer);
  }

  setAwaitBuffers() {
    if (this.awaitBuffers != undefined) {
      return;
    }
    if (this.sequencerType() == "drone") {
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
        this.sequencerLoader = new SequencerLoader(seqAText);
        break;
      case "HiHat":
        let seqB = await fetch(HiHat);
        let seqBText = await seqB.text();
        this.sequencerLoader = new SequencerLoader(seqBText);
        break;
      case "OneTwo":
        let seqC = await fetch(OneTwo);
        let seqCText = await seqC.text();
        this.sequencerLoader = new SequencerLoader(seqCText);
        break;
      case "SimpleDrone":
        let seqD = await fetch(SimpleDrone);
        let seqDText = await seqD.text();
        this.sequencerLoader = new SequencerLoader(seqDText);
        break;
      case "OffBeatFour":
        let seqE = await fetch(OffBeatFour);
        let seqEText = await seqE.text();
        this.sequencerLoader = new SequencerLoader(seqEText);
        break;
  
      default:
    }

    await this.sequencerLoader.load();
    this.triggerWhen = this.sequencerLoader.triggerWhen();
    this.code = this.sequencerLoader.code();
    this.name = this.sequencerLoader.name;
    info("SEQUENCER", `Loaded Sequencer ${this.name}`, this.sequencerLoader);
  }

  playEveryX(parameters: any): boolean {
    if (this.x >= parameters.steps) this.x = 0;
    if (!this.boundSynthesizer) {
      return true;
    }
    // debug(
    //   `Sequencer for ${this.boundSynthesizer.name} everyX ${this.x} Interval ${interval}`
    // );

    if (this.x === (parameters.on - 1)) {
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
        console.log(this.triggerWhen);
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

  drone(key, scale, beatNumber: number, time: any) {
    info("DRONE_SEQUENCER", "Starting Drone");
    // this.setAwaitBuffers();



    let playParams = this.playParams(key, scale, beatNumber, time);
    playParams.lengthSeconds = 3;
    playParams.tailSeconds = 3;

    // playParams.notes = [
    //   [Tone.Frequency("A#5"), Tone.Frequency("F6"), Tone.Frequency("A#6"), Tone.Frequency("D#7"), Tone.Frequency("F7")],
    //   [Tone.Frequency("D#4"), Tone.Frequency("A#4"), Tone.Frequency("C5"), Tone.Frequency("G5"), Tone.Frequency("A#5"), Tone.Frequency("C8")],
    //   [Tone.Frequency("F5"), Tone.Frequency("C5"), Tone.Frequency("D#6"), Tone.Frequency("A#6"), Tone.Frequency("C7")],
    //   [Tone.Frequency("A#4"), Tone.Frequency("D#5"), Tone.Frequency("G5"), Tone.Frequency("C6"), Tone.Frequency("D#6"),Tone.Frequency("G7")],  
    // ].sort(() => Math.random() - 0.5)[0];
    playParams.notes = [
      [Tone.Frequency("C3"), Tone.Frequency("E3"), Tone.Frequency("G3"), Tone.Frequency("B4"), Tone.Frequency("D4")],
      [Tone.Frequency("D3"), Tone.Frequency("F3"), Tone.Frequency("A4"), Tone.Frequency("C4"), Tone.Frequency("E4"), Tone.Frequency("G4")],
      [Tone.Frequency("E3"), Tone.Frequency("G3"), Tone.Frequency("B4"), Tone.Frequency("D4"), Tone.Frequency("F4")],
      [Tone.Frequency("F3"), Tone.Frequency("A3"), Tone.Frequency("C4"), Tone.Frequency("E4"), Tone.Frequency("G4"),Tone.Frequency("B4")],  
    ].sort(() => Math.random() - 0.5)[0];
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

  async play(key: string, scale: string, beatNumber: number, time: any) {
    if (!this.boundSynthesizer) {
      return debug("SEQUENCER", "No Bound Synthesizer");
    }
    if (this.shouldPlay(beatNumber)) {
      if (this.sequencerType() === "drone") {
        return this.drone(key, scale, beatNumber, time);
      }

      return this.boundSynthesizer.play(
        this.playParams(key, scale, beatNumber, time)
      );
    }
  }

  constructor(type: string, id: number, songBeatNumber: number) {
    super();

    makeObservable(this, {
      name: observable,
      slug: observable,
      play: action,
      load: action,
    });

    this.id = id;
    this.slug = type;
    this.type = type;
  }
}
