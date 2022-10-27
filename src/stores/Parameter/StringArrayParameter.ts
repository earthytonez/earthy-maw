import BaseParameter, { IBaseParameterParams } from "./Base";

interface IStringSetParameterParams extends IBaseParameterParams {
  default: string[];
  onDeckValue?: string[];
  multiSelect?: boolean;
}

export default class StringSetParameter extends BaseParameter {
  type: string = "set";
  default: string[] = [];
  multiSelect: boolean = false;

  constructor(params: IStringSetParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.default = params.default;
    this.plugin = params.plugin;
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
    if (this.userParameterStore.get(this.key)) {
      return this.userParameterStore.get(this.key) as string[];
    }
    return this.default;
  }

  value(): string[] {
    return this.valueOfSet();
  }

  get val(): string[] {
    return this.valueOfSet();
  }

  get(): string[] {
    return this.valueOfSet();
  }
}
