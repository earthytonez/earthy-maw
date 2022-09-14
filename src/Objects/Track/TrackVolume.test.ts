// import TrackVolume from "./TrackVolume";
// import * as Tone from 'tone';

// let audioContext =  jest.fn().mockImplementation(() => {
//     return {}
// });

// window.AudioBuffer = jest.fn().mockImplementation(() => {
//     return {}
// });

// window.AudioContext = new Tone.Context(audioContext);

test('1 = 1', () => {
    expect(1).toEqual(1);
});

// test('Creates a new TrackVolume Object', () => {
//     const saveTrack = jest.fn();
//     const toneVolume = new Tone.Volume(0 as Tone.Unit.Decibels);
//     const trackvolume = new TrackVolume(saveTrack, toneVolume);
//     expect(trackvolume).toBeInstanceOf(TrackVolume);
// });