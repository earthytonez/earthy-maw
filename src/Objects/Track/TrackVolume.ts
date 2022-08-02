import { makeObservable, computed, action } from "mobx";

import * as Tone from "tone";

export default class TrackVolume {
  _muted: boolean = false;
  _vol = new Tone.Volume(0);
  saveTracks: Function;

  set muted(val: boolean) {
    this._muted = val;
    this.saveTracks();
  }

  set vol(val: Tone.Volume) {
    this._vol = val;
    this.saveTracks();
  }

  get muted(): boolean {
    return this._muted;
  }

  get vol(): Tone.Volume {
    return this._vol;
  }

  constructor(saveTracks: Function) {
    this.saveTracks = saveTracks;

    makeObservable(this, {
      muted: computed,
      vol: computed,
      raiseVolume: action.bound,
      setVolume: action.bound,
      lowerVolume: action.bound,
      toggleMute: action.bound,
    });
  }
  raiseVolume = () => {
    this._vol.volume.value = this._vol.volume.value + 1;
  };

  lowerVolume = () => {
    this._vol.volume.value = this._vol.volume.value - 1;
  };

  setVolume(newValue: number) {
    this._vol.volume.value = newValue;
  }

  toggleMute = () => {
    this._vol.mute = !this._vol.mute;
    this._muted = this._vol.mute;
  };

  get volume() {
    return this._vol.volume.value;
  }
}
