import Synthesizer from "../Synthesizer.ts";

import IPlayParams from '../../Types/IPlayParams';

export default class HiHat extends Synthesizer {
  id: number;
  name: string = "Hi Hat";
  slug: string = "hihat";
  audioContext: any;

  play(params: IPlayParams) {
    console.log(`Playing Synthesizer ${this.name}`);

    let audioContext = this.audioContext;

    var fundamental = 40;
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    // Always useful
    var when = audioContext.currentTime;

    var gain = audioContext.createGain();

    // Bandpass
    var bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    // Highpass
    var highpass = audioContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;

    // Connect the graph
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(audioContext.destination);

    // Create the oscillators
    ratios.forEach(function (ratio) {
      var osc = audioContext.createOscillator();
      osc.type = "square";
      // Frequency is the fundamental * this oscillator's ratio
      osc.frequency.value = fundamental * ratio;
      osc.connect(bandpass);
      osc.start(when);
      osc.stop(when + 0.3);
    });

    // Define the volume envelope
    gain.gain.setValueAtTime(0.00001, when);
    gain.gain.exponentialRampToValueAtTime(1, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.3, when + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.00001, when + 0.3);
  }

  constructor(audioContext: any, id: number) {
    super();
    this.id = id;
    this.audioContext = audioContext;
  }
}
