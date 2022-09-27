import Track from "../stores/Track";
import TrackStore from "./Track.store";
import MusicFeaturesStore from "./MusicFeatures.store";
import UserParameterStore from "./UserParameter.store";

import { error, debug} from '../Util/logger';

import * as Tone from "tone";

import SynthTypeStore from './MachineType/SynthType';
import SequencerTypeStore from './MachineType/SequencerType';
import ArrangerTypeStore from './MachineType/ArrangerType';
import PluginStore from "./Plugin.store";
import ParameterStore from "./Parameter.store";
import ISequencerType from './Sequencer/ISequencerType';
// import { AudioContext } from 'standardized-audio-context';

export default class RootStore {
  arrangerTypeStore: ArrangerTypeStore;
  audioContext: AudioContext;
  musicFeaturesStore: MusicFeaturesStore;
  parameterStore: ParameterStore;
  pluginStore: PluginStore;
  sequencerTypeStore: SequencerTypeStore;
  synthTypeStore: SynthTypeStore;
  trackStore: TrackStore;
  userParameterStore: UserParameterStore = new UserParameterStore(); 

  constructor(audioContext: AudioContext, testOnly: boolean = false) {
    this.audioContext = audioContext
    /* Initialize tone.js */
    Tone.setContext(this.audioContext);

    /* Initialize Stores */
    this.musicFeaturesStore = new MusicFeaturesStore(this, Tone.getContext());
    this.parameterStore     = new ParameterStore(this);
    this.pluginStore        = new PluginStore(this);
    this.trackStore         = new TrackStore(this, Tone.getContext());

    this.synthTypeStore = new SynthTypeStore();
    this.sequencerTypeStore = new SequencerTypeStore();
    this.arrangerTypeStore = new ArrangerTypeStore();
  
    /* Start Audio */
    if (!testOnly) {
      this.startAudio();
    }
  }

  repeatLoop(time: number) {
    this.musicFeaturesStore.changeFeatures();
    const tracks = this.trackStore.tracks;

    if (tracks.length <= 0) return;
    
    tracks.forEach((track: Track, _i: number) => {
      let p = track.tick(this.musicFeaturesStore.beatMarker, time);
      p.catch ((err: any) => {
        console.log(err.stack);
        error("Error caught during track loop", err);
        
      });
    });
    this.musicFeaturesStore.incrementBeatNumber();  
  }

  startAudio() {
    debug("ROOT_STORE", "Starting Tone.Transport.scheduleRepeat");
    Tone.Transport.scheduleRepeat(this.repeatLoop.bind(this), "16n");
  }

  synthTypes() {
    return this.synthTypeStore.getAll();
  }

  sequencerTypes(): ISequencerType[] {
    return this.sequencerTypeStore.getAll();
  }

  arrangerTypes() {
    return this.arrangerTypeStore.getAll();
  }

}
