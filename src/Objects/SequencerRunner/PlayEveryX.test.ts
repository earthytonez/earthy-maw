import { SequencerLoader } from '../SequencerLoader';
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

    expect(playEveryX.run(0, parameters)).toBeTruthy();
    expect(playEveryX.run(1, parameters)).toBeFalsy();
    expect(playEveryX.run(4, parameters)).toBeTruthy();
    expect(playEveryX.run(5, parameters)).toBeFalsy();
    expect(playEveryX.run(8, parameters)).toBeTruthy();
    expect(playEveryX.run(9, parameters)).toBeFalsy();
    expect(playEveryX.run(12, parameters)).toBeTruthy();
    expect(playEveryX.run(13, parameters)).toBeFalsy();

});

test('test PlayEveryX stepList Trigger Type', async() => {
    let rhythmLength = 16;
    let playEveryX = new PlayEveryX(rhythmLength);

    let parameters: ITriggerParameters = {
        stepList: [0, 3, 7, 13, 15],
        triggerType: "stepList",
        on: 0
    }

    expect(playEveryX.run(0, parameters)).toBeTruthy();
    expect(playEveryX.run(1, parameters)).toBeFalsy();
    expect(playEveryX.run(3, parameters)).toBeTruthy();
    expect(playEveryX.run(5, parameters)).toBeFalsy();
    expect(playEveryX.run(7, parameters)).toBeTruthy();
    expect(playEveryX.run(10, parameters)).toBeFalsy();
    expect(playEveryX.run(13, parameters)).toBeTruthy();
    expect(playEveryX.run(14, parameters)).toBeFalsy();
    


});
