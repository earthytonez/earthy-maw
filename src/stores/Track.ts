import { makeObservable, observable, action } from "mobx";
import * as Tone from "tone";

import Arranger from "./Arranger/Arranger";
import Sequencer from "./Sequencer";
import BaseSynthesizer from "./Synthesizer/SynthesizerTypes/Base";
import { getSynthesizer } from "./Synthesizer/SynthesizerFactory";
import { getSequencer } from "./Sequencer/SequencerFactory";

import { BeatMarker } from "../stores/MusicFeatures/BeatMarker";
import MusicFeaturesStore from "./MusicFeatures.store";
import PluginStore from "../stores/Plugin.store";
import ParameterStore from "../stores/Parameter.store";
import RootStore from "../stores/Root.store";
import UserParameterStore from "./UserParameter.store";

import TrackStore from "../stores/Track.store";
import TrackOctaves from "./Track/TrackOctaves";
import TrackVolume from "./Track/TrackVolume";

import { debug, error } from "../Util/logger";

interface ITrackFeatures {
  octaves: TrackOctaves;
  volume: TrackVolume;
}

export default class Track {
  arranger?: Arranger;
  sequencer?: Sequencer;
  synthesizer?: BaseSynthesizer;

  private musicFeaturesStore: MusicFeaturesStore;
  private userParameterStore: UserParameterStore;
  private parameterStore: ParameterStore;
  private pluginStore: PluginStore;
  private trackStore: TrackStore;

  trackFeatures: ITrackFeatures;

  slug: string;

  constructor(
    public id: number,
    audioContext: Tone.BaseContext,
    rootStore: RootStore,
    trackMachines?: any
  ) {
    Tone.setContext(audioContext);

    this.musicFeaturesStore = rootStore.musicFeaturesStore;
    this.userParameterStore = rootStore.userParameterStore;
    this.parameterStore = rootStore.parameterStore;
    this.pluginStore = rootStore.pluginStore;
    this.trackStore = rootStore.trackStore;

    if (!this.musicFeaturesStore) {
      throw new Error("musicFeaturesStore must be set");
    }

    this.trackFeatures = {
      octaves: new TrackOctaves(this.userParameterStore, this),
      volume: new TrackVolume(this.userParameterStore, this),
    };

    this.slug = `track-${id}`;
    const toneVolume = new Tone.Volume(0);
    this.trackFeatures.volume.vol = toneVolume.toDestination();

    this.initializeMachines(trackMachines);

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

  remove = () => {
    this.trackStore.removeTrack(this.id);
  };

  async tick(beatMarker: BeatMarker, time: number) {
    if (!this.sequencer) return;
    if (!this.musicFeaturesStore) {
      return error("Track", "this.musicFeaturesStore is not set");
    }

    await this.sequencer.play(
      this.musicFeaturesStore.musicKey.value(),
      this.musicFeaturesStore.musicScale.value(),
      this.musicFeaturesStore.musicChord.value(),
      beatMarker,
      time
    );

    if (beatMarker.num % 10 === 0) {
      this.trackStore?.saveTracks();
    }
  }

  audioContext() {
    return Tone.getContext();
  }

  synthFromSlug(synthSlug: string) {
    console.log("TRACK::SYNTH_FROM_SLUG", `Synth Slug: ${synthSlug}`);
    return getSynthesizer(
      this.userParameterStore,
      this.parameterStore,
      this.pluginStore,
      synthSlug,
      this.id
    );
  }

  sequencerFromSlug(sequencerSlug: string) {
    console.log(
      "TRACK::SEQUENCER_FROM_SLUG",
      `Sequencer Slug: ${sequencerSlug}`
    );
    return getSequencer(
      this.userParameterStore,
      this.parameterStore,
      this.musicFeaturesStore,
      this.pluginStore,
      sequencerSlug,
      this.id,
      this.audioContext(),
      this.trackFeatures
    );
  }

  arrangerFromSlug(arrangerSlug: string) {
    return new Arranger(arrangerSlug, Tone.getContext());
  }

  newMachine(
    machineType: "synthesizer" | "sequencer" | "arranger",
    machineSlug: string
  ) {
    switch (machineType) {
      case "synthesizer":
        return this.synthFromSlug(machineSlug);
      case "sequencer":
        return this.sequencerFromSlug(machineSlug);
      case "arranger":
        return this.arrangerFromSlug(machineSlug);
    }
  }

  async assignMachine(
    machineType: "synthesizer" | "sequencer" | "arranger",
    machineSlug: any
  ) {
    let machine = await this.newMachine(machineType, machineSlug);

    this[machineType as keyof this] = machine;

    if (this.sequencer && this.synthesizer) {
      this.sequencer.bindSynth(this.synthesizer);
    }

    if (machineType === "synthesizer") {
      this.synthesizer?.attachVolume(this.trackFeatures.volume.vol);
    }
  }

  sequencerJSON() {
    if (this.sequencer) {
      return {
        name: this.sequencer.name,
        slug: this.sequencer.slug,
        type: this.sequencer.type,
      };
    }
    return undefined;
  }

  synthesizerJSON() {
    console.log(this.synthesizer);
    if (this.synthesizer) {
      return {
        name: this.synthesizer.name,
        slug: this.synthesizer.name.replaceAll(" ", "_").toLowerCase(),
      };
    }
    return undefined;
  }

  toJSON() {
    let retVal = {
      id: this.id,
      slug: this.slug,
      arranger: this.arranger,
      sequencer: this.sequencerJSON(),
      synthesizer: this.synthesizerJSON(),
    };
    return retVal;
  }

  setLoading(loading: boolean) {
    if (this.sequencer !== undefined) this.sequencer.setLoading(loading);
    if (this.arranger !== undefined) this.arranger.setLoading(loading);
    if (this.synthesizer !== undefined) this.synthesizer.setLoading(loading);
  }

  // async loadTrackFeatures(trackData: any) {
  //   if (trackData.trackFeatures) {
  //     if (trackData.trackFeatures.volume) {
  //       this.trackFeatures.volume.load(trackData.trackFeatures.volume);
  //     }
  //     if (trackData.trackFeatures.octaves) {
  //       this.trackFeatures.octaves.load(trackData.trackFeatures.octaves);
  //     }
  //   }
  // }

  async loadTrackArranger(trackData: any) {
    if (trackData.arranger) {
      this.arranger = new Arranger(trackData.arranger, Tone.getContext());
    }
  }

  async loadTrackSequencer(sequencer: any) {
    if (!sequencer) return;
    this.sequencer = await this.sequencerFromSlug(sequencer.slug);
  }

  async loadTrackSynthesizer(synthesizer: BaseSynthesizer) {
    debug("TRACK", "LOAD TRACK SYNTHESIZER", synthesizer);

    if (!synthesizer || !synthesizer.slug) return;

    this.synthesizer = await getSynthesizer(
      this.userParameterStore,
      this.parameterStore,
      this.pluginStore,
      synthesizer.slug,
      this.id
    );

    // this.synthesizer!.loadParameters(synthesizer);

    if (this.sequencer && this.synthesizer) {
      this.sequencer.bindSynth(this.synthesizer);
      debug("TRACK_LOADED_SEQUENCER", this.sequencer.toJSON());
      this.synthesizer.attachVolume(this.trackFeatures.volume.vol);
    }
  }

  async load(trackData: any) {
    // try { // Don't need to load track features any more, all happens through user parameters
    //   await this.loadTrackFeatures(trackData);
    // } catch(err: any) {
    //   error("TRACK_LOAD_FEATURES_ERROR", err);
    // }
    try {
      await this.loadTrackArranger(trackData);
    } catch (err: any) {
      error("TRACK_LOAD_FEATURES_ERROR_ARRANGER", err.stack);
    }
    try {
      if (trackData.sequencer) {
        await this.loadTrackSequencer(trackData.sequencer);
      }
    } catch (err: any) {
      error("TRACK_LOAD_FEATURES_ERROR_SEQUENCER", err.stack);
    }
    try {
      if (trackData.synthesizer) {
        await this.loadTrackSynthesizer(trackData.synthesizer);
      }
    } catch (err: any) {
      error("TRACK_LOAD_FEATURES_ERROR_SYNTHESIZER", err.stack);
    }

    debug("TRACK_LOADER", `Loading track from trackdata`, trackData);

    this.setLoading(false);
  }

  private initializeMachines(trackMachines: any) {
    this.arranger = undefined;
    if (trackMachines?.sequencer) {
      this.loadTrackSequencer(trackMachines.sequencer);
    } else {
      this.sequencer = undefined;
    }

    if (trackMachines?.synth) {
      this.loadTrackSynthesizer(trackMachines.synth);
    } else {
      this.synthesizer = undefined;
    }
    this.setLoading(false);
  }
}
