import * as Tone from "tone";
import { action, autorun, observable, makeObservable } from "mobx";

import RootStore from '../stores/Root.store';

import { info } from "../Util/logger";
import { BeatMarker } from '../stores/MusicFeatures/BeatMarker';

import IMusicScale from '../Types/IMusicScale'; // Change to Tune.js
import IMusicKey from '../Types/IMusicKey'; // Change to Tune.js

export default class MusicFeaturesStore {
  audioContext: Tone.BaseContext;
  rootStore: RootStore;
  musicKey: string = "C";
  musicScale: string = "Major";
  musicChord: string = "major";
  musicChordProgression: string = "1";

  musicKeyOnDeck: string | undefined = undefined;
  musicScaleOnDeck: string | undefined = undefined;
  musicChordOnDeck: string | undefined = undefined;
  musicChordProgressionOnDeck: string | undefined = undefined;

  musicSectionLength: number = 64;
  musicSectionLengthOnDeck: number | undefined = undefined;

  tempo: number = 120; // in bpm
  play: boolean = false;
  beatMarker: BeatMarker = new BeatMarker(1);

  greaterMusicSectionLength(): number {
    if (!this.musicSectionLengthOnDeck) return this.musicSectionLength;
    if (this.musicSectionLength > this.musicSectionLengthOnDeck) {
      return this.musicSectionLength;
    }
    return this.musicSectionLengthOnDeck;
  }

  changeFeatures() {
    if (this.beatMarker.num % this.greaterMusicSectionLength() === 0) {
      info("MUSIC_FEATURES", "Changing Features!")
      if (this.musicKeyOnDeck) this.musicKey = this.musicKeyOnDeck;
      if (this.musicScaleOnDeck) this.musicScale = this.musicScaleOnDeck;
      if (this.musicChordOnDeck) this.musicChord = this.musicChordOnDeck;
      if (this.musicChordProgressionOnDeck) this.musicChordProgression = this.musicChordProgressionOnDeck;
      if (this.musicSectionLengthOnDeck) this.musicSectionLength = this.musicSectionLengthOnDeck;
    } 
  }

  incrementBeatNumber() {
    console.log(this.beatMarker);
    this.beatMarker.increment();
  }

  setPlay(newValue: boolean) {
    if (newValue === true) {
      info("MUSIC_FEATUERS", "Stopping Tone.Transport");
      Tone.start();
      Tone.Transport.start();
      Tone.context.resume();
    } else {
      info("MUSIC_FEATUERS", "Starting Tone.Transport");
      Tone.Transport.stop();
    }
    this.play = newValue;
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
    this.tempo = tempo;
    Tone.Transport.bpm.value = this.tempo;
  }

  setKey(key: IMusicKey) {
    this.musicKeyOnDeck = key;
  }
  setChord(chord: string) {
    this.musicChordOnDeck = chord;
  }

  setScale(scale: IMusicScale) {
    this.musicScaleOnDeck = scale;
  }

  setSectionLength(sectionLength: number) {
    this.musicSectionLengthOnDeck = sectionLength;
  }

  load(_musicFeatures: any) {
    if (_musicFeatures.tempo) {
      this.tempo = _musicFeatures.tempo;
    }

    if (_musicFeatures.beatMarker) {
      this.beatMarker = new BeatMarker(_musicFeatures.beatMarker);
    }
    if (_musicFeatures.musicKey) {
      this.musicKey = _musicFeatures.musicKey;
    }
    if (_musicFeatures.musicScale) {
      this.musicScale = _musicFeatures.musicScale;
    }
  }

  constructor(rootStore: RootStore, audioContext: Tone.BaseContext) {
    let musicFeaturesRaw: null | string = localStorage.getItem("musicFeatures");
    if (musicFeaturesRaw) {
      let _musicFeatures = JSON.parse(musicFeaturesRaw);   
      this.load(_musicFeatures);   
    }

    autorun(() => {
      localStorage.setItem(
        "musicFeatures",
        JSON.stringify({
          beatMarker: this.beatMarker.num,
          tempo: this.tempo,
          musicKey: this.musicKey,
          musicScale: this.musicScale,
        })
      );
    });

    makeObservable(this, {
      musicKey: observable,
      musicScale: observable,
      play: observable,
      beatMarker: observable,
      rootStore: false,
      playPause: action.bound,
      setPlay: action.bound,
      setKey: action.bound,
      setChord: action.bound,
      setScale: action.bound,
      incrementBeatNumber: action.bound,
      changeFeatures: action.bound
    });
    this.audioContext = audioContext;
    this.rootStore = rootStore;
    Tone.setContext(this.audioContext);
  }
}
