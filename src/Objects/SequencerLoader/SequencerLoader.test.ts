import { render, screen } from '@testing-library/react';
import SequencerLoader from './SequencerLoader';


test('find name from dsl', async() => {
    let code = `name = "Test Sequencer"`;
  const sequencerLoader = new SequencerLoader(code);
  await sequencerLoader.load();
  expect(sequencerLoader.name).toEqual("Test Sequencer");
});

test('measureBeat', async() => {
  let code = `length = 4`;
  const sequencerLoader = new SequencerLoader(code);
  await sequencerLoader.load();
  expect(sequencerLoader.total_length).toEqual(4);
  expect(sequencerLoader.measureBeat(1)).toBe(1);
  expect(sequencerLoader.measureBeat(2)).toBe(2);
  expect(sequencerLoader.measureBeat(3)).toBe(3);
  expect(sequencerLoader.measureBeat(4)).toBe(0);
  expect(sequencerLoader.measureBeat(5)).toBe(1);
  expect(sequencerLoader.measureBeat(6)).toBe(2);
  expect(sequencerLoader.measureBeat(7)).toBe(3);
  expect(sequencerLoader.measureBeat(8)).toBe(0);
});

test('test fifth interval in major scale', async() => {
    let code = `name = "Play Two Intervals"
length = 2
def IntervalsToPlay
  [1, 5]
end`;
  const sequencerLoader = new SequencerLoader(code);
  await sequencerLoader.load();
  expect(sequencerLoader.name).toEqual("Play Two Intervals");
  expect(sequencerLoader.total_length).toEqual(2);
  expect(sequencerLoader.sequencerHolder.intervalToPlay.intervalArray).toEqual([1, 5]);
  expect(sequencerLoader.note("C", "Major", 0)).toEqual("C4");
  expect(sequencerLoader.note("C", "Major", 1)).toEqual("G4");
  expect(sequencerLoader.note("C", "Major", 2)).toEqual("C4");
  expect(sequencerLoader.note("C", "Major", 3)).toEqual("G4");
});

test('test third interval in minor scale', async() => {
  let code = `name = "Play Two Intervals"
length = 2
def IntervalsToPlay
  [1, 3]
end`;
const sequencerLoader = new SequencerLoader(code);
await sequencerLoader.load();
expect(sequencerLoader.name).toEqual("Play Two Intervals");
expect(sequencerLoader.total_length).toEqual(2);
expect(sequencerLoader.note("C", "Minor", 0)).toEqual("C4");
expect(sequencerLoader.note("C", "Minor", 1)).toEqual("Eb4");
expect(sequencerLoader.note("C", "Minor", 2)).toEqual("C4");
expect(sequencerLoader.note("C", "Minor", 3)).toEqual("Eb4");
});
