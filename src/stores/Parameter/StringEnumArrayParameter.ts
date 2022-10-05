import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";
import { ParameterFieldTypes } from "stores/Parameter/Base";

interface IStringEnumArrayParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: string[];
  plugin?: string;
  options: string[];
  changedAtSection?: boolean;
  onDeckValue?: string[];
  multiSelect?: boolean;
}

export default class StringEnumArrayParameter extends BaseParameter {
  type: string = "string_enum_array";
  default: string[] = [];
  multiSelect: boolean = false;
  options: string[] = [];
  fieldType: ParameterFieldTypes = "enumArraySelector";
  _val: string[];

  constructor(params: IStringEnumArrayParameterParams) {
    super(params.userParameterStore, params.name, params.key, params.plugin);

    this.default = params.default;
    this.plugin = params.plugin;

    this._val = params.default;
    this.fieldOptions = {
      options: params.options,
    };

    this.userParameterStore = params.userParameterStore;

    if (params.changedAtSection) {
      this.changedAtSection = params.changedAtSection;
    }
    if (params.multiSelect) {
      this.multiSelect = params.multiSelect;
    }
  }

  setValue(newValue: string[]): boolean {
    this.userParameterStore.set(this.key, newValue);
    return true;
  }

  removeItem(item: string) {
    if (!this.multiSelect) {
      return;
    }

    let value = this.value();

    const index = value.indexOf(item, 0);
    if (index > -1) {
      value.splice(index, 1);
    }
    this.setValue(value);
    return;
  }

  addItem(item: string) {
    if (!this.multiSelect) {
      return this.setValue([item]);
    }
    const index = this.value().indexOf(item, 0);
    if (index === -1) {
      this.value().push(item);
    }
    this.setValue(this.value());
    return;
  }

  toggleItem(item: string) {
    if (this.value().includes(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }

  value(): string[] {
    return this._val;
  }

  get val(): string[] {
    return this._val;
  }
}
