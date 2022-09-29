import UserParameterStore from "stores/UserParameter.store";
import BaseParameter, { ParameterFieldTypes } from "./Base";

interface INumericParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: number;
  plugin?: string;
  changedAtSection?: boolean;
  onDeckValue?: number;
}

export default class NumericParameter extends BaseParameter {
  type: string = "numeric";
  fieldType: ParameterFieldTypes = "slider";
  plugin?: string;
  default: number;
  onDeckValue: number | undefined; // onDeckValue is a string representation of the music scale ('name');
  userParameterStore: UserParameterStore;

  constructor(params: INumericParameterParams) {
    super(params.userParameterStore, params.name, params.key);

    this.default = params.default;
    this.plugin = params.plugin;
    this.userParameterStore = params.userParameterStore;
    if (params.changedAtSection) {
      this.changedAtSection = params.changedAtSection;
    }

    this.fieldOptions = {
      min: 0,
      max: 100,
      current: this.numberValue(),
    };
  }

  get valuePending(): boolean {
    return this.onDeckValue !== undefined;
  }

  swapOnDeck(): boolean {
    if (this.onDeckValue) {
      this.setValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  setValue(newValue: number): boolean {
    console.log(`Setting Numeric Parameter to ${newValue}`);
    this.userParameterStore.set(this.key, newValue);
    return true;
  }

  numberValue(): number {
    console.log(`Getting Numeric value from key ${this.key}`);
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as number;
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

  get val(): number {
    return this.numberValue();
  }

  get(): number {
    return this.numberValue();
  }
}
