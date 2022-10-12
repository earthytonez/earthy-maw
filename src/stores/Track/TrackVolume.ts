import { makeObservable, computed, action } from "mobx";
import * as Tone from "tone";

import UserParameterStore from "stores/UserParameter.store";
import Track from "../Track";
import NumericParameter from "stores/Parameter/NumericParameter";

const DEFAULT_VOLUME = 0;

export default class TrackVolume {
  _muted: boolean = false;
  _vol: Tone.Volume;

  parameter: NumericParameter;

  // load(loadedVolume: any) {
  //   if (loadedVolume?.vol?.volume?.value) {
  //     this.setVolume(loadedVolume.vol.volume.value);
  //   }
  //   this.muted = !!loadedVolume.muted;
  // }

  val() {
    return this._vol.volume.value;
  }

  set muted(val: boolean) {
    this._muted = val;
  }

  set vol(val: Tone.Volume) {
    this._vol = val;
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

  toJSON() {
    return {
      vol: this._vol,
    };
  }

  get userParameterKey() {
    return `track.${this.track.id}.track.volume`;
  }

  initializeParameter(): NumericParameter {
    return new NumericParameter({
      userParameterStore: this.userParameterStore,
      name: "Volume",
      key: this.userParameterKey,
      default: DEFAULT_VOLUME,
      description: "Volume for the track",
      min: -64,
      max: 6,
    });
  }

  constructor(
    private userParameterStore: UserParameterStore,
    private track: Track,
    toneVolume?: Tone.Volume
  ) {
    if (toneVolume) {
      this._vol = toneVolume;
    } else {
      this._vol = new Tone.Volume(0);
    }

    this.parameter = this.initializeParameter();

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
