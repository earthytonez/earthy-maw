import { makeObservable, computed, action } from "mobx";

import Track from "../Track";

const DEFAULT_OCTAVES = [3, 4, 5, 6]
const DEFAULT_OCTAVE = [4]

/* The TrackOctaves class is a class that contains a list of octaves.  TrackOctaves contains saveable
data. */
export default class TrackOctaves {
  private _octaves = DEFAULT_OCTAVES;
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
    if (!this._octaves) {
      this.initialize();
    }
  }

  toggleOctave(octave: number) {
    if (this._isMultiOctave()) {
      this.toggleMultiOctave(octave);
    } else {
      this._setOctaves([octave]);
    }
  }

  toJSON() {
    return {
      _octaves: this._octaves
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

  private initialize() {
    if (this._isMultiOctave()) {
      this._octaves = DEFAULT_OCTAVES;
    } else {
      this._octaves = DEFAULT_OCTAVE;
    }
  }

  _setOctaves(octaves: number[]) {
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

  private removeOctaveFromList(octave: number) {
    const index = this._octaves.indexOf(octave, 0);
    if (index > -1) {
      this._octaves.splice(index, 1);
    }
    this._saveTracks();
  }

  private addOctaveToList(octave: number) {
    this._octaves.push(octave);
    this._setOctaves(this._octaves);
  }

  private toggleMultiOctave(octave: number) {
    if (this._octaves.includes(octave)) {
      this.removeOctaveFromList(octave);
    } else {
      this.addOctaveToList(octave);
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
