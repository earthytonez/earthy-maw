import TrackOctaves from "./TrackOctaves";

test('Creates a new TrackOctaves Object', () => {
    const saveTrack = jest.fn();
    let track = {

    };
    const trackOctaves = new TrackOctaves(saveTrack, track);
    expect(trackOctaves).toBeInstanceOf(TrackOctaves);
});

test('loads octave data.', () => {
    const saveTrack = jest.fn();
    let track = {

    };
    const trackOctaves = new TrackOctaves(saveTrack, track);
    
    trackOctaves.load({
        _octaves: [3, 5, 7]
    })
    expect(trackOctaves.octaves).toContain(3);
    expect(trackOctaves.octaves).toContain(5);
    expect(trackOctaves.octaves).toContain(7);
});

test('set octave data when multiselect is enabled.', () => {
    const saveTrack = jest.fn();
    let track = {
        sequencer: {
            sequencerLoader: {
                type: "randomStep"
            }
        }
    };
    const trackOctaves = new TrackOctaves(saveTrack, track);
    trackOctaves.load({
        _octaves: [3, 5, 7]
    })

    console.log(trackOctaves.octaves);
    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves.sort()).toEqual([5, 7].sort());

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves.sort()).toEqual([3, 5, 7].sort());
});

test('set octave data when multiselect is disabled..', () => {
    const saveTrack = jest.fn();
    let track = {
        sequencer: {
            sequencerLoader: {
                type: "step"
            }
        }
    };
    const trackOctaves = new TrackOctaves(saveTrack, track);
    trackOctaves.load({
        _octaves: [3, 5, 7]
    })

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves).toEqual([3]);

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves).toEqual([3]);

    trackOctaves.toggleOctave(8);
    expect(trackOctaves.octaves).toEqual([8]);
});