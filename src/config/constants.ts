import Bell from "../Objects/Synthesizers/Bell";
import FMDrone from "../Objects/Synthesizers/FMDrone";
import FMBells from "../Objects/Synthesizers/FMBells";
import Kick from "../Objects/Synthesizers/Kick";
import HiHat from "../Objects/Synthesizers/HiHat";
import Bass from "../Objects/Synthesizers/Bass";
import Waveform from "../Objects/Synthesizers/Waveform";

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
export const MUSIC_THEORY_SCALES = ["Major", "Minor"];

export const MUSIC_THEORY_CHORDS = ["major", "maj7", "maj9", "maj13", "maj7#11", "minor"];

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

export const SYNTH_TYPES = [
  { id: 0, name: "Bell", slug: "bell" },
  { id: 0, name: "Bass", slug: "bass" },
  { id: 1, name: "HiHat", slug: "hihat" },
  { id: 2, name: "Kick", slug: "kick" },
  { id: 4, name: "FMBells", slug: "fmbells" },
  { id: 5, name: "FMDrone", slug: "fmdrone" },
  { id: 6, name: "Waveform", slug: "waveform" },
];

export const SYNTH_TYPE_FROM_STRING = {
  bass: Bass,
  bell: Bell,
  hihat: HiHat,
  kick: Kick,
  fmdrone: FMDrone,
  fmbells: FMBells,
  waveform: Waveform
}

export const A_ZERO_STARTING_NUMBER = 8;