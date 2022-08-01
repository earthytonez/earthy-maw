// import { isIntersectionTypeNode } from "typescript";
// import {
//     NOTE_LETTERS, OCTAVE_MIN, OCTAVE_MAX, INT_NOTE_MIN, INT_NOTE_MAX } from "../config/constants.ts";
import TriggerWhen from "./TriggerWhen";
import NoteToPlay from "./NoteToPlay";
import VolumeToPlay from "./VolumeToPlay";
import IntervalsToPlay from "./IntervalsToPlay";

import { BeatMarker } from  "../../../stores/MusicFeatures/BeatMarker";

import IMusicScale from "../../../Types/IMusicScale";
import IMusicKey from "../../../Types/IMusicKey";
import IToneJSDuration from "../../../Types/IToneJSDuration";
import IToneJSNote from "../../../Types/IToneJSNote";

import toml from "toml";

import { makeObservable, action, computed } from "mobx";

type ISequencerType = "drone" | "step" | "randomStep" | "arpeggiator";
interface IParsedSequencerCodeFormat {
  name: string;
  description: string;
  outputs: number;
  tags: string[];
  total_length: number;
  type: ISequencerType
  LengthOfNote: ILengthOfNote;
  NoteToPlay: INoteToPlay;
  TriggerWhen: ITriggerWhen;
  IntervalsToPlay: IIntervalsToPlay;
}

class SequencerLoaderHolder {
  name: string;
  type: ISequencerType
  description?: string = "";
  rhythm_length?: number = undefined;
  total_length?: number = undefined;
  triggerWhen: TriggerWhen = new TriggerWhen();
  intervalToPlay: IntervalsToPlay = new IntervalsToPlay();
  intervalsToPlay: IIntervalsToPlay;
  noteToPlay: NoteToPlay = new NoteToPlay();
  volumeToPlay: VolumeToPlay = new VolumeToPlay();

  assign() {}

  note(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    measureBeat: number
  ): IToneJSNote {
    return this.noteToPlay.get(
      key, 
      scale, 
      chord, 
      octaves,
      measureBeat,
      this.intervalToPlay,
      this.intervalsToPlay);
  }

  volume(beatMarker: number): number {
    return 0 * beatMarker;
  }
}

export default class SequencerLoader {
  sequencerCode: string = "";
  sequencerHolder: SequencerLoaderHolder = new SequencerLoaderHolder();

  get name() {
    return this.sequencerHolder.name;
  }

  get description() {
    return this.sequencerHolder.description;
  }

  get type() {
    return this.sequencerHolder.type;
  }

  measureBeat(beatMarker: BeatMarker): number {
    console.log(this.total_length);
    console.log(beatMarker.num % this.total_length);
    return beatMarker.num % this.total_length;
  }

  duration(beatMarker: number): IToneJSDuration {
    return "8n";
  }

  volume(beatMarker: number): number {
    return this.sequencerHolder.volume(this.measureBeat(beatMarker));
  }

  note(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    beatMarker: BeatMarker
  ): IToneJSNote {
    return this.sequencerHolder.note(
      key,
      scale,
      chord,
      octaves,
      this.measureBeat(beatMarker),
    );
  }

  get rhythm_length(): number {
    return this.sequencerHolder.rhythm_length!;
  }

  get total_length(): number {
    return this.sequencerHolder.total_length!;
  }

  code() {
    return this.sequencerCode;
  }

  triggerWhen(): TriggerWhen {
    return this.sequencerHolder.triggerWhen;
  }

  lines(): Array<string> {
    if (this.sequencerCode) {
      return this.sequencerCode.split("\n");
    }
    return [];
  }

  functionNameFromLine(line: string) {
    return line.split(" ")[1];
  }

  // getVariable(name: string, line: string) {
  //     return line.split("=")[1].trim().replace(/['"]+/g, '');
  // }

  // getNumberVariable(name: string, line: string) {
  //     return parseInt(line.split("=")[1]);
  // }

  // parseLineForFunction(functionIn: string, line: string) {
  //     switch(functionIn) {
  //         case "NoteToPlay":
  //             this.sequencerHolder.noteNotInterval = true;
  //             this.sequencerHolder.noteToPlay.parse(line);
  //             break;
  //         case "IntervalToPlay":
  //             this.sequencerHolder.intervalToPlay.parse(line);
  //             break;
  //         case "IntervalsToPlay":
  //             this.sequencerHolder.intervalToPlay.parse(line);
  //             break;
  //         case "TriggerWhen":
  //             this.sequencerHolder.triggerWhen.parse(line);
  //             break;
  //         case "TriggerWhenList":
  //             this.sequencerHolder.triggerWhen.parseList(line);
  //             break;
  //             default:
  //             break;
  //     }
  // }

  async load() {
    try {
      var data: IParsedSequencerCodeFormat = toml.parse(this.sequencerCode);

      this.sequencerHolder.name = data.name;
      this.sequencerHolder.description = data.description;
      this.sequencerHolder.outputs = data.outputs;
      this.sequencerHolder.total_length = data.total_length;
      this.sequencerHolder.tags = data.tags;
      this.sequencerHolder.type = data.type;
      this.sequencerHolder.triggerWhen.parse(data.TriggerWhen);
      this.sequencerHolder.noteToPlay.parse(data.NoteToPlay);
      this.sequencerHolder.intervalToPlay.parse(data.IntervalsToPlay);
    } catch (err) {
      console.error(this.sequencerCode);
      console.error(err);
    }

    // let inFunction = false;
    // let functionIn = "";

    // for (const line of this.lines()) {
    //     if (inFunction) {
    //         if (line === "end") {
    //             inFunction = false;
    //             functionIn = "";
    //         } else {
    //             this.parseLineForFunction(functionIn, line);
    //         }
    //     }

    //     if (line.startsWith('name = ')) {
    //         this.sequencerHolder.name = this.getVariable('name', line);
    //     }

    //     if (line.startsWith('description = ')) {
    //         this.sequencerHolder.description = this.getVariable('description', line);
    //     }

    //     if (line.startsWith('length = ')) {
    //         this.sequencerHolder.total_length = this.getNumberVariable('length', line);
    //     }
    //     if (line.startsWith('total_length = ')) {
    //         this.sequencerHolder.total_length = this.getNumberVariable('total_length', line);
    //     }
    //     if (line.startsWith('rhythm_length = ')) {
    //         this.sequencerHolder.rhythm_length = this.getNumberVariable('rhythm_length', line);
    //     }

    //     if (line.startsWith('type = ') || line.startsWith('type=')) {
    //         this.sequencerHolder.type = this.getVariable('type', line);
    //     }

    //     if (line.startsWith('def ')) {
    //         inFunction = true;
    //         functionIn = this.functionNameFromLine(line);
    //     }
    // }
  }

  constructor(sequencerCode: string) {
    this.sequencerCode = sequencerCode;
    makeObservable(this, {
      name: computed,
      type: computed,
      load: action,
      // fetch: flow
    });
  }
}
