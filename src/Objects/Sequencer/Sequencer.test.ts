// import Sequencer from './Sequencer';
// import { SequencerLoader } from './SequencerLoader';

// import * as Tone from 'tone';
// import RootStore from 'stores/Root.store';
// import { ITriggerParameters } from './SequencerLoader/TriggerWhen';

window.AudioContext = jest.fn().mockImplementation(() => {
    return {}
});

it("has a placeholder test", () => {
    expect(1+1).toEqual(2);
});  

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
