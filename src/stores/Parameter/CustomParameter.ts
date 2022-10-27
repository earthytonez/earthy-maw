import BaseParameter, { IBaseParameterParams } from "./Base";

interface ICustomParameterParams<T> extends IBaseParameterParams {
  default: T;
  onDeckValue?: string;
}

export default class CustomParameter<
  T extends string | number | boolean | string[] | number[]
> extends BaseParameter {
  type: string = "string";
  default: T;
  onDeckValue?: T;
  changedAtSection: boolean = false;

  constructor(params: ICustomParameterParams<T>) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    if (params.changedAtSection)
      this.changedAtSection = params.changedAtSection;
    this.default = params.default;
  }

  setValue(newValue: T): boolean {
    this.userParameterStore.set(this.key, newValue);
    return true;
  }

  customValue(): T {
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as T;
    }
    return this.default;
  }

  value(): T {
    return this.customValue();
  }

  get val(): T {
    return this.customValue();
  }

  get(): T {
    return this.customValue();
  }
}
