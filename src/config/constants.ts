import Bell from "../Objects/Synthesizers/Bell.ts";
import FMDrone from "../Objects/Synthesizers/FMDrone.ts";
import FMBells from "../Objects/Synthesizers/FMBells.ts";
import Kick from "../Objects/Synthesizers/Kick.ts";
import HiHat from "../Objects/Synthesizers/HiHat.ts";

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

export const MAJOR_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];
export const MINOR_SCALE_INTERVALS = [2, 1, 2, 2, 1, 2, 2];

export const SEQUENCER_TYPES = [
  "FourOTFloor",
  "OneTwo",
  "HiHat",
  "SimpleDrone",
  "HouseHiHat",
  "OneFour",
  "TwoFour",
  "ThreeFour",
];

export const SYNTH_TYPES = [
  { id: 0, name: "Bell", slug: "bell" },
  { id: 1, name: "HiHat", slug: "hihat" },
  { id: 2, name: "Kick", slug: "kick" },
  { id: 4, name: "FMBells", slug: "fmbells" },
  { id: 5, name: "FMDrone", slug: "fmdrone" },
  { id: 6, name: "Sine", slug: "sine" },
];

export const SYNTH_TYPE_FROM_STRING = {
  bell: Bell,
  hihat: HiHat,
  kick: Kick,
  fmdrone: FMDrone,
  fmbells: FMBells
}

export const A_ZERO_STARTING_NUMBER = 8;