import TriggerWhen from "./TriggerWhen";
import GateLengths from "./GateLengths";
import NoteToPlay from "./NoteToPlay";
import VolumeToPlay from "./VolumeToPlay";
import IntervalToPlay from "./IntervalToPlay";

import ISequencerType from "./ISequencerType";

interface IIntervalsToPlay {
  interval_length: number;
  list: number[];

  type: string;
  type_list: string[];
}
/*
 *  This can probably go away and be assigned directly to the Sequencer
 */
export default class SequencerDefinition {
  name?: string;
  slug?: string;
  type?: ISequencerType;
  tags?: string[];
  description?: string = "";
  gateLengths: GateLengths = new GateLengths();
  intervalToPlay: IntervalToPlay = new IntervalToPlay();
  intervalsToPlay?: IIntervalsToPlay;
  rhythm_length?: number = undefined;
  totalLength: number = 16;
  triggerWhen: TriggerWhen = new TriggerWhen();
  noteToPlay: NoteToPlay = new NoteToPlay();
  parameters?: string[];
  volumeToPlay: VolumeToPlay = new VolumeToPlay();

  assign() {}
}
