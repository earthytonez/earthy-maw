import UserParameterStore from 'stores/UserParameter.store';
import BaseParameter, { ParameterFieldTypes } from './Base';

export default class NumericEnumParameter extends BaseParameter{
    type: string = "numeric_enum";
    fieldType: ParameterFieldTypes = "arraySelector";

    constructor(_userParameterStore: UserParameterStore, name: string, _key: string, private options: number[], private _defaultValue: number) {
        super(_userParameterStore, name, _key);
        this.fieldOptions = {
            current: _defaultValue,
            options: options
        }

    }

    setValue(newValue: number): boolean {
        if (this.options.includes(newValue)) {
            this._userParameterStore.set(this._key, newValue);
            return true;
        }
        return false;
    }

    numericValue(): number {
        if (this._userParameterStore.get(this._key)) {
            return this._userParameterStore.get(this._key) as number;
        }
        return this._defaultValue;
    }

    value(): number {
        return this.numericValue();
    }

    get(): number {
        return this.numericValue();
    }

}