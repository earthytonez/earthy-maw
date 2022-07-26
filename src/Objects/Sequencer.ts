import * as Tone from "tone";
import { Chord } from "@tonaljs/tonal";

import { makeObservable, action, computed } from "mobx";

import { SequencerLoader } from "./SequencerLoader/index";

import IPlayParams from "../Types/IPlayParams";
import ISequencerParameters from "./SequencerRunner/ISequencerParameters";
import { debug, info } from "../Util/logger";
import SequencerType from "./SequencerType";
import PlayEveryX from "./SequencerRunner/PlayEveryX";
import RandomTrigger from "./SequencerRunner/RandomTrigger";
import MusicFeaturesStore from "../stores/MusicFeatures.store";

import { BeatMarker } from "../stores/MusicFeatures/BeatMarker";

import Synthesizer from "./Synthesizer";

const TOMLFiles = {
  OneTwo: require("./Sequencer/Definitions/OneTwo"),
  SimpleArpeggiator: require("./Sequencer/Definitions/SimpleArpeggiator"),
  ThreeFour: require("./Sequencer/Definitions/ThreeFour"),
  FourOTFloor: require("./Sequencer/Definitions/FourOTFloor"),
  OffBeatFour: require("./Sequencer/Definitions/OffBeatFour"),
  HiHat: require("./Sequencer/Definitions/HiHat"),
  SimpleDrone: require("./Sequencer/Definitions/SimpleDrone"),
  Random: require("./Sequencer/Definitions/Random"),
};

export default class Sequencer extends SequencerType {
  id: number;
  slug: string;

  randomTriggerRunner: RandomTrigger;
  playEveryXRunner: PlayEveryX;
  /*
   * A parameter set determines when a sequence is triggered.
   * There can be multiple parameter sets for a given sequencer, in order to have
   * selectable variation.  For example, the 3 four can play the second beat
   * on the 2 or the three (1-2-4, 1-3-4).
   */
  chosenTriggerParameterSet: number = 0;

  beatsSinceLastNote: number;

  boundSynthesizer: Synthesizer = undefined;
  sequencerLoader: SequencerLoader = undefined;
  machineType: string = "Sequencer";
  type: string = "";
  x = 0;
  loading: boolean = true;

  droneLength: number = 9;
  droneTail: number = 3;

  octaves: number[];
  octaveRangeHigh: number = 3;
  octaveRangeLow: number = 2;

  droneSpacingHigh: number = 3;
  droneSpacingLow: number = 2;

  awaitBuffers: Promise<any>;

  audioContext: any;
  musicFeaturesStore: MusicFeaturesStore;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  resetBeatsSinceLastNote() {
    this.beatsSinceLastNote = 0;
  }

  toJSON() {
    let excludedKeys = ["musicFeaturesStore", "trackStore", "boundSynthesizer"];

    let filteredObject = Object.keys(this)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {});
    return JSON.stringify(filteredObject);
  }

  isSynth() {
    return false;
  }

  bindSynth(synth: Synthesizer) {
    this.boundSynthesizer = synth;
    // this.setAwaitBuffers();
    debug("SEQUENCER", `Bound Synthesizer: ${synth}`, this.boundSynthesizer);
  }

  incrementParameter(parameter: string) {
    this[parameter] = value;
  }
  decrementParameter(parameter: string) {
    this[parameter] = value;
  }

  changeParameter(parameter: string, value: any) {
    this[parameter] = value;
  }

  get editParameters(): ISequencerParameters {
    return [
      {
        name: "TriggerSet",
        field: "chosenTriggerParameterSet",
        fieldType: "arraySelector",
        fieldOptions: {
          options: [0, 1, 2, 3, 4],
          current: this.chosenTriggerParameterSet,
        },
      },
      {
        name: "Drone Length",
        field: "droneLength",
        fieldType: "slider",
        fieldOptions: {
          options: [3, 4, 5, 6, 7, 8],
          current: this.droneLength,
        },
      },
      {
        name: "Drone Tail",
        field: "droneTail",
        fieldType: "slider",
        fieldOptions: {
          options: [3, 4, 5, 6, 7, 8],
          current: this.droneTail,
        },
      },
      {
        name: "Drone Spacing High",
        field: "droneSpacingHigh",
        fieldType: "slider",
        fieldOptions: {
          options: [3, 4, 5, 6, 7, 8],
          current: this.droneTail,
        },
      },
      {
        name: "Drone Spacing Low",
        field: "droneSpacingLow",
        fieldType: "slider",
        fieldOptions: {
          options: [3, 4, 5, 6, 7, 8],
          current: this.droneTail,
        },
      },
      {
        name: "Octave Range High",
        field: "octaveRangeHigh",
        fieldType: "slider",
        fieldOptions: {
          options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          current: this.octaveRangeHigh,
        },
      },
      {
        name: "Octave Range Low",
        field: "octaveRangeLow",
        fieldType: "slider",
        fieldOptions: {
          options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          current: this.octaveRangeLow,
        },
      },
    ];
  }

  async load() {
    info(
      "SEQUENCER",
      `# Loading sequencer`,
      { type: this.type },
      "font-weight:bold"
    );

    this.sequencerLoader = await this.fetchTOML(TOMLFiles[this.type]);
    this.playEveryXRunner = new PlayEveryX(this.sequencerLoader.rhythm_length);
    this.randomTriggerRunner = new RandomTrigger(
      this.sequencerLoader.rhythm_length
    );
  }

  /*
   * This is a simple step sequencer, that enables you to sequence based on either a list or a mathematical formula.
   * This is only for triggers/gates it does not determine what note to play.
   */
  playEveryX(beatMarker: number, parameters: IPlayParameters): boolean {
    if (!parameters) {
      throw new Error("parameters for playEveryX sequencer must be defined");
    }
    try {
      let val = this.playEveryXRunner.run(beatMarker, parameters);
      debug(
        "PLAY_EVERY_X",
        `sequencer Type: ${this.sequencerType()}, val: ${val}`,
        parameters
      );
      return val;
    } catch (err) {
      console.error(err, parameters);
    }
  }

  /*
   * This is a simple step sequencer, that enables you to sequence based on either a list or a mathematical formula.
   * This is only for triggers/gates it does not determine what note to play.
   */
  randomTrigger(beatMarker: number, parameters: PlayParameters): boolean {
    if (!parameters) {
      throw new Error("parameters for random sequencer must be defined");
    }
    try {
      let val = this.randomTriggerRunner.run(beatMarker, this.beatsSinceLastNote, this.resetBeatsSinceLastNote, parameters);
      debug(
        "PLAY_EVERY_X",
        `sequencer Type: ${this.sequencerType()}, val: ${val}`,
        parameters
      );
      return val;
    } catch (err) {
      console.error(err, parameters);
    }
  }

  /*
   * For a given step, this determines if the the step should trigger the synthesizer.  This will mainly call different
   * kinds of sequencers, such as a step sequencer to determine if it should play.
   *
   * Step Sequencer
   * Euclidian Sequencer
   * Drone Sequencer?
   */
  shouldPlay(beatMarker: BeatMarker): boolean {
    if (!this.boundSynthesizer) {
      return false;
    }

    if (!this.triggerWhen) {
      return false;
    }

    switch (this.triggerWhen.type) {
      case "random":
        return this.randomTrigger(
          beatMarker.num,
          this.triggerWhen.parameterSets[this.chosenTriggerParameterSet]
        );
      case "everyX":
        return this.playEveryX(
          beatMarker.num,
          this.triggerWhen.parameterSets[this.chosenTriggerParameterSet]
        );
      default:
        return true;
    }
  }

  /* 
    This triggers the volume sequencer.  Some sequencers may have steps with different volume levels.
  */

  volume(beatMarker: number): number {
    return this.sequencerLoader.volume(beatMarker);
  }

  /* This triggers the note sequencer.*/

  note(
    key: string,
    scale: string,
    chord: string,
    beatMarker: BeatMarker
  ): number {
    return this.sequencerLoader.note(
      key,
      scale,
      chord,
      this.octaves,
      beatMarker
    );
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
    let chordDef = Chord.getChord(chord.toLowerCase(), key);

    return chordDef.notes;
  }

  arpParams(
    key: string,
    scale: string,
    chord: string,
    beatMarker: number,
    time: any
  ): IPlayParams {
    return {
      volume: this.volume(beatMarker),
      note: this.note(key, scale, chord, beatMarker),
      time: time,
    };
  }

  droneParams(key, chord, beatMarker: number, time: any): any {
    info("DRONE_SEQUENCER", "Starting Drone");
    // this.setAwaitBuffers();

    let playParams = this.playParams(key, chord, beatMarker, time);
    playParams.lengthSeconds = this.droneLength;
    playParams.tailSeconds = this.droneTail;

    let chordNotes = this.getChord(key, chord);

    let octave = this.octaveRangeHigh;

    let rand = Math.floor(Math.random() * (4 - 1 + 1) + 4);
    if (rand < 4) {
      octave = this.octaveRangeLow;
    }

    let toneFrequencyChord = chordNotes.map((note: string) => {
      return Tone.Frequency(`${note}${octave}`);
    });
    let toneFrequencyChords = toneFrequencyChord.sort(() => Math.random() - 0.5)[0]; // What is this doing?
    console.log(toneFrequencyChords);
    playParams.notes = toneFrequencyChord;

    debug("Playing Drone Sequencer", "Getting Buffers", playParams);
    return playParams;

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
    // this.awaitBuffers.then((buffers) => {
    //   debug("DRONE_SEQUENCER", "Getting Buffers", buffers);
    //   let patternCtrl = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    //   // let patternCtrl = new Tone.Pattern([0, 1, 2, 3], "random");
    //   // let timeCtrl = new Tone.CtrlRandom(6, 18);
    //   let timeCtrl = Math.random() * (18 - 6) + 6;

    //   let randomBufferIndex = patternCtrl[beatMarker % patternCtrl.length];
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
    chord: string,
    beatMarker: number,
    time: any
  ): IPlayParams {
    return {
      volume: this.volume(beatMarker),
      note: this.note(key, scale, chord, beatMarker),
      time: time,
    };
  }

  sequencerType(): string {
    return this.sequencerLoader.type;
  }

  /* This action is triggered externall to possibly play a sequencer */
  async play(
    key: string,
    scale: string,
    chord: string,
    beatMarker: number,
    time: any
  ) {
    this.beatsSinceLastNote++;

    if (!this.boundSynthesizer) {
      return; // debug("SEQUENCER", "No Bound Synthesizer");
    }

    debug("SEQUENCER", `shouldPlay? ${this.sequencerType()}`);

    if (this.shouldPlay(beatMarker)) {
      if (this.sequencerType() === "drone") {
        console.log("sequencerType Drone");
        return this.boundSynthesizer.play(
          this.droneParams(key, chord, beatMarker, time)
        );
      }

      if (this.sequencerType() === "arpeggiator") {
        console.log(`sequencerType Arpeggiator ${beatMarker}`);
        return this.boundSynthesizer.play(
          this.arpParams(key, scale, chord, beatMarker, time)
        );
      }

      return this.boundSynthesizer.play(
        this.playParams(key, scale, chord, beatMarker, time)
      );
    }
  }

  constructor(
    type: string,
    audioContext: any,
    musicFeaturesStore: MusicFeaturesStore,
    octaves: number[]
  ) {
    super(type, 0);

    this.beatsSinceLastNote = 0;

    this.audioContext = audioContext;
    this.musicFeaturesStore = musicFeaturesStore;
    this.octaves = octaves;
    this.slug = type;
    this.type = type;

    makeObservable(this, {
      bindSynth: action,
      changeParameter: action.bound,
      decrementParameter: action.bound,
      editParameters: computed,
      incrementParameter: action.bound,
      play: action,
      resetBeatsSinceLastNote: action.bound,
      toJSON: action.bound,
    });
  }
}

// setAwaitBuffers() {
//   if (this.awaitBuffers !== undefined) {
//     return;
//   }
//   if (this.sequencerType() === "drone") {
//     this.awaitBuffers = Promise.all([
//       this.bounceChord(
//         ["A#6", "F7", "A#7", "D#8", "F8"],
//         (params) => this.boundSynthesizer.play(params),
//         3,
//         3
//       ),
//       this.bounceChord(
//         ["D#5", "A#5", "C6", "G6", "A#6", "C9"],
//         (params) => this.boundSynthesizer.play(params),
//         3,
//         3
//       ),
//       this.bounceChord(
//         ["F6", "C6", "D#7", "A#7", "C8"],
//         (params) => this.boundSynthesizer.play(params),
//         3,
//         3
//       ),
//       this.bounceChord(
//         ["A#5", "D#6", "G6", "C7", "D#7", "G8"],
//         (params) => this.boundSynthesizer.play(params),
//         3,
//         3
//       ),
//     ]);
//   }
// }
