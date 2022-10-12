import { makeObservable, computed, action } from "mobx";

import BooleanParameter from "../Parameter/BooleanParameter";
import NumericSetParameter from "../Parameter/NumericSetParameter";

import UserParameterStore from "../UserParameter.store";

// const ALL_OCTAVES = [1, 2, 3, 4, 5, 6, 7, 8];
const DEFAULT_OCTAVES = [3, 4, 5, 6];
const DEFAULT_OCTAVE = [4];

/* The TrackOctaves class is a class that contains a list of octaves.  TrackOctaves contains saveable
data. */
export default class TrackOctaves {
  parameter: NumericSetParameter;
  // /**
  //  * load is used when loading the track information from a saved file.
  //  *
  //  * @param {any} loadedOctaves - any
  //  */
  // load(loadedOctaves: any) {
  //   if (loadedOctaves) {
  //     this._octaves = loadedOctaves._octaves;
  //   }
  //   if (!this._octaves) {
  //     this.initialize();
  //   }
  // }

  toggleOctave(octave: number) {
    if (this._isMultiOctave()) {
      this.toggleMultiOctave(octave);
    } else {
      this._setOctaves([octave]);
    }
  }

  val(): number[] {
    return this.octaves;
  }

  userParameterKey(parameter: string) {
    return `track.${this.track.id}.track.${parameter}`;
  }

  defaultValue() {
    if (this._isMultiOctave()) {
      return DEFAULT_OCTAVES;
    }
    return DEFAULT_OCTAVE;
  }

  initializeParameter() {
    new BooleanParameter({
      userParameterStore: this.userParameterStore,
      name: "Change Octave on Note",
      key: this.userParameterKey("change_octave_on_note"),
      default: false,
      description:
        "Whether or not the octave should change per note or per section.",
    });
    return new NumericSetParameter({
      userParameterStore: this.userParameterStore,
      name: "Octaves",
      key: this.userParameterKey("octave"),
      default: this.defaultValue(),
      multiSelect: this._isMultiOctave(),
      description: "Octaves that could be selected to be played for sequencer.",
    });
  }

  set octaves(val: number[]) {
    this.parameter.setValue(val);
  }

  get octaves(): number[] {
    console.log(`TrackOctaves`, `TRACK_OCTAVES ${this.parameter.value()}`);
    return this.parameter.value();
    // console.log("GET OCTAVES");
    // let octaves = this.userParameterStore.get(
    //   this.userParameterKey
    // ) as number[];
    // console.log(`GET OCTAVES ${octaves}`);
    // if (octaves) {
    //   return octaves;
    // }
    // if (this._isMultiOctave()) {
    //   console.log("GET OCTAVES DEFAULT_OCTAVES");
    //   return DEFAULT_OCTAVES;
    // }
    // console.log("GET OCTAVES DEFAULT_OCTAVE");
    // return DEFAULT_OCTAVE;
  }

  _setOctaves(octaves: number[]) {
    this.octaves = octaves;
  }

  private _isMultiOctave() {
    switch (this.track?.sequencer?.sequencerLoader?.type) {
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

  public removeOctaveFromList(octave: number) {
    this.parameter.removeItem(octave);
  }

  public addOctaveToList(octave: number) {
    this.parameter.addItem(octave);
  }

  private toggleMultiOctave(octave: number) {
    this.parameter.toggleItem(octave);
  }

  constructor(
    private userParameterStore: UserParameterStore,
    private track?: any
  ) {
    this.parameter = this.initializeParameter();

    makeObservable(this, {
      octaves: computed,
      _setOctaves: action.bound,
      toggleOctave: action.bound,
    });
  }
}
