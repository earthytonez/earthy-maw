import TrackVolume from "./TrackVolume";

window.AudioContext = jest.fn().mockImplementation(() => {
    return {}
});

test('Creates a new TrackVolume Object', () => {
    
    const saveTrack = jest.fn();
    const toneVolume = {};
    const trackvolume = new TrackVolume(saveTrack, toneVolume);
    expect(trackvolume).toBeInstanceOf(TrackVolume);
});