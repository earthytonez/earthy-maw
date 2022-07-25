import { SequencerLoader } from '../SequencerLoader';
import RandomTrigger from './RandomTrigger';

import { ITriggerParameters } from "../SequencerLoader/TriggerWhen";

test('test RandomTrigger stepInterval Trigger Type', async() => {
    let rhythmLength = 16;
    let randomTrigger = new RandomTrigger(rhythmLength);

    let parameters: ITriggerParameters = {
        stepInterval: 4,
        triggerType: "stepInterval",
        on: 0
    }

    expect(randomTrigger.run(0, parameters)).toBeTruthy();
    expect(randomTrigger.run(1, parameters)).toBeFalsy();
    expect(randomTrigger.run(4, parameters)).toBeTruthy();
    expect(randomTrigger.run(5, parameters)).toBeFalsy();
    expect(randomTrigger.run(8, parameters)).toBeTruthy();
    expect(randomTrigger.run(9, parameters)).toBeFalsy();
    expect(randomTrigger.run(12, parameters)).toBeTruthy();
    expect(randomTrigger.run(13, parameters)).toBeFalsy();

});

test('test RandomTrigger stepList Trigger Type', async() => {
    let rhythmLength = 16;
    let randomTrigger = new RandomTrigger(rhythmLength);

    let parameters: ITriggerParameters = {
        stepList: [0, 3, 7, 13, 15],
        triggerType: "stepList",
        on: 0
    }

    expect(randomTrigger.run(0, parameters)).toBeTruthy();
    expect(randomTrigger.run(1, parameters)).toBeFalsy();
    expect(randomTrigger.run(3, parameters)).toBeTruthy();
    expect(randomTrigger.run(5, parameters)).toBeFalsy();
    expect(randomTrigger.run(7, parameters)).toBeTruthy();
    expect(randomTrigger.run(10, parameters)).toBeFalsy();
    expect(randomTrigger.run(13, parameters)).toBeTruthy();
    expect(randomTrigger.run(14, parameters)).toBeFalsy();
    


});
