import Kick from "./Kick";
import * as Tone from 'tone';

let kick: Kick;

jest.mock('tone', () => {
    return {
      Filter: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn() }
      }),
      MembraneSynth: jest.fn().mockImplementation(() => {
        return { connect: jest.fn() }
      }),
      Volume: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn() }
      }),
      setContext: jest.fn()
    }
});
  
beforeEach(() => {
    const vol = new Tone.Volume();
    kick = new Kick(vol);
});

test('waveform is created', () => {
    expect(kick).toBeInstanceOf(Kick);
});

test('can change filter parameter', () => {
    expect(kick.pitch).toBe(36);
    kick.changeParameter("pitch", 28);
    expect(kick.pitch).toBe(28);
    kick.changeParameter("pitch", "invalid input");
    expect(kick.pitch).toBe(28);
})
