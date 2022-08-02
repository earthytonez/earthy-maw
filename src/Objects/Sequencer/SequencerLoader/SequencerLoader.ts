import * as Tone from 'tone';

import TriggerWhen from "./TriggerWhen";
import NoteToPlay, { INoteToPlayDefinition } from "./NoteToPlay";
import VolumeToPlay from "./VolumeToPlay";
import IntervalToPlay from "./IntervalToPlay";

import { BeatMarker } from  "../../../stores/MusicFeatures/BeatMarker";

import IMusicChord from "../../../Types/IMusicChord";
import IMusicScale from "../../../Types/IMusicScale";
import IMusicKey from "../../../Types/IMusicKey";
import IToneJSDuration from "../../../Types/IToneJSDuration";
import IToneJSNote from "../../../Types/IToneJSNote";

import toml from "toml";

import { makeObservable, action, computed } from "mobx";

type ISequencerType = "drone" | "step" | "randomStep" | "arpeggiator";

interface IIntervalsToPlay {
  interval_length: number
  list: number[]
  
  type: string
  type_list: string[]
}

interface IParsedSequencerCodeFormat {
  name: string;
  description: string;
  outputs: number;
  tags: string[];
  total_length: number;
  type: ISequencerType
  NoteToPlay: INoteToPlayDefinition;
  TriggerWhen: TriggerWhen;
  IntervalsToPlay: IntervalToPlay;
}

class SequencerLoaderHolder {
  name?: string;
  type?: ISequencerType;
  tags?: string[];
  description?: string = "";
  rhythm_length?: number = undefined;
  total_length?: number = undefined;
  triggerWhen: TriggerWhen = new TriggerWhen();
  intervalToPlay: IntervalToPlay = new IntervalToPlay();
  intervalsToPlay?: IIntervalsToPlay;
  noteToPlay: NoteToPlay = new NoteToPlay();
  volumeToPlay: VolumeToPlay = new VolumeToPlay();

  assign() {}

  note(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    measureBeat: number
  ): Tone.FrequencyClass {
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

  duration(_beatMarker: BeatMarker): IToneJSDuration {
    return "8n";
  }

  volume(beatMarker: BeatMarker): number {
    return this.sequencerHolder.volume(this.measureBeat(beatMarker));
  }

  note(
    key: IMusicKey,
    scale: IMusicScale,
    chord: IMusicChord,
    octaves: number[],
    beatMarker: BeatMarker
  ): Tone.FrequencyClass {
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
      // this.sequencerHolder.outputs = data.outputs;
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
