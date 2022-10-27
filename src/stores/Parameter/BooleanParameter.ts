import { makeObservable, observable, action } from "mobx";
import BaseParameter, { IBaseParameterParams } from "./Base";

import ParameterValue from "./ParameterValue/ParameterValue";

interface IBooleanParameterParams extends IBaseParameterParams {
  default: boolean;
}

export default class BooleanParameter extends BaseParameter {
  type: string = "numeric";
  parameterValue: ParameterValue<boolean>;

  constructor(params: IBooleanParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.parameterValue = new ParameterValue<boolean>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as boolean;
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

  public setValue(newValue: boolean): boolean {
    return this.parameterValue.setValue(newValue);
  }

  value(): boolean {
    return this.parameterValue.val;
  }

  get val(): boolean {
    return this.parameterValue.val;
  }
}
// import UserParameterStore from "stores/UserParameter.store";
// import BaseParameter, { ParameterFieldTypes } from "./Base";

// interface IBooleanParameterParams {
//   userParameterStore: UserParameterStore;
//   name: string;
//   key: string;
//   default: boolean;
//   plugin?: string;
//   changedAtSection?: boolean;
//   onDeckValue?: boolean;
// }

// export default class BooleanParameter extends BaseParameter {
//   type: string = "numeric";
//   fieldType: ParameterFieldTypes = "slider";
//   default: boolean;
//   onDeckValue: boolean | undefined; // onDeckValue is a string representation of the music scale ('name');
//   userParameterStore: UserParameterStore;
//   _val: boolean;

//   constructor(params: IBooleanParameterParams) {
//     super(params.userParameterStore, params.name, params.key, params.plugin, params.description);

//     this.default = params.default;
//     this._val = params.default;
//     this.plugin = params.plugin;
//     this.userParameterStore = params.userParameterStore;
//     if (params.changedAtSection) {
//       this.changedAtSection = params.changedAtSection;
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
//       this.setValue(this.onDeckValue);
//       this._val = this.onDeckValue;
//       this.onDeckValue = undefined;
//       return true;
//     }
//     return false;
//   }

//   setValue(newValue: boolean): boolean {
//     this.userParameterStore.set(this.key, newValue);
//     this._val = newValue;
//     return true;
//   }

//   value(): boolean {
//     return this._val;
//   }

//   get val(): boolean {
//     return this._val;
//   }
// }
