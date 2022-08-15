import { makeObservable, computed, action } from "mobx";

import * as Tone from "tone";

export default class TrackVolume {
  _muted: boolean = false;
  _vol: Tone.Volume;
  saveTracks: Function;

  load(loadedVolume: any) {
    if (loadedVolume?.vol?.volume?.value) {
      this.setVolume(loadedVolume.vol.volume.value);
    }
    this.muted = !!loadedVolume.muted;
  }

  val() {
    return this._vol.volume.value;
  }

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

  constructor(saveTracks: Function, toneVolume?: Tone.Volume) {
    this.saveTracks = saveTracks;

    if (toneVolume) {
      this._vol = toneVolume;
    } else {
      this._vol = new Tone.Volume(0);
    }

    makeObservable(this, {
      muted: computed,
      vol: computed,
      raiseVolume: action.bound,
      setVolume: action.bound,
      lowerVolume: action.bound,
      toggleMute: action.bound,
    });
  }
}
