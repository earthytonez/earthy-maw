import BaseParameter, { IBaseParameterParams } from "./Base";
import { makeObservable, action, computed, observable } from "mobx";

import { ScaleType } from "@tonaljs/tonal";
import { IMusicScale } from "Types";

import { debug } from "../../Util/logger";

interface IMusicScaleParameterParams extends IBaseParameterParams {
  default: string;
  onDeckValue?: string;
}

export default class MusicScaleParameter extends BaseParameter {
  type: string = "string";
  default: string = "";
  onDeckValue: string | undefined; // onDeckValue is a string representation of the music scale ('name');
  changedAtSection: boolean = true;
  _val: string;

  constructor(params: IMusicScaleParameterParams) {
    super({
      userParameterStore: params.userParameterStore,
      name: params.name,
      key: params.key,
      plugin: params.plugin,
      description: params.description,
      style: params.style,
    });

    this.default = params.default;
    if (this.userParameterStore.has(this.key)) {
      this._val = this.userParameterStore.get(this.key) as string;
    } else {
      this._val = params.default;
    }

    makeObservable(this, {
      _val: observable,
      onDeckValue: observable,
      valuePending: computed,
      val: computed,
      setValue: action.bound,
      _setValue: action.bound,
      swapOnDeck: action.bound,
    });
  }

  setValue(newValue: string): boolean {
    this.onDeckValue = newValue;
    debug(
      "MUSIC_SCALE_PARAMETER",
      `setValue: ${newValue}, ${this.onDeckValue}`
    );
    return true;
  }

  get valuePending(): boolean {
    return this.onDeckValue !== undefined;
  }

  _setValue(newValue: string): boolean {
    this.userParameterStore.set(this.key, newValue);
    this._val = newValue;
    return true;
  }

  swapOnDeck(): boolean {
    debug("MUSIC_SCALE_PARAMETER", `swapOnDeck: ${this.onDeckValue}`);
    if (this.onDeckValue) {
      this._setValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  setOnDeckValue(newValue: string): boolean {
    this.onDeckValue = newValue;
    return true;
  }

  value(): IMusicScale {
    return ScaleType.get(this._val);
  }

  get val(): IMusicScale {
    return ScaleType.get(this._val);
  }
}
