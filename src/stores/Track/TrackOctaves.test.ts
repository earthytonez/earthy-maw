import UserParameterStore from "stores/UserParameter.store";
import TrackOctaves from "./TrackOctaves";

const userParameterStore = new UserParameterStore();

test('Creates a new TrackOctaves Object', () => {
    let track = {
        id: 1
    };
    const trackOctaves = new TrackOctaves(userParameterStore, track);
    expect(trackOctaves).toBeInstanceOf(TrackOctaves);
});

test('loads octave data.', () => {
    let track = {
        id: 2
    };
    const trackOctaves = new TrackOctaves(userParameterStore, track);
    
    trackOctaves.octaves = [3, 5, 7];

    expect(trackOctaves.octaves).toStrictEqual([3,5,7]);
});

test('set octave data when multiselect is enabled.', () => {
    let track = {
        id: 3,
        sequencer: {
            sequencerLoader: {
                type: "randomStep"
            }
        }
    };
    const trackOctaves = new TrackOctaves(userParameterStore, track);
    trackOctaves.octaves = [3, 5, 7];

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves.sort()).toEqual([5, 7].sort());

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves.sort()).toEqual([3, 5, 7].sort());
});

test('set octave data when multiselect is disabled..', () => {
    let track = {
        id: 4,
        sequencer: {
            sequencerLoader: {
                type: "step"
            }
        }
    };
    const trackOctaves = new TrackOctaves(userParameterStore, track);
    trackOctaves.octaves = [3, 5, 7];

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves).toEqual([3]);

    trackOctaves.toggleOctave(3);
    expect(trackOctaves.octaves).toEqual([3]);

    trackOctaves.toggleOctave(8);
    expect(trackOctaves.octaves).toEqual([8]);
});