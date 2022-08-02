import { makeObservable, computed, observable, action } from "mobx";
import * as Tone from "tone";

import Arranger from "./Arranger/Arranger";
import Sequencer from "./Sequencer";
import Synthesizer from "./Synthesizer";
import { getSynthesizer } from "./Synthesizer/SynthesizerFactory";

import { BeatMarker } from "../stores/MusicFeatures/BeatMarker";
import MusicFeaturesStore from "../stores/MusicFeatures.store";
import TrackStore from "../stores/Track.store";

import TrackVolume from "./Track/TrackVolume";

import { debug, error } from "../Util/logger";

import { SYNTH_TYPE_FROM_STRING } from "../config/constants";

interface ITrackFeatures {
  octaves: number[];
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

  set octaves(val: number[]) {
    this.trackFeatures.octaves = val;
    this.trackStore.saveTracks();
  }

  get octaves(): number[] {
    return this.trackFeatures.octaves;
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
      this.octaves
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

  async load(trackData: any) {
    try {
      debug("TRACK", `Loading track from trackdata`, trackData);

      /* Load Track Features */
      if (trackData.trackFeatures) {
        if (trackData.trackFeatures.volume) {
          if (trackData.trackFeatures.volume && trackData.trackFeatures.volume.vol.volume.value) {
            this.trackFeatures.volume.setVolume(trackData.trackFeatures.volume.vol.volume.value);
          }
          this.trackFeatures.volume.muted = !!trackData.trackFeatures.volume.muted;
        }
        if (trackData.trackFeatures.octaves) {
          this.trackFeatures.octaves = trackData.trackFeatures.octaves;
        }
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
          this.trackFeatures.volume.vol,
          Tone.getContext()
        );
        if (this.sequencer && this.synthesizer) {
          this.sequencer.bindSynth(this.synthesizer);
          debug("TRACK_LOADED_SEQUENCER", this.sequencer.toJSON());
          this.synthesizer.attachVolume(this.trackFeatures.volume.vol);
        }
      }
      this.setLoading(false);
    } catch (err: any) {
      error("TRACK_LOAD_ERROR", err);
    }
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
      octaves: [1, 2, 3, 4, 5, 6, 7, 8],
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
      octaves: computed,
      setLoading: action.bound,
      assignMachine: action.bound,
      toggleOctave: action.bound,
      // fetch: flow
    });
  }
}
