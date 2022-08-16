import TrackVolume from "./TrackVolume";
import * as Tone from 'tone';

window.AudioContext = jest.fn().mockImplementation(() => {
    return {}
});

test('Creates a new TrackVolume Object', () => {
    const saveTrack = jest.fn();
    const toneVolume = new Tone.Volume(0);
    const trackvolume = new TrackVolume(saveTrack, toneVolume);
    expect(trackvolume).toBeInstanceOf(TrackVolume);
});