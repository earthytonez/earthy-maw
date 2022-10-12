// import UserParameterStore from "stores/UserParameter.store";
// import BaseParameter from "./Base";

// interface ICustomParameterParams<T> {
//   userParameterStore: UserParameterStore;
//   name: string;
//   key: string;
//   default: T;
//   plugin?: string;
//   changedAtSection?: boolean;
//   onDeckValue?: string;
// }

// export default class CustomParameter<T> extends BaseParameter {
//   type: string = "string";
//   default: T;
//   onDeckValue?: T;
//   changedAtSection: boolean = false;

//   constructor(params: ICustomParameterParams<T>) {
//     super(params.userParameterStore, params.name, params.key, params.plugin, params.description);

//     if (params.changedAtSection)
//       this.changedAtSection = params.changedAtSection;
//     this.default = params.default;
//   }

//   setValue(newValue: T): boolean {
//     this.userParameterStore.set(this.key, newValue);
//     return true;
//   }

//   customValue(): T {
//     if (this.userParameterStore.get(this.key)) {
//       return this.userParameterStore.get(this.key) as T;
//     }
//     return this.default;
//   }

//   value(): T {
//     return this.customValue();
//   }

//   get(): T {
//     return this.customValue();
//   }
// }
