import Placeable from "./Placeable.ts";
import Synthesizer from "./Synthesizer.ts";

import {
  runInAction,
  makeObservable,
  observable,
} from "mobx";

import { SequencerLoader, TriggerWhen } from "./SequencerLoader/index";

import { info } from "../Util/logger";

const OneTwo: string = require("./Sequencer/Definitions/OneTwo");
const FourOTFloor: string = require("./Sequencer/Definitions/FourOTFloor");
const OffBeatFour: string = require("./Sequencer/Definitions/OffBeatFour");
const HiHat: string = require("./Sequencer/Definitions/HiHat");
const SimpleDrone: string = require("./Sequencer/Definitions/SimpleDrone");
const ThreeFour: string = require("./Sequencer/Definitions/ThreeFour");

export default class Sequencer extends Placeable {
  id: number;
  name: string;
  slug: string;
  boundSynthesizer: Synthesizer = undefined;
  sequencerLoader: SequencerLoader = new SequencerLoader();
  type: string = "";
  code: string = "";
  x = 0;
  triggerWhen: TriggerWhen;

  awaitBuffers: Promise<any>;

  isSynth() {
    return false;
  }

  async load() {
    info(
      "SEQUENCER",
      `# Loading Sequencer Type`,
      { type: this.type },
      "font-weight:bold"
    );

    switch (this.type) {
      case "FourOTFloor":
        let seqA = await fetch(FourOTFloor);
        let seqAText = await seqA.text();
        this.sequencerLoader = new SequencerLoader(seqAText);
        break;
      case "HiHat":
        let seqB = await fetch(HiHat);
        let seqBText = await seqB.text();
        this.sequencerLoader = new SequencerLoader(seqBText);
        break;
      case "OneTwo":
        let seqC = await fetch(OneTwo);
        let seqCText = await seqC.text();
        this.sequencerLoader = new SequencerLoader(seqCText);
        break;
      case "SimpleDrone":
        let seqD = await fetch(SimpleDrone);
        let seqDText = await seqD.text();
        this.sequencerLoader = new SequencerLoader(seqDText);
        break;
      case "OffBeatFour":
        let seqE = await fetch(OffBeatFour);
        let seqEText = await seqE.text();
        this.sequencerLoader = new SequencerLoader(seqEText);
        break;
      case "ThreeFour":
        let seqF = await fetch(ThreeFour);
        let seqFText = await seqF.text();
        this.sequencerLoader = new SequencerLoader(seqFText);
        break;  
      default:
    }

    this.sequencerLoader.load();
    runInAction(() => {
      this.triggerWhen = this.sequencerLoader.triggerWhen();
      this.code = this.sequencerLoader.code();
      this.name = this.sequencerLoader.name;

      info(
        "SEQUENCER",
        `Loaded Sequencer Type ${this.name}`,
        this.sequencerLoader.sequencerHolder
      );
    });
  }

  volume(beatNumber: number): number {
    return this.sequencerLoader.volume(beatNumber);
  }

  note(key: string, scale: string, beatNumber: number): number {
    return this.sequencerLoader.note(key, scale, beatNumber);
  }

  sequencerType(): string {
    return this.sequencerLoader.type;
  }

  constructor(type: string, id: number) {
    super();

    this.id = id;
    this.slug = type;
    this.type = type;
    makeObservable(this, {
      name: observable,
      slug: observable,
    });
  }
}
