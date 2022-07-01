import { action, autorun, observable, makeObservable } from "mobx";
import * as Tone from "tone";

import { info } from "../Util/logger.ts";

export default class MusicFeaturesStore {
  audioContext: any;
  rootStore: RootStore;
  musicKey: IMusicKey = "C";
  musicScale: IMusicScale = "Major";
  tempo: number = 120; // in bpm
  play: boolean = false;
  beatNumber: number = 0;

  incrementBeatNumber() {
    this.beatNumber++;
  }

  setPlay(newValue: boolean) {
    if (newValue === true) {
      info("Stopping Tone.Transport");
      Tone.start();
      Tone.Transport.start();
      Tone.context.resume();
    } else {
      info("Starting Tone.Transport");
      Tone.Transport.stop();
    }
    this.play = newValue;
    console.log(this.play);
  }

  playPause() {
    this.setPlay(!this.play);
  }

  decrementTempo() {
    this.tempo = this.tempo++;
    Tone.Transport.bpm.value = this.tempo;
  }

  incrementTempo() {
    this.tempo = this.tempo++;
    Tone.Transport.bpm.value = this.tempo;
  }

  setTempo(tempo: number) {
    this.tempo = 60;
    Tone.Transport.bpm.value = this.tempo;
  }

  setKey(key: IMusicKey) {
    this.musicKey = key;
  }

  setScale(scale: IMusicScale) {
    this.musicScale = scale;
  }

  load(_musicFeatures: any) {
    if (_musicFeatures.tempo) {
      this.tempo = _musicFeatures.tempo;
    }

    if (_musicFeatures.beatNumber) {
      this.beatNumber = _musicFeatures.beatNumber;
    }
    if (_musicFeatures.musicKey) {
      this.musicKey = _musicFeatures.musicKey;
    }
    if (_musicFeatures.musicScale) {
      this.musicScale = _musicFeatures.musicScale;
    }
  }

  constructor(rootStore, audioContext) {
    let _musicFeatures = JSON.parse(localStorage.getItem("musicFeatures"));

    autorun(() => {
      localStorage.setItem(
        "musicFeatures",
        JSON.stringify({
          beatNumber: this.beatNumber,
          tempo: this.tempo,
          musicKey: this.musicKey,
          musicScale: this.musicScale,
        })
      );
    });

    this.load(_musicFeatures);
    makeObservable(this, {
      musicKey: observable,
      musicScale: observable,
      play: observable,
      rootStore: false,
      playPause: action.bound,
      setPlay: action.bound,
      setKey: action.bound,
      setScale: action.bound,
    });
    this.audioContext = audioContext;
    this.rootStore = rootStore;
    Tone.setContext(this.audioContext);
  }
}
