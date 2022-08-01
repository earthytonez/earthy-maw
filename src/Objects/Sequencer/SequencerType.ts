import Synthesizer from "./Synthesizer";

import {
  runInAction,
  makeObservable,
  computed,
  observable,
} from "mobx";

import { SequencerLoader } from "./SequencerLoader/index";

import { info } from "../../Util/logger";

const TOMLFiles = {
  "OneTwo": require("./Definitions/OneTwo"),
  "OneFour": require("./Definitions/OneFour"),
  "TwoFour": require("./Definitions/TwoFour"),
  "SimpleArpeggiator": require("./Definitions/SimpleArpeggiator"),
  "ThreeFour": require("./Definitions/ThreeFour"),
  "FourOTFloor": require("./Definitions/FourOTFloor"),
  "OffBeatFour": require("./Definitions/OffBeatFour"),
  "HiHat": require("./Definitions/HiHat"),
  "HouseHiHat": require("./Definitions/HouseHiHat"),
  "SimpleDrone": require("./Definitions/SimpleDrone"),
  "Random": require("./Definitions/Random")
}

export default class Sequencer {
  id: number;
  slug: string;
  boundSynthesizer: Synthesizer = undefined;
  sequencerLoader: SequencerLoader = undefined;
  type: string = "";
  x = 0;

  awaitBuffers: Promise<any>;

  isSynth() {
    return false;
  }

  async fetchTOML(fileName: any) {
    let seq = await fetch(fileName);
    let seqText = await seq.text();
    
    if (!seqText.startsWith("name")) {
      console.error(`FileName: ${fileName}`)
      console.error(seqText);
      throw("seqText did not start with name");
    }
    
    runInAction(() => {
      this.sequencerLoader = new SequencerLoader(seqText);
      this.sequencerLoader.load();
    });

    return this.sequencerLoader;
  }

  async load() {
    info(
      "SEQUENCER TYPE",
      `# Loading Sequencer Type`,
      { type: this.type },
      "font-weight:bold"
    );

    if (TOMLFiles[this.type] == undefined) {
      throw(`Sequencer Type Not Found: ${this.type}`)
    }

    this.sequencerLoader = await this.fetchTOML(TOMLFiles[this.type]);
  }

  get triggerWhen() {
    return this.sequencerLoader.triggerWhen();
  }

  get name() {
    if (this.sequencerLoader) {
      return this.sequencerLoader.name;
    }
  }

  get code() {
    return this.sequencerLoader.code();
  }

  volume(beatMarker: number): number {
    return this.sequencerLoader.volume(beatMarker);
  }

  sequencerType(): string {
    return this.sequencerLoader.type;
  }

  constructor(type: string, id: number) {
    this.id = id;
    this.slug = type;
    this.type = type;

    makeObservable(this, {
      name: computed,
      slug: observable,
    });
  }
}
