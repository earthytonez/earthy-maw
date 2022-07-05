import Sequencer from './Sequencer';

test('test Drone Settings', async() => {
    let sequencer = new Sequencer("SimpleDrone");
    
    let parameters = {
        on: 0,
        stepInterval: 64,
        triggerType: "stepInterval"
    }
    let val63 = sequencer.playEveryX(63, parameters);    
    let val64 = sequencer.playEveryX(64, parameters);    
    let val65 = sequencer.playEveryX(65, parameters);    

    expect(val63).toBeFalsy();
    expect(val64).toBeTruthy();
    expect(val65).toBeFalsy();
});
