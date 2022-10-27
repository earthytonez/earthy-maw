import BaseParameter, { IBaseParameterParams } from "./Base";

import { IMusicKey } from "Types";
import { makeObservable, action, computed, observable } from "mobx";
import { debug } from "../../Util/logger";

interface IMusicKeyParameterParams extends IBaseParameterParams {
  default: string;
  onDeckValue?: IMusicKey | undefined;
}

export default class MusicKeyParameter extends BaseParameter {
  type: string = "string";
  default: string = "";
  changedAtSection: boolean = false;
  onDeckValue: string | undefined;
  _val: string;

  constructor(params: IMusicKeyParameterParams) {
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

  swapOnDeck(): boolean {
    debug("MUSIC_KEY_PARAMETER", `swapOnDeck ${this.onDeckValue}`);
    if (this.onDeckValue) {
      this._setValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  setOnDeckValue(newValue: string): boolean {
    this.onDeckValue = newValue as IMusicKey;
    debug("MUSIC_KEY_PARAMETER", `setOnDeckValue ${this.onDeckValue}`);
    return true;
  }

  get valuePending(): boolean {
    debug("MUSIC_KEY_PARAMETER", `valuePending ${this.onDeckValue}`);
    return this.onDeckValue !== undefined;
  }

  _setValue(newValue: string): boolean {
    debug("MUSIC_KEY_PARAMETER", `setValue ${this.onDeckValue}`);
    this.userParameterStore.set(this.key, newValue);
    this._val = newValue;
    return true;
  }

  setValue(newValue: string): boolean {
    debug("MUSIC_KEY_PARAMETER", `setvalue ${this.onDeckValue}`);
    this.onDeckValue = newValue;
    return true;
  }

  value(): IMusicKey {
    if (this.userParameterStore.get(this.key)) {
      let name = this.userParameterStore.get(this.key) as string;
      return name as IMusicKey;
    }
    return this.default as IMusicKey;
  }

  get val(): IMusicKey {
    return this._val as IMusicKey;
  }
}
