import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

interface IStringParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: string;
  plugin?: string;
  changedAtSection?: boolean;
  onDeckValue?: string;
}

export default class StringParameter extends BaseParameter {
  type: string = "string";
  default: string = "";
  changedAtSection: boolean = false;

  constructor(params: IStringParameterParams) {
    super(params.userParameterStore, params.name, params.key);

    this.default = params.default;
  }

  setValue(newValue: string): boolean {
    this.userParameterStore.set(this.key, newValue);
    return true;
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
