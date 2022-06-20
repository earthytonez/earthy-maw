import NoteIntervalCalculator from "./NoteIntervalCalculator";

test("find midi number from note name", async () => {
    const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");
  
    let tmpNoteNumber
    tmpNoteNumber = noteIntervalCalculator.getNoteNumber("C4");
    expect(tmpNoteNumber).toBe(60);

    tmpNoteNumber = noteIntervalCalculator.getNoteNumber("A0");
    expect(tmpNoteNumber).toBe(21);

    tmpNoteNumber = noteIntervalCalculator.getNoteNumber("B1");
    expect(tmpNoteNumber).toBe(35);

    tmpNoteNumber = noteIntervalCalculator.getNoteNumber("D3");
    expect(tmpNoteNumber).toBe(50);
  });

  test("Get note name from midi number", async () => {
    const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");
  
    let tmpNoteName = "C4";
    tmpNoteName = noteIntervalCalculator.getNoteName(60);
    expect(tmpNoteName).toBe("C4");

    tmpNoteName = noteIntervalCalculator.getNoteName(21);
    expect(tmpNoteName).toBe("A0");

    tmpNoteName = noteIntervalCalculator.getNoteName(35);
    expect(tmpNoteName).toBe("B1");

    tmpNoteName = noteIntervalCalculator.getNoteName(50);
    expect(tmpNoteName).toBe("D3");

  });
  
test("find Major Key Interval starting at root note.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");

  let intervalNote = noteIntervalCalculator.getNote("C4", 5);
  expect(intervalNote).toBe("G4");
});

test("find Minor Key Interval starting at root note.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "minor");

  let intervalNote = noteIntervalCalculator.getNote("C4", 3);
  expect(intervalNote).toBe("Eb4");
});

test("find Major Key Interval starting at non-root note.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");

  let intervalNote = noteIntervalCalculator.getNote("D4", 5);
  expect(intervalNote).toBe("Ab4");
});

test("find Minor Key Interval starting at non-root note.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "minor");

  let intervalNote = noteIntervalCalculator.getNote("D4", 5);
  expect(intervalNote).toBe("A4");
});
