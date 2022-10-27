import { makeObservable, observable, action } from "mobx";
import BaseParameter, { IBaseParameterParams } from "./Base";

import SetParameterValue from "./ParameterValue/SetParameterValue";

/*
 * A String Set parameter is a set of values that could be enabled or disabled.
 *
 */
interface IStringSetParams extends IBaseParameterParams {
  default: string[];
  multiSelect?: boolean;
}

export default class StringSet extends BaseParameter {
  type: string = "numeric";
  parameterValue: SetParameterValue<string>;

  constructor(params: IStringSetParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.parameterValue = new SetParameterValue<string>(
      params.userParameterStore,
      params.key,
      params.default,
      !!params.changedAtSection,
      params.multiSelect
    );

    if (this.userParameterStore.has(this.key)) {
      let val = this.userParameterStore.get(this.key) as string[];
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

  toggleItem(item: string) {
    this.parameterValue.toggleItem(item);
  }

  addItem(item: string) {
    this.parameterValue.addItem(item);
  }

  removeItem(item: string) {
    this.parameterValue.removeItem(item);
  }

  swapOnDeck(): boolean {
    return this.parameterValue.swapOnDeck();
  }

  public setValue(newValue: string[]): boolean {
    return this.parameterValue.setValue(newValue);
  }

  value(): string[] {
    return this.parameterValue.val;
  }

  get val(): string[] {
    return this.parameterValue.val;
  }
}

// interface IStringSetParameterParams {
//   userParameterStore: UserParameterStore;
//   name: string;
//   key: string;
//   default: string[];
//   plugin?: string;
//   changedAtSection?: boolean;
//   onDeckValue?: string[];
//   multiSelect?: boolean;
// }

// export default class StringSetParameter extends BaseParameter {
//   type: string = "set";
//   default: string[] = [];
//   multiSelect: boolean = false;

//   constructor(params: IStringSetParameterParams) {
//     super(params.userParameterStore, params.name, params.key);

//     this.default = params.default;
//     this.plugin = params.plugin;
//     this.userParameterStore = params.userParameterStore;
//     if (params.changedAtSection) {
//       this.changedAtSection = params.changedAtSection;
//     }
//     if (params.multiSelect) {
//       this.multiSelect = params.multiSelect;
//     }
//   }

//   setValue(newValue: string[]): boolean {
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

//   addItem(item: string) {
//     if (!this.multiSelect) {
//       return this.setValue([item]);
//     }
//     const index = this.value().indexOf(item, 0);
//     if (index == -1) {
//       this.value().push(item);
//     }
//     this.setValue(this.value());
//     return;
//   }

//   toggleItem(item: string) {
//     if (this.value().includes(item)) {
//       this.removeItem(item);
//     } else {
//       this.addItem(item);
//     }
//   }

//   valueOfSet(): string[] {
//     if (this.userParameterStore.get(this.key)) {
//       return this.userParameterStore.get(this.key) as string[];
//     }
//     return this.default;
//   }

//   value(): string[] {
//     return this.valueOfSet();
//   }

//   get val(): string[] {
//     return this.valueOfSet();
//   }

//   get(): string[] {
//     return this.valueOfSet();
//   }
// }
