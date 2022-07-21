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

const OneTwo: string = require("./Sequencer/Definitions/OneTwo");
const FourOTFloor: string = require("./Sequencer/Definitions/FourOTFloor");
const OffBeatFour: string = require("./Sequencer/Definitions/OffBeatFour");
const HiHat: string = require("./Sequencer/Definitions/HiHat");
const SimpleDrone: string = require("./Sequencer/Definitions/SimpleDrone");
const OneTwoThree: string = require("./Sequencer/Definitions/OneTwoThree");
const Random: string = require("./Sequencer/Definitions/Random");

export default class Sequencer extends Placeable {
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
        
        if (seqAText == undefined) {
          console.error("Problem loading seqFText");
        }

        runInAction(async () => {        
          this.sequencerLoader = new SequencerLoader(seqAText);
          await this.sequencerLoader.load();
        });

        break;
      case "HiHat":
        let seqB = await fetch(HiHat);
        let seqBText = await seqB.text();
        if (seqBText == undefined) {
          console.error("Problem loading seqFText");
        }

        runInAction(async () => {
          this.sequencerLoader = new SequencerLoader(seqBText);
          await this.sequencerLoader.load();

        });
        break;
      case "OneTwo":
        let seqC = await fetch(OneTwo);
        let seqCText = await seqC.text();
        if (seqCText == undefined) {
          console.error("Problem loading seqCText");
        }
        runInAction(async () => {
          this.sequencerLoader = new SequencerLoader(seqCText);
          await this.sequencerLoader.load();
        });
        break;
      case "SimpleDrone":
        let seqD = await fetch(SimpleDrone);
        let seqDText = await seqD.text();
        if (seqDText == undefined) {
          console.error("Problem loading seqDText");
        }
        this.sequencerLoader = new SequencerLoader(seqDText);
        await this.sequencerLoader.load();
        break;
      case "OffBeatFour":
        let seqE = await fetch(OffBeatFour);
        let seqEText = await seqE.text();
        if (seqEText == undefined) {
          console.error("Problem loading seqFText");
        }
        this.sequencerLoader = new SequencerLoader(seqEText);
        await this.sequencerLoader.load();
        break;
      case "OneTwoThree":
        let seqF = await fetch(OneTwoThree);
        let seqFText = await seqF.text();

        if (seqFText == undefined) {
          console.error("Problem loading seqFText");
        }

        this.sequencerLoader = new SequencerLoader(seqFText);

        await this.sequencerLoader.load();

        break;  
    }
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
      name: computed,
      slug: observable,
    });
  }
}
