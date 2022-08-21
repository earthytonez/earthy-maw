import * as Tone from "tone";

import { makeObservable, action, observable, autorun } from "mobx";

import Track from "../Objects/Track";

import { debug, info } from '../Util/logger';
import RootStore from "./Root.store";


const bluebird = require("bluebird");

export default class TrackStore {
  audioContext: Tone.BaseContext;
  tracks: Track[] = [];
  rootStore: RootStore;

  addTrack() {
    this.tracks.push(
      new Track(
        this.tracks.length,
        this.audioContext,
        this.rootStore.musicFeaturesStore,
        this
      )
    );
    this.saveTracks();
    this.tracks[this.tracks.length - 1]!.setLoading(false);
  }

  removeTrack(trackID: number) {
    this.tracks = this.tracks.filter((track) => track.id !== trackID);
    this.saveTracks();
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }
  
  emptyTracks() {
    return (this.tracks === [] || this.tracks.length === 0 || JSON.stringify(this.tracks) === '[{"id":0,"slug":"track-0"},{"id":1,"slug":"track-1"}]')
  }

  saveTracks() {
    if (this.emptyTracks && this.emptyTracks()) {
      debug("LOADSAVETRACKS", "Tried to save empty 'tracks'");
      return;
    }

    info("LOADSAVETRACKS", `Saving tracks: ${JSON.stringify(this.tracks)}`)
    localStorage.setItem("tracks", JSON.stringify(this.tracks));
  }

  initialize() {
    this.tracks = [
      new Track(0, this.audioContext, this.rootStore.musicFeaturesStore, this),
      new Track(1, this.audioContext, this.rootStore.musicFeaturesStore, this),
    ];
    this.tracks[0]!.setLoading(false);
    this.tracks[1]!.setLoading(false);
  }

  loadFromURL() {
    let urlSearchParams = new URLSearchParams(window.location.search);

    let track: any = {};

    for (const [key, value] of urlSearchParams.entries()) {
      track[key] = value;
    }

    for (let i = 0; i <= 100; i++) {
      if (track[`synth[${i}]`] ||  track[`seq[${i}]`]) {
        this.tracks.push(new Track(0, this.audioContext, this.rootStore.musicFeaturesStore, this, {
          synth: track[`synth[${i}]`],
          sequencer: track[`seq[${i}]`]
        }))
      }
  
    }
  }
  
  load(tracksFromLocalStore: any[]) {
    const loadTracks = async () => {
      if (tracksFromLocalStore && tracksFromLocalStore.length > 0) {
        let trackObjects: Track[] = await bluebird.map(tracksFromLocalStore,
          async (trackData: any, i: number) => {
            let t = new Track(
              i,
              this.audioContext,
              this.rootStore.musicFeaturesStore,
              this
            );
            await t.load(trackData);
            return t;
          }
        );
        this.setTracks(trackObjects);
      } else {
        this.initialize();
      }
    };

    // http://localhost:3000/?synth=kick&seq=fouronthefloor
    if (window.location.search.length > 0) {
      this.loadFromURL();
    } else {
      loadTracks();
    }
  }

  checkLocalStorage() {
    info("LOADSAVETRACKS", "Loading Tracks from Local Storage");
    let _tracks = localStorage.getItem("tracks");
    let tracks;
    if (_tracks !== "undefined") {
      tracks = JSON.parse(_tracks!);
    }
    debug("LOADSAVETRACKS", `Tracks = ${JSON.stringify(tracks)}`)
    this.load(tracks);
  }

  constructor(rootStore: RootStore, audioContext: Tone.BaseContext) {
    this.audioContext = audioContext;
    this.rootStore = rootStore;

    this.checkLocalStorage();

    autorun(() => {
      this.saveTracks();
    });

    makeObservable(this, {
      tracks: observable,
      checkLocalStorage: action.bound,
      addTrack: action.bound,
      saveTracks: action.bound,
      setTracks: action.bound
    });
  }
}
