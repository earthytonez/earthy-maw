import { makeObservable, observable, computed, action } from "mobx";
import UserParameterStore from "stores/UserParameter.store";
export default class ParameterValue<
  T extends string | number | boolean | Array<string | number>
> {
  onDeckValue: T | undefined;

  swapOnDeck() {
    if (this.onDeckValue) {
      this.writeValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  constructor(
    private userParameterStore: UserParameterStore,
    private key: string,
    public _val: T,
    private changedAtSection: boolean
  ) {
    makeObservable(this, {
      _val: observable,
      setValue: action.bound,
      set: action.bound,
      val: computed,
    });
  }

  private writeValue(newValue: T): boolean {
    this.userParameterStore.set(this.key, newValue);
    this._val = newValue;
    return true;
  }

  public setValue(newValue: T) {
    if (this.changedAtSection) {
      this.onDeckValue = newValue;
      return true;
    }
    this.writeValue(newValue);
    return true;
  }

  set(val: T) {
    this._val = val;
  }

  get val(): T {
    return this._val;
  }
}
