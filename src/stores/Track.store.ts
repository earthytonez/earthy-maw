import { makeObservable, action, observable, autorun } from "mobx";
import Track from "../Objects/Track.ts";
import RootStore from "./Root.store";

import pMap from "p-map";

export default class TrackStore {
  audioContext: any;
  tracks: Track[] = [];
  rootStore: RootStore;

  addTrack() {
    this.tracks.push(
      new Track(
        this.tracks.length,
        this.audioContext,
        this.rootStore.musicFeaturesStore
      )
    );
    localStorage.setItem("tracks", JSON.stringify(this.tracks));
    console.log(localStorage.getItem("tracks"));
    this.tracks[this.tracks.length - 1].setLoading(false);
  }

  removeTrack(trackIndex: number) {}

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  initialize() {
    this.tracks = [
      new Track(0, this.audioContext, this.rootStore.musicFeaturesStore),
      new Track(1, this.audioContext, this.rootStore.musicFeaturesStore),
    ];
    this.tracks[0].setLoading(false);
    this.tracks[1].setLoading(false);
  }

  load(tracksFromLocalStore: any[]) {
    const loadTracks = async () => {
      if (tracksFromLocalStore && tracksFromLocalStore.length > 0) {
        let trackObjects: Track[] = await pMap(
          tracksFromLocalStore,
          async (trackData, i) => {
            let t = new Track(
              i,
              this.audioContext,
              this.rootStore.musicFeaturesStore
            );
            await t.load(trackData);
            console.log(t);
            return t;
          }
        );
        this.setTracks(trackObjects);
      } else {
        this.initialize();
      }
    };

    loadTracks();
  }

  constructor(rootStore, audioContext) {
    let _tracks = localStorage.getItem("tracks");
    this.audioContext = audioContext;
    this.rootStore = rootStore;

    autorun(() => {
      localStorage.setItem("tracks", JSON.stringify(this.tracks));
    });

    let tracks = JSON.parse(_tracks);
    this.load(tracks);

    makeObservable(this, {
      tracks: observable,
      addTrack: action.bound,
    });
  }
}
