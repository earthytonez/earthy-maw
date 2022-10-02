import { makeObservable, observable, action } from "mobx";

import UserParameterStore from "stores/UserParameter.store";
import ParameterValue from "./ParameterValue";

export default class ArrayParameterValue<
  T extends string | number
> extends ParameterValue<T[]> {
  multiSelect: boolean = false;

  constructor(
    userParameterStore: UserParameterStore,
    key: string,
    _val: T[],
    changedAtSection: boolean,
    multiSelect?: boolean
  ) {
    super(userParameterStore, key, _val, changedAtSection);

    if (multiSelect) {
      this.multiSelect = multiSelect;
    }

    makeObservable(this, {
      multiSelect: observable,
      toggleItem: action.bound,
      addItem: action.bound,
      removeItem: action.bound,
    });
  }

  removeItem(item: T) {
    if (!this.multiSelect) {
      return;
    }

    let value = this.val;

    const index = value.indexOf(item, 0);
    if (index > -1) {
      value.splice(index, 1);
    }
    this.setValue(value);
    return;
  }

  addItem(item: T) {
    if (!this.multiSelect) {
      return this.setValue([item]);
    }

    const index = this.val.indexOf(item, 0);

    if (index === -1) {
      this.val.push(item);
    }

    this.setValue(this.val);
    return;
  }

  toggleItem(item: T) {
    if (this.val.includes(item)) {
      this.removeItem(item);
    } else {
      this.addItem(item);
    }
  }
}
