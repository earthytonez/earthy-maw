import { makeObservable, observable, action } from "mobx";
import * as Tone from "tone";

import Arranger from "./Arranger/Arranger";
import Sequencer from "./Sequencer";
import Synthesizer from "./Synthesizer";
import { getSynthesizer } from "./Synthesizer/SynthesizerFactory";

import { BeatMarker } from "../stores/MusicFeatures/BeatMarker";
import MusicFeaturesStore from "../stores/MusicFeatures.store";

import TrackStore from "../stores/Track.store";
import TrackOctaves from "./Track/TrackOctaves";
import TrackVolume from "./Track/TrackVolume";

import { debug, error } from "../Util/logger";

import { SYNTH_TYPE_FROM_STRING } from "../config/constants";

interface ITrackFeatures {
  octaves: TrackOctaves;
  volume: TrackVolume;
}

export default class Track {
  arranger?: Arranger;
  sequencer?: Sequencer;
  synthesizer?: Synthesizer;

  trackFeatures: ITrackFeatures;

  musicFeaturesStore: MusicFeaturesStore;
  trackStore: TrackStore;

  id: number;
  slug: string;

  remove = () => {
    this.trackStore.removeTrack(this.id);
  };


  async tick(beatMarker: BeatMarker, time: number) {
    if (!this.sequencer) return;
    if (!this.musicFeaturesStore) {
      return error("Track", "this.musicFeaturesStore is not set");
    }

    await this.sequencer.play(
      this.musicFeaturesStore.musicKey,
      this.musicFeaturesStore.musicScale,
      this.musicFeaturesStore.musicChord,
      beatMarker,
      time
    );
  }

  audioContext() {
    return Tone.getContext();
  }

  synthFromSlug(synthSlug: string) {
    const SynthType = SYNTH_TYPE_FROM_STRING[synthSlug];
    return new SynthType("", Tone.context);
  }

  sequencerFromSlug(sequencerSlug: string) {
    return new Sequencer(
      sequencerSlug,
      this.audioContext(),
      this.musicFeaturesStore,
      this.trackFeatures.octaves.val()
    );
  }

  arrangerFromSlug(arrangerSlug: string) {
    return new Arranger(arrangerSlug, Tone.getContext());
  }

  newMachine(machineType: string, machineSlug: string) {
    if (machineType === "synthesizer") {
      return this.synthFromSlug(machineSlug);
    }

    if (machineType === "sequencer") {
      return this.sequencerFromSlug(machineSlug);
    }

    if (machineType === "arranger") {
      return this.arrangerFromSlug(machineSlug);
    }
  }

  async assignMachine(machineType: string, machineSlug: any) {
    let machine = this.newMachine(machineType, machineSlug);

    this[machineType as keyof this] = machine;

    if (this.sequencer && this.synthesizer) {
      this.sequencer.bindSynth(this.synthesizer);
    }
    if (machineType === "sequencer") {
      await this.sequencer?.load();
    }
    if (machineType === "synthesizer") {
      this.synthesizer?.attachVolume(this.trackFeatures.volume.vol);
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

  async loadTrackFeatures(trackData: any) {
    if (trackData.trackFeatures) {
      if (trackData.trackFeatures.volume) {
        this.trackFeatures.volume.load(trackData.trackFeatures.volume);
      }
      if (trackData.trackFeatures.octaves) {
        this.trackFeatures.octaves.load(trackData.trackFeatures.octaves);
      }
    }
  }

  async loadTrackArranger(trackData: any) {
    if (trackData.arranger) {
      this.arranger = new Arranger(trackData.arranger, Tone.getContext());
    }
  }

  async loadTrackSequencer(trackData: any) {
    if (trackData.sequencer?.type) {
      debug("TRACK", `Sequencer Type: ${trackData.sequencer.type}`);
      this.sequencer = new Sequencer(
        trackData.sequencer.type,
        Tone.getContext(),
        this.musicFeaturesStore,
        this.trackFeatures.octaves.octaves
      );
      await this.sequencer.load();
      debug("TRACK", "LOADED SEQUENCER", this.sequencer);
    }
  }

  async loadTrackSynthesizer(trackData: any) {
    if (trackData.synthesizer?.slug) {
      this.synthesizer = getSynthesizer(
        trackData.synthesizer.slug,
        this.trackFeatures.volume.vol,
        Tone.getContext()
      );
      if (this.sequencer && this.synthesizer) {
        this.sequencer.bindSynth(this.synthesizer);
        debug("TRACK_LOADED_SEQUENCER", this.sequencer.toJSON());
        this.synthesizer.attachVolume(this.trackFeatures.volume.vol);
      }
    }

  }

  async load(trackData: any) {
    try {
      await this.loadTrackFeatures(trackData);
    } catch(err: any) {
      error("TRACK_LOAD_FEATURES_ERROR", err);
    }
    try {
      await this.loadTrackArranger(trackData);
    } catch(err: any) {
      error("TRACK_LOAD_FEATURES_ERROR", err);
    }
    try {
      await this.loadTrackSequencer(trackData);
    } catch(err: any) {
      error("TRACK_LOAD_FEATURES_ERROR", err);
    }
    try {
      await this.loadTrackSynthesizer(trackData);
    } catch(err: any) {
      error("TRACK_LOAD_FEATURES_ERROR", err);
    }

    debug("TRACK_LOADER", `Loading track from trackdata`, trackData);

    this.setLoading(false);
  }

  constructor(
    id: number,
    audioContext: Tone.BaseContext,
    musicFeaturesStore: MusicFeaturesStore,
    trackStore: TrackStore
  ) {
    Tone.setContext(audioContext);

    if (!musicFeaturesStore) {
      throw new Error("musicFeaturesStore must be set");
    }

    this.musicFeaturesStore = musicFeaturesStore;
    this.trackStore = trackStore;

    this.trackFeatures = {
      octaves: new TrackOctaves(this.trackStore.saveTracks, this),
      volume: new TrackVolume(this.trackStore.saveTracks),
    };

    this.id = id;
    this.slug = `track-${id}`;
    this.trackFeatures.volume.vol = new Tone.Volume(0).toDestination();

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
      setLoading: action.bound,
      assignMachine: action.bound,
    });
  }
}
