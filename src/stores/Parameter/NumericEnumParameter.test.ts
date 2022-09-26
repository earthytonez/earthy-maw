import NumericEnumParameter from "./NumericEnumParameter";
import UserParameterStore from "stores/UserParameter.store";

test('set a enum parameter', () => {
    const userParameterStore = new UserParameterStore();
    const enumParameter = new NumericEnumParameter(userParameterStore, "Cutoff", "track.1.synthesizer.filter.cutoff", [1, 2, 3, 4], 3);
    expect(enumParameter.get()).toBe(3);
    enumParameter.setValue(2);
    expect(enumParameter.get()).toBe(2);
    enumParameter.setValue(4);
    expect(enumParameter.get()).toBe(4);

});