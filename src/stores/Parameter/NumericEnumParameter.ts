import UserParameterStore from "stores/UserParameter.store";
import BaseParameter, { ParameterFieldTypes } from "./Base";

import { makeObservable, action, computed, observable } from "mobx";

interface INumericEnumParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: number;
  plugin?: string;
  options: number[];
  changedAtSection?: boolean;
  onDeckValue?: number;
}

export default class NumericEnumParameter extends BaseParameter {
  type: string = "numeric_enum";
  default: number;
  options: number[];
  fieldType: ParameterFieldTypes = "arraySelector";
  onDeckValue?: number;
  _val: number;

  constructor(params: INumericEnumParameterParams) {
    super(params.userParameterStore, params.name, params.key);

    this.options = params.options;
    this.default = params.default;
    this._val = params.default;
    if (this.userParameterStore.has(this.key)) {
      this._val = this.userParameterStore.get(this.key) as number;
    } else {
      this._val = params.default;
    }

    this.plugin = params.plugin;
    this.userParameterStore = params.userParameterStore;
    this.onDeckValue = params.onDeckValue;

    if (params.changedAtSection) {
      this.changedAtSection = params.changedAtSection;
    }

    this.fieldOptions = {
      min: 0,
      max: 100,
      current: params.default,
      options: params.options,
    };

    makeObservable(this, {
      _val: observable,

      valuePending: computed,
      val: computed,
      setValue: action.bound,
    });
  }

  get valuePending(): boolean {
    return this.onDeckValue !== undefined;
  }

  setValue(newValue: number): boolean {
    console.log(`Numeric Enum Parameter ${this.name} setValue ${newValue}`);
    if (this.options.includes(newValue)) {
      this.userParameterStore.set(this.key, newValue);
      this._val = newValue;
      return true;
    }
    return false;
  }

  numericValue(): number {
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as number;
    }
    return this.default;
  }

  value(): number {
    return this._val;
  }

  get val(): number {
    return this._val;
  }

  get(): number {
    return this.numericValue();
  }
}
