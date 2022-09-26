import StringSetParameter from "./StringSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test('set a set parameter', () => {
    const userParameterStore = new UserParameterStore();
    const setParameter = new StringSetParameter(userParameterStore, "Waveform", "track.1.synthesizer.waveform", ['sine']);
    expect(setParameter.get()).toStrictEqual(['sine']);
    setParameter.setValue(['square']);
    expect(setParameter.get()).toStrictEqual(['square']);
});