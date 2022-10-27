import { makeObservable, observable, action } from "mobx";

import BaseParameter, {
  IBaseParameterParams,
  ParameterFieldTypes,
} from "./Base";

import ParameterValue from "./ParameterValue/ParameterValue";

interface INumericParameterParams extends IBaseParameterParams {
  default: number;
  min: number;
  max: number;
  description: string;
}

export default class NumericParameter extends BaseParameter {
  type: string = "numeric";
  fieldType: ParameterFieldTypes = "slider";
  parameterValue: ParameterValue<number>;

  constructor(params: INumericParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.fieldOptions = {
      min: params.min,
      max: params.max,
    };

    this.plugin = params.plugin;

    this.parameterValue = new ParameterValue<number>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as number;
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

  public setValue(newValue: number): boolean {
    return this.parameterValue.setValue(newValue);
  }

  decrement() {
    this.parameterValue.setValue(this.val - 1);
  }

  increment() {
    this.parameterValue.setValue(this.val + 1);
  }

  greaterValue(): number {
    if (!this.parameterValue.onDeckValue) {
      return this.val;
    }
    if (this.val > this.parameterValue.onDeckValue) {
      return this.val;
    }
    return this.parameterValue.onDeckValue;
  }

  value(): number {
    return this.parameterValue.val;
  }

  get val(): number {
    return this.parameterValue.val;
  }
}

// import UserParameterStore from "stores/UserParameter.store";
// import BaseParameter, { ParameterFieldTypes } from "./Base";

// interface INumericParameterParams {
//   userParameterStore: UserParameterStore;
//   name: string;
//   key: string;
//   default: number;
//   plugin?: string;
//   changedAtSection?: boolean;
//   onDeckValue?: number;
// }

// export default class NumericParameter extends BaseParameter {
//   type: string = "numeric";
//   fieldType: ParameterFieldTypes = "slider";
//   plugin?: string;
//   default: number;
//   onDeckValue: number | undefined; // onDeckValue is a string representation of the music scale ('name');
//   userParameterStore: UserParameterStore;
//   _val: number;

//   constructor(params: INumericParameterParams) {
//     super(params.userParameterStore, params.name, params.key, params.plugin, params.description);

//     this.default = params.default;
//     this.plugin = params.plugin;
//     this.userParameterStore = params.userParameterStore;
//     if (params.changedAtSection) {
//       this.changedAtSection = params.changedAtSection;
//     }

//     this.default = params.default;
//     if (this.userParameterStore.has(this.key)) {
//       this._val = this.userParameterStore.get(this.key) as number;
//     } else {
//       this._val = params.default;
//     }

//     this.fieldOptions = {
//       min: 0,
//       max: 100,
//       current: this.numberValue(),
//     };
//   }

//   get valuePending(): boolean {
//     return this.onDeckValue !== undefined;
//   }

//   swapOnDeck(): boolean {
//     if (this.onDeckValue) {
//       this.writeValue(this.onDeckValue);
//       this.onDeckValue = undefined;
//       return true;
//     }
//     return false;
//   }

//   public setValue(newValue: number): boolean {
//     if (this.changedAtSection) {
//       this.onDeckValue = newValue;
//       return true;
//     }
//     this.writeValue(newValue);
//     return true;
//   }

//   numberValue(): number {
//     console.log(`Getting Numeric value from key ${this.key}`);
//     if (this.userParameterStore.get(this.key)) {
//       return this.userParameterStore.get(this.key) as number;
//     }
//     return this.default;
//   }

//   decrement() {
//     this.setValue(this.numberValue() - 1);
//   }

//   increment() {
//     this.setValue(this.numberValue() + 1);
//   }

//   value(): number {
//     return this.numberValue();
//   }

//   private writeValue(newValue: number): boolean {
//     this.userParameterStore.set(this.key, newValue);
//     this._val = newValue;
//     return true;
//   }

//   get val(): number {
//     return this.numberValue();
//   }

//   get(): number {
//     return this.numberValue();
//   }
// }
