import { makeObservable, observable, action } from "mobx";

import BaseParameter, { IBaseParameterParams } from "./Base";

import SetParameterValue from "./ParameterValue/SetParameterValue";

/*
 * A Numeric Set Parameter is a set of parameters that could be enabled, for example
 * The list of available octaves is a numeric set parameter because you can have
 * more than one octave selected, and octaves always come from a specific list.
 */
interface INumericSetParameterParams extends IBaseParameterParams {
  default: number[];
  multiSelect?: boolean;
}

export default class NumericSetParameter extends BaseParameter {
  type: string = "numeric_set";
  parameterValue: SetParameterValue<number>;

  constructor(params: INumericSetParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.parameterValue = new SetParameterValue<number>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection,
      !!params.multiSelect
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as number[];
      this.parameterValue.set(val);
    }

    makeObservable(this, {
      parameterValue: observable,
      setValue: action.bound,
      toggleItem: action.bound,
      addItem: action.bound,
      removeItem: action.bound,
    });
  }

  toggleItem(item: number) {
    this.parameterValue.toggleItem(item);
  }

  addItem(item: number) {
    this.parameterValue.addItem(item);
  }

  removeItem(item: number) {
    this.parameterValue.removeItem(item);
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

// import UserParameterStore from "stores/UserParameter.store";
// import BaseParameter from "./Base";

// interface INumericSetParameterParams {
//   name: string;
//   key: string;
//   userParameterStore: UserParameterStore;
//   default: number[];
//   multiSelect?: boolean;
//   onDeckValue?: number[] | undefined;
//   changedAtSection?: boolean;
//   plugin?: string;
// }

// export default class NumericSetParameter extends BaseParameter {
//   type: string = "numeric_set";
//   private default: number[];
//   private multiSelect: boolean = true;
//   onDeckValue: number[] | undefined;
//   fieldOptions: any;
//   _val: number[];

//   constructor(params: INumericSetParameterParams) {
//     super(params.userParameterStore, params.name, params.key, params.plugin, params.description);
//     this.default = params.default;

//     if (this.userParameterStore.has(this.key)) {
//       this._val = this.userParameterStore.get(this.key) as number[];
//     } else {
//       this._val = params.default;
//     }

//     if (params.multiSelect) {
//       this.multiSelect = params.multiSelect;
//     }

//     if (params.changedAtSection) {
//       this.changedAtSection = params.changedAtSection;
//     }
//   }

//   setValue(newValue: number[]): boolean {
//     this.userParameterStore.set(this.key, newValue);
//     this.onDeckValue = newValue;
//     return true;
//   }

//   removeItem(item: number) {
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

//   swapOnDeck(): boolean {
//     if (this.onDeckValue) {
//       this.setValue(this.onDeckValue);
//       this._val = this.onDeckValue;
//       this.onDeckValue = undefined;
//       return true;
//     }
//     return false;
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
