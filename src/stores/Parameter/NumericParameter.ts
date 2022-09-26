import UserParameterStore from 'stores/UserParameter.store';
import BaseParameter, { ParameterFieldTypes } from './Base';

interface INumericParameter {
    userParameterStore: UserParameterStore, 
    name: string,
    key: string, 
    default: number
    plugin?: string
}

export default class NumericParameter extends BaseParameter {
    type: string = "string_enum";
    fieldType: ParameterFieldTypes = "slider";
    plugin?: string;
    default: number;
    userParameterStore: UserParameterStore;

    constructor(params: INumericParameter) {
        super(params.userParameterStore, params.name, params.key);

        this.default = params.default;
        this.plugin = params.plugin;
        this.userParameterStore = params.userParameterStore;

        this.fieldOptions = {
            min: 0,
            max: 100,
            current: this.numberValue()
        }
    }

    setValue(newValue: number): boolean {
        console.log(`Setting Numeric Parameter to ${newValue}`);
        this._userParameterStore.set(this._key, newValue);
        return true;
    }

    numberValue(): number {
        console.log(`Getting Numeric value from key ${this._key}`)
        if (this._userParameterStore.get(this._key)) {
            return this._userParameterStore.get(this._key) as number;
        }
        return this.default;
    }

    decrement() {
        this.setValue(this.numberValue() - 1);
    }

    increment() {
        this.setValue(this.numberValue() + 1);
    }

    value(): number {
        return this.numberValue();
    }

    get(): number {
        return this.numberValue();
   }

}