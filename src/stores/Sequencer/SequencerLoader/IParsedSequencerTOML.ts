import TriggerWhen from "./TriggerWhen";
import GateLengths from "./GateLengths";
import { INoteToPlayDefinition } from "./NoteToPlay";
import IntervalToPlay from "./IntervalToPlay";

import ISequencerType from "./ISequencerType";

export default interface IParsedSequencerTOML {
  name: string;
  description: string;
  outputs: number;
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
  IntervalsToPlay: IntervalToPlay;
}
