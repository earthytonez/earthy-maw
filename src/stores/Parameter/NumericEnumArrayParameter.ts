import BaseParameter, { IBaseParameterParams } from "./Base";

import ArrayParameterValue from "./ParameterValue/ArrayParameterValue";

interface INumericEnumArrayParameterParams extends IBaseParameterParams {
  default: number[];
  onDeckValue?: number[];
  multiSelect?: boolean;
  options: number[];
}

export default class NumericEnumArrayParameter extends BaseParameter {
  type: string = "set";
  default: number[] = [];
  multiSelect: boolean = false;
  parameterValue: ArrayParameterValue<number>;

  constructor(params: INumericEnumArrayParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.parameterValue = new ArrayParameterValue<number>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection
    );

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

  public swapOnDeck(): boolean {
    return this.parameterValue.swapOnDeck();
  }

  public setValue(newValue: number[]): boolean {
    return this.parameterValue.setValue(newValue);
  }

  value(): number[] {
    return this.parameterValue.val;
  }

  get val(): number[] {
    return this.parameterValue.val;
  }
}
