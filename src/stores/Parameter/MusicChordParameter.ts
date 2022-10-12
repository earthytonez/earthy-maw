import UserParameterStore from "stores/UserParameter.store";
import BaseParameter from "./Base";

import { makeObservable, action, computed, observable } from "mobx";

import { ChordType } from "@tonaljs/tonal";
import { IMusicChord } from "Types";

interface IMusicChordParameterParams {
  userParameterStore: UserParameterStore;
  name: string;
  key: string;
  default: string;
  plugin?: string;
  changedAtSection?: boolean;
  onDeckValue?: string;
  description: string;
}

export default class MusicChordParameter extends BaseParameter {
  type: string = "string";
  changedAtSection: boolean = true;
  default: string;
  onDeckValue: string | undefined;
  _val: string;

  constructor(params: IMusicChordParameterParams) {
    super(
      params.userParameterStore,
      params.name,
      params.key,
      params.plugin,
      params.description
    );

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
      setOnDeckValue: action.bound,
      _setValue: action.bound,
      swapOnDeck: action.bound,
    });
  }

  swapOnDeck(): boolean {
    if (this.onDeckValue) {
      this._setValue(this.onDeckValue);
      this.onDeckValue = undefined;
      return true;
    }
    return false;
  }

  get valuePending(): boolean {
    return this.onDeckValue !== undefined;
  }

  setValue(newValue: string): boolean {
    console.log(
      `Running setValue for Music Chord Parameter ${this.changedAtSection}`
    );
    if (this.changedAtSection) {
      this.onDeckValue = newValue;
    } else {
      this._setValue(newValue);
    }
    return true;
  }

  setOnDeckValue(newValue: string): boolean {
    this.onDeckValue = newValue;
    return true;
  }

  _setValue(newValue: string): boolean {
    this.userParameterStore.set(this.key, newValue);
    this._val = newValue;
    return true;
  }

  value(): IMusicChord {
    return ChordType.get(this._val);
  }

  get val(): IMusicChord {
    return ChordType.get(this._val);
  }
}
