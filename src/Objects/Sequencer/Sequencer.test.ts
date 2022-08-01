import Sequencer from './Sequencer';
import { SequencerLoader } from './SequencerLoader';

test('test Drone Settings', async() => {
    let sequencer = new Sequencer("SimpleDrone", undefined);
    sequencer.sequencerLoader = new SequencerLoader("rhythm_length=64");
    await sequencer.setRunners();
    
    let parameters = {
        on: 0,
        stepInterval: 64,
        triggerType: "stepInterval"
    }


    let val63 = sequencer.playEveryX(63, parameters);    
    let val64 = sequencer.playEveryX(64, parameters);    
    let val65 = sequencer.playEveryX(65, parameters);    

    expect(val63.triggered).toBeFalsy();
    expect(val64.triggered).toBeTruthy();
    expect(val65.triggered).toBeFalsy();
});
