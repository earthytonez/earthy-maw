import { makeObservable, computed, observable, action } from "mobx";
import * as Tone from "tone";

import Arranger from "./Arranger.ts";
import Sequencer from "./Sequencer.ts";
import Synthesizer from "./Synthesizer.ts";
import { getSynthesizer } from "./SynthesizerFactory.ts";

import MusicFeaturesStore from "../stores/MusicFeatures.store";
import TrackStore from "../stores/Track.store";

import { debug, error } from "../Util/logger.ts";

export default class Track {
  arranger: Arranger;
  sequencer: Sequencer;
  synthesizer: Synthesizer;
  vol: Tone.Volume;
  id: number;
  slug: string;
  muted: boolean = false;

  musicFeaturesStore: MusicFeaturesStore;
  trackStore: TrackStore;

  remove = () => {
    this.trackStore.removeTrack(this.id);
  };

  raiseVolume = () => {
    this.vol.volume.value = this.vol.volume.value + 1;
  };

  lowerVolume = () => {
    this.vol.volume.value = this.vol.volume.value - 1;
  };

  setVolume(newValue: number) {
    this.vol.volume.value = newValue;
  }

  toggleMute = () => {
    this.vol.mute = !this.vol.mute;
    this.muted = this.vol.mute;
  };

  get volume() {
    return this.vol.volume.value;
  }

  async tick(beatNumber, time) {
    if (!this.sequencer) return;
    if (!this.musicFeaturesStore) {
      return error("this.musicFeaturesStore is not set");
    }

    await this.sequencer.play(
      this.musicFeaturesStore.musicKey,
      this.musicFeaturesStore.musicScale,
      this.musicFeaturesStore.musicChord,
      beatNumber,
      time
    );
  }

  async assignMachine(machineType: string, machine: any) {
    this[machineType] = machine;
    if (this.sequencer && this.synthesizer) {
      this.sequencer.bindSynth(this.synthesizer);
    }
    if (machineType === "sequencer") {
      await this.sequencer.load();
    }
    if (machineType === "synthesizer") {
      this.synthesizer.attachVolume(this.vol);
    }
  }

  sequencerJSON() {
    if (this.sequencer) {
      return {
        type: this.sequencer.type,
      };
    }
    return undefined;
  }

  synthesizerJSON() {
    if (this.synthesizer) {
      return {
        slug: this.synthesizer.slug,
      };
    }
    return undefined;
  }

  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      arranger: this.arranger,
      sequencer: this.sequencerJSON(),
      synthesizer: this.synthesizerJSON(),
    };
  }

  setLoading(loading: boolean) {
    if (this.sequencer !== undefined) this.sequencer.setLoading(loading);
    if (this.arranger !== undefined) this.arranger.setLoading(loading);
    if (this.synthesizer !== undefined) this.synthesizer.setLoading(loading);
  }

  async load(trackData: any) {
    try {
      debug("TRACK", `Loading track from trackdata`, trackData);

      if (trackData.arranger) {
        this.arranger = new Arranger(trackData.arranger, Tone.getContext());
      }
      if (trackData.sequencer && trackData.sequencer.type) {
        debug("TRACK", `Sequencer Type: ${trackData.sequencer.type}`);
        this.sequencer = new Sequencer(
          trackData.sequencer.type,
          Tone.getContext(),
          this.musicFeaturesStore
        );
        await this.sequencer.load();
        debug("TRACK", "LOADED SEQUENCER", this.sequencer);
      }
      if (trackData.synthesizer && trackData.synthesizer.slug) {
        this.synthesizer = getSynthesizer(
          trackData.synthesizer.slug,
          this.vol,
          Tone.getContext()
        );
        if (this.sequencer) this.sequencer.bindSynth(this.synthesizer);
        debug("TRACK_LOADED_SEQUENCER", this.sequencer.toJSON());
        this.synthesizer.attachVolume(this.vol);
      }
      this.setLoading(false);
    } catch (err) {
      error("TRACK_LOAD_ERROR", err);
    }
  }

  constructor(
    id: number,
    audioContext: any,
    musicFeaturesStore: MusicFeaturesStore,
    trackStore: TrackStore
  ) {
    Tone.setContext(audioContext);
    if (!musicFeaturesStore) {
      throw(new Error("musicFeaturesStore must be set"));
    }
    
    this.musicFeaturesStore = musicFeaturesStore;
    this.trackStore = trackStore;

    this.id = id;
    this.slug = `track-${id}`;
    this.vol = new Tone.Volume(0).toDestination();

    this.arranger = undefined;
    this.sequencer = undefined;
    this.synthesizer = undefined;

    makeObservable(this, {
      id: observable,
      slug: observable,
      sequencer: observable,
      synthesizer: observable,
      arranger: observable,
      muted: observable,
      vol: observable,
      volume: computed,
      raiseVolume: action.bound,
      setVolume: action.bound,
      setLoading: action.bound,
      lowerVolume: action.bound,
      toggleMute: action.bound,
      assignMachine: action.bound,
      // fetch: flow
    });
  }
}
