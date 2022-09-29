/*
 * A parameter is a modulatable feature of a Sequencer, Synthesizer, Track or the whole song.
 */

import IModulator from "../Modulator/IModulator";
import UserParameterStore from "stores/UserParameter.store";

export interface IBaseParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  changedAtSection?: boolean;
}
// export interface IParameter {
//   _value: string | number;
//   name: string;
//   slug?: string;
//   type?: string;
//   field?: string;
//   fieldType?: "slider";
//   fieldOptions?: {
//     min: number;
//     max: number;
//     current: number | string; // This could also be an enum?  Which should be a number or a string.
//   };
//   value: number | string;
//   set(newValue: string | number): boolean;
//   decrement(): null;
//   increment(): null;
// }

export type ParameterFieldTypes = "slider" | "radio" | "dial" | "arraySelector";

export default abstract class BaseParameter {
  abstract type: string;
  changedAtSection: boolean = false;
  _value: number | string | undefined;
  modulators: IModulator = [];
  plugin?: string;
  slug: string;
  field?: string;
  fieldType?: ParameterFieldTypes;
  fieldOptions?: {
    min?: number;
    max?: number;
    current: number | string; // This could also be an enum?  Which should be a number or a string.
    options?: number[] | string[];
  };

  constructor(
    protected userParameterStore: UserParameterStore,
    public name: string,
    protected key: string
  ) {
    this.slug = name.replaceAll(" ", "").toLowerCase();
    this.field = name.replaceAll(" ", "").toLowerCase();
  }

  /*
   * value gets the actual parameter data which should be decided based on three
   * values.
   *
   * 1. The default of the parameter.
   * 2. Any user changes to the value of the parameter.
   * 3. Any modulation changes to the value of the parameter.
   */
  numberValue(): number {
    return this.userParameterStore.get(this.key) as number;
  }
  stringValue(): string {
    return this.userParameterStore.get(this.key) as string;
  }

  numericSetValue(): number[] {
    return this.userParameterStore.get(this.key) as number[];
  }

  stringSetValue(): string[] {
    return this.userParameterStore.get(this.key) as string[];
  }

  abstract setValue(newValue: any): boolean;
  abstract get val(): any;
}
