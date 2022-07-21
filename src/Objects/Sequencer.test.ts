import Sequencer from './Sequencer';
import { SequencerLoader } from './SequencerLoader';

test('test Drone Settings', async() => {
    let sequencer = new Sequencer("SimpleDrone", undefined);
    
    let parameters = {
        on: 0,
        stepInterval: 64,
        triggerType: "stepInterval"
    }

    sequencer.sequencerLoader = new SequencerLoader("");

    let val63 = sequencer.playEveryX(63, parameters);    
    let val64 = sequencer.playEveryX(64, parameters);    
    let val65 = sequencer.playEveryX(65, parameters);    

    expect(val63).toBeFalsy();
    expect(val64).toBeTruthy();
    expect(val65).toBeFalsy();
});
