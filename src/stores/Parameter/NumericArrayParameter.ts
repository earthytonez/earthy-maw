import { makeObservable, observable, action } from "mobx";
import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

import ArrayParameterValue from "./ParameterValue/ArrayParameterValue";

interface INumericParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: number[];
  plugin?: string;
  changedAtSection?: boolean;
}

export default class NumericParameter extends BaseParameter {
  type: string = "numeric";
  parameterValue: ArrayParameterValue<number>;

  constructor(params: INumericParameterParams) {
    super(params.userParameterStore, params.name, params.key, params.plugin);

    this.parameterValue = new ArrayParameterValue<number>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as number[];
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

// interface INumericArrayParameterParams {
//   userParameterStore: UserParameterStore;
//   name: string;
//   key: string;
//   default: number[];
//   plugin?: string;
//   changedAtSection?: boolean;
//   onDeckValue?: number[];
//   multiSelect?: boolean;
// }

// export default class NumericArrayParameter extends BaseParameter {
//   type: string = "set";
//   default: number[] = [];
//   multiSelect: boolean = false;
//   _val: number[];

//   constructor(params: INumericArrayParameterParams) {
//     super(params.userParameterStore, params.name, params.key, params.plugin);

//     this.default = params.default;
//     this._val = params.default;
//     this.plugin = params.plugin;
//     this.userParameterStore = params.userParameterStore;
//     if (params.changedAtSection) {
//       this.changedAtSection = params.changedAtSection;
//     }
//     if (params.multiSelect) {
//       this.multiSelect = params.multiSelect;
//     }
//   }

//   setValue(newValue: number[]): boolean {
//     this.userParameterStore.set(this.key, newValue);
//     return true;
//   }

//   removeItem(item: string) {
//     if (!this.multiSelect) {
//       return;
//     }

//     let value = this.value();

//     const index = value.indexOf(item, 0);
//     if (index > -1) {
//       value.splice(index, 1);
//     }
//     this.setValue(value);
//     return;
//   }

//   addItem(item: number) {
//     if (!this.multiSelect) {
//       return this.setValue([item]);
//     }
//     const index = this.value().indexOf(item, 0);
//     if (index === -1) {
//       this.value().push(item);
//     }
//     this.setValue(this.value());
//     return;
//   }

//   toggleItem(item: number) {
//     if (this.value().includes(item)) {
//       this.removeItem(item);
//     } else {
//       this.addItem(item);
//     }
//   }

//   value(): number[] {
//     return this._val;
//   }

//   get val(): number[] {
//     return this._val;
//   }
// }
