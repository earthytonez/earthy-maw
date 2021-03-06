import * as Tone from "tone";
import { Chord } from "@tonaljs/tonal";

import { makeObservable, action, computed } from "mobx";

import IPlayParams from "../../Types/IPlayParams";
import { debug, info } from "../../Util/logger";
import SequencerType from "./SequencerType";

import PlayEveryX from "./SequencerRunner/PlayEveryX";
import RandomTrigger from "./SequencerRunner/RandomTrigger";
import { ISequencerGate } from "./SequencerRunner/SequencerGate";
import ISequencerParameters from "./SequencerRunner/ISequencerParameters";

import MusicFeaturesStore from "../../stores/MusicFeatures.store";
import { BeatMarker } from "../../stores/MusicFeatures/BeatMarker";

import Synthesizer from "../Synthesizer";
import { TOML_FILES } from "config/constants";
import { IMusicChord, IMusicKey, IMusicScale } from "Types";
import { ITriggerParameters } from "./SequencerLoader/TriggerWhen";

export default class Sequencer extends SequencerType {
  slug: string;

  randomTriggerRunner?: RandomTrigger;
  playEveryXRunner?: PlayEveryX;
  /*
   * A parameter set determines when a sequence is triggered.
   * There can be multiple parameter sets for a given sequencer, in order to have
   * selectable variation.  For example, the 3 four can play the second beat
   * on the 2 or the three (1-2-4, 1-3-4).
   */
  chosenTriggerParameterSet: number = 0;

  beatsSinceLastNote: number;

  boundSynthesizer?: Synthesizer = undefined;
  machineType: string = "Sequencer";
  type: string = "";
  x = 0;
  loading: boolean = true;

  droneLength: number = 9;
  droneTail: number = 6;

  /*
   * These variables are defined on the Track and come in through the constructor
   */
  octaves: number[];

  droneSpacingHigh: number = 3;
  droneSpacingLow: number = 2;

  /*
   * These variables are for random step sequencers.
   */
  minGate: number = 0;
  maxGate: number = 1;
  minInterval: number = 0;
  maxInterval: number = 1;

  audioContext: Tone.BaseContext;
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
      // .reduce((obj, key) => {
      //   obj[key] = this[key];
      //   return obj;
      // }, {});
      
    return JSON.stringify(filteredObject);
  }

  isSynth() {
    return false;
  }

  bindSynth(synth: Synthesizer) {
    this.boundSynthesizer = synth;
    debug("SEQUENCER", `Bound Synthesizer: ${synth}`, this.boundSynthesizer);
  }

  incrementParameter(parameter: string) {
    switch (parameter) {
      case "minGate":
        this.minGate++;
        break;
      case "maxGate":
        this.maxGate++;
        break;
    }
  }

  decrementParameter(parameter: string) {
    switch (parameter) {
      case "minGate":
        this.minGate--;
        break;
      case "maxGate":
        this.maxGate--;
        break;
    }
  }

  changeParameter(parameter: string, value: any) {
    this[parameter as keyof this] = value;
  }

  get editParameters(): ISequencerParameters {
    if (this.sequencerLoader?.sequencerHolder.type === "randomStep") {
      return [
        {
          name: "Minimum Gate",
          field: "minGate",
          fieldType: "slider",
          fieldOptions: {
            min: 0,
            max: 10,
            current: this.minGate,
          },
        },
        {
          name: "Maximum Gate",
          field: "maxGate",
          fieldType: "slider",
          fieldOptions: {
            min: 0,
            max: 100,
            current: this.maxGate,
          },
        },
        {
          name: "Minimum Interval",
          field: "minInterval",
          fieldType: "slider",
          fieldOptions: {
            min: 0,
            max: 1,
            current: this.minInterval,
          },
        },
        {
          name: "Maximum Interval",
          field: "maxInterval",
          fieldType: "slider",
          fieldOptions: {
            min: 0,
            max: 10,
            current: this.maxInterval,
          },
        },
      ];
    }
    return [];
  }

  async load() {
    info(
      "SEQUENCER",
      `# Loading sequencer`,
      { type: this.type },
      "font-weight:bold"
    );

    this.sequencerLoader = await this.fetchTOML(TOML_FILES[this.type]);
    this.setRunners();
  }

  setRunners() {
    this.playEveryXRunner = new PlayEveryX(this.sequencerLoader!.rhythm_length);
    this.randomTriggerRunner = new RandomTrigger(
      this.sequencerLoader!.rhythm_length
    );
  }

  /*
   * This is a simple step sequencer, that enables you to sequence based on either a list or a mathematical formula.
   * This is only for triggers/gates it does not determine what note to play.
   */
  playEveryX(
    beatMarker: number,
    parameters: ITriggerParameters
  ): ISequencerGate {
    try {
      return this.playEveryXRunner!.run(beatMarker, parameters);
    } catch (err) {
      console.error(err, parameters);
    }

    return {
      triggered: false,
    };
  }

  /*
   * This is a simple step sequencer, that enables you to sequence based on either a list or a mathematical formula.
   * This is only for triggers/gates it does not determine what note to play.
   */
  randomTrigger(
    beatMarker: number,
    parameters: ITriggerParameters
  ): ISequencerGate {
    try {
      return this.randomTriggerRunner!.run(
        beatMarker,
        this.beatsSinceLastNote,
        this.resetBeatsSinceLastNote,
        parameters,
        this.minGate,
        this.maxGate,
        this.minInterval,
        this.maxInterval
      );
    } catch (err) {
      console.error(err, parameters);
    }
    return {
      triggered: false,
    };
  }

  /*
   * For a given step, this determines if the the step should trigger the synthesizer.  This will mainly call different
   * kinds of sequencers, such as a step sequencer to determine if it should play.
   *
   * Step Sequencer
   * Euclidian Sequencer
   * Drone Sequencer?
   */
  shouldPlay(beatMarker: BeatMarker): ISequencerGate {
    if (!this.boundSynthesizer) {
      return {
        triggered: false,
      };
    }

    if (!this.triggerWhen) {
      return {
        triggered: false,
      };
    }

    let parameters =
      this.triggerWhen.parameterSets[this.chosenTriggerParameterSet];

    if (!parameters) {
      throw new Error("parameters for random sequencer must be defined");
    }

    switch (this.triggerWhen.type) {
      case "random":
        return this.randomTrigger(beatMarker.num, parameters);
      case "everyX":
        return this.playEveryX(beatMarker.num, parameters);
      default:
        return {
          triggered: true,
        };
    }
  }

  /* 
    This triggers the volume sequencer.  Some sequencers may have steps with different volume levels.
  */

  volume(beatMarker: BeatMarker): number {
    return this.sequencerLoader!.volume(beatMarker);
  }

  /* This triggers the note sequencer.*/

  note(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    beatMarker: BeatMarker
  ): Tone.FrequencyClass {
    return this.sequencerLoader!.note(
      key,
      scale,
      chord,
      this.octaves,
      beatMarker
    );
  }

  bounceChord(notes: any, synthFn: any, playDuration: any, tailDuration: any) {
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

  /*
   * TODO: Interesting that here we get Chord with a key.  Should we be doing this earlier?
   */
  getChord(key: IMusicKey, chord: IMusicChord): string[] {
    let chordDef = Chord.getChord(chord.name.toLowerCase(), key);

    return chordDef.notes;
  }

  arpParams(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    beatMarker: BeatMarker,
    time: any
  ): IPlayParams {
    return {
      volume: this.volume(beatMarker),
      note: this.note(key, scale, chord, beatMarker),
      time: time,
    };
  }

  droneParams(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    beatMarker: BeatMarker,
    time: any
  ): any {
    info("DRONE_SEQUENCER", "Starting Drone");

    let playParams = this.playParams(key, scale, chord, beatMarker, time);
    playParams.lengthSeconds = this.droneLength;
    playParams.tailSeconds = this.droneTail;

    let chordNotes = this.getChord(key, chord);

    let octave = this.octaves[Math.floor(Math.random() * this.octaves.length)];

    let toneFrequencyChord = chordNotes.map((note: string) => {
      return Tone.Frequency(`${note}${octave}`);
    });
    
    let toneFrequencyChords = [...toneFrequencyChord].sort(() => Math.random() - 0.5)[0]; // What is this doing?
  
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
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    beatMarker: BeatMarker,
    time: any
  ): IPlayParams {
    return {
      volume: this.volume(beatMarker),
      note: this.note(key, scale, chord, beatMarker),
      time: time,
    };
  }

  sequencerType(): string {
    return this.sequencerLoader?.type!;
  }

  /* This action is triggered externall to possibly play a sequencer */
  async play(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    beatMarker: BeatMarker,
    time: any
  ) {
    this.beatsSinceLastNote++;

    if (!this.boundSynthesizer) {
      return; // debug("SEQUENCER", "No Bound Synthesizer");
    }

    debug("SEQUENCER", `shouldPlay? ${this.sequencerType()}`);

    let gate: ISequencerGate = this.shouldPlay(beatMarker);

    if (gate.triggered) {
      if (this.sequencerType() === "drone") {
        console.log("sequencerType Drone");
        return this.boundSynthesizer.play(
          gate,
          this.droneParams(key, scale, chord, beatMarker, time)
        );
      }

      if (this.sequencerType() === "arpeggiator") {
        console.log(`sequencerType Arpeggiator ${beatMarker}`);
        return this.boundSynthesizer.play(
          gate,
          this.arpParams(key, scale, chord, beatMarker, time)
        );
      }

      return this.boundSynthesizer.play(
        gate,
        this.playParams(key, scale, chord, beatMarker, time)
      );
    }
  }

  constructor(
    type: string,
    audioContext: Tone.BaseContext,
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
      randomTrigger: action.bound,
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

// return [
//   {
//     name: "TriggerSet",
//     field: "chosenTriggerParameterSet",
//     fieldType: "arraySelector",
//     fieldOptions: {
//       options: [0, 1, 2, 3, 4],
//       current: this.chosenTriggerParameterSet,
//     },
//   },
//   {
//     name: "Drone Length",
//     field: "droneLength",
//     fieldType: "slider",
//     fieldOptions: {
//       options: [3, 4, 5, 6, 7, 8],
//       current: this.droneLength,
//     },
//   },
//   {
//     name: "Drone Tail",
//     field: "droneTail",
//     fieldType: "slider",
//     fieldOptions: {
//       options: [3, 4, 5, 6, 7, 8],
//       current: this.droneTail,
//     },
//   },
//   {
//     name: "Drone Spacing High",
//     field: "droneSpacingHigh",
//     fieldType: "slider",
//     fieldOptions: {
//       options: [3, 4, 5, 6, 7, 8],
//       current: this.droneTail,
//     },
//   },
//   {
//     name: "Drone Spacing Low",
//     field: "droneSpacingLow",
//     fieldType: "slider",
//     fieldOptions: {
//       options: [3, 4, 5, 6, 7, 8],
//       current: this.droneTail,
//     },
//   }
// ];
