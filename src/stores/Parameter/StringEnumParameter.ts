import UserParameterStore from "stores/UserParameter.store";
import BaseParameter, {
  IBaseParameterParams,
  ParameterFieldTypes,
} from "./Base";

import { makeObservable, action, observable } from "mobx";

interface IStringEnumParameterParams extends IBaseParameterParams {
  options: string[];
  default: string;
}

export default class StringEnumParameter extends BaseParameter {
  type: string = "string_enum";
  fieldType: ParameterFieldTypes = "arraySelector";
  options: string[];
  default: string;
  userParameterStore: UserParameterStore;

  constructor(params: IStringEnumParameterParams) {
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
    if (params.plugin) {
      this.plugin = params.plugin;
    }
    this.userParameterStore = params.userParameterStore;

    this.fieldOptions = {
      options: this.options,
    };

    makeObservable(this, {
      options: observable,
      setValue: action.bound,
    });
  }

  setValue(newValue: string): boolean {
    console.log(`String Enum Parameter ${this.name} setValue ${newValue}`);
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
