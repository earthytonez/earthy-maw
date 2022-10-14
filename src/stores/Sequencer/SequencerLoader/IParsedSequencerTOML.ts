import TriggerWhen from "./TriggerWhen";
import GateLengths from "./GateLengths";
import { INoteToPlayDefinition } from "./NoteToPlay";
import ISequencerType from "./ISequencerType";

export interface IntervalToPlayManifestSection {
  interval_type: "arpeggiator" | "list";
  list: Array<number>;
  type_list: Array<string>;
}

export default interface IParsedSequencerTOML {
  name: string;
  description: string;
  outputs: number;
  parameters: string[];
  rhythm_length: number;
  tags: string[];
  total_length: number;
  type: ISequencerType;
  NoteToPlay: INoteToPlayDefinition;
  GateLengths: GateLengths;
  GateLengthsList: {
    list: number[][];
  };
  TriggerWhen: TriggerWhen;
  TriggerWhenList: {
    list: number[][];
  };
  IntervalsToPlay: IntervalToPlayManifestSection;
}
