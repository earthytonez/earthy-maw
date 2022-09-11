import PlayEveryX from './PlayEveryX';

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

test('test PlayEveryX stepInterval Trigger Type', async() => {
    let rhythmLength = 16;
    let playEveryX = new PlayEveryX(rhythmLength);

    let parameters: ITriggerParameters = {
        stepInterval: 4,
        triggerType: "stepInterval",
        on: 0
    }

    expect(playEveryX.run(0, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(1, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(4, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(5, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(8, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(9, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(12, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(13, parameters).triggered).toBeFalsy();

});

test('test PlayEveryX stepList Trigger Type', async() => {
    let rhythmLength = 16;
    let playEveryX = new PlayEveryX(rhythmLength);

    let parameters: ITriggerParameters = {
        gateList: [1, 1, 1, 1, 1],
        stepList: [0, 3, 7, 13, 15],
        triggerType: "stepList",
        on: 0
    }

    expect(playEveryX.run(0, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(1, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(3, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(5, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(7, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(10, parameters).triggered).toBeFalsy();
    expect(playEveryX.run(13, parameters).triggered).toBeTruthy();
    expect(playEveryX.run(14, parameters).triggered).toBeFalsy();
    


});
