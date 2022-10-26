import { ChordType, Scale } from "@tonaljs/tonal";
import { IMusicChord, IMusicKey } from "Types";
import ArpeggiatorIntervalCalculator from "./ArpeggiatorIntervalCalculator";

import { IIntervalCalculatorParams } from "./IntervalCalculator";

function calculateArpNote(
  note: string,
  index: number,
  aic: ArpeggiatorIntervalCalculator,
  params: any
) {
  let arpNote = aic.calculate({
    ...params,
    measureBeat: index * 4,
  } as IIntervalCalculatorParams);
  expect(arpNote.toNote()).toBe(note);
}

let chord: IMusicChord = ChordType.get("major");
let key = "C" as IMusicKey;
let scale = Scale.get("C major");
let startNote = "C";
let octave = 4;
let parameters = new Map();

const IN_PARAMS = {
  chord,
  key,
  scale,
  startNote,
  octave,
  parameters,
};

test("test arpeggiator up", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "up"
  );

  parameters.set("arpeggiatortype", {
    val: "up",
  });

  let notes = ["C4", "E4", "G4", "C4", "E4", "G4", "C4", "E4", "G4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator up = special", async () => {
  let chord: IMusicChord = ChordType.get("major thirteenth");
  let key = "C#" as IMusicKey;
  let scale = Scale.get("C# aeolian");
  let startNote = "C#";
  let octave = 4;
  let parameters = new Map();

  const SPECIAL_IN_PARAMS = {
    chord,
    key,
    scale,
    startNote,
    octave,
    parameters,
  };

  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "up"
  );

  parameters.set("arpeggiatortype", {
    val: "up",
  });

  // C# - F - G# - C - D# - A# / C# - F - G# - B# - D# - A#
  let notes = [
    "C#4",
    "F4",
    "G#4",
    "C5",
    "D#5",
    "A#5",
    "C#4",
    "F4",
    "G#4",
    "C5",
    "D#5",
    "A#5",
  ];

  notes.map((note: string, index: number) => {
    calculateArpNote(
      note,
      index,
      arpeggiatorIntervalCalculator,
      SPECIAL_IN_PARAMS
    );
  });
});

test("test arpeggiator down", async () => {
  let arpeggiator = "down";
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    arpeggiator
  );

  parameters.set("arpeggiatortype", {
    val: arpeggiator,
  });

  let notes = ["G4", "E4", "C4", "G4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator updown", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "updown"
  );

  parameters.set("arpeggiatortype", {
    val: "updown",
  });

  let notes = ["C4", "E4", "G4", "E4", "C4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator updowninc", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "updowninc"
  );

  parameters.set("arpeggiatortype", {
    val: "updowninc",
  });

  let notes = ["C4", "E4", "G4", "G4", "E4", "C4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator downup", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "downup"
  );

  parameters.set("arpeggiatortype", {
    val: "downup",
  });

  let notes = ["G4", "E4", "C4", "E4", "G4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator downupinc", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "downupinc"
  );

  parameters.set("arpeggiatortype", {
    val: "downupinc",
  });

  let notes = ["G4", "E4", "C4", "C4", "E4", "G4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator top-line-up", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "top-line-up"
  );

  parameters.set("arpeggiatortype", {
    val: "top-line-up",
  });

  let notes = ["G4", "C4", "G4", "E4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator top-line-down", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "top-line-down"
  );

  parameters.set("arpeggiatortype", {
    val: "top-line-down",
  });

  let notes = ["G4", "E4", "G4", "C4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator bottom-line-up", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "bottom-line-up"
  );

  parameters.set("arpeggiatortype", {
    val: "bottom-line-up",
  });

  let notes = ["C4", "E4", "C4", "G4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});

test("test arpeggiator bottom-line-down", async () => {
  const arpeggiatorIntervalCalculator = new ArpeggiatorIntervalCalculator(
    16,
    "bottom-line-down"
  );

  parameters.set("arpeggiatortype", {
    val: "bottom-line-down",
  });

  let notes = ["C4", "G4", "C4", "E4"];

  notes.map((note: string, index: number) => {
    calculateArpNote(note, index, arpeggiatorIntervalCalculator, IN_PARAMS);
  });
});
