import StringParameter from "./StringParameter";
import UserParameterStore from "stores/UserParameter.store";

test('set a string parameter', () => {
    const userParameterStore = new UserParameterStore();
    const stringParameter = new StringParameter(userParameterStore, "Waveform", "track.1.synthesizer.waveform", 'sine');
    expect(stringParameter.get()).toBe('sine');
    stringParameter.setValue('square');
    expect(stringParameter.get()).toBe('square');
});