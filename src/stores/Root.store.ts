import Track from "../Objects/Track";
import TrackStore from "./Track.store";
import MusicFeaturesStore from "./MusicFeatures.store";

import { debug, error} from '../Util/logger';

import * as Tone from "tone";

export default class RootStore {
  trackStore: TrackStore;
  musicFeaturesStore: MusicFeaturesStore;
  audioContext: any;

  constructor() {
    console.log("Constructing Root Store");
    this.audioContext = new AudioContext();
    Tone.setContext(this.audioContext);

    this.musicFeaturesStore = new MusicFeaturesStore(this, this.audioContext);
    this.trackStore = new TrackStore(this, this.audioContext);

    this.startAudio();
  }

  repeatLoop(time) {
    const tracks = this.trackStore.tracks;

      if (tracks.length <= 0) return;
      tracks.forEach((track: Track, i: number) => {
        try {
          track.tick(this.musicFeaturesStore.beatNumber, time);
        } catch (err: any) {
          error("Error caught during track loop", err);
        }
      });
      this.musicFeaturesStore.incrementBeatNumber();  
  }

  startAudio() {
    debug("ROOTSTORE", "Starting Tone.Transport.scheduleRepeat");
    Tone.Transport.scheduleRepeat(this.repeatLoop.bind(this), "16n");
  }
}
