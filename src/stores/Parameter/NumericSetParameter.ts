import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

interface INumericSetParameterParams {
  name: string;
  key: string;
  userParameterStore: UserParameterStore;
  default: number[];
  multiSelect?: boolean;
  onDeckValue?: number[] | undefined;
  changedAtSection?: boolean;
}

export default class NumericSetParameter extends BaseParameter {
  type: string = "numeric_set";
  private default: number[];
  private multiSelect: boolean = true;
  onDeckValue: number[] | undefined;
  fieldOptions: any;

  constructor(params: INumericSetParameterParams) {
    super(params.userParameterStore, params.name, params.key);
    this.default = params.default;
    if (params.multiSelect) {
      this.multiSelect = params.multiSelect;
    }

    if (params.changedAtSection) {
      this.changedAtSection = params.changedAtSection;
    }
  }

  setValue(newValue: number[]): boolean {
    this.userParameterStore.set(this.key, newValue);
    return true;
  }

  removeItem(item: number) {
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

  swapOnDeck(): boolean {
    if (this.onDeckValue) {
      this.setValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  addItem(item: number) {
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

  toggleItem(item: number) {
    if (this.value().includes(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }

  valueOfNumericSet(): number[] {
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as number[];
    }
    return this.default;
  }

  value(): number[] {
    return this.valueOfNumericSet();
  }

  get val(): number[] {
    return this.valueOfNumericSet();
  }

  get(): number[] {
    return this.valueOfNumericSet();
  }
}
