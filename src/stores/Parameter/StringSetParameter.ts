import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

export default class StringSetParameter extends BaseParameter {
  type: string = "set";

  constructor(
    _userParameterStore: UserParameterStore,
    name: string,
    _key: string,
    private _defaultValue: string[],
    private multiSelect: boolean = true
  ) {
    super(_userParameterStore, name, _key);
  }

  setValue(newValue: string[]): boolean {
    this._userParameterStore.set(this._key, newValue);
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
    if (index == -1) {
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

  valueOfSet(): string[] {
    if (this._userParameterStore.get(this._key)) {
      return this._userParameterStore.get(this._key) as string[];
    }
    return this._defaultValue;
  }

  value(): string[] {
    return this.valueOfSet();
  }

  get(): string[] {
    return this.valueOfSet();
  }
}
