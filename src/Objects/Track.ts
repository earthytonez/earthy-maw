import { makeObservable, computed, observable, action } from "mobx";
import * as Tone from "tone";

import Arranger from "./Arranger";
import Sequencer from "./Sequencer";
import Synthesizer from "./Synthesizer";
import { getSynthesizer } from "./SynthesizerFactory";

import MusicFeaturesStore from "../stores/MusicFeatures.store";
import TrackStore from "../stores/Track.store";

import { debug, error } from "../Util/logger";

interface ITrackFeatures {
  octaves: number[]
  vol: Tone.Volume,
  muted: boolean
}

export default class Track {
  arranger: Arranger;
  sequencer: Sequencer;
  synthesizer: Synthesizer;

  trackFeatures: ITrackFeatures = {
    octaves: [1, 2, 3, 4, 5, 6, 7, 8],
    vol: new Tone.Volume(0),
    muted: false
  }

  musicFeaturesStore: MusicFeaturesStore;
  trackStore: TrackStore;

  id: number;
  slug: string;

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

  set muted(val: boolean) {
    this.trackFeatures.muted = val;
    this.trackStore.saveTracks();
  }

  set vol(val: Tone.Volume) {
    this.trackFeatures.vol = val;
    this.trackStore.saveTracks();
  }

  set octaves(val: number[]) {
    this.trackFeatures.octaves = val;
    this.trackStore.saveTracks();
  }

  get muted(): boolean {
    return this.trackFeatures.muted;
  }

  get vol(): Tone.Volume {
    return this.trackFeatures.vol;
  }

  get octaves(): number[] {
    return this.trackFeatures.octaves
  }

  setOctaves(octaves: number[]) {
    this.octaves = octaves;
  }

  toggleOctave(octave: number) {
      if (this.octaves.includes(octave)) {
        const index = this.octaves.indexOf(octave, 0);
        if (index > -1) {
           this.octaves.splice(index, 1);
        }
        this.trackStore.saveTracks();
      } else {
        this.octaves.push(octave);
        this.setOctaves(this.octaves);
      }
  }

  toggleMute = () => {
    this.vol.mute = !this.vol.mute;
    this.muted = this.vol.mute;
  };

  get volume() {
    return this.vol.volume.value;
  }

  async tick(beatMarker, time) {
    if (!this.sequencer) return;
    if (!this.musicFeaturesStore) {
      return error("this.musicFeaturesStore is not set");
    }

    await this.sequencer.play(
      this.musicFeaturesStore.musicKey,
      this.musicFeaturesStore.musicScale,
      this.musicFeaturesStore.musicChord,
      beatMarker,
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
      trackFeatures: this.trackFeatures,
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


      /* Load Track Features */
      if (trackData.trackFeatures) {
        if (trackData.trackFeatures.vol.volume.value) {
          this.setVolume(trackData.trackFeatures.vol.volume.value);
        }
        this.trackFeatures.octaves = trackData.trackFeatures.octaves;
        this.trackFeatures.muted = !!trackData.trackFeatures.muted;
      }
      console.log(this.trackFeatures);


      if (trackData.arranger) {
        this.arranger = new Arranger(trackData.arranger, Tone.getContext());
      }
      if (trackData.sequencer && trackData.sequencer.type) {
        debug("TRACK", `Sequencer Type: ${trackData.sequencer.type}`);
        this.sequencer = new Sequencer(
          trackData.sequencer.type,
          Tone.getContext(),
          this.musicFeaturesStore,
          this.octaves
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
      arranger: observable,
      id: observable,
      slug: observable,
      sequencer: observable,
      synthesizer: observable,
      trackFeatures: observable,
      octaves: computed,
      muted: computed,
      vol: computed,
      raiseVolume: action.bound,
      setVolume: action.bound,
      setLoading: action.bound,
      lowerVolume: action.bound,
      toggleMute: action.bound,
      assignMachine: action.bound,
      toggleOctave: action.bound
      // fetch: flow
    });
  }
}
