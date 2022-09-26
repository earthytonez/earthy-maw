import UserParameterStore from 'stores/UserParameter.store';
import BaseParameter from './Base';

export default class StringParameter extends BaseParameter {
    type: string = "string";

    constructor(_userParameterStore: UserParameterStore, name: string, _key: string, private _defaultValue: string) {
        super(_userParameterStore, name, _key);
    }

    setValue(newValue: string): boolean {
        this._userParameterStore.set(this._key, newValue);
        return true;
    }

    stringValue(): string {
        if (this._userParameterStore.get(this._key)) {
            return this._userParameterStore.get(this._key) as string;
        }
        return this._defaultValue;
    }

    value(): string {
        return this.stringValue();
    }

    get(): string {
        return this.stringValue();
    }

}