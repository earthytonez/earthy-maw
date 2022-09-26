import Waveform from "./Waveform";
import * as Tone from 'tone';

let waveform: Waveform;

jest.mock('tone', () => {
    return {
      PolySynth: jest.fn(),
      Filter: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn() }
      }),
      Volume: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn() }
      }),
      setContext: jest.fn(),
      getContext: jest.fn(),
      connect: jest.fn()
    }
});

// const FakeTone = {
//     Players: jest.fn(),
//     context: { resume: jest.fn() }
// };

  
beforeEach(() => {
    const vol = new Tone.Volume();
    const audioContext = Tone.getContext();
    waveform = new Waveform(vol, audioContext);
});

test('waveform is created', () => {
    expect(waveform).toBeInstanceOf(Waveform);
});

test('can change waveform parameter', () => {
    expect(waveform.oscillatorType).toBe("sine");
    waveform.changeParameter("oscillatorType", "square");
    expect(waveform.oscillatorType).toBe("square");
    waveform.changeParameter("oscillatorType", "invalid input");
    expect(waveform.oscillatorType).toBe("square");
})

test('can change filter parameter', () => {
    expect(waveform.filter.cutoff).toBe(10000);
    waveform.changeParameter("filter.cutoff", 3000);
    expect(waveform.filter.cutoff).toBe(3000);
    waveform.changeParameter("filter.cutoff", "invalid input");
    expect(waveform.filter.cutoff).toBe(3000);
})

// test('test Drone Settings', async() => {
//     let octaves = [0, 1, 2, 3]
//     let rootStore = new RootStore();
//     let sequencer = new Sequencer("SimpleDrone", Tone.getContext(), rootStore.musicFeaturesStore, octaves);
//     sequencer.sequencerLoader = new SequencerLoader("rhythm_length=64");
//     await sequencer.load();
    
//     let parameters: ITriggerParameters = {
//         on: 0,
//         stepInterval: 64,
//         triggerType: "stepInterval"
//     }

//     let val63 = sequencer.playEveryX(63, parameters);    
//     let val64 = sequencer.playEveryX(64, parameters);    
//     let val65 = sequencer.playEveryX(65, parameters);    

//     expect(val63.triggered).toBeFalsy();
//     expect(val64.triggered).toBeTruthy();
//     expect(val65.triggered).toBeFalsy();
// });
