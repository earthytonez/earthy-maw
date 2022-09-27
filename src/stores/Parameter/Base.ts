/*
 * A parameter is a modulatable feature of a Sequencer, Synthesizer, Track or the whole song.
 */

import IModulator from "../Modulator/IModulator";
import UserParameterStore from "stores/UserParameter.store";

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

export type ParameterFieldTypes = "slider" | "radio" | "dial" | "arraySelector"

export default abstract class BaseParameter {
  abstract type: string;
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
    protected _userParameterStore: UserParameterStore,
    public name: string,
    protected _key: string
  ) {
    this.slug = name.replaceAll(" ", "").toLowerCase();
    this.field = name.replaceAll(" ", "").toLowerCase();
  }

  abstract setValue(newValue: string | number | string[] | number[]): boolean;
  /*
   * value gets the actual parameter data which should be decided based on three
   * values.
   *
   * 1. The default of the parameter.
   * 2. Any user changes to the value of the parameter.
   * 3. Any modulation changes to the value of the parameter.
   */
  numberValue(): number {
    return this._userParameterStore.get(this._key) as number;
  }
  stringValue(): string {
    return this._userParameterStore.get(this._key) as string;
  }

  numericSetValue(): number[] {
    return this._userParameterStore.get(this._key) as number[];
  }

  stringSetValue(): string[] {
    return this._userParameterStore.get(this._key) as string[];
  }

  value(): string | number | number[] | string[] {
    return this.numberValue();
  }
}
