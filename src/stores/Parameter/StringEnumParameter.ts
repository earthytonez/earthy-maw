import UserParameterStore from 'stores/UserParameter.store';
import BaseParameter, { ParameterFieldTypes } from './Base';

interface IStringEnumParamterParams {
    userParameterStore: UserParameterStore, 
    name: string,
    key: string, 
    options: string[], 
    default: string
    plugin: string | undefined
}

export default class StringEnumParameter extends BaseParameter{
    type: string = "string_enum";
    fieldType: ParameterFieldTypes = "arraySelector";
    options: string[]
    plugin: string | undefined
    default: string;
    userParameterStore: UserParameterStore;

    constructor(params: IStringEnumParamterParams) {
        super(params.userParameterStore, params.name, params.key);

        this.options = params.options;
        this.default = params.default;
        this.plugin = params.plugin;
        this.userParameterStore = params.userParameterStore;

        this.fieldOptions = {
            current: this.default,
            options: this.options
        }
    }

    setValue(newValue: string): boolean {
        if (this.options.includes(newValue)) {
            this.userParameterStore.set(this._key, newValue);
            return true;
        }
        return false;
    }

    stringValue(): string {
        if (this.userParameterStore.get(this._key)) {
            return this.userParameterStore.get(this._key) as string;
        }
        return this.default;
    }

    value(): string {
        return this.stringValue();
    }

    get(): string {
        return this.stringValue();
    }

}