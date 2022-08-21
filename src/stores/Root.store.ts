import Track from "../Objects/Track";
import TrackStore from "./Track.store";
import MusicFeaturesStore from "./MusicFeatures.store";

import { debug, error} from '../Util/logger';

import * as Tone from "tone";

export default class RootStore {
  trackStore: TrackStore;
  musicFeaturesStore: MusicFeaturesStore;
  audioContext: AudioContext;

  constructor() {
    console.log("Constructing Root Store");
    /* Initialize tone.js */
    this.audioContext = new AudioContext();
    Tone.setContext(this.audioContext);

    /* Initialize Stores */
    this.musicFeaturesStore = new MusicFeaturesStore(this, Tone.getContext());
    this.trackStore         = new TrackStore(this, Tone.getContext());

    /* Start */
    this.startAudio();
  }

  repeatLoop(time: number) {
    this.musicFeaturesStore.changeFeatures();
    const tracks = this.trackStore.tracks;

      if (tracks.length <= 0) return;
      tracks.forEach((track: Track, _i: number) => {
        let p = track.tick(this.musicFeaturesStore.beatMarker, time);
        p.catch ((err: any) => {
          error("Error caught during track loop", err);
        });
      });
      this.musicFeaturesStore.incrementBeatNumber();  
  }

  startAudio() {
    debug("ROOTSTORE", "Starting Tone.Transport.scheduleRepeat");
    Tone.Transport.scheduleRepeat(this.repeatLoop.bind(this), "16n");
  }
}
