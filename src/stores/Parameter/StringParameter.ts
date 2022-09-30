import { makeObservable, observable, action } from "mobx";
import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

import ParameterValue from "./ParameterValue/ParameterValue";

interface IStringParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: string;
  plugin?: string;
  changedAtSection?: boolean;
}

export default class StringParameter extends BaseParameter {
  type: string = "string";
  parameterValue: ParameterValue<string>;

  constructor(params: IStringParameterParams) {
    super(params.userParameterStore, params.name, params.key, params.plugin);

    this.parameterValue = new ParameterValue<string>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as string;
      this.parameterValue.set(val);
    }

    makeObservable(this, {
      parameterValue: observable,
      setValue: action.bound,
    });
  }

  swapOnDeck(): boolean {
    return this.parameterValue.swapOnDeck();
  }

  public setValue(newValue: string): boolean {
    return this.parameterValue.setValue(newValue);
  }

  value(): string {
    return this.parameterValue.val;
  }

  get val(): string {
    return this.parameterValue.val;
  }
}
