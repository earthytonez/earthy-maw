import TrackStore from "./Track.store.ts";
import MusicFeaturesStore from "./MusicFeatures.store.ts";

import * as Tone from "tone";


export default class RootStore {
  trackStore: TrackStore;
  musicFeaturesStore: MusicFeaturesStore;
  audioContext: any;

  constructor() {
    this.audioContext = new AudioContext();
    Tone.setContext(this.audioContext);

    this.trackStore = new TrackStore(this, this.audioContext);
    this.musicFeaturesStore = new MusicFeaturesStore(this, this.audioContext);
  }
}
