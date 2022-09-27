import { TOML_FILES } from './constants/sequencer';

import { ChordType } from "@tonaljs/tonal";

// import Bell from "../stores/Synthesizer/Synthesizers/Bell";
// import FMDrone from "../stores/Synthesizer/Synthesizers/FMDrone";
// import FMBells from "../stores/Synthesizer/Synthesizers/FMBells";
// import Kick from "../stores/Synthesizer/Synthesizers/Kick";
// import HiHat from "../stores/Synthesizer/Synthesizers/HiHat";
// import Bass from "../stores/Synthesizer/Synthesizers/Bass";
// import Waveform from "../stores/Synthesizer/Synthesizers/Waveform";

import DuoSynth from "../stores/Synthesizer/SynthesizerTypes/DuoSynth";
import MembraneSynth from "../stores/Synthesizer/SynthesizerTypes/MembraneSynth";
import MonoSynth from "../stores/Synthesizer/SynthesizerTypes/MonoSynth";
import PolySynth from "../stores/Synthesizer/SynthesizerTypes/PolySynth";
import FMSynth from "../stores/Synthesizer/SynthesizerTypes/FMSynth";
import AMSynth from "../stores/Synthesizer/SynthesizerTypes/AMSynth";
import NoiseSynth from "../stores/Synthesizer/SynthesizerTypes/NoiseSynth";
import PluckSynth from "../stores/Synthesizer/SynthesizerTypes/PluckSynth";
import Sampler from "../stores/Synthesizer/SynthesizerTypes/Sampler";


import ISynthesizerType from "../stores/Synthesizer/ISynthesizerType";
import ISequencerType from "../stores/Sequencer/ISequencerType";

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

export const SYNTH_TYPES: ISynthesizerType[] = [
  { id: 0, name: "Bell", slug: "bell", machineType: "Synthesizer" },
  { id: 1, name: "Bass", slug: "bass", machineType: "Synthesizer" },
  { id: 2, name: "HiHat", slug: "hihat", machineType: "Synthesizer" },
  { id: 3, name: "Kick", slug: "kick", machineType: "Synthesizer" },
  { id: 4, name: "FMBells", slug: "fmbells", machineType: "Synthesizer" },
  { id: 5, name: "FMDrone", slug: "fmdrone", machineType: "Synthesizer" },
  { id: 6, name: "Waveform", slug: "waveform", machineType: "Synthesizer" },
];

export const SEQUENCER_TYPES: ISequencerType[] = [
  { id: 0, name: "Four On The Floor", slug: "four_on_the_floor", machineType: "Sequencer" },
  { id: 1, name: "Off Beat Four", slug: "off_beat_four", machineType: "Sequencer" },
  { id: 2, name: "OneTwo", slug: "one_two", machineType: "Sequencer" },
  { id: 3, name: "HiHat", slug: "hihat", machineType: "Sequencer" },
  { id: 4, name: "SimpleDrone", slug: "simple_drone", machineType: "Sequencer" },
  { id: 5, name: "HouseHiHat", slug: "house_hihat", machineType: "Sequencer" },
  { id: 6, name: "OneFour", slug: "one_four", machineType: "Sequencer" },
  { id: 7, name: "TwoFour", slug: "two_four", machineType: "Sequencer" },
  { id: 8, name: "ThreeFour", slug: "three_four", machineType: "Sequencer" },
  { id: 9, name: "SimpleArpeggiator", slug: "simple_arpeggiator", machineType: "Sequencer" },
  { id: 10, name: "Random", slug: "random", machineType: "Sequencer" },
  { id: 11, name: "MorodorBass", slug: "morodor_bass", machineType: "Sequencer" },
];

export interface IHash {
  [details: string] : any;
} 

export const SYNTH_TYPE_FROM_STRING: IHash = {
  "DuoSynth": DuoSynth,
  "MembraneSynth": MembraneSynth,
  "MonoSynth": MonoSynth,
  "PolySynth": PolySynth,
  "FMSynth": FMSynth,
  "AMSynth": AMSynth,
  "NoiseSynth": NoiseSynth,
  "PluckSynth": PluckSynth,
  "Sampler": Sampler,
}


// export const SYNTH_FROM_STRING: IHash = {
//   "bass": Bass,
//   "bell": Bell,
//   "hihat": HiHat,
//   "kick": Kick,
//   "fmdrone": FMDrone,
//   "fmbells": FMBells,
//   "waveform": Waveform
// }

export const ALL_SYNTH_PARAMETERS = [
  "oscillatorType"
]

export const A_ZERO_STARTING_NUMBER = 8;

export { TOML_FILES }

