import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

export default class NumericSetParameter extends BaseParameter {
  type: string = "numeric_set";

  constructor(
    _userParameterStore: UserParameterStore,
    name: string,
    _key: string,
    private _defaultValue: number[],
    private multiSelect: boolean = true
  ) {
    super(_userParameterStore, name, _key);
  }

  setValue(newValue: number[]): boolean {
    this._userParameterStore.set(this._key, newValue);
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

  addItem(item: number) {
    if (!this.multiSelect) {
      return this.setValue([item]);
    }

    const index = this.value().indexOf(item, 0);
    if (index == -1) {
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
    if (this._userParameterStore.get(this._key)) {
      return this._userParameterStore.get(this._key) as number[];
    }
    return this._defaultValue;
  }

  value(): number[] {
    return this.valueOfNumericSet();
  }

  get(): number[] {
    return this.valueOfNumericSet();
  }
}
