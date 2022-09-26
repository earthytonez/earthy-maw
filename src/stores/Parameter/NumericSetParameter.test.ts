import NumericSetParameter from "./NumericSetParameter";
import UserParameterStore from "stores/UserParameter.store";

test('set a set parameter', () => {
    const userParameterStore = new UserParameterStore();
    const setParameter = new NumericSetParameter(userParameterStore, "Waveform", "track.1.synthesizer.waveform", [3, 4]);
    expect(setParameter.get()).toStrictEqual([3, 4]);
    setParameter.setValue([1, 2]);
    expect(setParameter.get()).toStrictEqual([1, 2]);
});