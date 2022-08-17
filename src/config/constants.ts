import { TOML_FILES } from './constants/sequencer';

import { ChordType } from "@tonaljs/tonal";

import Bell from "../Objects/Synthesizer/Synthesizers/Bell";
import FMDrone from "../Objects/Synthesizer/Synthesizers/FMDrone";
import FMBells from "../Objects/Synthesizer/Synthesizers/FMBells";
import Kick from "../Objects/Synthesizer/Synthesizers/Kick";
import HiHat from "../Objects/Synthesizer/Synthesizers/HiHat";
import Bass from "../Objects/Synthesizer/Synthesizers/Bass";
import Waveform from "../Objects/Synthesizer/Synthesizers/Waveform";

import ISynthesizerType from "../Objects/Synthesizer/ISynthesizerType";

export const NOTE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"];
export const OCTAVE_MIN = 0;
export const OCTAVE_MAX = 8;
export const INT_NOTE_MIN = 0;
export const INT_NOTE_MAX = 96;

export const MUSIC_THEORY_KEYS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "Ab",
  "A#",
  "Bb",
  "Db",
  "C#",
  "Eb",
  "D#",
  "F#",
  "Gb",
  "G#",
];
// export const MUSIC_THEORY_SCALES = ScaleType.names();
export const MUSIC_THEORY_SCALES = ["major", "minor"]

// export const MUSIC_THEORY_CHORDS = ["major", "maj7", "maj9", "maj13", "maj7#11", "minor"];
export const MUSIC_THEORY_CHORDS = ChordType.names() 


export const MAJOR_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
export const MINOR_SCALE_INTERVALS = [2, 1, 2, 2, 1, 2, 2];

export const SEQUENCER_TYPES = [
  "FourOTFloor",
  "OffBeatFour",
  "OneTwo",
  "HiHat",
  "SimpleDrone",
  "HouseHiHat",
  "OneFour",
  "TwoFour",
  "ThreeFour",
  "SimpleArpeggiator",
  "Random"
];

export const SYNTH_TYPES: ISynthesizerType[] = [
  { id: 0, name: "Bell", slug: "bell" },
  { id: 0, name: "Bass", slug: "bass" },
  { id: 1, name: "HiHat", slug: "hihat" },
  { id: 2, name: "Kick", slug: "kick" },
  { id: 4, name: "FMBells", slug: "fmbells" },
  { id: 5, name: "FMDrone", slug: "fmdrone" },
  { id: 6, name: "Waveform", slug: "waveform" },
];

export interface IHash {
  [details: string] : any;
} 

export const SYNTH_TYPE_FROM_STRING: IHash = {
  "bass": Bass,
  "bell": Bell,
  "hihat": HiHat,
  "kick": Kick,
  "fmdrone": FMDrone,
  "fmbells": FMBells,
  "waveform": Waveform
}

export const A_ZERO_STARTING_NUMBER = 8;

export { TOML_FILES }

