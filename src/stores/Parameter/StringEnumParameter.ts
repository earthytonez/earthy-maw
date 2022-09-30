import UserParameterStore from "stores/UserParameter.store";
import BaseParameter, { ParameterFieldTypes } from "./Base";

import { makeObservable, observable } from "mobx";

interface IStringEnumParamterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  options: string[];
  default: string;
  plugin?: string | undefined;
}

export default class StringEnumParameter extends BaseParameter {
  type: string = "string_enum";
  fieldType: ParameterFieldTypes = "arraySelector";
  options: string[];
  default: string;
  userParameterStore: UserParameterStore;

  constructor(params: IStringEnumParamterParams) {
    super(params.userParameterStore, params.name, params.key);

    this.options = params.options;
    this.default = params.default;
    if (params.plugin) {
      this.plugin = params.plugin;
    }
    this.userParameterStore = params.userParameterStore;

    this.fieldOptions = {
      current: this.default,
      options: this.options,
    };

    makeObservable(this, {
      options: observable,
    });
  }

  setValue(newValue: string): boolean {
    if (this.options.includes(newValue)) {
      this.userParameterStore.set(this.key, newValue);
      return true;
    }
    return false;
  }

  stringValue(): string {
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as string;
    }
    return this.default;
  }

  value(): string {
    return this.stringValue();
  }

  get val(): string {
    return this.stringValue();
  }

  get(): string {
    return this.stringValue();
  }
}
