import { makeObservable, computed, action } from "mobx";

import Track from "../Track";

/* The TrackOctaves class is a class that contains a list of octaves.  TrackOctaves contains saveable
data. */
export default class TrackOctaves {
  private _octaves = [1, 2, 3, 4, 5, 6, 7, 8];
  private _saveTracks: Function;
  private _track?: Track;

  /**
   * load is used when loading the track information from a saved file.
   *
   * @param {any} loadedOctaves - any
   */
  load(loadedOctaves: any) {
    if (loadedOctaves) {
      this._octaves = loadedOctaves._octaves;
    }
  }

  val() {
    return this._octaves;
  }

  set octaves(val: number[]) {
    this._octaves = val;
    this._saveTracks();
  }

  get octaves(): number[] {
    return this._octaves;
  }

  _setOctaves(octaves: number[]) {
    console.log(`setOctaves ${octaves}`);

    this._octaves = octaves;
  }

  private _isMultiOctave() {
    switch (this._track?.sequencer?.sequencerLoader?.type) {
      case "step":
        return false;
      case "drone":
        return true;
      case "randomStep":
        return true;
      case "arpeggiator":
        return true;
    }
    return true;
  }

  toggleOctave(octave: number) {
    if (this._isMultiOctave()) {
      if (this._octaves.includes(octave)) {
        const index = this._octaves.indexOf(octave, 0);
        if (index > -1) {
          this._octaves.splice(index, 1);
        }
        this._saveTracks();
      } else {
        this._octaves.push(octave);
        this._setOctaves(this._octaves);
      }
    } else {
      this._setOctaves([octave]);
    }
  }

  constructor(saveTracks: Function, track?: any) {
    this._saveTracks = saveTracks;
    this._track = track;

    makeObservable(this, {
      octaves: computed,
      _setOctaves: action.bound,
      toggleOctave: action.bound,
    });
  }
}
