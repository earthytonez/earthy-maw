import Placeable from "./Placeable.ts";
import Synthesizer from "./Synthesizer.ts";

import {
  runInAction,
  makeObservable,
  computed,
  observable,
} from "mobx";

import { SequencerLoader, TriggerWhen } from "./SequencerLoader/index";

import { error, info } from "../Util/logger";
import { Console } from "console";

const TOMLFiles = {
  "OneTwo": require("./Sequencer/Definitions/OneTwo"),
  "OneFour": require("./Sequencer/Definitions/OneFour"),
  "TwoFour": require("./Sequencer/Definitions/TwoFour"),
  "SimpleArpeggiator": require("./Sequencer/Definitions/SimpleArpeggiator"),
  "ThreeFour": require("./Sequencer/Definitions/ThreeFour"),
  "FourOTFloor": require("./Sequencer/Definitions/FourOTFloor"),
  "OffBeatFour": require("./Sequencer/Definitions/OffBeatFour"),
  "HiHat": require("./Sequencer/Definitions/HiHat"),
  "HouseHiHat": require("./Sequencer/Definitions/HouseHiHat"),
  "SimpleDrone": require("./Sequencer/Definitions/SimpleDrone"),
  "Random": require("./Sequencer/Definitions/Random")
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
