import BaseParameter, {
  IBaseParameterParams,
  ParameterFieldTypes,
} from "./Base";

import { makeObservable, action, computed, observable } from "mobx";

interface INumericEnumParameterParams extends IBaseParameterParams {
  default: number;
  options: number[];
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
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });
    this.options = params.options;
    this.default = params.default;

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
