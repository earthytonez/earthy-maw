import * as Tone from "tone";
import toml from "toml";
import { makeObservable, action, computed, observable } from "mobx";

import TriggerWhen from "./TriggerWhen";
import GateLengths from "./GateLengths";
import NoteToPlay from "./NoteToPlay";
import VolumeToPlay from "./VolumeToPlay";
import IntervalToPlay from "./IntervalToPlay";

import { BeatMarker } from "../../../stores/MusicFeatures/BeatMarker";

import IMusicChord from "../../../Types/IMusicChord";
import IMusicScale from "../../../Types/IMusicScale";
import IMusicKey from "../../../Types/IMusicKey";
import IToneJSDuration from "../../../Types/IToneJSDuration";
// import IToneJSNote from "../../../Types/IToneJSNote";
import IParsedSequencerTOML from "./IParsedSequencerTOML";
import ISequencerType from "./ISequencerType";

interface IIntervalsToPlay {
  interval_length: number;
  list: number[];

  type: string;
  type_list: string[];
}

class SequencerLoaderHolder {
  name?: string;
  type?: ISequencerType;
  tags?: string[];
  description?: string = "";
  gateLengths: GateLengths = new GateLengths();
  intervalToPlay: IntervalToPlay = new IntervalToPlay();
  intervalsToPlay?: IIntervalsToPlay;
  rhythm_length?: number = undefined;
  total_length?: number = undefined;
  triggerWhen: TriggerWhen = new TriggerWhen();
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
      this.intervalToPlay
    );
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
      this.measureBeat(beatMarker)
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

  gateLengths(): GateLengths {
    return this.sequencerHolder.gateLengths;
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

  async load() {
    try {
      var data: IParsedSequencerTOML = toml.parse(this.sequencerCode);

      this.sequencerHolder.name = data.name;
      this.sequencerHolder.description = data.description;
      // this.sequencerHolder.outputs = data.outputs;
      this.sequencerHolder.rhythm_length = data.rhythm_length;
      this.sequencerHolder.total_length = data.total_length;
      this.sequencerHolder.tags = data.tags;
      this.sequencerHolder.type = data.type;
      if (data.TriggerWhen) {
        this.sequencerHolder.triggerWhen.parse(data.TriggerWhen);
        if (data.TriggerWhen.fillWhen) {
          this.sequencerHolder.triggerWhen.parseFill(data.TriggerWhen.fillWhen);
        }
        if (data.TriggerWhen.fillList) {
          this.sequencerHolder.triggerWhen.parseFillList(
            data.TriggerWhen.fillList
          );
        }
      }
      if (data.TriggerWhenList) {
        this.sequencerHolder.triggerWhen.parseList(data.TriggerWhenList.list);
      }
      if (data.GateLengths) {
        this.sequencerHolder.gateLengths.parse(data.GateLengths);
      }
      if (data.GateLengthsList) {
        this.sequencerHolder.gateLengths.parseList(data.GateLengthsList.list);
      }
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
      sequencerHolder: observable,
      sequencerCode: observable,
      name: computed,
      type: computed,
      load: action,
      // fetch: flow
    });
  }
}
