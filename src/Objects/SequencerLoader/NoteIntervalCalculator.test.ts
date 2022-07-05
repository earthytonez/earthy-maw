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
  expect(intervalNote).toBe("A4");
});

test("find Minor Key Interval starting at non-root note.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "minor");

  let intervalNote = noteIntervalCalculator.getNote("D4", 5);
  expect(intervalNote).toBe("G#4");
});

test("find Note out of scale with half step.", async () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");

  let intervalNote = noteIntervalCalculator.getNote("C4", 2.5);
  expect(intervalNote).toBe("Eb4");
});


test('getOctaveFromNoteNumber', () => {
  const noteIntervalCalculator = new NoteIntervalCalculator("C", "major");
  let tmpNoteNumber1 = noteIntervalCalculator.getNoteNumber("C1");
  expect(noteIntervalCalculator.octaveFromNoteNumber(tmpNoteNumber1)).toEqual(1);

  let tmpNoteNumber2 = noteIntervalCalculator.getNoteNumber("C2");
  expect(noteIntervalCalculator.octaveFromNoteNumber(tmpNoteNumber2)).toEqual(2);

  let tmpNoteNumber3 = noteIntervalCalculator.getNoteNumber("C3");
  expect(noteIntervalCalculator.octaveFromNoteNumber(tmpNoteNumber3)).toEqual(3);

  let tmpNoteNumber4 = noteIntervalCalculator.getNoteNumber("C4");
  expect(noteIntervalCalculator.octaveFromNoteNumber(tmpNoteNumber4)).toEqual(4);

  let tmpNoteNumber0 = noteIntervalCalculator.getNoteNumber("C0");
  expect(noteIntervalCalculator.octaveFromNoteNumber(tmpNoteNumber0)).toEqual(0);

});