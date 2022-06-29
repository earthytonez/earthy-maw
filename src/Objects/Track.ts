import Arranger from "./Arranger.ts";
import Sequencer from "./Sequencer.ts";
import Synthesizer from "./Synthesizer.ts";
import { getSynthesizer } from "./SynthesizerFactory.ts";

import { makeObservable, computed, observable, action } from "mobx";
import * as Tone from "tone";

import { debug, info } from "../Util/logger.ts";
import { cpSync } from "fs";

export default class Track {
  arranger: Arranger;
  sequencer: Sequencer;
  synthesizer: Synthesizer;
  vol: Tone.Volume;
  id: number;
  slug: string;

  raiseVolume = () => {
    this.vol.volume.value = this.vol.volume.value + 1;
    console.log(this.vol.volume.value);
  };

  lowerVolume = () => {
    this.vol.volume.value = this.vol.volume.value - 1;
  };

  setVolume(newValue: number) {
    this.vol.volume.value = newValue;
  }

  get volume() {
    return this.vol.volume.value;
  }

  async tick(key, scale, beatNumber, time) {
    if (!this.sequencer) return;

    await this.sequencer.play(key, scale, beatNumber, time);
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

  async load(trackData: any) {
    debug("TRACK", `Loading track from trackdata`, trackData);

    if (trackData.arranger) {
      this.arranger = new Arranger(trackData.arranger, Tone.getContext());
    }
    if (trackData.sequencer && trackData.sequencer.type) {
      debug("TRACK", `Sequencer Type: ${trackData.sequencer.type}`);
      this.sequencer = new Sequencer(trackData.sequencer.type, Tone.getContext());
      await this.sequencer.load();
    }
    if (trackData.synthesizer && trackData.synthesizer.slug) {
      this.synthesizer = getSynthesizer(trackData.synthesizer.slug, this.vol, Tone.getContext());
      if (this.sequencer) this.sequencer.bindSynth(this.synthesizer);
      debug("TRACK", "Loaded Synthesizer", this.synthesizer);
      this.synthesizer.attachVolume(this.vol);

    }
  }

  constructor(id: number, audioContext: any) {
    Tone.setContext(audioContext);

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
      volume: computed,
      raiseVolume: action,
      lowerVolume: action,
      vol: observable,
      assignMachine: action.bound,
      // fetch: flow
    });
  }
}
